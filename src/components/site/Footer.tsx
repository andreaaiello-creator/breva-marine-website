import { Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { boats } from "@/content/boats";
import { NAV, Wordmark } from "./Header";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="surface-dark border-t border-border">
      <div className="container-breva grid gap-12 py-20 md:grid-cols-12">
        <div className="md:col-span-5">
          <Wordmark />
          <p className="t-lead mt-8 max-w-sm text-muted-foreground">{t("home.lead")}</p>
          <p className="t-spec mt-8 text-sample">{t("footer.note")}</p>
        </div>
        <div className="md:col-span-2">
          <p className="t-eyebrow mb-5 text-titanium">{t("nav.fleet")}</p>
          <ul className="space-y-3">{boats.map((b) => <li key={b.id}><Link to="/fleet/$model" params={{ model: b.id }} className="hover:text-cobalt-soft">{b.name}</Link></li>)}</ul>
        </div>
        <div className="md:col-span-3">
          <p className="t-eyebrow mb-5 text-titanium">BREVA</p>
          <ul className="space-y-3">{NAV.slice(1).map((n) => <li key={n.to}><Link to={n.to as never} className="hover:text-cobalt-soft">{t(n.key)}</Link></li>)}</ul>
        </div>
        <div className="md:col-span-2">
          <p className="t-eyebrow mb-5 text-titanium">Prototype</p>
          <ul className="space-y-3">
            <li><Link to="/dealer-portal" className="hover:text-cobalt-soft">{t("nav.portal")}</Link></li>
            <li><Link to="/design-system" className="hover:text-cobalt-soft">Design System</Link></li>
            <li><Link to="/admin" className="hover:text-cobalt-soft">CMS concept</Link></li>
            <li><Link to="/project-roadmap" className="hover:text-cobalt-soft">Roadmap</Link></li>
            <li><Link to="/contact" className="hover:text-cobalt-soft">{t("nav.contact")}</Link></li>
          </ul>
        </div>
      </div>
      <div className="container-breva t-spec flex flex-wrap justify-between gap-4 border-t border-border py-6 text-titanium">
        <span>© BREVA Marine — Website 2.0 prototype</span>
        <span>Official site: brevamarine.com (unchanged)</span>
      </div>
    </footer>
  );
}