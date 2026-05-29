"use client";

import { useState } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";

const areas = [
  {
    numero: "01",
    titulo: "Derecho Laboral",
    descripcion: "Despidos injustificados, aguinaldo, vacaciones, horas extra, acoso laboral y liquidaciones. Conoce lo que dice el Código de Trabajo.",
    ejemplos: ["¿Me pueden despedir sin causa?", "¿Cuánto me corresponde de liquidación?", "¿Qué hago si no me pagan horas extra?"],
    tag: "Código de Trabajo",
  },
  {
    numero: "02",
    titulo: "Derecho Civil",
    descripcion: "Contratos, arrendamientos, herencias, propiedad, pensión alimentaria y familia. Protege tus bienes y relaciones.",
    ejemplos: ["¿Cómo puedo sacar a un inquilino?", "¿Tengo derecho a herencia?", "¿Puedo anular un contrato?"],
    tag: "Código Civil",
  },
  {
    numero: "03",
    titulo: "Derecho Penal",
    descripcion: "Derechos del imputado, defensa pública, delitos informáticos, violencia doméstica y procesos penales en el OIJ y Ministerio Público.",
    ejemplos: ["¿Qué derechos tengo si me detienen?", "¿Cómo denuncio violencia doméstica?", "¿Qué es la flagrancia?"],
    tag: "Código Penal",
  },
  {
    numero: "04",
    titulo: "Derecho del Consumidor",
    descripcion: "Garantías, devoluciones, estafas, créditos abusivos y publicidad engañosa. La Ley 7472 protege tu bolsillo.",
    ejemplos: ["¿Cómo pongo una queja ante el MEIC?", "¿Qué hago si me vendieron un producto defectuoso?", "¿Pueden cobrarme intereses ilegales?"],
    tag: "Ley 7472",
  },
];

export default function AreasLegales() {
  const [abierta, setAbierta] = useState<string | null>(null);

  return (
    <section id="areas" className="bg-black lexcr-section-pad">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Header */}
        <ScrollReveal className="mb-16 sm:mb-20">
          <p className="hv-section-label mb-4">Especialidades</p>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-white tracking-[-0.02em] leading-tight max-w-2xl">
            Cuatro áreas del derecho costarricense
          </h2>
        </ScrollReveal>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/[0.08]">
          {areas.map((area, i) => (
            <ScrollReveal key={area.titulo} delay={i * 80}>
              <div className="bg-black p-8 sm:p-10 group cursor-default h-full">
                <div className="flex items-start justify-between mb-6">
                  <span className="text-[2.5rem] font-bold text-white/10 leading-none tracking-tighter">
                    {area.numero}
                  </span>
                  <span className="hv-section-label">{area.tag}</span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                  {area.titulo}
                </h3>
                <p className="text-white/45 leading-relaxed mb-6 text-sm sm:text-base">
                  {area.descripcion}
                </p>

                {/* FAQs */}
                <div className="space-y-2 hidden sm:block">
                  {area.ejemplos.map((ej) => (
                    <div key={ej} className="flex items-start gap-2.5 text-sm text-white/35">
                      <span className="mt-0.5 flex-shrink-0">—</span>
                      <span>{ej}</span>
                    </div>
                  ))}
                </div>

                {/* Mobile accordion */}
                <div className="sm:hidden">
                  <button
                    type="button"
                    onClick={() => setAbierta((p) => (p === area.titulo ? null : area.titulo))}
                    className="flex items-center gap-2 text-xs text-white/40 uppercase tracking-wider"
                  >
                    <span>{abierta === area.titulo ? "Ocultar" : "Ver preguntas"}</span>
                    <span>{abierta === area.titulo ? "↑" : "↓"}</span>
                  </button>
                  {abierta === area.titulo && (
                    <div className="mt-3 space-y-2">
                      {area.ejemplos.map((ej) => (
                        <div key={ej} className="flex items-start gap-2 text-sm text-white/40">
                          <span className="mt-0.5 flex-shrink-0">—</span>
                          <span>{ej}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <a
                  href="/chat"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-white/40 hover:text-white transition-colors group-hover:gap-3"
                >
                  Consultar <span className="transition-transform group-hover:translate-x-1">→</span>
                </a>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
