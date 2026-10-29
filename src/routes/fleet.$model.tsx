import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import { seo } from "@/lib/seo";
import { boats, brochures, getBoat, press } from "@/content/boats";
import { caseStudies } from "@/content/editorial";
import { CTA, Eyebrow, Media, PageHero, PlaceholderNote, SampleBadge, Section, SectionHead, SoonButton } from "@/components/site/primitives";
import { BrochureCard, CaseCard, Gallery, PressCard, SpecTable } from "@/components/site/widgets";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/fleet/$model")({
  loader: ({ params }) => {
    const boat = getBoat(params.model);
    if (!boat) throw notFound();
    return { id: boat.id, name: boat.name };
  },
  head: ({ loaderData, params }) =>
    loaderData ? seo(loaderData.name, `BREVA ${loaderData.name}: gallery, layouts, technical data, sea trials and brochure.`, `/fleet/${params.model}`) : { meta: [{ title: "Model unavailable — BREVA Marine" }, { name: "robots", content: "noindex" }] },
  component: ModelPage,
});

function ModelPage() {
  const { id } = Route.useLoaderData();
  const boat = getBoat(id)!;
  const { l, t, locale } = useI18n();
  const it = locale === "it";
  const [layout, setLayout] = useState(0);
  const brochure = brochures.find((b) => b.modelId === boat.id)!;
  const modelPress = press.filter((p) => p.modelId === boat.id);
  const related = caseStudies.filter((c) => c.modelId === boat.id);
  const others = boats.filter((b) => b.id !== boat.id);

  return (
    <>
      <PageHero slot={boat.gallery[0]!} eyebrow={`BREVA · ${it ? "Modello" : "Model"}`} title={<span className="t-mega block">{boat.name}</span>} lead={l(boat.tagline)}>
        <CTA to="/experience" variant="solid">{t("cta.seatrial")}</CTA>
        <SoonButton>{t("cta.configure")}</SoonButton>
        <CTA to="/dealers" variant="outline">{t("cta.dealer")}</CTA>
      </PageHero>

      {!boat.populated && (
        <div className="bg-sample text-sample-foreground"><div className="container-breva t-spec py-3">{it ? "Pagina generata dal modello di template: tutti i contenuti sono segnaposto." : "Page generated from the model template: all content is placeholder."}</div></div>
      )}

      <Section>
        <div className="grid gap-10 md:grid-cols-12">
          <Eyebrow className="md:col-span-3">01 · {it ? "Il modello" : "The model"}</Eyebrow>
          <p className="t-h2 font-light md:col-span-9">{l(boat.intro)}</p>
        </div>
        <div className="mt-20 grid gap-px bg-border md:grid-cols-3">
          {boat.highlights.map((h, i) => (
            <div key={i} className="bg-background p-8 md:p-10">
              <span className="t-spec text-accent">0{i + 1}</span>
              <h3 className="t-h3 mt-6">{l(h.title)}</h3>
              <p className="mt-4 text-muted-foreground">{l(h.body)}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section dark>
        <SectionHead index="02" eyebrow={it ? "Galleria" : "Gallery"} title={it ? "Esterni, interni, dettagli." : "Exterior, interior, detail."} lead={it ? "Clicca per aprire la lightbox. Frecce per navigare, Esc per chiudere." : "Click to open the lightbox. Arrow keys to navigate, Esc to close."} />
        <Gallery items={boat.gallery} />
      </Section>

      <Section>
        <SectionHead index="03" eyebrow={it ? "Layout e versioni" : "Layouts & versions"} title={it ? "Una base, più configurazioni." : "One platform, several configurations."} />
        <div role="tablist" aria-label="Layouts" className="mb-8 flex gap-2">
          {boat.layouts.map((v, i) => (
            <button key={v.id} role="tab" aria-selected={layout === i} onClick={() => setLayout(i)} className={cn("t-eyebrow border px-5 py-3 transition-colors", layout === i ? "border-foreground bg-foreground text-background" : "border-border hover:border-foreground")}>{l(v.name)}</button>
          ))}
        </div>
        <div role="tabpanel"><Media slot={boat.layouts[layout]!.media} /></div>
      </Section>

      <Section className="hairline">
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <Eyebrow>04 · {it ? "Dati tecnici" : "Technical data"}</Eyebrow>
            <h2 className="t-h2 mt-6">{it ? "Specifiche" : "Specifications"}</h2>
            <PlaceholderNote>{it ? "Valori visualizzati solo quando validati dall'ufficio tecnico BREVA. Nessun dato inventato." : "Values display only once validated by BREVA engineering. No invented data."}</PlaceholderNote>
          </div>
          <div className="md:col-span-8"><SpecTable rows={boat.specs} /></div>
        </div>
      </Section>

      <Section dark className="bg-steel">
        <SectionHead index="05" eyebrow={it ? "Potenza e tecnologia" : "Power & technology"} title={it ? "Ingegneria al servizio della navigazione." : "Engineering in service of the ride."} />
        <div className="grid gap-12 md:grid-cols-2">
          {boat.power.map((p, i) => <div key={i} className="border-t border-border pt-6"><h3 className="t-h3">{l(p.title)}</h3><p className="mt-4 text-muted-foreground">{l(p.body)}</p></div>)}
        </div>
        <div className="mt-20"><Media slot={boat.videos[0]!} /></div>
      </Section>

      <Section>
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-5">
            <Eyebrow>06 · {it ? "Prove in mare" : "Sea trials"}</Eyebrow>
            <h2 className="t-h2 mt-6">{it ? `Prova il ${boat.name}.` : `Trial the ${boat.name}.`}</h2>
            <p className="t-lead mt-6 text-muted-foreground">{it ? "Calendario e località da confermare con BREVA." : "Calendar and locations to be confirmed with BREVA."}</p>
            <div className="mt-10"><CTA to="/experience" variant="solid">{t("cta.seatrial")}</CTA></div>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <Eyebrow>07 · {it ? "Stampa" : "Press"}</Eyebrow>
            <div className="mt-8 grid gap-10">
              {modelPress.length ? modelPress.map((p) => <PressCard key={p.id} p={p} />) : <p className="text-muted-foreground">{it ? "Nessuna recensione verificata collegata." : "No verified reviews linked yet."} <SampleBadge>Placeholder</SampleBadge></p>}
            </div>
          </div>
        </div>
      </Section>

      <Section className="hairline">
        <div className="grid gap-8 md:grid-cols-12">
          <div className="md:col-span-5"><Eyebrow>08 · Brochure</Eyebrow><h2 className="t-h2 mt-6">{it ? "Documentazione del modello" : "Model documentation"}</h2></div>
          <div className="md:col-span-6 md:col-start-7"><BrochureCard b={brochure} /></div>
        </div>
      </Section>

      {related.length > 0 && (
        <Section>
          <SectionHead eyebrow={t("nav.cases")} title={it ? "Storie con questo modello" : "Stories with this model"} />
          <div className="grid gap-10 md:grid-cols-2">{related.map((c) => <CaseCard key={c.slug} c={c} />)}</div>
        </Section>
      )}

      <Section dark>
        <Eyebrow>{it ? "Altri modelli" : "Other models"}</Eyebrow>
        <ul className="mt-8 border-t border-border">
          {others.map((o) => (
            <li key={o.id} className="border-b border-border">
              <Link to="/fleet/$model" params={{ model: o.id }} className="t-display flex items-center justify-between py-6 transition-colors hover:text-cobalt-soft">{o.name}<span aria-hidden className="t-h3">→</span></Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}