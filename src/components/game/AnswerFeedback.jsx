import React from 'react'

export default function AnswerFeedback({ feedbackData, onNext }) {
  const { isCorrect, correctAnswer, teachingPoint, newRung, oldRung, timeTaken, points } = feedbackData

  const getRungMovement = () => {
    if (newRung > oldRung) {
      return `You moved UP to Rung ${newRung}! 🎉`
    } else if (newRung < oldRung) {
      return `You dropped DOWN to Rung ${newRung}`
    } else {
      return `You stayed at Rung ${newRung}`
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        {/* Result Icon and Title */}
        <div className="text-center mb-6">
          <div className="text-6xl mb-4">
            {isCorrect ? '✅' : '❌'}
          </div>
          <h2 className={`text-3xl font-bold mb-2 ${isCorrect ? 'text-success-green' : 'text-error-red'}`}>
            {isCorrect ? 'CORRECT!' : 'INCORRECT'}
          </h2>
          <p className="text-xl text-gray-700">
            {getRungMovement()}
          </p>
        </div>

        {/* Show Correct Answer if Wrong */}
        {!isCorrect && (
          <div className="mb-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-gray-800">
              <strong>Correct Answer:</strong> ({correctAnswer})
            </p>
          </div>
        )}

        {/* Teaching Point */}
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-bold text-gray-800 mb-2">📚 Teaching Point:</h3>
          <p className="text-gray-700">{teachingPoint}</p>
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-6 mb-6 text-sm text-gray-600">
          <div>
            You answered in <strong>{timeTaken} seconds</strong>
          </div>
          {isCorrect && (
            <div>
              +<strong>{points} points</strong>
            </div>
          )}
        </div>

        {/* Encouragement Message */}
        {!isCorrect && newRung < oldRung && (
          <div className="text-center mb-6">
            <p className="text-gray-600">Don't worry - you can climb back up! 💪</p>
          </div>
        )}

        {/* Next Button */}
        <button
          onClick={onNext}
          className="w-full bg-medical-blue text-white font-bold py-3 rounded-lg hover:bg-blue-700 active:bg-blue-800 active:scale-95 transition-all"
        >
          NEXT QUESTION →
        </button>
      </div>
    </div>
  )
}
