import insightVideo from "@/assets/insight-datacenter.mp4.asset.json";
import { useSectionProgress, easeSeg } from "@/hooks/useSectionProgress";
import { Tilt } from "@/components/fx/Tilt";

const side = [
  {
    tag: "Strategic Update",
    title: "Terrestrial Landing Station Reaches Operational Milestone",
    text: "Path diversity validation testing finalized with 100% telemetry target achievements.",
  },
  {
    tag: "Perspectives",
    title: "Network Intelligence Automation And Traffic Shaping Models",
    text: "Implementing proactive deep diagnostics to secure routing redundancies throughout core corridors.",
  },
];

export function Insights() {
  const [ref, p] = useSectionProgress<HTMLElement>();
  const seg = (s: number, l?: number) => easeSeg(p, s, l);
  const head = seg(0.05, 0.22);
  const feature = seg(0.14, 0.3);

  return (
    <section
      id="insights"
      ref={ref}
      className="relative z-10 overflow-hidden border-t border-border bg-background px-6 py-28"
    >
      <div
        className="pointer-events-none absolute -right-1/4 top-1/4 h-[600px] w-[800px] rounded-full blur-[170px]"
        style={{
          background: "var(--gradient-accent)",
          opacity: 0.1,
          transform: `translate3d(${p * -200 + 100}px, ${p * 90 - 45}px, 0)`,
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl">
        <div
          className="text-center"
          style={{ opacity: head, transform: `translateY(${(1 - head) * 40}px)` }}
        >
          <h2 className="text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl">
            Latest from <span className="text-gradient">Zeta Technologies</span>
          </h2>
        </div>

        <Tilt
          max={3}
          scale={1.01}
          glare
          className="mt-10 overflow-hidden rounded-2xl border border-border"
          style={{ opacity: feature }}
        >
          <video
            src={insightVideo.url}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="Illuminated data center racks representing sovereign cloud architecture"
            className="h-[320px] w-full object-cover md:h-[520px]"
          />
        </Tilt>

        <div className="mt-14 grid gap-6 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
          <div
            style={{
              opacity: feature,
              transform: `translate3d(${(1 - feature) * -70}px, ${p * -24 + 12}px, 0)`,
            }}
          >
            <Tilt
              as="article"
              spotlight
              max={5}
              className="group h-full rounded-2xl border border-border bg-card/40 p-5 hover:border-primary/60"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
                Industry White Paper
              </p>
              <h3 className="mt-3 text-xl font-semibold leading-snug">
                Sovereign Cloud Architectures In Modern Telecommunication Systems
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                An in-depth regulatory and architectural review of localization standards, hardware
                trust zones and high-performance low-latency redundancies across regional transit
                corridors.
              </p>
              <span className="mt-5 inline-block text-xs font-medium uppercase tracking-[0.25em] text-primary">
                Read article →
              </span>
            </Tilt>
          </div>

          <div className="flex flex-col gap-6">
            {side.map((s, i) => {
              const e = seg(0.24 + i * 0.1, 0.26);
              return (
                <div
                  key={s.title}
                  style={{
                    opacity: e,
                    transform: `translate3d(${(1 - e) * 80}px, ${p * 30 - 15}px, 0)`,
                  }}
                >
                  <Tilt
                    as="article"
                    spotlight
                    max={5}
                    className="group h-full rounded-2xl border border-border bg-card/40 px-6 py-7 hover:border-primary/60"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-primary">
                      {s.tag}
                    </p>
                    <h3 className="mt-3 text-base font-semibold leading-snug">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                  </Tilt>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
