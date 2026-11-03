import { Link } from "@tanstack/react-router";
import { ImageIcon, Film, LayoutGrid } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import type { MediaSlot } from "@/content/types";

const aspectClass = { wide: "aspect-[16/10]", tall: "aspect-[4/5]", square: "aspect-square", cinema: "aspect-[21/9]" };

/** Media renders official src when supplied; otherwise an honest replace-media placeholder. */
export function Media({ slot, className, label = true }: { slot: MediaSlot; className?: string; label?: boolean }) {
  const { l } = useI18n();
  const Icon = slot.kind === "video" ? Film : slot.kind === "plan" ? LayoutGrid : ImageIcon;
  if (slot.src) return <img src={slot.src} alt={l(slot.alt)} loading="lazy" className={cn("w-full object-cover", aspectClass[slot.aspect ?? "wide"], className)} />;
  return (
    <div role="img" aria-label={`${l(slot.alt)} (placeholder)`} className={cn("surface-dark bg-sea placeholder-grid relative w-full overflow-hidden", aspectClass[slot.aspect ?? "wide"], className)}>
      {label && (
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 md:p-5">
          <div className="flex items-center gap-2 text-titanium">
            <Icon className="size-4" aria-hidden />
            <span className="t-eyebrow">{l(slot.alt)}</span>
          </div>
          <span className="t-eyebrow hidden border border-border px-2 py-1 text-titanium sm:inline">Replace media · {slot.id}</span>
        </div>
      )}
    </div>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("t-eyebrow text-accent", className)}>{children}</p>;
}

export function SampleBadge({ children }: { children?: ReactNode }) {
  const { t } = useI18n();
  return <span className="t-eyebrow inline-block rounded-sm bg-sample px-2 py-1 text-sample-foreground">{children ?? t("common.sample")}</span>;
}

type BtnVariant = "solid" | "outline" | "ghost" | "accent";
const btn: Record<BtnVariant, string> = {
  solid: "bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground",
  accent: "bg-cobalt text-ivory hover:bg-cobalt-soft hover:text-abyss",
  outline: "border border-foreground/40 text-foreground hover:border-foreground hover:bg-foreground hover:text-background",
  ghost: "text-foreground underline-offset-8 hover:underline",
};
export const btnClass = (v: BtnVariant = "solid") =>
  cn("t-eyebrow inline-flex items-center justify-center gap-3 rounded-sm px-6 py-4 transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-40", btn[v]);

export function CTA({ to, variant, children, params }: { to: string; variant?: BtnVariant; children: ReactNode; params?: Record<string, string> }) {
  return <Link to={to as never} params={params as never} className={btnClass(variant)}>{children}<span aria-hidden>→</span></Link>;
}

export function SoonButton({ children, variant = "outline" }: { children: ReactNode; variant?: BtnVariant }) {
  const { t } = useI18n();
  return (
    <button type="button" disabled aria-disabled className={btnClass(variant)} title={t("common.soon")}>
      {children}<span className="opacity-70">· {t("common.soon")}</span>
    </button>
  );
}

export function PageHero({ eyebrow, title, lead, children, slot }: { eyebrow: string; title: ReactNode; lead?: string; children?: ReactNode; slot?: MediaSlot }) {
  return (
    <section className="surface-dark relative overflow-hidden">
      {slot ? <div className="absolute inset-0"><Media slot={slot} className="h-full !aspect-auto" label={false} /></div> : <div className="bg-sea placeholder-grid absolute inset-0" />}
      <div className="bg-fade-abyss absolute inset-0" />
      <div className="container-breva relative flex min-h-[72vh] flex-col justify-end pb-16 pt-40 md:pb-24">
        <Eyebrow className="rise">{eyebrow}</Eyebrow>
        <h1 className="t-display rise mt-6 max-w-5xl">{title}</h1>
        {lead && <p className="t-lead rise mt-6 max-w-2xl text-muted-foreground">{lead}</p>}
        {children && <div className="rise mt-10 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}

export function Section({ children, dark, className, id }: { children: ReactNode; dark?: boolean; className?: string; id?: string }) {
  return <section id={id} className={cn(dark && "surface-dark", "py-20 md:py-32", className)}><div className="container-breva">{children}</div></section>;
}

export function SectionHead({ eyebrow, title, lead, index }: { eyebrow: string; title: string; lead?: string; index?: string }) {
  return (
    <div className="mb-14 grid gap-6 md:grid-cols-12 md:mb-20">
      <div className="md:col-span-3"><Eyebrow>{index && <span className="mr-3 text-muted-foreground">{index}</span>}{eyebrow}</Eyebrow></div>
      <div className="md:col-span-9">
        <h2 className="t-h2 max-w-4xl">{title}</h2>
        {lead && <p className="t-lead mt-6 max-w-2xl text-muted-foreground">{lead}</p>}
      </div>
    </div>
  );
}

export function PlaceholderNote({ children }: { children: ReactNode }) {
  return <p className="t-spec mt-6 border-l-2 border-sample pl-4 text-muted-foreground">{children}</p>;
}