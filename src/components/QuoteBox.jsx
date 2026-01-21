import '../styles/layout.css';

function QuoteBox({ quote, onShare }) {
  if (!quote) return null;

  return (
    <div className="quote-container">
      <div className="message">
        <p style={{ 
          fontSize: '1.1rem', 
          lineHeight: '1.6', 
          color: 'var(--text-dark)',
          fontStyle: 'italic',
          margin: 0
        }}>
          "{quote}"
        </p>
      </div>
      {onShare && (
        <div className="share-container">
          <button
            onClick={onShare}
            style={{
              backgroundColor: 'transparent',
              border: '2px solid var(--primary-green)',
              color: 'var(--primary-green)',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '0.95rem',
              fontWeight: 600,
              fontFamily: 'inherit',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'var(--primary-green)';
              e.target.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = 'var(--primary-green)';
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
              <polyline points="16 6 12 2 8 6"></polyline>
              <line x1="12" y1="2" x2="12" y2="15"></line>
            </svg>
            Share Quote
          </button>
        </div>
      )}
    </div>
  );
}

export default QuoteBox;
