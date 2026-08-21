import { createFileRoute } from "@tanstack/react-router";
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

const title = "Zeta | Telecommunication Network Infrastructure";
const description =
  "Zeta designs, deploys and operates fiber, 5G and cloud-scale telecom networks for carriers, enterprises and cities.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
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
  );
}
