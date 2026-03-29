function SpinButton({ onClick, isSpinning, canSpinToday }) {
  const busy = isSpinning;
  const locked = !canSpinToday && !isSpinning;

  return (
    <button
      type="button"
      className={`spin-button ${locked ? 'spin-button--locked' : ''}`}
      onClick={onClick}
      disabled={busy}
      aria-busy={busy}
    >
      {busy ? 'Spinning…' : 'SPIN'}
    </button>
  );
}

export default SpinButton;
