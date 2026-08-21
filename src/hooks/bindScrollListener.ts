/**
 * Subscribe to scroll-driven updates and re-sync after hard refresh / scroll restoration.
 * Browsers restore scrollY after the first paint without firing "scroll", which leaves
 * scroll-linked opacity stuck at 0 until the user moves the page.
 */
export function bindScrollListener(callback: () => void): () => void {
  let raf = 0;

  const run = () => {
    if (raf) return;
    raf = requestAnimationFrame(() => {
      raf = 0;
      callback();
    });
  };

  window.addEventListener("scroll", run, { passive: true });
  window.addEventListener("resize", run);
  window.addEventListener("pageshow", run);
  window.addEventListener("load", run);

  run();
  requestAnimationFrame(() => requestAnimationFrame(run));
  const timeout = window.setTimeout(run, 150);

  return () => {
    window.removeEventListener("scroll", run);
    window.removeEventListener("resize", run);
    window.removeEventListener("pageshow", run);
    window.removeEventListener("load", run);
    window.clearTimeout(timeout);
    if (raf) cancelAnimationFrame(raf);
  };
}
