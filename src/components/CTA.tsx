import { useSectionProgress, easeSeg } from "@/hooks/useSectionProgress";
import { ContactForm } from "./ContactForm";

const waves = [0, 1, 2, 3, 4];

export function CTA() {
  const [ref, p] = useSectionProgress<HTMLElement>();
  const seg = (s: number, l?: number) => easeSeg(p, s, l);
  const body = seg(0.16, 0.3);

  return (
    <section
      id="contact"
      ref={ref}
      className="relative z-10 flex min-h-[70vh] items-center overflow-hidden border-t border-border bg-background px-6 py-32"
    >
      {/* flowing smoke-wave ribbons */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {waves.map((w) => {
          const depth = 1 + w * 0.35;
          return (
            <svg
              key={w}
              className="absolute inset-x-[-20%] top-1/2 h-[520px] w-[140%] -translate-y-1/2"
              viewBox="0 0 1200 400"
              preserveAspectRatio="none"
              style={{
                opacity: 0.18 + w * 0.07,
                transform: `translate3d(${(p - 0.5) * 220 * depth}px, ${(p - 0.5) * -70 * depth + w * 14 - 28}px, 0) scaleY(${1 + w * 0.08})`,
                filter: `blur(${w * 0.8}px)`,
              }}
            >
              <path
                d={`M0 ${200 + w * 10} C 250 ${80 + w * 22}, 420 ${330 - w * 18}, 640 ${200 + w * 6} S 980 ${70 + w * 26}, 1200 ${190 - w * 8}`}
                fill="none"
                stroke={w % 2 === 0 ? "var(--primary)" : "var(--muted-foreground)"}
                strokeOpacity={w % 2 === 0 ? 0.55 : 0.25}
                strokeWidth={1.2 + w * 0.4}
              />
            </svg>
          );
        })}
      </div>
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[180px]"
        style={{
          background: "var(--gradient-accent)",
          opacity: 0.18,
          transform: `translate(-50%, -50%) scale(${0.8 + p * 0.5})`,
        }}
        aria-hidden="true"
      />

      <div
        className="relative mx-auto max-w-2xl text-center"
        style={{
          opacity: body,
          transform: `translate3d(0, ${(1 - body) * 60}px, 0) scale(${0.95 + body * 0.05})`,
        }}
      >
        <h2 className="text-4xl font-bold uppercase leading-[1.1] tracking-tight md:text-5xl">
          Let's build <span className="text-gradient">what's next</span>
        </h2>
        <p className="mx-auto mt-6 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
          Talk to Zeta about your connectivity, cloud or digital infrastructure requirements. Let's
          configure your sovereign solution.
        </p>
        <div className="mt-10">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
