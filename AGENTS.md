<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Project rules
- Marketing content lives in typed datasets under `src/content/`; views in `src/components/site` and `src/routes` never hardcode product data. Why: future CMS swaps the data source only.
- Localized fields use `L` ({it, en?}) with Italian fallback via `useI18n().l`; UI strings in `src/lib/i18n.tsx`. Why: easy locale extension.
- Media goes through `<Media slot>`; missing `src` renders a replace-media placeholder. Why: no unlicensed or wrong-brand imagery.
- Specs render values only when `validated: true`; brochures download only with a model-specific `pdfUrl`. Why: no invented data or wrong PDFs.
- Forms, SSO and CMS are non-connected demos and must say so. Why: prototype, no live leads.