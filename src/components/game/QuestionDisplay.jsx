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

  const timePercentage = (timeLeft / totalTime) * 100
  const isUrgent = timeLeft <= 10

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Timer */}
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

      {/* Clinical Scenario */}
      <div className="mb-4 p-4 bg-blue-50 rounded-lg">
        <p className="text-gray-800">
          <strong>Clinical:</strong> {question.clinical_scenario}
        </p>
      </div>

      {/* Image Display */}
      {imageUrls.length > 0 && (
        <div className="mb-4">
          <div className="relative bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={imageUrls[currentImageIndex]}
              alt={`Case image ${currentImageIndex + 1}`}
              className="w-full h-auto max-h-96 object-contain"
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Found'
              }}
            />
            
            {/* Image Navigation for Multiple Images */}
            {hasMultipleImages && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                >
                  ←
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
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
                  className={`flex-shrink-0 w-16 h-16 rounded border-2 overflow-hidden ${
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
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">{question.question_text}</h3>
      </div>

      {/* Answer Options */}
      <div className="space-y-3 mb-6">
        {['A', 'B', 'C', 'D'].map(option => (
          <button
            key={option}
            onClick={() => handleAnswerSelect(option)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-colors ${
              selectedAnswer === option
                ? 'border-medical-blue bg-blue-50'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <span className="font-bold mr-3">({option})</span>
            {question[`option_${option.toLowerCase()}`]}
          </button>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={!selectedAnswer}
          className="w-full bg-medical-blue text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          SUBMIT ANSWER
        </button>

        {/* Lifeline Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onAskAudience}
            disabled={!lifelines.askAudience}
            className="py-2 px-4 bg-purple-100 text-purple-800 rounded-lg font-semibold hover:bg-purple-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            📊 Ask Audience
          </button>
          <button
            onClick={onSafetyNet}
            disabled={!lifelines.safetyNet || safetyNetActive}
            className="py-2 px-4 bg-green-100 text-green-800 rounded-lg font-semibold hover:bg-green-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            🛡️ Safety Net
          </button>
        </div>

        {/* Pass Button */}
        <button
          onClick={onPass}
          disabled={passesRemaining === 0}
          className="w-full py-2 px-4 bg-gray-100 text-gray-800 rounded-lg font-semibold hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          ⏭️ PASS ({passesRemaining} remaining)
        </button>
      </div>
    </div>
  )
}
