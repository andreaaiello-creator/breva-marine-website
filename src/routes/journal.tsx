import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { seo } from "@/lib/seo";
import { articles } from "@/content/editorial";
import { press } from "@/content/boats";
import { Eyebrow, PageHero, Section, SectionHead } from "@/components/site/primitives";
import { ArticleCard, PressCard } from "@/components/site/widgets";

export const Route = createFileRoute("/journal")({
  head: () => seo("Journal", "News, events and press from BREVA Marine.", "/journal"),
  component: Journal,
});

function Journal() {
  const { locale } = useI18n();
  const it = locale === "it";
  const [lead, ...rest] = articles;
  return (
    <>
      <PageHero eyebrow="Journal" title={it ? "Notizie, eventi, stampa." : "News, events, press."} lead={it ? "Tutti gli articoli qui sono esempi." : "All articles here are samples."} />
      <Section>
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-8"><ArticleCard a={lead!} big /></div>
          <div className="space-y-12 md:col-span-4">{rest.map((a) => <ArticleCard key={a.slug} a={a} />)}</div>
        </div>
      </Section>
      <Section dark>
        <SectionHead eyebrow={it ? "Rassegna stampa" : "Press"} title={it ? "Recensioni e prove, con fonte." : "Reviews and tests, with source."} />
        <div className="grid gap-10 md:grid-cols-2">{press.map((p) => <PressCard key={p.id} p={p} />)}</div>
        <Eyebrow className="mt-12">{it ? "Articoli individuali: template in arrivo con il CMS" : "Individual articles: template arrives with the CMS"}</Eyebrow>
      </Section>
    </>
  );
}