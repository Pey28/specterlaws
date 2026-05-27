import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AreasLegales from "@/components/AreasLegales";
import dynamic from "next/dynamic";

const Documentos = dynamic(() => import("@/components/Documentos"));
const ComoFunciona = dynamic(() => import("@/components/ComoFunciona"));
const Confianza = dynamic(() => import("@/components/Confianza"));
const CTA = dynamic(() => import("@/components/CTA"));
const Footer = dynamic(() => import("@/components/Footer"));

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Hero />
        <AreasLegales />
        <Documentos />
        <ComoFunciona />
        <Confianza />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
