"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";

export default function CTA() {
  return (
    <section id="consultar" className="bg-black border-t border-white/[0.08] lexcr-section-pad">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        <ScrollReveal>
          <div className="max-w-4xl">
            <p className="hv-section-label mb-6">Empieza ahora</p>
            <h2 className="text-[clamp(2.2rem,6vw,5rem)] font-bold text-white tracking-[-0.03em] leading-[0.95] mb-8">
              ¿Tienes una situación legal?
            </h2>
            <p className="text-white/40 text-lg sm:text-xl max-w-2xl mb-12 leading-relaxed">
              Describe tu caso y Specterlaws te explicará tus derechos según la ley costarricense,
              qué puedes hacer y a dónde acudir.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <div className="border border-white/10 rounded-2xl p-6 sm:p-8 mb-8 max-w-2xl hv-card">
            <p className="text-xs text-white/25 uppercase tracking-wider mb-3">Tu consulta</p>
            <p className="text-white/60 text-base sm:text-lg leading-relaxed italic">
              &ldquo;Mi jefe me despidió sin darme preaviso ni pagarme el aguinaldo...&rdquo;
            </p>
            <div className="mt-6 pt-5 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs text-white/25">Disponible 24/7 · En español · Basado en leyes de Costa Rica</span>
              <a
                href="/chat"
                className="inline-flex items-center justify-center h-10 px-6 rounded-full bg-white text-black font-semibold text-sm hover:bg-white/90 transition-colors shrink-0"
              >
                Consultar →
              </a>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={160}>
          <div className="border-t border-white/[0.08] pt-10">
            <p className="text-white/40 text-sm mb-5">
              ¿Prefieres que te avisemos cuando haya novedades?
            </p>
            <form
              className="flex flex-col sm:flex-row gap-3 max-w-md"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="tucorreo@ejemplo.com"
                className="flex-1 h-11 px-4 rounded-full text-sm bg-transparent border border-white/15 text-white placeholder:text-white/25 focus:outline-none focus:border-white/40 transition-colors"
              />
              <button
                type="submit"
                className="h-11 px-6 rounded-full border border-white/20 text-white/70 font-medium text-sm hover:border-white/40 hover:text-white transition-colors shrink-0"
              >
                Notificarme
              </button>
            </form>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
