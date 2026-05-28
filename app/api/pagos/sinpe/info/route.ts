import { NextRequest } from "next/server";
import { getPagoSinpe } from "@/lib/db";
import { getPlanLabel } from "@/lib/planes";
import { apiError, apiOk } from "@/lib/api-response";

export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return apiError("ID requerido.", 400);

  try {
    const pago = getPagoSinpe(id);
    if (!pago) return apiError("Pago no encontrado.", 404);

    return apiOk({
      referencia: pago.referencia_sinpe,
      monto: pago.monto,
      planNombre: getPlanLabel(pago.plan as never),
      estado: pago.estado,
    });
  } catch (error) {
    console.error("sinpe info error:", error);
    return apiError("No se pudo obtener el pago.", 500);
  }
}
