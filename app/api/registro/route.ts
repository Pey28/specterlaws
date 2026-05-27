import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getUserByEmail, createUser } from "@/lib/db";

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
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const { nombre, email, password, provincia } = body as Record<string, unknown>;

  if (
    typeof nombre !== "string" ||
    nombre.trim().length < 2 ||
    nombre.trim().length > 100
  ) {
    return NextResponse.json({ error: "Nombre inválido." }, { status: 400 });
  }

  if (typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Correo electrónico inválido." }, { status: 400 });
  }

  if (
    typeof password !== "string" ||
    password.length < 8 ||
    password.length > 128
  ) {
    return NextResponse.json(
      { error: "La contraseña debe tener al menos 8 caracteres." },
      { status: 400 }
    );
  }

  if (typeof provincia !== "string" || !PROVINCIAS.includes(provincia)) {
    return NextResponse.json({ error: "Provincia inválida." }, { status: 400 });
  }

  const existing = getUserByEmail(email.toLowerCase());
  if (existing) {
    return NextResponse.json(
      { error: "Ya existe una cuenta con ese correo electrónico." },
      { status: 409 }
    );
  }

  const hashed = await bcrypt.hash(password, 12);
  createUser({
    nombre: nombre.trim(),
    email: email.toLowerCase(),
    password: hashed,
    provincia,
  });

  return NextResponse.json({ ok: true }, { status: 201 });
}
