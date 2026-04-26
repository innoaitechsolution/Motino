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

  const closureText = quietReturn
    ? 'The same draw as before—steady, familiar, nothing to chase.'
    : 'Yours until the day turns over';

  const revealClass = quietReturn
    ? 'quote-reveal--quiet'
    : `quote-reveal${freshSpinThisSession ? ' quote-reveal--delayed' : ''}`;

  return (
    <div className="quote-container">
      {quietReturn && (
        <div className="quote-return-band" role="status">
          <p className="quote-return-kicker">Your daily draw</p>
          <p className="quote-return-body">
            The line you already received today—kept here on this device so you can return without
            beginning again.
          </p>
        </div>
      )}

      <p className="quote-heading">
        {quietReturn ? "Still today's Motino Original" : "Today's Motino Original"}
      </p>

      <blockquote className={`quote-box ${revealClass}`} key={quote.quote}>
        <p className="quote-text">{quote.quote}</p>
        <footer className="quote-author">— {quote.author}</footer>
      </blockquote>

      <p className="quote-closure">{closureText}</p>

      {quietReturn && (
        <p className="quote-device-whisper">
          On this device only—no profile, just a quiet place for your line to wait.
        </p>
      )}

      {freshSpinThisSession && (
        <p className="quote-whisper">Linger with it if you like—it belongs to today.</p>
      )}

      {onShare && (
        <div
          className={`share-block quote-share-reveal${freshSpinThisSession ? ' quote-share-reveal--after-spin' : ''}`}
          key={`share-${quote.quote}`}
        >
          <button type="button" className="share-button" onClick={onShare}>
            {shareLabel}
          </button>
          <p className="share-encouragement">Pass along a quiet lift</p>
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
