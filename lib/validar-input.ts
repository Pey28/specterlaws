const MAX_MENSAJE_CHARS = 2000;
const MAX_MENSAJES_HISTORIAL = 30;
const MAX_CONSULTA_CHARS = 500;

// Patrones de inyección de prompt que intentan alterar el comportamiento del bot
const PATRONES_INYECCION = [
  /ignore\s+(all\s+)?previous\s+instructions/i,
  /olvida\s+(todas\s+)?las\s+instrucciones/i,
  /nuevo\s+rol\s*:/i,
  /ahora\s+eres\s+/i,
  /act\s+as\s+/i,
  /system\s*:/i,
  /\[INST\]/i,
  /<<SYS>>/i,
];

export type ResultadoValidacion =
  | { valido: true }
  | { valido: false; error: string };

export function validarMensajeChat(body: unknown): ResultadoValidacion {
  if (!body || typeof body !== "object") {
    return { valido: false, error: "Cuerpo de solicitud inválido." };
  }

  const { mensajes } = body as Record<string, unknown>;

  if (!Array.isArray(mensajes) || mensajes.length === 0) {
    return { valido: false, error: "No se proporcionaron mensajes." };
  }

  if (mensajes.length > MAX_MENSAJES_HISTORIAL) {
    return {
      valido: false,
      error: `Historial demasiado largo (máximo ${MAX_MENSAJES_HISTORIAL} mensajes).`,
    };
  }

  for (const msg of mensajes) {
    if (!msg || typeof msg !== "object") {
      return { valido: false, error: "Formato de mensaje inválido." };
    }

    const { role, content } = msg as Record<string, unknown>;

    if (role !== "user" && role !== "assistant") {
      return { valido: false, error: "Rol de mensaje inválido." };
    }

    if (typeof content !== "string" || content.trim().length === 0) {
      return { valido: false, error: "Contenido de mensaje vacío." };
    }

    if (content.length > MAX_MENSAJE_CHARS) {
      return {
        valido: false,
        error: `Mensaje demasiado largo (máximo ${MAX_MENSAJE_CHARS} caracteres).`,
      };
    }

    for (const patron of PATRONES_INYECCION) {
      if (patron.test(content)) {
        return {
          valido: false,
          error: "Contenido no permitido detectado.",
        };
      }
    }
  }

  return { valido: true };
}

export function validarConsultaLey(body: unknown): ResultadoValidacion {
  if (!body || typeof body !== "object") {
    return { valido: false, error: "Cuerpo de solicitud inválido." };
  }

  const { consulta } = body as Record<string, unknown>;

  if (typeof consulta !== "string" || consulta.trim().length === 0) {
    return { valido: false, error: "Consulta vacía." };
  }

  if (consulta.length > MAX_CONSULTA_CHARS) {
    return {
      valido: false,
      error: `Consulta demasiado larga (máximo ${MAX_CONSULTA_CHARS} caracteres).`,
    };
  }

  for (const patron of PATRONES_INYECCION) {
    if (patron.test(consulta)) {
      return { valido: false, error: "Contenido no permitido detectado." };
    }
  }

  return { valido: true };
}
