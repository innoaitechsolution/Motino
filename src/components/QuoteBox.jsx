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
    welcomeBack && !freshSpinThisSession ? 'Still yours today' : 'Saved for today';

  return (
    <div className="quote-container">
      {welcomeBack && (
        <p className="quote-welcome" role="status">
          Welcome back — here&apos;s what you drew today.
        </p>
      )}

      <p className="quote-heading">Your line today</p>

      <blockquote className="quote-box quote-reveal" key={quote}>
        <p className="quote-text">{quote}</p>
      </blockquote>

      <p className="quote-closure">{closureText}</p>

      {freshSpinThisSession && (
        <p className="quote-whisper">Come back to it whenever you need a lift.</p>
      )}

      {onShare && (
        <div className="share-block quote-share-reveal" key={`share-${quote}`}>
          <button type="button" className="share-button" onClick={onShare}>
            {shareLabel}
          </button>
          <p className="share-encouragement">Brighten someone&apos;s day</p>
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
