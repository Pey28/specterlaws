"use client";

type Props = {
  onBuscarLeyes: () => void;
  onSubirArchivos: () => void;
  onExpediente: () => void;
  onHistorial: () => void;
  onAbogado: () => void;
  archivosCount: number;
  historialCount: number;
  panelActivo: "expediente" | "historial" | null;
};

const botones = [
  { key: "buscar", icono: "🌐", label: "Buscar Leyes" },
  { key: "subir", icono: "⬆️", label: "Subir Archivos" },
  { key: "expediente", icono: "📁", label: "Expediente" },
  { key: "historial", icono: "🗄️", label: "Historial" },
  { key: "abogado", icono: "⚖️", label: "Abogado" },
] as const;

export default function ToolBar({
  onBuscarLeyes,
  onSubirArchivos,
  onExpediente,
  onHistorial,
  onAbogado,
  archivosCount,
  historialCount,
  panelActivo,
}: Props) {
  const handlers: Record<string, () => void> = {
    buscar: onBuscarLeyes,
    subir: onSubirArchivos,
    expediente: onExpediente,
    historial: onHistorial,
    abogado: onAbogado,
  };

  const badges: Record<string, number> = {
    expediente: archivosCount,
    historial: historialCount,
  };

  const activos: Record<string, boolean> = {
    expediente: panelActivo === "expediente",
    historial: panelActivo === "historial",
  };

  return (
    <div className="flex items-center gap-1 py-1 border-t border-gray-100 mt-1">
      {botones.map((b) => (
        <button
          key={b.key}
          onClick={handlers[b.key]}
          className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
            activos[b.key]
              ? "bg-[#1A3A6B] text-white"
              : b.key === "abogado"
              ? "text-[#1A3A6B] hover:bg-blue-50 border border-[#1A3A6B]/20"
              : "text-gray-500 hover:bg-gray-100 hover:text-[#1A3A6B]"
          }`}
        >
          <span>{b.icono}</span>
          <span className="hidden sm:inline">{b.label}</span>
          {badges[b.key] > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C0392B] text-white text-[10px] flex items-center justify-center font-bold leading-none">
              {badges[b.key] > 9 ? "9+" : badges[b.key]}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
