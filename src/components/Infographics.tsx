import { useSectionProgress, easeSeg } from "@/hooks/useSectionProgress";
import { Tilt } from "@/components/fx/Tilt";

const metrics = [
  { label: "Network Uptime", value: 99.99, suffix: "%", pct: 100 },
  { label: "Backbone Capacity", value: 400, suffix: " Gbps", pct: 86 },
  { label: "Edge Nodes Deployed", value: 120, suffix: "+", pct: 72 },
  { label: "Avg. Latency (Regional)", value: 6, suffix: " ms", pct: 42 },
];

const donuts = [
  { label: "Enterprise", pct: 46 },
  { label: "Carrier", pct: 32 },
  { label: "Public Sector", pct: 22 },
];

export function Infographics() {
  const [ref, p] = useSectionProgress<HTMLElement>();
  const seg = (s: number, l?: number) => easeSeg(p, s, l);
  const head = seg(0.05, 0.22);

  return (
    <section
      id="infographics"
      ref={ref}
      className="relative z-10 overflow-hidden border-t border-border bg-background px-6 py-28"
    >
      <div
        className="pointer-events-none absolute -right-1/4 top-10 h-[620px] w-[820px] rounded-full blur-[170px]"
        style={{
          background: "var(--gradient-accent)",
          opacity: 0.14,
          transform: `translate3d(${p * -220 + 110}px, ${p * 90 - 45}px, 0)`,
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage: "var(--grid-lines)",
          backgroundSize: "90px 90px",
          transform: `translate3d(${p * 50 - 25}px, ${p * -50 + 25}px, 0)`,
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl">
        <div
          style={{
            opacity: head,
            transform: `translate3d(0, ${(1 - head) * 45}px, 0)`,
          }}
        >
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.45em] text-primary">
            <span className="inline-block h-3 w-[3px] bg-primary" />
            Network Infographics
          </p>
          <h2 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl">
            The numbers behind <span className="text-gradient">Zeta&apos;s backbone.</span>
          </h2>
        </div>

        <div className="mt-16 grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          {/* animated bars */}
          <div className="space-y-7">
            {metrics.map((m, i) => {
              const e = seg(0.16 + i * 0.07, 0.3);
              return (
                <div
                  key={m.label}
                  style={{
                    opacity: Math.min(1, e * 1.4),
                    transform: `translate3d(${(1 - e) * -50}px, 0, 0)`,
                  }}
                >
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground">
                      {m.label}
                    </span>
                    <span className="font-mono text-lg font-semibold tabular-nums">
                      {(m.value * e).toFixed(m.value % 1 ? 2 : 0)}
                      {m.suffix}
                    </span>
                  </div>
                  <div className="mt-3 h-[6px] overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${m.pct * e}%`,
                        background: "var(--gradient-accent)",
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* animated donuts */}
          <Tilt
            spotlight
            max={5}
            className="grid grid-cols-3 gap-4 self-start rounded-2xl border border-border bg-card/40 p-7 backdrop-blur-sm"
          >
            {donuts.map((d, i) => {
              const e = seg(0.24 + i * 0.08, 0.32);
              const r = 34;
              const c = 2 * Math.PI * r;
              return (
                <div
                  key={d.label}
                  className="flex flex-col items-center"
                  style={{
                    opacity: e,
                    transform: `translate3d(0, ${(1 - e) * 40}px, 0) scale(${0.9 + e * 0.1})`,
                  }}
                >
                  <svg viewBox="0 0 80 80" className="h-20 w-20 -rotate-90">
                    <circle
                      cx="40"
                      cy="40"
                      r={r}
                      fill="none"
                      stroke="var(--muted)"
                      strokeWidth="7"
                    />
                    <circle
                      cx="40"
                      cy="40"
                      r={r}
                      fill="none"
                      stroke="var(--primary)"
                      strokeWidth="7"
                      strokeLinecap="round"
                      strokeDasharray={c}
                      strokeDashoffset={c - (c * d.pct * e) / 100}
                    />
                  </svg>
                  <span className="mt-3 font-mono text-sm font-semibold">
                    {Math.round(d.pct * e)}%
                  </span>
                  <span className="mt-1 text-center text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    {d.label}
                  </span>
                </div>
              );
            })}
          </Tilt>
        </div>
      </div>
    </section>
  );
}
