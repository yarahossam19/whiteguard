"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { HoverSwapButton } from "@/components/ui/HoverSwapButton";
import { PartnerCountryMultiSelect } from "@/components/partners/PartnerCountryMultiSelect";

/** Same-origin proxy → `/api/partner-applications` (avoids CORS on partner API). */
const APPLICATIONS_URL = "/api/partner-applications";

const INDUSTRY_FOCUS_OPTIONS = [
  "System Integrator",
  "Consulting Firm",
  "Network & Security Provider",
  "Cybersecurity Provider",
  "Cloud Provider",
  "Managed Service Provider (MSP)",
  "Managed Security Service Provider (MSSP)",
  "Value-Added Reseller (VAR)",
  "Distributor",
  "Technology Vendor / ISV",
  "Technology Integration Partner",
  "Hosting / Data Center Provider",
  "Compliance / GRC Advisory Firm",
  "Digital Transformation / IT Services Provider",
  "Telecommunications / ISP Provider",
  "Training / Awareness Provider",
  "Other",
];

const CONTACT_TITLES = [
  "CEO / Founder",
  "CISO",
  "CTO",
  "Security Director",
  "Sales Director",
  "Channel Manager",
  "Other",
];

const COMPANY_SIZES = ["1-25", "26-100", "101-1000", "1001+"];

const PARTNERSHIP_TYPES = [
  "Strategic Partnership",
  "Reseller",
  "Technology Partner",
  "Referral Partner",
  "Other",
];

export default function BecomePartnerForm() {
  const router = useRouter();
  const [companyLegalName, setCompanyLegalName] = useState("");
  const [tradeName, setTradeName] = useState("");
  const [website, setWebsite] = useState("");
  const [countryCodes, setCountryCodes] = useState<string[]>([]);
  const [companySize, setCompanySize] = useState("");
  const [industry, setIndustry] = useState("");
  const [industryFocusOther, setIndustryFocusOther] = useState("");
  const [fullName, setFullName] = useState("");
  const [contactTitle, setContactTitle] = useState("");
  const [email, setEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [servicesOffered, setServicesOffered] = useState("");
  const [partnershipType, setPartnershipType] = useState("");
  const [activeDeal, setActiveDeal] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const inputBase =
    "w-full rounded-[8px] border-2 bg-white px-4 py-3 font-jakarta text-[16px] leading-[16px] tracking-[1.1px] text-[#141a1f] placeholder:text-[#52697a] transition-colors duration-200 outline-none";
  const inputDefault = "border-[#e0e6eb]";
  const inputFocused = "border-[#ABE0FF]";

  const inputClass = (field: string) =>
    `${inputBase} ${focusedField === field ? inputFocused : inputDefault}`;

  const labelClass =
    "font-jakarta text-[16px] font-normal leading-[16px] tracking-[1.1px] text-[#141a1f]";
  const asteriskClass = "text-[#ff0004]";

  const selectWrapper =
    "relative flex w-full items-center rounded-[8px] border-2 bg-white transition-colors duration-200";
  const selectWrapperDefault = "border-[#e0e6eb]";
  const selectWrapperFocused = "border-[#ABE0FF]";

  const selectClass = (value: string) =>
    `w-full appearance-none bg-transparent px-4 py-3 font-jakarta text-[16px] leading-[18px] tracking-[1.1px] outline-none scheme-light ${
      value ? "text-[#141a1f]" : "text-[#52697a]"
    }`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setIsSubmitting(true);

    if (countryCodes.length === 0) {
      setSubmitError("Please select at least one country.");
      setIsSubmitting(false);
      return;
    }

    if (industry === "Other" && !industryFocusOther.trim()) {
      setSubmitError("Please specify your industry focus.");
      setIsSubmitting(false);
      return;
    }

    const industryFocusValue =
      industry === "Other" ? industryFocusOther.trim() : industry;

    try {
      const payload = {
        CompanyLegalName: companyLegalName.trim(),
        TradeName: tradeName.trim(),
        Website: website.trim(),
        countryCodes,
        CompanySize: companySize,
        IndustryFocus: industryFocusValue,
        ContactFullName: fullName.trim(),
        ContactTitle: contactTitle,
        ContactEmail: email.trim(),
        ContactPhone: contactPhone.trim(),
        ServicesOffered: servicesOffered.trim(),
        PartnershipType: partnershipType,
        activeDeal,
      };

      const res = await fetch(APPLICATIONS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json().catch(() => ({}))) as {
        message?: string;
        error?: string;
        errors?: Record<string, string[]>;
      };

      if (!res.ok) {
        const fromErrors =
          data.errors &&
          Object.values(data.errors).flat().filter(Boolean).join(" ");
        setSubmitError(
          fromErrors ||
            data.message ||
            data.error ||
            "Something went wrong. Please try again.",
        );
        return;
      }

      router.push("/become-a-partner/thanks");
    } catch {
      setSubmitError("Network error. Check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-[850px] flex-col gap-8"
    >
      <div className="flex flex-col gap-4">
        <h1 className="mb-4 pb-4 font-jakarta text-[28px] font-normal leading-[40px] tracking-[1.5px] text-[#003859]">
          Submit your partnership application here
        </h1>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-[8px]">
            <label htmlFor="companyLegalName" className={labelClass}>
              Company legal name <span className={asteriskClass}>*</span>
            </label>
            <input
              id="companyLegalName"
              type="text"
              required
              value={companyLegalName}
              onChange={(e) => setCompanyLegalName(e.target.value)}
              onFocus={() => setFocusedField("companyLegalName")}
              onBlur={() => setFocusedField(null)}
              className={inputClass("companyLegalName")}
              placeholder=""
              autoComplete="organization"
            />
          </div>{" "}
          <div className="flex flex-col gap-[8px]">
            <span id="countries-label" className={labelClass}>
              Countries <span className={asteriskClass}>*</span>
            </span>
            <PartnerCountryMultiSelect
              id="countryCodes"
              value={countryCodes}
              onChange={setCountryCodes}
              focused={focusedField === "countryCodes"}
              onInteract={() => setFocusedField("countryCodes")}
            />
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            {" "}
            <div className="flex flex-col gap-[8px]">
              <label htmlFor="tradeName" className={labelClass}>
                Trade name <span className={asteriskClass}>*</span>
              </label>
              <input
                id="tradeName"
                type="text"
                required
                value={tradeName}
                onChange={(e) => setTradeName(e.target.value)}
                onFocus={() => setFocusedField("tradeName")}
                onBlur={() => setFocusedField(null)}
                className={inputClass("tradeName")}
                placeholder=""
              />
            </div>
            <div className="flex flex-col gap-[8px]">
              <label htmlFor="website" className={labelClass}>
                Website <span className={asteriskClass}>*</span>
              </label>
              <input
                id="website"
                type="text"
                required
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                onFocus={() => setFocusedField("website")}
                onBlur={() => setFocusedField(null)}
                className={inputClass("website")}
                placeholder="example.com"
                autoComplete="url"
              />
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="flex flex-col gap-[8px]">
              <label htmlFor="companySize" className={labelClass}>
                Company size <span className={asteriskClass}>*</span>
              </label>
              <div
                className={`${selectWrapper} ${
                  focusedField === "companySize"
                    ? selectWrapperFocused
                    : selectWrapperDefault
                }`}
              >
                <select
                  id="companySize"
                  required
                  value={companySize}
                  onChange={(e) => setCompanySize(e.target.value)}
                  onFocus={() => setFocusedField("companySize")}
                  onBlur={() => setFocusedField(null)}
                  className={selectClass(companySize)}
                >
                  <option value="">Select company size</option>
                  {COMPANY_SIZES.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                  <Image
                    src="/images/icons/ChevronDown.svg"
                    alt=""
                    width={20}
                    height={20}
                    aria-hidden
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-[8px]">
              <label htmlFor="industry" className={labelClass}>
                Industry focus <span className={asteriskClass}>*</span>
              </label>
              <div
                className={`${selectWrapper} ${
                  focusedField === "industry"
                    ? selectWrapperFocused
                    : selectWrapperDefault
                }`}
              >
                <select
                  id="industry"
                  required
                  value={industry}
                  onChange={(e) => {
                    const next = e.target.value;
                    setIndustry(next);
                    if (next !== "Other") {
                      setIndustryFocusOther("");
                    }
                  }}
                  onFocus={() => setFocusedField("industry")}
                  onBlur={() => setFocusedField(null)}
                  className={selectClass(industry)}
                >
                  <option value="">Select industry focus</option>
                  {INDUSTRY_FOCUS_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                  <Image
                    src="/images/icons/ChevronDown.svg"
                    alt=""
                    width={20}
                    height={20}
                    aria-hidden
                  />
                </div>
              </div>
            </div>
          </div>
          {industry === "Other" ? (
            <div className="flex flex-col gap-[8px]">
              <label htmlFor="industryFocusOther" className={labelClass}>
                Specify industry focus <span className={asteriskClass}>*</span>
              </label>
              <input
                id="industryFocusOther"
                type="text"
                required
                maxLength={200}
                value={industryFocusOther}
                onChange={(e) => setIndustryFocusOther(e.target.value)}
                onFocus={() => setFocusedField("industryFocusOther")}
                onBlur={() => setFocusedField(null)}
                className={inputClass("industryFocusOther")}
                placeholder="Enter your industry or segment"
              />
            </div>
          ) : null}
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="flex flex-col gap-[8px]">
              <label htmlFor="fullName" className={labelClass}>
                Contact full name <span className={asteriskClass}>*</span>
              </label>
              <input
                id="fullName"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                onFocus={() => setFocusedField("fullName")}
                onBlur={() => setFocusedField(null)}
                className={inputClass("fullName")}
                placeholder=""
                autoComplete="name"
              />
            </div>
            <div className="flex flex-col gap-[8px]">
              <label htmlFor="contactTitle" className={labelClass}>
                Contact title <span className={asteriskClass}>*</span>
              </label>
              <div
                className={`${selectWrapper} ${
                  focusedField === "contactTitle"
                    ? selectWrapperFocused
                    : selectWrapperDefault
                }`}
              >
                <select
                  id="contactTitle"
                  required
                  value={contactTitle}
                  onChange={(e) => setContactTitle(e.target.value)}
                  onFocus={() => setFocusedField("contactTitle")}
                  onBlur={() => setFocusedField(null)}
                  className={selectClass(contactTitle)}
                >
                  <option value="">Select title</option>
                  {CONTACT_TITLES.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                  <Image
                    src="/images/icons/ChevronDown.svg"
                    alt=""
                    width={20}
                    height={20}
                    aria-hidden
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-2 gap-4">
            {" "}
            <div className="flex flex-col gap-[8px]">
              <label htmlFor="email" className={labelClass}>
                Business email address <span className={asteriskClass}>*</span>
              </label>
              <input
                id="email"
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
            <div className="flex flex-col gap-[8px]">
              <label htmlFor="contactPhone" className={labelClass}>
                Contact phone <span className={asteriskClass}>*</span>
              </label>
              <input
                id="contactPhone"
                type="tel"
                inputMode="tel"
                required
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                onFocus={() => setFocusedField("contactPhone")}
                onBlur={() => setFocusedField(null)}
                className={inputClass("contactPhone")}
                placeholder=""
                autoComplete="tel"
              />
            </div>
          </div>
          <div className="flex flex-col gap-[8px]">
            <label htmlFor="servicesOffered" className={labelClass}>
              Services offered <span className={asteriskClass}>*</span>
            </label>
            <textarea
              id="servicesOffered"
              required
              rows={4}
              value={servicesOffered}
              onChange={(e) => setServicesOffered(e.target.value)}
              onFocus={() => setFocusedField("servicesOffered")}
              onBlur={() => setFocusedField(null)}
              className={`${inputClass("servicesOffered")} min-h-[100px] resize-y`}
              placeholder="e.g. Cloud Services, Managed SOC, …"
            />
          </div>
          <div className="flex flex-col gap-[8px]">
            <label htmlFor="partnershipType" className={labelClass}>
              Partnership type <span className={asteriskClass}>*</span>
            </label>
            <div
              className={`${selectWrapper} ${
                focusedField === "partnershipType"
                  ? selectWrapperFocused
                  : selectWrapperDefault
              }`}
            >
              <select
                id="partnershipType"
                required
                value={partnershipType}
                onChange={(e) => setPartnershipType(e.target.value)}
                onFocus={() => setFocusedField("partnershipType")}
                onBlur={() => setFocusedField(null)}
                className={selectClass(partnershipType)}
              >
                <option value="">Select partnership type</option>
                {PARTNERSHIP_TYPES.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                <Image
                  src="/images/icons/ChevronDown.svg"
                  alt=""
                  width={20}
                  height={20}
                  aria-hidden
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[8px]">
            <label
              htmlFor="activeDeal"
              className={`${labelClass} flex cursor-pointer items-start gap-3`}
            >
              <input
                id="activeDeal"
                type="checkbox"
                checked={activeDeal}
                onChange={(e) => setActiveDeal(e.target.checked)}
                onFocus={() => setFocusedField("activeDeal")}
                onBlur={() => setFocusedField(null)}
                className="mt-0.5 size-[18px] shrink-0 rounded border-[#c2cdd6] text-[#003859] focus:ring-2 focus:ring-[#ABE0FF] focus:ring-offset-2"
              />
              <span>
                Active deal{" "}
                <span className="font-jakarta font-normal text-[14px] text-[#52697a]">
                  (check if there is an active opportunity or deal today)
                </span>
              </span>
            </label>
          </div>
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
        disabled={isSubmitting}
      />
    </form>
  );
}
