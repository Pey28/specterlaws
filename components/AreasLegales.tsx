"use client";

import type { CSSProperties } from "react";
import { useState } from "react";

const areas = [
  {
    icon: "⚖️",
    titulo: "Derecho Laboral",
    descripcion: "Despidos injustificados, aguinaldo, vacaciones, horas extra, acoso laboral y liquidaciones. Conoce lo que dice el Código de Trabajo.",
    ejemplos: ["¿Me pueden despedir sin causa?", "¿Cuánto me corresponde de liquidación?", "¿Qué hago si no me pagan horas extra?"],
    areaColor: "#3B82F6",
    tag: "Código de Trabajo",
  },
  {
    icon: "🏛️",
    titulo: "Derecho Civil",
    descripcion: "Contratos, arrendamientos, herencias, propiedad, pensión alimentaria y familia. Protege tus bienes y relaciones.",
    ejemplos: ["¿Cómo puedo sacar a un inquilino?", "¿Tengo derecho a herencia?", "¿Puedo anular un contrato?"],
    areaColor: "#8B5CF6",
    tag: "Código Civil",
  },
  {
    icon: "🔒",
    titulo: "Derecho Penal",
    descripcion: "Derechos del imputado, defensa pública, delitos informáticos, violencia doméstica y procesos penales en el OIJ y Ministerio Público.",
    ejemplos: ["¿Qué derechos tengo si me detienen?", "¿Cómo denuncio violencia doméstica?", "¿Qué es la flagrancia?"],
    areaColor: "#EF4444",
    tag: "Código Penal",
  },
  {
    icon: "🛒",
    titulo: "Derecho del Consumidor",
    descripcion: "Garantías, devoluciones, estafas, créditos abusivos y publicidad engañosa. La Ley 7472 protege tu bolsillo.",
    ejemplos: ["¿Cómo pongo una queja ante el MEIC?", "¿Qué hago si me vendieron un producto defectuoso?", "¿Pueden cobrarme intereses ilegales?"],
    areaColor: "#10B981",
    tag: "Ley 7472",
  },
];

export default function AreasLegales() {
  const [areaAbierta, setAreaAbierta] = useState<string | null>(null);

  return (
    <section id="areas" className="py-20 sm:py-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8">
          {areas.map((area, i) => (
            <div
              key={area.titulo}
              className="rounded-2xl p-5 sm:p-8 transition-all group lexcr-area-card"
              style={{ "--area-color": area.areaColor } as CSSProperties}
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="lexcr-area-icon p-3 text-3xl">{area.icon}</div>
                <div>
                  <span className="text-xs font-semibold text-white/45 uppercase tracking-wider">{area.tag}</span>
                  <h3 className="text-xl font-bold text-white mt-0.5">{area.titulo}</h3>
                </div>
              </div>

              <p className="text-white/65 mb-5 leading-relaxed">{area.descripcion}</p>

              <div className="space-y-2 hidden sm:block">
                <p className="text-xs font-semibold text-white/45 uppercase tracking-wider mb-3">Preguntas frecuentes</p>
                {area.ejemplos.map((ej) => (
                  <div key={ej} className="flex items-start gap-2 text-sm text-white/70">
                    <span className="mt-0.5 flex-shrink-0 text-white/80">›</span>
                    <span>{ej}</span>
                  </div>
                ))}
              </div>

              <div className="sm:hidden mt-3">
                <button
                  type="button"
                  onClick={() => setAreaAbierta((prev) => (prev === area.titulo ? null : area.titulo))}
                  className="lexcr-mobile-tap w-full flex items-center justify-between rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-left"
                  aria-expanded={areaAbierta === area.titulo}
                  aria-controls={`faq-${i}`}
                >
                  <span className="text-xs font-semibold text-white/65 uppercase tracking-wider">Preguntas frecuentes</span>
                  <span className="text-white/70">{areaAbierta === area.titulo ? "−" : "+"}</span>
                </button>
                {areaAbierta === area.titulo && (
                  <div id={`faq-${i}`} className="mt-3 space-y-2">
                    {area.ejemplos.map((ej) => (
                      <div key={ej} className="flex items-start gap-2 text-sm text-white/70">
                        <span className="mt-0.5 flex-shrink-0 text-white/80">›</span>
                        <span>{ej}</span>
                      </div>
                    ))}
                  </div>
                )}
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
