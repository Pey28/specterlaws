const areas = [
  {
    icon: "⚖️",
    titulo: "Derecho Laboral",
    descripcion: "Despidos injustificados, aguinaldo, vacaciones, horas extra, acoso laboral y liquidaciones. Conoce lo que dice el Código de Trabajo.",
    ejemplos: ["¿Me pueden despedir sin causa?", "¿Cuánto me corresponde de liquidación?", "¿Qué hago si no me pagan horas extra?"],
    color: "border-cr-blue/45",
    iconBg: "bg-white/5",
    tag: "Código de Trabajo",
  },
  {
    icon: "🏛️",
    titulo: "Derecho Civil",
    descripcion: "Contratos, arrendamientos, herencias, propiedad, pensión alimentaria y familia. Protege tus bienes y relaciones.",
    ejemplos: ["¿Cómo puedo sacar a un inquilino?", "¿Tengo derecho a herencia?", "¿Puedo anular un contrato?"],
    color: "border-cr-red/45",
    iconBg: "bg-white/5",
    tag: "Código Civil",
  },
  {
    icon: "🔒",
    titulo: "Derecho Penal",
    descripcion: "Derechos del imputado, defensa pública, delitos informáticos, violencia doméstica y procesos penales en el OIJ y Ministerio Público.",
    ejemplos: ["¿Qué derechos tengo si me detienen?", "¿Cómo denuncio violencia doméstica?", "¿Qué es la flagrancia?"],
    color: "border-cr-blue/45",
    iconBg: "bg-white/5",
    tag: "Código Penal",
  },
  {
    icon: "🛒",
    titulo: "Derecho del Consumidor",
    descripcion: "Garantías, devoluciones, estafas, créditos abusivos y publicidad engañosa. La Ley 7472 protege tu bolsillo.",
    ejemplos: ["¿Cómo pongo una queja ante el MEIC?", "¿Qué hago si me vendieron un producto defectuoso?", "¿Pueden cobrarme intereses ilegales?"],
    color: "border-cr-red/45",
    iconBg: "bg-white/5",
    tag: "Ley 7472",
  },
];

export default function AreasLegales() {
  return (
    <section id="areas" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 lexcr-animate-in">
          <span className="text-cr-red font-semibold text-sm uppercase tracking-wider">Especialidades</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-white mt-2 mb-4">
            Áreas del Derecho Costarricense
          </h2>
          <p className="text-white/65 max-w-xl mx-auto text-lg">
            Asesoría basada en la legislación vigente de Costa Rica. Consulta sin rodeos, en tu idioma.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {areas.map((area) => (
            <div
              key={area.titulo}
              className={`rounded-2xl border ${area.color} p-8 transition-all group lexcr-card`}
            >
              <div className="flex items-start gap-4 mb-5">
                <div className={`${area.iconBg} rounded-xl p-3 text-3xl border border-white/10`}>{area.icon}</div>
                <div>
                  <span className="text-xs font-semibold text-white/45 uppercase tracking-wider">{area.tag}</span>
                  <h3 className="text-xl font-bold text-white mt-0.5">{area.titulo}</h3>
                </div>
              </div>

              <p className="text-white/65 mb-5 leading-relaxed">{area.descripcion}</p>

              <div className="space-y-2">
                <p className="text-xs font-semibold text-white/45 uppercase tracking-wider mb-3">Preguntas frecuentes</p>
                {area.ejemplos.map((ej) => (
                  <div key={ej} className="flex items-start gap-2 text-sm text-white/70">
                    <span className="text-cr-red mt-0.5 flex-shrink-0">›</span>
                    <span>{ej}</span>
                  </div>
                ))}
              </div>

              <a
                href="#consultar"
                className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-cr-blue hover:text-cr-red transition-colors group-hover:gap-2"
              >
                Consultar sobre esto <span>→</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
