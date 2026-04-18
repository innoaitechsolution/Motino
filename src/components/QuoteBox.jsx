function QuoteBox({
  quote,
  onShare,
  shareFeedback,
  nativeShareAvailable,
  quietReturn,
  freshSpinThisSession,
}) {
  if (!quote) return null;

  const shareLabel = nativeShareAvailable ? 'Share' : 'Copy quote';

  const closureText = quietReturn
    ? 'Same draw as before—steady, familiar, nothing to chase.'
    : 'Yours for the rest of today';

  return (
    <div className="quote-container">
      {quietReturn && (
        <div className="quote-return-band" role="status">
          <p className="quote-return-kicker">Your daily draw</p>
          <p className="quote-return-body">
            This is the line you already received today—held quietly on this device so you can
            return without starting over.
          </p>
        </div>
      )}

      <p className="quote-heading">{quietReturn ? "Still today's line" : "Today's line"}</p>

      <blockquote
        className={`quote-box ${quietReturn ? 'quote-reveal--quiet' : 'quote-reveal'}`}
        key={quote}
      >
        <p className="quote-text">{quote}</p>
      </blockquote>

      <p className="quote-closure">{closureText}</p>

      {quietReturn && (
        <p className="quote-device-whisper">
          Saved on this device only—not a profile, just a small kindness for your day.
        </p>
      )}

      {freshSpinThisSession && (
        <p className="quote-whisper">Stay with it as long as you like—it&apos;s yours today.</p>
      )}

      {onShare && (
        <div className="share-block quote-share-reveal" key={`share-${quote}`}>
          <button type="button" className="share-button" onClick={onShare}>
            {shareLabel}
          </button>
          <p className="share-encouragement">Share a gentle moment</p>
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
