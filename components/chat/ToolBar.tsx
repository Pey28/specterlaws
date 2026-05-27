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
    <div className="lexcr-mobile-scroll flex items-center gap-2 py-2 mt-1 overflow-x-auto sm:flex-wrap">
      {botones.map((b) => (
        <button
          key={b.key}
          onClick={handlers[b.key]}
          className={`relative lexcr-mobile-tap flex items-center gap-2 px-3.5 py-3 sm:py-2.5 rounded-xl text-sm sm:text-xs font-medium transition-all shrink-0 ${
            activos[b.key]
              ? "bg-cr-blue text-white border border-cr-blue/50"
              : b.key === "abogado"
              ? "text-white/80 border border-cr-red/30 bg-cr-red/10 hover:bg-cr-red/20"
              : "text-white/60 border border-white/10 bg-white/5 hover:bg-white/10 hover:text-white"
          }`}
        >
          <span className="text-base">{b.icono}</span>
          <span>{b.label}</span>
          {badges[b.key] > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cr-red text-white text-[10px] flex items-center justify-center font-bold leading-none">
              {badges[b.key] > 9 ? "9+" : badges[b.key]}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
