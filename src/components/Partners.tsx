import partnersLogos from "@/assets/partners_logos.png.asset.json";

export const Partners = () => {
  return (
    <section
      id="partners"
      aria-labelledby="partners-heading"
      className="relative z-10 w-full overflow-hidden border-y border-border/60 bg-background py-14 md:py-20"
    >
      <div className="mx-auto mb-10 max-w-3xl px-6 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-primary">
          Trusted partners
        </p>
        <h2
          id="partners-heading"
          className="mt-3 text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
        >
          Powering networks with the world&rsquo;s leading carriers
        </h2>
      </div>

      <div
        aria-label="Partner and carrier logos: Zong 4G, Telenor, Redtone, PTCL, Cisco, Acmetel, Transworld Home"
        role="img"
        className="partners-marquee marquee-mask h-20 w-full"
        style={{ backgroundImage: `url(${partnersLogos.url})` }}
      />
    </section>
  );
};
