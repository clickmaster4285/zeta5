import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Partners } from "@/components/Partners";
import { Services } from "@/components/Services";
import { Stack } from "@/components/Stack";
import { CableStation } from "@/components/CableStation";
import { Products } from "@/components/Products";
import { Proof } from "@/components/Proof";
import { Infographics } from "@/components/Infographics";
import { Insights } from "@/components/Insights";
import { CTA } from "@/components/CTA";
import { SiteFooter } from "@/components/SiteFooter";
import { Toaster } from "@/components/ui/sonner";

export default function App() {
  return (
    <>
      <main className="min-h-screen bg-background">
        <Navbar />
        <Hero />
        <About />
        <Partners />
        <Services />
        <Stack />
        <CableStation />
        <Products />
        <Proof />
        <Infographics />
        <Insights />
        <CTA />
        <SiteFooter />
      </main>
      <Toaster position="bottom-right" />
    </>
  );
}
