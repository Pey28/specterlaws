"use client";

import { useEffect, useMemo, useState } from "react";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY || 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const bgUrl = useMemo(() => {
    // Unsplash Source API (no key required). Keep stable-ish by fixing dimensions.
    return "https://source.unsplash.com/1920x1200/?courtroom,night,city,justice";
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background image + parallax */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${bgUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transform: `translate3d(0, ${scrollY * 0.08}px, 0)`,
          willChange: "transform",
          filter: "saturate(1.05) contrast(1.08)",
        }}
        aria-hidden="true"
      />

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(10,15,30,0.82) 0%, rgba(10,15,30,0.72) 45%, rgba(10,15,30,0.94) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Subtle diagonal accent */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
        <div
          className="absolute -right-48 top-0 bottom-0 w-[60%] opacity-30"
          style={{
            background:
              "linear-gradient(180deg, rgba(59,130,246,0.55), rgba(255,77,109,0.28))",
            clipPath: "polygon(18% 0, 100% 0, 100% 100%, 0% 100%)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center lexcr-animate-in">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 lexcr-glass rounded-full px-4 py-1.5 mb-8">
          <span className="text-2xl">🇨🇷</span>
          <span className="text-white/90 text-sm font-medium">Especializado en Leyes Costarricenses</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-semibold text-white leading-tight mb-6 max-w-4xl mx-auto">
          Conoce y Defiende{" "}
          <span className="text-cr-red bg-white/95 rounded-lg px-2 inline-block leading-snug lexcr-glow-red">
            Tus Derechos
          </span>{" "}
          en Costa Rica
        </h1>

        <p className="text-lg sm:text-xl text-white/75 max-w-2xl mx-auto mb-10 leading-relaxed">
          Inteligencia artificial entrenada con la legislación costarricense. Consulta sobre
          derecho laboral, civil, penal y del consumidor — en segundos, en español.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="/chat"
            className="bg-cr-red hover:bg-cr-red-light text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg transition-all hover:scale-[1.03] w-full sm:w-auto lexcr-glow-red"
          >
            Consultar Ahora — Es Gratis
          </a>
          <a
            href="#areas"
            className="lexcr-glass hover:bg-white/10 text-white font-semibold text-lg px-8 py-4 rounded-full transition-all w-full sm:w-auto"
          >
            Ver Áreas Legales
          </a>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
          <div className="text-center">
            <div className="text-3xl font-extrabold text-white">100%</div>
            <div className="text-white/60 text-sm mt-1">Ley Costarricense</div>
          </div>
          <div className="text-center border-x border-white/15">
            <div className="text-3xl font-extrabold text-white">24/7</div>
            <div className="text-white/60 text-sm mt-1">Disponible</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-extrabold text-white">Gratis</div>
            <div className="text-white/60 text-sm mt-1">Consulta Inicial</div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 80L1440 80L1440 30C1200 70 960 10 720 40C480 70 240 10 0 30L0 80Z" fill="#0a0f1e" />
        </svg>
      </div>
    </section>
  );
}
