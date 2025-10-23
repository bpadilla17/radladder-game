import React, { useState } from 'react'

export default function NameEntry({ onSubmit, onBack }) {
  const [name, setName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim()) {
      onSubmit(name.trim())
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-6 text-gray-600 hover:text-gray-800 flex items-center"
        >
          ← Back
        </button>

        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-medical-blue mb-2">
            🪜 CLIMB THE LADDER 🪜
          </h1>
          <p className="text-xl text-gray-700 mt-4">
            What's your name?
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter name or initials"
              className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:border-medical-blue focus:outline-none"
              maxLength={50}
              autoFocus
            />
          </div>

          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full bg-medical-blue text-white text-xl font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            START CLIMBING
          </button>

          <p className="text-sm text-gray-500 text-center mt-4">
            Your progress will be saved on the leaderboard using this name
          </p>
        </form>
      </div>
    </div>
  )
}
