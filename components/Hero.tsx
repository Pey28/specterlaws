"use client";

import TypewriterText from "@/components/ui/TypewriterText";

export default function Hero() {
  return (
    <section className="relative min-h-[92svh] sm:min-h-[92vh] flex items-center overflow-hidden bg-[#05080f]">
      {/* Overlay editorial oscuro */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background:
            "linear-gradient(92deg, rgba(4,7,14,0.92) 0%, rgba(4,7,14,0.82) 40%, rgba(4,7,14,0.68) 62%, rgba(4,7,14,0.78) 100%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 sm:py-36 lg:py-40 lexcr-animate-in">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 rounded-full px-5 py-2 mb-8 border border-white/20 bg-black/35 shadow-lg ring-1 ring-white/10">
          <span className="text-3xl leading-none" role="img" aria-label="Costa Rica">
            🇨🇷
          </span>
          <span className="text-white/90 text-sm font-medium">
            Especializado en Leyes Costarricenses
          </span>
        </div>

          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-serif font-medium text-white leading-[1.02] sm:leading-[0.98] mb-6 tracking-[-0.02em]">
          <TypewriterText>Conoce y Defiende </TypewriterText>
          <span className="text-white inline-block leading-[0.95] border-b border-white/35">
            Tus Derechos
          </span>{" "}
          <TypewriterText speedMs={22}> en Costa Rica</TypewriterText>
        </h1>

          <p className="text-base sm:text-xl text-white/78 max-w-2xl mb-8 sm:mb-10 leading-relaxed lexcr-mobile-clamp-2 sm:[display:block]">
          Inteligencia artificial entrenada con la legislación costarricense. Consulta sobre
          derecho laboral, civil, penal y del consumidor — en segundos, en español.
        </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-12 sm:mb-14 w-full">
          <a
            href="/chat"
            className="w-full sm:w-auto inline-flex items-center justify-center min-h-[46px] px-7 rounded-md bg-white text-[#0b1220] font-semibold hover:bg-white/90 transition-colors"
          >
            Consultar Ahora — Es Gratis
          </a>
          <a
            href="#areas"
            className="w-full sm:w-auto inline-flex items-center justify-center min-h-[46px] px-7 rounded-md border border-white/30 text-white hover:bg-white/10 transition-colors"
          >
            Ver Áreas Legales
          </a>
        </div>

          <div className="grid grid-cols-3 gap-6 max-w-lg mx-auto pt-8 border-t border-white/20">
          <div className="text-center">
            <div className="lexcr-stat-value">100%</div>
            <div className="text-white/60 text-xs sm:text-sm mt-1">Ley Costarricense</div>
          </div>
          <div className="text-center border-x border-white/10">
            <div className="lexcr-stat-value">24/7</div>
            <div className="text-white/60 text-xs sm:text-sm mt-1">Disponible</div>
          </div>
          <div className="text-center">
            <div className="lexcr-stat-value">Gratis</div>
            <div className="text-white/60 text-xs sm:text-sm mt-1">Consulta Inicial</div>
          </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
