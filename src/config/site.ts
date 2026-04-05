/**
 * Site-wide configuration and navigation structure
 */

export const siteConfig = {
  name: "WHITEGUARD",
  tagline:
    "Empowering businesses with intelligent, continuous security monitoring. We are your trusted partner in the digital landscape.",
  copyright: "©2026 WHITEGUARD Security. All rights reserved.",
} as const;

export const mainNav = [
  { label: "Home", href: "/" },
  // { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    hasDropdown: true,
    small: false,
    subLinks: [
      {
        label: "Offensive",
        description: "Find and exploit weaknesses before adversaries do.",
        href: "/services?tab=offensive",
        icon: "/images/nav-services/offensive.png",
      },
      {
        label: "Defensive",
        description: "Protect your infrastructure and respond to threats in real-time",
        href: "/services?tab=defensive",
        icon: "/images/nav-services/defensive.png",
      },
      {
        label: "GRC",
        description: "Manage organizational risk and ensure regulatory compliance",
        href: "/services?tab=grc",
        icon: "/images/nav-services/grc.png",
      },
      {
        label: "Awareness Training",
        description: "Empower your team to recognize and prevent cyber attacks",
        href: "/services?tab=training",
        icon: "/images/nav-services/training.png",
      },
    ],
  },
  { label: "Industries", href: "/industries" },
  { label: "Partners", href: "/partners" },
   
  { label: "Resources",small:true, href: "#.",hasDropdown: true, subLinks: [
    { label: "Blogs", href: "/resources",description: "Stay up-to-date with the latest news and insights from our team." },
    { label: "About Us", href: "/about",description: "Learn more about our company and our mission." },
    
  ] },
  // { label: "White Hawk", href: "https://www.whitehwk.com" },
] as const;

export const footerNav = {
  services: [
    { label: "Offensive Security", href: "/services?tab=offensive" },
    { label: "Defensive Security", href: "/services?tab=defensive" },
    { label: "GRC", href: "/services?tab=grc" },
    { label: "Training", href: "/services?tab=training" },
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
