# Dental clinic website template (Tirana)

**Live demo:** https://albi-zeqollari.github.io/dental-template/
(also [?lang=en](https://albi-zeqollari.github.io/dental-template/?lang=en) and
[?lang=sq](https://albi-zeqollari.github.io/dental-template/?lang=sq))

A one-page site, built with React, Vite and TypeScript, for dental clinics that treat
foreign (mainly Italian) patients. It is in Italian, English and Albanian, and
every contact button goes to WhatsApp. It has no backend and stores no data.

**What makes it sell:**

- **Savings calculator:** patients pick treatments and quantities (or a preset).
  It compares the typical Italian price with the clinic's, including estimated
  flights and hotel. Totals animate as they change, and one tap sends the
  estimate to the clinic on WhatsApp.
- **Before/after slider** that works by touch, mouse or keyboard.
- **Live "Open now / Closed" status**, calculated in Tirana time from
  `openingHours`.
- Hero price card cycling through treatments, counters that count up, sections
  that fade in on scroll, a nav that highlights the current section, and a
  reviews carousel.
- No animation libraries; everything is React + CSS. All motion turns off
  for visitors with "reduce motion" enabled.

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
4. **Photos**: replace the stock photos in `public/images/` with the clinic's
   own photos, keeping the file names or updating `Hero.tsx` and `Gallery.tsx`.
   For the before/after slider (`Results.tsx`), use a real case photographed
   the same way twice, and remove the demo colour filter (`.ba-before` in
   `styles.css`). Also check the calculator's travel estimate (`trip`) and the
   `trips`/`nights` per treatment in `config.ts`.
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
- [ ] Stock photos replaced; before/after photos are a real case with written patient consent
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

## Photo credits

Demo photos are from [Pexels](https://www.pexels.com/license/) (free for
commercial use, no attribution required):
[hero](https://www.pexels.com/photo/a-man-with-pearly-white-teeth-6348688/),
[smile close-up](https://www.pexels.com/photo/a-close-up-shot-of-a-person-s-teeth-12474261/),
[dentist with loupes](https://www.pexels.com/photo/dentist-with-patient-12745979/),
[check-up](https://www.pexels.com/photo/a-dentist-treating-a-patient-5355715/),
[whitening](https://www.pexels.com/photo/dentist-doing-a-dental-treatment-on-a-patient-6529119/),
[patient in chair](https://www.pexels.com/photo/patient-lying-on-dental-chair-in-clinic-3946829/).
They are stand-ins. Never present them as the clinic's own premises,
staff or patient results.

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
