import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Download, ExternalLink, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { campaigns } from "@/content/editorial";
import { activeCampaign, isCapped } from "@/lib/campaign";
import type { Article, Boat, Brochure, CaseStudy, MediaSlot, PressItem, SpecRow } from "@/content/types";
import { Media, SampleBadge, btnClass } from "./primitives";

/* ---------- Gallery + Lightbox ---------- */
export function Gallery({ items }: { items: MediaSlot[] }) {
  const [idx, setIdx] = useState<number | null>(null);
  const { l, t } = useI18n();
  useEffect(() => {
    if (idx === null) return;
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIdx(null);
      if (e.key === "ArrowRight") setIdx((i) => (i! + 1) % items.length);
      if (e.key === "ArrowLeft") setIdx((i) => (i! - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", k); return () => window.removeEventListener("keydown", k);
  }, [idx, items.length]);
  const spans = ["md:col-span-12", "md:col-span-5", "md:col-span-7", "md:col-span-7", "md:col-span-5", "md:col-span-12"];
  return (
    <>
      <div className="grid gap-3 md:grid-cols-12 md:gap-4">
        {items.map((m, i) => (
          <button key={m.id} onClick={() => setIdx(i)} className={cn("group block overflow-hidden text-left", spans[i % spans.length])} aria-label={`Open ${l(m.alt)}`}>
            <Media slot={m} className="transition-transform duration-700 group-hover:scale-[1.02]" />
          </button>
        ))}
      </div>
      {idx !== null && (
        <div role="dialog" aria-modal aria-label={l(items[idx]!.alt)} className="surface-dark fixed inset-0 z-50 flex flex-col !bg-abyss/97">
          <div className="container-breva flex items-center justify-between py-5">
            <span className="t-spec text-titanium">{String(idx + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")} — {l(items[idx]!.alt)}</span>
            <button onClick={() => setIdx(null)} aria-label={t("common.close")} autoFocus><X className="size-6" /></button>
          </div>
          <div className="container-breva flex flex-1 items-center gap-4">
            <button onClick={() => setIdx((idx - 1 + items.length) % items.length)} aria-label="Previous"><ChevronLeft className="size-8" /></button>
            <div className="flex-1"><Media slot={{ ...items[idx]!, aspect: "wide" }} className="max-h-[75vh]" /></div>
            <button onClick={() => setIdx((idx + 1) % items.length)} aria-label="Next"><ChevronRight className="size-8" /></button>
          </div>
        </div>
      )}
    </>
  );
}

/* ---------- Specs ---------- */
export function SpecTable({ rows }: { rows: SpecRow[] }) {
  const { l, locale } = useI18n();
  return (
    <dl className="border-t border-border">
      {rows.map((r, i) => (
        <div key={i} className="grid grid-cols-2 gap-4 border-b border-border py-5 md:grid-cols-12">
          <dt className="t-eyebrow text-muted-foreground md:col-span-5">{l(r.key)}</dt>
          <dd className="t-spec md:col-span-7 md:text-right">
            {r.validated && r.value ? <span className="font-display text-2xl">{r.value} <span className="text-muted-foreground">{r.unit}</span></span>
              : <span className="text-muted-foreground">— {locale === "it" ? "in attesa di dato validato" : "awaiting validated value"}{r.unit ? ` (${r.unit})` : ""}</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* ---------- Brochure ---------- */
export function BrochureCard({ b }: { b: Brochure }) {
  const { l, locale } = useI18n();
  return (
    <div className="flex flex-col justify-between gap-8 border border-border p-8">
      <div>
        <p className="t-eyebrow text-muted-foreground">PDF · {b.language.join(" / ")}</p>
        <p className="t-h3 mt-3">{l(b.title)}</p>
      </div>
      {b.pdfUrl ? (
        <a href={b.pdfUrl} className={btnClass("solid")} download><Download className="size-4" /> Download</a>
      ) : (
        <div>
          <button disabled aria-disabled className={btnClass("outline")}><Download className="size-4" /> {locale === "it" ? "Non ancora disponibile" : "Not yet available"}</button>
          <p className="t-spec mt-3 text-muted-foreground">{locale === "it" ? "Si attiva solo al caricamento del PDF corretto per questo modello." : "Activates only once this model's correct PDF is uploaded."}</p>
        </div>
      )}
    </div>
  );
}

/* ---------- Press ---------- */
export function PressCard({ p }: { p: PressItem }) {
  const { l } = useI18n();
  return (
    <article className="flex flex-col gap-4 border-t border-foreground pt-6">
      <div className="flex items-center justify-between"><span className="t-eyebrow">{p.outlet}</span>{p.placeholder && <SampleBadge>Placeholder</SampleBadge>}</div>
      <h3 className="t-h3">{l(p.title)}</h3>
      {p.url ? <a href={p.url} target="_blank" rel="noopener noreferrer" className="t-eyebrow inline-flex items-center gap-2 text-accent">Source <ExternalLink className="size-3" /></a>
        : <span className="t-spec text-muted-foreground">Outbound source link pending verification</span>}
    </article>
  );
}

/* ---------- Editorial tiles ---------- */
export function ArticleCard({ a, big }: { a: Article; big?: boolean }) {
  const { l } = useI18n();
  return (
    <article className="group">
      <Media slot={{ id: `journal-${a.slug}`, alt: a.title, kind: "photo", aspect: big ? "wide" : "tall" }} />
      <div className="mt-5 flex items-center gap-3"><SampleBadge /><span className="t-eyebrow text-muted-foreground">{l(a.category)} · {a.date}</span></div>
      <h3 className={cn("mt-3", big ? "t-h2" : "t-h3")}>{l(a.title)}</h3>
      <p className="mt-3 text-muted-foreground">{l(a.excerpt)}</p>
    </article>
  );
}

const catLabel = { owner: { it: "Armatore", en: "Owner" }, charter: { it: "Charter / Noleggio", en: "Charter / Rental" }, dealer: { it: "Dealer", en: "Dealer" }, professional: { it: "Professional", en: "Professional" } };
export const caseCategoryLabel = catLabel;

export function CaseCard({ c, big }: { c: CaseStudy; big?: boolean }) {
  const { l } = useI18n();
  return (
    <Link to="/case-studies/$slug" params={{ slug: c.slug }} className="group block">
      <div className="overflow-hidden"><Media slot={{ id: `case-${c.slug}`, alt: c.title, kind: "photo", aspect: big ? "wide" : "tall" }} className="transition-transform duration-700 group-hover:scale-[1.03]" /></div>
      <div className="mt-5 flex flex-wrap items-center gap-3"><SampleBadge>Fictional example</SampleBadge><span className="t-eyebrow text-muted-foreground">{l(catLabel[c.category])} · {c.modelId.toUpperCase()}</span></div>
      <h3 className={cn("mt-3 group-hover:text-accent", big ? "t-h2" : "t-h3")}>{l(c.title)}</h3>
      <p className="mt-3 max-w-xl text-muted-foreground">{l(c.summary)}</p>
    </Link>
  );
}

/* ---------- Testimonial ---------- */
export function Quote({ text, by, consent }: { text: string; by: string; consent: boolean }) {
  return (
    <figure className="max-w-4xl">
      <blockquote className="t-h2 font-light">“{text}”</blockquote>
      <figcaption className="t-eyebrow mt-8 flex flex-wrap items-center gap-3 text-muted-foreground">— {by} {!consent && <SampleBadge>No consent on file · not publishable</SampleBadge>}</figcaption>
    </figure>
  );
}

/* ---------- Big fleet panel ---------- */
export function ModelPanel({ boat, index }: { boat: Boat; index: number }) {
  const { l, t } = useI18n();
  const flip = index % 2 === 1;
  return (
    <article className={cn("grid items-end gap-8 md:grid-cols-12", index > 0 && "mt-24 md:mt-40")}>
      <Link to="/fleet/$model" params={{ model: boat.id }} className={cn("group block overflow-hidden md:col-span-9", flip && "md:order-2 md:col-start-4")}>
        <Media slot={{ ...boat.gallery[0]!, aspect: "wide" }} className="transition-transform duration-1000 group-hover:scale-[1.02]" />
      </Link>
      <div className={cn("md:col-span-3", flip && "md:order-1 md:col-start-1 md:row-start-1")}>
        <span className="t-spec text-muted-foreground">0{index + 1} / 04</span>
        <h3 className="t-mega mt-2 md:-ml-1">{boat.name}</h3>
        <p className="t-lead mt-4 text-muted-foreground">{l(boat.tagline)}</p>
        <Link to="/fleet/$model" params={{ model: boat.id }} className={cn(btnClass("ghost"), "mt-6 !px-0")}>{t("cta.discover")} →</Link>
      </div>
    </article>
  );
}

/* ---------- Campaign highlight ---------- */
export function CampaignHighlight() {
  const { l, t } = useI18n();
  const [visible, setVisible] = useState(false);
  const c = activeCampaign(campaigns, new Date());
  useEffect(() => {
    if (!c) return;
    const d = localStorage.getItem(`breva.campaign.${c.id}`);
    const s = sessionStorage.getItem(`breva.campaign.${c.id}`) === "1";
    if (!isCapped(c, d ? Number(d) : null, s, Date.now())) {
      const timer = setTimeout(() => setVisible(true), 900);
      return () => clearTimeout(timer);
    }
    return undefined;
  }, [c]);
  if (!c || !visible) return null;
  const dismiss = () => {
    localStorage.setItem(`breva.campaign.${c.id}`, String(Date.now()));
    sessionStorage.setItem(`breva.campaign.${c.id}`, "1");
    setVisible(false);
  };
  return (
    <aside role="region" aria-label="Editorial highlight" className="surface-dark rise fixed bottom-4 left-4 right-4 z-30 max-w-md border border-border !bg-midnight shadow-panel md:bottom-8 md:left-auto md:right-8">
      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">{c.sample && <SampleBadge />}<span className="t-eyebrow text-cobalt-soft">{l(c.eyebrow)}</span></div>
          <button onClick={dismiss} aria-label={t("common.close")} className="text-titanium hover:text-ivory"><X className="size-5" /></button>
        </div>
        <p className="t-h3 mt-5">{l(c.title)}</p>
        <p className="mt-3 text-sm text-muted-foreground">{l(c.body)}</p>
        <div className="mt-6 flex items-center gap-4">
          <Link to={c.ctaTo as never} onClick={dismiss} className={btnClass("accent")}>{l(c.ctaLabel)}</Link>
          <span className="t-spec text-titanium">cap: {c.frequency} · p{c.priority}</span>
        </div>
      </div>
    </aside>
  );
}

/* ---------- Lead form (honest: not connected) ---------- */
export function LeadForm({ topic }: { topic?: string }) {
  const { locale } = useI18n();
  const [note, setNote] = useState(false);
  const it = locale === "it";
  const field = "w-full border-b border-input bg-transparent py-3 outline-none placeholder:text-muted-foreground focus:border-accent";
  return (
    <form onSubmit={(e) => { e.preventDefault(); setNote(true); }} className="grid gap-6 md:grid-cols-2" aria-describedby="lead-note">
      <label className="block"><span className="t-eyebrow text-muted-foreground">{it ? "Nome" : "Name"}</span><input required className={field} name="name" autoComplete="name" /></label>
      <label className="block"><span className="t-eyebrow text-muted-foreground">Email</span><input required type="email" className={field} name="email" autoComplete="email" /></label>
      <label className="block"><span className="t-eyebrow text-muted-foreground">{it ? "Modello" : "Model"}</span>
        <select className={field} defaultValue={topic ?? ""}><option value="">—</option><option>B630</option><option>B800</option><option>B1100</option><option>B1300</option></select></label>
      <label className="block"><span className="t-eyebrow text-muted-foreground">{it ? "Paese" : "Country"}</span><input className={field} name="country" autoComplete="country-name" /></label>
      <label className="block md:col-span-2"><span className="t-eyebrow text-muted-foreground">{it ? "Messaggio" : "Message"}</span><textarea rows={3} className={field} /></label>
      <label className="flex items-start gap-3 text-sm text-muted-foreground md:col-span-2"><input type="checkbox" required className="mt-1" /> {it ? "Acconsento al trattamento dei dati (testo privacy da fornire)." : "I consent to data processing (privacy text to be supplied)."}</label>
      <div className="md:col-span-2">
        <button type="submit" className={btnClass("solid")}>{it ? "Invia richiesta" : "Send request"} →</button>
        <p id="lead-note" role="status" className={cn("t-spec mt-4", note ? "text-destructive" : "text-muted-foreground")}>
          {note ? (it ? "Prototipo: il modulo non è collegato. Nessun dato è stato inviato." : "Prototype: this form is not connected. Nothing was sent.")
            : (it ? "Modulo dimostrativo — non invia dati." : "Demonstration form — sends no data.")}
        </p>
      </div>
    </form>
  );
}