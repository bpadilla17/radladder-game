import React from 'react'

export default function HowToPlay({ onBackHome, onStartPlaying }) {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={onBackHome}
            className="text-gray-600 hover:text-gray-800 flex items-center"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-medical-blue">HOW TO PLAY</h1>
          <div className="w-20"></div> {/* Spacer for centering */}
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 space-y-6">
          <Section title="THE GOAL">
            <p>Climb from Rung 3 to Rung 10 (Attending Level)</p>
          </Section>

          <Section title="THE RULES">
            <ul className="space-y-2">
              <li>✅ <strong>Correct answer</strong> → Move UP 1 rung</li>
              <li>❌ <strong>Wrong answer</strong> → Drop DOWN 2 rungs</li>
              <li>⏭️ <strong>Pass</strong> → Stay in place (2 passes per game)</li>
            </ul>
          </Section>

          <Section title="TIME LIMITS">
            <ul className="space-y-2">
              <li>Rungs 1-3: <strong>30 seconds</strong></li>
              <li>Rungs 4-6: <strong>25 seconds</strong></li>
              <li>Rungs 7-10: <strong>20 seconds</strong></li>
            </ul>
          </Section>

          <Section title="LIFELINES (use once each)">
            <ul className="space-y-2">
              <li>📊 <strong>Ask the Audience</strong> - See what other players chose</li>
              <li>🛡️ <strong>Safety Net</strong> - Wrong answer only drops 1 rung instead of 2</li>
            </ul>
          </Section>

          <Section title="TIPS">
            <ul className="space-y-2">
              <li>• Read teaching points - they help you learn!</li>
              <li>• Don't rush - think through each answer</li>
              <li>• Use lifelines strategically on harder questions</li>
              <li>• Falls happen - you can always climb back up!</li>
            </ul>
          </Section>

          {/* Start Button */}
          <div className="pt-4">
            <button
              onClick={onStartPlaying}
              className="w-full bg-medical-blue text-white text-xl font-semibold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              START PLAYING
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-3">{title}</h2>
      <div className="text-gray-700">{children}</div>
    </div>
  )
}
