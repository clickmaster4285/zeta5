import { useEffect, useRef, useState } from "react";
import { bindScrollListener } from "@/hooks/bindScrollListener";
import { reducedMotion } from "@/hooks/useMotionFx";
import { ArrowRight } from "lucide-react";
import { Magnetic } from "@/components/fx/Magnetic";
import { motionFxEnabled } from "@/hooks/useMotionFx";
import heroVideo from "@/assets/herovideo.mp4";

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
      <video
        className="absolute inset-0 h-full w-full object-cover object-center opacity-100"
        src={heroVideo}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(5,8,13,0.72) 0%, rgba(5,8,13,0.38) 48%, rgba(5,8,13,0.12) 100%), linear-gradient(180deg, rgba(5,8,13,0.12) 0%, rgba(5,8,13,0.08) 48%, rgba(5,8,13,0.58) 100%)",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 md:flex-row md:items-center md:justify-start">
        <div
          ref={copyRef}
          className="w-full md:w-[60%] md:-translate-x-[9%]"
          style={{ willChange: "transform" }}
        >
          <h1 className="max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight text-foreground md:text-7xl">
            Stronger networks,
            <br /> <span className="text-gradient">bolder</span>{" "}
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
