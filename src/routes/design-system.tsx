import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { boats, brochures, press } from "@/content/boats";
import { articles, caseStudies } from "@/content/editorial";
import { CTA, Eyebrow, Media, SampleBadge, Section, SectionHead, SoonButton, btnClass } from "@/components/site/primitives";
import { ArticleCard, BrochureCard, CaseCard, Gallery, LeadForm, PressCard, Quote, SpecTable } from "@/components/site/widgets";
import { Wordmark } from "@/components/site/Header";

export const Route = createFileRoute("/design-system")({
  head: () => seo("Design System", "BREVA Website 2.0 tokens, typography and components.", "/design-system", { noindex: true }),
  component: DS,
});

const colors = [
  ["Rich black", "#0D1114", "bg-abyss"], ["Graphite", "#24292C", "bg-graphite"], ["Warm ivory", "#F2EFE9", "bg-ivory"],
  ["Titanium", "#A8AEB1", "bg-titanium"], ["Midnight", "#112B3B", "bg-midnight"], ["Cobalt", "#407DA0", "bg-cobalt"],
];
const contrast = [["Ivory on Black", "16.6:1 AAA"], ["Black on Ivory", "16.6:1 AAA"], ["Titanium on Black", "8.6:1 AAA"], ["Ivory on Cobalt", "4.4:1 AA large"], ["Muted on Ivory", "≈7:1 AAA"]];

function DS() {
  const b800 = boats[1]!;
  return (
    <>
      <section className="surface-dark bg-sea pt-36 pb-20"><div className="container-breva"><Eyebrow>Website 2.0</Eyebrow><h1 className="t-mega mt-6">System</h1><p className="t-lead mt-6 max-w-xl text-muted-foreground">Dark Performance × Italian Design. Tokens live in styles.css; components in components/site.</p></div></section>

      <Section>
        <SectionHead index="01" eyebrow="Color" title="Palette & contrast" />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-6">{colors.map(([n, h, c]) => <div key={n}><div className={`${c} aspect-square border border-border`} /><p className="t-h3 mt-3">{n}</p><p className="t-spec text-muted-foreground">{h}</p></div>)}</div>
        <dl className="mt-12 grid gap-4 md:grid-cols-5">{contrast.map(([a, b]) => <div key={a} className="border-t border-border pt-3"><dt className="t-eyebrow text-muted-foreground">{a}</dt><dd className="t-spec mt-1">{b}</dd></div>)}</dl>
      </Section>

      <Section dark>
        <SectionHead index="02" eyebrow="Type" title="Typographic scale" lead="Archivo display, IBM Plex Sans text, IBM Plex Mono for specs and eyebrows." />
        <div className="space-y-8">
          <p className="t-mega">B1300</p><p className="t-display">Display headline</p><p className="t-h2">Section heading H2</p><p className="t-h3">Card heading H3</p>
          <p className="t-lead max-w-2xl">Lead paragraph for editorial introductions.</p><p className="max-w-2xl">Body copy at comfortable measure.</p><p className="t-eyebrow text-accent">Eyebrow label</p><p className="t-spec">SPEC · 0.00 m</p>
        </div>
      </Section>

      <Section>
        <SectionHead index="03" eyebrow="Actions" title="Buttons & navigation" />
        <div className="flex flex-wrap gap-3"><button className={btnClass("solid")}>Solid →</button><button className={btnClass("outline")}>Outline</button><button className={btnClass("accent")}>Accent</button><button className={btnClass("ghost")}>Ghost →</button><SoonButton>Configure</SoonButton><SampleBadge /></div>
        <div className="surface-dark mt-10 flex items-center justify-between px-6 py-5"><Wordmark /><span className="t-eyebrow text-titanium">Fleet · Our World · Stories · Journal</span><CTA to="/contact" variant="outline">Contact</CTA></div>
      </Section>

      <Section dark className="!py-0"><div className="relative"><Media slot={b800.gallery[0]!} /><div className="bg-fade-abyss absolute inset-0" /><div className="container-breva absolute inset-x-0 bottom-10"><Eyebrow>Hero template</Eyebrow><p className="t-mega mt-4">B800</p></div></div></Section>

      <Section>
        <SectionHead index="04" eyebrow="Data" title="Specification rows" />
        <SpecTable rows={b800.specs.slice(0, 4).map((r, i) => i === 0 ? { ...r, value: "0.00", validated: true } : r)} />
        <p className="t-spec mt-3 text-muted-foreground">First row shows the validated state with dummy 0.00 value for illustration only.</p>
      </Section>

      <Section className="hairline">
        <SectionHead index="05" eyebrow="Editorial" title="Feature, editorial, press, brochure" />
        <div className="grid gap-px bg-border md:grid-cols-3">{b800.highlights.map((h, i) => <div key={i} className="bg-background p-8"><span className="t-spec text-accent">0{i + 1}</span><p className="t-h3 mt-4">{h.title.en}</p></div>)}</div>
        <div className="mt-16 grid gap-12 md:grid-cols-3"><ArticleCard a={articles[0]!} /><CaseCard c={caseStudies[0]!} /><div className="space-y-10"><PressCard p={press[0]!} /><BrochureCard b={brochures[1]!} /></div></div>
      </Section>

      <Section dark className="bg-midnight"><SectionHead index="06" eyebrow="Event highlight" title="Event / campaign block" /><div className="flex flex-wrap items-center justify-between gap-6 border border-border p-8"><div><SampleBadge /><p className="t-h2 mt-4">Event title</p><p className="t-spec mt-2 text-titanium">DATE TBC · VENUE TBC</p></div><SoonButton>RSVP</SoonButton></div></Section>

      <Section><SectionHead index="07" eyebrow="Gallery" title="Gallery & lightbox" /><Gallery items={b800.gallery.slice(0, 3)} /></Section>
      <Section dark><SectionHead index="08" eyebrow="Testimonial" title="Quote block" /><Quote text="Demonstration quote." by="Fictional person" consent={false} /></Section>
      <Section><SectionHead index="09" eyebrow="Form" title="Lead form (not connected)" /><LeadForm /></Section>
      <Section dark><SectionHead index="10" eyebrow="Responsive" title="Breakpoints" /><ul className="t-spec grid gap-4 md:grid-cols-3"><li className="border-t border-border pt-3">Mobile &lt; 768 — single column, full-screen menu</li><li className="border-t border-border pt-3">Tablet 768–1023 — 12-col grid, burger nav</li><li className="border-t border-border pt-3">Desktop ≥ 1024 — full nav, asymmetric layouts</li></ul></Section>
    </>
  );
}