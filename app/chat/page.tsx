import type { Metadata } from "next";
import ChatInterface from "@/components/chat/ChatInterface";

export const metadata: Metadata = {
  title: "Consulta Legal Gratis con IA",
  description:
    "Hacé tu consulta legal gratis con inteligencia artificial especializada en leyes de Costa Rica. Derechos laborales, despidos, pensiones, accidentes de trabajo y más.",
  alternates: { canonical: "https://specterlaws.cr/chat" },
  openGraph: {
    title: "Consulta Legal Gratis – Specterlaws",
    description:
      "Resolvé tus dudas legales en segundos con el asistente de IA más completo sobre leyes costarricenses.",
    url: "https://specterlaws.cr/chat",
  },
};

export default function ChatPage() {
  return <ChatInterface />;
}
