import HoverSurface from "@/components/ui/HoverSurface";
import ScrollReveal from "@/components/ui/ScrollReveal";

const stats = [
  { value: "4", label: "áreas del derecho costarricense" },
  { value: "24/7", label: "disponibilidad del asistente" },
  { value: "100%", label: "basado en leyes de Costa Rica" },
  { value: "< 10s", label: "tiempo promedio de respuesta" },
];

const testimonios = [
  {
    cita: "Finalmente entiendo qué me corresponde. Me explicó mis derechos laborales de forma clara, sin tecnicismos.",
    autor: "Usuario de San José",
    contexto: "Consulta laboral",
  },
  {
    cita: "Pensé que necesitaba un abogado para entender mi contrato de alquiler. Specterlaws lo explicó en segundos.",
    autor: "Usuaria de Heredia",
    contexto: "Derecho civil",
  },
  {
    cita: "Me orientó exactamente a qué institución acudir y qué documentos llevar. Ahorré tiempo y dinero.",
    autor: "Usuario de Cartago",
    contexto: "Denuncia MTSS",
  },
];

const razones = [
  { titulo: "Legislación actualizada", desc: "Entrenado con el Código de Trabajo, Código Civil, Código Penal y todas las leyes vigentes de Costa Rica." },
  { titulo: "100% Costarricense", desc: "Diseñado exclusivamente para la realidad jurídica de Costa Rica. No respuestas genéricas de otras jurisdicciones." },
  { titulo: "Privacidad garantizada", desc: "Tu consulta es confidencial. No almacenamos datos personales ni compartimos tu información con terceros." },
  { titulo: "Respuesta inmediata", desc: "Sin filas, sin citas. Recibe orientación legal en segundos, desde cualquier dispositivo." },
];

const instituciones = [
  { nombre: "MTSS", desc: "Ministerio de Trabajo" },
  { nombre: "MEIC", desc: "Protección al Consumidor" },
  { nombre: "OIJ", desc: "Investigación Judicial" },
  { nombre: "Defensoría", desc: "Defensoría de los Hab." },
  { nombre: "SUGEF", desc: "Supervisión Financiera" },
  { nombre: "Poder Judicial", desc: "Sistema de Justicia" },
];

export default function Confianza() {
  return (
    <section id="nosotros" className="bg-black">

      {/* Stats */}
      <div className="border-t border-white/[0.08] lexcr-section-pad">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <ScrollReveal className="mb-16">
            <p className="hv-section-label mb-4">En números</p>
          </ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.08]">
            {stats.map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 60}>
                <HoverSurface className="bg-black p-8 sm:p-10 h-full">
                  <div className="hv-stat-number mb-2">{s.value}</div>
                  <div className="text-xs sm:text-sm text-white/35 leading-snug">{s.label}</div>
                </HoverSurface>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonios */}
      <div className="border-t border-white/[0.08] lexcr-section-pad">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <ScrollReveal className="mb-16">
            <p className="hv-section-label mb-4">Lo que dicen</p>
            <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-white tracking-[-0.02em] leading-tight max-w-2xl">
              Usuarios que conocieron sus derechos
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.08]">
            {testimonios.map((t, i) => (
              <ScrollReveal key={t.autor} delay={i * 100}>
                <HoverSurface className="bg-black p-8 sm:p-10 flex flex-col justify-between min-h-[220px] h-full">
                  <p className="hv-quote mb-8">&ldquo;{t.cita}&rdquo;</p>
                  <div>
                    <div className="text-sm font-medium text-white">{t.autor}</div>
                    <div className="hv-section-label mt-1">{t.contexto}</div>
                  </div>
                </HoverSurface>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* Razones */}
      <div className="border-t border-white/[0.08] lexcr-section-pad">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <ScrollReveal className="mb-16">
            <p className="hv-section-label mb-4">¿Por qué Specterlaws?</p>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/[0.08]">
            {razones.map((r, i) => (
              <ScrollReveal key={r.titulo} delay={i * 60}>
                <HoverSurface className="bg-black p-8 sm:p-10 h-full">
                  <h3 className="text-lg font-bold text-white mb-3 tracking-tight">{r.titulo}</h3>
                  <p className="text-sm text-white/40 leading-relaxed">{r.desc}</p>
                </HoverSurface>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      {/* Instituciones marquee */}
      <div className="border-t border-white/[0.08] py-10 overflow-hidden">
        <div className="lexcr-marquee">
          <div className="lexcr-marquee-track gap-0">
            {[...instituciones, ...instituciones].map((inst, i) => (
              <div
                key={i}
                className="flex items-center gap-4 px-10 border-r border-white/[0.08] shrink-0"
              >
                <div>
                  <div className="text-sm font-bold text-white/60">{inst.nombre}</div>
                  <div className="text-xs text-white/25 mt-0.5">{inst.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
}
