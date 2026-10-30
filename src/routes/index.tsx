import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { seo } from "@/lib/seo";
import { boats } from "@/content/boats";
import { articles, caseStudies } from "@/content/editorial";
import { CTA, Eyebrow, Media, Section, SectionHead } from "@/components/site/primitives";
import { ArticleCard, CampaignHighlight, CaseCard, ModelPanel } from "@/components/site/widgets";

export const Route = createFileRoute("/")({
  head: () => seo("Italian RIBs & yachts", "BREVA Marine: B630, B800, B1100, B1300 — Italian design and open-water performance.", "/"),
  component: Home,
});

function Home() {
  const { t, locale } = useI18n();
  const it = locale === "it";
  return (
    <>
      <CampaignHighlight />
      <section className="surface-dark relative min-h-[100svh] overflow-hidden">
        <div className="absolute inset-0"><Media slot={{ ...boats.find((b) => b.id === "b1300")!.gallery[0]!, aspect: "cinema" }} className="h-full !aspect-auto" /></div>
        <div className="bg-fade-abyss absolute inset-0" />
        <div className="container-breva relative flex min-h-[100svh] flex-col justify-end pb-16 pt-32 md:pb-24">
          <Eyebrow className="rise">{t("home.kicker")}</Eyebrow>
          <h1 className="t-mega rise mt-6 max-w-[14ch]">{t("home.title")}</h1>
          <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
            <p className="t-lead rise text-muted-foreground md:col-span-5">{t("home.lead")}</p>
            <div className="rise flex flex-wrap gap-3 md:col-span-7 md:justify-end">
              <CTA to="/fleet" variant="solid">{t("cta.explore")}</CTA>
              <CTA to="/experience" variant="outline">{t("cta.seatrial")}</CTA>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <SectionHead index="01" eyebrow={t("nav.fleet")} title={t("fleet.lead")} />
        {boats.map((b, i) => <ModelPanel key={b.id} boat={b} index={i} />)}
      </Section>

      <Section dark className="bg-steel">
        <div className="grid gap-12 md:grid-cols-12 md:items-center">
          <div className="md:col-span-7"><Media slot={{ id: "home-shipyard", alt: { it: "Cantiere BREVA", en: "BREVA shipyard" }, kind: "photo", aspect: "tall" }} /></div>
          <div className="md:col-span-4 md:col-start-9">
            <Eyebrow>02 · {t("nav.about")}</Eyebrow>
            <h2 className="t-h2 mt-6">{it ? "Il design come disciplina. Il cantiere come metodo." : "Design as discipline. The shipyard as method."}</h2>
            <p className="t-lead mt-6 text-muted-foreground">{it ? "Racconto del cantiere in attesa dei testi ufficiali." : "Shipyard story awaiting official copy."}</p>
            <div className="mt-10"><CTA to="/about" variant="outline">{t("nav.about")}</CTA></div>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHead index="03" eyebrow={t("nav.cases")} title={it ? "Storie dal mare." : "Stories from the sea."} lead={it ? "Esempi fittizi che mostrano il formato editoriale." : "Fictional examples demonstrating the editorial format."} />
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-7"><CaseCard c={caseStudies[0]!} big /></div>
          <div className="md:col-span-4 md:col-start-9 md:pt-40"><CaseCard c={caseStudies[1]!} /></div>
        </div>
      </Section>

      <Section className="hairline">
        <div className="mb-14 flex items-end justify-between gap-6">
          <h2 className="t-h2">{t("nav.journal")}</h2>
          <Link to="/journal" className="t-eyebrow hover:text-accent">{it ? "Tutti gli articoli" : "All articles"} →</Link>
        </div>
        <div className="grid gap-10 md:grid-cols-3">{articles.map((a) => <ArticleCard key={a.slug} a={a} />)}</div>
      </Section>

      <Section dark className="bg-sea">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <h2 className="t-display md:col-span-8">{it ? "Il mare si capisce solo in mare." : "The sea is only understood at sea."}</h2>
          <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
            <CTA to="/experience" variant="solid">{t("cta.seatrial")}</CTA>
            <CTA to="/dealers" variant="outline">{t("cta.dealer")}</CTA>
          </div>
        </div>
      </Section>
    </>
  );
}