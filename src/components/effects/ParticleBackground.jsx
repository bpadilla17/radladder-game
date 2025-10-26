import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { deviceCapability } from '../../utils/deviceCapability'

export default function ParticleBackground({ darkMode = false }) {
  const [particles, setParticles] = useState([])
  const config = deviceCapability.getConfig()

  useEffect(() => {
    if (config.particleCount === 0) {
      setParticles([])
      return
    }

    const newParticles = Array.from({ length: config.particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 3,
      duration: 15 + Math.random() * 10,
      delay: Math.random() * 5,
    }))
    setParticles(newParticles)
  }, [config.particleCount])

  if (config.particleCount === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: darkMode ? 'rgba(34, 211, 238, 0.3)' : 'rgba(59, 130, 246, 0.2)',
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
