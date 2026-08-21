/**
 * Shared guard for pointer-driven depth effects: only on fine-pointer devices
 * (mouse / trackpad) and never when the visitor prefers reduced motion.
 * Safe to call on the server (returns false there).
 */
export function motionFxEnabled(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
}

export function reducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
