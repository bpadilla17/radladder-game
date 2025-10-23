import React from 'react'

export default function GameComplete({ playerName, stats, onPlayAgain, onBackHome }) {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const isVictory = stats.finalRung === 10

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-lg p-8">
        {/* Victory/Completion Message */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">
            {isVictory ? '🏆' : '📊'}
          </div>
          <h2 className="text-4xl font-bold text-medical-blue mb-2">
            {isVictory ? 'YOU DID IT!' : 'GAME OVER'}
          </h2>
          <p className="text-xl text-gray-700">
            {isVictory 
              ? `Congratulations ${playerName}! You reached Rung 10 - Attending Level!`
              : `Good effort ${playerName}! You reached Rung ${stats.finalRung}.`
            }
          </p>
        </div>

        {/* Stats */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-4 text-center">YOUR STATS:</h3>
          <div className="space-y-3">
            <StatRow label="Time" value={formatTime(stats.totalTime)} />
            <StatRow label="Questions Answered" value={stats.totalQuestions} />
            <StatRow label="Correct" value={stats.correctAnswers} />
            <StatRow label="Wrong" value={stats.wrongAnswers} />
            <StatRow label="Accuracy" value={`${Math.round((stats.correctAnswers / stats.totalQuestions) * 100)}%`} />
            <StatRow label="Total Score" value={`${stats.finalScore} points`} />
            <StatRow label="Final Rung" value={`Rung ${stats.finalRung}`} />
          </div>

          {isVictory && (
            <div className="mt-4 pt-4 border-t text-center">
              <p className="text-green-700 font-semibold">
                🎯 Check the leaderboard to see your ranking!
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={onPlayAgain}
            className="flex-1 bg-medical-blue text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            PLAY AGAIN
          </button>
          <button
            onClick={onBackHome}
            className="flex-1 bg-gray-200 text-gray-800 font-bold py-3 rounded-lg hover:bg-gray-300 transition-colors"
          >
            BACK HOME
          </button>
        </div>
      </div>
    </div>
  )
}

function StatRow({ label, value }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-gray-600">{label}:</span>
      <span className="font-bold text-gray-800">{value}</span>
    </div>
  )
}
