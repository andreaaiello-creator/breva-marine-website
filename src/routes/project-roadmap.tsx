import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/lib/seo";
import { Eyebrow, Section } from "@/components/site/primitives";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/project-roadmap")({
  head: () => seo("Project roadmap", "Internal: requirements, status and integration prerequisites.", "/project-roadmap", { noindex: true }),
  component: Roadmap,
});

type S = "done" | "placeholder" | "todo";
const rows: [string, S, string][] = [
  ["Design system & tokens (/design-system)", "done", "Palette, type scale, components, dark/light surfaces"],
  ["IT/EN localization architecture", "done", "Italian default; UI strings + content fields localized; add locales in src/lib/i18n.tsx"],
  ["Home with campaign highlight", "done", "Scheduling, priority, session/once/daily caps — SAMPLE campaign"],
  ["Fleet overview, massive panels", "done", "All imagery = placeholders"],
  ["Model template B800 + B630/B1100/B1300", "placeholder", "Structure complete; copy, specs, media, videos pending official data"],
  ["Technical specs", "placeholder", "Values render only when validated=true"],
  ["Model brochures", "placeholder", "Download disabled until correct per-model PDF uploaded"],
  ["Press / reviews", "placeholder", "Outbound links pending source verification"],
  ["About / Our World", "placeholder", "Stories, team, behind-the-scenes media pending"],
  ["Case studies hub + detail", "placeholder", "All stories fictional; real ones need written consent"],
  ["Journal", "placeholder", "Sample articles; article template with CMS"],
  ["Dealer portal", "placeholder", "Design only; SSO via BREVA ERP/CRM Dealer View later"],
  ["Dealer locator", "placeholder", "Sample dealers; real directory + map integration"],
  ["Experience / Professional / Contact", "placeholder", "Scaffolds; forms not connected"],
  ["CMS CRUD + permissions", "todo", "Concept at /admin; needs backend + auth"],
  ["Lead routing to CRM", "todo", "Needs CRM endpoint, consent text, spam protection"],
  ["Official logo & licensed photography", "todo", "Text wordmark placeholder in use"],
  ["Domain, canonical absolute URLs, sitemap, publish", "todo", "Requires approval; site stays unpublished + noindex"],
];
const tone: Record<S, string> = { done: "bg-cobalt text-ivory", placeholder: "bg-sample text-sample-foreground", todo: "border border-border text-muted-foreground" };

function Roadmap() {
  return (
    <Section className="pt-40">
      <Eyebrow>Internal</Eyebrow>
      <h1 className="t-display mt-6">Project roadmap</h1>
      <p className="t-lead mt-6 max-w-2xl text-muted-foreground">Website 2.0 prototype status. Unpublished; no external connections.</p>
      <ul className="mt-16 border-t border-border">
        {rows.map(([r, s, n]) => (
          <li key={r} className="grid gap-3 border-b border-border py-5 md:grid-cols-12 md:items-center">
            <span className="t-h3 md:col-span-5">{r}</span>
            <span className="md:col-span-2"><span className={cn("t-eyebrow inline-block rounded-sm px-2 py-1", tone[s])}>{s}</span></span>
            <span className="text-muted-foreground md:col-span-5">{n}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}