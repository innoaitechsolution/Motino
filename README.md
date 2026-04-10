# Motino

Daily motivation in one spin. **Motino** is a small, responsive web app: spin a rainbow wheel once per calendar day, get a motivational quote, then share or copy it. Your spin is stored locally until the next day.

## Features

- **Daily spin** — One spin per day via `localStorage`, with recovery if stored data is invalid.
- **Rainbow wheel** — Eight-color gradient; only the outer disc spins so the center and pointer stay readable.
- **Quote card** — Frosted card with the Web Share API and clipboard fallback when sharing is unavailable.
- **Responsive** — Works on small and large screens; respects **prefers-reduced-motion**.
- **Deploy-ready** — Vite production build and Netlify config (`netlify.toml`) for static hosting.

## Tech Stack

| Area | Choice |
| --- | --- |
| UI | React 18 |
| Build | Vite 5, `@vitejs/plugin-react` |
| Styling | Plain CSS (`layout.css`, `wheel.css`) |
| Fonts | Google Fonts — Inter, Poppins |
| Content | Static JSON (`src/assets/quotes.json`) |

## Project Structure

```
Motino/
├── index.html              # Entry HTML, fonts
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

For **Netlify**, use `npm run build` and publish `dist/` — `netlify.toml` already sets the publish directory and SPA redirect.

## Future Improvements

- **PWA** — Offline shell, install prompt, cached assets.
- **Theming** — Light/dark or custom accent colors.
- **Accessibility** — Stronger screen-reader feedback when the quote appears.
- **i18n** — Quotes and UI in multiple languages.
- **Optional backend** — Server-side “once per day” if you need consistency across devices.

---

Contributions, issues, and pull requests are welcome.
