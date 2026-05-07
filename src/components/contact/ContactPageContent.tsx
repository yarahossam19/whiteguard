"use client";

import Image from "next/image";
import Script from "next/script";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { socialLinks } from "@/config/site";
import {
  CONTACT_SERVICE_CATEGORY_IDS,
  CONTACT_SERVICE_TYPE_OTHER,
  getContactServiceTypeOptions,
  getContactSubServiceOptions,
  type ContactServiceCategoryId,
} from "@/data/contact-service-options";
import { HoverSwapButton } from "../ui/HoverSwapButton";
import { PartnerCountryMultiSelect } from "@/components/partners/PartnerCountryMultiSelect";

const RECAPTCHA_SITE_KEY =
  process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY?.trim() ?? "";

const CONTACT_SERVICE_TYPE_OPTIONS = getContactServiceTypeOptions();

function isContactCategoryId(v: string): v is ContactServiceCategoryId {
  return (CONTACT_SERVICE_CATEGORY_IDS as readonly string[]).includes(v);
}

const JOB_ROLES = [
  "CEO / Founder",
  "CTO",
  "Security Director",
  "Sales Director",
  "Channel Manager",
  "Other",
];

const CONTACT = {
  phone: "+44 1227391144",
  telHref: "tel:+441227391144",
  email: "sales@whiteguard.co.uk",
  mailHref: "mailto:sales@whiteguard.co.uk",
  address: "s 128, City Road, London, EC1V 2NX, UNITED KINGDOM",
  addressHref: "https://maps.app.goo.gl/hwwVWdqLpfp1qXeq5",
  officeHours: "Monday – Friday: 9:00am – 5:00pm (UK)",
} as const;

function IconPhone({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
    >
      <g clipPath="url(#clip0_2398_7613)">
        <path
          d="M38.3333 18.3328C37.8913 18.3328 37.4674 18.1573 37.1548 17.8447C36.8423 17.5321 36.6667 17.1082 36.6667 16.6662C36.6631 13.131 35.2572 9.74171 32.7575 7.24199C30.2578 4.74227 26.8685 3.33638 23.3333 3.33285C22.8913 3.33285 22.4674 3.15725 22.1548 2.84469C21.8423 2.53213 21.6667 2.10821 21.6667 1.66618C21.6667 1.22415 21.8423 0.800231 22.1548 0.48767C22.4674 0.17511 22.8913 -0.000485193 23.3333 -0.000485193C27.7521 0.00436747 31.9885 1.76187 35.1131 4.88643C38.2376 8.01098 39.9952 12.2474 40 16.6662C40 17.1082 39.8244 17.5321 39.5118 17.8447C39.1993 18.1573 38.7754 18.3328 38.3333 18.3328ZM33.3333 16.6662C33.3333 14.014 32.2798 11.4705 30.4044 9.59511C28.529 7.71975 25.9855 6.66618 23.3333 6.66618C22.8913 6.66618 22.4674 6.84178 22.1548 7.15434C21.8423 7.4669 21.6667 7.89082 21.6667 8.33285C21.6667 8.77488 21.8423 9.1988 22.1548 9.51136C22.4674 9.82392 22.8913 9.99952 23.3333 9.99952C25.1014 9.99952 26.7971 10.7019 28.0474 11.9521C29.2976 13.2024 30 14.8981 30 16.6662C30 17.1082 30.1756 17.5321 30.4882 17.8447C30.8007 18.1573 31.2246 18.3328 31.6667 18.3328C32.1087 18.3328 32.5326 18.1573 32.8452 17.8447C33.1577 17.5321 33.3333 17.1082 33.3333 16.6662ZM36.9717 36.9395L38.4883 35.1912C39.4537 34.2227 39.9957 32.9111 39.9957 31.5437C39.9957 30.1763 39.4537 28.8646 38.4883 27.8962C38.4367 27.8445 34.4267 24.7595 34.4267 24.7595C33.4643 23.8434 32.1859 23.3333 30.8572 23.3351C29.5284 23.337 28.2515 23.8507 27.2917 24.7695L24.115 27.4462C21.522 26.373 19.1665 24.7981 17.1838 22.812C15.2011 20.8259 13.6304 18.4677 12.5617 15.8729L15.2283 12.7062C16.1479 11.7465 16.6622 10.4693 16.6643 9.14019C16.6665 7.81106 16.1564 6.53223 15.24 5.56952C15.24 5.56952 12.1517 1.56451 12.1 1.51285C11.1491 0.555762 9.85981 0.0112182 8.51072 -0.00312722C7.16163 -0.0174726 5.86105 0.499532 4.89 1.43618L2.97334 3.10285C-8.35 16.2395 16.0333 40.4345 29.6033 39.9995C30.9736 40.0075 32.3316 39.7408 33.5972 39.2152C34.8627 38.6896 36.0101 37.9159 36.9717 36.9395Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_2398_7613">
          <rect width="40" height="40" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function IconEnvelope({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
    >
      <path
        d="M39.9233 9.23633L25.8933 23.2663C24.329 24.8268 22.2096 25.7031 20 25.7031C17.7904 25.7031 15.671 24.8268 14.1067 23.2663L0.0766667 9.23633C0.0533333 9.49966 0 9.738 0 9.99966V29.9997C0.00264643 32.209 0.88147 34.3271 2.4437 35.8893C4.00593 37.4515 6.12401 38.3303 8.33333 38.333H31.6667C33.876 38.3303 35.9941 37.4515 37.5563 35.8893C39.1185 34.3271 39.9974 32.209 40 29.9997V9.99966C40 9.738 39.9467 9.49966 39.9233 9.23633Z"
        fill="currentColor"
      />
      <path
        d="M23.5367 20.9098L38.76 5.68484C38.0225 4.46203 36.9824 3.4499 35.74 2.74605C34.4975 2.04221 33.0946 1.67041 31.6667 1.6665H8.33332C6.90536 1.67041 5.50249 2.04221 4.26004 2.74605C3.01758 3.4499 1.97745 4.46203 1.23999 5.68484L16.4633 20.9098C17.4026 21.8454 18.6743 22.3706 20 22.3706C21.3257 22.3706 22.5974 21.8454 23.5367 20.9098Z"
        fill="currentColor"
      />
    </svg>
  );
}

function IconLocation({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
    >
      <g clipPath="url(#clip0_2398_7340)">
        <path
          d="M31.7849 28.6878C34.9127 25.5239 36.6669 21.2543 36.6669 16.8053C36.6669 12.3563 34.9127 8.08672 31.7849 4.9228C30.2441 3.36318 28.4089 2.12493 26.386 1.27981C24.363 0.434685 22.1924 -0.000488281 19.9999 -0.000488281C17.8075 -0.000488281 15.6369 0.434685 13.6139 1.27981C11.5909 2.12493 9.75581 3.36318 8.21493 4.9228C5.07984 8.094 3.32516 12.3758 3.33328 16.8351C3.3414 21.2943 5.11164 25.5697 8.25826 28.7295L14.2316 34.2945C15.7614 35.807 17.8242 36.6577 19.9755 36.6633C22.1267 36.6689 24.194 35.829 25.7316 34.3245L31.7849 28.6878ZM22.2366 24.4145C21.5415 24.7587 20.7764 24.9377 20.0008 24.9377C19.2251 24.9377 18.46 24.7587 17.7649 24.4145L14.4316 22.7478C13.599 22.3348 12.8987 21.6968 12.41 20.9062C11.9213 20.1156 11.6638 19.2039 11.6666 18.2745V13.3328C11.6633 12.4033 11.9204 11.4914 12.4088 10.7004C12.8972 9.90953 13.5974 9.27121 14.4299 8.8578L17.7633 7.19114C18.458 6.84583 19.2233 6.66613 19.9991 6.66613C20.7749 6.66613 21.5402 6.84583 22.2349 7.19114L25.5683 8.8578C26.4011 9.27098 27.1016 9.9092 27.5903 10.7001C28.079 11.4911 28.3364 12.4031 28.3333 13.3328V18.2761C28.3362 19.2054 28.079 20.1169 27.5906 20.9075C27.1022 21.6981 26.4022 22.3362 25.5699 22.7495L22.2366 24.4145ZM24.9149 12.8228C24.9696 12.9873 24.9983 13.1594 24.9999 13.3328V18.2761C25.0012 18.5861 24.9156 18.8902 24.7526 19.1539C24.5897 19.4176 24.3561 19.6303 24.0783 19.7678L20.7449 21.4345C20.5132 21.5496 20.2579 21.6095 19.9991 21.6095C19.7403 21.6095 19.485 21.5496 19.2533 21.4345L15.9199 19.7678C15.6422 19.6299 15.4087 19.4169 15.2461 19.1529C15.0834 18.8889 14.9982 18.5845 14.9999 18.2745V13.3328C15.0026 13.1628 15.0313 12.9942 15.0849 12.8328L18.7183 14.6495C19.1162 14.8484 19.555 14.9519 19.9999 14.9519C20.4448 14.9519 20.8836 14.8484 21.2816 14.6495L24.9149 12.8228ZM33.3333 38.3328C33.3333 38.7748 33.1577 39.1988 32.8451 39.5113C32.5325 39.8239 32.1086 39.9995 31.6666 39.9995H8.33326C7.89124 39.9995 7.46731 39.8239 7.15475 39.5113C6.84219 39.1988 6.6666 38.7748 6.6666 38.3328C6.6666 37.8908 6.84219 37.4668 7.15475 37.1543C7.46731 36.8417 7.89124 36.6661 8.33326 36.6661H31.6666C32.1086 36.6661 32.5325 36.8417 32.8451 37.1543C33.1577 37.4668 33.3333 37.8908 33.3333 38.3328Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_2398_7340">
          <rect width="40" height="40" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

function IconClock({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M12 7.5V12l3.5 2"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Brand fill used as hover background; icon flips to white (currentColor). */
const SOCIAL_ICON_BRAND_HOVER_BG: Record<
  "x" | "linkedin" | "facebook",
  string
> = {
  x: "hover:bg-[#000000]",
  linkedin: "hover:bg-[#0A66C2]",
  facebook: "hover:bg-[#1877F2]",
};

/** Sidebar contact row icons: navy icon → on row hover, white on #003859 and flipped diagonal radius. */
const CONTACT_SIDEBAR_ICON_TILE_CLASS =
  "flex h-14 w-14 shrink-0 items-center justify-center rounded-tl-xl rounded-br-xl border border-[#e0e6eb] bg-white text-[#003859] transition-all duration-500 ease-in-out group-hover:rounded-tl-none group-hover:rounded-br-none group-hover:rounded-tr-xl group-hover:rounded-bl-xl group-hover:border-transparent group-hover:bg-[#003859] group-hover:text-white";

function ContactSocialIcon({
  type,
  className,
}: {
  type: "x" | "linkedin" | "facebook";
  className?: string;
}) {
  const icons = {
    x: (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
      >
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.982h-7.406l-6.8-8.318-8.351 8.318H1.955l9.188-9.19L0 1.154h7.5l5.898 7.01 6.502-7.01z" />
      </svg>
    ),
    linkedin: (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
      >
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    facebook: (
      <svg
        className={className}
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden
      >
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  };
  return icons[type];
}

export default function ContactPageContent() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [countryCodes, setCountryCodes] = useState<string[]>([]);
  const [jobRole, setJobRole] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [serviceSub, setServiceSub] = useState("");
  const [whatsApp, setWhatsApp] = useState("");
  const [message, setMessage] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  /** Explicit v2 requires `render=explicit` in the script URL; we detect API via onLoad + fallback poll. */
  const [recaptchaApiReady, setRecaptchaApiReady] = useState(false);
  const [recaptchaHostEl, setRecaptchaHostEl] = useState<HTMLDivElement | null>(
    null,
  );
  const recaptchaWidgetIdRef = useRef<number | null>(null);

  const setRecaptchaHostRef = useCallback((node: HTMLDivElement | null) => {
    setRecaptchaHostEl(node);
  }, []);

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY || recaptchaApiReady) {
      return;
    }
    const deadline = Date.now() + 10000;
    const id = window.setInterval(() => {
      if (window.grecaptcha) {
        setRecaptchaApiReady(true);
        window.clearInterval(id);
        return;
      }
      if (Date.now() > deadline) {
        window.clearInterval(id);
      }
    }, 50);
    return () => window.clearInterval(id);
  }, [RECAPTCHA_SITE_KEY, recaptchaApiReady]);

  useEffect(() => {
    if (!RECAPTCHA_SITE_KEY || !recaptchaApiReady || !recaptchaHostEl) {
      return;
    }
    const el = recaptchaHostEl;
    const g = window.grecaptcha;
    if (!g) {
      return;
    }
    let cancelled = false;
    g.ready(() => {
      if (
        cancelled ||
        recaptchaWidgetIdRef.current !== null ||
        !el.isConnected
      ) {
        return;
      }
      recaptchaWidgetIdRef.current = g.render(el, {
        sitekey: RECAPTCHA_SITE_KEY,
        theme: "light",
      });
    });
    return () => {
      cancelled = true;
      recaptchaWidgetIdRef.current = null;
      el.innerHTML = "";
    };
  }, [recaptchaApiReady, recaptchaHostEl]);

  const fieldBase =
    "w-full rounded-[8px] border-2 bg-white px-4 py-3 font-jakarta text-[16px] leading-[16px] tracking-[1.1px] text-[#141a1f] placeholder:text-[#52697a] transition-colors duration-200 outline-none";
  const fieldDefault = "border-[#e0e6eb]";
  const fieldFocused = "border-[#ABE0FF]";

  const inputClass = (field: string) =>
    `${fieldBase} ${focusedField === field ? fieldFocused : fieldDefault}`;

  const labelForm =
    "font-jakarta text-[16px] font-normal leading-[16px] tracking-[1.1px] text-[#141a1f]";
  const asteriskClass = "text-[#ff0004]";

  const selectShell = (field: string) =>
    `relative flex w-full items-center rounded-[8px] border-2 bg-white transition-colors duration-200 ${
      focusedField === field ? fieldFocused : fieldDefault
    }`;

  const selectInner =
    "w-full appearance-none bg-transparent px-4 py-3 font-jakarta text-[16px] leading-[18px] tracking-[1.1px] outline-none scheme-light";

  const subServiceOptions = useMemo(() => {
    if (!serviceType || !isContactCategoryId(serviceType)) return [];
    return getContactSubServiceOptions(serviceType);
  }, [serviceType]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      let recaptchaToken: string | undefined;
      if (RECAPTCHA_SITE_KEY) {
        const g = window.grecaptcha;
        const wid = recaptchaWidgetIdRef.current;
        if (!g || wid === null) {
          setSubmitError(
            "Security check is still loading. Please wait a moment and try again.",
          );
          return;
        }
        const token = g.getResponse(wid).trim();
        if (!token) {
          setSubmitError("Please complete the reCAPTCHA before submitting.");
          return;
        }
        recaptchaToken = token;
      } else if (process.env.NODE_ENV === "production") {
        setSubmitError(
          "Contact form is not configured. Please email us directly.",
        );
        return;
      }

      if (countryCodes.length === 0) {
        setSubmitError("Please select at least one country.");
        return;
      }

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          company: company.trim(),
          countryCodes,
          jobRole,
          serviceType,
          serviceSub:
            serviceType === CONTACT_SERVICE_TYPE_OTHER ? "" : serviceSub,
          whatsApp: whatsApp.trim(),
          message: message.trim(),
          recaptchaToken,
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!res.ok) {
        if (RECAPTCHA_SITE_KEY && recaptchaWidgetIdRef.current !== null) {
          window.grecaptcha?.reset(recaptchaWidgetIdRef.current);
        }
        setSubmitError(
          data.error ||
            "Something went wrong. Please try again or email us directly.",
        );
        return;
      }

      router.push("/contact/thanks");
    } catch {
      setSubmitError("Network error. Check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-white pb-20 pt-6 lg:pb-28 lg:pt-0">
      {RECAPTCHA_SITE_KEY ? (
        <Script
          id="recaptcha-v2-explicit"
          src="https://www.google.com/recaptcha/api.js?render=explicit"
          strategy="afterInteractive"
          onLoad={() => setRecaptchaApiReady(true)}
        />
      ) : null}

      <div className="container">
        <div className="flex flex-col gap-14 lg:flex-row lg:items-start lg:gap-12 xl:gap-20">
          {/* —— Form (left on large screens) —— */}
          <div className="w-full min-w-0 lg:max-w-[60%] lg:flex-1">
            <h2 className="font-jakarta text-[28px] font-normal leading-[40px] tracking-[1.5px] text-[#003859]">
              Send your message
            </h2>
            <p className="mt-3 max-w-xl font-jakarta text-[16px] font-normal leading-normal text-[#52697A]">
              Fill out the form below — we’ll get back to you within 24 hours.
              Tell us about your company, role, and the WhiteGuard service
              you’re interested in.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 flex w-full flex-col gap-6"
            >
              <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-x-6 md:gap-y-5">
                <div
                  className={`flex flex-col gap-2 ${serviceType === CONTACT_SERVICE_TYPE_OTHER ? "md:col-span-2" : ""}`}
                >
                  <label htmlFor="contact-serviceType" className={labelForm}>
                    Service type <span className={asteriskClass}>*</span>
                  </label>
                  <div className={selectShell("serviceType")}>
                    <select
                      id="contact-serviceType"
                      required
                      value={serviceType}
                      onChange={(e) => {
                        setServiceType(e.target.value);
                        setServiceSub("");
                      }}
                      onFocus={() => setFocusedField("serviceType")}
                      onBlur={() => setFocusedField(null)}
                      className={`${selectInner} ${
                        serviceType ? "text-[#141a1f]" : "text-[#52697a]"
                      }`}
                    >
                      <option value="">Select service type</option>
                      {CONTACT_SERVICE_TYPE_OPTIONS.map((opt) => (
                        <option key={opt.id} value={opt.id}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2">
                      <Image
                        src="/images/icons/ChevronDown.svg"
                        alt=""
                        width={20}
                        height={20}
                        className="mx-auto block opacity-60"
                        aria-hidden
                      />
                    </div>
                  </div>
                </div>
                {serviceType !== CONTACT_SERVICE_TYPE_OTHER ? (
                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-serviceSub" className={labelForm}>
                      Service <span className={asteriskClass}>*</span>
                    </label>
                    <div
                      className={`${selectShell("serviceSub")} ${!serviceType ? "opacity-60" : ""}`}
                    >
                      <select
                        id="contact-serviceSub"
                        required={Boolean(
                          serviceType &&
                          serviceType !== CONTACT_SERVICE_TYPE_OTHER &&
                          subServiceOptions.length > 0,
                        )}
                        disabled={
                          !serviceType ||
                          serviceType === CONTACT_SERVICE_TYPE_OTHER ||
                          subServiceOptions.length === 0
                        }
                        value={serviceSub}
                        onChange={(e) => setServiceSub(e.target.value)}
                        onFocus={() => setFocusedField("serviceSub")}
                        onBlur={() => setFocusedField(null)}
                        className={`${selectInner} disabled:cursor-not-allowed ${
                          serviceSub ? "text-[#141a1f]" : "text-[#52697a]"
                        }`}
                      >
                        <option value="">
                          {serviceType
                            ? "Select a service"
                            : "Choose a service type first"}
                        </option>
                        {subServiceOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2">
                        <Image
                          src="/images/icons/ChevronDown.svg"
                          alt=""
                          width={20}
                          height={20}
                          className="mx-auto block opacity-60"
                          aria-hidden
                        />
                      </div>
                    </div>
                  </div>
                ) : null}{" "}
                <div className="flex flex-col gap-2  ">
                  <label htmlFor="contact-fullName" className={labelForm}>
                    Full Name <span className={asteriskClass}>*</span>
                  </label>
                  <input
                    id="contact-fullName"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    onFocus={() => setFocusedField("fullName")}
                    onBlur={() => setFocusedField(null)}
                    className={inputClass("fullName")}
                    placeholder="Your full name"
                    autoComplete="name"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-email" className={labelForm}>
                    Email <span className={asteriskClass}>*</span>
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className={inputClass("email")}
                    placeholder="you@company.com"
                    autoComplete="email"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-whatsApp" className={labelForm}>
                    Phone{" "}
                    <span className="text-[12px] font-normal normal-case tracking-normal text-[#52697a]">
                      (WhatsApp)
                    </span>
                  </label>
                  <input
                    id="contact-whatsApp"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    maxLength={48}
                    value={whatsApp}
                    onChange={(e) => setWhatsApp(e.target.value)}
                    onFocus={() => setFocusedField("whatsApp")}
                    onBlur={() => setFocusedField(null)}
                    className={inputClass("whatsApp")}
                    placeholder="Optional"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-company" className={labelForm}>
                    Company <span className={asteriskClass}>*</span>
                  </label>
                  <input
                    id="contact-company"
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    onFocus={() => setFocusedField("company")}
                    onBlur={() => setFocusedField(null)}
                    className={inputClass("company")}
                    placeholder="Company name"
                    autoComplete="organization"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span id="countries-label" className={labelForm}>
                    Countries <span className={asteriskClass}>*</span>
                  </span>
                  <PartnerCountryMultiSelect
                    id="contact-countryCodes"
                    value={countryCodes}
                    onChange={setCountryCodes}
                    focused={focusedField === "countryCodes"}
                    onInteract={() => setFocusedField("countryCodes")}
                  />
                </div>
                <div className="flex flex-col gap-2 ">
                  <label htmlFor="contact-jobRole" className={labelForm}>
                    Job role <span className={asteriskClass}>*</span>
                  </label>
                  <div className={selectShell("jobRole")}>
                    <select
                      id="contact-jobRole"
                      required
                      value={jobRole}
                      onChange={(e) => setJobRole(e.target.value)}
                      onFocus={() => setFocusedField("jobRole")}
                      onBlur={() => setFocusedField(null)}
                      className={`${selectInner} ${
                        jobRole ? "text-[#141a1f]" : "text-[#52697a]"
                      }`}
                    >
                      <option value="">Select job role</option>
                      {JOB_ROLES.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <div className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2">
                      <Image
                        src="/images/icons/ChevronDown.svg"
                        alt=""
                        width={20}
                        height={20}
                        className="mx-auto block opacity-60"
                        aria-hidden
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label htmlFor="contact-message" className={labelForm}>
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={6}
                    maxLength={5000}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    className={`${inputClass("message")} min-h-[140px] resize-y`}
                    placeholder="Write your message…"
                  />
                </div>
                {submitError ? (
                  <p
                    className="md:col-span-2 font-jakarta text-[14px] leading-snug text-[#b42318]"
                    role="alert"
                  >
                    {submitError}
                  </p>
                ) : null}
                {RECAPTCHA_SITE_KEY ? (
                  <div
                    ref={setRecaptchaHostRef}
                    className="recaptcha-container md:col-span-2 w-full min-w-0 max-w-full justify-self-stretch [&>.g-recaptcha]:w-full [&>.g-recaptcha]:max-w-full [&_.g-recaptcha>div]:w-full [&_iframe]:h-[78px] [&_iframe]:w-full! [&_iframe]:max-w-full!"
                  />
                ) : null}
              </div>

              {/* {RECAPTCHA_SITE_KEY ? (
                <p className="font-jakarta text-[12px] leading-relaxed text-[#52697A]">
                  This site is protected by reCAPTCHA and the Google{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-[#003859]"
                  >
                    Privacy Policy
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://policies.google.com/terms"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-[#003859]"
                  >
                    Terms of Service
                  </a>{" "}
                  apply.
                </p>
              ) : null} */}

              <HoverSwapButton
                as="button"
                type="submit"
                label={isSubmitting ? "Sending…" : "Send message"}
                hoverLabel={isSubmitting ? "Sending…" : "Send message"}
                variant="cta"
                showChevrons={false}
                disabled={isSubmitting}
              />
            </form>
          </div>

          {/* —— Contact sidebar (right) —— */}
          <aside className="w-full shrink-0 lg:max-w-[40%] ">
            <div className="overflow-hidden rounded-[10px] border border-[#e0e6eb]">
              <iframe
                title="WhiteGuard location"
                src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d2482.2683780198176!2d-0.09094147387124933!3d51.52663720929847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1ss%20128%2C%20City%20Road%2C%20London%2C%20EC1V%202NX%2C%20UNITED%20KINGDOM!5e0!3m2!1sen!2seg!4v1774413208319!5m2!1sen!2seg"
                width="100%"
                height={320}
                className="block min-h-[280px] w-full bg-[#f5f8fa] lg:h-[300px]"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <h2 className="mt-10 border-b border-[#c2cdd6] pb-5 font-jakarta text-[28px] font-medium leading-normal tracking-[1.5px] text-[#003859]">
              Contact us
            </h2>

            <ul className="mt-8 flex flex-col gap-8">
              <li className="group flex gap-4">
                <div className={CONTACT_SIDEBAR_ICON_TILE_CLASS} aria-hidden>
                  <IconLocation className="h-6 w-6 shrink-0" />
                </div>
                <div className="min-w-0 pt-0.5">
                  <p className="font-jakarta text-xs font-bold uppercase tracking-wide text-[#003859]">
                    Address
                  </p>
                  <a
                    href={CONTACT.addressHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block font-jakarta text-[16px] leading-relaxed text-[#52697A] underline-offset-4 transition hover:text-[#003859] hover:underline"
                  >
                    {CONTACT.address}
                  </a>
                </div>
              </li>

              <li className="group flex gap-4">
                <div className={CONTACT_SIDEBAR_ICON_TILE_CLASS} aria-hidden>
                  <IconPhone className="h-6 w-6 shrink-0" />
                </div>
                <div className="min-w-0 pt-0.5">
                  <p className="font-jakarta text-xs font-bold uppercase tracking-wide text-[#003859]">
                    Phone
                  </p>
                  <a
                    href={CONTACT.telHref}
                    className="mt-1 block font-jakarta text-[16px] text-[#52697A] transition hover:text-[#003859]"
                  >
                    {CONTACT.phone}
                  </a>
                </div>
              </li>
              <li className="group flex gap-4 border-b border-[#e0e6eb] pb-8">
                <div className={CONTACT_SIDEBAR_ICON_TILE_CLASS} aria-hidden>
                  <IconEnvelope className="h-6 w-6 shrink-0" />
                </div>
                <div className="min-w-0 pt-0.5">
                  <p className="font-jakarta text-xs font-bold uppercase tracking-wide text-[#003859]">
                    Email
                  </p>
                  <a
                    href={CONTACT.mailHref}
                    className="mt-1 block break-all font-jakarta text-[16px] text-[#52697A] transition hover:text-[#003859]"
                  >
                    {CONTACT.email}
                  </a>
                </div>
              </li>
              {/* <li className="group flex gap-4 border-b border-[#e0e6eb] pb-8">
                <div className={CONTACT_SIDEBAR_ICON_TILE_CLASS} aria-hidden>
                  <IconClock className="h-6 w-6 shrink-0" />
                </div>
                <div className="min-w-0 pt-0.5">
                  <p className="font-jakarta text-xs font-bold uppercase tracking-wide text-[#003859]">
                    Office hrs
                  </p>
                  <p className="mt-1 font-jakarta text-[16px] leading-relaxed text-[#52697A]">
                    {CONTACT.officeHours}
                  </p>
                </div>
              </li> */}
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              {socialLinks.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className={`flex h-11 w-11 items-center justify-center rounded-tl-xl rounded-br-xl border border-[#e0e6eb] bg-white text-[#52697A] transition-all duration-300 ease-out hover:rounded-tl-none hover:rounded-br-none hover:rounded-tr-xl hover:rounded-bl-xl hover:border-transparent hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#003859] ${SOCIAL_ICON_BRAND_HOVER_BG[s.icon]}`}
                >
                  <ContactSocialIcon type={s.icon} className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
