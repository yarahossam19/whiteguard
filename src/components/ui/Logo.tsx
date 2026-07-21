import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({}: LogoProps) {
  return (
    <Link href="/" className="flex items-center" aria-label="WhiteGuard - Home">
      {/* <Image
        src="/images/whiteguard-logo-text.svg"
        alt="WhiteGuard Logo Text"
        width={145}
        height={14}
        fetchPriority="high"
        className="h-3 w-24 sm:h-3.5 sm:w-[130px] lg:h-[14px] lg:w-[145px]"
      /> */}
      <Image
        src="/images/logo-icon.svg"
        alt="WhiteGuard Logo Icon"
        width={76}
        height={46}
        fetchPriority="high"
        className="h-11 w-[76px] object-contain"
      />
    </Link>
  );
}
