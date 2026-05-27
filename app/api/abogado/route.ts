import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { guardarReferenciaAbogado } from "@/lib/db";

export async function POST(req: NextRequest) {
  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const { nombre, email, telefono, descripcion } = body as Record<string, unknown>;

  if (typeof nombre !== "string" || nombre.trim().length < 2) {
    return NextResponse.json({ error: "Nombre inválido." }, { status: 400 });
  }
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Correo inválido." }, { status: 400 });
  }
  if (typeof descripcion !== "string" || descripcion.trim().length < 10) {
    return NextResponse.json({ error: "Describí brevemente tu caso (mínimo 10 caracteres)." }, { status: 400 });
  }

  const session = await auth();

  guardarReferenciaAbogado({
    userId: session?.user?.id,
    nombre: nombre.trim(),
    email: email.toLowerCase(),
    telefono: typeof telefono === "string" ? telefono.trim() : undefined,
    descripcion: descripcion.trim(),
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
