import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { seo } from "@/lib/seo";
import { caseStudies } from "@/content/editorial";
import { getBoat } from "@/content/boats";
import type { MediaSlot } from "@/content/types";
import { CTA, Eyebrow, PageHero, SampleBadge, Section } from "@/components/site/primitives";
import { Gallery, Quote, caseCategoryLabel } from "@/components/site/widgets";

export const Route = createFileRoute("/case-studies/$slug")({
  loader: ({ params }) => {
    const c = caseStudies.find((x) => x.slug === params.slug);
    if (!c) throw notFound();
    return { slug: c.slug, title: c.title.en ?? c.title.it };
  },
  head: ({ loaderData, params }) => loaderData ? seo(loaderData.title, "Fictional BREVA case-study template.", `/case-studies/${params.slug}`, { noindex: true }) : { meta: [{ title: "Story unavailable — BREVA Marine" }, { name: "robots", content: "noindex" }] },
  component: CaseDetail,
});

function CaseDetail() {
  const { slug } = Route.useLoaderData();
  const c = caseStudies.find((x) => x.slug === slug)!;
  const boat = getBoat(c.modelId)!;
  const { l, locale } = useI18n();
  const it = locale === "it";
  const gallery: MediaSlot[] = [1, 2, 3].map((n) => ({ id: `case-${slug}-${n}`, kind: "photo", alt: { it: `Foto storia ${n}`, en: `Story photo ${n}` }, aspect: (["cinema", "tall", "wide"] as const)[n - 1]! }));
  const blocks = [
    [it ? "La sfida" : "The challenge", l(c.challenge)],
    [it ? "L'esperienza" : "The experience", l(c.experience)],
  ];
  return (
    <>
      <PageHero eyebrow={`${l(caseCategoryLabel[c.category])} · ${boat.name}`} title={l(c.title)} lead={l(c.summary)}>
        <SampleBadge>Fictional example — not a real customer</SampleBadge>
      </PageHero>
      <Section>
        <div className="grid gap-16 md:grid-cols-12">
          <aside className="md:col-span-3">
            <dl className="space-y-6 border-t border-border pt-6">
              <div><dt className="t-eyebrow text-muted-foreground">{it ? "Modello" : "Model"}</dt><dd className="t-h3 mt-1"><Link to="/fleet/$model" params={{ model: boat.id }} className="hover:text-accent">{boat.name}</Link></dd></div>
              <div><dt className="t-eyebrow text-muted-foreground">{it ? "Configurazione" : "Configuration"}</dt><dd className="mt-1">{l(c.configuration)}</dd></div>
            </dl>
          </aside>
          <div className="space-y-16 md:col-span-8 md:col-start-5">
            {blocks.map(([h, b]) => <div key={h}><Eyebrow>{h}</Eyebrow><p className="t-h3 mt-4 font-light">{b}</p></div>)}
            <div><Eyebrow>{it ? "Risultati" : "Outcomes"}</Eyebrow><ul className="mt-4 space-y-3">{c.outcomes.map((o, i) => <li key={i} className="t-lead border-b border-border pb-3">{l(o)}</li>)}</ul></div>
          </div>
        </div>
      </Section>
      {c.quote && <Section dark className="bg-sea"><Quote text={l(c.quote.text)} by={l(c.quote.attribution)} consent={c.quote.consentOnFile} /></Section>}
      <Section><Gallery items={gallery} /></Section>
      <Section dark>
        <div className="flex flex-wrap items-end justify-between gap-8">
          <h2 className="t-display">{boat.name}</h2>
          <div className="flex gap-3"><CTA to="/fleet/$model" params={{ model: boat.id }} variant="solid">{it ? "Scopri il modello" : "Discover the model"}</CTA><CTA to="/case-studies" variant="outline">{it ? "Tutte le storie" : "All stories"}</CTA></div>
        </div>
      </Section>
    </>
  );
}