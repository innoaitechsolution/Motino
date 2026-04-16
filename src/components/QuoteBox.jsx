function QuoteBox({
  quote,
  onShare,
  shareFeedback,
  nativeShareAvailable,
  welcomeBack,
  freshSpinThisSession,
}) {
  if (!quote) return null;

  const shareLabel = nativeShareAvailable ? 'Share' : 'Copy quote';

  const closureText =
    welcomeBack && !freshSpinThisSession
      ? 'Still yours until the day turns'
      : 'Yours until tomorrow';

  return (
    <div className="quote-container">
      {welcomeBack && (
        <p className="quote-welcome" role="status">
          Welcome back — this was the line you gave yourself today.
        </p>
      )}

      <p className="quote-heading">Today&apos;s line</p>

      <blockquote className="quote-box quote-reveal" key={quote}>
        <p className="quote-text">{quote}</p>
      </blockquote>

      <p className="quote-closure">{closureText}</p>

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
