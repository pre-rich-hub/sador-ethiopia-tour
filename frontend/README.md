# Sador Ethiopia Tours — website

Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · next-intl. Static site, no backend.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all pages are statically generated)
npm run typecheck
```

## Structure

```text
app/
  [locale]/            One folder per route; pages only compose components and read content.
    page.tsx           Home
    tours/             Journey listing + [slug] detail
    destinations/      Regions → [region] → [place]
    activities/        Experiences + [slug]
    blog/              Journal + [slug]
    about, about-ethiopia, family-meeting-trip, unesco-world-heritage-sites, contact, terms
  sitemap.ts, robots.ts
components/
  layout/              Header (mega-menu, language switcher), Footer, newsletter, WhatsApp button
  sections/            Sections reused on several pages (plan CTA, reviews, partners)
  ui/                  Small primitives (buttons, headings, hero, reveal, icons)
  seo/                 JSON-LD
features/              Domain components: home, tours, destinations, gallery, enquiry
content/               All site content — JSON for tours/places/activities/UNESCO/blog,
                       TS for regions, company info, long-form pages and reviews
lib/                   Content loaders & types, SEO helpers, utilities
i18n/, messages/       Locales (en, fr, de, it, es) and UI strings
public/images/         Curated photos (*.jpg), plus tours/<slug>/ and places/<region>/<slug>/
                       galleries taken from each detail page of the original site
```

## Editing content

- **Tours** — `content/tours.json` (itinerary, inclusions, prices, photos).
- **Destinations** — `content/places.json`; region intros in `content/regions.ts`.
- **Company details** (phones, email, socials) — `content/site.ts`.
- **UI text and translations** — `messages/<locale>.json`.

Long-form content (itineraries, place descriptions, blog posts) is in English; the interface is translated.

## Forms

There is no server. The enquiry and newsletter forms open a pre-filled email to
`info@sadorethiopiatours.com`, with WhatsApp offered as an alternative.
