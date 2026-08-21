import { Boxes, CloudCog, ShieldCheck, ArrowRight } from "lucide-react";
import { useSectionProgress, easeSeg } from "@/hooks/useSectionProgress";
import { Tilt } from "@/components/fx/Tilt";
import { PerspectiveGrid } from "@/components/fx/PerspectiveGrid";

const products = [
  {
    id: "PROD-01",
    icon: Boxes,
    name: "CONNECTHUB",
    text: "Next-generation software platform for programmatic global connectivity and virtual SD-WAN telemetry control.",
  },
  {
    id: "PROD-02",
    icon: CloudCog,
    name: "CLOUDHUB",
    text: "Sovereign orchestration panel enabling seamless deployment of hyper-localized automated secure virtualization host clusters.",
  },
  {
    id: "PROD-03",
    icon: ShieldCheck,
    name: "ZEKLI",
    text: "Integrated developer security suite designed to scale real-time network intelligence, proactive traffic diagnostics and telemetry pipeline models.",
  },
];

export function Products() {
  const [ref, p] = useSectionProgress<HTMLElement>();
  const seg = (s: number, l?: number) => easeSeg(p, s, l);
  const head = seg(0.06, 0.24);

  return (
    <section
      id="products"
      ref={ref}
      className="relative z-10 overflow-hidden border-t border-border bg-background px-6 py-28"
    >
      {/* diagonal drifting gas ribbons */}
      <div
        className="pointer-events-none absolute -left-1/4 top-0 h-[700px] w-[900px] rotate-12 rounded-full blur-[170px]"
        style={{
          background: "var(--gradient-accent)",
          opacity: 0.13,
          transform: `rotate(12deg) translate3d(${p * 260 - 60}px, ${p * -120}px, 0)`,
        }}
        aria-hidden="true"
      />
      <PerspectiveGrid progress={p} opacity={0.35} horizon="34%" />

      <div className="relative mx-auto max-w-7xl">
        <div
          style={{
            opacity: head,
            transform: `translate3d(0, ${(1 - head) * 50}px, 0)`,
          }}
        >
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.45em] text-primary">
            <span className="inline-block h-3 w-[3px] bg-primary" />
            Zeta Products
          </p>
          <h2 className="mt-5 max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl">
            Purpose-built platforms powered by{" "}
            <span className="text-gradient">Zeta's infrastructure.</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3" style={{ perspective: "1400px" }}>
          {products.map((prod, i) => {
            const e = seg(0.18 + i * 0.09, 0.26);
            return (
              <div
                key={prod.id}
                style={{
                  opacity: e,
                  transform: `rotateY(${(1 - e) * 14}deg) translate3d(${(1 - e) * 70}px, ${(1 - e) * 30}px, 0)`,
                  transformOrigin: "left center",
                }}
              >
                <Tilt
                  as="article"
                  spotlight
                  max={7}
                  scale={1.02}
                  className="group h-full rounded-2xl border border-border bg-card/50 p-8 hover:border-primary/60"
                >
                  <div className="flex items-start justify-between">
                    <span className="depth-3 flex h-11 w-11 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 shadow-[0_12px_30px_-12px_color-mix(in_oklab,var(--primary)_60%,transparent)]">
                      <prod.icon className="h-5 w-5 text-primary" />
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                      {prod.id}
                    </span>
                  </div>
                  <h3 className="depth-1 mt-7 text-lg font-semibold tracking-[0.08em]">
                    {prod.name}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{prod.text}</p>
                  <span className="mt-7 inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.2em] text-primary">
                    Explore {prod.name}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                  <div
                    className="pointer-events-none absolute inset-x-6 top-0 h-px origin-left bg-primary transition-transform duration-500"
                    style={{ transform: `scaleX(${e})` }}
                  />
                </Tilt>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
