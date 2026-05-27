"use client";

export default function CTA() {
  return (
    <section id="consultar" className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main CTA card */}
        <div className="relative rounded-3xl overflow-hidden p-10 sm:p-16 shadow-2xl lexcr-card border border-cr-blue/25">
          {/* Decorative stripes */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cr-red/70 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cr-blue/60 to-transparent" />

          <div className="text-5xl mb-5">🇨🇷</div>
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-white mb-4">
            ¿Tienes una situación legal?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Describe tu caso y Specterlaws te explicará tus derechos según la ley costarricense, qué puedes hacer y a dónde acudir.
          </p>

          {/* Simulated chat input */}
          <div className="rounded-2xl p-4 mb-6 max-w-2xl mx-auto lexcr-glass shadow-lg">
            <div className="flex items-center gap-3">
              <div className="flex-1 text-left">
                <p className="text-xs text-white/50 mb-1 font-medium">Cuéntame tu situación...</p>
                <p className="text-white/80 text-sm">
                  &quot;Mi jefe me despidió sin darme preaviso ni pagarme el aguinaldo...&quot;
                </p>
              </div>
              <button className="bg-cr-red hover:bg-cr-red-light text-white rounded-xl px-4 py-3 font-semibold text-sm transition-colors whitespace-nowrap lexcr-glow-red">
                Consultar →
              </button>
            </div>
          </div>

          <p className="text-white/55 text-sm">
            Disponible 24/7 · En español · Basado en leyes de Costa Rica
          </p>

          {/* Coming soon badge */}
          <div className="mt-6 inline-flex items-center gap-2 lexcr-glass rounded-full px-4 py-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white text-sm font-medium">Bot IA en desarrollo — Registro anticipado abierto</span>
          </div>
        </div>

        {/* Email capture */}
        <div className="mt-10 rounded-2xl p-8 lexcr-card border border-white/10">
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
