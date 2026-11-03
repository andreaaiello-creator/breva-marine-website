/** Per-route head builder. Relative canonical/og:url until a domain is assigned. */
export function seo(title: string, description: string, path: string, opts: { noindex?: boolean } = {}) {
  const full = `${title} — BREVA Marine`;
  return {
    meta: [
      { title: full },
      { name: "description", content: description },
      { property: "og:title", content: full },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: path },
      { name: "twitter:card", content: "summary_large_image" },
      ...(opts.noindex ? [{ name: "robots", content: "noindex, nofollow" }] : []),
    ],
    links: [{ rel: "canonical", href: path }],
  };
}