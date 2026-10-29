import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { seo } from "@/lib/seo";
import { dealers } from "@/content/editorial";
import { PageHero, SampleBadge, Section, SoonButton } from "@/components/site/primitives";

export const Route = createFileRoute("/dealers")({
  head: () => seo("Dealer Locator", "Find an authorised BREVA dealer.", "/dealers"),
  component: Dealers,
});

function Dealers() {
  const { l, locale } = useI18n();
  const it = locale === "it";
  const [q, setQ] = useState("");
  const list = dealers.filter((d) => (d.name + l(d.region)).toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <PageHero eyebrow={it ? "Rete dealer" : "Dealer network"} title={it ? "Trova un dealer." : "Find a dealer."} lead={it ? "Dati di esempio: nessuna località reale inserita." : "Sample data: no real locations entered."} />
      <Section>
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <label className="block"><span className="t-eyebrow text-muted-foreground">{it ? "Cerca" : "Search"}</span>
              <input value={q} onChange={(e) => setQ(e.target.value)} className="t-h3 mt-2 w-full border-b border-input bg-transparent py-3 outline-none focus:border-accent" placeholder={it ? "Regione o nome" : "Region or name"} /></label>
            <ul className="mt-10 border-t border-border">
              {list.map((d) => (
                <li key={d.id} className="border-b border-border py-6">
                  <div className="flex items-center justify-between"><p className="t-h3">{d.name}</p><SampleBadge /></div>
                  <p className="t-eyebrow mt-2 text-muted-foreground">{l(d.region)}</p>
                  <p className="mt-2 text-sm">{d.services.map(l).join(" · ")}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="surface-dark bg-sea placeholder-grid relative flex min-h-[480px] items-center justify-center md:col-span-7">
            <div className="text-center"><MapPin className="mx-auto size-8 text-cobalt-soft" aria-hidden /><p className="t-eyebrow mt-4 text-titanium">{it ? "Mappa interattiva — integrazione futura" : "Interactive map — future integration"}</p><div className="mt-6"><SoonButton>{it ? "Usa la mia posizione" : "Use my location"}</SoonButton></div></div>
          </div>
        </div>
      </Section>
    </>
  );
}