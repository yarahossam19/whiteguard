"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { HoverSwapButton } from "@/components/ui/HoverSwapButton";

const INDUSTRIES = [
  "Technology",
  "Healthcare",
  "Finance",
  "Government",
  "Energy",
  "Retail",
  "Manufacturing",
  "Consulting",
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

export default function BecomePartnerForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [industry, setIndustry] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputBase =
    "w-full rounded-[8px] border-2 bg-white px-4 py-3 font-jakarta text-[16px] leading-[16px] tracking-[1.1px] text-[#141a1f] placeholder:text-[#52697a] transition-colors duration-200 outline-none";
  const inputDefault = "border-[#e0e6eb]";
  const inputFocused = "border-[#ABE0FF]";

  const inputClass = (field: string) =>
    `${inputBase} ${focusedField === field ? inputFocused : inputDefault}`;

  const labelClass =
    "font-jakarta text-[16px] font-normal leading-[24px] tracking-[1.5px] text-[#141a1f]";
  const asteriskClass = "text-[#ff0004]";

  const selectWrapper =
    "relative flex w-full items-center rounded-[8px] border-2 bg-white transition-colors duration-200";
  const selectWrapperDefault = "border-[#e0e6eb]";
  const selectWrapperFocused = "border-[#ABE0FF]";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // TODO: Wire to API or email handler
      await new Promise((r) => setTimeout(r, 500));
      router.push("/become-a-partner/thanks");
    } catch {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-[850px] flex-col gap-[71px]"
    >
      <div className="flex flex-col gap-[32px]">
        <h1 className="font-jakarta text-[28px] font-normal pb-4 leading-[40px] tracking-[1.5px] text-[#003859] mb-4">
          Submit your partnership application here
        </h1>

        <div className="flex flex-col gap-4">
          {/* Full Name */}
          <div className="flex flex-col gap-[8px]">
            <label htmlFor="fullName" className={labelClass}>
              Full Name <span className={asteriskClass}>*</span>
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
            />
          </div>

          {/* Business Email Address */}
          <div className="flex flex-col gap-[8px]">
            <label htmlFor="email" className={labelClass}>
              Business Email Address <span className={asteriskClass}>*</span>
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
            />
          </div>

          {/* Company */}
          <div className="flex flex-col gap-[8px]">
            <label htmlFor="company" className={labelClass}>
              Company <span className={asteriskClass}>*</span>
            </label>
            <input
              id="company"
              type="text"
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              onFocus={() => setFocusedField("company")}
              onBlur={() => setFocusedField(null)}
              className={inputClass("company")}
              placeholder="Your company name"
            />
          </div>

          {/* Industry */}
          <div className="flex flex-col gap-[8px]">
            <label htmlFor="industry" className={labelClass}>
              Industry <span className={asteriskClass}>*</span>
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
                onChange={(e) => setIndustry(e.target.value)}
                onFocus={() => setFocusedField("industry")}
                onBlur={() => setFocusedField(null)}
                className={`w-full appearance-none bg-transparent px-4 py-4 font-jakarta text-[16px] leading-[24px] tracking-[1.5px] outline-none scheme-light ${
                  industry ? "text-[#141a1f]" : "text-[#52697a]"
                }`}
              >
                <option value="">Select Industry</option>
                {INDUSTRIES.map((opt) => (
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

          {/* Job Role */}
          <div className="flex flex-col gap-[8px]">
            <label htmlFor="jobRole" className={labelClass}>
              Job Role <span className={asteriskClass}>*</span>
            </label>
            <div
              className={`${selectWrapper} ${
                focusedField === "jobRole"
                  ? selectWrapperFocused
                  : selectWrapperDefault
              }`}
            >
              <select
                id="jobRole"
                required
                value={jobRole}
                onChange={(e) => setJobRole(e.target.value)}
                onFocus={() => setFocusedField("jobRole")}
                onBlur={() => setFocusedField(null)}
                className={`w-full appearance-none bg-transparent px-4 py-4 font-jakarta text-[16px] leading-[24px] tracking-[1.5px] outline-none scheme-light ${
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
      </div>
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
