import { useState, useEffect } from 'react';
import Wheel from './components/Wheel';
import QuoteBox from './components/QuoteBox';
import SpinButton from './components/SpinButton';
import quotes from './assets/quotes.json';
import './styles/layout.css';
import './styles/wheel.css';

const SPIN_MS = 3000;
const STORAGE_DATE = 'motino_lastSpinDate';
const STORAGE_QUOTE = 'motino_todayQuote';

function buildShareText(quote) {
  const url = typeof window !== 'undefined' ? window.location.origin : '';
  return `${quote}\n\n— via Motino\n${url}`;
}

const SESSION_LOADS_KEY = 'motino_sessionLoads';

function App() {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [canSpinToday, setCanSpinToday] = useState(true);
  const [shareFeedback, setShareFeedback] = useState('');
  const [nativeShareAvailable, setNativeShareAvailable] = useState(false);
  const [sessionLoads, setSessionLoads] = useState(1);
  const [freshSpinThisSession, setFreshSpinThisSession] = useState(false);

  useEffect(() => {
    setNativeShareAvailable(typeof navigator.share === 'function');
  }, []);

  useEffect(() => {
    const today = new Date().toDateString();
    try {
      const raw = sessionStorage.getItem(SESSION_LOADS_KEY);
      let n = 0;
      if (raw) {
        const p = JSON.parse(raw);
        if (p.date === today) n = p.n;
      }
      const next = { date: today, n: n + 1 };
      sessionStorage.setItem(SESSION_LOADS_KEY, JSON.stringify(next));
      setSessionLoads(next.n);
    } catch {
      setSessionLoads(1);
    }
  }, []);

  useEffect(() => {
    const today = new Date().toDateString();
    const lastSpinDate = localStorage.getItem(STORAGE_DATE);

    if (lastSpinDate === today) {
      const raw = localStorage.getItem(STORAGE_QUOTE);
      let restored = false;
      if (raw) {
        try {
          const { quote } = JSON.parse(raw);
          if (typeof quote === 'string' && quote.trim().length > 0) {
            setSelectedQuote(quote);
            restored = true;
          }
        } catch {
          /* malformed entry — clear below */
        }
      }
      if (restored) {
        setCanSpinToday(false);
      } else {
        localStorage.removeItem(STORAGE_DATE);
        localStorage.removeItem(STORAGE_QUOTE);
      }
    } else if (lastSpinDate && lastSpinDate !== today) {
      localStorage.removeItem(STORAGE_QUOTE);
      localStorage.removeItem(STORAGE_DATE);
    }
  }, []);

  const handleSpin = () => {
    if (isSpinning || !canSpinToday) return;

    setIsSpinning(true);
    setSelectedQuote(null);

    const baseRotation = rotation;
    const spins = 5 + Math.random() * 3;
    const randomAngle = Math.random() * 360;
    const newRotation = baseRotation + spins * 360 + randomAngle;

    setRotation(newRotation);

    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];

    window.setTimeout(() => {
      setIsSpinning(false);
      setFreshSpinThisSession(true);
      setSelectedQuote(quote);
      setCanSpinToday(false);

      const today = new Date().toDateString();
      localStorage.setItem(STORAGE_DATE, today);
      localStorage.setItem(STORAGE_QUOTE, JSON.stringify({ quote, date: today }));
    }, SPIN_MS);
  };

  const handleShare = async () => {
    if (!selectedQuote) return;
    setShareFeedback('');

    const text = buildShareText(selectedQuote);

    if (typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title: 'A small line from Motino',
          text,
        });
        return;
      } catch (err) {
        if (err && err.name === 'AbortError') return;
      }
    }

    try {
      if (typeof navigator.clipboard?.writeText === 'function') {
        await navigator.clipboard.writeText(text);
        setShareFeedback('Copied to clipboard');
        window.setTimeout(() => setShareFeedback(''), 3500);
        return;
      }
    } catch {
      /* fall through to message */
    }

    setShareFeedback('Could not copy — try selecting the quote manually.');
    window.setTimeout(() => setShareFeedback(''), 3500);
  };

  const welcomeBack =
    sessionLoads > 1 && selectedQuote != null && !canSpinToday && !freshSpinThisSession;

  return (
    <div className="app">
      <header className="app-header hero entrance-in entrance-in--1">
        <div className="hero-inner">
          <p className="hero-eyebrow">A quiet moment, once a day</p>
          <h1 className="app-title">Motino</h1>
          <p className="app-subtitle">
            When you&apos;re ready, let the wheel turn once. One line is yours until the day
            changes—a small ritual, not another scroll.
          </p>
        </div>
      </header>

      <div className="wheel-container entrance-in entrance-in--2">
        <Wheel
          rotation={rotation}
          isSpinning={isSpinning}
          settledForToday={!canSpinToday && !isSpinning}
        />
      </div>

      <div
        className={`spin-section entrance-in entrance-in--3${
          !canSpinToday && !isSpinning ? ' spin-section--settled' : ''
        }`}
      >
        <SpinButton onClick={handleSpin} isSpinning={isSpinning} canSpinToday={canSpinToday} />

        {isSpinning && (
          <p className="spin-hint spin-hint--during" aria-live="polite">
            Breathe. Let it slow to a stop—your line is finding you.
          </p>
        )}

        {canSpinToday && !isSpinning && (
          <p className="spin-hint">
            One turn, when it feels right. After that, your line stays with you while the wheel
            rests until a new day.
          </p>
        )}

        {!canSpinToday && !isSpinning && (
          <p className="spin-hint spin-hint--tomorrow">
            <span className="spin-hint__lead">Today is complete — and that matters.</span>{' '}
            Keep today&apos;s line close; tomorrow, another gentle draw will be waiting whenever
            you&apos;re ready.
          </p>
        )}
      </div>

      <QuoteBox
        quote={selectedQuote}
        onShare={selectedQuote ? handleShare : null}
        shareFeedback={shareFeedback}
        nativeShareAvailable={nativeShareAvailable}
        welcomeBack={welcomeBack}
        freshSpinThisSession={freshSpinThisSession}
      />
    </div>
  );
}

export default App;
