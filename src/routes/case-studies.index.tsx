import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { seo } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { caseStudies } from "@/content/editorial";
import type { CaseCategory } from "@/content/types";
import { PageHero, PlaceholderNote, Section } from "@/components/site/primitives";
import { CaseCard, caseCategoryLabel } from "@/components/site/widgets";

export const Route = createFileRoute("/case-studies/")({
  head: () => seo("Stories", "Editorial case studies for owners, charter, dealers and professionals.", "/case-studies"),
  component: Hub,
});

function Hub() {
  const { l, locale } = useI18n();
  const it = locale === "it";
  const [cat, setCat] = useState<CaseCategory | "all">("all");
  const list = caseStudies.filter((c) => cat === "all" || c.category === cat);
  const featured = list.filter((c) => c.featured);
  const rest = list.filter((c) => !c.featured);
  const cats: (CaseCategory | "all")[] = ["all", "owner", "charter", "dealer", "professional"];
  return (
    <>
      <PageHero eyebrow={it ? "Storie" : "Stories"} title={it ? "Chi naviga BREVA." : "Who sails BREVA."} lead={it ? "Tutte le storie in questo prototipo sono esempi fittizi." : "Every story in this prototype is a fictional example."} />
      <Section>
        <div role="group" aria-label="Filter" className="mb-16 flex flex-wrap gap-2">
          {cats.map((c) => (
            <button key={c} aria-pressed={cat === c} onClick={() => setCat(c)} className={cn("t-eyebrow border px-5 py-3 transition-colors", cat === c ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground")}>
              {c === "all" ? (it ? "Tutte" : "All") : l(caseCategoryLabel[c])}
            </button>
          ))}
        </div>
        {featured.map((c) => <div key={c.slug} className="mb-20"><CaseCard c={c} big /></div>)}
        <div className="grid gap-12 md:grid-cols-2">{rest.map((c) => <CaseCard key={c.slug} c={c} />)}</div>
        {list.length === 0 && <p className="text-muted-foreground">{it ? "Nessuna storia." : "No stories."}</p>}
        <PlaceholderNote>{it ? "Storie reali solo dopo consenso scritto dei clienti." : "Real stories only after written customer consent."}</PlaceholderNote>
      </Section>
    </>
  );
}