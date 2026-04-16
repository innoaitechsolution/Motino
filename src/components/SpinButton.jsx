function SpinButton({ onClick, isSpinning, canSpinToday }) {
  const busy = isSpinning;
  const locked = !canSpinToday && !isSpinning;

  let label = 'Draw for today';
  if (busy) label = 'Settling…';
  else if (locked) label = 'Until tomorrow';

  return (
    <button
      type="button"
      className={`spin-button ${locked ? 'spin-button--locked' : ''}`}
      onClick={onClick}
      disabled={busy || locked}
      aria-busy={busy}
      aria-label={
        locked
          ? "Today's moment is complete. A new line will be ready tomorrow."
          : undefined
      }
    >
      {label}
    </button>
  );
}

export default SpinButton;
