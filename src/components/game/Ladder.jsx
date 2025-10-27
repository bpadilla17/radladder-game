import React, { useState } from 'react'

export default function Ladder({ currentRung, passesRemaining, lifelines, safetyNetActive }) {
  const [showingEasterEgg, setShowingEasterEgg] = useState(null)
  const rungs = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
  
  const getRungLabel = (rung) => {
    if (rung === 10) return '🏆 Prometheus Lionhart'
    if (rung === 9) return '🎩 Seasoned Attending'
    if (rung === 8) return '🆕 New Attending'
    if (rung === 7) return '💰 R4'
    if (rung === 6) return '🤓 R3 - Core Studying'
    if (rung === 5) return '😰 R2 - Valley of Despair'
    if (rung === 4) return '🤡 R1 - Peak Mt. Stupid'
    if (rung === 3) return '📞 R1 - Starting Call'
    if (rung === 2) return '😵 R1 - First Month'
    return '👶 R1 - Day 1'
  }

  const getRungEmoji = (rung) => {
    if (rung === 10) return '🏆'
    if (rung === 9) return '🎩'
    if (rung === 8) return '🆕'
    if (rung === 7) return '💰'
    if (rung === 6) return '🤓'
    if (rung === 5) return '😰'
    if (rung === 4) return '🤡'
    if (rung === 3) return '📞'
    if (rung === 2) return '😵'
    return '👶'
  }

  const getRungTagline = (rung) => {
    const taglines = {
      1: "What's a sagi?",
      2: "Normal? Never heard of her",
      3: "Ileitis or appy? Surgeon's problem now",
      4: "I can read this better than some attendings (also calls trauma for nutrient vessel)",
      5: "Valley of Despair: Missing PEs while worried about sagis",
      6: "Ackchyually, it's Gorham-Stout disease",
      7: "$ide hu$tle $ea$on",
      8: "Let me ask my atten—",
      9: "The fool doth think he is wise, but the wise man knows himself to be a fool.",
      10: "You've transcended mortal radiology"
    }
    return taglines[rung]
  }

  const handleEmojiClick = (rung) => {
    // Ignore clicks if already showing an easter egg (cooldown option B)
    if (showingEasterEgg !== null) return

    setShowingEasterEgg(rung)
    
    // Auto-dismiss after 3 seconds
    setTimeout(() => {
      setShowingEasterEgg(null)
    }, 3000)
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
            className={`flex items-center justify-between p-3 rounded-lg transition-colors ${getRungColor(rung)} relative`}
          >
            <div className="flex items-center gap-2">
              <span className="font-semibold">Rung {rung}</span>
              {/* Clickable Emoji with Easter Egg */}
              <span 
                onClick={() => handleEmojiClick(rung)}
                className="text-lg cursor-pointer hover:scale-110 transition-transform"
                style={{ cursor: 'pointer' }}
              >
                {getRungEmoji(rung)}
              </span>
            </div>
            <span className="text-sm">{getRungLabel(rung).replace(/^[^\s]+\s/, '')}</span>
            {currentRung === rung && <span className="text-lg">👤</span>}
            
            {/* Easter Egg Popup */}
            {showingEasterEgg === rung && (
              <div 
                className="absolute left-0 right-0 top-full mt-2 bg-gray-800 text-white text-xs p-2 rounded shadow-lg z-10 animate-fadeIn"
                style={{
                  animation: 'fadeIn 0.3s ease-in-out'
                }}
              >
                {getRungTagline(rung)}
              </div>
            )}
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

      {/* Add fadeIn animation styles */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
