import type { L } from "@/lib/i18n";

/** Every media slot is a placeholder until official BREVA media is supplied. */
export type MediaSlot = {
  id: string;
  alt: L;
  kind: "photo" | "video" | "plan";
  /** Absolute URL of licensed official media. Undefined = render placeholder. */
  src?: string;
  aspect?: "wide" | "tall" | "square" | "cinema";
};

export type SpecRow = { key: L; value?: string; unit?: string; validated: boolean };

export type Brochure = { modelId: string; title: L; pdfUrl?: string; language: string[] };

export type PressItem = {
  id: string; modelId?: string; outlet: string; title: L; url?: string; date?: string; placeholder: boolean;
};

export type Boat = {
  id: "b630" | "b800" | "b1100" | "b1300";
  name: string;
  /** Fully worked editorial content only where safe; others reuse template with placeholders. */
  populated: boolean;
  tagline: L;
  intro: L;
  highlights: { title: L; body: L }[];
  specs: SpecRow[];
  power: { title: L; body: L }[];
  layouts: { id: string; name: L; media: MediaSlot }[];
  gallery: MediaSlot[];
  videos: MediaSlot[];
};

export type Campaign = {
  id: string; sample: boolean; priority: number;
  startsAt: string; endsAt: string;
  frequency: "once" | "session" | "daily";
  eyebrow: L; title: L; body: L; ctaLabel: L; ctaTo: string;
};

export type CaseCategory = "owner" | "charter" | "dealer" | "professional";
export type CaseStudy = {
  slug: string; fictional: true; category: CaseCategory; featured: boolean;
  title: L; summary: L; modelId: Boat["id"]; configuration: L;
  challenge: L; experience: L; outcomes: L[];
  quote?: { text: L; attribution: L; consentOnFile: false };
};

export type Article = { slug: string; sample: true; category: L; title: L; excerpt: L; date: string };

export type Dealer = { id: string; sample: true; name: string; region: L; services: L[] };