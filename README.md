# Motino

Daily motivation in one spin. **Motino** is a small, responsive web app: spin the wheel once per calendar day, get a line from the **Motino Originals** collection, then share, copy, or save it. Your spin and quote stay in the browser until the next day.

**Live:** [https://motino.netlify.app/](https://motino.netlify.app/)

## Features

- **Daily ritual** — One spin per calendar day (`localStorage`). If you come back the same day, today’s line is restored and the wheel stays settled until tomorrow.
- **Motino Originals** — Quotes and attribution live in static JSON (`src/assets/quotes.json`); each line shows an author line on the card.
- **Rainbow wheel** — Eight-color gradient; only the outer disc spins so the center and pointer stay readable.
- **Quote card** — Frosted on-screen card; calmer copy when you’re returning later the same day (“quiet return”).
- **Share & copy** — Native share when available; otherwise copy. Quick links for **X**, **WhatsApp**, and **Facebook** (prefilled text or site URL as supported).
- **Download card** — PNG export of a story-sized quote image (`html2canvas`).
- **Responsive** — Works on small and large screens; respects **prefers-reduced-motion**.
- **SEO** — Core meta tags, Open Graph, Twitter cards, and JSON-LD in `index.html`. Optional **`VITE_SITE_URL`** at build time for canonical / `og:url` (see `vite.config.js`).
- **Deploy-ready** — Vite production build and Netlify config (`netlify.toml`) for static hosting.

## Tech Stack

| Area | Choice |
| --- | --- |
| UI | React 18 |
| Build | Vite 5, `@vitejs/plugin-react` |
| Styling | Plain CSS (`layout.css`, `wheel.css`) |
| Fonts | Google Fonts — Inter, Poppins |
| Content | Static JSON (`src/assets/quotes.json`) |
| Card export | `html2canvas` |

## Project Structure

```
Motino/
├── index.html              # Entry HTML, fonts, meta / social tags
├── netlify.toml            # Build & SPA redirects
├── package.json
├── vite.config.js
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

**Requirements:** Node.js and npm.

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

For **Netlify**, use `npm run build` and publish `dist/` — `netlify.toml` already sets the publish directory and SPA redirect. Set **`VITE_SITE_URL`** (e.g. `https://motino.netlify.app`) in the Netlify environment if you want canonical and Open Graph URLs filled in at build time.

## Future Improvements

- **PWA** — Offline shell, install prompt, cached assets.
- **Theming** — Light/dark or custom accent colors.
- **Accessibility** — Stronger screen-reader feedback when the quote appears.
- **i18n** — Quotes and UI in multiple languages.
- **Optional backend** — Server-side “once per day” if you need consistency across devices.

## Future Visual Enhancements

Backlog for later iterations (not implemented yet):

- **Richer wheel visuals** — More depth and polish on the spin disc.
- **Better quote reveal animation** — Clearer, smoother moment when the quote appears.
- **Richer on-screen & export styling** — Extra polish for the live card and downloaded image.
- **More premium hero spacing** — Breathing room and hierarchy at the top of the page.
- **Refined mobile polish** — Extra tuning for small screens and touch.

---

Contributions, issues, and pull requests are welcome.
