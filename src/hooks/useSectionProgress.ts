import { useEffect, useRef, useState, type RefObject } from "react";
import { bindScrollListener } from "./bindScrollListener";
import { reducedMotion } from "./useMotionFx";

/**
 * Returns 0 -> 1 progress of a section travelling through the viewport.
 */
export function useSectionProgress<T extends HTMLElement>(): [RefObject<T | null>, number] {
  const ref = useRef<T>(null);
  const [p, setP] = useState(() => (reducedMotion() ? 1 : 0));

  useEffect(() => {
    if (reducedMotion()) {
      setP(1);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;

      // Already scrolled past — keep content visible after hard refresh.
      if (rect.bottom <= 0) {
        setP(1);
        return;
      }
      if (rect.top >= vh) {
        setP(0);
        return;
      }

      const total = rect.height + vh;
      setP(Math.min(Math.max((vh - rect.top) / total, 0), 1));
    };

    return bindScrollListener(update);
  }, []);

  return [ref, p];
}

export const easeSeg = (p: number, start: number, len = 0.22) =>
  1 - Math.pow(1 - Math.min(Math.max((p - start) / len, 0), 1), 3);
