import { redirect } from "next/navigation";
import { getPagosSinpePendientes, confirmarPagoSinpe } from "@/lib/db";
import { formatearPrecio, getPlanLabel } from "@/lib/planes";
import type { PlanId } from "@/lib/planes";

// Protect with ADMIN_SECRET query param
async function confirmar(pagoId: string) {
  "use server";
  confirmarPagoSinpe(pagoId);
  redirect("/admin/sinpe");
}

export default async function AdminSinpePage({
  searchParams,
}: {
  searchParams: Promise<{ secret?: string }>;
}) {
  const { secret } = await searchParams;
  const adminSecret = process.env.ADMIN_SECRET ?? "lexcr-admin-secret";

  if (secret !== adminSecret) {
    return (
      <div className="min-h-screen bg-[#F0F4F8] flex items-center justify-center">
        <div className="bg-white rounded-2xl p-8 shadow-sm text-center max-w-sm">
          <div className="text-4xl mb-3">🔒</div>
          <h1 className="font-bold text-[#1A3A6B] text-lg mb-2">Acceso restringido</h1>
          <p className="text-sm text-gray-500">
            Accedé con <code className="bg-gray-100 px-1 rounded">/admin/sinpe?secret=TU_ADMIN_SECRET</code>
          </p>
        </div>
      </div>
    );
  }

  const pagos = getPagosSinpePendientes();

  return (
    <div className="min-h-screen bg-[#F0F4F8]">
      <header className="bg-[#1A3A6B] text-white px-4 py-3 flex items-center gap-3 shadow-md">
        <span className="text-lg font-bold">Lex<span className="text-[#e74c3c]">CR</span></span>
        <div className="h-5 w-px bg-white/20 mx-1" />
        <span className="text-sm text-blue-200">Panel Admin — SINPE Pendientes</span>
        <div className="ml-auto text-xs text-blue-300">{pagos.length} pendiente{pagos.length !== 1 ? "s" : ""}</div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">
        {pagos.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
            <div className="text-4xl mb-3">✅</div>
            <p className="text-gray-500">No hay pagos SINPE pendientes.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pagos.map((p) => (
              <div key={p.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#1A3A6B]">
                        {getPlanLabel(p.plan as PlanId)}
                      </span>
                      <span className="text-sm font-bold text-[#1A3A6B]">
                        {formatearPrecio(p.monto)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Usuario: <strong>{p.nombre ?? "Anónimo"}</strong>
                      {p.email && <span className="text-gray-400"> ({p.email})</span>}
                    </p>
                    <p className="text-sm text-gray-600">
                      Referencia: <code className="bg-gray-100 px-1 rounded text-xs">{p.referencia_sinpe}</code>
                    </p>
                    {p.comprobante_sinpe && (
                      <p className="text-sm text-gray-600">
                        Comprobante: <code className="bg-green-50 border border-green-200 px-1 rounded text-xs text-green-700">{p.comprobante_sinpe}</code>
                      </p>
                    )}
                    <p className="text-xs text-gray-400">
                      {new Date(p.created_at).toLocaleString("es-CR")}
                    </p>
                  </div>

                  <form action={confirmar.bind(null, p.id)}>
                    <button
                      type="submit"
                      className="bg-green-600 hover:bg-green-700 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors flex-shrink-0"
                    >
                      Confirmar pago
                    </button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
