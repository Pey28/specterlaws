"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const PROVINCIAS = [
  "San José",
  "Alajuela",
  "Cartago",
  "Heredia",
  "Guanacaste",
  "Puntarenas",
  "Limón",
];

export default function RegistroForm() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmar, setConfirmar] = useState("");
  const [provincia, setProvincia] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmar) {
      setError("Las contraseñas no coinciden.");
      return;
    }
    if (password.length < 8) {
      setError("La contraseña debe tener al menos 8 caracteres.");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/registro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email, password, provincia }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error ?? "Error al crear la cuenta. Intentá de nuevo.");
      setLoading(false);
      return;
    }

    // Auto-login after register
    const result = await signIn("credentials", {
      email: email.toLowerCase(),
      password,
      redirect: false,
    });

    if (result?.error) {
      setError("Cuenta creada. Por favor iniciá sesión.");
      router.push("/login");
    } else {
      router.push("/chat");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="lexcr-glass border border-cr-red/25 text-cr-red text-sm rounded-lg px-4 py-3">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-white/75 mb-1.5">
          Nombre completo
        </label>
        <input
          type="text"
          required
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Juan Pérez Mora"
          className="w-full rounded-xl px-4 py-3 text-sm bg-white/5 border border-white/15 text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/75 mb-1.5">
          Correo electrónico
        </label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="tu@correo.com"
          className="w-full rounded-xl px-4 py-3 text-sm bg-white/5 border border-white/15 text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/75 mb-1.5">
          Provincia
        </label>
        <select
          required
          value={provincia}
          onChange={(e) => setProvincia(e.target.value)}
          className="w-full border border-white/15 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent bg-white/5 text-white"
        >
          <option value="" disabled>
            Seleccioná tu provincia
          </option>
          {PROVINCIAS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-white/75 mb-1.5">
          Contraseña
        </label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mínimo 8 caracteres"
          className="w-full rounded-xl px-4 py-3 text-sm bg-white/5 border border-white/15 text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/75 mb-1.5">
          Confirmar contraseña
        </label>
        <input
          type="password"
          required
          value={confirmar}
          onChange={(e) => setConfirmar(e.target.value)}
          placeholder="Repetí tu contraseña"
          className="w-full rounded-xl px-4 py-3 text-sm bg-white/5 border border-white/15 text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-cr-blue hover:bg-cr-blue-light disabled:bg-white/10 text-white font-semibold rounded-xl py-3 text-sm transition-colors mt-2 lexcr-glow-blue"
      >
        {loading ? "Creando cuenta..." : "Crear cuenta gratis"}
      </button>

      <p className="text-center text-sm text-white/60">
        ¿Ya tenés cuenta?{" "}
        <Link href="/login" className="text-cr-blue font-semibold hover:underline">
          Iniciá sesión
        </Link>
      </p>
    </form>
  );
}
