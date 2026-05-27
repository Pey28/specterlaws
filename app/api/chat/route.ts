import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { buscarArticulos } from "@/lib/rag";
import { checkRateLimit, getClientIP } from "@/lib/rate-limit";
import { validarMensajeChat } from "@/lib/validar-input";
import { auth } from "@/auth";
import {
  saveConsulta,
  getUserPlan,
  contarConsultasMes,
  getCreditos,
  deductirCredito,
} from "@/lib/db";
import { tieneConsultasIlimitadas } from "@/lib/planes";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const RATE_LIMIT = { max: 15, windowMs: 60_000 };
const LIMITE_GRATIS_MES = 3;

export async function POST(req: NextRequest) {
  // 1. Rate limiting
  const ip = getClientIP(req);
  const { allowed, remaining, resetIn } = checkRateLimit(ip, "chat", RATE_LIMIT.max, RATE_LIMIT.windowMs);
  if (!allowed) {
    return NextResponse.json(
      { error: `Demasiadas consultas. Esperá ${Math.ceil(resetIn / 1000)} segundos.` },
      { status: 429, headers: { "Retry-After": String(Math.ceil(resetIn / 1000)), "X-RateLimit-Remaining": "0" } }
    );
  }

  // 2. Validar input
  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: "JSON inválido." }, { status: 400 });
  }
  const validacion = validarMensajeChat(body);
  if (!validacion.valido) return NextResponse.json({ error: validacion.error }, { status: 400 });

  // 3. Plan enforcement
  const session = await auth();
  if (session?.user?.id) {
    const userId = session.user.id;
    const plan = getUserPlan(userId);

    if (plan === "individual") {
      const creditos = getCreditos(userId);
      if (creditos <= 0) {
        return NextResponse.json(
          {
            error: "No tenés créditos disponibles.",
            code: "sin_creditos",
            plan: "individual",
          },
          { status: 402 }
        );
      }
    } else if (!tieneConsultasIlimitadas(plan)) {
      // gratis plan: 3 per month
      const usadas = contarConsultasMes(userId);
      if (usadas >= LIMITE_GRATIS_MES) {
        return NextResponse.json(
          {
            error: `Alcanzaste el límite de ${LIMITE_GRATIS_MES} consultas gratuitas este mes.`,
            code: "plan_limit",
            plan: "gratis",
          },
          { status: 402 }
        );
      }
    }
  }

  // 4. Process
  try {
    const { mensajes, contextoArchivos } = body as {
      mensajes: { role: string; content: string }[];
      contextoArchivos?: string;
    };

    const ultimoMensaje = mensajes[mensajes.length - 1]?.content ?? "";
    const articulosRelevantes = buscarArticulos(ultimoMensaje, 5);

    const archivosSuffix = contextoArchivos
      ? `\n\nArchivos en el expediente del usuario:\n${contextoArchivos}`
      : "";
    const ragSuffix = articulosRelevantes ? `\n\n${articulosRelevantes}` : "";

    const systemPrompt = `Eres Specterlaws, un asistente legal especializado en leyes costarricenses vigentes en 2026. Fuente oficial: http://www.pgrweb.go.cr/scij/
Responde en español, cita artículos exactos y explica los derechos del usuario de manera simple y clara.
Indica siempre a qué institución acudir (MTSS, MEIC, OIJ, Defensoría, etc.).
Si el caso requiere atención especializada, recomienda el SICAI o la Defensoría Pública.
Cuando se te proporcionen artículos de legislación, úsalos como base principal y cita los números exactamente.${archivosSuffix}${ragSuffix}`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      system: systemPrompt,
      messages: mensajes as { role: "user" | "assistant"; content: string }[],
    });

    const respuesta = message.content[0].type === "text" ? message.content[0].text : "";

    // 5. Post-processing: save + deduct credits
    if (session?.user?.id) {
      const userId = session.user.id;
      const plan = getUserPlan(userId);
      try {
        saveConsulta(userId, ultimoMensaje, respuesta);
        if (plan === "individual") {
          deductirCredito(userId);
        }
      } catch {
        // Don't fail the request
      }
    }

    return NextResponse.json(
      { respuesta },
      { headers: { "X-RateLimit-Remaining": String(remaining) } }
    );
  } catch (err) {
    console.error("chat error:", err);
    return NextResponse.json({ error: "Error al procesar la consulta." }, { status: 500 });
  }
}
