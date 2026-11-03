import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { seo } from "@/lib/seo";
import { boats } from "@/content/boats";
import { PageHero, Section } from "@/components/site/primitives";
import { ModelPanel } from "@/components/site/widgets";

export const Route = createFileRoute("/fleet/")({
  head: () => seo("Fleet", "The BREVA range: B630, B800, B1100 and B1300.", "/fleet"),
  component: Fleet,
});

function Fleet() {
  const { t } = useI18n();
  return (
    <>
      <PageHero eyebrow="B630 · B800 · B1100 · B1300" title={t("fleet.title")} lead={t("fleet.lead")} />
      <Section>{boats.map((b, i) => <ModelPanel key={b.id} boat={b} index={i} />)}</Section>
    </>
  );
}