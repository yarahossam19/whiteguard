import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

/** Nodemailer needs the Node runtime (not Edge). */
export const runtime = "nodejs";

const DEFAULT_TO = "ahmedmostafakhedr31@gmail.com";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** `CONTACT_TO_EMAIL` can be one address or several separated by comma or semicolon. */
function getContactRecipients(): string[] {
  const raw = process.env.CONTACT_TO_EMAIL?.trim();
  if (!raw) {
    return [DEFAULT_TO];
  }
  const parts = raw
    .split(/[,;]+/)
    .map((a) => a.trim())
    .filter(Boolean);
  const valid = parts.filter((a) => EMAIL_RE.test(a));
  return valid.length > 0 ? valid : [DEFAULT_TO];
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
  const country = b.country;
  const jobRole = b.jobRole;

  if (
    !isNonEmptyString(fullName, 200) ||
    !isNonEmptyString(email, 254) ||
    !isNonEmptyString(company, 200) ||
    !isNonEmptyString(country, 120) ||
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
  const fromName =
    process.env.SMTP_FROM_NAME?.trim() || "WhiteGuard";

  const to = getContactRecipients();

  const replyEmail = email.trim();
  const mailtoHref = `mailto:${encodeURIComponent(replyEmail)}`;

  const safe = {
    fullName: escapeHtml(fullName.trim()),
    email: escapeHtml(replyEmail),
    company: escapeHtml(company.trim()),
    country: escapeHtml(country.trim()),
    jobRole: escapeHtml(jobRole.trim()),
  };

  const subject = `[WHITEGUARD] Contact form — ${fullName.trim()}`;

  const textLines = [
    "New submission from the website contact form.",
    "",
    `Full name: ${fullName.trim()}`,
    `Business email: ${email.trim()}`,
    `Company: ${company.trim()}`,
    `Country: ${country.trim()}`,
    `Job role: ${jobRole.trim()}`,
  ];
  const text = textLines.join("\n");

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body style="margin:0;padding:24px;background:#f5f8fa;font-family:'Segoe UI',system-ui,sans-serif;color:#141a1f;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 24px rgba(0,56,89,0.08);">
    <tr>
      <td style="padding:28px 28px 8px;">
        <h1 style="margin:0;font-size:20px;font-weight:700;color:#003859;letter-spacing:-0.02em;">New contact request</h1>
        <p style="margin:12px 0 0;font-size:15px;line-height:1.5;color:#52697a;">Someone submitted the contact form on <strong style="color:#003859;">whiteguard.co.uk</strong>. Reply directly to their business email below.</p>
      </td>
    </tr>
    <tr>
      <td style="padding:8px 28px 28px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-collapse:collapse;font-size:15px;">
          <tr><td style="padding:10px 0;border-bottom:1px solid #e0e6eb;color:#52697a;width:38%;vertical-align:top;">Full name</td><td style="padding:10px 0;border-bottom:1px solid #e0e6eb;color:#003859;font-weight:600;">${safe.fullName}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #e0e6eb;color:#52697a;vertical-align:top;">Business email</td><td style="padding:10px 0;border-bottom:1px solid #e0e6eb;"><a href="${mailtoHref}" style="color:#0087d7;text-decoration:none;font-weight:600;">${safe.email}</a></td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #e0e6eb;color:#52697a;vertical-align:top;">Company</td><td style="padding:10px 0;border-bottom:1px solid #e0e6eb;color:#003859;">${safe.company}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #e0e6eb;color:#52697a;vertical-align:top;">Country</td><td style="padding:10px 0;border-bottom:1px solid #e0e6eb;color:#003859;">${safe.country}</td></tr>
          <tr><td style="padding:10px 0;color:#52697a;vertical-align:top;">Job role</td><td style="padding:10px 0;color:#003859;">${safe.jobRole}</td></tr>
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
      from: { name: fromName, address: fromAddress },
      to,
      replyTo: replyEmail,
      subject,
      text,
      html,
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
