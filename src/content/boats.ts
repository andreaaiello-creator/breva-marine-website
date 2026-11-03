import assetIndex from "./asset-index.json";
import type { Boat, Brochure, MediaSlot, PressItem, SpecRow } from "./types";

const ph = (id: string, it: string, en: string, aspect: MediaSlot["aspect"] = "wide", kind: MediaSlot["kind"] = "photo"): MediaSlot => ({ id, alt: { it, en }, kind, aspect });

/** Spec keys are real categories; values stay empty until validated by BREVA engineering. */
const specTemplate = (): SpecRow[] => [
  { key: { it: "Lunghezza fuori tutto", en: "Length overall" }, unit: "m", validated: false },
  { key: { it: "Larghezza massima", en: "Maximum beam" }, unit: "m", validated: false },
  { key: { it: "Dislocamento", en: "Displacement" }, unit: "kg", validated: false },
  { key: { it: "Potenza massima", en: "Maximum power" }, unit: "hp", validated: false },
  { key: { it: "Capacità carburante", en: "Fuel capacity" }, unit: "L", validated: false },
  { key: { it: "Persone omologate", en: "Certified persons" }, validated: false },
  { key: { it: "Categoria CE", en: "CE category" }, validated: false },
  { key: { it: "Materiale tubolari", en: "Tube material" }, validated: false },
];

const template = (id: Boat["id"], name: string, populated = false): Boat => ({
  id, name, populated,
  tagline: { it: "Testo di posizionamento da fornire", en: "Positioning line to be supplied" },
  intro: { it: "Introduzione editoriale del modello in attesa del testo ufficiale BREVA.", en: "Editorial model introduction awaiting official BREVA copy." },
  highlights: [1, 2, 3].map((n) => ({
    title: { it: `Punto di forza ${n}`, en: `Highlight ${n}` },
    body: { it: "Descrizione da validare con il marketing.", en: "Description to be validated by marketing." },
  })),
  specs: specTemplate(),
  power: [
    { title: { it: "Motorizzazioni", en: "Engine options" }, body: { it: "Opzioni motore da confermare.", en: "Engine options to be confirmed." } },
    { title: { it: "Elettronica", en: "Electronics" }, body: { it: "Pacchetto elettronico da confermare.", en: "Electronics package to be confirmed." } },
  ],
  layouts: [
    { id: "a", name: { it: "Versione A", en: "Version A" }, media: ph(`${id}-plan-a`, "Pianta versione A", "Version A plan", "wide", "plan") },
    { id: "b", name: { it: "Versione B", en: "Version B" }, media: ph(`${id}-plan-b`, "Pianta versione B", "Version B plan", "wide", "plan") },
  ],
  gallery: [
    ph(`${id}-ext-1`, `${name} esterno, navigazione`, `${name} exterior, underway`, "cinema"),
    ph(`${id}-ext-2`, `${name} esterno, prua`, `${name} exterior, bow`, "tall"),
    ph(`${id}-int-1`, `${name} pozzetto`, `${name} cockpit`, "square"),
    ph(`${id}-int-2`, `${name} consolle`, `${name} console`, "wide"),
    ph(`${id}-det-1`, `${name} dettaglio`, `${name} detail`, "tall"),
    ph(`${id}-ext-3`, `${name} all'ancora`, `${name} at anchor`, "wide"),
  ],
  videos: [ph(`${id}-video-1`, `${name} video in navigazione`, `${name} running video`, "cinema", "video")],
});


// Use only already-imported official BREVA assets; no Drive IDs or credentials exposed.
const galleryFromAssets = (model: Boat["id"], name: string): MediaSlot[] => {
  const entries = assetIndex.assets.filter((asset) => asset.model === model && (asset.category === "navigation" || asset.category === "details" || (model === "b1100" && asset.category === "static")));
  const ordered = [...entries.filter((asset) => (asset.category === "navigation" || asset.category === "static") && !/(?:^|[-_])det(?:[-_]|$)/i.test(asset.filename)), ...entries.filter((asset) => asset.category === "details" || /(?:^|[-_])det(?:[-_]|$)/i.test(asset.filename))];
  return ordered.map((asset, i) => ({
    id: `${model}-official-${i + 1}`,
    alt: {
      it: `${name} — fotografia ufficiale ${asset.category === "static" ? "illustrativa" : asset.category === "details" ? "di dettaglio" : "in navigazione"}`,
      en: `${name} — official ${asset.category === "static" ? "concept" : asset.category === "details" ? "detail" : "underway"} photograph`,
    },
    kind: "photo" as const,
    aspect: (i === 0 ? "cinema" : i % 3 === 1 ? "tall" : "wide") as MediaSlot["aspect"],
    src: asset.src.startsWith("/public/") ? asset.src.slice("/public".length) : asset.src,
  }));
};

const b800 = template("b800", "B800", true);
b800.tagline = { it: "Il centro della gamma. Il riferimento della famiglia.", en: "The heart of the range. The family's benchmark." };
b800.intro = {
  it: "Il B800 è la pagina modello di riferimento di questo prototipo: struttura completa, contenuti editoriali pronti a ricevere testi, fotografie e dati tecnici ufficiali validati da BREVA.",
  en: "The B800 is this prototype's reference model page: full structure, editorial slots ready for official BREVA copy, photography and validated technical data.",
};
b800.highlights = [
  { title: { it: "Proporzioni", en: "Proportion" }, body: { it: "Spazio per il racconto del design esterno — testo da fornire.", en: "Slot for the exterior design story — copy to be supplied." } },
  { title: { it: "Vita a bordo", en: "Life on board" }, body: { it: "Spazio per il racconto di pozzetto e prendisole — testo da fornire.", en: "Slot for cockpit and sun-pad story — copy to be supplied." } },
  { title: { it: "Carena", en: "Hull" }, body: { it: "Spazio per il racconto della carena — nessun dato inventato.", en: "Slot for the hull story — no invented data." } },
];

const b1300 = template("b1300", "B1300", true);
b1300.tagline = { it: "Spazio, potenza e libertà di vivere il mare.", en: "Space, power and freedom on the water." };
b1300.intro = {
  it: "Il B1300 interpreta la navigazione a grande raggio con ampie aree da vivere all'aperto. Esplora le fotografie ufficiali e scopri il carattere di questa ammiraglia BREVA.",
  en: "The B1300 brings generous open-air living spaces to long-range cruising. Explore the official photography and discover the character of this BREVA flagship.",
};
b1300.highlights = [
  { title: { it: "Spazi a bordo", en: "Onboard spaces" }, body: { it: "Ambienti pensati per condividere il tempo in mare, dalla navigazione alle soste.", en: "Spaces made for shared moments, underway and at anchor." } },
  { title: { it: "Identità", en: "Identity" }, body: { it: "Linee riconoscibili e dettagli progettati attorno all'esperienza di bordo.", en: "Distinctive lines and details shaped around the onboard experience." } },
  { title: { it: "Configurazione", en: "Configuration" }, body: { it: "Motorizzazioni e dotazioni vengono definite sulla base della configurazione scelta.", en: "Propulsion and equipment are specified according to the selected configuration." } },
];
b1300.power = [
  { title: { it: "Motorizzazioni", en: "Propulsion" }, body: { it: "Configurazioni plurimotore disponibili, da verificare in funzione dell'allestimento.", en: "Multiple-engine configurations, subject to confirmation for each specification." } },
  { title: { it: "Strumentazione", en: "Helm technology" }, body: { it: "Soluzioni elettroniche e di navigazione configurabili.", en: "Configurable electronic and navigation solutions." } },
];
b800.intro = {
  it: "Il B800 unisce un profilo sportivo a spazi pensati per trascorrere la giornata in mare. Scopri le fotografie ufficiali della barca in navigazione e i dettagli del suo design.",
  en: "The B800 pairs a sporting profile with spaces designed for a full day on the water. Discover official underway photography and details of its design.",
};
b800.highlights = [
  { title: { it: "Design", en: "Design" }, body: { it: "Un'identità BREVA riconoscibile in ogni prospettiva.", en: "A distinct BREVA identity from every angle." } },
  { title: { it: "Vita a bordo", en: "Life on board" }, body: { it: "Spazi esterni dedicati al relax e alla convivialità.", en: "Outdoor spaces for relaxation and time together." } },
  { title: { it: "Navigazione", en: "Underway" }, body: { it: "Un modello da scoprire attraverso le immagini ufficiali in mare.", en: "Explore the model through its official underway photography." } },
];
// Keep a stable, reviewed-by-filename shortlist instead of relying on JSON scan order.
// Hero remains provisional pending visual inspection of the original compositions.
const b800Preferred = [
  "bv800-nav-05732-2-UM9sOdkn.webp",
  "bv800-nav-05663-2-ZCM2nS9n.webp",
  "bv800-nav-05582-2-sxbgKyVy.webp",
  "bv800-nav-05726-2-gBnk__8K.webp",
  "bv800-nav-05535-2-I66SkUjr.webp",
  "bv800-nav-05611-2-kcUgCHSb.webp",
  "bv800-nav-05760-2-U3QFuIq6.webp",
  "bv800-nav-04530-2-xeMjZB0j.webp",
];
const b800Imported = galleryFromAssets("b800", "B800");
b800.gallery = b800Preferred.map((filename) =>
  b800Imported.find((slot) => slot.src?.endsWith("/" + filename))
).filter((slot): slot is MediaSlot => Boolean(slot));

b1300.gallery = galleryFromAssets("b1300", "B1300").slice(0, 10);
const b630 = template("b630", "B630", true);
b630.tagline = { it: "Dimensioni compatte. Spirito BREVA.", en: "Compact proportions. BREVA spirit." };
b630.intro = {
  it: "Il BREVA B630 interpreta l'uscita in mare con linee sportive, dimensioni agili e uno stile essenziale. Scopri le immagini ufficiali, le finiture e le possibilità di personalizzazione.",
  en: "The BREVA B630 brings sporty lines, agile dimensions and a clean design to days on the water. Explore official photography, finishes and customization options.",
};
b630.highlights = [
  { title: { it: "Agilità", en: "Agility" }, body: { it: "Una proposta compatta per vivere il mare con semplicità.", en: "A compact choice for uncomplicated days at sea." } },
  { title: { it: "Spazi", en: "Spaces" }, body: { it: "Layout pensato per sfruttare con cura gli spazi a bordo.", en: "A layout designed to make considered use of onboard space." } },
  { title: { it: "Personalità", en: "Identity" }, body: { it: "Materiali e colori per un'imbarcazione che rispecchia il tuo stile.", en: "Materials and colours to express your personal style." } },
];
const b630Photos = galleryFromAssets("b630", "B630");
if (b630Photos.length) b630.gallery = b630Photos.slice(0, 12);
const b1100 = template("b1100", "B1100", true);
b1100.tagline = { it: "Più modi di vivere il mare.", en: "More ways to experience the sea." };
b1100.intro = {
  it: "Il BREVA B1100 nasce con una filosofia di configurazione flessibile. Le diverse interpretazioni del ponte consentono di scegliere il modo di vivere gli spazi a bordo. Le immagini di progetto sono illustrative.",
  en: "The BREVA B1100 follows a flexible approach to deck configuration. Different arrangements make room for different ways of enjoying life onboard. Concept visuals are illustrative.",
};
b1100.highlights = [
  { title: { it: "Versioni", en: "Versions" }, body: { it: "Open, Comfort Cruiser, Dinette e Sunbed: soluzioni da esplorare e verificare in fase di configurazione.", en: "Open, Comfort Cruiser, Dinette and Sunbed: configurations to explore and confirm." } },
  { title: { it: "Design", en: "Design" }, body: { it: "Un progetto che interpreta il rapporto tra navigazione e vita all'aperto.", en: "A design shaped around cruising and outdoor living." } },
  { title: { it: "Su misura", en: "Made to fit" }, body: { it: "Dotazioni e finiture vengono definite insieme al team BREVA.", en: "Equipment and finishes are specified with the BREVA team." } },
];
const b1100Photos = galleryFromAssets("b1100", "B1100");
if (b1100Photos.length) b1100.gallery = b1100Photos.slice(0, 12);
export const boats: Boat[] = [b630, b800, b1100, b1300];
export const getBoat = (id: string) => boats.find((b) => b.id === id.toLowerCase());

/** pdfUrl stays undefined until the correct model-specific brochure is uploaded. */
const brochureFiles: Record<Boat["id"], string> = {
  b630: "/assets/breva/b630/brochures/Brochure_modello%20630_2026.pdf",
  b800: "/assets/breva/b800/brochures/Brochure_modello%20800_2026.pdf",
  b1100: "/assets/breva/b1100/brochures/Breva%201100_brochure.pdf",
  b1300: "/assets/breva/b1300/brochures/Breva%201300_Brochure-2026.pdf",
};
export const brochures: Brochure[] = boats.map((b) => ({
  modelId: b.id, title: { it: `Brochure ${b.name}`, en: `${b.name} brochure` },
  language: ["IT", "EN"], pdfUrl: brochureFiles[b.id],
}));

export const press: PressItem[] = [
  { id: "p1", modelId: "b800", outlet: "Testata da definire", title: { it: "Prova in mare — articolo da collegare", en: "Sea test — article to be linked" }, placeholder: true },
  { id: "p2", modelId: "b800", outlet: "Testata da definire", title: { it: "Recensione — fonte da verificare", en: "Review — source to be verified" }, placeholder: true },
];