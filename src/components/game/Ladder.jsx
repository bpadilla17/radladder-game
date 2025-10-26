import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Ladder({ currentRung, totalRungs = 10 }) {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark')
    setDarkMode(isDark)

    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark')
      setDarkMode(isDark)
    })

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })

    return () => observer.disconnect()
  }, [])

  const rungs = [
    { level: 10, label: "🏆 Prometheus Lionhart", desc: "God of Radiology" },
    { level: 9, label: "👑 Epic Scanmaster", desc: "Legendary Status" },
    { level: 8, label: "🔥 Chief Resident", desc: "Near Perfection" },
    { level: 7, label: "⚡ Senior Resident", desc: "Expert Level" },
    { level: 6, label: "🌟 Mid-Level Resident", desc: "Solid Foundation" },
    { level: 5, label: "⭐ Standard R1", desc: "Average Resident" },
    { level: 4, label: "📚 Learning Mode", desc: "Building Skills" },
    { level: 3, label: "🔰 Novice Reader", desc: "Early Training" },
    { level: 2, label: "🌱 Medical Student", desc: "Just Starting" },
    { level: 1, label: "👶 Intern", desc: "Beginner" },
  ]

  const getRungColor = (rung, isCurrent) => {
    if (!isCurrent && darkMode) return 'bg-slate-700/50 text-slate-400'
    if (!isCurrent && !darkMode) return 'bg-gray-100 text-gray-500'
    
    if (rung === 10) return darkMode ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900' : 'bg-gradient-to-r from-yellow-300 to-orange-400 text-slate-900'
    if (rung >= 8) return darkMode ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' : 'bg-gradient-to-r from-purple-400 to-pink-400 text-white'
    if (rung >= 6) return darkMode ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' : 'bg-gradient-to-r from-blue-400 to-cyan-400 text-white'
    if (rung >= 4) return darkMode ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' : 'bg-gradient-to-r from-green-400 to-emerald-400 text-white'
    return darkMode ? 'bg-gradient-to-r from-slate-600 to-slate-500 text-white' : 'bg-gradient-to-r from-gray-400 to-gray-500 text-white'
  }

  return (
    <div className={`p-4 rounded-lg ${darkMode ? 'bg-slate-800/50' : 'bg-white/50'} backdrop-blur`}>
      <h3 className={`text-lg font-bold mb-3 ${darkMode ? 'text-cyan-400' : 'text-blue-600'}`}>
        Your Progress
      </h3>
      
      <div className="space-y-2">
        {rungs.map((rung) => (
          <motion.div
            key={rung.level}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: (10 - rung.level) * 0.05 }}
            className={`rung-label ${getRungColor(rung.level, currentRung === rung.level)} ${
              currentRung === rung.level ? 'ring-2 ring-offset-2 ' + (darkMode ? 'ring-cyan-400 ring-offset-slate-900' : 'ring-blue-500 ring-offset-white') : ''
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold">R{rung.level}</span>
                <span className="text-sm">{rung.label}</span>
              </div>
              {currentRung === rung.level && (
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="text-lg"
                >
                  ◀
                </motion.span>
              )}
            </div>
            <div className="text-xs opacity-75 mt-0.5 ml-8">
              {rung.desc}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
