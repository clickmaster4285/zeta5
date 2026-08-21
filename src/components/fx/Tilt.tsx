import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { clamp, motionFxEnabled } from "@/hooks/useMotionFx";

type Props = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  /** Max rotation per axis in degrees. */
  max?: number;
  /** Max pointer-follow translation in px. */
  shift?: number;
  /** Scale while hovered. */
  scale?: number;
  /** Cursor-following highlight + border glow (see .fx-spot in styles.css). */
  spotlight?: boolean;
  /** Soft specular sheen for photographic media. */
  glare?: boolean;
  /** Track the pointer over this element or over its parent (e.g. a whole card). */
  listen?: "self" | "parent";
  id?: string;
};

/**
 * Pointer-driven 3D tilt card. Everything is written to CSS custom properties
 * on the element (no React re-renders); the transform itself lives in CSS
 * (.fx-tilt), so the same element can also carry Tailwind classes.
 *
 * Children may use .depth-1 / .depth-2 / .depth-3 to float above the card
 * surface — the root keeps transform-style: preserve-3d, so avoid
 * overflow-hidden on it (overflow flattens 3D).
 */
export function Tilt({
  children,
  as: Tag = "div",
  className,
  style,
  max = 6,
  shift = 0,
  scale = 1,
  spotlight = false,
  glare = false,
  listen = "self",
  id,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !motionFxEnabled()) return;
    const target = listen === "parent" ? (el.parentElement ?? el) : el;
    let raf = 0;
    let nx = 0;
    let ny = 0;
    let on = false;

    const paint = () => {
      raf = 0;
      const s = el.style;
      s.setProperty("--rx", `${(-ny * 2 * max).toFixed(2)}deg`);
      s.setProperty("--ry", `${(nx * 2 * max).toFixed(2)}deg`);
      s.setProperty("--dx", `${(nx * 2 * shift).toFixed(1)}px`);
      s.setProperty("--dy", `${(ny * 2 * shift).toFixed(1)}px`);
      s.setProperty("--mx", `${(50 + nx * 100).toFixed(1)}%`);
      s.setProperty("--my", `${(50 + ny * 100).toFixed(1)}%`);
      s.setProperty("--s", on ? String(scale) : "1");
      s.setProperty("--spot", on ? "1" : "0");
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      nx = clamp((e.clientX - r.left) / r.width - 0.5, -0.5, 0.5);
      ny = clamp((e.clientY - r.top) / r.height - 0.5, -0.5, 0.5);
      on = true;
      el.style.setProperty("--tilt-dur", "160ms");
      schedule();
    };
    const onLeave = () => {
      nx = ny = 0;
      on = false;
      el.style.setProperty("--tilt-dur", "700ms");
      schedule();
    };
    target.addEventListener("pointermove", onMove, { passive: true });
    target.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      target.removeEventListener("pointermove", onMove);
      target.removeEventListener("pointerleave", onLeave);
    };
  }, [max, shift, scale, listen]);

  return (
    <Tag
      ref={ref}
      id={id}
      className={cn("fx-tilt", spotlight && "fx-spot", className)}
      style={style}
    >
      {children}
      {glare && <span className="fx-glare" aria-hidden="true" />}
    </Tag>
  );
}
