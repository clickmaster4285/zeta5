import cableMap from "@/assets/cable-landing-station.png.asset.json";
import { useSectionProgress, easeSeg } from "@/hooks/useSectionProgress";
import { Tilt } from "@/components/fx/Tilt";

const stats = [
  { value: 3, suffix: "", label: "Subsea systems", pct: 38, decimals: 0 },
  { value: 12, suffix: "", label: "Metro POPs", pct: 66, decimals: 0 },
  { value: 99.99, suffix: "%", label: "Route uptime", pct: 100, decimals: 2 },
];

const highlights = [
  { k: "Latency", v: "< 38 ms", d: "Karachi → Frankfurt" },
  { k: "Capacity", v: "24 Tbps", d: "Lit, upgradeable" },
  { k: "Diversity", v: "3 paths", d: "Fully protected" },
];

export function CableStation() {
  const [ref, p] = useSectionProgress<HTMLElement>();
  const seg = (s: number, l?: number) => easeSeg(p, s, l);

  const copy = seg(0.08, 0.24);
  const map = seg(0.12, 0.28);

  return (
    <section
      id="networks"
      ref={ref}
      className="relative z-10 overflow-hidden border-t border-border bg-background px-6 py-28 mt-16"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: "var(--grid-lines)",
          backgroundSize: "90px 90px",
          transform: `translate3d(${p * 60 - 30}px, 0, 0)`,
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-0 top-1/4 h-[560px] w-[720px] rounded-full blur-[170px]"
        style={{
          background: "var(--gradient-accent)",
          opacity: 0.16,
          transform: `translate3d(${p * -140 + 60}px, ${p * -60}px, 0)`,
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]">
          {/* ── copy column ───────────────────────────── */}
          <div
            style={{
              opacity: copy,
              transform: `translate3d(${(1 - copy) * -60}px, 0, 0)`,
            }}
          >
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.45em] text-primary">
              <span className="inline-block h-3 w-[3px] bg-primary" />
              Strategic Infrastructure
            </p>
            <h2 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight md:text-[3.4rem]">
              Pakistan's First <span className="text-gradient">Terrestrial</span>
              <br className="hidden md:block" /> Cable Landing Station
            </h2>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Providing crucial transit diversity and international data corridor connectivity. This
              landing station safeguards network sovereignty and guarantees high-performance routing
              path redundancies throughout Central and South Asia.
            </p>

            {/* highlight chips */}
            <div className="mt-9 grid gap-3 sm:grid-cols-3">
              {highlights.map((h, i) => {
                const e = seg(0.24 + i * 0.05, 0.22);
                return (
                  <div
                    key={h.k}
                    className="rounded-xl border border-border bg-card/50 p-4 backdrop-blur-sm transition-colors duration-300 hover:border-primary/60"
                    style={{
                      opacity: e,
                      transform: `translate3d(0, ${(1 - e) * 26}px, 0)`,
                    }}
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                      {h.k}
                    </p>
                    <p className="mt-2 font-mono text-lg font-semibold text-primary">{h.v}</p>
                    <p className="mt-1 text-[11px] text-muted-foreground">{h.d}</p>
                  </div>
                );
              })}
            </div>

            <a
              href="#contact"
              className="mt-9 inline-flex items-center gap-2 rounded-md bg-primary px-7 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-elevated)] transition-transform duration-300 hover:-translate-y-0.5"
              style={{ opacity: seg(0.4, 0.18) }}
            >
              Discover our networks
              <span aria-hidden="true">→</span>
            </a>
          </div>

          {/* ── map column ────────────────────────────── */}
          <div
            className="relative"
            style={{
              opacity: map,
              transform: `translate3d(${(1 - map) * 70}px, ${p * 30 - 15}px, 0)`,
            }}
          >
            <Tilt
              max={6}
              scale={1.01}
              glare
              className="rounded-3xl border border-border bg-card/30 p-2 shadow-2xl"
            >
              <div className="relative overflow-hidden rounded-2xl">
                <img
                  src={cableMap.url}
                  alt="Network map of Pakistan showing terrestrial fiber routes and subsea cable landings"
                  loading="lazy"
                  width={1280}
                  height={960}
                  className="h-full w-full object-cover"
                  style={{ transform: `scale(${1.1 - p * 0.06})` }}
                />
                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(160deg, transparent 40%, color-mix(in oklab, var(--background) 65%, transparent))",
                  }}
                  aria-hidden="true"
                />
                <div
                  className="pointer-events-none absolute inset-y-0 w-28 blur-2xl"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, color-mix(in oklab, var(--primary) 45%, transparent), transparent)",
                    left: `${p * 130 - 15}%`,
                    opacity: 0.45,
                  }}
                  aria-hidden="true"
                />

                {/* corner brackets */}
                {[
                  "left-3 top-3 border-l-2 border-t-2",
                  "right-3 top-3 border-r-2 border-t-2",
                  "left-3 bottom-3 border-b-2 border-l-2",
                  "right-3 bottom-3 border-b-2 border-r-2",
                ].map((c) => (
                  <span
                    key={c}
                    className={`pointer-events-none absolute h-6 w-6 border-primary/70 ${c}`}
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* telemetry chips float above the map on their own depth planes */}
              <div className="depth-3 pointer-events-none absolute bottom-6 left-6 flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1.5 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="stat-pulse absolute inline-flex h-full w-full rounded-full bg-primary" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.24em] text-foreground">
                  Live route telemetry
                </span>
              </div>
              <div className="depth-2 pointer-events-none absolute right-6 top-6 rounded-lg border border-border bg-background/70 px-3 py-2 backdrop-blur-md">
                <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-muted-foreground">
                  Landing station
                </p>
                <p className="mt-0.5 font-mono text-sm font-semibold text-primary">KHI · ONLINE</p>
              </div>
            </Tilt>
          </div>
        </div>

        {/* ── stat rail ───────────────────────────────── */}
        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
          {stats.map((s, i) => {
            const e = seg(0.28 + i * 0.05, 0.2);
            return (
              <div
                key={s.label}
                className="group bg-card/60 px-7 py-8 backdrop-blur-sm transition-colors duration-300 hover:bg-card"
                style={{
                  opacity: e,
                  transform: `translate3d(0, ${(1 - e) * 24}px, 0)`,
                }}
              >
                <span className="font-mono text-4xl font-semibold tabular-nums text-primary md:text-5xl">
                  {(s.value * e).toFixed(s.decimals)}
                  {s.suffix}
                </span>
                <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.28em] text-muted-foreground">
                  {s.label}
                </p>
                <div className="mt-4 h-[3px] w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${s.pct * e}%`,
                      background: "var(--gradient-accent)",
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
