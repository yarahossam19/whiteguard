export const PARTNER_COUNTRY_OPTIONS: { code: string; label: string }[] = [
  { code: "GB", label: "United Kingdom" },
  { code: "AE", label: "United Arab Emirates" },
  { code: "SA", label: "Saudi Arabia" },
  { code: "EG", label: "Egypt" },
  { code: "QA", label: "Qatar" },
  { code: "KW", label: "Kuwait" },
  { code: "BH", label: "Bahrain" },
  { code: "OM", label: "Oman" },
  { code: "JO", label: "Jordan" },
  { code: "LB", label: "Lebanon" },
  { code: "US", label: "United States Of America" },
  { code: "OTHER", label: "Other" },
];

export const PARTNER_COUNTRY_CODE_SET = new Set(
  PARTNER_COUNTRY_OPTIONS.map((o) => o.code),
);

export function getPartnerCountryLabel(code: string): string {
  return PARTNER_COUNTRY_OPTIONS.find((o) => o.code === code)?.label ?? code;
}
