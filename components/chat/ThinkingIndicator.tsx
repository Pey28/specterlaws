"use client";

import { useEffect, useState } from "react";

const TEXTOS = [
  "Defendiendo tu caso...",
  "Revisando leyes de Costa Rica...",
  "Analizando tu consulta...",
  "Preparando tu defensa...",
];

function KingSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 72 80"
      width="72"
      height="80"
      aria-hidden="true"
    >
      <style>{`
        @keyframes swing {
          from { transform: rotate(-20deg); }
          to   { transform: rotate(15deg); }
        }
        .king-arm-right {
          transform-origin: 36px 48px;
          animation: swing 0.9s ease-in-out infinite alternate;
        }
      `}</style>

      {/* ── Crown ── */}
      <polygon points="18,22 24,10 30,18 36,8 42,18 48,10 54,22" fill="#C0392B" />
      {/* Crown gems */}
      <circle cx="24" cy="13" r="2.2" fill="white" opacity="0.9" />
      <circle cx="36" cy="10" r="2.2" fill="white" opacity="0.9" />
      <circle cx="48" cy="13" r="2.2" fill="white" opacity="0.9" />
      {/* Crown base band */}
      <rect x="17" y="21" width="38" height="5" rx="1" fill="#A93226" />

      {/* ── Face ── */}
      <ellipse cx="36" cy="34" rx="13" ry="12" fill="#f5d5d5" stroke="#C0392B" strokeWidth="1.2" />
      {/* Eyes */}
      <ellipse cx="31" cy="32" rx="1.8" ry="2" fill="#7B241C" />
      <ellipse cx="41" cy="32" rx="1.8" ry="2" fill="#7B241C" />
      {/* Eyebrows */}
      <path d="M28.5 28.5 Q31 27 33.5 28.5" stroke="#7B241C" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      <path d="M38.5 28.5 Q41 27 43.5 28.5" stroke="#7B241C" strokeWidth="1.3" fill="none" strokeLinecap="round" />
      {/* Mouth / smile */}
      <path d="M31 38 Q36 42 41 38" stroke="#C0392B" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      {/* Beard */}
      <path d="M24 38 Q28 46 36 47 Q44 46 48 38 Q44 41 36 42 Q28 41 24 38Z" fill="#922B21" opacity="0.85" />
      {/* Mustache */}
      <path d="M30 36 Q33 38 36 36 Q39 38 42 36" stroke="#7B241C" strokeWidth="1.3" fill="none" strokeLinecap="round" />

      {/* ── Body ── */}
      <rect x="22" y="46" width="28" height="26" rx="4" fill="#C0392B" />
      {/* Body decoration lines */}
      <line x1="36" y1="47" x2="36" y2="72" stroke="white" strokeWidth="1" opacity="0.35" />
      <line x1="22" y1="57" x2="50" y2="57" stroke="white" strokeWidth="1" opacity="0.25" />
      {/* Heart */}
      <path d="M33 61 C33 59 36 57 36 57 C36 57 39 59 39 61 C39 63 36 65 36 65 C36 65 33 63 33 61Z"
        fill="white" opacity="0.7" />

      {/* ── Shoulders ── */}
      <ellipse cx="22" cy="49" rx="5" ry="4" fill="#922B21" />
      <ellipse cx="50" cy="49" rx="5" ry="4" fill="#922B21" />

      {/* ── Left arm + orb (static) ── */}
      <rect x="10" y="48" width="10" height="5" rx="2.5" fill="#922B21" transform="rotate(20 15 50)" />
      <circle cx="10" cy="56" r="4.5" fill="#922B21" stroke="#7B241C" strokeWidth="1.2" />
      <circle cx="10" cy="56" r="2" fill="#C0392B" opacity="0.6" />
      <circle cx="9" cy="55" r="0.8" fill="white" opacity="0.7" />

      {/* ── Right arm + sword (animated) ── */}
      <g className="king-arm-right">
        {/* Upper arm */}
        <rect x="52" y="46" width="11" height="5" rx="2.5" fill="#922B21" />
        {/* Forearm */}
        <rect x="58" y="49" width="5" height="10" rx="2" fill="#A93226" />
        {/* Sword handle */}
        <rect x="60" y="55" width="3" height="6" rx="1" fill="#7B241C" />
        {/* Guard (crossguard) */}
        <rect x="57" y="60" width="9" height="2.5" rx="1.2" fill="#7B241C" />
        {/* Blade */}
        <path d="M61.5 62 L62.5 62 L62 80 Z" fill="#BDC3C7" />
        {/* Blade shine */}
        <line x1="61.8" y1="63" x2="61.8" y2="78" stroke="white" strokeWidth="0.5" opacity="0.6" />
      </g>
    </svg>
  );
}

export default function ThinkingIndicator() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % TEXTOS.length), 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex gap-3">
      {/* Avatar */}
      <div className="w-7 h-7 rounded-full bg-[#252525] border border-[#333] flex items-center justify-center text-sm shrink-0 mt-0.5">
        ⚖
      </div>

      {/* Thinking card */}
      <div className="flex flex-col items-start gap-3 py-2">
        {/* King SVG */}
        <div className="flex items-end gap-4">
          <KingSvg />

          <div className="flex flex-col gap-2 pb-1">
            {/* Rotating text */}
            <p
              key={idx}
              className="text-sm text-white/60 italic animate-[lexcr-fade-up_0.35s_ease-out_both]"
            >
              {TEXTOS[idx]}
            </p>

            {/* Three red dots */}
            <div className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full bg-[#C0392B] animate-bounce"
                style={{ animationDelay: "0ms" }}
              />
              <span
                className="w-2 h-2 rounded-full bg-[#C0392B] animate-bounce"
                style={{ animationDelay: "180ms" }}
              />
              <span
                className="w-2 h-2 rounded-full bg-[#C0392B] animate-bounce"
                style={{ animationDelay: "360ms" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
