const instituciones = [
  { nombre: "MTSS", desc: "Ministerio de Trabajo", icono: "🏢" },
  { nombre: "MEIC", desc: "Protección al Consumidor", icono: "🛡️" },
  { nombre: "OIJ", desc: "Investigación Judicial", icono: "🔍" },
  { nombre: "Defensoría", desc: "Defensoría de los Hab.", icono: "⚖️" },
  { nombre: "SUGEF", desc: "Supervisión Financiera", icono: "🏦" },
  { nombre: "Poder Judicial", desc: "Sistema de Justicia", icono: "🏛️" },
];

const razones = [
  {
    icono: "📚",
    titulo: "Legislación Actualizada",
    desc: "Entrenado con el Código de Trabajo, Código Civil, Código Penal y todas las leyes vigentes de Costa Rica.",
  },
  {
    icono: "🇨🇷",
    titulo: "100% Costarricense",
    desc: "Diseñado exclusivamente para la realidad jurídica de Costa Rica. No respuestas genéricas de otras jurisdicciones.",
  },
  {
    icono: "🔐",
    titulo: "Privacidad Garantizada",
    desc: "Tu consulta es confidencial. No almacenamos datos personales ni compartimos tu información con terceros.",
  },
  {
    icono: "⚡",
    titulo: "Respuesta Inmediata",
    desc: "Sin filas, sin citas. Recibe orientación legal en segundos, desde cualquier dispositivo.",
  },
];

export default function Confianza() {
  return (
    <section id="nosotros" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Por qué confiar */}
        <div className="text-center mb-16 lexcr-animate-in">
          <span className="text-cr-red font-semibold text-sm uppercase tracking-wider">Confianza</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-white mt-2 mb-4">
            ¿Por qué usar LexCR?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {razones.map((r) => (
            <div key={r.titulo} className="rounded-2xl p-6 transition-shadow lexcr-card">
              <div className="text-4xl mb-4">{r.icono}</div>
              <h3 className="font-bold text-white text-lg mb-2">{r.titulo}</h3>
              <p className="text-white/65 text-sm leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>

        {/* Instituciones */}
        <div className="rounded-3xl p-10 text-center lexcr-card border border-cr-blue/25">
          <h3 className="text-white font-bold text-xl mb-2">
            Te orientamos hacia las instituciones correctas
          </h3>
          <p className="text-white/60 text-sm mb-8">
            LexCR te dice exactamente a qué entidad costarricense acudir según tu caso.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {instituciones.map((inst) => (
              <div key={inst.nombre} className="rounded-xl p-4 transition-colors lexcr-glass hover:bg-white/10">
                <div className="text-3xl mb-2">{inst.icono}</div>
                <div className="text-white font-bold text-sm">{inst.nombre}</div>
                <div className="text-white/55 text-xs mt-1">{inst.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
