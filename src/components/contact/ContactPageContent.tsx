"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { HoverSwapButton } from "@/components/ui/HoverSwapButton";

const COUNTRIES = [
  "United Kingdom",
  "United Arab Emirates",
  "Saudi Arabia",
  "Egypt",
  "Qatar",
  "Kuwait",
  "Bahrain",
  "Oman",
  "Jordan",
  "Lebanon",
  "United States",
  "Other",
];

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
          fill="#003859"
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
        fill="#003859"
      />
      <path
        d="M23.5367 20.9098L38.76 5.68484C38.0225 4.46203 36.9824 3.4499 35.74 2.74605C34.4975 2.04221 33.0946 1.67041 31.6667 1.6665H8.33332C6.90536 1.67041 5.50249 2.04221 4.26004 2.74605C3.01758 3.4499 1.97745 4.46203 1.23999 5.68484L16.4633 20.9098C17.4026 21.8454 18.6743 22.3706 20 22.3706C21.3257 22.3706 22.5974 21.8454 23.5367 20.9098Z"
        fill="#003859"
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
          fill="#003859"
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

export default function ContactPageContent() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [country, setCountry] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [whatsApp, setWhatsApp] = useState("");
  const [message, setMessage] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const inputBase =
    "w-full rounded-[8px] border-2 bg-white p-4 font-jakarta text-[16px] leading-[normal] tracking-[1.5px] text-[#141a1f] placeholder:text-[#52697a] transition-colors duration-200 outline-none";
  const inputDefault = "border-[#e0e6eb]";
  const inputFocused = "border-[#ABE0FF]";

  const inputClass = (field: string) =>
    `${inputBase} ${focusedField === field ? inputFocused : inputDefault}`;

  const labelClass =
    "font-jakarta text-[16px] font-normal leading-[normal] tracking-[1.5px] text-[#141a1f]";
  const asteriskClass = "text-[#ff0004]";

  const selectWrapperDefault = "border-[#e0e6eb]";
  const selectWrapperFocused = "border-[#ABE0FF]";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: fullName.trim(),
          email: email.trim(),
          company: company.trim(),
          country,
          jobRole,
          whatsApp: whatsApp.trim(),
          message: message.trim(),
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!res.ok) {
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
    <div className="w-full bg-white pb-32 pt-0">
      <div className="container flex flex-col lg:flex-row items-stretch justify-between gap-8   lg:items-center lg:gap-20">
        {/* OR */}
        {/* <p className="shrink-0 self-center whitespace-nowrap font-jakarta text-[28px] font-bold leading-[40px] tracking-[1.5px] text-[#003859]">
        OR
      </p> */}

        {/* Contact info column */}
        <div className="flex lg:w-[40%]   py-0 shrink-0 flex-col justify-between gap-8 rounded-[20px]     align-self-stretch">
          <h2 className="font-jakarta border-b border-[#c2cdd6] pb-5 text-[28px] font-medium leading-[1.5] tracking-[1.5px] text-[#003859]">
            Contact us
          </h2>

          <div className="flex flex-col gap-8">
            <a
              href={CONTACT.telHref}
              className="flex items-center gap-4 transition-opacity hover:opacity-80"
            >
              <IconPhone className="shrink-0" />
              <p className="font-jakarta text-[16px] font-medium leading-[1.2] tracking-[1.5px] text-[#003859]">
                {CONTACT.phone}
              </p>
            </a>

            <a
              href={CONTACT.mailHref}
              className="flex items-center gap-4 transition-opacity hover:opacity-80"
            >
              <IconEnvelope className="shrink-0" />
              <p className="font-jakarta text-[16px] font-medium leading-[1.2] tracking-[1.5px] text-[#003859]">
                {CONTACT.email}
              </p>
            </a>

            <a
              href={CONTACT.addressHref}
              target="_blank"
              className="flex items-center gap-4"
            >
              <IconLocation className="shrink-0" />
              <p className="font-jakarta text-[16px] font-medium leading-[1.2] tracking-[1.5px] text-[#003859]">
                {CONTACT.address}
              </p>
            </a>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d2482.2683780198176!2d-0.09094147387124933!3d51.52663720929847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1ss%20128%2C%20City%20Road%2C%20London%2C%20EC1V%202NX%2C%20UNITED%20KINGDOM!5e0!3m2!1sen!2seg!4v1774413208319!5m2!1sen!2seg"
              width="100%"
              height="450"
              style={{ border: "1px solid #ccc", borderRadius: "10px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        {/* Form card */}
        <div className="flex  align-self-stretch   lg:w-[60%]   flex-col rounded-[20px]  bg-white px-5 py-6 shadow-[0px_109px_31px_0px_rgba(0,0,0,0),0px_70px_28px_0px_rgba(0,0,0,0.01),0px_39px_24px_0px_rgba(0,0,0,0.05),0px_17px_17px_0px_rgba(0,0,0,0.09),0px_4px_10px_0px_rgba(0,0,0,0.1)]">
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col gap-[70px]"
          >
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-1 font-jakarta font-medium tracking-[1.5px]">
                <h1 className="text-[28px] font-medium leading-[1.5] text-[#003859]">
                  Start your security business
                </h1>
                <p className="text-[16px] leading-[1.2] text-[#52697a]">
                  Fill out the following form and we will get back to you in the
                  next 24 hours
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-fullName" className={labelClass}>
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
                  <label htmlFor="contact-email" className={labelClass}>
                    Business Email Address{" "}
                    <span className={asteriskClass}>*</span>
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
                    placeholder="Example@Example.co"
                    autoComplete="email"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-whatsApp" className={labelClass}>
                    WhatsApp
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
                    placeholder="WhatsApp number (optional)"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-company" className={labelClass}>
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
                    placeholder="Your company name"
                    autoComplete="organization"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-country" className={labelClass}>
                    Country <span className={asteriskClass}>*</span>
                  </label>
                  <div
                    className={`relative flex w-full items-center rounded-[8px] border-2 bg-white transition-colors duration-200 ${
                      focusedField === "country"
                        ? selectWrapperFocused
                        : selectWrapperDefault
                    }`}
                  >
                    <select
                      id="contact-country"
                      required
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      onFocus={() => setFocusedField("country")}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full appearance-none bg-transparent p-4 font-jakarta text-[16px] leading-[normal] tracking-[1.5px] outline-none scheme-light ${
                        country ? "text-[#141a1f]" : "text-[#52697a]"
                      }`}
                    >
                      <option value="">Select Country</option>
                      {COUNTRIES.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <div className=" absolute right-2 top-1/2 size-5 -translate-y-1/2">
                      <Image
                        src="/images/icons/ChevronDown.svg"
                        alt=""
                        width={20}
                        height={20}
                        className="mx-auto block"
                        aria-hidden
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="contact-jobRole" className={labelClass}>
                    Job Role <span className={asteriskClass}>*</span>
                  </label>
                  <div
                    className={`relative flex w-full items-center rounded-[8px] border-2 bg-white transition-colors duration-200 ${
                      focusedField === "jobRole"
                        ? selectWrapperFocused
                        : selectWrapperDefault
                    }`}
                  >
                    <select
                      id="contact-jobRole"
                      required
                      value={jobRole}
                      onChange={(e) => setJobRole(e.target.value)}
                      onFocus={() => setFocusedField("jobRole")}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full  appearance-none bg-transparent p-4 font-jakarta text-[16px] leading-[normal] tracking-[1.5px] outline-none scheme-light ${
                        jobRole ? "text-[#141a1f]" : "text-[#52697a]"
                      }`}
                    >
                      <option value="">Select Job Role</option>
                      {JOB_ROLES.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <div className=" absolute right-2 top-1/2 size-5 -translate-y-1/2">
                      <Image
                        src="/images/icons/ChevronDown.svg"
                        alt=""
                        width={20}
                        height={20}
                        className="mx-auto block"
                        aria-hidden
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-message" className={labelClass}>
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  maxLength={5000}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  className={`${inputClass("message")} min-h-[120px] resize-y`}
                  placeholder="Optional — tell us more about your inquiry"
                />
              </div>
            </div>

            {submitError ? (
              <p
                className="font-jakarta text-[15px] leading-snug text-[#b42318]"
                role="alert"
              >
                {submitError}
              </p>
            ) : null}

            <HoverSwapButton
              as="button"
              type="submit"
              label={isSubmitting ? "Submitting..." : "Submit"}
              hoverLabel={isSubmitting ? "Submitting..." : "Submit"}
              variant="cta"
              showChevrons={false}
              // showImg={true}
              // imgSrc="/images/icons/phone.svg"
              disabled={isSubmitting}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
