import { useEffect, useRef, useState } from "react";
import { Globe2, Radio, ShieldCheck, Server, Satellite, Cable } from "lucide-react";
import { CountUp } from "@/components/CountUp";
import { Tilt } from "@/components/fx/Tilt";

const cards = [
  {
    icon: Globe2,
    title: "Global backbone",
    text: "Cross-border transit and IP peering built on redundant fiber rings spanning 18,000 km.",
  },
  {
    icon: Radio,
    title: "Wireless & 5G",
    text: "Tower, small-cell and private 5G rollouts — from RF survey to switch-on.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by design",
    text: "Carrier-grade monitoring, DDoS defence and 24/7 network operations centers.",
  },
  {
    icon: Server,
    title: "Core & edge",
    text: "Cloud-native core networks and edge compute that keep latency measured in milliseconds.",
  },
  {
    icon: Satellite,
    title: "Satellite & transport",
    text: "Microwave, satellite and optical transport for the places fiber can't yet reach.",
  },
  {
    icon: Cable,
    title: "Fiber deployment",
    text: "End-to-end civil works, splicing and activation — one accountable partner.",
  },
];

const stats = [
  { value: 18, decimals: 0, suffix: "K km", label: "Fiber deployed" },
  { value: 99.99, decimals: 2, suffix: "%", label: "Network uptime" },
  { value: 40, decimals: 0, suffix: "+", label: "Carrier partners" },
];

export function About() {
  const ref = useRef<HTMLElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the panel top is at the bottom of the viewport, 1 when it reaches the top.
      setP(Math.min(Math.max((vh - rect.top) / vh, 0), 1));
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="about"
      ref={ref}
      className="relative z-10 rounded-t-[2.5rem] border-t border-border bg-background px-6 pb-28 pt-24 shadow-[0_-40px_80px_-20px_rgba(0,0,0,0.75)]"
    >
      <div
        className="absolute inset-0 rounded-t-[2.5rem]"
        style={{ backgroundImage: "var(--surface-glow)" }}
      />

      <div className="relative mx-auto max-w-7xl">
        <div
          className="max-w-2xl transition-none"
          style={{
            opacity: Math.min(p * 2.2, 1),
            transform: `translateY(${(1 - Math.min(p * 1.8, 1)) * 60}px)`,
          }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.45em] text-primary">About Us</p>
          <h2 className="mt-5 text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            We build the invisible layer everything else runs on.
          </h2>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3" style={{ perspective: "1400px" }}>
          {cards.map((c, i) => {
            const start = 0.15 + (i % 3) * 0.08 + Math.floor(i / 3) * 0.12;
            const eased = 1 - Math.pow(1 - Math.min(Math.max((p - start) / 0.45, 0), 1), 3);
            return (
              /* outer wrapper carries the scroll entrance (cards rise and flatten out of the floor),
                 the Tilt inside carries the pointer depth */
              <div
                key={c.title}
                style={{
                  opacity: eased,
                  transform: `rotateX(${(1 - eased) * 16}deg) translate3d(0, ${(1 - eased) * 120}px, 0)`,
                  transformOrigin: "50% 100%",
                }}
              >
                <Tilt
                  spotlight
                  max={7}
                  scale={1.015}
                  className="h-full rounded-2xl border border-border bg-card p-8 hover:border-primary/60"
                >
                  <span className="depth-2 inline-flex h-12 w-12 items-center justify-center rounded-xl border border-primary/25 bg-primary/10">
                    <c.icon className="h-6 w-6 text-primary" />
                  </span>
                  <h3 className="depth-1 mt-6 text-lg font-semibold">{c.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.text}</p>
                </Tilt>
              </div>
            );
          })}
        </div>

        <div
          className="relative mt-16 overflow-hidden rounded-2xl border-t border-border pt-8"
          style={{ opacity: Math.min(Math.max((p - 0.6) * 3, 0), 1) }}
        >
          {/* ambient animated backdrop */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div
              className="stat-drift absolute -left-1/4 top-[-60%] h-[320px] w-[70%] rounded-full blur-[110px]"
              style={{ background: "var(--gradient-accent)", opacity: 0.22 }}
            />
            <div
              className="stat-grid absolute inset-0 opacity-40"
              style={{
                backgroundImage: "var(--grid-lines)",
                backgroundSize: "60px 60px",
                maskImage:
                  "linear-gradient(to bottom, transparent, black 35%, black 65%, transparent)",
              }}
            />
            <div
              className="stat-sweep absolute inset-y-0 w-[24%]"
              style={{
                background:
                  "linear-gradient(90deg, transparent, color-mix(in oklab, var(--primary) 22%, transparent), transparent)",
              }}
            />
          </div>

          <div className="relative grid gap-6 px-1 pb-6 sm:grid-cols-3">
            {stats.map((s, i) => (
              <div key={s.label} className="relative">
                <span
                  className="stat-pulse pointer-events-none absolute -left-3 top-2 h-2 w-2 rounded-full bg-primary"
                  style={{ animationDelay: `${i * 0.6}s` }}
                  aria-hidden="true"
                />
                <p className="text-3xl font-bold tabular-nums text-primary md:text-4xl">
                  <CountUp value={s.value} decimals={s.decimals} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
