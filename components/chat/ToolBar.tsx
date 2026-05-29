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
  {
    key: "buscar",
    label: "Buscar leyes",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
      </svg>
    ),
  },
  {
    key: "subir",
    label: "Subir archivo",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
      </svg>
    ),
  },
  {
    key: "expediente",
    label: "Expediente",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    ),
  },
  {
    key: "abogado",
    label: "Hablar con abogado",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
] as const;

export default function ToolBar({
  onBuscarLeyes,
  onSubirArchivos,
  onExpediente,
  onAbogado,
  archivosCount,
}: Props) {
  const handlers: Record<string, () => void> = {
    buscar: onBuscarLeyes,
    subir: onSubirArchivos,
    expediente: onExpediente,
    abogado: onAbogado,
  };

  const badges: Record<string, number> = { expediente: archivosCount };

  return (
    <div className="flex items-center gap-1 flex-wrap">
      {botones.map((b) => (
        <button
          key={b.key}
          type="button"
          onClick={handlers[b.key]}
          title={b.label}
          className="relative p-1.5 rounded-lg text-white/30 hover:text-white/70 hover:bg-white/8 transition-colors"
          aria-label={b.label}
        >
          {b.icon}
          {(badges[b.key] ?? 0) > 0 && (
            <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-white text-black text-[9px] flex items-center justify-center font-bold leading-none">
              {badges[b.key] > 9 ? "9+" : badges[b.key]}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
