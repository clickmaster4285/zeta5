/**
 * A receding 3D floor grid. `progress` (0-1, section scroll progress) slides
 * the grid toward the viewer so the floor appears to travel as you scroll.
 * Pure CSS transform — no per-frame JS beyond the progress the section
 * already computes.
 */
export function PerspectiveGrid({
  progress,
  className = "",
  opacity = 0.55,
  horizon = "38%",
}: {
  progress: number;
  className?: string;
  opacity?: number;
  horizon?: string;
}) {
  return (
    <div
      className={`pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden ${className}`}
      style={{ top: horizon, perspective: "900px", perspectiveOrigin: "50% 0%", opacity }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-x-[-60%] bottom-[-20%] top-0"
        style={{
          transformOrigin: "50% 0%",
          transform: "rotateX(62deg)",
          backgroundImage:
            "linear-gradient(color-mix(in oklab, var(--primary) 38%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in oklab, var(--primary) 30%, transparent) 1px, transparent 1px)",
          backgroundSize: "96px 96px",
          backgroundPosition: `0 ${progress * 384}px`,
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 22%, black 78%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 0%, color-mix(in oklab, var(--primary) 18%, transparent), transparent 70%)",
        }}
      />
    </div>
  );
}
