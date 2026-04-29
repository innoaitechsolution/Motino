import { buildTwitterIntentUrl } from '../share/quoteShareText';

function QuoteBox({
  quote,
  onShare,
  shareFeedback,
  nativeShareAvailable,
  quietReturn,
  freshSpinThisSession,
}) {
  if (!quote?.quote) return null;

  const shareLabel = nativeShareAvailable ? 'Share' : 'Copy quote';
  const twitterIntentUrl = buildTwitterIntentUrl(quote);

  const revealClass = quietReturn
    ? 'quote-reveal--quiet'
    : `quote-reveal${freshSpinThisSession ? ' quote-reveal--delayed' : ''}`;

  return (
    <div className="quote-container">
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
            <button type="button" className="share-button" onClick={onShare}>
              {shareLabel}
            </button>
            <a
              className="share-button share-button--x"
              href={twitterIntentUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on X (opens in a new tab)"
            >
              X
            </a>
          </div>
          {shareFeedback && (
            <p className="share-feedback" role="status">
              {shareFeedback}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default QuoteBox;
