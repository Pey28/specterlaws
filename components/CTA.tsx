"use client";

export default function CTA() {
  return (
    <section id="consultar" className="py-24 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main CTA card */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#003F87] to-[#1a5cb8] p-10 sm:p-16 shadow-2xl">
          {/* Decorative stripes */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#CF142B]" />
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#CF142B]" />

          <div className="text-5xl mb-5">🇨🇷</div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            ¿Tienes una situación legal?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Describe tu caso y LexCR te explicará tus derechos según la ley costarricense, qué puedes hacer y a dónde acudir.
          </p>

          {/* Simulated chat input */}
          <div className="bg-white rounded-2xl p-4 mb-6 max-w-2xl mx-auto shadow-lg">
            <div className="flex items-center gap-3">
              <div className="flex-1 text-left">
                <p className="text-xs text-gray-400 mb-1 font-medium">Cuéntame tu situación...</p>
                <p className="text-gray-700 text-sm">
                  "Mi jefe me despidió sin darme preaviso ni pagarme el aguinaldo..."
                </p>
              </div>
              <button className="bg-[#CF142B] hover:bg-[#a81022] text-white rounded-xl px-4 py-3 font-semibold text-sm transition-colors whitespace-nowrap">
                Consultar →
              </button>
            </div>
          </div>

          <p className="text-blue-300 text-sm">
            Disponible 24/7 · En español · Basado en leyes de Costa Rica
          </p>

          {/* Coming soon badge */}
          <div className="mt-6 inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white text-sm font-medium">Bot IA en desarrollo — Registro anticipado abierto</span>
          </div>
        </div>

        {/* Email capture */}
        <div className="mt-10 bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-[#003F87] mb-2">Sé el primero en usar LexCR</h3>
          <p className="text-gray-500 text-sm mb-5">Déjanos tu correo y te avisamos cuando el asistente esté listo.</p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="tucorreo@ejemplo.com"
              className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#003F87] focus:border-transparent"
            />
            <button
              type="submit"
              className="bg-[#003F87] hover:bg-[#002d66] text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors"
            >
              Notificarme
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
