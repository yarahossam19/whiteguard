import { existsSync } from "fs";
import path from "path";
import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import { NextResponse } from "next/server";

import {
  getContactServiceLabels,
  isValidContactServiceSelection,
} from "@/data/contact-service-options";
import {
  getPartnerCountryLabel,
  PARTNER_COUNTRY_CODE_SET,
} from "@/data/partner-countries";

/** Nodemailer needs the Node runtime (not Edge). */
export const runtime = "nodejs";

const DEFAULT_CONTACT_TO = "info@whiteguard.co.uk";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** `CONTACT_TO_EMAIL` can be one address or several separated by comma or semicolon. */
function getContactRecipients(): string[] {
  const raw = process.env.CONTACT_TO_EMAIL?.trim();
  if (!raw) {
    return [DEFAULT_CONTACT_TO];
  }
  const parts = raw
    .split(/[,;]+/)
    .map((a) => a.trim())
    .filter(Boolean);
  const valid = parts.filter((a) => EMAIL_RE.test(a));
  return valid.length > 0 ? valid : [DEFAULT_CONTACT_TO];
}

/** Blind-copy (e.g. personal inbox) — comma or semicolon separated; omitted if unset or invalid. */
function getContactBcc(): string | string[] | undefined {
  const raw = process.env.CONTACT_BCC_EMAIL?.trim();
  if (!raw) {
    return undefined;
  }
  const parts = raw
    .split(/[,;]+/)
    .map((a) => a.trim())
    .filter(Boolean);
  const valid = parts.filter((a) => EMAIL_RE.test(a));
  if (valid.length === 0) {
    return undefined;
  }
  return valid.length === 1 ? valid[0] : valid;
}

function getSmtpConfig() {
  const host = process.env.SMTP_HOST?.trim();
  const portRaw = process.env.SMTP_PORT?.trim();
  const port = portRaw ? Number.parseInt(portRaw, 10) : 587;
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();

  return {
    host,
    port: Number.isFinite(port) ? port : 587,
    user,
    pass,
  };
}

function createMailTransport() {
  const { host, port, user, pass } = getSmtpConfig();

  if (!host || !user || !pass) {
    return null;
  }

  const useGmail =
    host.toLowerCase().includes("gmail") ||
    process.env.SMTP_SERVICE?.toLowerCase() === "gmail";

  if (useGmail) {
    return nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    requireTLS: port === 587,
    auth: { user, pass },
    tls: { rejectUnauthorized: true },
  });
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isNonEmptyString(v: unknown, max: number): v is string {
  return typeof v === "string" && v.trim().length > 0 && v.length <= max;
}

/** Optional message: empty string if missing; max length enforced. */
function parseOptionalMessage(v: unknown): { ok: true; text: string } | { ok: false } {
  if (v === undefined || v === null) {
    return { ok: true, text: "" };
  }
  if (typeof v !== "string") {
    return { ok: false };
  }
  const t = v.trim();
  if (t.length > 5000) {
    return { ok: false };
  }
  return { ok: true, text: t };
}

/** Optional WhatsApp: empty or non-empty trimmed string, max length for API. */
function parseOptionalWhatsApp(
  v: unknown,
): { ok: true; text: string } | { ok: false } {
  if (v === undefined || v === null || v === "") {
    return { ok: true, text: "" };
  }
  if (typeof v !== "string") {
    return { ok: false };
  }
  const t = v.trim();
  if (t.length > 48) {
    return { ok: false };
  }
  return { ok: true, text: t };
}

/** At least one allowed partner country code; duplicates removed. */
function parseCountryCodes(
  v: unknown,
): { ok: true; codes: string[] } | { ok: false } {
  if (!Array.isArray(v) || v.length === 0) {
    return { ok: false };
  }
  const codes: string[] = [];
  const seen = new Set<string>();
  for (const item of v) {
    if (typeof item !== "string") {
      return { ok: false };
    }
    const c = item.trim();
    if (!PARTNER_COUNTRY_CODE_SET.has(c)) {
      return { ok: false };
    }
    if (!seen.has(c)) {
      seen.add(c);
      codes.push(c);
    }
  }
  if (codes.length === 0) {
    return { ok: false };
  }
  return { ok: true, codes };
}

const RECAPTCHA_VERIFY_URL =
  "https://www.google.com/recaptcha/api/siteverify";

/** reCAPTCHA v2 Checkbox — siteverify returns success only (no score). */
async function verifyRecaptchaToken(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY?.trim();
  if (!secret) {
    return false;
  }
  const res = await fetch(RECAPTCHA_VERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token }),
  });
  const data = (await res.json()) as {
    success?: boolean;
    "error-codes"?: string[];
  };
  return data.success === true;
}

/**
 * Base URL for hosted assets referenced in HTML emails (must be publicly reachable HTTPS).
 * Priority: explicit email URL → public site URL → Vercel deployment hostname → default brand domain.
 * On Vercel, set NEXT_PUBLIC_SITE_URL or CONTACT_EMAIL_PUBLIC_URL to your canonical domain
 * so image URLs match where the site is actually served.
 */
function getPublicSiteUrl(): string {
  const trimmed = (s: string | undefined) => s?.trim().replace(/\/$/, "") ?? "";
  const explicit =
    trimmed(process.env.CONTACT_EMAIL_PUBLIC_URL) ||
    trimmed(process.env.NEXT_PUBLIC_SITE_URL);
  if (explicit) {
    return explicit;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/^https?:\/\//, "")}`;
  }
  return "https://whiteguard.co.uk";
}

/** Inline image CIDs — must match attachment `cid` and HTML `src="cid:…"`. */
const MAIL_CID_LOGO_ICON = "wg-icon@whiteguard";
const MAIL_CID_LOGO_WORDMARK = "wg-wordmark@whiteguard";

/**
 * Embed logos as multipart/related attachments so clients never fetch URLs
 * (localhost is unreachable from Gmail; SVG/remote PNG URL issues go away).
 * Falls back to absolute URLs only if files are missing on disk (e.g. custom deploy).
 */
function getEmailLogoSources(): {
  iconSrc: string;
  wordmarkSrc: string;
  attachments: NonNullable<SMTPTransport.Options["attachments"]>;
} {
  const iconPath = path.join(
    process.cwd(),
    "public",
    "images",
    "logo-icon.png",
  );
  const wordmarkPath = path.join(
    process.cwd(),
    "public",
    "images",
    "WhiteGuardText.png",
  );

  if (existsSync(iconPath) && existsSync(wordmarkPath)) {
    return {
      iconSrc: `cid:${MAIL_CID_LOGO_ICON}`,
      wordmarkSrc: `cid:${MAIL_CID_LOGO_WORDMARK}`,
      attachments: [
        {
          filename: "logo-icon.png", 
          path: iconPath,
          cid: MAIL_CID_LOGO_ICON,
        },
        {
          filename: "WhiteGuardText.png",
          path: wordmarkPath,
          cid: MAIL_CID_LOGO_WORDMARK,
        },
      ],
    };
  }

  const base = getPublicSiteUrl();
  return {
    iconSrc: `${base}/images/logo-icon.png`,
    wordmarkSrc: `${base}/images/WhiteGuardText.png`,
    attachments: [],
  };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const b = body as Record<string, unknown>;
  const fullName = b.fullName;
  const email = b.email;
  const company = b.company;
  const jobRole = b.jobRole;
  const serviceType = b.serviceType;
  const serviceSub = b.serviceSub;
  const recaptchaToken = b.recaptchaToken;
  const messageParsed = parseOptionalMessage(b.message);
  const whatsAppParsed = parseOptionalWhatsApp(b.whatsApp);
  const countryParsed = parseCountryCodes(b.countryCodes);
  if (!countryParsed.ok) {
    return NextResponse.json(
      { error: "Please select at least one valid country." },
      { status: 400 },
    );
  }
  const countryCodes = countryParsed.codes;
  if (!messageParsed.ok) {
    return NextResponse.json(
      { error: "Invalid message (max 5000 characters)" },
      { status: 400 },
    );
  }
  if (!whatsAppParsed.ok) {
    return NextResponse.json(
      { error: "Invalid WhatsApp field" },
      { status: 400 },
    );
  }
  const messageText = messageParsed.text;
  const whatsAppText = whatsAppParsed.text;

  const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY?.trim();
  if (recaptchaSecret) {
    if (
      typeof recaptchaToken !== "string" ||
      recaptchaToken.trim().length === 0
    ) {
      return NextResponse.json(
        { error: "Security check failed. Please try again." },
        { status: 400 },
      );
    }
    const ok = await verifyRecaptchaToken(recaptchaToken.trim());
    if (!ok) {
      return NextResponse.json(
        { error: "Security check failed. Please try again." },
        { status: 400 },
      );
    }
  } else if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      {
        error:
          "Contact form is not fully configured. (reCAPTCHA secret missing on server.)",
      },
      { status: 503 },
    );
  }

  if (!isValidContactServiceSelection(serviceType, serviceSub)) {
    return NextResponse.json(
      { error: "Please choose a valid service category and service." },
      { status: 400 },
    );
  }

  const serviceTypeStr =
    typeof serviceType === "string" ? serviceType.trim() : "";
  const serviceSubStr = typeof serviceSub === "string" ? serviceSub.trim() : "";
  const { typeLabel: serviceTypeLabel, subLabel: subServiceLabel } =
    getContactServiceLabels(serviceTypeStr, serviceSubStr);

  if (
    !isNonEmptyString(fullName, 200) ||
    !isNonEmptyString(email, 254) ||
    !isNonEmptyString(company, 200) ||
    !isNonEmptyString(jobRole, 120)
  ) {
    return NextResponse.json(
      { error: "Missing or invalid fields" },
      { status: 400 },
    );
  }

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }

  const { host, user, pass } = getSmtpConfig();

  if (!host || !user || !pass) {
    return NextResponse.json(
      {
        error:
          "Mail is not configured. Set SMTP_HOST, SMTP_USER, SMTP_PASS in .env.local then restart the dev server (`npm run dev`).",
      },
      { status: 503 },
    );
  }

  /** Gmail requires From to be this mailbox or an allowed “Send mail as” alias. */
  const fromAddress = process.env.SMTP_FROM_EMAIL?.trim() || user;
  const brandName = process.env.SMTP_FROM_NAME?.trim() || "WhiteGuard";
  const submitterName = fullName.trim();

  const to = getContactRecipients();
  const bcc = getContactBcc();

  const replyEmail = email.trim();
  const mailtoHref = `mailto:${encodeURIComponent(replyEmail)}`;
  const whatsAppTrim = whatsAppText;
  const waDigits = whatsAppTrim.replace(/\D/g, "");

  const { iconSrc: logoIconSrc, wordmarkSrc: logoWordmarkSrc, attachments: logoAttachments } =
    getEmailLogoSources();

  const companyTrimmed = typeof company === "string" ? company.trim() : "";
  const countriesLabel = countryCodes.map(getPartnerCountryLabel).join(", ");

  const safe = {
    fullName: escapeHtml(fullName.trim()),
    email: escapeHtml(replyEmail),
    company: escapeHtml(companyTrimmed),
    countries: escapeHtml(countriesLabel),
    jobRole: escapeHtml(jobRole.trim()),
    serviceType: escapeHtml(serviceTypeLabel),
    subService: escapeHtml(subServiceLabel),
    whatsApp: escapeHtml(whatsAppTrim),
    message: escapeHtml(messageText),
  };

  const waCell =
    waDigits.length > 0
      ? `<a href="https://wa.me/${waDigits}" style="color:#0087d7;text-decoration:none;font-weight:600;">${safe.whatsApp}</a>`
      : `<span style="color:#003859;font-weight:600;">${safe.whatsApp}</span>`;

  const subject = `[WhiteGuard] Contact form — ${fullName.trim()}`;

  const textLines = [
    "New submission from the website contact form.",
    "",
    `Full name: ${fullName.trim()}`,
    `Business email: ${email.trim()}`,
    `Company: ${companyTrimmed}`,
    `Countries: ${countriesLabel}`,
    `Job role: ${jobRole.trim()}`,
    `Service category: ${serviceTypeLabel}`,
    `Service: ${subServiceLabel}`,
    `WhatsApp: ${whatsAppTrim}`,
    messageText
      ? `Message:\n${messageText}`
      : "Message: (not provided)",
  ];
  const text = textLines.join("\n");

  const messageRow =
    messageText.length > 0
      ? `<tr><td style="padding:10px 0;border-top:1px solid #e0e6eb;color:#52697a;vertical-align:top;">Message</td><td style="padding:10px 0;border-top:1px solid #e0e6eb;color:#003859;white-space:pre-wrap;">${safe.message}</td></tr>`
      : `<tr><td style="padding:10px 0;border-top:1px solid #e0e6eb;color:#52697a;vertical-align:top;">Message</td><td style="padding:10px 0;border-top:1px solid #e0e6eb;color:#94a3b8;font-style:italic;">—</td></tr>`;

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body style="margin:0;padding:24px;background:#f5f8fa;font-family:'Segoe UI',system-ui,sans-serif;color:#141a1f;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,56,89,0.08);">
    <tr>
      <td align="center" style="padding:24px 28px 16px;border-bottom:1px solid #e0e6eb;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;">
          <tr>
          
            <td style="vertical-align:middle;">
              <img src="${logoWordmarkSrc}" alt="WhiteGuard" width="145" height="14" border="0" style="display:block;max-width:145px;height:"14px";width:100%;" />
            </td>
              <td style="padding-left:10px;padding-right:10px;vertical-align:middle;">
              <img src="${logoIconSrc}" alt="" width="26" height="20" border="0" style="display:block;width:26px;height:20px;" />
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding:20px 28px 8px;text-align:center;">
        <h1 style="margin:0;font-size:20px;font-weight:700;color:#003859;letter-spacing:-0.02em;">New contact request</h1>
        <p style="margin:12px 0 0;font-size:15px;line-height:1.5;color:#52697a;">Someone submitted the contact form on <strong style="color:#003859;">whiteguard.co.uk</strong>. Use <strong>Reply</strong> to reach them at their business email below.</p>
      </td>
    </tr>
    <tr>
      <td style="padding:8px 28px 28px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;font-size:15px;">
          <tr><td style="padding:10px 0;border-bottom:1px solid #e0e6eb;color:#52697a;width:38%;vertical-align:top;">Full name</td><td style="padding:10px 0;border-bottom:1px solid #e0e6eb;color:#003859;font-weight:600;">${safe.fullName}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #e0e6eb;color:#52697a;vertical-align:top;">Business email</td><td style="padding:10px 0;border-bottom:1px solid #e0e6eb;"><a href="${mailtoHref}" style="color:#0087d7;text-decoration:none;font-weight:600;">${safe.email}</a></td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #e0e6eb;color:#52697a;vertical-align:top;">WhatsApp</td><td style="padding:10px 0;border-bottom:1px solid #e0e6eb;">${waCell}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #e0e6eb;color:#52697a;vertical-align:top;">Company</td><td style="padding:10px 0;border-bottom:1px solid #e0e6eb;color:#003859;">${safe.company}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #e0e6eb;color:#52697a;vertical-align:top;">Countries</td><td style="padding:10px 0;border-bottom:1px solid #e0e6eb;color:#003859;">${safe.countries}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #e0e6eb;color:#52697a;vertical-align:top;">Job role</td><td style="padding:10px 0;border-bottom:1px solid #e0e6eb;color:#003859;">${safe.jobRole}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #e0e6eb;color:#52697a;vertical-align:top;">Service category</td><td style="padding:10px 0;border-bottom:1px solid #e0e6eb;color:#003859;">${safe.serviceType}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #e0e6eb;color:#52697a;vertical-align:top;">Service</td><td style="padding:10px 0;border-bottom:1px solid #e0e6eb;color:#003859;">${safe.subService}</td></tr>
          ${messageRow}
        </table>
      </td>
    </tr>
  </table>
  <p style="max-width:560px;margin:16px auto 0;font-size:12px;color:#94a3b8;text-align:center;">This message was sent from WhiteGuard contact form.</p>
</body>
</html>`;

  const transporter = createMailTransport();
  if (!transporter) {
    return NextResponse.json(
      { error: "Could not create mail transport." },
      { status: 503 },
    );
  }

  try {
    await transporter.verify();
  } catch (verifyErr) {
    const msg =
      verifyErr instanceof Error ? verifyErr.message : String(verifyErr);
    console.error("[contact] SMTP verify failed:", verifyErr);
    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV === "development"
            ? `SMTP login failed: ${msg}. Use a Gmail App Password (not your normal password), and 2FA on the account.`
            : "Could not connect to the mail server. Check SMTP user/password and restart the server.",
      },
      { status: 500 },
    );
  }

  try {
    await transporter.sendMail({
      from: {
        name: `${submitterName} via ${brandName}`,
        address: fromAddress,
      },
      to,
      ...(bcc ? { bcc } : {}),
      replyTo: { name: submitterName, address: replyEmail },
      subject,
      text,
      html,
      attachments:
        logoAttachments.length > 0 ? [...logoAttachments] : undefined,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[contact] sendMail failed:", err);
    return NextResponse.json(
      {
        error:
          process.env.NODE_ENV === "development"
            ? `Send failed: ${msg}`
            : "Failed to send email. Check server logs and SMTP settings.",
      },
      { status: 500 },
    );
  }
}
