function SpinButton({ onClick, isSpinning, canSpinToday }) {
  const busy = isSpinning;
  const locked = !canSpinToday && !isSpinning;

  let label = 'Draw for today';
  if (busy) label = 'Settling…';
  else if (locked) label = "Tomorrow's turn";

  return (
    <button
      type="button"
      className={`spin-button ${locked ? 'spin-button--locked' : ''}`}
      onClick={onClick}
      disabled={busy || locked}
      aria-busy={busy}
      aria-label={
        locked
          ? "Today's draw is complete. A fresh line will be here when you return tomorrow."
          : undefined
      }
    >
      {label}
    </button>
  );
}

export default SpinButton;
