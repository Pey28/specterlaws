"use client";

import Link from "next/link";

import HeroBackgroundVideo from "@/components/HeroBackgroundVideo";

export default function HeroVideoPreview() {
  return (
    <>
      <p className="fixed top-0 left-0 right-0 z-[60] bg-[#1a3a6b] text-white text-center text-xs sm:text-sm px-4 py-2.5 lexcr-safe-top">
        Vista previa — no es la página principal.{" "}
        <Link href="/" className="underline font-medium">
          Ver sitio actual
        </Link>
      </p>

      <section className="relative min-h-[100dvh] flex flex-col justify-between bg-black overflow-hidden pt-10">
        <HeroBackgroundVideo />

        <div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.55) 45%, rgba(0,0,0,0.75) 100%)",
          }}
          aria-hidden
        />

        <div className="relative z-10 flex-1 flex flex-col justify-center w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16 sm:py-24">
          <div className="mb-8 sm:mb-10">
            <span className="inline-flex items-center gap-2.5 border border-white/15 rounded-full px-4 py-1.5 text-xs font-medium text-white/60 tracking-wide">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Especializado en leyes costarricenses
            </span>
          </div>

          <h1 className="text-[clamp(2.6rem,8vw,7rem)] font-bold text-white leading-[0.95] tracking-[-0.03em] mb-8 sm:mb-10 max-w-5xl [text-shadow:0_2px_24px_rgba(0,0,0,0.85)]">
            Conoce y Defiende <br className="hidden sm:block" />
            <span className="text-white/40">Tus Derechos</span>
            <br className="hidden sm:block" />
            en Costa Rica
          </h1>

          <p className="text-base sm:text-xl text-white/45 max-w-2xl mb-10 sm:mb-14 leading-relaxed [text-shadow:0_1px_12px_rgba(0,0,0,0.9)]">
            Inteligencia artificial entrenada con la legislación costarricense. Consulta sobre
            derecho laboral, civil, penal y del consumidor — en segundos.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <span className="inline-flex items-center justify-center h-12 px-8 rounded-full bg-white text-black font-semibold text-sm">
              Consultar Ahora — Es Gratis
            </span>
            <span className="inline-flex items-center justify-center h-12 px-8 rounded-full border border-white/20 text-white/70 font-medium text-sm">
              Ver áreas legales
            </span>
          </div>
        </div>

        <div className="relative z-10 w-full border-t border-white/[0.08]">
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
            <div className="grid grid-cols-3 divide-x divide-white/[0.08]">
              {[
                { value: "100%", label: "Ley Costarricense" },
                { value: "24/7", label: "Disponible" },
                { value: "Gratis", label: "Consulta inicial" },
              ].map(({ value, label }) => (
                <div key={label} className="py-6 sm:py-8 px-2 sm:px-8">
                  <div className="text-xl sm:text-3xl font-bold text-white tracking-tight mb-1">
                    {value}
                  </div>
                  <div className="text-[10px] sm:text-xs text-white/35 tracking-wide">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <p className="relative z-10 bg-black text-center text-xs text-white/40 px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
        Video: equipo de abogados en oficina. Si no carga, verás fondo negro.
      </p>
    </>
  );
}
