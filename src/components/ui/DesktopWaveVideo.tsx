"use client";

import { useEffect, useState } from "react";

interface DesktopWaveVideoProps {
  src: string;
}

/** Loads wave video only on lg+ viewports — avoids ~3MB download on mobile. */
export function DesktopWaveVideo({ src }: DesktopWaveVideoProps) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const sync = () => setEnabled(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  if (!enabled) {
    return null;
  }

  return (
    <video
      src={src}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      className="absolute inset-0 h-full w-full object-cover"
      aria-hidden
    />
  );
}
