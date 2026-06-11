import Image from "next/image";

export function CheckIcon({
  className = "h-2.5 w-2.5",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function IconImage({
  src,
  alt = "",
  size = 28,
}: {
  src: string;
  alt?: string;
  size?: number;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className="object-contain"
    />
  );
}

export const partnerProgramIcons = {
  zap: "/images/icons/rocket.svg",
  trending: "/images/icons/growth-trend.svg",
  briefcase: "/images/icons/partner-solution.svg",
  sell: "/images/icons/benefit-pricing.svg",
  deliver: "/images/icons/deliver.svg",
  build: "/images/icons/key-scale.svg",
  faster: "/images/icons/rocket.svg",
  overhead: "/images/icons/overhead.svg",
  revenue: "/images/icons/growth-trend.svg",
  differentiate: "/images/icons/diff.svg",
  consulting: "/images/icons/partner-solution.svg",
  mssp: "/images/icons/partner-msp.svg",
  integrators: "/images/icons/partner-tech.svg",
  channel: "/images/icons/benefit-incentives.svg",
};
