import '../styles/layout.css';

function SpinButton({ onClick, disabled, isSpinning }) {
  return (
    <button
      className="spin-button"
      onClick={onClick}
      disabled={disabled || isSpinning}
      style={{
        backgroundColor: disabled ? '#9ca3af' : 'var(--primary-green)',
        color: 'white',
        border: 'none',
        padding: '1rem 2.5rem',
        fontSize: '1.1rem',
        fontWeight: 600,
        borderRadius: '12px',
        cursor: disabled || isSpinning ? 'not-allowed' : 'pointer',
        boxShadow: disabled ? 'none' : 'var(--shadow)',
        transition: 'all 0.3s ease',
        fontFamily: 'inherit',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        opacity: disabled || isSpinning ? 0.6 : 1,
      }}
      onMouseEnter={(e) => {
        if (!disabled && !isSpinning) {
          e.target.style.backgroundColor = 'var(--primary-green-hover)';
          e.target.style.transform = 'scale(1.05)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled && !isSpinning) {
          e.target.style.backgroundColor = 'var(--primary-green)';
          e.target.style.transform = 'scale(1)';
        }
      }}
    >
      {isSpinning ? 'Spinning...' : 'Spin'}
    </button>
  );
}

export default SpinButton;
