import '../styles/layout.css';

function QuoteBox({ quote, onShare, shareFeedback }) {
  if (!quote) return null;

  return (
    <div className="quote-container">
      <blockquote className="quote-box">
        <p className="quote-text">{quote}</p>
      </blockquote>

      {onShare && (
        <div className="share-block">
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
