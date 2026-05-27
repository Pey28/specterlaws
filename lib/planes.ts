export type PlanId = "gratis" | "basico" | "profesional" | "individual" | "b2b";

export interface Plan {
  id: PlanId;
  nombre: string;
  descripcion: string;
  precio: number; // en colones; 0 = gratis; -1 = rango variable (b2b)
  precioMax?: number; // para b2b
  periodo: "mes" | "uso" | "gratis" | "custom";
  consultasMes: number | null; // null = ilimitado
  caracteristicas: string[];
  noIncluye?: string[];
  destacado?: boolean;
  badgeTexto?: string;
}

export const PLANES: Record<PlanId, Plan> = {
  gratis: {
    id: "gratis",
    nombre: "Gratis",
    descripcion: "Para conocer Specterlaws sin compromiso.",
    precio: 0,
    periodo: "gratis",
    consultasMes: 3,
    caracteristicas: [
      "3 consultas por mes",
      "Acceso al asistente legal",
      "Leyes de Costa Rica incluidas",
    ],
    noIncluye: [
      "Historial de consultas",
      "Subida de documentos",
      "Generación de cartas",
    ],
  },
  basico: {
    id: "basico",
    nombre: "Básico",
    descripcion: "Consultas ilimitadas para uso personal.",
    precio: 3000,
    periodo: "mes",
    consultasMes: null,
    destacado: false,
    caracteristicas: [
      "Consultas ilimitadas",
      "Historial completo guardado",
      "Leyes de Costa Rica incluidas",
      "Respuesta en segundos",
    ],
    noIncluye: [
      "Subida de documentos",
      "Generación de cartas legales",
    ],
  },
  profesional: {
    id: "profesional",
    nombre: "Profesional",
    descripcion: "Para usuarios frecuentes que necesitan más herramientas.",
    precio: 8000,
    periodo: "mes",
    consultasMes: null,
    destacado: true,
    badgeTexto: "Más popular",
    caracteristicas: [
      "Todo lo del plan Básico",
      "Subir documentos (PDF, JPG, DOCX)",
      "Generación de cartas legales",
      "Análisis de contratos",
      "Prioridad en respuestas",
    ],
  },
  individual: {
    id: "individual",
    nombre: "Consulta Individual",
    descripcion: "Sin suscripción. Pagá solo cuando lo necesites.",
    precio: 500,
    periodo: "uso",
    consultasMes: 1,
    caracteristicas: [
      "1 consulta por pago",
      "Sin suscripción mensual",
      "Historial guardado si tenés cuenta",
    ],
    noIncluye: [
      "Subida de documentos",
      "Generación de cartas legales",
    ],
  },
  b2b: {
    id: "b2b",
    nombre: "Empresarial",
    descripcion: "Para sindicatos, cooperativas y empresas.",
    precio: 50000,
    precioMax: 150000,
    periodo: "custom",
    consultasMes: null,
    caracteristicas: [
      "Usuarios ilimitados bajo una organización",
      "Panel de administración",
      "Todo lo del plan Profesional",
      "Soporte prioritario",
      "Factura electrónica incluida",
      "Capacitación para el equipo",
    ],
  },
};

export const MONTOS: Record<PlanId, number> = {
  gratis: 0,
  basico: 3000,
  profesional: 8000,
  individual: 500,
  b2b: 50000,
};

export function formatearPrecio(colones: number): string {
  return `₡${colones.toLocaleString("es-CR")}`;
}

export function getPlanLabel(plan: PlanId): string {
  return PLANES[plan]?.nombre ?? "Desconocido";
}

export function puedeSubirDocumentos(plan: PlanId): boolean {
  return plan === "profesional" || plan === "b2b";
}

export function puedeGenerarCartas(plan: PlanId): boolean {
  return plan === "profesional" || plan === "b2b";
}

export function tieneConsultasIlimitadas(plan: PlanId): boolean {
  return plan === "basico" || plan === "profesional" || plan === "b2b";
}
