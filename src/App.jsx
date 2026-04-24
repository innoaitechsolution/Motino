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

const SHARE_HEADER = "✨ Today's motivation";

function buildShareText(quote) {
  const body = typeof quote === 'string' ? quote.trim() : String(quote);
  return `${SHARE_HEADER}\n\n"${body}"\n\n— via Motino\nmotino.app`;
}

function canUseNativeShare(text) {
  if (typeof navigator === 'undefined' || typeof navigator.share !== 'function') return false;

  if (typeof navigator.canShare === 'function') {
    try {
      return navigator.canShare({
        title: 'A line from Motino',
        text,
      });
    } catch {
      return false;
    }
  }

  return true;
}

function App() {
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [canSpinToday, setCanSpinToday] = useState(true);
  const [shareFeedback, setShareFeedback] = useState('');
  const [freshSpinThisSession, setFreshSpinThisSession] = useState(false);

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
    const nativeShareAvailable = canUseNativeShare(text);

    if (nativeShareAvailable) {
      try {
        await navigator.share({
          title: 'A line from Motino',
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
        setShareFeedback('Copied — ready when you are');
        window.setTimeout(() => setShareFeedback(''), 3500);
        return;
      }
    } catch {
      /* fall through to message */
    }

    setShareFeedback('Could not copy — select the quote by hand.');
    window.setTimeout(() => setShareFeedback(''), 3500);
  };

  /** Today’s quote is showing, but not the immediate moment after a spin in this visit (restore, refresh, or later return). */
  const quietReturn =
    selectedQuote != null && !canSpinToday && !isSpinning && !freshSpinThisSession;
  const nativeShareAvailable = selectedQuote ? canUseNativeShare(buildShareText(selectedQuote)) : false;

  return (
    <div className="app">
      <header
        className={`app-header hero entrance-in entrance-in--1${quietReturn ? ' hero--quiet-return' : ''}`}
      >
        <div className="hero-inner">
          <p className="hero-eyebrow">
            {quietReturn ? 'Your day, still — your line waited' : 'One unhurried moment, once a day'}
          </p>
          <h1 className="app-title">Motino</h1>
          <p className="app-subtitle">
            {quietReturn ? (
              <>
                Today&apos;s line is still here, as you left it. Nothing to redo—stay with it as
                long as you need until the calendar turns.
              </>
            ) : (
              <>
                When you&apos;re ready, give the wheel a single turn. One line stays with you until
                tomorrow—a small ritual, not another scroll.
              </>
            )}
          </p>
        </div>
      </header>

      <div className="wheel-container entrance-in entrance-in--2">
        <Wheel
          rotation={rotation}
          isSpinning={isSpinning}
          settledForToday={!canSpinToday && !isSpinning}
          quietReturn={quietReturn}
        />
      </div>

      <div
        className={`spin-section entrance-in entrance-in--3${
          !canSpinToday && !isSpinning ? ' spin-section--settled' : ''
        }`}
      >
        <SpinButton
          onClick={handleSpin}
          isSpinning={isSpinning}
          canSpinToday={canSpinToday}
          quietReturn={quietReturn}
        />

        {isSpinning && (
          <p className="spin-hint spin-hint--during" aria-live="polite">
            Easy breath. Let it ease to stillness—your line is on its way.
          </p>
        )}

        {canSpinToday && !isSpinning && (
          <p className="spin-hint">
            One turn, when the moment feels right. Then your line stays; the wheel rests until a new
            day.
          </p>
        )}

        {!canSpinToday && !isSpinning && quietReturn && (
          <p className="spin-hint spin-hint--return">
            <span className="spin-hint__lead">The wheel rests — your draw is already chosen.</span>{' '}
            Today&apos;s line stays on this device so you can come back without second-guessing.
          </p>
        )}

        {!canSpinToday && !isSpinning && !quietReturn && (
          <p className="spin-hint spin-hint--tomorrow">
            <span className="spin-hint__lead">Today is settled — that counts.</span>{' '}
            Keep the line close; tomorrow, another gentle draw will be here when you are.
          </p>
        )}
      </div>

      <QuoteBox
        quote={selectedQuote}
        onShare={selectedQuote ? handleShare : null}
        shareFeedback={shareFeedback}
        nativeShareAvailable={nativeShareAvailable}
        quietReturn={quietReturn}
        freshSpinThisSession={freshSpinThisSession}
      />
    </div>
  );
}

export default App;
