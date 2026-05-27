import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { crearPagoSinpe } from "@/lib/db";
import { MONTOS, PLANES } from "@/lib/planes";
import type { PlanId } from "@/lib/planes";

const PLANES_PAGABLES: PlanId[] = ["basico", "profesional", "individual"];

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Debes iniciar sesión para realizar un pago." }, { status: 401 });
  }

  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const { plan } = body as Record<string, unknown>;

  if (typeof plan !== "string" || !PLANES_PAGABLES.includes(plan as PlanId)) {
    return NextResponse.json({ error: "Plan inválido." }, { status: 400 });
  }

  const planId = plan as PlanId;
  const monto = MONTOS[planId];

  const { id: pagoId, referencia } = crearPagoSinpe(session.user.id, planId, monto);

  return NextResponse.json({
    pagoId,
    referencia,
    monto,
    planNombre: PLANES[planId].nombre,
  });
}
