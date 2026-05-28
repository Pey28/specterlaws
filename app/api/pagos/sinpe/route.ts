import { NextRequest } from "next/server";
import { auth } from "@/auth";
import { crearPagoSinpe } from "@/lib/db";
import { MONTOS, PLANES, PLANES_PAGABLES } from "@/lib/planes";
import type { PlanId } from "@/lib/planes";
import { apiError, apiOk } from "@/lib/api-response";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return apiError("Debes iniciar sesión para realizar un pago.", 401);
  }

  let body: unknown;
  try { body = await req.json(); } catch {
    return apiError("Solicitud inválida.", 400);
  }

  const { plan } = body as Record<string, unknown>;

  if (typeof plan !== "string" || !PLANES_PAGABLES.includes(plan as PlanId)) {
    return apiError("Plan inválido.", 400);
  }

  const planId = plan as PlanId;
  const monto = MONTOS[planId];

  try {
    const { id: pagoId, referencia } = crearPagoSinpe(session.user.id, planId, monto);
    return apiOk({
      pagoId,
      referencia,
      monto,
      planNombre: PLANES[planId].nombre,
    });
  } catch (error) {
    console.error("sinpe error:", error);
    return apiError("No se pudo crear el pago SINPE.", 500);
  }
}
