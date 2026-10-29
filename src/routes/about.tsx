import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { seo } from "@/lib/seo";
import { Eyebrow, Media, PageHero, PlaceholderNote, Section, SectionHead } from "@/components/site/primitives";
import { Gallery } from "@/components/site/widgets";
import type { MediaSlot } from "@/content/types";

export const Route = createFileRoute("/about")({
  head: () => seo("Our World", "Design, shipyard, quality assurance and the people behind BREVA Marine.", "/about"),
  component: About,
});

const chapters = [
  { id: "design", it: ["Design", "Testo sul processo di design — da fornire."], en: ["Design", "Design process story — to be supplied."] },
  { id: "shipyard", it: ["Cantiere", "Testo sul cantiere — da fornire."], en: ["Shipyard", "Shipyard story — to be supplied."] },
  { id: "quality", it: ["Qualità", "Testo sul controllo qualità — da fornire, senza affermazioni non verificate."], en: ["Quality assurance", "Quality assurance story — to be supplied, no unverified claims."] },
];

const bts: MediaSlot[] = Array.from({ length: 6 }, (_, i): MediaSlot => ({ id: `bts-${i + 1}`, kind: "photo", alt: { it: `Dietro le quinte ${i + 1}`, en: `Behind the scenes ${i + 1}` }, aspect: (["cinema", "tall", "square", "wide", "tall", "wide"] as const)[i]! }));

function About() {
  const { locale } = useI18n();
  const it = locale === "it";
  return (
    <>
      <PageHero eyebrow={it ? "Il nostro mondo" : "Our World"} title={it ? "Fatto in Italia, pensato per il largo." : "Made in Italy, conceived for open water."} lead={it ? "Storytelling su design, cantiere, qualità e persone. Immagini e testi reali da fornire." : "Storytelling on design, shipyard, quality and people. Real imagery and copy to be supplied."} />
      {chapters.map((c, i) => (
        <Section key={c.id} dark={i % 2 === 1}>
          <div className="grid gap-12 md:grid-cols-12 md:items-center">
            <div className={i % 2 ? "md:order-2 md:col-span-7 md:col-start-6" : "md:col-span-7"}><Media slot={{ id: `about-${c.id}`, kind: "photo", alt: { it: c.it[0]!, en: c.en[0]! }, aspect: "tall" }} /></div>
            <div className={i % 2 ? "md:order-1 md:col-span-4 md:row-start-1" : "md:col-span-4 md:col-start-9"}>
              <Eyebrow>0{i + 1}</Eyebrow>
              <h2 className="t-display mt-6">{(it ? c.it : c.en)[0]}</h2>
              <p className="t-lead mt-6 text-muted-foreground">{(it ? c.it : c.en)[1]!}</p>
            </div>
          </div>
        </Section>
      ))}
      <Section>
        <SectionHead index="04" eyebrow={it ? "Dietro le quinte" : "Behind the scenes"} title={it ? "Il lavoro, da vicino." : "The work, up close."} />
        <Gallery items={bts} />
      </Section>
      <Section dark>
        <SectionHead index="05" eyebrow="Team" title={it ? "Le persone di BREVA" : "The people of BREVA"} />
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {Array.from({ length: 4 }, (_, i) => (
            <div key={i}>
              <Media slot={{ id: `team-${i + 1}`, kind: "photo", alt: { it: "Ritratto membro del team", en: "Team member portrait" }, aspect: "tall" }} label={false} />
              <p className="t-h3 mt-4">{it ? "Nome da fornire" : "Name to be supplied"}</p>
              <p className="t-eyebrow mt-1 text-muted-foreground">{it ? "Ruolo" : "Role"}</p>
            </div>
          ))}
        </div>
        <PlaceholderNote>{it ? "Nomi, ruoli e ritratti solo con autorizzazione delle persone." : "Names, roles and portraits only with each person's permission."}</PlaceholderNote>
      </Section>
    </>
  );
}