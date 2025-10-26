import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { triggerHaptic } from '../utils/hapticFeedback'

export default function NameEntry({ onSubmit }) {
  const [name, setName] = useState('')
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    // Check dark mode from document
    const isDark = document.documentElement.classList.contains('dark')
    setDarkMode(isDark)

    // Listen for dark mode changes
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

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim()) {
      triggerHaptic('medium')
      onSubmit(name.trim())
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center px-6 transition-colors duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900' 
        : 'bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-50'
    }`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className={`w-full max-w-md p-8 rounded-2xl shadow-2xl ${
          darkMode ? 'bg-slate-800/90 backdrop-blur' : 'bg-white/90 backdrop-blur'
        }`}
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`text-3xl font-bold text-center mb-6 ${
            darkMode ? 'text-cyan-400' : 'text-blue-600'
          }`}
        >
          Enter Your Name
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className={`text-center mb-8 ${
            darkMode ? 'text-cyan-100' : 'text-slate-600'
          }`}
        >
          Join the ranks of radiology residents
        </motion.p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name here..."
              maxLength={20}
              className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-300 focus:outline-none focus:ring-2 ${
                darkMode
                  ? 'bg-slate-700 border-slate-600 text-cyan-100 placeholder-slate-400 focus:border-cyan-400 focus:ring-cyan-400/50'
                  : 'bg-white border-gray-300 text-slate-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500/50'
              }`}
              autoFocus
            />
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={!name.trim()}
            className={`w-full py-3 rounded-lg font-bold text-lg transition-all duration-300 ${
              name.trim()
                ? darkMode
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:shadow-lg hover:shadow-cyan-500/50'
                  : 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:shadow-lg hover:shadow-blue-500/50'
                : darkMode
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {name.trim() ? '🚀 Begin Your Journey' : '✏️ Enter Name to Continue'}
          </motion.button>
        </form>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className={`mt-6 text-center text-sm ${
            darkMode ? 'text-cyan-300/60' : 'text-slate-500'
          }`}
        >
          Your progress will be saved to the leaderboard
        </motion.div>
      </motion.div>
    </div>
  )
}
