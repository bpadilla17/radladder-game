import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import ParticleBackground from './effects/ParticleBackground'
import { triggerHaptic } from '../utils/hapticFeedback'

export default function LandingPage({ onStartGame, onLeaderboard, onHowToPlay }) {
  const [darkMode, setDarkMode] = useState(() => {
    // Check localStorage or system preference
    const saved = localStorage.getItem('darkMode')
    if (saved !== null) return saved === 'true'
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    // Apply dark mode to document
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    // Save preference
    localStorage.setItem('darkMode', darkMode.toString())
  }, [darkMode])

  const toggleDarkMode = () => {
    triggerHaptic('light')
    setDarkMode(!darkMode)
  }

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center relative overflow-hidden transition-all duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900' 
        : 'bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50'
    } gradient-animate`}>
      
      {/* Particle Background */}
      <ParticleBackground darkMode={darkMode} />

      {/* Dark Mode Toggle - Top Right */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        onClick={toggleDarkMode}
        className={`absolute top-6 right-6 p-3 rounded-full transition-all duration-300 z-10 ${
          darkMode 
            ? 'bg-slate-800 text-yellow-300 hover:bg-slate-700' 
            : 'bg-white text-slate-700 hover:bg-gray-100'
        } shadow-lg`}
        aria-label="Toggle dark mode"
      >
        {darkMode ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        )}
      </motion.button>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl">
        {/* Title with Neon Glow */}
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className={`text-6xl md:text-8xl font-bold mb-6 ${
            darkMode ? 'text-cyan-400 neon-text' : 'text-blue-600'
          }`}
        >
          RADLADDER
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className={`text-xl md:text-2xl mb-12 ${
            darkMode ? 'text-cyan-100' : 'text-slate-700'
          }`}
        >
          Climb the ranks of radiology mastery
        </motion.p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Start Game Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              triggerHaptic('medium')
              onStartGame()
            }}
            className={`px-8 py-4 text-xl font-bold rounded-xl transition-all duration-300 ${
              darkMode
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white glow-button'
                : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg hover:shadow-xl'
            }`}
          >
            🚀 START GAME
          </motion.button>

          {/* Leaderboard Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              triggerHaptic('light')
              onLeaderboard()
            }}
            className={`px-8 py-4 text-lg font-semibold rounded-xl border-2 transition-all duration-300 ${
              darkMode
                ? 'border-cyan-400 text-cyan-100 hover:bg-cyan-500/10'
                : 'border-blue-500 hover:border-blue-600 text-blue-700 hover:bg-blue-50'
            }`}
          >
            🏆 LEADERBOARD
          </motion.button>
        </div>

        {/* How to Play Link */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          onClick={() => {
            triggerHaptic('light')
            onHowToPlay()
          }}
          className={`mt-8 text-sm underline transition-colors ${
            darkMode ? 'text-cyan-300 hover:text-cyan-200' : 'text-blue-600 hover:text-blue-700'
          }`}
        >
          ❓ HOW TO PLAY
        </motion.button>
      </div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.6 }}
        className={`absolute bottom-6 text-center text-sm ${
          darkMode ? 'text-cyan-300/60' : 'text-slate-600'
        }`}
      >
        <p>First-Year Radiology Resident Training</p>
        <p className="mt-1">Can you reach Prometheus Lionhart status?</p>
      </motion.div>
    </div>
  )
}
