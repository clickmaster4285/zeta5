import { useEffect, useRef, type ReactNode } from "react";
import { motionFxEnabled } from "@/hooks/useMotionFx";

/**
 * Buttons that lean toward the cursor. Wrap any single child; the pull is
 * a few pixels and snaps back on leave. Inert on touch and reduced-motion.
 */
export function Magnetic({
  children,
  strength = 10,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !motionFxEnabled()) return;
    let raf = 0;
    let x = 0;
    let y = 0;
    const paint = () => {
      raf = 0;
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x = ((e.clientX - r.left) / r.width - 0.5) * 2 * strength;
      y = ((e.clientY - r.top) / r.height - 0.5) * 2 * strength;
      el.style.transitionDuration = "120ms";
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const onLeave = () => {
      x = y = 0;
      el.style.transitionDuration = "500ms";
      if (!raf) raf = requestAnimationFrame(paint);
    };
    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [strength]);

  return (
    <span
      ref={ref}
      className={className}
      style={{
        display: "inline-block",
        transition: "transform 500ms cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: "transform",
      }}
    >
      {children}
    </span>
  );
}
