import React from 'react'

export default function LandingPage({ onStartGame, onViewLeaderboard, onHowToPlay }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        {/* Game Title */}
        <div className="mb-12">
          <h1 className="text-6xl font-bold text-medical-blue mb-4">
            🪜 CLIMB THE LADDER 🪜
          </h1>
          <p className="text-xl text-gray-600">
            Radiology Training Game
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={onStartGame}
            className="w-full max-w-md mx-auto block bg-medical-blue text-white text-xl font-semibold py-4 px-8 rounded-lg hover:bg-blue-700 transition-colors shadow-lg"
          >
            START GAME
          </button>

          <button
            onClick={onViewLeaderboard}
            className="w-full max-w-md mx-auto block bg-gray-100 text-gray-800 text-xl font-semibold py-4 px-8 rounded-lg hover:bg-gray-200 transition-colors"
          >
            VIEW LEADERBOARD
          </button>

          <button
            onClick={onHowToPlay}
            className="w-full max-w-md mx-auto block bg-gray-100 text-gray-800 text-xl font-semibold py-4 px-8 rounded-lg hover:bg-gray-200 transition-colors"
          >
            HOW TO PLAY
          </button>
        </div>

        {/* Footer */}
        <div className="mt-12 text-sm text-gray-500">
          <p>First-Year Radiology Resident Training</p>
          <p className="mt-2">Climb from Rung 3 to Rung 10 - Can you reach Attending Level?</p>
        </div>
      </div>
    </div>
  )
}
