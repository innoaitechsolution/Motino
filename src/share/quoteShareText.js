/**
 * Canonical share/copy format for quotes (Web Share API, clipboard, and any future exporters).
 * Site URL aligns with `VITE_SITE_URL` in `.env.production` (see vite.config.js).
 */
export function liveSiteUrlWithSlash() {
  const base = (import.meta.env.VITE_SITE_URL || 'https://motino.netlify.app').trim().replace(/\/$/, '');
  return `${base}/`;
}

/** Trimmed author from quote data (no fallback — comes from JSON). */
export function quoteAuthorDisplay(quote) {
  const a = typeof quote?.author === 'string' ? quote.author.trim() : '';
  return a;
}

export function buildShareText(quote) {
  const body = typeof quote?.quote === 'string' ? quote.quote.trim() : '';
  const author = quoteAuthorDisplay(quote);
  const url = liveSiteUrlWithSlash();
  const blocks = [`"${body}"`];
  if (author) blocks.push(`— ${author}`);
  blocks.push(url);
  return blocks.join('\n\n');
}

/** Full post body for X / Twitter intent (Web intent `text` param). */
export function buildTwitterShareText(quote) {
  const body = typeof quote?.quote === 'string' ? quote.quote.trim() : '';
  const author = quoteAuthorDisplay(quote);
  const url = liveSiteUrlWithSlash();
  const lines = [`✨ Today's Motino Original`, '', `"${body}"`, ''];
  if (author) {
    lines.push(`— ${author}`, '');
  }
  lines.push(url);
  return lines.join('\n');
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
    const author = quoteAuthorDisplay(quote);
    params.set('quote', author ? `"${body}" — ${author}` : `"${body}"`);
  }
  return `https://www.facebook.com/sharer/sharer.php?${params.toString()}`;
}
