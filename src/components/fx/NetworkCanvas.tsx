import { useEffect, useRef } from "react";
import { reducedMotion } from "@/hooks/useMotionFx";

/**
 * A network of nodes in a 3D volume projected with a pinhole camera. The
 * camera drifts forward, advances with scroll and nudges toward the pointer.
 * Nodes that pass the camera respawn at the far plane, so the flight never
 * ends. Canvas 2D only — no WebGL, no dependencies. One static frame under
 * prefers-reduced-motion; paused while hidden or scrolled out of view.
 */

type Node = { x: number; y: number; z: number; r: number; hot: boolean };

const NEAR = 90;
const FAR = 1600;
const DEPTH = FAR - NEAR;
const STEPS = 20;

const mk = (rgb: string) =>
  Array.from({ length: STEPS + 1 }, (_, i) => `rgba(${rgb},${(i / STEPS).toFixed(3)})`);
const grey = mk("170,178,192");
const red = mk("228,42,58");
const ink = mk("255,255,255");

export function NetworkCanvas({
  className,
  drift = 22,
  scrollGain = 1.1,
  density = 6500,
}: {
  className?: string;
  /** World units per second of ambient travel. */
  drift?: number;
  /** World units per scrolled pixel. */
  scrollGain?: number;
  /** Pixels of viewport per node (lower = denser). */
  density?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = reducedMotion();
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    let w = 0,
      h = 0,
      f = 0,
      cx = 0,
      cy = 0,
      link = 220;
    let nodes: Node[] = [];
    let cam = 0,
      travel = 0,
      scrollY = 0;
    let px = 0,
      py = 0,
      tx = 0,
      ty = 0;
    let raf = 0,
      running = false,
      inView = true,
      last = 0;
    let sx = new Float32Array(0),
      sy = new Float32Array(0),
      sr = new Float32Array(0),
      sa = new Float32Array(0);

    const rand = (a: number, b: number) => a + Math.random() * (b - a);
    const spawn = (n: Node, z: number) => {
      const ex = (w * 0.5 * FAR) / f;
      const ey = (h * 0.5 * FAR) / f;
      n.x = rand(-ex, ex) * 0.85;
      n.y = rand(-ey, ey) * 0.85;
      n.z = z;
      n.r = Math.random() < 0.14 ? 2.6 : 1.6;
      n.hot = Math.random() < 0.12;
    };
    const seed = () => {
      const count = Math.round(Math.min(320, Math.max(110, (w * h) / density)));
      nodes = Array.from({ length: count }, () => ({ x: 0, y: 0, z: 0, r: 1, hot: false }));
      for (const n of nodes) spawn(n, cam + rand(NEAR, FAR));
      sx = new Float32Array(count);
      sy = new Float32Array(count);
      sr = new Float32Array(count);
      sa = new Float32Array(count);
    };
    const resize = () => {
      const rect = host.getBoundingClientRect();
      w = Math.max(1, Math.round(rect.width));
      h = Math.max(1, Math.round(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      f = Math.max(h * 1.05, w * 0.6);
      cx = w / 2;
      cy = h / 2;
      link = Math.max(190, Math.min(w, h) * 0.36);
      seed();
      draw();
    };

    const project = () => {
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]!;
        let rz = n.z - cam;
        if (rz < NEAR) {
          spawn(n, n.z + DEPTH);
          rz = n.z - cam;
        } else if (rz > FAR) {
          spawn(n, n.z - DEPTH);
          rz = n.z - cam;
        }
        const t = (rz - NEAR) / DEPTH;
        const depth = Math.pow(1 - t, 1.2);
        const fade = Math.min(1, (rz - NEAR) / 160);
        sa[i] = fade * (0.22 + 0.78 * depth);
        const k = f / rz;
        sx[i] = cx + px + n.x * k;
        sy[i] = cy + py + n.y * k;
        sr[i] = Math.min(3.4, Math.max(0.6, n.r * k * 1.1));
      }
    };

    const draw = () => {
      project();
      ctx.clearRect(0, 0, w, h);
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i]!;
        const ai = sa[i]!;
        if (ai <= 0.02) continue;
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j]!;
          const dz = a.z - b.z;
          if (dz > link || dz < -link) continue;
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy + dz * dz);
          if (d > link) continue;
          const strength = (1 - d / link) * Math.min(ai, sa[j]!);
          const hot = a.hot && b.hot;
          const idx = Math.round(Math.min(1, strength * (hot ? 1 : 0.62)) * STEPS);
          if (idx === 0) continue;
          ctx.strokeStyle = hot ? red[idx]! : grey[idx]!;
          ctx.beginPath();
          ctx.moveTo(sx[i]!, sy[i]!);
          ctx.lineTo(sx[j]!, sy[j]!);
          ctx.stroke();
        }
      }
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]!;
        const idx = Math.round(Math.min(1, sa[i]! * (n.hot ? 1 : 0.9)) * STEPS);
        if (idx === 0) continue;
        ctx.fillStyle = n.hot ? red[idx]! : ink[idx]!;
        ctx.beginPath();
        ctx.arc(sx[i]!, sy[i]!, sr[i]!, 0, Math.PI * 2);
        ctx.fill();
        if (n.hot && sr[i]! > 1.6) {
          ctx.fillStyle = red[Math.max(1, Math.round(idx * 0.25))]!;
          ctx.beginPath();
          ctx.arc(sx[i]!, sy[i]!, sr[i]! * 3, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
      last = now;
      travel += drift * dt;
      const target = travel + scrollY * scrollGain;
      cam += (target - cam) * Math.min(1, dt * 6);
      px += (tx - px) * Math.min(1, dt * 5);
      py += (ty - py) * Math.min(1, dt * 5);
      draw();
      raf = requestAnimationFrame(tick);
    };
    const start = () => {
      if (running || reduce || !inView || document.hidden) return;
      running = true;
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    const onScroll = () => {
      scrollY = Math.max(0, window.scrollY);
    };
    const onPointer = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      tx = -((e.clientX - r.left) / r.width - 0.5) * 36;
      ty = -((e.clientY - r.top) / r.height - 0.5) * 24;
    };
    const onPointerLeave = () => {
      tx = ty = 0;
    };
    const onVisibility = () => (document.hidden ? stop() : start());

    const ro = new ResizeObserver(resize);
    ro.observe(host);
    const io = new IntersectionObserver(
      ([entry]) => {
        inView = !!entry?.isIntersecting;
        if (inView) start();
        else stop();
      },
      { threshold: 0 },
    );
    io.observe(host);
    resize();
    if (!reduce) {
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      document.addEventListener("visibilitychange", onVisibility);
      if (fine) {
        host.addEventListener("pointermove", onPointer, { passive: true });
        host.addEventListener("pointerleave", onPointerLeave);
      }
      start();
    }
    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      host.removeEventListener("pointermove", onPointer);
      host.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [drift, scrollGain, density]);

  return <canvas ref={ref} className={className} aria-hidden="true" />;
}
