import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { buscarArticulos } from "@/lib/rag";
import { checkRateLimit, getClientIP } from "@/lib/rate-limit";
import { validarConsultaLey } from "@/lib/validar-input";
import { apiError } from "@/lib/api-response";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

// 10 búsquedas por minuto por IP
const RATE_LIMIT = { max: 10, windowMs: 60_000 };

export async function POST(req: NextRequest) {
  // 1. Rate limiting
  const ip = getClientIP(req);
  const { allowed, remaining, resetIn } = checkRateLimit(ip, "buscar-ley", RATE_LIMIT.max, RATE_LIMIT.windowMs);

  if (!allowed) {
    return NextResponse.json(
      { ok: false, error: `Demasiadas búsquedas. Esperá ${Math.ceil(resetIn / 1000)} segundos.` },
      {
        status: 429,
        headers: { "Retry-After": String(Math.ceil(resetIn / 1000)) },
      }
    );
  }

  // 2. Validar input
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return apiError("JSON inválido.", 400);
  }

  const validacion = validarConsultaLey(body);
  if (!validacion.valido) {
    return apiError(validacion.error, 400);
  }

  // 3. Procesar
  try {
    const { consulta } = body as { consulta: string };
    const articulosRelevantes = buscarArticulos(consulta, 6);
    const ragSuffix = articulosRelevantes ? `\n\n${articulosRelevantes}` : "";

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: `Eres Specterlaws, un asistente legal especializado en leyes costarricenses vigentes en 2026. Fuente oficial: http://www.pgrweb.go.cr/scij/
Responde SOLO con base en la legislación costarricense vigente.
Responde en español, cita el artículo exacto, confirma si está vigente y explica los derechos de manera simple y clara.
Cuando se te proporcionen artículos de legislación, úsalos como base principal.${ragSuffix}`,
      messages: [{ role: "user", content: consulta }],
    });

    const respuesta = message.content[0].type === "text" ? message.content[0].text : "";

    return NextResponse.json(
      { ok: true, respuesta },
      {
        headers: {
          "X-RateLimit-Remaining": String(remaining),
          "Cache-Control": "private, max-age=300",
        },
      }
    );
  } catch (err) {
    console.error("buscar-ley error:", err);
    return apiError("Error al consultar la legislación.", 500);
  }
}
