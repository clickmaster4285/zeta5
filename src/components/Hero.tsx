import { useEffect, useRef, useState } from "react";
import { bindScrollListener } from "@/hooks/bindScrollListener";
import { reducedMotion } from "@/hooks/useMotionFx";
import { ArrowRight } from "lucide-react";
import { Magnetic } from "@/components/fx/Magnetic";
import { motionFxEnabled } from "@/hooks/useMotionFx";
import heroRightImage from "@/assets/herorightimage.png";

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
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_78%_42%,rgba(215,38,24,0.36),transparent_33%),linear-gradient(115deg,#05080d_0%,#120608_45%,#4f0b08_100%)]"
        aria-hidden="true"
      />
      <div className="hero-ambient absolute inset-0" aria-hidden="true" />
      <div className="hero-energy-lines absolute inset-0" aria-hidden="true" />
      <div className="hero-sparks absolute inset-0" aria-hidden="true">
        {Array.from({ length: 14 }).map((_, index) => (
          <span key={index} />
        ))}
      </div>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(5,8,13,0.5) 0%, rgba(5,8,13,0.22) 48%, rgba(5,8,13,0.04) 100%), linear-gradient(180deg, rgba(5,8,13,0.08) 0%, rgba(5,8,13,0.12) 52%, rgba(5,8,13,0.68) 100%)",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 mx-auto grid h-full max-w-7xl grid-cols-1 items-center gap-10 px-6 pt-20 md:grid-cols-[0.95fr_1.05fr] md:gap-12 md:pt-0 xl:max-w-[1440px] xl:grid-cols-[0.9fr_1.1fr] xl:px-10 2xl:max-w-[1680px] 2xl:grid-cols-[0.82fr_1.18fr] 2xl:px-14">
        <div
          ref={copyRef}
          className="w-full md:-translate-x-[9%] xl:translate-x-0"
          style={{ willChange: "transform" }}
        >
          <h1 className="max-w-3xl text-5xl font-bold leading-[1.05] tracking-tight text-foreground md:text-7xl xl:text-7xl 2xl:text-8xl">
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
        <div className="relative flex min-h-[380px] w-full items-center justify-center md:min-h-[560px] md:justify-end xl:min-h-[620px] 2xl:min-h-[720px]">
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[radial-gradient(ellipse_at_center,rgba(215,38,24,0.24),transparent_68%)] blur-2xl" />
          <img
            className="relative z-10 max-h-[58vh] w-[118%] max-w-none object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.45)] md:max-h-[88vh] md:w-[124%] md:translate-x-[5%] xl:max-h-[90vh] xl:w-[112%] xl:translate-x-[2%] 2xl:max-h-[86vh] 2xl:w-[104%] 2xl:translate-x-0"
            src={heroRightImage}
            alt=""
            aria-hidden="true"
          />
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
