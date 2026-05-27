const pasos = [
  {
    numero: "01",
    titulo: "Describe tu situación",
    descripcion: "Escribe en español, con tus propias palabras. No necesitas saber términos legales — solo cuéntanos qué pasó.",
    icono: "💬",
  },
  {
    numero: "02",
    titulo: "Recibe análisis legal",
    descripcion: "LexCR analiza tu caso con base en el Código de Trabajo, Código Civil, Código Penal y la Ley 7472 vigentes en Costa Rica.",
    icono: "🔍",
  },
  {
    numero: "03",
    titulo: "Conoce tus opciones",
    descripcion: "Obtienes una explicación clara de tus derechos, las instituciones a las que puedes acudir (MTSS, MEIC, OIJ, Defensoría) y los pasos a seguir.",
    icono: "📋",
  },
];

export default function ComoFunciona() {
  return (
    <section id="como-funciona" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 lexcr-animate-in">
          <span className="text-cr-red font-semibold text-sm uppercase tracking-wider">Simple y rápido</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-white mt-2 mb-4">
            ¿Cómo funciona LexCR?
          </h2>
          <p className="text-white/65 max-w-xl mx-auto text-lg">
            Sin citas, sin formularios, sin esperas. Asesoría legal disponible las 24 horas.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-14 left-[16.66%] right-[16.66%] h-px bg-gradient-to-r from-cr-blue via-cr-red to-cr-blue opacity-30" />

          {pasos.map((paso, i) => (
            <div key={paso.numero} className="relative flex flex-col items-center text-center">
              {/* Step number */}
              <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-5 shadow-lg border border-white/10 ${
                i === 1 ? "bg-cr-red lexcr-glow-red" : "bg-cr-blue lexcr-glow-blue"
              }`}>
                <span>{paso.icono}</span>
              </div>
              <span className={`text-xs font-bold tracking-widest mb-2 ${i === 1 ? "text-cr-red" : "text-cr-blue"}`}>
                PASO {paso.numero}
              </span>
              <h3 className="text-xl font-bold text-white mb-3">{paso.titulo}</h3>
              <p className="text-white/65 leading-relaxed max-w-xs">{paso.descripcion}</p>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-white/45 mt-14 max-w-2xl mx-auto">
          LexCR brinda información legal orientativa basada en la legislación costarricense vigente. No reemplaza la consulta con un abogado colegiado para casos complejos.
        </p>
      </div>
    </section>
  );
}
