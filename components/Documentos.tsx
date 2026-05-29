"use client";

import { useState, useMemo } from "react";
import {
  FileText,
  Home,
  Briefcase,
  ShoppingCart,
  Handshake,
  Mail,
  AlertTriangle,
  DollarSign,
  Search,
  ArrowRight,
} from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";

type Categoria = "Todos" | "Laboral" | "Civil" | "Consumidor";

const documentos = [
  {
    icono: FileText,
    titulo: "Carta de Renuncia",
    descripcion: "Renuncia laboral con preaviso según el Código de Trabajo.",
    categoria: "Laboral" as const,
    popular: true,
  },
  {
    icono: Home,
    titulo: "Contrato de Arrendamiento",
    descripcion: "Contrato de alquiler de vivienda o local comercial conforme a la Ley 7527.",
    categoria: "Civil" as const,
    popular: true,
  },
  {
    icono: Briefcase,
    titulo: "Denuncia ante el MTSS",
    descripcion: "Denuncia por incumplimiento laboral ante el Ministerio de Trabajo.",
    categoria: "Laboral" as const,
    popular: false,
  },
  {
    icono: ShoppingCart,
    titulo: "Queja ante el MEIC",
    descripcion: "Queja formal por producto defectuoso, garantía no respetada o publicidad engañosa.",
    categoria: "Consumidor" as const,
    popular: true,
  },
  {
    icono: Handshake,
    titulo: "Contrato de Compraventa",
    descripcion: "Compraventa de bienes muebles entre particulares con validez legal.",
    categoria: "Civil" as const,
    popular: false,
  },
  {
    icono: Mail,
    titulo: "Carta de Cobro Formal",
    descripcion: "Carta formal de cobro de deuda o incumplimiento de contrato.",
    categoria: "Civil" as const,
    popular: false,
  },
  {
    icono: AlertTriangle,
    titulo: "Denuncia por Acoso Laboral",
    descripcion: "Denuncia ante la Inspección de Trabajo por hostigamiento o acoso en el trabajo.",
    categoria: "Laboral" as const,
    popular: false,
  },
  {
    icono: DollarSign,
    titulo: "Solicitud de Liquidación",
    descripcion: "Solicitud formal de pago de prestaciones laborales al empleador.",
    categoria: "Laboral" as const,
    popular: true,
  },
];

const CATEGORIAS: Categoria[] = ["Todos", "Laboral", "Civil", "Consumidor"];

export default function Documentos() {
  const [busqueda, setBusqueda] = useState("");
  const [categoriaActiva, setCategoriaActiva] = useState<Categoria>("Todos");

  const filtrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    return documentos.filter((doc) => {
      const matchCategoria = categoriaActiva === "Todos" || doc.categoria === categoriaActiva;
      const matchBusqueda =
        !q ||
        doc.titulo.toLowerCase().includes(q) ||
        doc.descripcion.toLowerCase().includes(q) ||
        doc.categoria.toLowerCase().includes(q);
      return matchCategoria && matchBusqueda;
    });
  }, [busqueda, categoriaActiva]);

  return (
    <section id="documentos" className="bg-black lexcr-section-pad border-t border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">

        {/* Hero */}
        <ScrollReveal className="mb-10 sm:mb-14">
          <p className="hv-section-label mb-4">Gratis y al instante</p>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] font-bold text-white tracking-[-0.02em] leading-tight mb-4">
            Documentos Legales
          </h2>
          <p className="text-white/45 max-w-xl text-base sm:text-lg leading-relaxed">
            Documentos con validez legal en Costa Rica, listos para usar. No requieren firma de abogado.
          </p>
        </ScrollReveal>

        {/* Search + Filters */}
        <ScrollReveal delay={60} className="mb-10 sm:mb-12 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25 pointer-events-none" />
            <input
              type="search"
              placeholder="Buscar por nombre o categoría…"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="w-full h-11 pl-10 pr-4 bg-white/[0.04] border border-white/10 rounded-xl text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-white/25 transition-colors"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            {CATEGORIAS.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoriaActiva(cat)}
                className={`h-8 px-4 rounded-full text-xs font-medium transition-colors border ${
                  categoriaActiva === cat
                    ? "bg-white text-black border-white"
                    : "bg-transparent text-white/50 border-white/15 hover:text-white hover:border-white/30"
                }`}
              >
                {cat}
                {cat !== "Todos" && (
                  <span className="ml-1.5 opacity-50">
                    {documentos.filter((d) => d.categoria === cat).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Disclaimer */}
        <ScrollReveal delay={80} className="mb-10 sm:mb-12">
          <div className="flex items-start gap-3 rounded-xl px-4 py-3.5 border border-amber-500/15 bg-amber-500/[0.04] max-w-3xl">
            <AlertTriangle className="w-4 h-4 text-amber-400/70 shrink-0 mt-0.5" strokeWidth={1.5} />
            <p className="text-amber-100/60 text-xs leading-relaxed">
              <strong className="text-amber-200/80">Importante:</strong> Los documentos son válidos para trámites
              personales, laborales y del consumidor que{" "}
              <strong className="text-amber-200/80">no requieren autenticación notarial</strong>.
              Para escrituras o poderes notariales consultá un profesional.
            </p>
          </div>
        </ScrollReveal>

        {/* Grid */}
        {filtrados.length === 0 ? (
          <div className="text-center py-20 text-white/30">
            <FileText className="w-10 h-10 mx-auto mb-3 opacity-30" strokeWidth={1} />
            <p className="text-sm">No se encontraron documentos para &ldquo;{busqueda}&rdquo;</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.06]">
              {filtrados.map((doc, i) => {
                const Icon = doc.icono;
                return (
                  <ScrollReveal key={doc.titulo} delay={i * 40}>
                    <div className="group relative bg-black p-6 sm:p-7 flex flex-col h-full hover:bg-white/[0.025] transition-colors">
                      {/* Popular badge */}
                      {doc.popular && (
                        <span className="absolute top-5 right-5 text-[10px] font-medium text-white/35 border border-white/12 rounded-full px-2 py-0.5 tracking-wide">
                          Popular
                        </span>
                      )}

                      {/* Icon */}
                      <div className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center mb-5 group-hover:border-white/22 transition-colors">
                        <Icon className="w-5 h-5 text-white/55 group-hover:text-white/80 transition-colors" strokeWidth={1.5} />
                      </div>

                      {/* Category */}
                      <span className="hv-section-label mb-2">{doc.categoria}</span>

                      {/* Title */}
                      <h3 className="text-base font-semibold text-white mb-2 leading-snug tracking-tight">
                        {doc.titulo}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-white/40 leading-relaxed flex-1 mb-6">
                        {doc.descripcion}
                      </p>

                      {/* CTA */}
                      <a
                        href="/chat"
                        className="inline-flex items-center gap-2 text-sm font-medium text-white/40 hover:text-white transition-colors group/btn"
                      >
                        Generar documento
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" strokeWidth={1.5} />
                      </a>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

            {/* Bottom border */}
            <div className="h-px bg-white/[0.06]" />
          </>
        )}

        {/* Bottom CTA */}
        <ScrollReveal className="mt-12 sm:mt-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-white font-semibold text-lg mb-1 tracking-tight">
                ¿No encontrás el documento que necesitás?
              </p>
              <p className="text-white/40 text-sm">
                Describí tu situación y Specterlaws genera el documento adecuado para tu caso.
              </p>
            </div>
            <a
              href="/chat"
              className="shrink-0 inline-flex items-center gap-2.5 h-11 px-6 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors"
            >
              Solicitar documento
              <ArrowRight className="w-4 h-4" strokeWidth={2} />
            </a>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
