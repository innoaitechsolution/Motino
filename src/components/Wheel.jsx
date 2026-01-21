import '../styles/wheel.css';

function Wheel({ rotation, isSpinning }) {
  return (
    <div className="wheel-wrapper">
      <div className="wheel-pointer"></div>
      <div 
        className={`wheel ${isSpinning ? 'spinning' : ''}`}
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {[...Array(8)].map((_, index) => (
          <div key={index} className="wheel-segment"></div>
        ))}
      </div>
      <div className="wheel-center">MOTINO</div>
    </div>
  );
}

export default Wheel;
