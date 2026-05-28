import { NextRequest } from "next/server";
import { registrarComprobanteSinpe } from "@/lib/db";
import { apiError, apiOk } from "@/lib/api-response";

// User submits their SINPE comprobante number
export async function POST(req: NextRequest) {
  let body: unknown;
  try { body = await req.json(); } catch {
    return apiError("Solicitud inválida.", 400);
  }

  const { pagoId, comprobante } = body as Record<string, unknown>;

  if (typeof pagoId !== "string" || typeof comprobante !== "string" || comprobante.trim().length < 3) {
    return apiError("Datos inválidos.", 400);
  }

  try {
    const ok = registrarComprobanteSinpe(pagoId, comprobante.trim());
    if (!ok) {
      return apiError("Pago no encontrado o ya procesado.", 404);
    }
    return apiOk();
  } catch (error) {
    console.error("sinpe confirmar error:", error);
    return apiError("No se pudo confirmar el comprobante.", 500);
  }
}
