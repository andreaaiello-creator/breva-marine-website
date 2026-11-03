import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BookOpen, Boxes, FileText, Headphones, Lock, ShoppingCart, Users } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { Eyebrow, SampleBadge, Section, SoonButton } from "@/components/site/primitives";

export const Route = createFileRoute("/dealer-portal")({
  head: () => seo("Dealer Portal (design concept)", "Design concept for the future BREVA dealer area.", "/dealer-portal", { noindex: true }),
  component: Portal,
});

const modules = [
  { id: "brochures", icon: BookOpen, it: "Brochure", en: "Brochures" },
  { id: "leads", icon: Users, it: "Lead", en: "Leads" },
  { id: "orders", icon: ShoppingCart, it: "Ordini", en: "Orders" },
  { id: "stock", icon: Boxes, it: "Stock", en: "Stock" },
  { id: "support", icon: Headphones, it: "Assistenza", en: "Support" },
  { id: "assets", icon: FileText, it: "Asset", en: "Assets" },
];

function Portal() {
  const { locale } = useI18n();
  const it = locale === "it";
  const [active, setActive] = useState("brochures");
  const mod = modules.find((m) => m.id === active)!;
  return (
    <>
      <section className="surface-dark bg-sea pt-36 pb-20">
        <div className="container-breva grid gap-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Eyebrow>{it ? "Area Dealer · concept di design" : "Dealer Portal · design concept"}</Eyebrow>
            <h1 className="t-display mt-6">{it ? "Accesso dealer, in arrivo." : "Dealer access, coming."}</h1>
            <p className="t-lead mt-6 text-muted-foreground">{it ? "L'accesso avverrà tramite il sistema ERP/CRM BREVA esistente (Dealer View) con Single Sign-On, da integrare in una fase successiva. Questa pagina non autentica nessuno." : "Access will run through BREVA's existing ERP/CRM (Dealer View) with Single Sign-On, integrated in a later phase. This page authenticates no one."}</p>
          </div>
          <div className="border border-border p-8 md:col-span-4 md:col-start-9">
            <Lock className="size-6 text-cobalt-soft" aria-hidden />
            <p className="t-h3 mt-4">{it ? "Accedi con BREVA Dealer View" : "Sign in with BREVA Dealer View"}</p>
            <p className="mt-2 text-sm text-muted-foreground">{it ? "SSO non ancora collegato. Nessuna credenziale è richiesta o accettata." : "SSO not yet connected. No credentials are requested or accepted."}</p>
            <div className="mt-6"><SoonButton variant="accent">SSO</SoonButton></div>
          </div>
        </div>
      </section>
      <Section className="!py-16">
        <div className="mb-6 flex items-center gap-3"><SampleBadge>Mock dashboard — fake data free</SampleBadge></div>
        <div className="grid overflow-hidden border border-border md:grid-cols-12">
          <nav aria-label="Portal" className="surface-dark md:col-span-3">
            <ul>{modules.map((m) => (
              <li key={m.id}><button onClick={() => setActive(m.id)} aria-current={active === m.id} className={cn("flex w-full items-center gap-3 border-b border-border px-6 py-5 text-left transition-colors", active === m.id ? "bg-graphite text-ivory" : "text-titanium hover:text-ivory")}>
                <m.icon className="size-4" aria-hidden /><span className="t-eyebrow">{it ? m.it : m.en}</span></button></li>
            ))}</ul>
          </nav>
          <div className="p-8 md:col-span-9 md:p-12">
            <h2 className="t-h2">{it ? mod.it : mod.en}</h2>
            <p className="mt-3 text-muted-foreground">{it ? "Il contenuto arriverà dal sistema Dealer View tramite integrazione." : "Content will come from Dealer View via integration."}</p>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[1, 2, 3].map((n) => <div key={n} className="h-28 border border-dashed border-border p-4"><span className="t-spec text-muted-foreground">widget {n} · {it ? "vuoto" : "empty"}</span></div>)}
            </div>
            <div className="mt-6 h-56 border border-dashed border-border p-4"><span className="t-spec text-muted-foreground">{it ? "tabella dati — nessun dato" : "data table — no data"}</span></div>
          </div>
        </div>
      </Section>
    </>
  );
}