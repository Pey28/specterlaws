import HoverSurface from "@/components/ui/HoverSurface";
import ScrollReveal from "@/components/ui/ScrollReveal";

const pasos = [
  {
    numero: "01",
    titulo: "Describe tu situación",
    descripcion: "Escribe en español, con tus propias palabras. No necesitas saber términos legales — solo cuéntanos qué pasó.",
  },
  {
    numero: "02",
    titulo: "Recibe análisis legal",
    descripcion: "Specterlaws analiza tu caso con base en el Código de Trabajo, Código Civil, Código Penal y la Ley 7472 vigentes en Costa Rica.",
  },
  {
    numero: "03",
    titulo: "Conoce tus opciones",
    descripcion: "Obtienes una explicación clara de tus derechos, las instituciones a las que puedes acudir y los pasos exactos a seguir.",
  },
];

export default function ComoFunciona() {
  return (
    <section id="como-funciona" className="bg-black lexcr-section-pad border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        <ScrollReveal className="mb-16 sm:mb-20">
          <p className="hv-section-label mb-4">Simple y rápido</p>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-white tracking-[-0.02em] leading-tight max-w-2xl">
            Asesoría legal en tres pasos
          </h2>
        </ScrollReveal>

        <div className="space-y-0">
          {pasos.map((paso, i) => (
            <ScrollReveal key={paso.numero} delay={i * 100}>
              <HoverSurface className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-6 md:gap-16 py-10 sm:py-12 border-t border-white/[0.08] group rounded-2xl px-4 -mx-4 sm:px-6 sm:-mx-6">
                <div>
                  <span className="text-[4rem] sm:text-[5rem] font-bold text-white/08 leading-none tracking-tighter">
                    {paso.numero}
                  </span>
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-tight">
                    {paso.titulo}
                  </h3>
                  <p className="text-white/45 leading-relaxed max-w-xl">
                    {paso.descripcion}
                  </p>
                </div>
              </HoverSurface>
            </ScrollReveal>
          ))}
        </div>

        <div className="border-t border-white/[0.08] pt-8 mt-2">
          <p className="text-xs text-white/25 max-w-2xl">
            Specterlaws brinda información legal orientativa basada en la legislación costarricense vigente.
            No reemplaza la consulta con un abogado colegiado para casos complejos.
          </p>
        </div>
      </div>
    </section>
  );
}
