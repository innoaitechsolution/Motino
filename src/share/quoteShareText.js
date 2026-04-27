/**
 * Canonical share/copy format for quotes (Web Share API, clipboard, and any future exporters).
 * Site URL aligns with `VITE_SITE_URL` in `.env.production` (see vite.config.js).
 */
export function liveSiteUrlWithSlash() {
  const base = (import.meta.env.VITE_SITE_URL || 'https://motino.netlify.app').trim().replace(/\/$/, '');
  return `${base}/`;
}

export function buildShareText(quote) {
  const body = typeof quote?.quote === 'string' ? quote.quote.trim() : '';
  return `"${body}"\n\n— Motino Originals\n${liveSiteUrlWithSlash()}`;
}
