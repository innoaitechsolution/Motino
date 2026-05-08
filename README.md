# Motino

Daily motivation in one spin. **Motino** is a small, responsive web app: spin the wheel once per calendar day, get a line from the **Motino Originals** collection, then share, copy, or save it. Your spin and quote stay in the browser until the next day.

**Live:** [https://motino.netlify.app/](https://motino.netlify.app/)

## Features

- **Daily ritual** — One spin per calendar day (`localStorage` keys `motino_lastSpinDate` / `motino_todayQuote`). If you come back the same day, today’s line is restored and the wheel stays settled until tomorrow.
- **Motino Originals** — About **45** quotes in static JSON (`src/assets/quotes.json`); each entry can include `quote` and `author` for the card and share text.
- **Rainbow wheel** — Multi-color gradient; only the outer disc spins so the center hub and pointer stay readable.
- **Quote card** — Frosted on-screen card; calmer copy when you’re returning later the same day (“quiet return”).
- **Share & copy** — Native **Web Share** when available; otherwise clipboard copy. Quick links for **X**, **WhatsApp**, and **Facebook** (prefilled text or site URL as supported).
- **Download card** — PNG export of a story-sized quote image via `html2canvas`.
- **Responsive** — Works on small and large screens; respects **`prefers-reduced-motion`** in CSS.
- **SEO & install hints** — Core meta tags, Open Graph, Twitter cards, and JSON-LD in `index.html`. `public/robots.txt`, `public/og-image.svg`, and `public/site.webmanifest` (with favicon) support crawlers and “add to home screen” metadata.
- **Deploy-ready** — Vite production build and Netlify config (`netlify.toml`) for static hosting.

## Tech stack

| Area | Choice |
| --- | --- |
| UI | React 18 |
| Build | Vite 5, `@vitejs/plugin-react` |
| Styling | Plain CSS (`layout.css`, `wheel.css`) |
| Fonts | Google Fonts — Inter, Poppins |
| Content | Static JSON (`src/assets/quotes.json`) |
| Card export | `html2canvas` |

## Project structure

```
Motino/
├── index.html              # Entry HTML, fonts, meta / social tags (%SITE_BASE% placeholders)
├── netlify.toml            # Build & SPA redirects
├── package.json
├── vite.config.js          # React plugin; injects canonical / og:url when VITE_SITE_URL is set
├── public/
│   ├── favicon.svg
│   ├── og-image.svg
│   ├── robots.txt
│   └── site.webmanifest
├── src/
│   ├── main.jsx            # React root
│   ├── App.jsx             # Spin flow, storage, share
│   ├── assets/
│   │   └── quotes.json
│   ├── components/
│   │   ├── Wheel.jsx
│   │   ├── SpinButton.jsx
│   │   └── QuoteBox.jsx
│   ├── share/
│   │   ├── quoteShareText.js
│   │   └── downloadQuoteCard.js
│   └── styles/
│       ├── layout.css
│       └── wheel.css
└── dist/                   # `npm run build` output (not committed)
```

## Setup

**Requirements:** [Node.js](https://nodejs.org/) (LTS recommended) and npm.

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually [http://localhost:5173](http://localhost:5173)).

## Build

```bash
npm run build
```

Output goes to `dist/`. Preview it locally:

```bash
npm run preview
```

## Environment variables

| Variable | When | Effect |
| --- | --- | --- |
| `VITE_SITE_URL` | Build (`npm run build`) | Trimmed and injected into `index.html`: replaces `%SITE_BASE%` in `og:image` / `twitter:image`, and adds `<meta property="og:url">` and `<link rel="canonical">` when non-empty. |

For **Netlify**, set `VITE_SITE_URL` to your public origin (e.g. `https://motino.netlify.app`) so social previews and canonical URLs resolve correctly. `netlify.toml` already uses `npm run build` and publishes `dist/` with an SPA fallback to `index.html`.

## Future improvements

- **PWA** — Offline shell, install prompt, cached assets.
- **Theming** — Light/dark or custom accent colors.
- **Accessibility** — Stronger screen-reader feedback when the quote appears.
- **i18n** — Quotes and UI in multiple languages.
- **Optional backend** — Server-side “once per day” if you need consistency across devices.

## Future visual enhancements

Backlog for later iterations (not implemented yet):

- **Richer wheel visuals** — More depth and polish on the spin disc.
- **Better quote reveal animation** — Clearer, smoother moment when the quote appears.
- **Richer on-screen & export styling** — Extra polish for the live card and downloaded image.
- **More premium hero spacing** — Breathing room and hierarchy at the top of the page.
- **Refined mobile polish** — Extra tuning for small screens and touch.

---

Contributions, issues, and pull requests are welcome.
