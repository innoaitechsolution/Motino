import { useState, useEffect } from 'react';
import Wheel from './components/Wheel';
import QuoteBox from './components/QuoteBox';
import SpinButton from './components/SpinButton';
import quotes from './assets/quotes.json';
import './styles/layout.css';
import './styles/wheel.css';

function App() {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [canSpin, setCanSpin] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    checkDailyLimit();
    // Check if there's a saved quote from today
    const savedQuote = getTodayQuote();
    if (savedQuote) {
      setSelectedQuote(savedQuote.quote);
      setCanSpin(false);
      setMessage('You already spun today! Come back tomorrow for a new quote.');
    }
  }, []);

  const checkDailyLimit = () => {
    const lastSpinDate = localStorage.getItem('motino_lastSpinDate');
    const today = new Date().toDateString();

    if (lastSpinDate === today) {
      setCanSpin(false);
    } else {
      setCanSpin(true);
      // Clear old quote if it's a new day
      if (lastSpinDate && lastSpinDate !== today) {
        localStorage.removeItem('motino_todayQuote');
        setSelectedQuote(null);
        setMessage('');
      }
    }
  };

  const getTodayQuote = () => {
    const lastSpinDate = localStorage.getItem('motino_lastSpinDate');
    const today = new Date().toDateString();
    
    if (lastSpinDate === today) {
      const savedQuote = localStorage.getItem('motino_todayQuote');
      if (savedQuote) {
        return JSON.parse(savedQuote);
      }
    }
    return null;
  };

  const handleSpin = () => {
    if (!canSpin || isSpinning) return;

    setIsSpinning(true);
    setMessage('');
    setSelectedQuote(null);

    // Random rotation (multiple full spins + random angle)
    const baseRotation = rotation;
    const spins = 5 + Math.random() * 3; // 5-8 full spins
    const randomAngle = Math.random() * 360;
    const newRotation = baseRotation + spins * 360 + randomAngle;

    setRotation(newRotation);

    // Select random quote
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    // After animation completes
    setTimeout(() => {
      setIsSpinning(false);
      setSelectedQuote(quote);
      setCanSpin(false);

      // Save to localStorage
      const today = new Date().toDateString();
      localStorage.setItem('motino_lastSpinDate', today);
      localStorage.setItem('motino_todayQuote', JSON.stringify({ quote, date: today }));
    }, 4000);
  };

  const handleShare = async () => {
    if (!selectedQuote) return;

    const shareData = {
      title: 'Motino - Daily Motivation',
      text: `"${selectedQuote}" - Motino`,
    };

    try {
      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        const textToShare = `${shareData.text}\n\nGet your daily motivation at Motino!`;
        await navigator.clipboard.writeText(textToShare);
        alert('Quote copied to clipboard!');
      }
    } catch (error) {
      // User cancelled or error occurred
      if (error.name !== 'AbortError') {
        // Fallback: copy to clipboard
        try {
          const textToShare = `${shareData.text}\n\nGet your daily motivation at Motino!`;
          await navigator.clipboard.writeText(textToShare);
          alert('Quote copied to clipboard!');
        } catch (clipboardError) {
          console.error('Failed to share:', clipboardError);
        }
      }
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Motino</h1>
        <p className="app-subtitle">Spin for your daily motivation</p>
      </header>

      <div className="wheel-container">
        <Wheel rotation={rotation} isSpinning={isSpinning} />
      </div>

      <SpinButton 
        onClick={handleSpin} 
        disabled={!canSpin} 
        isSpinning={isSpinning}
      />

      {message && !selectedQuote && (
        <div className="message">
          <p style={{ margin: 0, color: 'var(--text-light)' }}>{message}</p>
        </div>
      )}

      <QuoteBox quote={selectedQuote} onShare={selectedQuote ? handleShare : null} />
    </div>
  );
}

export default App;
