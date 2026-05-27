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
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    let i = -1;
    const id = window.setInterval(() => {
      i += 1;
      setVisible(i);
      if (i >= children.length) {
        window.clearInterval(id);
      }
    }, speedMs);

    return () => window.clearInterval(id);
  }, [children, speedMs, prefersReducedMotion]);

  const done = prefersReducedMotion || visible >= children.length;
  const shownText = prefersReducedMotion ? children : children.slice(0, Math.max(visible, 0));

  return (
    <span className={className} aria-label={children}>
      {shownText}
      {!done && <span className="lexcr-caret" aria-hidden="true" />}
    </span>
  );
}
