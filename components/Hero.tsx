export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#003F87]">
      {/* Diagonal stripe accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-2 bg-[#CF142B]" />
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#CF142B]" />
        <div
          className="absolute -right-40 top-0 bottom-0 w-[55%] bg-[#1a5cb8] opacity-30"
          style={{ clipPath: "polygon(15% 0, 100% 0, 100% 100%, 0% 100%)" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-8">
          <span className="text-2xl">🇨🇷</span>
          <span className="text-white/90 text-sm font-medium">Especializado en Leyes Costarricenses</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 max-w-4xl mx-auto">
          Conoce y Defiende{" "}
          <span className="text-[#CF142B] bg-white rounded-lg px-2 inline-block leading-snug">
            Tus Derechos
          </span>{" "}
          en Costa Rica
        </h1>

        <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed">
          Inteligencia artificial entrenada con la legislación costarricense. Consulta sobre
          derecho laboral, civil, penal y del consumidor — en segundos, en español.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#consultar"
            className="bg-[#CF142B] hover:bg-[#a81022] text-white font-bold text-lg px-8 py-4 rounded-full shadow-lg transition-all hover:scale-105 w-full sm:w-auto"
          >
            Consultar Ahora — Es Gratis
          </a>
          <a
            href="#areas"
            className="bg-white/10 hover:bg-white/20 text-white font-semibold text-lg px-8 py-4 rounded-full border border-white/30 transition-all w-full sm:w-auto"
          >
            Ver Áreas Legales
          </a>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
          <div className="text-center">
            <div className="text-3xl font-extrabold text-white">100%</div>
            <div className="text-blue-200 text-sm mt-1">Ley Costarricense</div>
          </div>
          <div className="text-center border-x border-white/20">
            <div className="text-3xl font-extrabold text-white">24/7</div>
            <div className="text-blue-200 text-sm mt-1">Disponible</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-extrabold text-white">Gratis</div>
            <div className="text-blue-200 text-sm mt-1">Consulta Inicial</div>
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 80L1440 80L1440 30C1200 70 960 10 720 40C480 70 240 10 0 30L0 80Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
