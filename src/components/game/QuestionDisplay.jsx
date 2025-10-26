import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { triggerHaptic } from '../../utils/hapticFeedback'

export default function QuestionDisplay({ 
  question, 
  images, 
  onAnswerSelect, 
  selectedAnswer,
  showFeedback 
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [darkMode, setDarkMode] = useState(false)

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

  // Reset image index when question changes
  useEffect(() => {
    setCurrentImageIndex(0)
  }, [question?.id])

  // Keyboard navigation for images (but prevent page scroll)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (showFeedback) return // Don't navigate during feedback
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault() // Prevent page scroll
        setCurrentImageIndex((prev) => Math.max(0, prev - 1))
        triggerHaptic('light')
      } else if (e.key === 'ArrowRight') {
        e.preventDefault() // Prevent page scroll
        setCurrentImageIndex((prev) => Math.min(images?.length - 1 || 0, prev + 1))
        triggerHaptic('light')
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [images?.length, showFeedback])

  if (!question || !images) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="spinner" />
      </div>
    )
  }

  const handleAnswerClick = (answer) => {
    if (showFeedback || selectedAnswer) return
    triggerHaptic('medium')
    onAnswerSelect(answer)
  }

  const handleDotClick = (index) => {
    setCurrentImageIndex(index)
    triggerHaptic('light')
  }

  return (
    <div className="space-y-4">
      {/* Image Display with Carousel */}
      <div className="relative">
        {/* Main Image */}
        <div className={`relative rounded-lg overflow-hidden ${
          darkMode ? 'bg-slate-800' : 'bg-gray-100'
        }`}>
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={images[currentImageIndex]?.url || images[currentImageIndex]}
              alt={`Medical image ${currentImageIndex + 1}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-auto max-h-[400px] object-contain"
              style={{ maxHeight: '400px' }}
            />
          </AnimatePresence>

          {/* Image Navigation Arrows (only if multiple images) */}
          {images.length > 1 && (
            <>
              <button
                onClick={() => {
                  setCurrentImageIndex((prev) => Math.max(0, prev - 1))
                  triggerHaptic('light')
                }}
                disabled={currentImageIndex === 0}
                className={`absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all ${
                  currentImageIndex === 0
                    ? 'opacity-30 cursor-not-allowed'
                    : darkMode
                    ? 'bg-slate-800/80 hover:bg-slate-700 text-cyan-400'
                    : 'bg-white/80 hover:bg-white text-blue-600'
                } backdrop-blur`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={() => {
                  setCurrentImageIndex((prev) => Math.min(images.length - 1, prev + 1))
                  triggerHaptic('light')
                }}
                disabled={currentImageIndex === images.length - 1}
                className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all ${
                  currentImageIndex === images.length - 1
                    ? 'opacity-30 cursor-not-allowed'
                    : darkMode
                    ? 'bg-slate-800/80 hover:bg-slate-700 text-cyan-400'
                    : 'bg-white/80 hover:bg-white text-blue-600'
                } backdrop-blur`}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Carousel Dots - Below Image */}
        {images.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-3">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`carousel-dot ${index === currentImageIndex ? 'active' : ''}`}
                aria-label={`View image ${index + 1}`}
              />
            ))}
            <span className={`ml-2 text-sm ${darkMode ? 'text-cyan-300' : 'text-slate-600'}`}>
              {currentImageIndex + 1} / {images.length}
            </span>
          </div>
        )}
      </div>

      {/* Question Text */}
      <div className={`p-4 rounded-lg ${
        darkMode ? 'bg-slate-800/50 text-cyan-100' : 'bg-blue-50 text-slate-800'
      }`}>
        <h3 className="font-semibold text-lg">{question.question_text}</h3>
      </div>

      {/* Answer Buttons */}
      <div className="space-y-3">
        {['A', 'B', 'C', 'D'].map((letter) => {
          const isSelected = selectedAnswer === letter
          const isDimmed = selectedAnswer && selectedAnswer !== letter

          return (
            <motion.button
              key={letter}
              onClick={() => handleAnswerClick(letter)}
              disabled={showFeedback || selectedAnswer}
              whileHover={!showFeedback && !selectedAnswer ? { scale: 1.02 } : {}}
              whileTap={!showFeedback && !selectedAnswer ? { scale: 0.98 } : {}}
              className={`answer-button w-full p-4 rounded-lg border-2 text-left font-medium transition-all duration-300 ${
                isSelected
                  ? 'selected'
                  : isDimmed
                  ? 'dimmed'
                  : darkMode
                  ? 'bg-slate-700 border-slate-600 text-cyan-100 hover:border-cyan-400'
                  : 'bg-white border-gray-300 text-slate-800 hover:border-blue-400 hover:bg-blue-50'
              } ${
                showFeedback || selectedAnswer ? 'cursor-not-allowed' : 'cursor-pointer'
              }`}
            >
              <span className="font-bold mr-3">{letter}.</span>
              {question[`option_${letter.toLowerCase()}`]}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
