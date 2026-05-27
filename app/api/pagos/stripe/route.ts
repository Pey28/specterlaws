import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "@/auth";
import { crearPagoStripe } from "@/lib/db";
import { MONTOS, PLANES } from "@/lib/planes";
import type { PlanId } from "@/lib/planes";

const PLANES_PAGABLES: PlanId[] = ["basico", "profesional", "individual"];

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Pagos con tarjeta no configurados. Usá SINPE Móvil por ahora." },
      { status: 503 }
    );
  }

  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Debes iniciar sesión." }, { status: 401 });
  }

  let body: unknown;
  try { body = await req.json(); } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }

  const { plan } = body as Record<string, unknown>;
  if (typeof plan !== "string" || !PLANES_PAGABLES.includes(plan as PlanId)) {
    return NextResponse.json({ error: "Plan inválido." }, { status: 400 });
  }

  const planId = plan as PlanId;
  const monto = MONTOS[planId];
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3030";

  const checkoutSession = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          // Use USD since Stripe may not support CRC; convert at ~540 CRC/USD
          currency: "usd",
          unit_amount: Math.round((monto / 540) * 100), // cents
          product_data: {
            name: `LexCR – Plan ${PLANES[planId].nombre}`,
            description: PLANES[planId].descripcion,
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${baseUrl}/pago/exitoso?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/pago/cancelado`,
    metadata: {
      userId: session.user.id,
      plan: planId,
    },
  });

  crearPagoStripe(session.user.id, planId, monto, checkoutSession.id);

  return NextResponse.json({ url: checkoutSession.url });
}
