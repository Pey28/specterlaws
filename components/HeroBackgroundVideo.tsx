"use client";

import { useState } from "react";

/** Abogado explicando a cliente con laptop (Mixkit #16106) */
const VIDEO_SRC = "/hero/justice-bg.mp4?v=5";

export default function HeroBackgroundVideo() {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return <div className="absolute inset-0 z-0 bg-black" aria-hidden />;
  }

  return (
    <video
      className="absolute inset-0 z-0 h-full w-full object-cover"
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      onError={() => setFailed(true)}
      aria-hidden
    >
      <source src={VIDEO_SRC} type="video/mp4" />
    </video>
  );
}
