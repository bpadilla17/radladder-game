import React, { useState } from 'react'
import { motion } from 'framer-motion'
import hapticFeedback from '../../utils/hapticFeedback'
import soundManager from '../../utils/soundManager'

export default function QuestionDisplay({
  question,
  timeLeft,
  totalTime,
  onAnswer,
  onPass,
  onAskAudience,
  onSafetyNet,
  passesRemaining,
  lifelines,
  safetyNetActive
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Parse image URLs (could be comma-separated for multiple images)
  const imageUrls = question.image_url ? question.image_url.split(',').map(url => url.trim()) : []
  const hasMultipleImages = imageUrls.length > 1

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer)
    hapticFeedback.medium()
    soundManager.click()
  }

  const handleSubmit = () => {
    if (selectedAnswer) {
      hapticFeedback.heavy()
      soundManager.click()
      onAnswer(selectedAnswer)
    }
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imageUrls.length)
    hapticFeedback.light()
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length)
    hapticFeedback.light()
  }

  const goToImage = (index) => {
    setCurrentImageIndex(index)
    hapticFeedback.light()
  }

  const timePercentage = (timeLeft / totalTime) * 100
  const isUrgent = timeLeft <= 10

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Clinical Scenario */}
      <div className="mb-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-gray-800">
          <strong>Clinical:</strong> {question.clinical_scenario}
        </p>
      </div>

      {/* Image Display with Carousel Dots */}
      {imageUrls.length > 0 && (
        <div className="mb-4">
          <div className="relative bg-gray-100 rounded-lg overflow-hidden">
            <motion.img
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              src={imageUrls[currentImageIndex]}
              alt={`Case image ${currentImageIndex + 1}`}
              className="w-full h-auto object-contain"
              style={{ maxHeight: '450px' }}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found'
              }}
            />
            
            {/* Image Navigation for Multiple Images */}
            {hasMultipleImages && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 active:scale-95 transition-all"
                >
                  ←
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70 active:scale-95 transition-all"
                >
                  →
                </button>
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {imageUrls.length}
                </div>
              </>
            )}
          </div>
          
          {/* CAROUSEL DOTS instead of thumbnails */}
          {hasMultipleImages && (
            <div className="flex justify-center gap-2 mt-3">
              {imageUrls.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToImage(index)}
                  className={`transition-all ${
                    currentImageIndex === index
                      ? 'w-8 h-2 bg-neon-blue rounded-full'
                      : 'w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Question */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800 mb-4">{question.question_text}</h3>
      </div>

      {/* Timer - Repositioned closer to answers */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className={`text-lg font-bold ${isUrgent ? 'text-error-red' : 'text-gray-700'}`}>
            ⏱️ {timeLeft} seconds
          </span>
          {safetyNetActive && (
            <span className="text-sm bg-green-100 text-green-800 px-3 py-1 rounded-full font-semibold">
              🛡️ SAFETY NET ACTIVE
            </span>
          )}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className={`h-2 rounded-full transition-all ${isUrgent ? 'bg-error-red' : 'bg-neon-blue'}`}
            style={{ width: `${timePercentage}%` }}
            animate={isUrgent ? { scale: [1, 1.05, 1] } : {}}
            transition={isUrgent ? { repeat: Infinity, duration: 0.5 } : {}}
          />
        </div>
      </div>

      {/* Answer Options - ENHANCED SELECTION (selected highlighted, others dimmed) */}
      <div className="space-y-3 mb-6">
        {['A', 'B', 'C', 'D'].map(option => (
          <motion.button
            key={option}
            onClick={() => handleAnswerSelect(option)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all relative overflow-hidden ${
              selectedAnswer === option
                ? 'border-neon-blue bg-blue-50 shadow-glow-blue'
                : selectedAnswer
                ? 'border-gray-200 bg-gray-50 opacity-50'
                : 'border-gray-300 hover:border-neon-blue hover:bg-blue-50'
            } hover:shadow-md`}
            whileHover={{ scale: selectedAnswer && selectedAnswer !== option ? 1 : 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="font-bold mr-3">({option})</span>
            {question[`option_${option.toLowerCase()}`]}
          </motion.button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        {/* Submit Button */}
        <motion.button
          onClick={handleSubmit}
          disabled={!selectedAnswer}
          className="w-full bg-neon-blue text-white font-bold py-3 rounded-lg transition-all relative overflow-hidden hover:bg-blue-600 active:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed hover:shadow-neon disabled:hover:shadow-none"
          whileHover={selectedAnswer ? { scale: 1.02 } : {}}
          whileTap={selectedAnswer ? { scale: 0.98 } : {}}
        >
          SUBMIT ANSWER
        </motion.button>

        {/* Lifeline Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <motion.button
            onClick={() => {
              if (lifelines.askAudience) {
                hapticFeedback.medium()
                soundManager.click()
                onAskAudience()
              }
            }}
            disabled={!lifelines.askAudience}
            className="py-2 px-4 bg-purple-100 text-purple-800 rounded-lg font-semibold transition-all hover:bg-purple-200 active:bg-purple-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed hover:shadow-md disabled:hover:shadow-none"
            whileHover={lifelines.askAudience ? { scale: 1.05 } : {}}
            whileTap={lifelines.askAudience ? { scale: 0.95 } : {}}
          >
            📊 Ask Audience
          </motion.button>
          
          <motion.button
            onClick={() => {
              if (lifelines.safetyNet && !safetyNetActive) {
                hapticFeedback.medium()
                soundManager.click()
                onSafetyNet()
              }
            }}
            disabled={!lifelines.safetyNet || safetyNetActive}
            className="py-2 px-4 bg-green-100 text-green-800 rounded-lg font-semibold transition-all hover:bg-green-200 active:bg-green-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed hover:shadow-md disabled:hover:shadow-none"
            whileHover={lifelines.safetyNet && !safetyNetActive ? { scale: 1.05 } : {}}
            whileTap={lifelines.safetyNet && !safetyNetActive ? { scale: 0.95 } : {}}
          >
            🛡️ Safety Net
          </motion.button>
        </div>

        {/* Pass Button */}
        <motion.button
          onClick={() => {
            if (passesRemaining > 0) {
              hapticFeedback.medium()
              soundManager.click()
              onPass()
            }
          }}
          disabled={passesRemaining === 0}
          className="w-full py-2 px-4 bg-gray-100 text-gray-800 rounded-lg font-semibold transition-all hover:bg-gray-200 active:bg-gray-300 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed hover:shadow-md disabled:hover:shadow-none"
          whileHover={passesRemaining > 0 ? { scale: 1.02 } : {}}
          whileTap={passesRemaining > 0 ? { scale: 0.98 } : {}}
        >
          ⏭️ PASS ({passesRemaining} remaining)
        </motion.button>
      </div>
    </div>
  )
}
