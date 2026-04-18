function SpinButton({ onClick, isSpinning, canSpinToday, quietReturn }) {
  const busy = isSpinning;
  const locked = !canSpinToday && !isSpinning;

  let label = 'Draw for today';
  if (busy) label = 'Settling…';
  else if (locked) label = quietReturn ? 'Still yours today' : "Today's draw landed";

  const lockedAria = quietReturn
    ? "Today's line is already saved on this device. A new draw will be ready tomorrow."
    : "Today's draw is complete. A fresh line will be here when you return tomorrow.";

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
