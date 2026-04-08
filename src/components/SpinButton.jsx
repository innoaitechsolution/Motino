function SpinButton({ onClick, isSpinning, canSpinToday }) {
  const busy = isSpinning;
  const locked = !canSpinToday && !isSpinning;

  let label = 'SPIN';
  if (busy) label = 'Spinning…';
  else if (locked) label = 'See you tomorrow';

  return (
    <button
      type="button"
      className={`spin-button ${locked ? 'spin-button--locked' : ''}`}
      onClick={onClick}
      disabled={busy || locked}
      aria-busy={busy}
      aria-label={
        locked
          ? 'Your spin for today is complete. A new quote will be ready tomorrow.'
          : undefined
      }
    >
      {label}
    </button>
  );
}

export default SpinButton;
