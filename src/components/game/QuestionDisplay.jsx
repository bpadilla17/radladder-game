import React, { useState } from 'react'

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
  const [ripples, setRipples] = useState([])

  // Parse image URLs (could be comma-separated for multiple images)
  const imageUrls = question.image_url ? question.image_url.split(',').map(url => url.trim()) : []
  const hasMultipleImages = imageUrls.length > 1

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer)
  }

  const handleSubmit = () => {
    if (selectedAnswer) {
      onAnswer(selectedAnswer)
    }
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % imageUrls.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + imageUrls.length) % imageUrls.length)
  }

  // Ripple effect handler
  const createRipple = (event, buttonId) => {
    const button = event.currentTarget
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = event.clientX - rect.left - size / 2
    const y = event.clientY - rect.top - size / 2
    
    const newRipple = {
      id: Date.now(),
      x,
      y,
      size,
      buttonId
    }
    
    setRipples([...ripples, newRipple])
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(current => current.filter(r => r.id !== newRipple.id))
    }, 600)
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

      {/* Image Display with 450px max-height */}
      {imageUrls.length > 0 && (
        <div className="mb-4">
          <div className="relative bg-gray-100 rounded-lg overflow-hidden">
            <img
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
          
          {/* Image Thumbnails for Multiple Images */}
          {hasMultipleImages && (
            <div className="flex gap-2 mt-2 overflow-x-auto">
              {imageUrls.map((url, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden transition-all hover:scale-105 active:scale-95 ${
                    currentImageIndex === index ? 'border-medical-blue' : 'border-gray-300'
                  }`}
                >
                  <img
                    src={url}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
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
          <div
            className={`h-2 rounded-full transition-all ${isUrgent ? 'bg-error-red' : 'bg-medical-blue'}`}
            style={{ width: `${timePercentage}%` }}
          />
        </div>
      </div>

      {/* Answer Options with Ripple Effect */}
      <div className="space-y-3 mb-6">
        {['A', 'B', 'C', 'D'].map(option => (
          <button
            key={option}
            onClick={(e) => {
              createRipple(e, option)
              handleAnswerSelect(option)
            }}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all relative overflow-hidden ${
              selectedAnswer === option
                ? 'border-medical-blue bg-blue-50'
                : 'border-gray-300 hover:border-medical-blue hover:bg-blue-50'
            } hover:shadow-md active:scale-98`}
            style={{ position: 'relative' }}
          >
            <span className="font-bold mr-3">({option})</span>
            {question[`option_${option.toLowerCase()}`]}
            
            {/* Ripple Effect */}
            {ripples
              .filter(r => r.buttonId === option)
              .map(ripple => (
                <span
                  key={ripple.id}
                  className="absolute bg-medical-blue opacity-30 rounded-full animate-ripple pointer-events-none"
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                    width: ripple.size,
                    height: ripple.size,
                  }}
                />
              ))}
          </button>
        ))}
      </div>

      {/* Action Buttons with Ripple Effects */}
      <div className="space-y-3">
        {/* Submit Button */}
        <button
          onClick={(e) => {
            if (selectedAnswer) {
              createRipple(e, 'submit')
              handleSubmit()
            }
          }}
          disabled={!selectedAnswer}
          className="w-full bg-medical-blue text-white font-bold py-3 rounded-lg transition-all relative overflow-hidden hover:bg-blue-600 active:bg-blue-700 active:scale-98 disabled:bg-gray-300 disabled:cursor-not-allowed hover:shadow-lg disabled:hover:shadow-none"
        >
          SUBMIT ANSWER
          
          {/* Ripple Effect */}
          {ripples
            .filter(r => r.buttonId === 'submit')
            .map(ripple => (
              <span
                key={ripple.id}
                className="absolute bg-white opacity-30 rounded-full animate-ripple pointer-events-none"
                style={{
                  left: ripple.x,
                  top: ripple.y,
                  width: ripple.size,
                  height: ripple.size,
                }}
              />
            ))}
        </button>

        {/* Lifeline Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={(e) => {
              if (lifelines.askAudience) {
                createRipple(e, 'audience')
                onAskAudience()
              }
            }}
            disabled={!lifelines.askAudience}
            className="py-2 px-4 bg-purple-100 text-purple-800 rounded-lg font-semibold transition-all relative overflow-hidden hover:bg-purple-200 active:bg-purple-300 active:scale-98 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed hover:shadow-md disabled:hover:shadow-none"
          >
            📊 Ask Audience
            
            {/* Ripple Effect */}
            {ripples
              .filter(r => r.buttonId === 'audience')
              .map(ripple => (
                <span
                  key={ripple.id}
                  className="absolute bg-purple-500 opacity-30 rounded-full animate-ripple pointer-events-none"
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                    width: ripple.size,
                    height: ripple.size,
                  }}
                />
              ))}
          </button>
          
          <button
            onClick={(e) => {
              if (lifelines.safetyNet && !safetyNetActive) {
                createRipple(e, 'safety')
                onSafetyNet()
              }
            }}
            disabled={!lifelines.safetyNet || safetyNetActive}
            className="py-2 px-4 bg-green-100 text-green-800 rounded-lg font-semibold transition-all relative overflow-hidden hover:bg-green-200 active:bg-green-300 active:scale-98 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed hover:shadow-md disabled:hover:shadow-none"
          >
            🛡️ Safety Net
            
            {/* Ripple Effect */}
            {ripples
              .filter(r => r.buttonId === 'safety')
              .map(ripple => (
                <span
                  key={ripple.id}
                  className="absolute bg-green-500 opacity-30 rounded-full animate-ripple pointer-events-none"
                  style={{
                    left: ripple.x,
                    top: ripple.y,
                    width: ripple.size,
                    height: ripple.size,
                  }}
                />
              ))}
          </button>
        </div>

        {/* Pass Button */}
        <button
          onClick={(e) => {
            if (passesRemaining > 0) {
              createRipple(e, 'pass')
              onPass()
            }
          }}
          disabled={passesRemaining === 0}
          className="w-full py-2 px-4 bg-gray-100 text-gray-800 rounded-lg font-semibold transition-all relative overflow-hidden hover:bg-gray-200 active:bg-gray-300 active:scale-98 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed hover:shadow-md disabled:hover:shadow-none"
        >
          ⏭️ PASS ({passesRemaining} remaining)
          
          {/* Ripple Effect */}
          {ripples
            .filter(r => r.buttonId === 'pass')
            .map(ripple => (
              <span
                key={ripple.id}
                className="absolute bg-gray-500 opacity-30 rounded-full animate-ripple pointer-events-none"
                style={{
                  left: ripple.x,
                  top: ripple.y,
                  width: ripple.size,
                  height: ripple.size,
                }}
              />
            ))}
        </button>
      </div>

      {/* Add ripple animation styles */}
      <style jsx>{`
        @keyframes ripple {
          from {
            transform: scale(0);
            opacity: 0.5;
          }
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
        .animate-ripple {
          animation: ripple 0.6s ease-out;
        }
        .active\\:scale-98:active {
          transform: scale(0.98);
        }
      `}</style>
    </div>
  )
}
