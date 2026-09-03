import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { useSectionProgress, easeSeg } from "@/hooks/useSectionProgress";
import logo from "@/assets/zeta-logo.png";

// Mirrors the top navigation order.
const quickLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Products", href: "#products" },
  { label: "Blogs & Events", href: "#insights" },
  { label: "Careers", href: "#contact" },
];

export function SiteFooter() {
  const [ref, p] = useSectionProgress<HTMLElement>();
  const seg = (s: number, l?: number) => easeSeg(p, s, l);

  return (
    <footer
      ref={ref}
      className="relative z-10 overflow-hidden border-t border-border bg-card/40 px-6 pb-10 pt-20"
    >
      {/* parallax dotted sphere */}
      <div
        className="pointer-events-none absolute -bottom-40 right-[-6rem] h-[520px] w-[520px] rounded-full opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle, color-mix(in oklab, var(--muted-foreground) 30%, transparent) 1.5px, transparent 1.6px)",
          backgroundSize: "16px 16px",
          maskImage: "radial-gradient(circle at 50% 50%, black 55%, transparent 72%)",
          transform: `translate3d(${p * -90 + 45}px, ${p * -80 + 40}px, 0) rotate(${p * 25}deg)`,
        }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -left-32 top-0 h-[420px] w-[520px] rounded-full blur-[150px]"
        style={{
          background: "var(--gradient-accent)",
          opacity: 0.1,
          transform: `translate3d(${p * 120}px, ${p * -60}px, 0)`,
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {[0, 1, 2, 3].map((col) => {
            // Single shared reveal so every column lands at full opacity together.
            const e = seg(0.1, 0.24);
            const style = {
              opacity: e,
              transform: `translate3d(0, ${(1 - e) * 50}px, 0)`,
            };

            if (col === 0)
              return (
                <div key={col} style={style}>
                  <a href="#top" className="inline-flex items-center gap-3" aria-label="Zeta home">
                    <img
                      src={logo}
                      alt="Zeta Technologies logo"
                      className="h-11 w-11 object-contain"
                    />
                    <span className="text-lg font-semibold tracking-[0.3em]">ZETA</span>
                  </a>
                  <p className="mt-5 text-sm font-medium text-muted-foreground">
                    Technologies (Pvt.) Ltd.
                  </p>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
                    Architecting next-generation digital infrastructure. We design, deploy and
                    manage enterprise-grade networking and IT communication frameworks that empower
                    global connectivity.
                  </p>
                </div>
              );

            if (col === 1)
              return (
                <div key={col} style={style}>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.2em]">Quick Links</h3>
                  <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
                    {quickLinks.map((l) => (
                      <li key={l.label}>
                        <a
                          href={l.href}
                          className="transition-colors duration-300 hover:text-primary"
                        >
                          {l.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );

            if (col === 2)
              return (
                <div key={col} style={style}>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.2em]">Get In Touch</h3>
                  <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
                    <li className="flex gap-3">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span className="leading-relaxed">
                        Plot No. 291, Street No. 12
                        <br />
                        Sector I-10/3, Islamabad - Pakistan
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <Phone className="h-4 w-4 shrink-0 text-primary" />
                      <a
                        href="tel:+923138180038"
                        className="transition-colors duration-300 hover:text-primary"
                      >
                        +92 313-8180038
                      </a>
                    </li>
                    <li className="flex gap-3">
                      <Mail className="h-4 w-4 shrink-0 text-primary" />
                      <a
                        href="mailto:info@zetatech.com.pk"
                        className="transition-colors duration-300 hover:text-primary"
                      >
                        info@zetatech.com.pk
                      </a>
                    </li>
                  </ul>
                </div>
              );

            return (
              <div key={col} style={style}>
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em]">Follow Us</h3>
                <div className="mt-5 flex gap-3">
                  {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                    <a
                      key={i}
                      href="#top"
                      aria-label="Social profile"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors duration-300 hover:border-primary hover:text-primary"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  ))}
                </div>
                <form className="mt-7 flex items-center gap-2" onSubmit={(e) => e.preventDefault()}>
                  <input
                    type="email"
                    required
                    placeholder="Enter Email"
                    aria-label="Email address"
                    className="w-full rounded-full border border-border bg-background/60 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
                  />
                  <button
                    type="submit"
                    className="shrink-0 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity duration-300 hover:opacity-90"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            );
          })}
        </div>

        <div
          className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground"
          style={{ opacity: seg(0.45, 0.2) }}
        >
          <p>© 2026 Copyright Zeta Technologies. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#top" className="hover:text-primary">
              Privacy Policy
            </a>
            <a href="#top" className="hover:text-primary">
              Terms of Service
            </a>
            <a href="#top" className="hover:text-primary">
              SLA Agreement
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
