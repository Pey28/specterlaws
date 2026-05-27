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
    <section id="nosotros" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Por qué confiar */}
        <div className="text-center mb-16">
          <span className="text-[#CF142B] font-semibold text-sm uppercase tracking-wider">Confianza</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#003F87] mt-2 mb-4">
            ¿Por qué usar LexCR?
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {razones.map((r) => (
            <div key={r.titulo} className="rounded-2xl bg-gray-50 p-6 hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">{r.icono}</div>
              <h3 className="font-bold text-[#1a1a2e] text-lg mb-2">{r.titulo}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{r.desc}</p>
            </div>
          ))}
        </div>

        {/* Instituciones */}
        <div className="bg-[#003F87] rounded-3xl p-10 text-center">
          <h3 className="text-white font-bold text-xl mb-2">
            Te orientamos hacia las instituciones correctas
          </h3>
          <p className="text-blue-200 text-sm mb-8">
            LexCR te dice exactamente a qué entidad costarricense acudir según tu caso.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {instituciones.map((inst) => (
              <div key={inst.nombre} className="bg-white/10 rounded-xl p-4 hover:bg-white/20 transition-colors">
                <div className="text-3xl mb-2">{inst.icono}</div>
                <div className="text-white font-bold text-sm">{inst.nombre}</div>
                <div className="text-blue-300 text-xs mt-1">{inst.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
