import { NextRequest, NextResponse } from "next/server";
import { registrarComprobanteSinpe } from "@/lib/db";

// User submits their SINPE comprobante number
export async function POST(req: NextRequest) {
  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const { pagoId, comprobante } = body as Record<string, unknown>;

  if (typeof pagoId !== "string" || typeof comprobante !== "string" || comprobante.trim().length < 3) {
    return NextResponse.json({ error: "Datos inválidos." }, { status: 400 });
  }

  const ok = registrarComprobanteSinpe(pagoId, comprobante.trim());
  if (!ok) {
    return NextResponse.json({ error: "Pago no encontrado o ya procesado." }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
