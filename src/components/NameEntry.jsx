import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { getDeviceConfig } from '../utils/deviceCapability'
import hapticFeedback from '../utils/hapticFeedback'
import soundManager from '../utils/soundManager'

export default function NameEntry({ onSubmit, onBack }) {
  const [name, setName] = useState('')
  const deviceConfig = getDeviceConfig()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.trim()) {
      hapticFeedback.success()
      soundManager.click()
      onSubmit(name.trim())
    }
  }

  const handleBack = () => {
    hapticFeedback.light()
    soundManager.click()
    onBack()
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Gradient Background */}
      <div className={`absolute inset-0 ${
        deviceConfig.gradientAnimation === true 
          ? 'bg-gradient-to-br from-game-darker via-game-dark to-game-purple animate-gradient'
          : deviceConfig.gradientAnimation === 'subtle'
          ? 'bg-gradient-to-br from-game-darker via-game-dark to-game-purple'
          : 'bg-game-dark'
      }`} />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="max-w-md w-full"
        >
          {/* Back Button */}
          <motion.button
            onClick={handleBack}
            className="mb-6 text-gray-400 hover:text-neon-cyan flex items-center transition-colors"
            whileHover={{ x: -5 }}
          >
            ← Back
          </motion.button>

          {/* Title */}
          <div className="text-center mb-8">
            <motion.h1
              className="text-4xl md:text-5xl font-bold text-neon-cyan mb-2"
              style={{
                textShadow: deviceConfig.glowIntensity === 'high'
                  ? '0 0 20px rgba(0, 229, 255, 0.6), 0 0 40px rgba(0, 229, 255, 0.4)'
                  : '0 0 10px rgba(0, 153, 255, 0.5)',
              }}
            >
              🪜 RADLADDER 🪜
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-300 mt-4"
            >
              Choose Your Codename
            </motion.p>
          </div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onFocus={() => hapticFeedback.light()}
                placeholder="Enter name or initials"
                className="w-full px-4 py-3 text-lg bg-game-dark border-2 border-neon-blue rounded-lg focus:border-neon-cyan focus:outline-none focus:shadow-glow-blue text-white placeholder-gray-500 transition-all"
                maxLength={50}
                autoFocus
              />
            </div>

            <motion.button
              type="submit"
              disabled={!name.trim()}
              className="w-full bg-gradient-to-r from-neon-blue to-neon-cyan text-white text-xl font-bold py-3 px-6 rounded-lg transition-all shadow-neon disabled:from-gray-600 disabled:to-gray-600 disabled:shadow-none disabled:cursor-not-allowed"
              whileHover={name.trim() ? { scale: 1.05 } : {}}
              whileTap={name.trim() ? { scale: 0.95 } : {}}
            >
              {name.trim() ? '🚀 START CLIMBING' : 'ENTER NAME TO START'}
            </motion.button>

            <p className="text-sm text-gray-500 text-center mt-4">
              Your progress will be saved on the leaderboard
            </p>
          </motion.form>
        </motion.div>
      </div>

      {/* Animated gradient keyframes */}
      <style jsx>{`
        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 15s ease infinite;
        }
      `}</style>
    </div>
  )
}
