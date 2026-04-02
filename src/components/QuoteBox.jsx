function QuoteBox({ quote, onShare, shareFeedback, nativeShareAvailable }) {
  if (!quote) return null;

  const shareLabel = nativeShareAvailable ? 'Share' : 'Copy quote';

  return (
    <div className="quote-container">
      <p className="quote-heading">Today&apos;s motivation</p>
      <blockquote className="quote-box quote-reveal" key={quote}>
        <p className="quote-text">{quote}</p>
      </blockquote>

      {onShare && (
        <div className="share-block quote-share-reveal" key={`share-${quote}`}>
          <button type="button" className="share-button" onClick={onShare}>
            {shareLabel}
          </button>
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
