import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { seo } from "@/lib/seo";
import { CTA, PageHero, PlaceholderNote, Section } from "@/components/site/primitives";

export const Route = createFileRoute("/professional")({
  head: () => seo("Professional & Rental", "BREVA packages for charter, rental and professional operators.", "/professional"),
  component: Pro,
});

function Pro() {
  const { locale } = useI18n();
  const it = locale === "it";
  const pkgs = it ? ["Charter", "Noleggio", "Professional"] : ["Charter", "Rental", "Professional"];
  return (
    <>
      <PageHero eyebrow="Professional" title={it ? "Pacchetti per chi lavora in mare." : "Packages for those who work at sea."} lead={it ? "Scaffold: contenuti dei pacchetti da definire con BREVA. Nessun prezzo." : "Scaffold: package contents to be defined with BREVA. No pricing."} />
      <Section>
        <div className="grid gap-px bg-border md:grid-cols-3">
          {pkgs.map((p, i) => (
            <div key={p} className="flex min-h-80 flex-col justify-between bg-background p-10">
              <div><span className="t-spec text-accent">0{i + 1}</span><h2 className="t-h2 mt-6">{p}</h2><p className="mt-4 text-muted-foreground">{it ? "Descrizione pacchetto segnaposto." : "Placeholder package description."}</p></div>
              <div className="mt-8"><CTA to="/contact" variant="outline">{it ? "Parla con noi" : "Talk to us"}</CTA></div>
            </div>
          ))}
        </div>
        <PlaceholderNote>{it ? "Condizioni commerciali non pubblicate in questo prototipo." : "Commercial terms are not published in this prototype."}</PlaceholderNote>
      </Section>
    </>
  );
}