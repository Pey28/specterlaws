import { NextRequest } from "next/server";
import Stripe from "stripe";
import { auth } from "@/auth";
import { crearPagoStripe } from "@/lib/db";
import { MONTOS, PLANES, PLANES_PAGABLES } from "@/lib/planes";
import type { PlanId } from "@/lib/planes";
import { apiError, apiOk } from "@/lib/api-response";

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return apiError("Pagos con tarjeta no configurados. Usá SINPE Móvil por ahora.", 503);
  }

  const session = await auth();
  if (!session?.user?.id) {
    return apiError("Debes iniciar sesión.", 401);
  }

  let body: unknown;
  try { body = await req.json(); } catch {
    return apiError("Solicitud inválida.", 400);
  }

  const { plan } = body as Record<string, unknown>;
  if (typeof plan !== "string" || !PLANES_PAGABLES.includes(plan as PlanId)) {
    return apiError("Plan inválido.", 400);
  }

  const planId = plan as PlanId;
  const monto = MONTOS[planId];
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const baseUrl = process.env.NEXTAUTH_URL ?? "http://localhost:3030";

  try {
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            // Use USD since Stripe may not support CRC; convert at ~540 CRC/USD
            currency: "usd",
            unit_amount: Math.round((monto / 540) * 100), // cents
            product_data: {
              name: `Specterlaws – Plan ${PLANES[planId].nombre}`,
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

    return apiOk({ url: checkoutSession.url });
  } catch (error) {
    console.error("stripe checkout error:", error);
    return apiError("No se pudo iniciar el pago con tarjeta.", 500);
  }
}
