import TypewriterText from "@/components/ui/TypewriterText";

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-between bg-black overflow-hidden lexcr-nav-offset">
      {/* Subtle radial glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,0.04) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-24">
        {/* Badge */}
        <div className="mb-8 sm:mb-10 lexcr-animate-in">
          <span className="inline-flex items-center gap-2.5 border border-white/15 rounded-full px-4 py-1.5 text-xs font-medium text-white/60 tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Especializado en leyes costarricenses
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-[clamp(2.6rem,8vw,7rem)] font-bold text-white leading-[0.95] tracking-[-0.03em] mb-8 sm:mb-10 max-w-5xl">
          <TypewriterText>Conoce y Defiende </TypewriterText>
          <br className="hidden sm:block" />
          <span className="text-white/40">Tus Derechos</span>
          <br className="hidden sm:block" />
          <TypewriterText speedMs={22}> en Costa Rica</TypewriterText>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-white/45 max-w-2xl mb-10 sm:mb-14 leading-relaxed">
          Inteligencia artificial entrenada con la legislación costarricense.
          Consulta sobre derecho laboral, civil, penal y del consumidor —
          en segundos, en español.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lexcr-animate-in" style={{ animationDelay: "120ms" }}>
          <a
            href="/chat"
            className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-white text-black font-semibold text-sm hover:bg-white/90 transition-colors"
          >
            Consultar Ahora — Es Gratis
          </a>
          <a
            href="#areas"
            className="inline-flex items-center justify-center h-12 px-8 rounded-full border border-white/20 text-white/70 font-medium text-sm hover:border-white/40 hover:text-white transition-colors"
          >
            Ver áreas legales
          </a>
        </div>
      </div>

      {/* Stats bar */}
      <div className="relative z-10 w-full border-t border-white/[0.08] lexcr-animate-in" style={{ animationDelay: "220ms" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-3 divide-x divide-white/[0.08]">
            {[
              { value: "100%", label: "Ley Costarricense" },
              { value: "24/7", label: "Disponible" },
              { value: "Gratis", label: "Consulta inicial" },
            ].map(({ value, label }) => (
              <div key={label} className="py-6 sm:py-8 px-4 sm:px-8 first:pl-0 last:pr-0">
                <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-1">{value}</div>
                <div className="text-xs text-white/35 tracking-wide">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
