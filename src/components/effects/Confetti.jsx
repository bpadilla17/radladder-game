import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { deviceCapability } from '../../utils/deviceCapability'

export default function Confetti() {
  const [pieces, setPieces] = useState([])
  const config = deviceCapability.getConfig()

  useEffect(() => {
    const newPieces = Array.from({ length: config.confettiPieces }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 2,
      rotation: Math.random() * 360,
      color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#f7dc6f', '#bb8fce', '#85c1e2'][Math.floor(Math.random() * 6)],
    }))
    setPieces(newPieces)
  }, [config.confettiPieces])

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute w-2 h-2 rounded-sm"
          style={{
            left: `${piece.x}%`,
            backgroundColor: piece.color,
            top: '-10px',
          }}
          animate={{
            y: [0, window.innerHeight + 20],
            x: [0, (Math.random() - 0.5) * 100],
            rotate: [piece.rotation, piece.rotation + 360],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: 'easeIn',
          }}
        />
      ))}
    </div>
  )
}
