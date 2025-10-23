import React from 'react'

export default function Ladder({ currentRung, passesRemaining, lifelines, safetyNetActive }) {
  const rungs = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
  
  const getRungLabel = (rung) => {
    if (rung === 10) return '🏆 Attending'
    if (rung === 9) return 'Chief Resident'
    if (rung === 8) return 'Senior Resident'
    if (rung === 7) return 'Junior Resident'
    if (rung === 6) return 'Advanced R1'
    if (rung === 5) return '⭐ Standard R1'
    if (rung === 4) return 'Basic R1'
    if (rung === 3) return 'Med Student'
    if (rung === 2) return 'Preclinical'
    return 'Lay Person'
  }

  const getRungColor = (rung) => {
    if (rung === currentRung) return 'bg-medical-blue text-white'
    if (rung === 5) return 'bg-yellow-100 text-gray-700'
    if (rung > currentRung) return 'bg-gray-100 text-gray-400'
    return 'bg-gray-50 text-gray-500'
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">YOUR LADDER</h2>
      
      {/* Ladder Rungs */}
      <div className="space-y-2 mb-6">
        {rungs.map(rung => (
          <div
            key={rung}
            className={`flex items-center justify-between p-3 rounded-lg transition-colors ${getRungColor(rung)}`}
          >
            <span className="font-semibold">Rung {rung}</span>
            <span className="text-sm">{getRungLabel(rung)}</span>
            {currentRung === rung && <span className="text-lg">👤</span>}
          </div>
        ))}
      </div>

      {/* Lifelines Section */}
      <div className="border-t pt-4">
        <h3 className="font-bold text-gray-800 mb-2">Lifelines:</h3>
        <div className="space-y-2">
          <div className={`flex items-center gap-2 ${lifelines.askAudience ? 'text-medical-blue' : 'text-gray-400 line-through'}`}>
            <span>📊</span>
            <span className="text-sm">Ask Audience</span>
          </div>
          <div className={`flex items-center gap-2 ${lifelines.safetyNet ? 'text-medical-blue' : 'text-gray-400 line-through'}`}>
            <span>🛡️</span>
            <span className="text-sm">Safety Net</span>
            {safetyNetActive && <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">ACTIVE</span>}
          </div>
        </div>
      </div>

      {/* Passes Section */}
      <div className="border-t pt-4 mt-4">
        <h3 className="font-bold text-gray-800 mb-2">Passes:</h3>
        <div className="flex gap-2">
          {[...Array(2)].map((_, i) => (
            <span key={i} className={`text-2xl ${i < passesRemaining ? '' : 'opacity-30'}`}>
              ⏭️
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
