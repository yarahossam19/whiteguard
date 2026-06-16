import { DesktopWaveVideo } from "./DesktopWaveVideo";

interface SectionSeparatorProps {
  /** Optional video source. SVG on viewports below lg; video on lg+ only. */
  videoSrc?: string;
  className?: string;
  direction?: "top" | "bottom";
  transform?: string;
}

function WaveSvg() {
  return (
    <svg
      className="block h-full w-full"
      viewBox="0 0 1440 150"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0,0 L1440,0 L1440,70 C1200,95 1000,45 720,65 C440,85 280,35 0,60 L0,0 Z"
        fill="white"
      />
      <path
        d="M0,60 C280,35 440,85 720,65 C1000,45 1200,95 1440,70 L1440,150 L0,150 Z"
        fill="#ABE0FF"
      />
    </svg>
  );
}

export function SectionVideoSeparator({
  direction = "top",
  transform = "rotateX(0)",
  videoSrc,
  className = "",
}: SectionSeparatorProps) {
  const topMarginClass =
    direction === "top" ? "mt-[-100px] md:mt-[-240px]" : "";
  const heightClass =
    direction === "bottom" ? "h-[120px] lg:h-[300px]" : "h-[300px]";

  if (!videoSrc) {
    return (
      <div
        className={`relative w-full overflow-hidden ${heightClass} ${className}`}
        style={{ alignSelf: "stretch" }}
        aria-hidden
      >
        <WaveSvg />
      </div>
    );
  }

  return (
    <div
      className={`relative z-0 overflow-hidden ${topMarginClass} ${heightClass} ${className}`}
      style={{ alignSelf: "stretch", transform }}
    >
      <div className="absolute inset-0 lg:hidden" aria-hidden>
        <WaveSvg />
      </div>
      <div className="absolute inset-0 hidden lg:block" aria-hidden>
        <DesktopWaveVideo src={videoSrc} />
      </div>
    </div>
  );
}
