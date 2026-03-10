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
        style={{ width: "145px", height: "14px" }}
      />
      <Image
        src="/images/logo-icon.svg"
        alt="WHITEGUARD Logo Icon"
        width={26}
        height={20}
        style={{ width: "26px", height: "20px" }}
      />
    </Link>
  );
}
