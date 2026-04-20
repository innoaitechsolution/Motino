function SpinButton({ onClick, isSpinning, canSpinToday, quietReturn }) {
  const busy = isSpinning;
  const locked = !canSpinToday && !isSpinning;

  let label = 'Draw for today';
  if (busy) label = 'Finding your line…';
  else if (locked) label = quietReturn ? 'Still yours today' : 'Your line for today';

  const lockedAria = quietReturn
    ? "Today's line is saved on this device. A new draw arrives tomorrow."
    : "Today's draw is done. A fresh line will be here tomorrow.";

  return (
    <button
      type="button"
      className={`spin-button ${locked ? 'spin-button--locked' : ''}`}
      onClick={onClick}
      disabled={busy || locked}
      aria-busy={busy}
      aria-label={locked ? lockedAria : undefined}
    >
      {label}
    </button>
  );
}

export default SpinButton;
