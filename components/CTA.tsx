"use client";

export default function CTA() {
  return (
    <section id="consultar" className="lexcr-section-pad">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main CTA card */}
        <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden p-6 sm:p-10 md:p-16 shadow-2xl lexcr-card border border-cr-blue/25">
          {/* Decorative stripes */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cr-red/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cr-blue/60 to-transparent" />

          <div className="text-4xl sm:text-5xl mb-4 sm:mb-5">🇨🇷</div>
          <h2 className="text-2xl sm:text-4xl font-serif font-semibold text-white mb-3 sm:mb-4 px-1">
            ¿Tienes una situación legal?
          </h2>
          <p className="text-white/70 text-base sm:text-lg mb-6 sm:mb-8 max-w-xl mx-auto leading-relaxed px-1">
            Describe tu caso y Specterlaws te explicará tus derechos según la ley costarricense, qué puedes hacer y a dónde acudir.
          </p>

          {/* Simulated chat input */}
          <div className="rounded-2xl p-3 sm:p-4 mb-6 max-w-2xl mx-auto lexcr-glass shadow-lg text-left">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-white/50 mb-1 font-medium">Cuéntame tu situación...</p>
                <p className="text-white/80 text-sm leading-relaxed">
                  &quot;Mi jefe me despidió sin darme preaviso ni pagarme el aguinaldo...&quot;
                </p>
              </div>
              <a
                href="/chat"
                className="lexcr-mobile-tap w-full sm:w-auto shrink-0 inline-flex items-center justify-center bg-cr-red hover:bg-cr-red-light text-white rounded-xl px-4 py-3 font-semibold text-sm transition-colors lexcr-glow-red"
              >
                Consultar →
              </a>
            </div>
          </div>

          <p className="text-white/55 text-sm">
            Disponible 24/7 · En español · Basado en leyes de Costa Rica
          </p>

          {/* Coming soon badge */}
          <div className="mt-5 sm:mt-6 inline-flex flex-wrap items-center justify-center gap-2 lexcr-glass rounded-2xl sm:rounded-full px-4 py-2.5 max-w-full">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
            <span className="text-white text-xs sm:text-sm font-medium text-center leading-snug">
              Bot IA en desarrollo — Registro anticipado abierto
            </span>
          </div>
        </div>

        {/* Email capture */}
        <div className="mt-8 sm:mt-10 rounded-2xl p-5 sm:p-8 lexcr-card border border-white/10">
          <h3 className="text-xl font-bold text-white mb-2">Sé el primero en usar Specterlaws</h3>
          <p className="text-white/60 text-sm mb-5">Déjanos tu correo y te avisamos cuando el asistente esté listo.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="tucorreo@ejemplo.com"
              className="flex-1 rounded-xl px-4 py-3 text-sm bg-white/5 border border-white/15 text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent"
            />
            <button
              type="submit"
              className="bg-cr-blue hover:bg-cr-blue-light text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors lexcr-glow-blue"
            >
              Notificarme
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
