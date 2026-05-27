const documentos = [
  {
    icono: "📄",
    titulo: "Carta de Renuncia",
    descripcion: "Renuncia laboral con preaviso según el Código de Trabajo.",
    categoria: "Laboral",
    color: "border-cr-blue/30",
    tag: "bg-cr-blue/15 text-cr-blue border border-cr-blue/25",
  },
  {
    icono: "🏠",
    titulo: "Contrato de Arrendamiento",
    descripcion: "Contrato de alquiler de vivienda o local comercial conforme a la Ley 7527.",
    categoria: "Civil",
    color: "border-cr-red/30",
    tag: "bg-cr-red/15 text-cr-red border border-cr-red/25",
  },
  {
    icono: "📬",
    titulo: "Denuncia ante el MTSS",
    descripcion: "Denuncia por incumplimiento laboral ante el Ministerio de Trabajo.",
    categoria: "Laboral",
    color: "border-cr-blue/30",
    tag: "bg-cr-blue/15 text-cr-blue border border-cr-blue/25",
  },
  {
    icono: "🛒",
    titulo: "Queja ante el MEIC",
    descripcion: "Queja formal por producto defectuoso, garantía no respetada o publicidad engañosa.",
    categoria: "Consumidor",
    color: "border-cr-red/30",
    tag: "bg-cr-red/15 text-cr-red border border-cr-red/25",
  },
  {
    icono: "🤝",
    titulo: "Contrato de Compraventa",
    descripcion: "Compraventa de bienes muebles entre particulares con validez legal.",
    categoria: "Civil",
    color: "border-cr-blue/30",
    tag: "bg-cr-blue/15 text-cr-blue border border-cr-blue/25",
  },
  {
    icono: "✉️",
    titulo: "Carta de Cobro Formal",
    descripcion: "Carta formal de cobro de deuda o incumplimiento de contrato.",
    categoria: "Civil",
    color: "border-cr-red/30",
    tag: "bg-cr-red/15 text-cr-red border border-cr-red/25",
  },
  {
    icono: "🚨",
    titulo: "Denuncia por Acoso Laboral",
    descripcion: "Denuncia ante la Inspección de Trabajo por hostigamiento o acoso en el trabajo.",
    categoria: "Laboral",
    color: "border-cr-blue/30",
    tag: "bg-cr-blue/15 text-cr-blue border border-cr-blue/25",
  },
  {
    icono: "💰",
    titulo: "Solicitud de Liquidación",
    descripcion: "Solicitud formal de pago de prestaciones laborales al empleador.",
    categoria: "Laboral",
    color: "border-cr-red/30",
    tag: "bg-cr-red/15 text-cr-red border border-cr-red/25",
  },
];

export default function Documentos() {
  return (
    <section id="documentos" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-6 lexcr-animate-in">
          <span className="text-cr-red font-semibold text-sm uppercase tracking-wider">Gratis y al instante</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-semibold text-white mt-2 mb-4">
            Generamos tus Documentos Legales
          </h2>
          <p className="text-white/65 max-w-2xl mx-auto text-lg">
            Documentos con validez legal en Costa Rica, listos para usar.
            No requieren firma de abogado.
          </p>
        </div>

        {/* Disclaimer banner */}
        <div className="flex items-start gap-3 rounded-xl px-5 py-4 max-w-3xl mx-auto mb-12 lexcr-glass border border-amber-500/20">
          <span className="text-amber-300 text-xl mt-0.5">⚠️</span>
          <p className="text-amber-100/90 text-sm leading-relaxed">
            <strong>Importante:</strong> Los documentos generados por LexCR son válidos para trámites personales, laborales y del consumidor que <strong>no requieren autenticación notarial ni firma de abogado</strong>. Para documentos que exigen firma ante notario (escrituras, poderes notariales, etc.) deberás consultar un profesional.
          </p>
        </div>

        {/* Documents grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {documentos.map((doc) => (
            <div
              key={doc.titulo}
              className={`rounded-2xl border ${doc.color} p-6 transition-all group cursor-pointer lexcr-card`}
            >
              <div className="text-4xl mb-4">{doc.icono}</div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${doc.tag}`}>
                {doc.categoria}
              </span>
              <h3 className="font-bold text-white text-base mt-3 mb-2">{doc.titulo}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{doc.descripcion}</p>
              <a
                href="#consultar"
                className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-cr-blue hover:text-cr-red transition-colors group-hover:gap-2"
              >
                Generar documento <span>→</span>
              </a>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center rounded-2xl py-8 px-6 lexcr-card border border-cr-blue/25">
          <p className="text-white font-semibold text-lg mb-2">
            ¿No encuentras el documento que necesitas?
          </p>
          <p className="text-white/60 text-sm mb-5">
            Descríbenos tu situación y LexCR genera el documento adecuado para tu caso.
          </p>
          <a
            href="#consultar"
            className="inline-block bg-cr-red hover:bg-cr-red-light text-white font-bold px-8 py-3 rounded-full transition-colors lexcr-glow-red"
          >
            Solicitar otro documento
          </a>
        </div>
      </div>
    </section>
  );
}
