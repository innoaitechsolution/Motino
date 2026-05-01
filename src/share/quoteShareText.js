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

/** Pre-filled message for WhatsApp (same block as X); opens app or web.whatsapp.com via wa.me. */
export function buildWhatsAppShareUrl(quote) {
  const text = buildTwitterShareText(quote);
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

/**
 * Facebook web sharer: shares the live site URL. Optional `quote` may be picked up by the dialog when supported.
 */
export function buildFacebookShareUrl(quote) {
  const u = liveSiteUrlWithSlash();
  const params = new URLSearchParams({ u });
  const body = typeof quote?.quote === 'string' ? quote.quote.trim() : '';
  if (body) {
    params.set('quote', `"${body}" — Motino Originals`);
  }
  return `https://www.facebook.com/sharer/sharer.php?${params.toString()}`;
}
