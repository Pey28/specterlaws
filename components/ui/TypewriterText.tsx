"use client";

import { useEffect, useState } from "react";

type Props = {
  children: string;
  className?: string;
  speedMs?: number;
};

export default function TypewriterText({ children, className = "", speedMs = 28 }: Props) {
  const [prefersReducedMotion] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  // Start with full text so SSR/initial HTML is complete (LCP-safe).
  // The animation resets to 0 in useEffect only after hydration.
  const [visible, setVisible] = useState(children.length);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;
    setVisible(0);
    setAnimating(true);
    let i = -1;
    const id = window.setInterval(() => {
      i += 1;
      setVisible(i);
      if (i >= children.length) {
        window.clearInterval(id);
        setAnimating(false);
      }
    }, speedMs);
    return () => window.clearInterval(id);
  }, [children, speedMs, prefersReducedMotion]);

  const shownText = prefersReducedMotion ? children : children.slice(0, Math.max(visible, 0));

  return (
    <span className={className} aria-label={children}>
      {shownText}
      {animating && <span className="lexcr-caret" aria-hidden="true" />}
    </span>
  );
}
