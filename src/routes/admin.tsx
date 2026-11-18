import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { seo } from "@/lib/seo";
import { campaigns } from "@/content/editorial";
import { Eyebrow, SampleBadge, Section, SectionHead } from "@/components/site/primitives";

export const Route = createFileRoute("/admin")({
  head: () => seo("CMS concept", "Concept for BREVA content management and permissions.", "/admin", { noindex: true }),
  component: Admin,
});

const collections = ["Boats", "Brochures", "Press", "Campaigns", "Case studies", "Journal", "Media", "Dealers"];
const roles = [
  ["Admin", "All collections, users, publishing"],
  ["Marketing editor", "Create/edit/schedule campaigns, journal, case studies; publish after review"],
  ["Product manager", "Edit boats & validate technical specs"],
  ["Dealer manager", "Edit dealer directory"],
  ["Viewer", "Read-only preview"],
];

function Admin() {
  const { l, locale } = useI18n();
  return (
    <>
      <section className="surface-dark bg-steel pt-36 pb-16"><div className="container-breva"><Eyebrow>CMS · UX concept</Eyebrow><h1 className="t-display mt-6">Content studio</h1><p className="t-lead mt-4 max-w-2xl text-muted-foreground">{locale === "it" ? "Concept non funzionante: nessun salvataggio, nessun backend." : "Non-functional concept: nothing saves, no backend."}</p></div></section>
      <Section>
        <SectionHead eyebrow="Collections" title="Planned CRUD collections" />
        <div className="grid grid-cols-2 gap-px bg-border md:grid-cols-4">{collections.map((c) => <div key={c} className="bg-background p-6"><p className="t-h3">{c}</p><p className="t-spec mt-2 text-muted-foreground">draft · review · scheduled · live</p></div>)}</div>
      </Section>
      <Section dark>
        <SectionHead eyebrow="Campaign scheduler" title="Highlights queue" />
        <table className="w-full text-left">
          <thead className="t-eyebrow text-muted-foreground"><tr className="border-b border-border"><th className="py-3">Title</th><th>Priority</th><th>Window</th><th>Cap</th></tr></thead>
          <tbody>{campaigns.map((c) => <tr key={c.id} className="border-b border-border"><td className="py-4">{l(c.title)} {c.sample && <SampleBadge />}</td><td className="t-spec">{c.priority}</td><td className="t-spec">{c.startsAt.slice(0, 10)} → {c.endsAt.slice(0, 10)}</td><td className="t-spec">{c.frequency}</td></tr>)}</tbody>
        </table>
      </Section>
      <Section>
        <SectionHead eyebrow="Permissions" title="Proposed role model" />
        <dl className="border-t border-border">{roles.map(([r, d]) => <div key={r} className="grid gap-2 border-b border-border py-5 md:grid-cols-12"><dt className="t-h3 md:col-span-4">{r}</dt><dd className="text-muted-foreground md:col-span-8">{d}</dd></div>)}</dl>
      </Section>
    </>
  );
}