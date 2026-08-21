import { useEffect, useRef, useState } from "react";
import { Radio, Cloud, Cpu, Activity, ArrowUpRight } from "lucide-react";
import { Tilt } from "@/components/fx/Tilt";
import { PerspectiveGrid } from "@/components/fx/PerspectiveGrid";
import { bindScrollListener } from "@/hooks/bindScrollListener";
import { reducedMotion } from "@/hooks/useMotionFx";

const majorServices = [
  {
    icon: Radio,
    tag: "Core",
    title: "Connectivity",
    text: "Secure global fibers, IP transit, LDI operations and private networks engineered for maximum uptime and resilience.",
  },
  {
    icon: Cloud,
    tag: "Sovereign",
    title: "Cloud Computing",
    text: "Sovereign data centers, cloud infrastructure hosts, intelligent orchestrators and automated virtualization models.",
  },
  {
    icon: Cpu,
    tag: "Autonomous",
    title: "Intelligent Automation",
    text: "Optimising operational tasks and infrastructure processes using secure, low-latency AI pipelines.",
  },
  {
    icon: Activity,
    tag: "Telemetry",
    title: "Network Intelligence",
    text: "Deep packet telemetry, proactive traffic shaping, diagnostics and machine-learning threat detection networks.",
  },
];

const minorServices = [
  { title: "Wholesale Voice", text: "Enterprise scale termination & originations." },
  { title: "A2P Messaging", text: "Application communication relays and security APIs." },
  { title: "CPaaS", text: "Programmable developer APIs for voice, video and messaging." },
];

export function Services() {
  const ref = useRef<HTMLElement>(null);
  const [p, setP] = useState(() => (reducedMotion() ? 1 : 0));

  useEffect(() => {
    if (reducedMotion()) {
      setP(1);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      if (rect.bottom <= 0) {
        setP(1);
        return;
      }
      if (rect.top >= vh) {
        setP(0);
        return;
      }

      const total = rect.height + vh;
      setP(Math.min(Math.max((vh - rect.top) / total, 0), 1));
    };

    return bindScrollListener(update);
  }, []);

  const seg = (start: number, len = 0.22) =>
    1 - Math.pow(1 - Math.min(Math.max((p - start) / len, 0), 1), 3);

  const head = seg(0.05);

  return (
    <section
      id="services"
      ref={ref}
      className="relative z-10 overflow-hidden border-t border-border bg-background px-6 py-28"
    >
      {/* parallax backdrop layers: a 3D floor that travels with the scroll */}
      <PerspectiveGrid progress={p} opacity={0.45} horizon="30%" />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[820px] -translate-x-1/2 rounded-full blur-[120px]"
        style={{
          background: "var(--gradient-accent)",
          opacity: 0.16,
          transform: `translate(-50%, ${p * 160 - 60}px)`,
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl">
        <div
          style={{
            opacity: head,
            transform: `translateX(${(1 - head) * -48}px)`,
          }}
        >
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.45em] text-primary">
            <span className="inline-block h-3 w-[3px] bg-primary" />
            Our Services
          </p>
          <h2 className="mt-5 max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl">
            Infrastructure and technology services built for operators.
          </h2>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2" style={{ perspective: "1600px" }}>
          {majorServices.map((s, i) => {
            const e = seg(0.16 + i * 0.07);
            const fromLeft = i % 2 === 0;
            return (
              <div
                key={s.title}
                style={{
                  opacity: e,
                  transform: `rotateY(${(1 - e) * (fromLeft ? -14 : 14)}deg) translate3d(${(1 - e) * (fromLeft ? -70 : 70)}px, ${(1 - e) * 40}px, 0)`,
                  transformOrigin: fromLeft ? "100% 50%" : "0% 50%",
                }}
              >
                <Tilt
                  as="article"
                  spotlight
                  max={6}
                  scale={1.012}
                  className="group h-full rounded-2xl border border-border bg-card/60 p-8 hover:border-primary/60"
                >
                  <div className="flex items-start justify-between">
                    <span className="depth-2 inline-flex h-11 w-11 items-center justify-center rounded-lg border border-primary/25 bg-primary/10">
                      <s.icon className="h-5 w-5 text-primary" />
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-primary/80">
                      {s.tag}
                    </span>
                  </div>
                  <h3 className="depth-1 mt-7 text-xl font-semibold">{s.title}</h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
                    {s.text}
                  </p>
                  <span className="mt-7 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-primary">
                    Explore
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                  <div className="pointer-events-none absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 bg-primary transition-transform duration-500 group-hover:scale-x-100" />
                </Tilt>
              </div>
            );
          })}
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {minorServices.map((s, i) => {
            const e = seg(0.42 + i * 0.06);
            return (
              <div
                key={s.title}
                style={{
                  opacity: e,
                  transform: `translate3d(0, ${(1 - e) * 90}px, 0)`,
                }}
              >
                <Tilt
                  as="article"
                  spotlight
                  max={6}
                  className="group h-full rounded-2xl border border-border bg-card/40 p-6 hover:border-primary/60"
                >
                  <h3 className="depth-1 text-base font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] text-primary">
                    Explore
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Tilt>
              </div>
            );
          })}
        </div>

        <div className="mt-12 flex justify-end" style={{ opacity: seg(0.6, 0.18) }}>
          <a
            href="#stack"
            className="rounded-md border border-primary px-6 py-3 text-sm font-medium text-primary transition-colors duration-300 hover:bg-primary hover:text-primary-foreground"
          >
            See the Sovereign Stack
          </a>
        </div>
      </div>
    </section>
  );
}
