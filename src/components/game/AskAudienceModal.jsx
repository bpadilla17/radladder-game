import React from 'react'

export default function AskAudienceModal({ audienceData, onClose }) {
  if (!audienceData) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            📊 ASK THE AUDIENCE 📊
          </h2>
          <p className="text-gray-600 text-center mb-6">
            Not enough data yet. At least 10 people need to have answered this question first.
          </p>
          <button
            onClick={onClose}
            className="w-full bg-medical-blue text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            BACK TO QUESTION
          </button>
        </div>
      </div>
    )
  }

  const options = [
    { letter: 'A', percentage: audienceData.A },
    { letter: 'B', percentage: audienceData.B },
    { letter: 'C', percentage: audienceData.C },
    { letter: 'D', percentage: audienceData.D }
  ]

  const maxPercentage = Math.max(...options.map(o => o.percentage))

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          📊 ASK THE AUDIENCE 📊
        </h2>

        <p className="text-gray-600 text-center mb-6">
          Here's what other players chose:
        </p>

        {/* Bar Chart */}
        <div className="space-y-4 mb-6">
          {options.map(option => (
            <div key={option.letter}>
              <div className="flex justify-between mb-1">
                <span className="font-bold text-gray-800">({option.letter})</span>
                <span className="text-gray-600">{option.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-8">
                <div
                  className={`h-8 rounded-full flex items-center justify-end pr-2 transition-all ${
                    option.percentage === maxPercentage
                      ? 'bg-green-500'
                      : 'bg-blue-400'
                  }`}
                  style={{ width: `${option.percentage}%` }}
                >
                  {option.percentage > 0 && (
                    <span className="text-white font-bold text-sm">
                      {option.percentage}%
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-sm text-gray-500 text-center mb-4">
          Based on {audienceData.total} previous players
        </p>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-700 text-center">
            ⚠️ The audience doesn't always get it right! Use this information wisely.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-medical-blue text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          BACK TO QUESTION
        </button>
      </div>
    </div>
  )
}
