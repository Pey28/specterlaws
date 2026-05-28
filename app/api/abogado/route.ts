import { NextRequest } from "next/server";
import { auth } from "@/auth";
import { guardarReferenciaAbogado } from "@/lib/db";
import { apiError, apiOk } from "@/lib/api-response";

export async function POST(req: NextRequest) {
  let body: unknown;
  try { body = await req.json(); } catch {
    return apiError("Solicitud inválida.", 400);
  }

  const { nombre, email, telefono, descripcion } = body as Record<string, unknown>;

  if (typeof nombre !== "string" || nombre.trim().length < 2) {
    return apiError("Nombre inválido.", 400);
  }
  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return apiError("Correo inválido.", 400);
  }
  if (typeof descripcion !== "string" || descripcion.trim().length < 10) {
    return apiError("Describí brevemente tu caso (mínimo 10 caracteres).", 400);
  }

  try {
    const session = await auth();

    guardarReferenciaAbogado({
      userId: session?.user?.id,
      nombre: nombre.trim(),
      email: email.toLowerCase(),
      telefono: typeof telefono === "string" ? telefono.trim() : undefined,
      descripcion: descripcion.trim(),
    });

    return apiOk(undefined, { status: 201 });
  } catch (error) {
    console.error("abogado error:", error);
    return apiError("No se pudo enviar la solicitud.", 500);
  }
}
