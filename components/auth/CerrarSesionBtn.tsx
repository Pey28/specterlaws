"use client";

import { signOut } from "next-auth/react";

export default function CerrarSesionBtn() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg transition-colors border border-white/20"
    >
      Cerrar sesión
    </button>
  );
}
