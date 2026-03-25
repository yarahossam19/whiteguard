/**
 * Navigation-related TypeScript types
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface NavLinkWithDropdown extends NavLink {
  hasDropdown?: boolean;
  subLinks?: NavLink[];
}

export interface FooterNavColumn {
  title: string;
  links: NavLink[];
}

export interface SocialLink {
  label: string;
  href: string;
  icon: "x" | "linkedin" | "facebook";
}

