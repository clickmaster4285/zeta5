import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronDown,
  ArrowUpRight,
  ArrowRight,
  Network,
  PhoneCall,
  Cloud,
  MessagesSquare,
  MessageCircle,
  PlugZap,
  Server,
  LineChart,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/fx/Magnetic";
import { Tilt } from "@/components/fx/Tilt";
import logo from "@/assets/zeta-logo.png";
import menuServices from "@/assets/menu-services.jpg";
import menuProducts from "@/assets/menu-products.jpg";

import type { LucideIcon } from "lucide-react";

type Item = { label: string; href: string; icon: LucideIcon };
type Group = { title: string; href: string; icon: LucideIcon; items: Item[] };
type Mega = {
  feature: { image: string; eyebrow: string; title: string; href: string };
  groups: Group[];
};

const servicesMega: Mega = {
  feature: {
    image: menuServices,
    eyebrow: "Services",
    title: "Why carrier-grade infrastructure decides your network's future",
    href: "#services",
  },
  groups: [
    {
      title: "Connectivity",
      href: "#services",
      icon: Network,
      items: [{ label: "Connectivity Infrastructure", href: "#services", icon: Network }],
    },
    {
      title: "Wholesale Voice",
      href: "#services",
      icon: PhoneCall,
      items: [{ label: "Voice Services", href: "#services", icon: PhoneCall }],
    },
    {
      title: "Cloud Computing",
      href: "#stack",
      icon: Cloud,
      items: [
        { label: "Sovereign Intelligence Stack", href: "#stack", icon: Cloud },
        { label: "Core Cloud", href: "#stack", icon: Cloud },
        { label: "Data Center", href: "#stack", icon: Server },
        { label: "Intelligent Automation", href: "#services", icon: LineChart },
        { label: "Network Intelligence", href: "#services", icon: Network },
      ],
    },
    {
      title: "CPaaS",
      href: "#services",
      icon: MessagesSquare,
      items: [{ label: "Communications Platform", href: "#services", icon: MessagesSquare }],
    },
    {
      title: "A2P Messaging",
      href: "#services",
      icon: MessageCircle,
      items: [{ label: "Business Messaging", href: "#services", icon: MessageCircle }],
    },
  ],
};

const productsMega: Mega = {
  feature: {
    image: menuProducts,
    eyebrow: "Products",
    title: "Platforms built on top of Zeta's own backbone",
    href: "#products",
  },
  groups: [
    {
      title: "ConnectHub",
      href: "#products",
      icon: PlugZap,
      items: [
        { label: "Programmatic Connectivity", href: "#products", icon: Network },
        { label: "SD-WAN Control", href: "#products", icon: Network },
      ],
    },
    {
      title: "CloudHub",
      href: "#products",
      icon: Cloud,
      items: [
        { label: "Cluster Orchestration", href: "#products", icon: Server },
        { label: "Automated Deployment", href: "#products", icon: Cloud },
      ],
    },
    {
      title: "Zekli",
      href: "#products",
      icon: LineChart,
      items: [
        { label: "Network Intelligence", href: "#products", icon: Network },
        { label: "Traffic Diagnostics", href: "#products", icon: LineChart },
        { label: "Telemetry Pipelines", href: "#products", icon: Server },
      ],
    },
  ],
};

/* Every link resolves to a real section on the page (#blogs / #careers had no target). */
const links: { label: string; href: string; section: string; mega?: Mega }[] = [
  { label: "About", href: "#about", section: "about" },
  { label: "Services", href: "#services", section: "services", mega: servicesMega },
  { label: "Products", href: "#products", section: "products", mega: productsMega },
  { label: "Blogs & Events", href: "#insights", section: "insights" },
  { label: "Careers", href: "#contact", section: "contact" },
];

function MegaPanel({ data, open, id }: { data: Mega; open: boolean; id: string }) {
  return (
    <div
      id={id}
      className={`absolute left-1/2 top-full z-50 w-[min(1120px,calc(100vw-3rem))] -translate-x-1/2 pt-5 transition-all duration-200 xl:w-[min(1280px,calc(100vw-5rem))] 2xl:w-[min(1440px,calc(100vw-7rem))] ${
        open ? "visible translate-y-0 opacity-100" : "invisible translate-y-2 opacity-0"
      }`}
      style={{ perspective: "1400px" }}
    >
      <div
        className={`overflow-hidden rounded-2xl border border-border bg-background/95 backdrop-blur-xl transition-transform duration-300 ${
          open ? "[transform:rotateX(0deg)]" : "[transform:rotateX(-6deg)]"
        }`}
        style={{ boxShadow: "var(--shadow-elevated)", transformOrigin: "50% 0%" }}
      >
        <div className="grid md:grid-cols-[340px_1fr]">
          {/* feature panel */}
          <div className="relative border-b border-border bg-card/60 p-7 md:border-b-0 md:border-r">
            <div
              className="pointer-events-none absolute inset-0 opacity-40"
              style={{ backgroundImage: "var(--grid-lines)", backgroundSize: "28px 28px" }}
              aria-hidden="true"
            />
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.45em] text-primary">
                {data.feature.eyebrow}
              </p>
              <Tilt max={5} scale={1.02} glare className="mt-5 overflow-hidden rounded-lg">
                <img
                  src={data.feature.image}
                  alt=""
                  loading="lazy"
                  width={1024}
                  height={640}
                  className="h-36 w-full object-cover"
                />
              </Tilt>
              <p className="mt-4 text-sm font-semibold leading-snug text-foreground">
                {data.feature.title}
              </p>
              <a
                href={data.feature.href}
                className="mt-4 inline-flex items-center gap-1.5 border-b border-primary pb-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-primary"
              >
                Learn More
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {/* link columns */}
          <div className="grid gap-x-10 gap-y-8 p-8 sm:grid-cols-2 lg:grid-cols-3">
            {data.groups.map((g, gi) => (
              <div
                key={g.title}
                className="transition-all duration-500"
                style={{
                  transitionDelay: open ? `${80 + gi * 40}ms` : "0ms",
                  opacity: open ? 1 : 0,
                  transform: open ? "translateY(0)" : "translateY(8px)",
                }}
              >
                <a
                  href={g.href}
                  className="inline-flex items-center gap-2 text-sm font-bold tracking-wide text-foreground transition-colors hover:text-primary"
                >
                  <g.icon className="h-4 w-4 text-primary" />
                  {g.title}
                </a>
                <ul className="mt-4 space-y-2.5">
                  {g.items.map((it) => (
                    <li key={it.label}>
                      <a
                        href={it.href}
                        className="group/link inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {it.label}
                        <ArrowRight className="h-3.5 w-3.5 -translate-x-1 text-primary opacity-0 transition-all group-hover/link:translate-x-0 group-hover/link:opacity-100" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);
  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!els.length) return;
    const visible = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const en of entries)
          visible.set(en.target.id, en.isIntersecting ? en.intersectionRatio : 0);
        let best: string | null = null;
        let bestRatio = 0;
        for (const [id, r] of visible) {
          if (r > bestRatio) {
            best = id;
            bestRatio = r;
          }
        }
        setActive(bestRatio > 0 ? best : null);
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0, 0.1, 0.25, 0.5] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

const sectionIds = links.map((l) => l.section);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [openMega, setOpenMega] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const active = useActiveSection(sectionIds);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* hover intent: a short grace period so the pointer can cross the gap to the panel */
  const cancelClose = useCallback(() => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
  }, []);
  const scheduleClose = useCallback(() => {
    cancelClose();
    closeTimer.current = window.setTimeout(() => setOpenMega(null), 160);
  }, [cancelClose]);
  const show = useCallback(
    (label: string) => {
      cancelClose();
      setOpenMega(label);
    },
    [cancelClose],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMega(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* lock page scroll while the mobile menu is open */
  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled || mobileOpen
            ? "bg-background/85 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        }`}
        onMouseLeave={scheduleClose}
      >
        <nav
          className="relative mx-auto flex h-20 max-w-7xl items-center justify-between px-6 xl:max-w-[1440px] xl:px-10 2xl:max-w-[1680px] 2xl:px-14"
          aria-label="Primary"
        >
          <a href="#top" className="group flex items-center gap-3" aria-label="Zeta home">
            <img
              src={logo}
              alt="Zeta Technologies logo"
              className="h-10 w-10 object-contain transition-transform duration-500 group-hover:[transform:rotateY(180deg)]"
            />
            <span className="text-lg font-semibold tracking-[0.3em] text-foreground">ZETA</span>
          </a>

          <ul className="hidden items-center gap-9 md:flex xl:gap-11 2xl:gap-12">
            {links.map((l) => {
              const isOpen = openMega === l.label;
              const panelId = `mega-${l.section}`;
              return (
                <li
                  key={l.label}
                  className="static"
                  onMouseEnter={() => (l.mega ? show(l.label) : setOpenMega(null))}
                  onFocus={() => (l.mega ? show(l.label) : setOpenMega(null))}
                >
                  <a
                    href={l.href}
                    data-active={active === l.section}
                    aria-haspopup={l.mega ? "true" : undefined}
                    aria-expanded={l.mega ? isOpen : undefined}
                    aria-controls={l.mega ? panelId : undefined}
                    className={`nav-link inline-flex items-center gap-1 py-2 text-sm font-medium transition-colors hover:text-primary ${
                      isOpen || active === l.section ? "text-primary" : "text-foreground/85"
                    }`}
                  >
                    {l.label}
                    {l.mega && (
                      <ChevronDown
                        className={`h-3.5 w-3.5 opacity-70 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                      />
                    )}
                  </a>
                  {l.mega && (
                    <div
                      onMouseEnter={cancelClose}
                      onBlur={(e) => !e.currentTarget.contains(e.relatedTarget) && scheduleClose()}
                    >
                      <MegaPanel data={l.mega} open={isOpen} id={panelId} />
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <Magnetic strength={8} className="hidden sm:inline-block">
              <Button asChild size="sm" className="rounded-none px-6 font-semibold tracking-wide">
                <a href="#contact">Talk To Zeta</a>
              </Button>
            </Magnetic>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground md:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* mobile menu — rendered outside the header so its backdrop-filter can't clip the fixed panel */}
      <div
        id="mobile-menu"
        className={`fixed inset-x-0 bottom-0 top-20 z-40 overflow-y-auto bg-background/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
          mobileOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"
        }`}
      >
        <div className="mx-auto flex min-h-full max-w-7xl flex-col px-6 py-8">
          <ul className="divide-y divide-border border-y border-border">
            {links.map((l, i) => (
              <li
                key={l.label}
                className="py-4 transition-all duration-500"
                style={{
                  transitionDelay: mobileOpen ? `${60 + i * 50}ms` : "0ms",
                  opacity: mobileOpen ? 1 : 0,
                  transform: mobileOpen ? "translateX(0)" : "translateX(-12px)",
                }}
              >
                <a
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-2xl font-semibold tracking-tight text-foreground"
                >
                  {l.label}
                </a>
                {l.mega && (
                  <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
                    {l.mega.groups.map((g) => (
                      <li key={g.title}>
                        <a
                          href={g.href}
                          onClick={() => setMobileOpen(false)}
                          className="inline-flex items-center gap-2 text-sm text-muted-foreground"
                        >
                          <g.icon className="h-3.5 w-3.5 text-primary" />
                          {g.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <Button
            asChild
            size="lg"
            className="mt-8 w-full rounded-none font-semibold tracking-wide"
          >
            <a href="#contact" onClick={() => setMobileOpen(false)}>
              Talk To Zeta
            </a>
          </Button>
        </div>
      </div>
    </>
  );
}
