import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { siteConfig, footerNav, footerLegal, socialLinks } from "@/config/site";

export function Footer() {
  return (
    <footer className="  bg-white" style={{ backdropFilter: "blur(8px)" }}>
      <div className="mx-auto max-w-[1506px] px-4 py-12 sm:px-6 lg:px-[50px] lg:py-16 xl:px-[113px] xl:pt-[65px] xl:pb-6">
        {/* Upper Section */}
        <div className="grid gap-8 lg:grid-cols-4 lg:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1 text-center lg:text-left flex flex-col items-center lg:items-start ">
            <div className="mb-4">
              <Logo />
            </div>
            <p className="mb-6 max-w-sm text-sm leading-relaxed text-[var(--primary-950)]/70">
              {siteConfig.tagline}
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.icon}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-[var(--primary-950)] duration-300 ease-out transition-[color,background-color] hover:bg-[#ABE0FF] hover:text-[var(--primary-950)]"
                  aria-label={social.label}
                >
                  <SocialIcon type={social.icon} className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Columns */}
          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-3">
            <FooterNavColumn title="Services" links={footerNav.services} />
            <FooterNavColumn title="Platform" links={footerNav.platform} />
            <FooterNavColumn title="Solutions" links={footerNav.solutions} />
          </div>
        </div>

        {/* Lower Section */}
        <div className="mt-8 flex flex-col  items-center justify-between gap-4 border-t border-[#52697A] pt-4 sm:flex-row">
          <p className="text-sm text-[var(--primary-950)]/60">
            {siteConfig.copyright}
          </p>
          <div className="flex gap-6">
            {footerLegal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-2 py-1 text-sm text-[var(--primary-950)]/60 duration-300 ease-out transition-[color,background-color] hover:bg-[#ABE0FF] hover:text-[var(--primary-950)]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterNavColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="mb-4 font-jakarta text-base font-bold   tracking-wider text-[var(--primary-950)]">
        {title}
      </h3>
      <ul className="space-y-0">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="font-jakarta inline-block rounded-lg px-2 py-1 text-sm text-[var(--primary-950)]/70 duration-300 ease-out transition-[color,background-color] hover:bg-[#ABE0FF] hover:text-[var(--primary-950)]"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({
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
        xmlns="http://www.w3.org/2000/svg"
        width="23"
        height="29"
        viewBox="0 0 23 29"
        fill="none"
      >
        <g clipPath="url(#clip0_1952_1865)">
          <path
            d="M13.9543 13.1049L22.4478 3.02344H20.4351L13.0604 11.7772L7.17006 3.02344H0.375977L9.28304 16.2606L0.375977 26.833H2.38869L10.1765 17.5882L16.3975 26.833H23.1916L13.9534 13.1049H13.9543ZM11.1974 16.3772L10.295 15.0592L3.11385 4.57058H6.20567L12.0009 13.0349L12.9032 14.353L20.436 25.3558H17.3442L11.1974 16.3772Z"
            fill="#52697A"
          />
        </g>
        <defs>
          <clipPath id="clip0_1952_1865">
            <rect width="22.967" height="28.4354" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),
    linkedin: (
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="29"
        height="29"
        viewBox="0 0 29 29"
        fill="none"
      >
        <path
          d="M19.0494 9.52344C20.9438 9.52344 22.7606 10.276 24.1001 11.6155C25.4397 12.9551 26.1922 14.7719 26.1922 16.6663V24.9996H21.4303V16.6663C21.4303 16.0348 21.1795 15.4292 20.7329 14.9827C20.2864 14.5362 19.6808 14.2853 19.0494 14.2853C18.4179 14.2853 17.8123 14.5362 17.3658 14.9827C16.9192 15.4292 16.6684 16.0348 16.6684 16.6663V24.9996H11.9065V16.6663C11.9065 14.7719 12.659 12.9551 13.9986 11.6155C15.3381 10.276 17.1549 9.52344 19.0494 9.52344Z"
          stroke="#52697A"
          strokeWidth="2.38095"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.1413 10.7129H2.37939V24.9986H7.1413V10.7129Z"
          stroke="#52697A"
          strokeWidth="2.38095"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.76035 7.14276C6.07531 7.14276 7.1413 6.07678 7.1413 4.76181C7.1413 3.44685 6.07531 2.38086 4.76035 2.38086C3.44538 2.38086 2.37939 3.44685 2.37939 4.76181C2.37939 6.07678 3.44538 7.14276 4.76035 7.14276Z"
          stroke="#52697A"
          strokeWidth="2.38095"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    facebook: (
      <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="27"
        viewBox="0 0 16 27"
        fill="none"
      >
        <path
          d="M14.2857 1.19043H10.7142C9.13557 1.19043 7.62156 1.81755 6.50527 2.93384C5.38898 4.05013 4.76186 5.56414 4.76186 7.14281V10.7142H1.19043V15.4761H4.76186V25H9.52376V15.4761H13.0952L14.2857 10.7142H9.52376V7.14281C9.52376 6.82708 9.64919 6.52427 9.87245 6.30102C10.0957 6.07776 10.3985 5.95233 10.7142 5.95233H14.2857V1.19043Z"
          stroke="#52697A"
          strokeWidth="2.38095"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  };
  return icons[type];
}
