import React, { useState, useEffect } from 'react'
import { getLeaderboard } from '../supabaseClient'

export default function Leaderboard({ onBackHome, onPlayAgain }) {
  const [allTimeLeaders, setAllTimeLeaders] = useState([])
  const [weeklyLeaders, setWeeklyLeaders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadLeaderboards()
  }, [])

  const loadLeaderboards = async () => {
    setLoading(true)
    const [allTime, weekly] = await Promise.all([
      getLeaderboard('all'),
      getLeaderboard('week')
    ])
    setAllTimeLeaders(allTime)
    setWeeklyLeaders(weekly)
    setLoading(false)
  }

  const formatTime = (seconds) => {
    if (!seconds) return '--:--'
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onBackHome}
            className="text-gray-600 hover:text-gray-800 flex items-center"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-medical-blue">🏆 LEADERBOARD 🏆</h1>
          <div className="w-20"></div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">Loading leaderboard...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* All-Time Leaders */}
            <LeaderboardSection
              title="ALL-TIME LEADERS (Fastest to Rung 10)"
              leaders={allTimeLeaders}
              formatTime={formatTime}
            />

            {/* Weekly Leaders */}
            <LeaderboardSection
              title="THIS WEEK"
              leaders={weeklyLeaders}
              formatTime={formatTime}
            />

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                onClick={onPlayAgain}
                className="flex-1 bg-medical-blue text-white text-lg font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
              >
                PLAY AGAIN
              </button>
              <button
                onClick={onBackHome}
                className="flex-1 bg-gray-200 text-gray-800 text-lg font-semibold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors"
              >
                BACK HOME
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function LeaderboardSection({ title, leaders, formatTime }) {
  const medals = ['🥇', '🥈', '🥉']

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>

      {leaders.length === 0 ? (
        <p className="text-gray-500 text-center py-4">No games completed yet. Be the first!</p>
      ) : (
        <div className="space-y-3">
          {leaders.map((leader, index) => (
            <div
              key={leader.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl w-10 text-center">
                  {medals[index] || `${index + 1}.`}
                </span>
                <span className="font-semibold text-gray-800">
                  {leader.player_name}
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-600">
                  {formatTime(leader.total_time_seconds)}
                </span>
                <span className="text-sm text-gray-500">
                  {leader.correct_answers}/{leader.total_questions} correct
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
