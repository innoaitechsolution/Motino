function Wheel({ rotation, isSpinning }) {
  return (
    <div className="wheel-wrapper">
      <div className="wheel-pointer" aria-hidden />
      <div className="wheel">
        <div
          className={`wheel-spin ${isSpinning ? 'wheel-spin--spinning' : ''}`}
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          <div className="wheel-face" />
        </div>
        <div className="wheel-center">MOTINO</div>
      </div>
    </div>
  );
}

export default Wheel;
