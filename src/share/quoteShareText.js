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

/** Full post body for X / Twitter intent (Web intent `text` param). */
export function buildTwitterShareText(quote) {
  const body = typeof quote?.quote === 'string' ? quote.quote.trim() : '';
  const url = liveSiteUrlWithSlash();
  return `✨ Today's Motino Original

"${body}"

— Motino Originals
${url}`;
}

export function buildTwitterIntentUrl(quote) {
  const text = buildTwitterShareText(quote);
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
}
