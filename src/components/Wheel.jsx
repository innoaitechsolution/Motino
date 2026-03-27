import '../styles/wheel.css';

function Wheel({ rotation, isSpinning }) {
  return (
    <div className="wheel-wrapper">
      <div className="wheel-pointer" aria-hidden />
      <div
        className={`wheel ${isSpinning ? 'wheel--spinning' : ''}`}
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <div className="wheel-face" />
        <div className="wheel-center">MOTINO</div>
      </div>
    </div>
  );
}

export default Wheel;
