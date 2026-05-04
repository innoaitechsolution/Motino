import { useRef, useState } from 'react';
import { buildTwitterIntentUrl, buildWhatsAppShareUrl, buildFacebookShareUrl } from '../share/quoteShareText';
import { downloadQuoteCardPng } from '../share/downloadQuoteCard';

function QuoteBox({
  quote,
  onShare,
  shareFeedback,
  nativeShareAvailable,
  quietReturn,
  freshSpinThisSession,
}) {
  const exportRootRef = useRef(null);
  const [cardExportMessage, setCardExportMessage] = useState('');
  const [isExportingCard, setIsExportingCard] = useState(false);

  if (!quote?.quote) return null;

  const shareLabel = nativeShareAvailable ? 'Share' : 'Copy quote';
  const twitterIntentUrl = buildTwitterIntentUrl(quote);
  const whatsAppShareUrl = buildWhatsAppShareUrl(quote);
  const facebookShareUrl = buildFacebookShareUrl(quote);

  const handleDownloadCard = async () => {
    const el = exportRootRef.current;
    if (!el || isExportingCard) return;
    setCardExportMessage('');
    setIsExportingCard(true);
    try {
      await downloadQuoteCardPng(el);
    } catch {
      setCardExportMessage('Could not save the image — try again.');
      window.setTimeout(() => setCardExportMessage(''), 4000);
    } finally {
      setIsExportingCard(false);
    }
  };

  const revealClass = quietReturn
    ? 'quote-reveal--quiet'
    : `quote-reveal${freshSpinThisSession ? ' quote-reveal--delayed' : ''}`;

  return (
    <div className="quote-container">
      <div className="quote-card-export-host" aria-hidden="true">
        <div ref={exportRootRef} className="quote-card-export">
          <div className="quote-card-export__inner">
            <p className="quote-card-export__kicker">Today&apos;s Motino Original</p>
            <div className="quote-card-export__surface">
              <p className="quote-card-export__quote">{quote.quote}</p>
              <p className="quote-card-export__author">— Motino Originals</p>
            </div>
            <div className="quote-card-export__footer">
              <span className="quote-card-export__wordmark">Motino</span>
              <span className="quote-card-export__url">https://motino.netlify.app/</span>
            </div>
          </div>
        </div>
      </div>

      <p className="quote-heading">
        {quietReturn ? "Still today's Motino Original" : "Today's Motino Original"}
      </p>

      <blockquote className={`quote-box ${revealClass}`} key={quote.quote}>
        <p className="quote-text">{quote.quote}</p>
        <footer className="quote-author">— {quote.author}</footer>
      </blockquote>

      <p className="quote-closure">Yours until tomorrow</p>

      {onShare && (
        <div
          className={`share-block quote-share-reveal${freshSpinThisSession ? ' quote-share-reveal--after-spin' : ''}`}
          key={`share-${quote.quote}`}
        >
          <div className="share-actions">
            <button type="button" className="share-button share-button--primary" onClick={onShare}>
              {shareLabel}
            </button>
            <div
              className="share-actions-chips"
              role="group"
              aria-label="Share on social media"
            >
              <a
                className="share-button share-button--x"
                href={twitterIntentUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on X (opens in a new tab)"
              >
                X
              </a>
              <a
                className="share-button share-button--wa"
                href={whatsAppShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on WhatsApp (opens in a new tab)"
              >
                <span className="share-button-wa-icon" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                    <path
                      fill="currentColor"
                      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
                    />
                  </svg>
                </span>
              </a>
              <a
                className="share-button share-button--fb"
                href={facebookShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Share on Facebook (opens in a new tab)"
              >
                <span className="share-button-fb-icon" aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18">
                    <path
                      fill="currentColor"
                      d="M13.5 22v-8.21h2.91l.55-3.43H13.5V8.86c0-.94.47-1.85 2-1.85h1.54V4.14A28.33 28.33 0 0 0 14.45 4c-2.72 0-4.5 1.66-4.5 4.7v2.66H7v3.43h2.95V22h3.55Z"
                    />
                  </svg>
                </span>
              </a>
            </div>
          </div>
          <div className="share-actions-secondary">
            <button
              type="button"
              className="share-button share-button--card"
              onClick={handleDownloadCard}
              disabled={isExportingCard}
              aria-busy={isExportingCard}
            >
              {isExportingCard ? 'Preparing…' : 'Download card'}
            </button>
          </div>
          {(shareFeedback || cardExportMessage) && (
            <p className="share-feedback" role="status">
              {cardExportMessage || shareFeedback}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default QuoteBox;
