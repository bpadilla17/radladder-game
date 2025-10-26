import React, { useState, useEffect } from 'react';
import { triggerHaptic } from '../utils/hapticFeedback';

export default function LandingPage({ onStartGame }) {
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage or default to true
    const saved = localStorage.getItem('radladder-dark-mode');
    return saved ? JSON.parse(saved) : true;
  });

  // Apply theme to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.style.background = 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e3a8a 100%)';
    } else {
      document.documentElement.classList.remove('dark');
      document.body.style.background = 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 50%, #93c5fd 100%)';
    }
    localStorage.setItem('radladder-dark-mode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    triggerHaptic('medium');
  };

  const handleStartGame = () => {
    triggerHaptic('heavy');
    onStartGame();
  };

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-6 relative ${
      darkMode ? 'text-white' : 'text-slate-900'
    }`}>
      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDarkMode}
        className={`absolute top-6 right-6 p-3 rounded-full transition-all shadow-lg ${
          darkMode 
            ? 'bg-slate-700/50 hover:bg-slate-600/50 text-yellow-300' 
            : 'bg-white/50 hover:bg-white/70 text-slate-700'
        }`}
        aria-label="Toggle dark mode"
      >
        {darkMode ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        )}
      </button>

      {/* Simplified Background Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl ${
          darkMode ? 'bg-cyan-500/20' : 'bg-blue-400/20'
        } animate-pulse`} />
        <div className={`absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl ${
          darkMode ? 'bg-purple-500/20' : 'bg-indigo-400/20'
        } animate-pulse`} style={{ animationDelay: '1s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center space-y-8 max-w-2xl">
        {/* Logo */}
        <div className="flex items-center justify-center gap-4">
          <div className={`text-5xl ${darkMode ? 'text-cyan-400' : 'text-blue-600'}`}>
            🪜
          </div>
          <h1 className={`text-6xl md:text-7xl font-bold tracking-tight ${
            darkMode 
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500'
              : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600'
          }`} style={{
            textShadow: darkMode ? '0 0 40px rgba(34, 211, 238, 0.3)' : 'none'
          }}>
            RADLADDER
          </h1>
          <div className={`text-5xl ${darkMode ? 'text-cyan-400' : 'text-blue-600'}`}>
            🪜
          </div>
        </div>

        {/* Subtitle */}
        <p className={`text-xl md:text-2xl ${
          darkMode ? 'text-cyan-100' : 'text-slate-700'
        }`}>
          Radiology Training Game
        </p>

        {/* Description */}
        <div className={`${
          darkMode ? 'bg-slate-800/50' : 'bg-white/50'
        } backdrop-blur-sm rounded-2xl p-8 border ${
          darkMode ? 'border-cyan-500/20' : 'border-blue-300'
        } shadow-xl`}>
          <p className={`text-lg leading-relaxed mb-4 ${
            darkMode ? 'text-cyan-50' : 'text-slate-800'
          }`}>
            Climb from Med Student to Attending Level
          </p>
          <div className={`flex items-center justify-center gap-2 text-sm ${
            darkMode ? 'text-cyan-200' : 'text-slate-600'
          }`}>
            <span>📚 Test Your Knowledge</span>
            <span>•</span>
            <span>🎯 Climb the Ladder</span>
            <span>•</span>
            <span>🏆 Reach the Top</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button
            onClick={handleStartGame}
            className={`px-10 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl ${
              darkMode
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white'
                : 'bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white'
            }`}
          >
            ▶️ START GAME
          </button>
          
          <button
            onClick={() => {
              triggerHaptic('light');
              alert('Leaderboard coming soon! 🏆');
            }}
            className={`px-10 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 border-2 ${
              darkMode
                ? 'border-cyan-500/50 hover:border-cyan-400 text-cyan-100 hover:bg-cyan-500/10'
                : 'border-blue-500 hover:border-blue-600 text-blue-700 hover:bg-blue-50'
            }`}
          >
            🏆 LEADERBOARD
          </button>
        </div>

        {/* How to Play */}
        <button
          onClick={() => {
            triggerHaptic('light');
            alert('How to Play:\n\n✅ Answer correctly → Climb UP 1 rung\n❌ Answer wrong → Drop DOWN 2 rungs\n⏭️ Pass → Stay in place (2 passes per game)\n🎯 Goal: Reach Rung 10 (Prometheus Lionhart)\n⏱️ Time limits vary by difficulty\n🎮 Use lifelines wisely!');
          }}
          className={`text-sm underline ${
            darkMode ? 'text-cyan-300 hover:text-cyan-200' : 'text-blue-600 hover:text-blue-700'
          } transition-colors`}
        >
          ❓ HOW TO PLAY
        </button>
      </div>

      {/* Footer */}
      <div className={`absolute bottom-6 text-center text-sm ${
        darkMode ? 'text-cyan-300/60' : 'text-slate-600'
      }`}>
        <p>First-Year Radiology Resident Training</p>
        <p className="mt-1">Can you reach Prometheus Lionhart status?</p>
      </div>
    </div>
  );
}
