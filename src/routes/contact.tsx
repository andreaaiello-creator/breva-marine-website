import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { seo } from "@/lib/seo";
import { Eyebrow, PlaceholderNote, Section } from "@/components/site/primitives";
import { LeadForm } from "@/components/site/widgets";

export const Route = createFileRoute("/contact")({
  head: () => seo("Contact", "Contact BREVA Marine for models, sea trials and dealers.", "/contact"),
  component: Contact,
});

function Contact() {
  const { locale } = useI18n();
  const it = locale === "it";
  return (
    <Section className="pt-40">
      <div className="grid gap-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Eyebrow>{it ? "Contatti" : "Contact"}</Eyebrow>
          <h1 className="t-display mt-6">{it ? "Parliamo di mare." : "Let's talk about the sea."}</h1>
          <PlaceholderNote>{it ? "Indirizzo, telefono ed email ufficiali da fornire." : "Official address, phone and email to be supplied."}</PlaceholderNote>
        </div>
        <div className="md:col-span-6 md:col-start-7"><LeadForm /></div>
      </div>
    </Section>
  );
}