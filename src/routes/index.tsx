import { createFileRoute, Link } from "@tanstack/react-router";
import { useI18n } from "@/lib/i18n";
import { seo } from "@/lib/seo";
import { CTA } from "@/components/site/primitives";

const brandLogo =
  "/assets/breva/brand/logos/LOGHI%20E%20SCRITTE/Logo%20%2B%20marchio%20registrato/Breva_marchioregistrato_white.png";

const images = {
  hero: "/assets/breva/b1300/navigation/breva-1300-0005-30g1O1bA.webp",
  underway: "/assets/breva/b1300/navigation/breva-1300-0476-tAXJaZbd.webp",
  dayOnTheWater: "/assets/breva/b800/navigation/bv800-nav-05582-2-sxbgKyVy.webp",
} as const;

// Photographs are from BREVA's imported official marketing library.
// B1100 is intentionally labelled as a project render, not a sea-trial photograph.
const featuredModels = [
  {
    id: "b630",
    number: "01",
    photo: "/assets/breva/b630/navigation/bv630-nav-05984-DTGvy25c.webp",
    alt: { it: "BREVA B630 vista dall'alto in mare", en: "BREVA B630 viewed from above on the water" },
    caption: { it: "Compatto. Essenziale. BREVA.", en: "Compact. Essential. BREVA." },
    objectPosition: "center 54%",
    concept: false,
  },
  {
    id: "b800",
    number: "02",
    photo: "/assets/breva/b800/navigation/bv800-nav-05732-2-UM9sOdkn.webp",
    alt: { it: "BREVA B800 in navigazione lungo la costa", en: "BREVA B800 cruising along the coast" },
    caption: { it: "Equilibrio e carattere.", en: "Balance and character." },
    objectPosition: "center 64%",
    concept: false,
  },
  {
    id: "b1100",
    number: "03",
    photo: "/assets/breva/b1100/static/breva-1100-1-15S04bh7.webp",
    alt: { it: "BREVA B1100, render illustrativo del progetto", en: "BREVA B1100, illustrative project rendering" },
    caption: { it: "Più modi di vivere il mare.", en: "More ways to live the sea." },
    objectPosition: "center",
    concept: true,
  },
  {
    id: "b1300",
    number: "04",
    photo: "/assets/breva/b1300/navigation/breva-1300-0411-8G9mijVD.webp",
    alt: { it: "BREVA B1300 in navigazione", en: "BREVA B1300 underway" },
    caption: { it: "Lo spazio incontra la libertà.", en: "Space meets freedom." },
    objectPosition: "center 54%",
    concept: false,
  },
] as const;

export const Route = createFileRoute("/")({
  head: () =>
    seo(
      "BREVA Marine | Italian Design on the Water",
      "Scopri la gamma BREVA Marine: B630, B800, B1100 e B1300. Design italiano, fotografie ufficiali e prove in mare.",
      "/",
    ),
  component: Home,
});

function Home() {
  const { locale, t } = useI18n();
  const it = locale === "it";

  return (
    <>
      <section className="surface-dark relative isolate min-h-[92svh] overflow-hidden bg-abyss">
        <img
          src={images.hero}
          alt={it ? "BREVA B1300 in navigazione sul mare" : "BREVA B1300 cruising at sea"}
          className="absolute inset-0 h-full w-full object-cover object-[56%_center]"
          fetchPriority="high"
          decoding="async"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07131e]/95 via-[#07131e]/35 to-[#07131e]/25" aria-hidden="true" />
        <div className="container-breva relative flex min-h-[92svh] flex-col justify-end pb-16 pt-44 md:pb-24">
          <p className="t-eyebrow tracking-[0.25em] text-white/80">
            {it ? "Design italiano · Spirito marino" : "Italian design · Marine spirit"}
          </p>
          <h1 className="mt-7">
            <span className="sr-only">BREVA Marine</span>
            <img
              src={brandLogo}
              alt=""
              aria-hidden="true"
              className="block h-auto w-[min(68vw,330px)] object-contain object-left md:w-[430px]"
              width={1242}
              height={700}
              decoding="async"
            />
          </h1>
          <p className="mt-5 max-w-xl font-display text-2xl font-light leading-snug text-white md:mt-8 md:text-4xl">
            {it ? "Il tuo modo di vivere il mare." : "Your way of living the sea."}
          </p>
          <div className="mt-8 flex flex-wrap gap-3 md:mt-10">
            <CTA to="/fleet" variant="solid">{it ? "Scopri la gamma" : "Explore the fleet"}</CTA>
            <CTA to="/experience" variant="outline">{t("cta.seatrial")}</CTA>
          </div>
          <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-white/20 pt-5 text-[0.7rem] font-medium uppercase tracking-[0.19em] text-white/65 md:mt-16">
            <span>B630</span><span className="text-white/30">/</span>
            <span>B800</span><span className="text-white/30">/</span>
            <span>B1100</span><span className="text-white/30">/</span>
            <span>B1300</span>
          </div>
        </div>
      </section>

      <section className="bg-background py-20 md:py-28" aria-labelledby="home-fleet-heading">
        <div className="container-breva">
          <div className="mb-12 grid gap-6 md:mb-16 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <p className="t-eyebrow text-accent">01 / {it ? "La collezione" : "The collection"}</p>
              <h2 id="home-fleet-heading" className="mt-6 max-w-3xl font-display text-4xl font-light leading-tight tracking-tight md:text-6xl">
                {it ? "Quattro interpretazioni del mare." : "Four ways to experience the sea."}
              </h2>
            </div>
            <p className="max-w-sm text-base leading-relaxed text-muted-foreground md:col-span-4">
              {it
                ? "Dalle dimensioni agili del B630 alla presenza del B1300. Esplora la gamma BREVA e trova la tua idea di libertà."
                : "From the agile B630 to the commanding B1300. Explore the BREVA range and find your own idea of freedom."}
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 md:gap-6">
            {featuredModels.map((boat) => (
              <Link
                key={boat.id}
                to="/fleet/$model"
                params={{ model: boat.id }}
                className={
                  "group relative isolate block aspect-[4/5] overflow-hidden outline-offset-4 sm:aspect-[5/4] md:aspect-[6/5] " +
                  (boat.concept ? "bg-[#e8e9e7] text-[#15202a]" : "bg-[#142735] text-white")
                }
                aria-label={
                  "BREVA " + boat.id.substring(1) +
                  " — " + (it ? "Scopri il modello" : "Explore the model")
                }
              >
                <img
                  src={boat.photo}
                  alt={it ? boat.alt.it : boat.alt.en}
                  loading="lazy"
                  decoding="async"
                  style={{ objectPosition: boat.objectPosition }}
                  className={
                    "absolute inset-0 w-full transition-transform duration-1000 group-hover:scale-[1.035] " +
                    (boat.concept
                      ? "top-[10%] h-[66%] object-contain px-5 md:px-10"
                      : "h-full object-cover")
                  }
                />
                {!boat.concept && (
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061019]/90 via-[#061019]/10 to-black/10" aria-hidden="true" />
                )}
                <div className="absolute inset-x-0 bottom-0 flex flex-col items-start px-6 pb-7 md:px-10 md:pb-10">
                  <p className={"mb-5 text-[0.7rem] font-semibold uppercase tracking-[0.22em] " + (boat.concept ? "text-[#485561]" : "text-white/75")}>
                    {boat.number} / 04
                    {boat.concept ? " · " + (it ? "Immagine di progetto" : "Concept rendering") : ""}
                  </p>
                  <h3 className="sr-only">BREVA {boat.id.substring(1)}</h3>
                  <img
                    src={"/assets/breva/" + boat.id + "/logo/" + boat.id + "-wordmark-" + (boat.concept ? "dark" : "white") + ".png"}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="h-auto max-h-16 w-auto max-w-[80%] object-contain object-left md:max-h-20"
                  />
                  <p className={"mt-4 text-base md:text-lg " + (boat.concept ? "text-[#35424d]" : "text-white/85")}>
                    {it ? boat.caption.it : boat.caption.en}
                  </p>
                  <span className={"mt-6 inline-flex items-center gap-3 border-b pb-2 text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 group-hover:gap-5 " + (boat.concept ? "border-[#54616d]/50" : "border-white/50")}>
                    {it ? "Scopri il modello" : "Discover the model"} <span aria-hidden="true">↗</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="surface-dark bg-[#0b1924] py-20 md:py-28" aria-labelledby="home-spirit-heading">
        <div className="container-breva">
          <div className="grid items-center gap-10 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-5">
              <p className="t-eyebrow text-accent">02 / {it ? "Lo spirito BREVA" : "The BREVA spirit"}</p>
              <h2 id="home-spirit-heading" className="mt-6 font-display text-4xl font-light leading-tight tracking-tight text-white md:text-6xl">
                {it ? "Ogni uscita è una storia da vivere." : "Every journey is a story worth living."}
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-white/70 md:text-lg">
                {it
                  ? "Linee riconoscibili, libertà di personalizzazione e un rapporto diretto con il mare. Il carattere BREVA prende forma in ogni dettaglio."
                  : "Distinctive lines, room for personal expression, and a direct connection to the water. BREVA character lives in every detail."}
              </p>
              <div className="mt-9"><CTA to="/about" variant="outline">{it ? "Scopri BREVA" : "Discover BREVA"}</CTA></div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 md:col-span-7">
              <div className="overflow-hidden sm:pt-14">
                <img
                  src={images.dayOnTheWater}
                  alt={it ? "BREVA B800 in navigazione davanti ai faraglioni" : "BREVA B800 cruising alongside coastal rock formations"}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover object-[center_64%]"
                />
              </div>
              <div className="overflow-hidden sm:pb-14">
                <img
                  src={images.underway}
                  alt={it ? "BREVA B1300 in navigazione al sole" : "BREVA B1300 on the water in the sunlight"}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-background py-20 md:py-28">
        <div className="container-breva grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="t-eyebrow text-accent">03 / {it ? "Vivi BREVA" : "Experience BREVA"}</p>
            <h2 className="mt-5 max-w-3xl font-display text-4xl font-light leading-tight tracking-tight md:text-6xl">
              {it ? "La prossima rotta comincia qui." : "Your next journey starts here."}
            </h2>
          </div>
          <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
            <CTA to="/experience" variant="solid">{t("cta.seatrial")}</CTA>
            <CTA to="/dealers" variant="outline">{t("cta.dealer")}</CTA>
          </div>
        </div>
      </section>
    </>
  );
}
