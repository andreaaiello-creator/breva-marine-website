import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { seo } from "@/lib/seo";
import { Eyebrow, PageHero, PlaceholderNote, Section } from "@/components/site/primitives";
import { LeadForm } from "@/components/site/widgets";

export const Route = createFileRoute("/experience")({
  head: () => seo("Sea Trials & Experience", "Request a BREVA sea trial and discover upcoming experiences.", "/experience"),
  component: Experience,
});

function Experience() {
  const { locale } = useI18n();
  const it = locale === "it";
  return (
    <>
      <PageHero eyebrow={it ? "Esperienza · Prove in mare" : "Experience · Sea trials"} title={it ? "Salire a bordo è l'unica prova." : "Coming aboard is the only test."} lead={it ? "Scaffold: calendario eventi e località da definire." : "Scaffold: events calendar and locations to be defined."} />
      <Section>
        <div className="grid gap-16 md:grid-cols-12">
          <div className="md:col-span-4">
            <Eyebrow>{it ? "Prossime date" : "Upcoming dates"}</Eyebrow>
            <ul className="mt-6 border-t border-border">{[1, 2, 3].map((n) => <li key={n} className="t-spec border-b border-border py-5 text-muted-foreground">{it ? `Data ${n} — da confermare` : `Date ${n} — to be confirmed`}</li>)}</ul>
            <PlaceholderNote>{it ? "Nessun evento reale inserito." : "No real events entered."}</PlaceholderNote>
          </div>
          <div className="md:col-span-7 md:col-start-6"><h2 className="t-h2 mb-10">{it ? "Richiedi una prova" : "Request a trial"}</h2><LeadForm /></div>
        </div>
      </Section>
    </>
  );
}