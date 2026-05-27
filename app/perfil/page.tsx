import type { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import { auth } from "@/auth";
import { getConsultasByUser, getUserPlan, contarConsultasMes, getCreditos } from "@/lib/db";
import { PLANES, formatearPrecio, tieneConsultasIlimitadas } from "@/lib/planes";
import type { PlanId } from "@/lib/planes";
import CerrarSesionBtn from "@/components/auth/CerrarSesionBtn";

export const metadata: Metadata = { title: "Mi Perfil – Specterlaws" };

const PLAN_COLORS: Record<PlanId, string> = {
  gratis: "bg-gray-100 text-gray-600",
  basico: "bg-blue-100 text-blue-700",
  profesional: "bg-purple-100 text-purple-700",
  individual: "bg-amber-100 text-amber-700",
  b2b: "bg-emerald-100 text-emerald-700",
};

export default async function PerfilPage() {
  const session = await auth();
  if (!session?.user) redirect("/login?callbackUrl=/perfil");

  const userId = session.user.id;
  const plan = getUserPlan(userId);
  const planInfo = PLANES[plan];
  const consultas = getConsultasByUser(userId);
  const consultasMes = contarConsultasMes(userId);
  const creditos = plan === "individual" ? getCreditos(userId) : null;

  return (
    <div className="min-h-screen bg-[#F0F4F8]">
      <header className="bg-[#1A3A6B] text-white px-4 py-3 flex items-center gap-3 shadow-md">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="flex flex-col gap-[3px]">
            <span className="block w-4 h-0.5 rounded-sm bg-white/60" />
            <span className="block w-4 h-0.5 rounded-sm bg-[#C0392B]" />
            <span className="block w-4 h-0.5 rounded-sm bg-white/60" />
          </div>
          <img src="/logo.png" alt="Specterlaws" className="h-8 w-auto object-contain" />
        </Link>
        <div className="h-5 w-px bg-white/20 mx-1" />
        <span className="text-sm text-blue-200">Mi Perfil</span>
        <div className="ml-auto flex items-center gap-3">
          <Link href="/chat" className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg border border-white/20 transition-colors">
            Ir al chat
          </Link>
          <CerrarSesionBtn />
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
        {/* User card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center gap-5">
          <div className="w-14 h-14 rounded-full bg-[#1A3A6B] flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
            {session.user.name?.charAt(0).toUpperCase() ?? "U"}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-bold text-[#1A3A6B] truncate">{session.user.name}</h2>
            <p className="text-sm text-gray-500 truncate">{session.user.email}</p>
            <p className="text-xs text-gray-400 mt-0.5">{session.user.provincia} · Costa Rica</p>
          </div>
          <div className="flex-shrink-0 text-right space-y-1.5">
            <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full capitalize ${PLAN_COLORS[plan]}`}>
              Plan {planInfo.nombre}
            </span>
            <br />
            <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-medium px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />Cuenta activa
            </span>
          </div>
        </div>

        {/* Plan card */}
        <div className={`rounded-2xl p-6 border ${
          plan === "gratis" ? "bg-white border-gray-100" : "bg-[#1A3A6B] text-white border-[#1A3A6B]"
        }`}>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className={`font-bold text-lg mb-1 ${plan !== "gratis" ? "text-white" : "text-[#1A3A6B]"}`}>
                Plan {planInfo.nombre}
              </h3>
              <p className={`text-sm ${plan !== "gratis" ? "text-blue-200" : "text-gray-500"}`}>
                {planInfo.descripcion}
              </p>
              {plan === "gratis" && (
                <p className="text-sm mt-2 text-gray-600">
                  <strong>{consultasMes}</strong> de <strong>3</strong> consultas usadas este mes.
                  {consultasMes >= 3 && <span className="text-[#C0392B] ml-1">Límite alcanzado.</span>}
                </p>
              )}
              {plan === "individual" && creditos !== null && (
                <p className="text-sm mt-2 text-blue-200">
                  <strong>{creditos}</strong> crédito{creditos !== 1 ? "s" : ""} disponible{creditos !== 1 ? "s" : ""}
                  {" "}(₡500 c/u)
                </p>
              )}
              {tieneConsultasIlimitadas(plan) && (
                <p className={`text-sm mt-2 ${plan !== "gratis" ? "text-blue-200" : "text-gray-600"}`}>
                  Consultas ilimitadas · {consultasMes} realizadas este mes
                </p>
              )}
            </div>
            <div className="flex-shrink-0">
              {plan === "gratis" ? (
                <Link
                  href="/precios"
                  className="inline-block bg-[#1A3A6B] hover:bg-[#0f2548] text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors"
                >
                  Mejorar plan
                </Link>
              ) : plan === "individual" ? (
                <Link
                  href="/precios"
                  className="inline-block bg-white/20 hover:bg-white/30 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors"
                >
                  Comprar más
                </Link>
              ) : (
                <Link
                  href="/precios"
                  className="inline-block bg-white/20 hover:bg-white/30 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-colors"
                >
                  Renovar plan
                </Link>
              )}
            </div>
          </div>

          {/* Progress bar for gratis */}
          {plan === "gratis" && (
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Consultas este mes</span>
                <span>{consultasMes}/3</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${consultasMes >= 3 ? "bg-[#C0392B]" : "bg-[#1A3A6B]"}`}
                  style={{ width: `${Math.min((consultasMes / 3) * 100, 100)}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 text-center">
            <p className="text-3xl font-bold text-[#1A3A6B]">{consultas.length}</p>
            <p className="text-sm text-gray-500 mt-1">Consultas totales</p>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 text-center">
            {tieneConsultasIlimitadas(plan) ? (
              <p className="text-3xl font-bold text-green-600">∞</p>
            ) : plan === "individual" ? (
              <p className="text-3xl font-bold text-amber-600">{creditos ?? 0}</p>
            ) : (
              <p className="text-3xl font-bold text-[#1A3A6B]">{Math.max(0, 3 - consultasMes)}</p>
            )}
            <p className="text-sm text-gray-500 mt-1">
              {tieneConsultasIlimitadas(plan) ? "Consultas disponibles" : plan === "individual" ? "Créditos disponibles" : "Consultas restantes"}
            </p>
          </div>
        </div>

        {/* Upgrade CTA (only for gratis) */}
        {plan === "gratis" && (
          <div className="bg-gradient-to-r from-[#1A3A6B] to-[#0f2548] rounded-2xl p-6 text-white">
            <h3 className="font-bold text-lg mb-1">Actualizá tu plan</h3>
            <p className="text-blue-200 text-sm mb-4">
              Desde <strong>{formatearPrecio(3000)}/mes</strong> obtenés consultas ilimitadas e historial completo.
            </p>
            <Link
              href="/precios"
              className="inline-block bg-white text-[#1A3A6B] font-bold text-sm px-6 py-2.5 rounded-xl hover:bg-blue-50 transition-colors"
            >
              Ver todos los planes →
            </Link>
          </div>
        )}

        {/* Consultation history */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-semibold text-[#1A3A6B]">Historial de consultas</h3>
            <Link href="/chat" className="text-xs text-[#1A3A6B] hover:underline font-medium">Nueva consulta →</Link>
          </div>
          {consultas.length === 0 ? (
            <div className="px-6 py-12 text-center">
              <div className="text-4xl mb-3">⚖️</div>
              <p className="text-gray-500 text-sm">Aún no has realizado consultas legales.</p>
              <Link href="/chat" className="inline-block mt-4 bg-[#1A3A6B] hover:bg-[#0f2548] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">
                Hacer primera consulta
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {consultas.map((c) => (
                <div key={c.id} className="px-6 py-4">
                  <div className="flex items-start justify-between gap-4 mb-1.5">
                    <p className="text-sm font-medium text-gray-800 line-clamp-1 flex-1">{c.pregunta}</p>
                    <span className="text-xs text-gray-400 flex-shrink-0">
                      {new Date(c.created_at).toLocaleDateString("es-CR", { day: "numeric", month: "short" })}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{c.respuesta}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
