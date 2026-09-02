import { useEffect, useRef, useState } from "react";
import { bindScrollListener } from "@/hooks/bindScrollListener";
import { reducedMotion } from "@/hooks/useMotionFx";
import { ArrowRight } from "lucide-react";
import { NetworkCanvas } from "@/components/fx/NetworkCanvas";
import { Magnetic } from "@/components/fx/Magnetic";
import { motionFxEnabled } from "@/hooks/useMotionFx";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (reducedMotion()) return;

    const onScroll = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      setOffset(Math.min((y / vh) * 55, 55));
    };

    return bindScrollListener(onScroll);
  }, []);

  /* Pointer parallax: the copy drifts a few px toward the pointer while the
     network behind it drifts the other way — two planes at different depths. */
  useEffect(() => {
    const host = ref.current;
    const copy = copyRef.current;
    if (!host || !copy || !motionFxEnabled()) return;
    let raf = 0;
    let tx = 0,
      ty = 0,
      x = 0,
      y = 0;
    const loop = () => {
      x += (tx - x) * 0.08;
      y += (ty - y) * 0.08;
      copy.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`;
      if (Math.abs(tx - x) > 0.05 || Math.abs(ty - y) > 0.05) raf = requestAnimationFrame(loop);
      else raf = 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };
    const onMove = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 18;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 12;
      kick();
    };
    const onLeave = () => {
      tx = ty = 0;
      kick();
    };
    host.addEventListener("pointermove", onMove, { passive: true });
    host.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section
      id="top"
      ref={ref}
      className="sticky top-0 z-0 h-screen min-h-[640px] w-full overflow-hidden"
      style={{ transform: `translateY(-${offset}%)` }}
    >
      <div className="absolute inset-0 bg-[#05080d]" aria-hidden="true" />
      <div className="absolute inset-0 opacity-35" aria-hidden="true">
        <NetworkCanvas className="absolute inset-0" drift={8} scrollGain={0.55} density={7800} />
      </div>
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="stat-grid absolute left-0 top-[28%] h-px w-full opacity-35"
          style={{
            backgroundImage:
              "linear-gradient(90deg, transparent, rgba(237,5,38,0.48), transparent 42%)",
            backgroundSize: "60px 1px",
          }}
        />
        <div
          className="stat-sweep absolute left-[6%] top-[58%] h-px w-[34%] opacity-45"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(237,5,38,0.82), rgba(255,255,255,0.3), transparent)",
          }}
        />
        <div
          className="stat-sweep absolute right-[10%] top-[18%] h-px w-[24%] opacity-30"
          style={{
            animationDelay: "1.7s",
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), rgba(237,5,38,0.72), transparent)",
          }}
        />
        <div className="stat-drift absolute left-[15%] top-[17%] text-[10px] font-semibold uppercase tracking-[0.28em] text-white/14">
          99.9 uptime
        </div>
        <div
          className="stat-drift absolute right-[17%] top-[67%] text-[10px] font-semibold uppercase tracking-[0.28em] text-white/12"
          style={{ animationDelay: "-5s" }}
        >
          fiber route 150+
        </div>
        <div
          className="stat-drift absolute left-[47%] top-[77%] text-[9px] font-semibold uppercase tracking-[0.24em] text-red-500/22"
          style={{ animationDelay: "-9s" }}
        >
          global nodes
        </div>
        <span className="absolute left-[22%] top-[66%] h-1.5 w-1.5 rounded-full bg-[#ed0526]/55">
          <span className="stat-pulse absolute inset-0 rounded-full bg-[#ed0526]/45" />
        </span>
        <span className="absolute right-[23%] top-[31%] h-1.5 w-1.5 rounded-full bg-white/35">
          <span
            className="stat-pulse absolute inset-0 rounded-full bg-white/25"
            style={{ animationDelay: "1.4s" }}
          />
        </span>
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 18% 42%, rgba(8,12,18,0.08), transparent 26%), linear-gradient(90deg, rgba(5,8,13,0.08) 0%, rgba(5,8,13,0.34) 54%, rgba(5,8,13,0.78) 100%), linear-gradient(180deg, rgba(5,8,13,0) 0%, rgba(5,8,13,0.18) 58%, rgba(5,8,13,0.82) 100%)",
        }}
      />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 md:flex-row md:items-center">
        <div
          ref={copyRef}
          className="w-full md:w-[60%] md:-translate-x-[3%]"
          style={{ willChange: "transform" }}
        >
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.45em] text-primary">
            Telecommunication Infrastructure
          </p>
          <h1 className="max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight text-foreground md:text-7xl">
            Connecting networks,
            <br /> <span className="text-gradient">powering</span>{" "}
            <span className="text-foreground">nations.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
            Fiber, wireless and cloud-scale connectivity engineered for carriers, enterprises and
            the cities of tomorrow.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Magnetic strength={10}>
              <a
                href="#services"
                className="inline-flex h-12 items-center gap-2 bg-primary px-7 text-sm font-semibold tracking-wide text-primary-foreground shadow-[var(--shadow-elevated)] transition-colors hover:bg-primary/90"
              >
                Explore services
                <ArrowRight className="h-4 w-4" />
              </a>
            </Magnetic>
            <Magnetic strength={8}>
              <a
                href="#contact"
                className="inline-flex h-12 items-center gap-2 border border-foreground/25 bg-background/20 px-7 text-sm font-semibold tracking-wide text-foreground backdrop-blur-sm transition-colors hover:border-primary hover:text-primary"
              >
                Talk to Zeta
              </a>
            </Magnetic>
          </div>
        </div>
        <div className="relative hidden w-full translate-x-8 md:block md:w-[40%] md:translate-x-[9%] lg:translate-x-[15%]">
          <div className="relative flex h-full items-center justify-center">
            <img
              src="/globe.png"
              className="pointer-events-none h-[40vh] w-auto select-none object-contain opacity-100 mix-blend-screen drop-shadow-[0_0_72px_rgba(248,75,88,0.48)] sm:h-[49vh] md:h-[57vh] lg:h-[68vh]"
              alt=""
              aria-hidden="true"
            />

            <div className="absolute left-[-12%] top-[25%] lg:left-[-20%]">
              <div className="flex min-w-[196px] items-center justify-between gap-3 rounded-[18px] border border-white/35 bg-white/10 px-4.5 py-2.5 shadow-[0_20px_70px_rgba(248,75,88,0.22),inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-2xl">
                <div>
                  <p className="text-[9px] font-medium text-white/90">Connected Globally</p>
                  <p className="mt-0.5 text-[16px] font-semibold leading-none tracking-normal text-white">
                    150+ Markets
                  </p>
                </div>
                <div className="rounded-full bg-[#ff5f70] px-3 py-1 text-[9px] font-semibold text-white shadow-[0_0_26px_rgba(255,95,112,0.7)]">
                  +99.9% Reliability
                </div>
              </div>
            </div>

            <div className="absolute bottom-[21%] right-[2%] lg:bottom-[19%] lg:right-[-4%]">
              <div
                className="min-w-[145px] rounded-[18px] border border-white/35 bg-white/10 px-4.5 py-4 shadow-[0_24px_80px_rgba(248,75,88,0.26),inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-2xl"
                style={{ animationDelay: "0.6s" }}
              >
                <p className="text-[9px] font-medium text-white/90">Established 2009</p>
                <p className="mt-2 text-[45px] font-light leading-[0.9] tracking-normal text-white">
                  15+
                </p>
                <div className="mt-2.5 inline-flex rounded-full bg-[#ff5f70] px-3 py-1 text-[10px] font-semibold text-white shadow-[0_0_26px_rgba(255,95,112,0.65)]">
                  Years of Experience
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="scroll-cue absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center text-[11px] uppercase tracking-[0.4em] text-muted-foreground transition-colors hover:text-foreground"
        aria-label="Scroll to About"
      >
        Scroll
      </a>
    </section>
  );
}
