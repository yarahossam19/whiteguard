/**
 * Site-wide configuration and navigation structure
 */

export const siteConfig = {
  name: "WHITEGUARD",
  tagline:
    "Empowering businesses with intelligent, continuous security monitoring. We are your trusted partner in the digital landscape.",
  copyright: "©2026 WhiteHawk Security. All rights reserved.",
} as const;

export const mainNav = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    hasDropdown: true,
    subLinks: [
      { label: "Offensive Security", href: "/services/offensive-security" },
      { label: "Defensive Security", href: "/services/defensive-security" },
      { label: "GRC", href: "/services/grc" },
      { label: "Training", href: "/services/training" },
    ],
  },
  { label: "Industries", href: "/industries" },
  { label: "Partners", href: "/partners" },
   
  { label: "Resources", href: "/resources" },
  { label: "White Hawk", href: "/white-hawk" },
] as const;

export const footerNav = {
  services: [
    { label: "Offensive Security", href: "/services/offensive-security" },
    { label: "Defensive Security", href: "/services/defensive-security" },
    { label: "GRC", href: "/services/grc" },
    { label: "Training", href: "/services/training" },
  ],
  platform: [
    { label: "Offensive", href: "/platform/offensive" },
    { label: "Defensive", href: "/platform/defensive" },
    { label: "GRC", href: "/platform/grc" },
    { label: "Asset Management", href: "/platform/asset-management" },
  ],
  solutions: [
    { label: "Fintech Company", href: "/solutions/fintech" },
    { label: "Public Sectors", href: "/solutions/public-sectors" },
    { label: "Healthcare Organizations", href: "/solutions/healthcare" },
  ],
} as const;

export const footerLegal = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
] as const;

export const partnerLogos = [
  { name: "Partner 1", logo: "/images/partners/placeholder.svg", href: "#" },
  { name: "Partner 2", logo: "/images/partners/placeholder.svg", href: "#" },
  { name: "Partner 3", logo: "/images/partners/placeholder.svg", href: "#" },
  { name: "Partner 4", logo: "/images/partners/placeholder.svg", href: "#" },
  { name: "Partner 5", logo: "/images/partners/placeholder.svg", href: "#" },
] as const;

export const socialLinks = [
  { label: "Twitter", href: "https://twitter.com", icon: "x" },
  { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
  { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
] as const;
