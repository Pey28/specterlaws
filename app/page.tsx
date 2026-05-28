import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import dynamic from "next/dynamic";

const Documentos = dynamic(() => import("@/components/Documentos"));
const ComoFunciona = dynamic(() => import("@/components/ComoFunciona"));
const Confianza = dynamic(() => import("@/components/Confianza"));
const CTA = dynamic(() => import("@/components/CTA"));
const Footer = dynamic(() => import("@/components/Footer"));

function SectionSkeleton() {
  return <div className="py-24 w-full" aria-hidden="true" />;
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-black">
        <Hero />
        <Suspense fallback={<SectionSkeleton />}>
          <Documentos />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <ComoFunciona />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <Confianza />
        </Suspense>
        <Suspense fallback={<SectionSkeleton />}>
          <CTA />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
}
