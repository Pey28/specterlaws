import TypewriterText from "@/components/ui/TypewriterText";

export default function Hero() {
  return (
    <section className="relative min-h-[100dvh] sm:min-h-[92vh] flex items-center overflow-hidden bg-black lexcr-nav-offset">
      <div
        className="hero-logo-bg absolute inset-0 z-0 bg-cover bg-no-repeat bg-center md:bg-[position:center_38%] sm:scale-105"
        style={{ backgroundImage: "url(/logo-unificado.jpg?v=2)" }}
        aria-hidden="true"
      />

      {/* Overlay suave: deja ver el logo y oscurece solo bordes para el texto */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: [
            "linear-gradient(180deg, #000000 0%, #000000 18%, rgba(0,0,0,0.72) 32%, rgba(0,0,0,0.2) 48%, rgba(0,0,0,0.08) 68%, rgba(0,0,0,0.4) 100%)",
            "radial-gradient(ellipse 85% 75% at 50% 42%, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.4) 100%)",
          ].join(", "),
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-24 lg:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-3 rounded-2xl sm:rounded-full px-4 sm:px-5 py-2.5 sm:py-2 mb-6 sm:mb-8 border border-white/20 bg-black/35 shadow-lg ring-1 ring-white/10 lexcr-animate-in max-w-[95vw]">
            <span className="text-2xl sm:text-3xl leading-none" role="img" aria-label="Costa Rica">🇨🇷</span>
            <span className="text-white/90 text-xs sm:text-sm font-medium text-center leading-snug">
              Especializado en Leyes Costarricenses
            </span>
          </div>

          <h1 className="lexcr-hero-title sm:text-5xl md:text-6xl lg:text-8xl font-serif font-medium text-white sm:leading-[0.98] mb-5 sm:mb-6 tracking-[-0.02em] [text-shadow:0_2px_24px_rgba(0,0,0,0.85)]">
            <TypewriterText>Conoce y Defiende </TypewriterText>
            <span className="text-white inline-block leading-[0.95] border-b border-white/35">
              Tus Derechos
            </span>{" "}
            <TypewriterText speedMs={22}> en Costa Rica</TypewriterText>
          </h1>

          <p className="text-sm sm:text-xl text-white/90 max-w-2xl mx-auto mb-7 sm:mb-10 leading-relaxed px-1 [text-shadow:0_1px_16px_rgba(0,0,0,0.8)]">
            Inteligencia artificial entrenada con la legislación costarricense. Consulta sobre
            derecho laboral, civil, penal y del consumidor — en segundos, en español.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mb-8 sm:mb-14 w-full max-w-md sm:max-w-none mx-auto lexcr-animate-in" style={{ animationDelay: "120ms" }}>
            <a
              href="/chat"
              className="w-full sm:w-auto inline-flex items-center justify-center min-h-[48px] px-5 sm:px-7 rounded-md bg-white text-[#0b1220] font-semibold hover:bg-white/90 transition-colors text-sm sm:text-base"
            >
              Consultar Ahora — Es Gratis
            </a>
            <a
              href="#areas"
              className="w-full sm:w-auto inline-flex items-center justify-center min-h-[48px] px-5 sm:px-7 rounded-md border border-white/30 text-white hover:bg-white/10 transition-colors text-sm sm:text-base"
            >
              Ver Áreas Legales
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-10 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
