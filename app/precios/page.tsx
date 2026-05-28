import type { Metadata } from "next";
import Link from "next/link";
import { PLANES, formatearPrecio } from "@/lib/planes";
import PagoModal from "@/components/precios/PagoModal";

export const metadata: Metadata = {
  title: "Planes y Precios",
  description:
    "Consultá tus derechos legales desde ₡500. Plan Básico ₡3,000/mes con consultas ilimitadas o Profesional ₡8,000/mes con redacción de documentos legales.",
  alternates: { canonical: "https://specterlaws.cr/precios" },
  openGraph: {
    title: "Planes y Precios – Specterlaws",
    description:
      "Desde ₡500 por consulta hasta planes ilimitados para empresas. Pagá con SINPE Móvil o tarjeta.",
    url: "https://specterlaws.cr/precios",
  },
};

const CHECK = () => (
  <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
  </svg>
);

const X = () => (
  <svg className="w-4 h-4 text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default function PreciosPage() {
  const planesVisibles = [PLANES.gratis, PLANES.basico, PLANES.profesional, PLANES.individual];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-black text-white px-3 sm:px-4 py-3 flex items-center gap-2 sm:gap-3 border-b border-white/10 lexcr-safe-top">
        <Link href="/" className="flex items-center shrink-0 hover:opacity-80 transition-opacity">
          <img src="/logo.png" alt="Specterlaws" className="h-8 w-auto max-w-[120px] object-contain" />
        </Link>
        <div className="hidden sm:block h-5 w-px bg-white/15" />
        <span className="hidden sm:inline text-sm text-white/60 truncate">Planes y Precios</span>
        <div className="ml-auto flex items-center gap-2 shrink-0">
          <Link
            href="/chat"
            className="text-xs sm:text-sm bg-white/5 hover:bg-white/10 text-white px-3 py-2 rounded-lg border border-white/15 transition-colors whitespace-nowrap"
          >
            Probar gratis
          </Link>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 lexcr-glass rounded-full px-4 py-1.5 mb-4">
            <span className="text-white/80 text-sm font-medium">Todos los planes en colones costarricenses</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-serif font-semibold text-white mb-3 px-2">
            Defendé tus derechos desde <span className="text-cr-red">₡500</span>
          </h1>
          <p className="text-white/60 max-w-xl mx-auto">
            Comenzá gratis y actualizá cuando lo necesités. Sin contratos de largo plazo.
          </p>
        </div>

        {/* Plan cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {planesVisibles.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl border flex flex-col lexcr-card ${
                plan.destacado
                  ? "border-cr-blue/55 ring-2 ring-cr-blue/15"
                  : "border-white/10"
              }`}
            >
              {plan.badgeTexto && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-cr-blue text-white text-xs font-bold px-3 py-1 rounded-full lexcr-glow-blue">
                    {plan.badgeTexto}
                  </span>
                </div>
              )}

              <div className="p-6 flex-1">
                <h2 className="text-lg font-bold text-white mb-1">{plan.nombre}</h2>
                <p className="text-xs text-white/55 mb-4 min-h-[32px]">{plan.descripcion}</p>

                {/* Price */}
                <div className="mb-5">
                  {plan.precio === 0 ? (
                    <span className="text-3xl font-extrabold text-white">Gratis</span>
                  ) : (
                    <div>
                      <span className="text-3xl font-extrabold text-white">
                        {formatearPrecio(plan.precio)}
                      </span>
                      <span className="text-sm text-white/45 ml-1">
                        {plan.periodo === "mes" ? "/mes" : plan.periodo === "uso" ? "/consulta" : ""}
                      </span>
                    </div>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-2.5">
                  {plan.caracteristicas.map((c) => (
                    <li key={c} className="flex items-start gap-2 text-sm text-white/75">
                      <CHECK />
                      <span>{c}</span>
                    </li>
                  ))}
                  {plan.noIncluye?.map((c) => (
                    <li key={c} className="flex items-start gap-2 text-sm text-white/40">
                      <X />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="p-6 pt-0">
                {plan.id === "gratis" ? (
                  <Link
                    href="/chat"
                    className="block w-full text-center bg-white/8 hover:bg-white/12 text-white font-semibold rounded-xl py-2.5 text-sm transition-colors"
                  >
                    Empezar gratis
                  </Link>
                ) : (
                  <PagoModal plan={plan} />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* B2B Section */}
        <div className="rounded-2xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 mb-16 lexcr-card border border-cr-blue/25">
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-white/55 mb-2">Para organizaciones</div>
            <h2 className="text-2xl font-bold mb-2">Plan Empresarial</h2>
            <p className="text-white/65 text-sm max-w-lg">
              Para sindicatos, cooperativas y empresas. Usuarios ilimitados, panel de administración,
              factura electrónica y capacitación incluida.
            </p>
            <ul className="mt-4 space-y-1.5">
              {PLANES.b2b.caracteristicas.map((c) => (
                <li key={c} className="flex items-center gap-2 text-sm text-white/75">
                  <CHECK />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="text-center flex-shrink-0">
            <div className="text-3xl font-extrabold mb-1">
              ₡50,000 – ₡150,000
            </div>
            <div className="text-white/55 text-sm mb-5">por mes según organización</div>
            <a
              href="mailto:ventas@specterlaws.cr?subject=Consulta%20Plan%20Empresarial"
              className="block bg-white/92 text-[#0a0f1e] font-bold px-8 py-3 rounded-xl hover:bg-white transition-colors"
            >
              Contactar ventas
            </a>
          </div>
        </div>

        {/* Comparison table */}
        <div className="rounded-2xl border border-white/10 overflow-hidden mb-12 lexcr-card">
          <div className="px-6 py-5 border-b border-white/10">
            <h2 className="text-lg font-bold text-white">Comparación de características</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-6 py-3 text-white/55 font-medium w-1/3">Característica</th>
                  {planesVisibles.map((p) => (
                    <th key={p.id} className="px-4 py-3 text-center font-semibold text-white">
                      {p.nombre}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {[
                  { label: "Consultas al mes", values: ["3", "Ilimitadas", "Ilimitadas", "1 por pago"] },
                  { label: "Historial guardado", values: [false, true, true, true] },
                  { label: "Subida de documentos", values: [false, false, true, false] },
                  { label: "Generación de cartas", values: [false, false, true, false] },
                  { label: "Análisis de contratos", values: [false, false, true, false] },
                  { label: "Referencia a abogado", values: [true, true, true, true] },
                ].map((row) => (
                  <tr key={row.label} className="hover:bg-white/3">
                    <td className="px-6 py-3 text-white/75">{row.label}</td>
                    {row.values.map((v, i) => (
                      <td key={i} className="px-4 py-3 text-center">
                        {typeof v === "boolean" ? (
                          v ? <CHECK /> : <X />
                        ) : (
                          <span className="text-white/75 text-xs font-medium">{v}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment methods */}
        <div className="rounded-2xl border border-white/10 p-8 text-center lexcr-card">
          <h3 className="font-bold text-white text-lg mb-2">Métodos de pago aceptados</h3>
          <p className="text-white/60 text-sm mb-6">Pagá de la forma que más te convenga.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 lexcr-glass rounded-xl px-5 py-3">
              <span className="text-2xl">📱</span>
              <div className="text-left">
                <div className="text-sm font-semibold text-white">SINPE Móvil</div>
                <div className="text-xs text-white/55">Confirmación en 24 horas</div>
              </div>
            </div>
            <div className="flex items-center gap-2 lexcr-glass rounded-xl px-5 py-3">
              <span className="text-2xl">💳</span>
              <div className="text-left">
                <div className="text-sm font-semibold text-white">Tarjeta de crédito / débito</div>
                <div className="text-xs text-white/55">Visa, Mastercard — Confirmación inmediata</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
