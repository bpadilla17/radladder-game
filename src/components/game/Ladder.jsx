import React, { useState } from 'react'
import { motion } from 'framer-motion'
import hapticFeedback from '../../utils/hapticFeedback'

export default function Ladder({ currentRung, passesRemaining, lifelines, safetyNetActive }) {
  const [showingEasterEgg, setShowingEasterEgg] = useState(null)
  const rungs = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
  
  const getRungLabel = (rung) => {
    const labels = {
      10: 'Prometheus Lionhart',
      9: 'Seasoned Attending',
      8: 'New Attending',
      7: 'R4',
      6: 'R3 - Core Studying',
      5: 'R2 - Valley of Despair',
      4: 'R1 - Peak Mt. Stupid',
      3: 'R1 - Starting Call',
      2: 'R1 - First Month',
      1: 'R1 - Day 1'
    }
    return labels[rung]
  }

  const getRungEmoji = (rung) => {
    const emojis = {
      10: '🏆',
      9: '🎩',
      8: '🆕',
      7: '💰',
      6: '🤓',
      5: '😰',
      4: '🤡',
      3: '📞',
      2: '😵',
      1: '👶'
    }
    return emojis[rung]
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
    if (showingEasterEgg !== null) return

    hapticFeedback.light()
    setShowingEasterEgg(rung)
    
    setTimeout(() => {
      setShowingEasterEgg(null)
    }, 3000)
  }

  const getRungColor = (rung) => {
    if (rung === currentRung) return 'bg-neon-blue text-white shadow-glow-blue'
    if (rung === 5) return 'bg-yellow-100 text-gray-700'
    if (rung > currentRung) return 'bg-gray-100 text-gray-400'
    return 'bg-gray-50 text-gray-500'
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">YOUR LADDER</h2>
      
      {/* Ladder Rungs - COMPACT FORMAT */}
      <div className="space-y-2 mb-6">
        {rungs.map(rung => (
          <motion.div
            key={rung}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: (10 - rung) * 0.05 }}
            className={`flex items-center gap-2 p-2 rounded-lg transition-all ${getRungColor(rung)} relative`}
          >
            {/* COMPACT: R10 instead of Rung 10, all on one line */}
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className="font-semibold text-sm whitespace-nowrap">R{rung}</span>
              
              {/* Clickable Emoji with Easter Egg */}
              <span 
                onClick={() => handleEmojiClick(rung)}
                className="text-lg cursor-pointer hover:scale-110 transition-transform flex-shrink-0"
                role="button"
                aria-label="Click for easter egg"
              >
                {getRungEmoji(rung)}
              </span>
              
              <span className="text-sm truncate">{getRungLabel(rung)}</span>
            </div>
            
            {/* Current Position Indicator */}
            {currentRung === rung && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-lg flex-shrink-0"
              >
                👤
              </motion.span>
            )}
            
            {/* Easter Egg Popup */}
            {showingEasterEgg === rung && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="absolute left-0 right-0 top-full mt-2 bg-gray-800 text-white text-xs p-2 rounded shadow-lg z-10"
              >
                {getRungTagline(rung)}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Lifelines Section */}
      <div className="border-t pt-4">
        <h3 className="font-bold text-gray-800 mb-2">Lifelines:</h3>
        <div className="space-y-2">
          <div className={`flex items-center gap-2 ${lifelines.askAudience ? 'text-neon-blue' : 'text-gray-400 line-through'}`}>
            <span>📊</span>
            <span className="text-sm">Ask Audience</span>
          </div>
          <div className={`flex items-center gap-2 ${lifelines.safetyNet ? 'text-neon-blue' : 'text-gray-400 line-through'}`}>
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
