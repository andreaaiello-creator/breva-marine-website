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

export const boats: Boat[] = [template("b630", "B630"), b800, template("b1100", "B1100"), template("b1300", "B1300")];
export const getBoat = (id: string) => boats.find((b) => b.id === id.toLowerCase());

/** pdfUrl stays undefined until the correct model-specific brochure is uploaded. */
export const brochures: Brochure[] = boats.map((b) => ({
  modelId: b.id, title: { it: `Brochure ${b.name}`, en: `${b.name} brochure` }, language: ["IT", "EN"],
}));

export const press: PressItem[] = [
  { id: "p1", modelId: "b800", outlet: "Testata da definire", title: { it: "Prova in mare — articolo da collegare", en: "Sea test — article to be linked" }, placeholder: true },
  { id: "p2", modelId: "b800", outlet: "Testata da definire", title: { it: "Recensione — fonte da verificare", en: "Review — source to be verified" }, placeholder: true },
];