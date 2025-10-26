import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Confetti from '../effects/Confetti'
import { triggerHaptic } from '../../utils/hapticFeedback'
import { soundManager } from '../../utils/soundManager'

export default function AnswerFeedback({ 
  isCorrect, 
  correctAnswer, 
  explanation, 
  onContinue,
  currentRung 
}) {
  const [darkMode, setDarkMode] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [shake, setShake] = useState(false)

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark')
    setDarkMode(isDark)

    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark')
      setDarkMode(isDark)
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isCorrect) {
      // Show confetti
      setShowConfetti(true)
      triggerHaptic('success')
      soundManager.success()
      
      // Hide confetti after animation
      setTimeout(() => setShowConfetti(false), 4000)
    } else {
      // Shake screen on wrong answer
      setShake(true)
      triggerHaptic('error')
      soundManager.error()
      
      setTimeout(() => setShake(false), 500)
    }
  }, [isCorrect])

  return (
    <>
      {/* Confetti Effect */}
      {showConfetti && <Confetti />}

      {/* Feedback Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={shake ? 'shake' : ''}
      >
        {/* Result Banner */}
        <div className={`p-6 rounded-lg mb-4 ${
          isCorrect
            ? darkMode
              ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white'
              : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
            : darkMode
              ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white'
              : 'bg-gradient-to-r from-red-500 to-rose-500 text-white'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-4xl">
                {isCorrect ? '✅' : '❌'}
              </span>
              <div>
                <h3 className="text-2xl font-bold">
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </h3>
                <p className="text-sm opacity-90">
                  {isCorrect 
                    ? 'Great job! Moving up the ladder!' 
                    : `The correct answer was ${correctAnswer}`
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Explanation Section */}
        <div className={`p-6 rounded-lg mb-4 ${
          darkMode 
            ? 'bg-slate-800/50 text-cyan-100' 
            : 'bg-blue-50 text-slate-800'
        }`}>
          <h4 className={`font-bold text-lg mb-3 ${
            darkMode ? 'text-cyan-400' : 'text-blue-600'
          }`}>
            📚 Teaching Point:
          </h4>
          <p className="leading-relaxed whitespace-pre-line">
            {explanation}
          </p>
        </div>

        {/* Current Progress */}
        {currentRung && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`p-4 rounded-lg mb-4 text-center ${
              darkMode 
                ? 'bg-slate-700/50 text-cyan-300' 
                : 'bg-white text-slate-700'
            }`}
          >
            <p className="text-sm opacity-75 mb-1">You are currently at:</p>
            <p className="text-xl font-bold">
              Rung {currentRung} / 10
            </p>
          </motion.div>
        )}

        {/* Continue Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            triggerHaptic('medium')
            soundManager.click()
            onContinue()
          }}
          className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-300 ${
            darkMode
              ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-lg hover:shadow-cyan-500/50'
              : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-500/50'
          }`}
        >
          {isCorrect ? '🚀 Next Question' : '📖 Try Again'}
        </motion.button>
      </motion.div>
    </>
  )
}
