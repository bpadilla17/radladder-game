import React, { useState, useEffect } from 'react';

export default function AnswerFeedback({ 
  isCorrect, 
  correctAnswer, 
  explanation, 
  onContinue 
}) {
  const [showConfetti, setShowConfetti] = useState(false);

  // Simple haptic feedback function (built-in)
  const triggerHaptic = (type = 'medium') => {
    if ('vibrate' in navigator) {
      if (type === 'success') {
        navigator.vibrate([50, 50, 50]); // short-long-short
      } else if (type === 'error') {
        navigator.vibrate([100, 50, 100]); // long-pause-long
      } else {
        navigator.vibrate(20);
      }
    }
  };

  useEffect(() => {
    if (isCorrect) {
      setShowConfetti(true);
      triggerHaptic('success');
      // Hide confetti after animation
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      triggerHaptic('error');
    }
  }, [isCorrect]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6 relative">
      {/* Simple CSS Confetti */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="confetti-piece"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 0.5}s`,
                backgroundColor: ['#22d3ee', '#3b82f6', '#a855f7', '#ec4899', '#f59e0b'][Math.floor(Math.random() * 5)],
                '--fall-distance': `${80 + Math.random() * 20}vh`,
                '--rotation': `${Math.random() * 360}deg`,
              }}
            />
          ))}
        </div>
      )}

      {/* Result Banner */}
      <div className={`${
        isCorrect 
          ? 'bg-gradient-to-r from-green-600 to-emerald-600' 
          : 'bg-gradient-to-r from-red-600 to-rose-600'
      } rounded-lg p-6 text-white shadow-xl border-2 ${
        isCorrect ? 'border-green-400' : 'border-red-400'
      } ${isCorrect ? '' : 'animate-shake'}`}>
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="text-4xl">{isCorrect ? '🎉' : '❌'}</span>
          <h2 className="text-3xl font-bold">
            {isCorrect ? 'Correct!' : 'Incorrect'}
          </h2>
          <span className="text-4xl">{isCorrect ? '🎉' : '❌'}</span>
        </div>
        {!isCorrect && (
          <p className="text-center text-lg">
            The correct answer was: <span className="font-bold">{correctAnswer}</span>
          </p>
        )}
      </div>

      {/* Explanation */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-6 border border-cyan-500/20">
        <h3 className="text-xl font-semibold text-cyan-400 mb-3 flex items-center gap-2">
          <span>📚</span> Teaching Point
        </h3>
        <p className="text-cyan-100 leading-relaxed text-lg">
          {explanation}
        </p>
      </div>

      {/* Continue Button */}
      <div className="flex justify-center pt-4">
        <button
          onClick={() => {
            triggerHaptic('medium');
            onContinue();
          }}
          className="px-10 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold text-lg rounded-lg transition-all transform hover:scale-105 shadow-lg"
        >
          Continue ➡️
        </button>
      </div>

      <style jsx>{`
        .confetti-piece {
          position: absolute;
          width: 10px;
          height: 10px;
          top: -10px;
          animation: confetti-fall 3s linear forwards;
        }

        @keyframes confetti-fall {
          to {
            transform: translateY(var(--fall-distance)) rotate(var(--rotation));
            opacity: 0;
          }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }

        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
