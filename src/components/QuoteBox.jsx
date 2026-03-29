function QuoteBox({ quote, onShare, shareFeedback }) {
  if (!quote) return null;

  return (
    <div className="quote-container">
      <blockquote className="quote-box quote-reveal" key={quote}>
        <p className="quote-text">{quote}</p>
      </blockquote>

      {onShare && (
        <div className="share-block quote-share-reveal" key={`share-${quote}`}>
          <button type="button" className="share-button" onClick={onShare}>
            Share
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
