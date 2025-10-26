import React from 'react'
import { motion } from 'framer-motion'
import ParticleBackground from './effects/ParticleBackground'
import { getDeviceConfig } from '../utils/deviceCapability'
import hapticFeedback from '../utils/hapticFeedback'
import soundManager from '../utils/soundManager'

export default function LandingPage({ onStartGame, onViewLeaderboard, onHowToPlay }) {
  const deviceConfig = getDeviceConfig()

  const handleButtonClick = (callback) => {
    hapticFeedback.medium()
    soundManager.click()
    callback()
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Particle Background (adaptive based on device) */}
      <ParticleBackground />
      
      {/* Animated Gradient Background */}
      <div className={`absolute inset-0 ${
        deviceConfig.gradientAnimation === true 
          ? 'bg-gradient-to-br from-game-darker via-game-dark to-game-purple animate-gradient'
          : deviceConfig.gradientAnimation === 'subtle'
          ? 'bg-gradient-to-br from-game-darker via-game-dark to-game-purple'
          : 'bg-game-dark'
      }`} />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center">
          {/* Game Title with Neon Glow */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
            className="mb-12"
          >
            <motion.h1
              className={`text-6xl md:text-7xl font-bold mb-4 ${
                deviceConfig.glowIntensity === 'high' ? 'text-neon-cyan' : 'text-neon-blue'
              }`}
              style={{
                textShadow: deviceConfig.glowIntensity === 'high'
                  ? '0 0 20px rgba(0, 229, 255, 0.8), 0 0 40px rgba(0, 229, 255, 0.6), 0 0 60px rgba(0, 229, 255, 0.4)'
                  : deviceConfig.glowIntensity === 'medium'
                  ? '0 0 10px rgba(0, 153, 255, 0.6), 0 0 20px rgba(0, 153, 255, 0.4)'
                  : '0 0 5px rgba(0, 153, 255, 0.5)',
              }}
              animate={deviceConfig.glowIntensity === 'high' ? {
                textShadow: [
                  '0 0 20px rgba(0, 229, 255, 0.8), 0 0 40px rgba(0, 229, 255, 0.6)',
                  '0 0 25px rgba(0, 229, 255, 1), 0 0 50px rgba(0, 229, 255, 0.8)',
                  '0 0 20px rgba(0, 229, 255, 0.8), 0 0 40px rgba(0, 229, 255, 0.6)',
                ]
              } : {}}
              transition={deviceConfig.glowIntensity === 'high' ? {
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut'
              } : {}}
            >
              🪜 RADLADDER 🪜
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-gray-300"
            >
              Radiology Training Game
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-sm md:text-base text-gray-400 mt-2"
            >
              Climb from Med Student to Attending Level
            </motion.p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="space-y-4"
          >
            {/* Start Game Button - Primary */}
            <motion.button
              onClick={() => handleButtonClick(onStartGame)}
              className="w-full max-w-md mx-auto block bg-gradient-to-r from-neon-blue to-neon-cyan text-white text-xl font-bold py-4 px-8 rounded-lg shadow-neon-strong transition-all"
              whileHover={{ scale: 1.05, boxShadow: deviceConfig.glowIntensity === 'high' ? '0 0 25px rgba(0, 229, 255, 0.8), 0 0 50px rgba(0, 229, 255, 0.6)' : undefined }}
              whileTap={{ scale: 0.95 }}
            >
              ▶ START GAME
            </motion.button>

            {/* Secondary Buttons */}
            <motion.button
              onClick={() => handleButtonClick(onViewLeaderboard)}
              className="w-full max-w-md mx-auto block bg-game-dark border-2 border-neon-blue text-neon-blue text-xl font-semibold py-4 px-8 rounded-lg hover:bg-neon-blue hover:text-white transition-all"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              🏆 LEADERBOARD
            </motion.button>

            <motion.button
              onClick={() => handleButtonClick(onHowToPlay)}
              className="w-full max-w-md mx-auto block bg-game-dark border-2 border-gray-500 text-gray-300 text-xl font-semibold py-4 px-8 rounded-lg hover:border-neon-blue hover:text-neon-blue transition-all"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              ❓ HOW TO PLAY
            </motion.button>
          </motion.div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-12 text-sm text-gray-500"
          >
            <p>First-Year Radiology Resident Training</p>
            <p className="mt-2">Can you reach Prometheus Lionhart status?</p>
          </motion.div>
        </div>
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
