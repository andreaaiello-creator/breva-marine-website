import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Locale = "it" | "en";
export const LOCALES: Locale[] = ["it", "en"]; // extend here (e.g. "de", "fr") + add dictionary keys
export const DEFAULT_LOCALE: Locale = "it";

/** Localized string. Any locale missing falls back to Italian. */
export type L = { it: string; en?: string };

const dict = {
  "nav.fleet": { it: "Flotta", en: "Fleet" },
  "nav.about": { it: "Il nostro mondo", en: "Our World" },
  "nav.cases": { it: "Storie", en: "Stories" },
  "nav.journal": { it: "Journal", en: "Journal" },
  "nav.experience": { it: "Prove in mare", en: "Sea Trials" },
  "nav.professional": { it: "Professional", en: "Professional" },
  "nav.dealers": { it: "Dealer", en: "Dealers" },
  "nav.contact": { it: "Contatti", en: "Contact" },
  "nav.portal": { it: "Area Dealer", en: "Dealer Portal" },
  "cta.seatrial": { it: "Richiedi una prova in mare", en: "Request a sea trial" },
  "cta.configure": { it: "Configura", en: "Configure" },
  "cta.dealer": { it: "Trova un dealer", en: "Find a dealer" },
  "cta.discover": { it: "Scopri il modello", en: "Discover the model" },
  "cta.explore": { it: "Esplora la flotta", en: "Explore the fleet" },
  "cta.read": { it: "Leggi", en: "Read" },
  "cta.contact": { it: "Contattaci", en: "Contact us" },
  "common.soon": { it: "In arrivo", en: "Coming soon" },
  "common.placeholder": { it: "Contenuto segnaposto", en: "Content placeholder" },
  "common.sample": { it: "ESEMPIO", en: "SAMPLE" },
  "common.close": { it: "Chiudi", en: "Close" },
  "common.menu": { it: "Menu", en: "Menu" },
  "home.kicker": { it: "Cantiere italiano · RIB e yacht", en: "Italian shipyard · RIBs & yachts" },
  "home.title": { it: "Progettati per il mare aperto.", en: "Designed for open water." },
  "home.lead": { it: "Quattro modelli, un solo linguaggio: prestazioni, proporzione, artigianalità italiana.", en: "Four models, one language: performance, proportion, Italian craft." },
  "fleet.title": { it: "La flotta", en: "The fleet" },
  "fleet.lead": { it: "Da B630 a B1300. Ogni modello è presentato a tutta scala, come merita.", en: "From B630 to B1300. Each model shown at full scale, as it deserves." },
  "footer.note": { it: "Prototipo di design — non pubblicato. Nessun dato è inviato.", en: "Design prototype — unpublished. No data is sent." },
} satisfies Record<string, L>;

export type DictKey = keyof typeof dict;

type Ctx = { locale: Locale; setLocale: (l: Locale) => void };
const I18nCtx = createContext<Ctx>({ locale: DEFAULT_LOCALE, setLocale: () => {} });

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  useEffect(() => {
    const saved = localStorage.getItem("breva.locale") as Locale | null;
    if (saved && LOCALES.includes(saved)) setLocaleState(saved);
  }, []);
  useEffect(() => { document.documentElement.lang = locale; }, [locale]);
  const setLocale = (l: Locale) => { setLocaleState(l); localStorage.setItem("breva.locale", l); };
  return <I18nCtx.Provider value={{ locale, setLocale }}>{children}</I18nCtx.Provider>;
}

export function useI18n() {
  const { locale, setLocale } = useContext(I18nCtx);
  const t = (k: DictKey) => (dict[k] as L)[locale] ?? dict[k].it;
  const l = (v: L) => v[locale] ?? v.it;
  return { locale, setLocale, t, l };
}