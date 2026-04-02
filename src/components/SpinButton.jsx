function SpinButton({ onClick, isSpinning, canSpinToday }) {
  const busy = isSpinning;
  const locked = !canSpinToday && !isSpinning;

  let label = 'SPIN';
  if (busy) label = 'Spinning…';
  else if (locked) label = 'Come back tomorrow';

  return (
    <button
      type="button"
      className={`spin-button ${locked ? 'spin-button--locked' : ''}`}
      onClick={onClick}
      disabled={busy || locked}
      aria-busy={busy}
      aria-label={locked ? 'Already spun today. Come back tomorrow for a new spin.' : undefined}
    >
      {label}
    </button>
  );
}

export default SpinButton;
