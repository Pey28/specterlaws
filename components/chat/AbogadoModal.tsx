"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

type Props = {
  onCerrar: () => void;
};

export default function AbogadoModal({ onCerrar }: Props) {
  const { data: session } = useSession();
  const [nombre, setNombre] = useState(session?.user?.name ?? "");
  const [email, setEmail] = useState(session?.user?.email ?? "");
  const [telefono, setTelefono] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setCargando(true);

    const res = await fetch("/api/abogado", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, email, telefono, descripcion }),
    });

    const data = await res.json();
    if (res.ok) {
      setEnviado(true);
    } else {
      setError(data.error ?? "Error al enviar.");
    }
    setCargando(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-7 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="font-bold text-[#1A3A6B] text-lg">Hablar con un abogado</h2>
            <p className="text-xs text-gray-500 mt-0.5">Un abogado aliado te contactará en 24 horas.</p>
          </div>
          <button
            onClick={onCerrar}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none"
          >
            ×
          </button>
        </div>

        {enviado ? (
          <div className="text-center py-6">
            <div className="text-5xl mb-3">⚖️</div>
            <h3 className="font-bold text-[#1A3A6B] text-lg mb-2">Consulta recibida</h3>
            <p className="text-sm text-gray-500 mb-5">
              Un abogado aliado revisará tu caso y te contactará dentro de las próximas
              <strong> 24 horas hábiles</strong> al correo o teléfono que indicaste.
            </p>
            <button
              onClick={onCerrar}
              className="bg-[#1A3A6B] hover:bg-[#0f2548] text-white font-semibold rounded-xl px-6 py-2.5 text-sm transition-colors"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Nombre completo</label>
              <input
                type="text"
                required
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A3A6B] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Correo electrónico</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A3A6B] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Teléfono <span className="text-gray-400 font-normal">(opcional)</span>
              </label>
              <input
                type="tel"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="8888-8888"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A3A6B] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Describí tu caso brevemente
              </label>
              <textarea
                required
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                rows={4}
                placeholder="Explicá la situación legal que necesitás resolver..."
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A3A6B] focus:border-transparent resize-none"
              />
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-800">
              <strong>Nota:</strong> Este servicio conecta con abogados aliados independientes.
              LexCR actúa como intermediario y puede recibir una comisión por la referencia.
            </div>

            <button
              type="submit"
              disabled={cargando}
              className="w-full bg-[#1A3A6B] hover:bg-[#0f2548] disabled:bg-gray-300 text-white font-semibold rounded-xl py-3 text-sm transition-colors"
            >
              {cargando ? "Enviando..." : "Enviar consulta al abogado"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
