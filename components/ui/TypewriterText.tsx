"use client";

type Props = {
  children: string;
  className?: string;
  speedMs?: number;
};

export default function TypewriterText({ children, className = "", speedMs = 28 }: Props) {
  void speedMs;

  return (
    <span className={className} aria-label={children}>
      {children}
    </span>
  );
}
