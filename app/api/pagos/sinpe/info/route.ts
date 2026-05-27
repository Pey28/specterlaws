import { NextRequest, NextResponse } from "next/server";
import { getPagoSinpe } from "@/lib/db";
import { getPlanLabel } from "@/lib/planes";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID requerido." }, { status: 400 });

  const pago = getPagoSinpe(id);
  if (!pago) return NextResponse.json({ error: "Pago no encontrado." }, { status: 404 });

  return NextResponse.json({
    referencia: pago.referencia_sinpe,
    monto: pago.monto,
    planNombre: getPlanLabel(pago.plan as never),
    estado: pago.estado,
  });
}
