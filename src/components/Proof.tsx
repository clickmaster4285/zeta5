import { useSectionProgress, easeSeg } from "@/hooks/useSectionProgress";
import { Tilt } from "@/components/fx/Tilt";
import logo from "@/assets/zeta-logo.png";

const proofs = [
  {
    title: "Licensed Operator",
    text: "Formally holding complete LDI & CVAS certifications to guarantee regulatory compliance.",
  },
  {
    title: "Sovereign Infrastructure",
    text: "Strategically located datacenters ensuring your data assets remain completely localized.",
  },
  {
    title: "Resilient Networks",
    text: "Engineered path redundancies designed to minimize low-latency routing failures.",
  },
  {
    title: "15+ Years Experience",
    text: "Deep technical heritage power-delivering reliable regional telecommunications structures.",
  },
  {
    title: "Integrated Capabilities",
    text: "Synthesizing robust transit, local virtualization clusters and deep threat analytics.",
  },
  {
    title: "Enterprise Support",
    text: "Dedicated 24/7 network operations center personnel safeguarding core connectivity.",
  },
];

export function Proof() {
  const [ref, p] = useSectionProgress<HTMLElement>();
  const seg = (s: number, l?: number) => easeSeg(p, s, l);
  const head = seg(0.05, 0.22);

  return (
    <section
      id="why-zeta"
      ref={ref}
      className="relative z-10 overflow-hidden border-t border-border bg-background px-6 py-28"
    >
      {/* slow-moving fine grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage: "var(--grid-lines)",
          backgroundSize: "60px 60px",
          transform: `translate3d(${p * -60 + 30}px, ${p * 60 - 30}px, 0)`,
        }}
        aria-hidden="true"
      />

      {/* dotted field - large, subtle, moving opposite to grid */}
      <div
        className="pointer-events-none absolute -left-32 top-0 h-[720px] w-[720px] rounded-full opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle, color-mix(in oklab, var(--primary) 25%, transparent) 1.6px, transparent 1.7px)",
          backgroundSize: "22px 22px",
          maskImage: "radial-gradient(circle at 50% 50%, black 45%, transparent 72%)",
          transform: `translate3d(${p * 90 - 45}px, ${p * -60 + 30}px, 0) rotate(${p * -12}deg)`,
        }}
        aria-hidden="true"
      />

      {/* secondary dotted cluster on the right */}
      <div
        className="pointer-events-none absolute -bottom-48 -right-32 h-[640px] w-[640px] rounded-full opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, color-mix(in oklab, var(--muted-foreground) 35%, transparent) 1.5px, transparent 1.6px)",
          backgroundSize: "18px 18px",
          maskImage: "radial-gradient(circle at 50% 50%, black 50%, transparent 78%)",
          transform: `translate3d(${p * -70 + 35}px, ${p * -40 + 20}px, 0) rotate(${p * 18}deg)`,
        }}
        aria-hidden="true"
      />

      {/* soft top glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[900px] -translate-x-1/2 rounded-full blur-[180px]"
        style={{
          background: "var(--gradient-accent)",
          opacity: 0.08,
        }}
        aria-hidden="true"
      />

      {/* large accent glow behind cards */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/3 h-[520px] w-[680px] rounded-full blur-[160px]"
        style={{
          background: "var(--gradient-accent)",
          opacity: 0.12,
          transform: `translate3d(${p * -140 + 70}px, ${p * -100 + 50}px, 0)`,
        }}
        aria-hidden="true"
      />

      {/* logo watermark */}
      <div
        className="pointer-events-none absolute right-10 top-20 opacity-[0.035]"
        style={{
          transform: `translate3d(${p * -40 + 20}px, 0, 0) rotate(${p * -6}deg)`,
        }}
        aria-hidden="true"
      >
        <img src={logo} alt="" className="h-48 w-48 object-contain" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <div
          style={{
            opacity: head,
            transform: `translate3d(${(1 - head) * -60}px, 0, 0)`,
          }}
        >
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.45em] text-primary">
            <span className="inline-block h-3 w-[3px] bg-primary" />
            Why Zeta
          </p>
          <h2 className="mt-5 text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl">
            The <span className="text-gradient">Proof</span> Behind the Platform
          </h2>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {proofs.map((item, i) => {
            const row = Math.floor(i / 3);
            const col = i % 3;
            const e = seg(0.14 + row * 0.1 + col * 0.05, 0.24);
            return (
              <div
                key={item.title}
                style={{
                  opacity: e,
                  clipPath: `inset(${(1 - e) * 100}% 0 0 0)`,
                  transform: `translate3d(0, ${(1 - e) * 50}px, 0)`,
                }}
              >
                <Tilt
                  as="article"
                  spotlight
                  max={5}
                  className="group h-full rounded-xl border border-border bg-card/40 px-6 py-7 hover:border-primary/60"
                >
                  <h3 className="depth-1 text-sm font-semibold uppercase tracking-[0.16em]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                  <div className="pointer-events-none absolute inset-y-4 left-0 w-[2px] origin-bottom scale-y-0 bg-primary transition-transform duration-500 group-hover:scale-y-100" />
                </Tilt>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
