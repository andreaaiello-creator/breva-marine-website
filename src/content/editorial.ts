import type { Article, Campaign, CaseStudy, Dealer } from "./types";

export const campaigns: Campaign[] = [
  {
    id: "sample-boat-show-2027", sample: true, priority: 10,
    startsAt: "2026-01-01T00:00:00Z", endsAt: "2027-12-31T23:59:59Z", frequency: "session",
    eyebrow: { it: "Highlight editoriale · ESEMPIO", en: "Editorial highlight · SAMPLE" },
    title: { it: "Esempio di notizia importante", en: "Example of important news" },
    body: { it: "Questo è un contenuto dimostrativo. In produzione, il CMS mostrerà qui solo annunci rilevanti con data di inizio, fine e priorità.", en: "This is demonstration content. In production the CMS shows only relevant announcements here, with start, end and priority." },
    ctaLabel: { it: "Vai al Journal", en: "Go to Journal" }, ctaTo: "/journal",
  },
];

export const caseStudies: CaseStudy[] = [
  {
    slug: "esempio-armatore-weekend", fictional: true, category: "owner", featured: true, modelId: "b800",
    title: { it: "Esempio: weekend lungo la costa", en: "Example: a coastal weekend" },
    summary: { it: "Storia fittizia che mostra il modello di case study per armatori.", en: "Fictional story demonstrating the owner case-study template." },
    configuration: { it: "Configurazione da definire", en: "Configuration to be defined" },
    challenge: { it: "Segnaposto: la necessità dell'armatore.", en: "Placeholder: the owner's need." },
    experience: { it: "Segnaposto: il racconto dell'esperienza a bordo.", en: "Placeholder: the on-board experience narrative." },
    outcomes: [{ it: "Risultato segnaposto 1", en: "Placeholder outcome 1" }, { it: "Risultato segnaposto 2", en: "Placeholder outcome 2" }],
    quote: { text: { it: "Citazione dimostrativa — pubblicabile solo con consenso firmato.", en: "Demonstration quote — publishable only with signed consent." }, attribution: { it: "Persona fittizia", en: "Fictional person" }, consentOnFile: false },
  },
  {
    slug: "esempio-charter", fictional: true, category: "charter", featured: true, modelId: "b1100",
    title: { it: "Esempio: flotta charter stagionale", en: "Example: seasonal charter fleet" },
    summary: { it: "Storia fittizia per operatori di noleggio.", en: "Fictional story for rental operators." },
    configuration: { it: "Da definire", en: "To be defined" },
    challenge: { it: "Segnaposto.", en: "Placeholder." }, experience: { it: "Segnaposto.", en: "Placeholder." },
    outcomes: [{ it: "Risultato segnaposto", en: "Placeholder outcome" }],
  },
  {
    slug: "esempio-dealer", fictional: true, category: "dealer", featured: false, modelId: "b630",
    title: { it: "Esempio: lancio presso un dealer", en: "Example: a dealer launch" },
    summary: { it: "Storia fittizia per la rete dealer.", en: "Fictional story for the dealer network." },
    configuration: { it: "Da definire", en: "To be defined" },
    challenge: { it: "Segnaposto.", en: "Placeholder." }, experience: { it: "Segnaposto.", en: "Placeholder." },
    outcomes: [{ it: "Risultato segnaposto", en: "Placeholder outcome" }],
  },
  {
    slug: "esempio-professional", fictional: true, category: "professional", featured: false, modelId: "b1300",
    title: { it: "Esempio: impiego professionale", en: "Example: professional use" },
    summary: { it: "Storia fittizia per utilizzi professionali.", en: "Fictional story for professional use." },
    configuration: { it: "Da definire", en: "To be defined" },
    challenge: { it: "Segnaposto.", en: "Placeholder." }, experience: { it: "Segnaposto.", en: "Placeholder." },
    outcomes: [{ it: "Risultato segnaposto", en: "Placeholder outcome" }],
  },
];

export const articles: Article[] = [
  { slug: "sample-1", sample: true, date: "2026-10-01", category: { it: "Cantiere", en: "Shipyard" }, title: { it: "Titolo articolo di esempio", en: "Sample article title" }, excerpt: { it: "Estratto dimostrativo del Journal.", en: "Demonstration Journal excerpt." } },
  { slug: "sample-2", sample: true, date: "2026-09-12", category: { it: "Eventi", en: "Events" }, title: { it: "Esempio di evento", en: "Event example" }, excerpt: { it: "Data e luogo da confermare.", en: "Date and venue to be confirmed." } },
  { slug: "sample-3", sample: true, date: "2026-08-20", category: { it: "Design", en: "Design" }, title: { it: "Esempio di storia di design", en: "Design story example" }, excerpt: { it: "Testo segnaposto.", en: "Placeholder text." } },
];

/** No real locations: names are explicit "Sample dealer" entries. */
export const dealers: Dealer[] = [
  { id: "d1", sample: true, name: "Sample Dealer A", region: { it: "Regione di esempio — Nord", en: "Sample region — North" }, services: [{ it: "Vendita", en: "Sales" }, { it: "Prove in mare", en: "Sea trials" }] },
  { id: "d2", sample: true, name: "Sample Dealer B", region: { it: "Regione di esempio — Sud", en: "Sample region — South" }, services: [{ it: "Vendita", en: "Sales" }, { it: "Assistenza", en: "Service" }] },
  { id: "d3", sample: true, name: "Sample Dealer C", region: { it: "Regione di esempio — Estero", en: "Sample region — International" }, services: [{ it: "Vendita", en: "Sales" }] },
];