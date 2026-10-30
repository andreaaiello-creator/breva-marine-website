import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useI18n, LOCALES, type DictKey } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export const NAV: { to: string; key: DictKey }[] = [
  { to: "/fleet", key: "nav.fleet" },
  { to: "/about", key: "nav.about" },
  { to: "/case-studies", key: "nav.cases" },
  { to: "/journal", key: "nav.journal" },
  { to: "/experience", key: "nav.experience" },
  { to: "/professional", key: "nav.professional" },
  { to: "/dealers", key: "nav.dealers" },
];

export function Wordmark() {
  // Text-mark placeholder: replace with official BREVA logo file once supplied.
  return <span className="font-display text-xl font-extrabold tracking-[0.32em]">BREVA<span className="ml-2 align-middle text-[0.55rem] font-medium tracking-[0.3em] text-titanium">MARINE</span></span>;
}

export function Header() {
  const { t, locale, setLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on(); window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k);
  }, [open]);

  return (
    <header className={cn("surface-dark fixed inset-x-0 top-0 z-40 transition-all duration-500", scrolled || open ? "!bg-abyss/90 border-b border-border backdrop-blur-md" : "!bg-transparent")}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:bg-ivory focus:p-2 focus:text-abyss">Skip to content</a>
      <div className="container-breva flex h-18 items-center justify-between gap-6 py-5">
        <Link to="/" aria-label="BREVA Marine home" onClick={() => setOpen(false)}><Wordmark /></Link>
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-5 xl:gap-7">
            {NAV.map((n) => (
              <li key={n.to}><Link to={n.to as never} className="t-eyebrow whitespace-nowrap text-titanium transition-colors hover:text-ivory" activeProps={{ className: "!text-ivory" }}>{t(n.key)}</Link></li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          <div role="group" aria-label="Language" className="t-eyebrow flex gap-1">
            {LOCALES.map((l) => (
              <button key={l} onClick={() => setLocale(l)} aria-pressed={locale === l} className={cn("px-1.5 py-1 transition-colors", locale === l ? "text-ivory" : "text-titanium/60 hover:text-ivory")}>{l.toUpperCase()}</button>
            ))}
          </div>
          <Link to="/contact" className="t-eyebrow hidden border border-border px-4 py-2.5 transition-colors hover:bg-ivory hover:text-abyss md:inline-block">{t("nav.contact")}</Link>
          <button className="lg:hidden" aria-expanded={open} aria-controls="mobile-menu" aria-label={t("common.menu")} onClick={() => setOpen((o) => !o)}>
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="container-breva h-[calc(100dvh-72px)] overflow-y-auto pb-10 lg:hidden">
          <ul className="flex flex-col">
            {[...NAV, { to: "/contact", key: "nav.contact" as DictKey }, { to: "/dealer-portal", key: "nav.portal" as DictKey }].map((n, i) => (
              <li key={n.to} className="border-b border-border">
                <Link to={n.to as never} onClick={() => setOpen(false)} className="t-h2 flex items-baseline gap-4 py-5">
                  <span className="t-spec text-titanium">0{i + 1}</span>{t(n.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}