import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { confirmarPagoStripe } from "@/lib/db";
import { apiError, apiOk } from "@/lib/api-response";

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY || !process.env.STRIPE_WEBHOOK_SECRET) {
    return apiError("Stripe no configurado.", 503);
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const body = await req.text();
  const sig = req.headers.get("stripe-signature") ?? "";

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return apiError("Firma inválida.", 400);
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      confirmarPagoStripe(session.id);
    }
    return apiOk({ received: true });
  } catch (error) {
    console.error("stripe webhook error:", error);
    return apiError("Error procesando webhook.", 500);
  }
}
