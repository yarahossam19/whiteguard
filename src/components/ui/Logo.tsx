import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({}: LogoProps) {
  return (
    <Link
      href="/"
      className="flex items-center gap-1.5"
      aria-label="WHITEGUARD - Home"
    >
      <Image
        src="/images/whiteguard-logo-text.svg"
        alt="WHITEGUARD Logo Text"
        width={145}
        height={14}
        fetchPriority="high"
        className="h-3 w-24 sm:h-3.5 sm:w-[130px] lg:h-[14px] lg:w-[145px]"
      />
      <Image
        src="/images/logo-icon.svg"
        alt="WHITEGUARD Logo Icon"
        width={26}
        height={20}
        fetchPriority="high"
        className="h-4 w-5 sm:h-5 sm:w-6 lg:h-5 lg:w-[26px]"
      />
    </Link>
  );
}
