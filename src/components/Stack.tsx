import { useEffect, useRef, useState } from "react";
import stackIso from "@/assets/stack-iso.jpg";
import { useSectionProgress, easeSeg } from "@/hooks/useSectionProgress";
import { motionFxEnabled, reducedMotion } from "@/hooks/useMotionFx";

const layers = [
  {
    n: "1",
    title: "Connectivity",
    text: "Secure fiber-leased pipelines and sovereign border gateway connections.",
  },
  {
    n: "2",
    title: "Core Cloud",
    text: "Virtualized, dedicated host nodes configured inside redundant data zones.",
  },
  {
    n: "3",
    title: "Data Center",
    text: "Pakistan-regionalized secure operational hosting compounds.",
  },
];

const branches = [
  { title: "Intelligent Automation", text: "System level task tooling engines." },
  { title: "Network Intelligence", text: "Sub-level security telemetric analysis." },
];

/**
 * The Sovereign Intelligence Stack rendered as real CSS 3D: three translucent
 * planes on their own translateZ above the isometric render, two satellite
 * tiles for the intelligence branches, pointer tilt on the whole scene, and
 * the layer list driving the highlighted plane.
 */
export function Stack() {
  const [ref, p] = useSectionProgress<HTMLElement>();
  const seg = (s: number, l?: number) => easeSeg(p, s, l);
  const [active, setActive] = useState(0);
  const [hover, setHover] = useState<number | null>(null);
  const [branchHover, setBranchHover] = useState<number | null>(null);
  const touched = useRef(false);
  const artRef = useRef<HTMLDivElement>(null);
  const planesRef = useRef<HTMLDivElement>(null);

  const head = seg(0.04);
  const media = seg(0.12, 0.3);
  const shown = hover ?? active;

  /* ambient cycle until the visitor takes over */
  useEffect(() => {
    if (reducedMotion()) return;
    const id = window.setInterval(() => {
      if (!touched.current) setActive((a) => (a + 1) % layers.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, []);

  /* pointer tilt on the scene — CSS variables only, no re-render */
  useEffect(() => {
    const art = artRef.current;
    const planes = planesRef.current;
    if (!art || !planes || !motionFxEnabled()) return;
    let raf = 0;
    let tx = 0,
      ty = 0;
    const paint = () => {
      raf = 0;
      planes.style.setProperty("--tilt-x", `${tx.toFixed(2)}deg`);
      planes.style.setProperty("--tilt-y", `${ty.toFixed(2)}deg`);
    };
    const onMove = (e: PointerEvent) => {
      const r = art.getBoundingClientRect();
      tx = -((e.clientY - r.top) / r.height - 0.5) * 10;
      ty = ((e.clientX - r.left) / r.width - 0.5) * 12;
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const onLeave = () => {
      tx = ty = 0;
      if (!raf) raf = requestAnimationFrame(paint);
    };
    art.addEventListener("pointermove", onMove, { passive: true });
    art.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      art.removeEventListener("pointermove", onMove);
      art.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  const select = (i: number) => {
    touched.current = true;
    setActive(i);
  };

  return (
    <section
      id="stack"
      ref={ref}
      className="relative z-10 overflow-hidden border-t border-border bg-background px-6 py-28"
    >
      {/* drifting gas / fog layers */}
      <div
        className="pointer-events-none absolute -left-40 top-10 h-[560px] w-[560px] rounded-full blur-[140px]"
        style={{
          background: "var(--gradient-accent)",
          opacity: 0.18,
          transform: `translate3d(${p * 220}px, ${p * -140}px, 0)`,
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 bottom-0 h-[460px] w-[460px] rounded-full blur-[150px]"
        style={{
          background: "var(--gradient-accent)",
          opacity: 0.12,
          transform: `translate3d(${p * -180}px, ${p * 120}px, 0)`,
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl">
        <div
          style={{
            opacity: head,
            transform: `translateY(${(1 - head) * 40}px)`,
          }}
        >
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.45em] text-primary">
            <span className="inline-block h-3 w-[3px] bg-primary" />
            Core Ecosystem
          </p>
          <h2 className="mt-5 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl">
            The Sovereign <span className="text-gradient">Intelligence</span> Stack
          </h2>
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Unifying core telecommunication layers and machine intelligence into a single secure
            ecosystem.
          </p>
        </div>

        <div className="mt-16 grid items-start gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          {/* media column – sticky 3D scene */}
          <div className="lg:sticky lg:top-24">
            <div
              ref={artRef}
              className="relative"
              style={{
                opacity: media,
                transform: `perspective(1200px) rotateX(${(1 - media) * 10}deg) translateY(${(1 - media) * 60}px) scale(${0.94 + media * 0.06})`,
              }}
            >
              <div className="relative overflow-hidden rounded-2xl border border-border">
                <img
                  src={stackIso}
                  alt="Isometric illustration of Zeta's sovereign intelligence infrastructure stack"
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="h-full w-full object-cover"
                  style={{ transform: `translateY(${p * -40}px) scale(1.12)` }}
                />
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
                  style={{
                    background: "linear-gradient(to top, var(--background), transparent)",
                    opacity: 0.75,
                  }}
                  aria-hidden="true"
                />
              </div>

              {/* 3D planes over the render */}
              <div className="stack-scene pointer-events-none absolute inset-0" aria-hidden="true">
                <div
                  ref={planesRef}
                  className="stack-planes absolute left-1/2 top-1/2 aspect-[1.5] w-[62%]"
                  style={{ "--lift": "56px" } as React.CSSProperties}
                >
                  {layers.map((l, i) => (
                    <div
                      key={l.n}
                      className="stack-plane rounded-sm"
                      data-active={i === shown}
                      style={{ "--i": i } as React.CSSProperties}
                    >
                      <span className="absolute bottom-[8%] left-[6%] flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground">
                        <span className="text-primary">0{l.n}</span>
                        {l.title}
                      </span>
                    </div>
                  ))}
                  {branches.map((b, i) => {
                    const lit = branchHover === i;
                    return (
                      <div
                        key={b.title}
                        className="stack-satellite rounded-sm"
                        style={{
                          width: "34%",
                          height: "30%",
                          left: i === 0 ? "4%" : "62%",
                          top: i === 0 ? "6%" : "4%",
                          transform: `translateZ(${layers.length * 56 + 34 + (lit ? 18 : 0)}px)`,
                          opacity: lit ? 1 : 0.72,
                        }}
                      >
                        <span className="absolute bottom-[10%] left-[8%] font-mono text-[9px] uppercase tracking-[0.18em] text-foreground">
                          {b.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* layers column – clip-reveal rows driving the planes */}
          <div className="flex flex-col gap-4">
            {layers.map((l, i) => {
              const e = seg(0.18 + i * 0.08, 0.24);
              const on = i === shown;
              return (
                <button
                  type="button"
                  key={l.n}
                  aria-pressed={i === active}
                  onClick={() => select(i)}
                  onMouseEnter={() => setHover(i)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => select(i)}
                  className={`group relative overflow-hidden rounded-xl border bg-card/50 px-6 py-6 text-left transition-colors duration-300 ${
                    on ? "border-primary/70" : "border-border hover:border-primary/60"
                  }`}
                  style={{
                    opacity: e,
                    clipPath: `inset(0 ${(1 - e) * 100}% 0 0)`,
                    transform: `translateX(${(1 - e) * 60}px)`,
                  }}
                >
                  <div className="flex items-start gap-5">
                    <span className="mt-1 font-mono text-sm font-semibold text-primary">
                      0{l.n}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold">{l.title}</h3>
                      <p className="mt-1.5 text-sm text-muted-foreground">{l.text}</p>
                    </div>
                  </div>
                  <div
                    className={`pointer-events-none absolute inset-y-0 left-0 w-[2px] origin-top bg-primary transition-transform duration-500 ${
                      on ? "scale-y-100" : "scale-y-0"
                    }`}
                  />
                </button>
              );
            })}

            <p
              className="mt-6 text-[10px] font-semibold uppercase tracking-[0.35em] text-primary"
              style={{ opacity: seg(0.44, 0.16) }}
            >
              Branches into specialized intelligence layers
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {branches.map((b, i) => {
                const e = seg(0.48 + i * 0.06, 0.2);
                return (
                  <article
                    key={b.title}
                    onMouseEnter={() => setBranchHover(i)}
                    onMouseLeave={() => setBranchHover(null)}
                    className="rounded-xl border border-border bg-card/40 px-5 py-5 transition-colors duration-300 hover:border-primary/60"
                    style={{
                      opacity: e,
                      transform: `translateY(${(1 - e) * 70}px) scale(${0.96 + e * 0.04})`,
                    }}
                  >
                    <h4 className="text-sm font-semibold">{b.title}</h4>
                    <p className="mt-1.5 text-xs text-muted-foreground">{b.text}</p>
                  </article>
                );
              })}
            </div>

            <div style={{ opacity: seg(0.6, 0.18) }}>
              <button
                type="button"
                onClick={() => select((active + 1) % layers.length)}
                className="mt-2 inline-block rounded-md border border-primary px-6 py-3 text-sm font-medium text-primary transition-colors duration-300 hover:bg-primary hover:text-primary-foreground"
              >
                Explore the stack
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
