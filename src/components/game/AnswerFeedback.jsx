import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Confetti from '../effects/Confetti'
import hapticFeedback from '../../utils/hapticFeedback'
import soundManager from '../../utils/soundManager'

export default function AnswerFeedback({ feedbackData, onNext }) {
  const { isCorrect, correctAnswer, teachingPoint, newRung, oldRung, timeTaken, points } = feedbackData
  const [showConfetti, setShowConfetti] = useState(false)

  useEffect(() => {
    if (isCorrect) {
      setShowConfetti(true)
      hapticFeedback.success()
      soundManager.correct()
    } else {
      hapticFeedback.error()
      soundManager.wrong()
    }
  }, [isCorrect])

  const getRungMovement = () => {
    if (newRung > oldRung) {
      return `You moved UP to Rung ${newRung}! 🎉`
    } else if (newRung < oldRung) {
      return `You dropped DOWN to Rung ${newRung}`
    } else {
      return `You stayed at Rung ${newRung}`
    }
  }

  const handleNext = () => {
    hapticFeedback.medium()
    soundManager.click()
    onNext()
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Confetti for correct answers */}
      <Confetti active={showConfetti} onComplete={() => setShowConfetti(false)} />
      
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={
          isCorrect
            ? { scale: 1, opacity: 1 }
            : {
                scale: 1,
                opacity: 1,
                x: [0, -10, 10, -10, 10, 0], // Shake animation for wrong
              }
        }
        transition={{ duration: isCorrect ? 0.3 : 0.5 }}
        className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8"
      >
        {/* Result Icon and Title */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="text-6xl mb-4"
          >
            {isCorrect ? '✅' : '❌'}
          </motion.div>
          <h2 className={`text-3xl font-bold mb-2 ${isCorrect ? 'text-success-green' : 'text-error-red'}`}>
            {isCorrect ? 'CORRECT!' : 'INCORRECT'}
          </h2>
          <p className="text-xl text-gray-700">
            {getRungMovement()}
          </p>
        </div>

        {/* Show Correct Answer if Wrong */}
        {!isCorrect && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200"
          >
            <p className="text-gray-800">
              <strong>Correct Answer:</strong> ({correctAnswer})
            </p>
          </motion.div>
        )}

        {/* Teaching Point */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: isCorrect ? 0.3 : 0.4 }}
          className="mb-6 p-4 bg-blue-50 rounded-lg"
        >
          <h3 className="font-bold text-gray-800 mb-2">📚 Teaching Point:</h3>
          <p className="text-gray-700">{teachingPoint}</p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: isCorrect ? 0.4 : 0.5 }}
          className="flex justify-center gap-6 mb-6 text-sm text-gray-600"
        >
          <div>
            You answered in <strong>{timeTaken} seconds</strong>
          </div>
          {isCorrect && (
            <div>
              +<strong>{points} points</strong>
            </div>
          )}
        </motion.div>

        {/* Encouragement Message */}
        {!isCorrect && newRung < oldRung && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mb-6"
          >
            <p className="text-gray-600">Don't worry - you can climb back up! 💪</p>
          </motion.div>
        )}

        {/* Next Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: isCorrect ? 0.5 : 0.7 }}
          onClick={handleNext}
          className="w-full bg-neon-blue text-white font-bold py-3 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition-all shadow-glow-blue"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          NEXT QUESTION →
        </motion.button>
      </motion.div>
    </div>
  )
}
