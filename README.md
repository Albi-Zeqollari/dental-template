# Dental clinic website template (Tirana)

**Live demo:** https://albi-zeqollari.github.io/dental-template/
(also [?lang=en](https://albi-zeqollari.github.io/dental-template/?lang=en) and
[?lang=sq](https://albi-zeqollari.github.io/dental-template/?lang=sq))

A one-page site, built with React, Vite and TypeScript, for dental clinics that treat
foreign (mainly Italian) patients. It is in Italian, English and Albanian, and
every contact button goes to WhatsApp. It has no backend and stores no data.

## Run it

Requires Node 22.12+.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check + production build into dist/
npm run preview   # serve dist/ locally
```

Add `?lang=it|en|sq` to a URL to force a language.

## Set up a new clinic

1. **`src/config.ts`**: name, WhatsApp number, phone, email, address, Maps
   link, prices, team. Set `demo: false`. This hides the yellow banner and every
   `<DemoOnly>` note.
2. **`src/i18n.ts`**: wording, in all three languages. Italian is the master copy.
   If a key is missing from `en` or `sq`, the build fails.
3. **Branding**: change the colour tokens at the top of `src/styles.css`
   (`--brand`, `--accent`), and replace `public/favicon.svg`.
4. **Photos**: put real before/after images in `public/results/` and swap the
   placeholders in `src/components/Results.tsx`. Team photos go in `Team.tsx`.
5. **Reviews**: `src/components/Reviews.tsx` holds labelled sample text.
   Replace it with the clinic's real Google reviews. Don't publish invented
   reviews.
6. **Privacy page**: fill in the `[X]` and `[provider]` fields in the
   `privacy.*` keys. Remove the "template" note in `src/PrivacyPage.tsx`.
   Have a lawyer review it.
7. Update the static `<title>` and description in `index.html`, which search
   engines see before React runs.

## Before going live

- [ ] The clinic has approved every price, guarantee and medical claim in writing
- [ ] `demo: false` in `src/config.ts`
- [ ] The WhatsApp number works: open `https://wa.me/<number>` on a phone
- [ ] Before/after photos have written patient consent
- [ ] The privacy policy is complete and reviewed
- [ ] The domain is registered in the clinic's name, not yours

## Deploy

The demo deploys to GitHub Pages on every push to `main`
(`.github/workflows/deploy.yml`).

For a client, `npm run build` and upload `dist/` to any static host:
Cloudflare Pages, Netlify or Vercel. All have free tiers and EU edge
locations. Build command: `npm run build`; output directory: `dist`. The
build uses relative paths, so it works on a custom domain or a sub-path.

## Privacy by design (selling point)

- No cookies, analytics, Google Fonts or Maps embeds, so there is nothing to
  put in a cookie banner.
- The form doesn't send anything to a server. It opens WhatsApp with a
  pre-written message, and it tells patients not to type medical details.
- **If you add analytics or an embedded map**, you need a consent banner
  first (GDPR / Albanian Law 124/2024). For example, Plausible doesn't use
  cookies, while Google Analytics needs consent.

## Known limitations / next steps

- **SEO across languages**: all three languages share one URL, rendered with
  JavaScript. Google indexes the Italian default well, but EN and SQ won't rank
  separately. For clinics on the Growth/Premium packages, prerender
  `/it/`, `/en/` and `/sq/` as separate static pages with `hreflang` tags
  (e.g. migrate to Astro or add `vite-plugin-ssg`).
- Prices are formatted with the browser's locale data. Some browsers don't ship
  Albanian (`sq-AL`) and fall back to the English style (`€1,500`).
- There is no online booking calendar yet (Premium package). Add an embed
  from the clinic's booking tool and put it behind consent if it sets cookies.
