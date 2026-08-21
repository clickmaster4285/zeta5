import { useEffect, useRef, useState, type RefObject } from "react";

/**
 * Returns 0 -> 1 progress of a section travelling through the viewport.
 */
export function useSectionProgress<T extends HTMLElement>(): [RefObject<T | null>, number] {
  const ref = useRef<T>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height + vh;
      setP(Math.min(Math.max((vh - rect.top) / total, 0), 1));
      raf = 0;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return [ref, p];
}

export const easeSeg = (p: number, start: number, len = 0.22) =>
  1 - Math.pow(1 - Math.min(Math.max((p - start) / len, 0), 1), 3);
