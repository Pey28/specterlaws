import { NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { getUserByEmail, createUser } from "@/lib/db";
import { apiError, apiOk } from "@/lib/api-response";

const PROVINCIAS = [
  "San José",
  "Alajuela",
  "Cartago",
  "Heredia",
  "Guanacaste",
  "Puntarenas",
  "Limón",
];

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return apiError("Solicitud inválida.", 400);
  }

  const { nombre, email, password, provincia } = body as Record<string, unknown>;

  if (
    typeof nombre !== "string" ||
    nombre.trim().length < 2 ||
    nombre.trim().length > 100
  ) {
    return apiError("Nombre inválido.", 400);
  }

  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return apiError("Correo electrónico inválido.", 400);
  }

  if (
    typeof password !== "string" ||
    password.length < 8 ||
    password.length > 128
  ) {
    return apiError("La contraseña debe tener al menos 8 caracteres.", 400);
  }

  if (typeof provincia !== "string" || !PROVINCIAS.includes(provincia)) {
    return apiError("Provincia inválida.", 400);
  }

  const existing = getUserByEmail(email.toLowerCase());
  if (existing) {
    return apiError("Ya existe una cuenta con ese correo electrónico.", 409);
  }

  try {
    const hashed = await bcrypt.hash(password, 12);
    createUser({
      nombre: nombre.trim(),
      email: email.toLowerCase(),
      password: hashed,
      provincia,
    });
    return apiOk(undefined, { status: 201 });
  } catch (error) {
    console.error("registro error:", error);
    return apiError("No se pudo crear la cuenta.", 500);
  }
}
