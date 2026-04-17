function Wheel({ rotation, isSpinning, settledForToday }) {
  const centerNote = settledForToday ? 'yours' : 'today';

  return (
    <div className={`wheel-wrapper${settledForToday ? ' wheel-wrapper--settled' : ''}`}>
      <div className="wheel-pointer" aria-hidden />
      <div className={`wheel${settledForToday ? ' wheel--settled' : ''}`}>
        <div
          className={`wheel-spin ${isSpinning ? 'wheel-spin--spinning' : ''}`}
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <div className="wheel-face" />
        </div>
        <div className="wheel-center">
          <span className="wheel-center-title">MOTINO</span>
          <span className="wheel-center-note">{centerNote}</span>
        </div>
      </div>
    </div>
  );
}

export default Wheel;
