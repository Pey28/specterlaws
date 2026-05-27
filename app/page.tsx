import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AreasLegales from "@/components/AreasLegales";
import ComoFunciona from "@/components/ComoFunciona";
import Confianza from "@/components/Confianza";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Hero />
        <AreasLegales />
        <ComoFunciona />
        <Confianza />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
