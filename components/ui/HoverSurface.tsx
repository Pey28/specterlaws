"use client";

import { useRef, type CSSProperties, type MouseEvent, type ReactNode } from "react";

type HoverSurfaceProps = {
  children: ReactNode;
  className?: string;
};

export default function HoverSurface({ children, className = "" }: HoverSurfaceProps) {
  const ref = useRef<HTMLDivElement>(null);

  function handleMove(e: MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty("--hover-x", `${x}%`);
    el.style.setProperty("--hover-y", `${y}%`);
  }

  function handleLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--hover-x", "50%");
    el.style.setProperty("--hover-y", "50%");
  }

  return (
    <div
      ref={ref}
      className={`lexcr-hover-surface ${className}`.trim()}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={
        {
          "--hover-x": "50%",
          "--hover-y": "50%",
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}
