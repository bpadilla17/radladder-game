import React, { useEffect, useState } from 'react'
import { getDeviceConfig } from '../../utils/deviceCapability'

export default function Confetti({ active, onComplete }) {
  const [confetti, setConfetti] = useState([])
  const deviceConfig = getDeviceConfig()

  useEffect(() => {
    if (active) {
      // Generate confetti pieces based on device capability
      const pieces = []
      const count = deviceConfig.confettiPieces
      
      const colors = [
        '#00E5FF', // Neon cyan
        '#0099FF', // Neon blue
        '#10B981', // Success green
        '#FFD700', // Gold
        '#FF6B9D', // Pink
      ]
      
      const shapes = ['circle', 'square', 'triangle']
      
      for (let i = 0; i < count; i++) {
        pieces.push({
          id: i,
          x: Math.random() * 100, // Start position (%)
          y: -10, // Start above screen
          rotation: Math.random() * 360,
          color: colors[Math.floor(Math.random() * colors.length)],
          shape: shapes[Math.floor(Math.random() * shapes.length)],
          size: Math.random() * 8 + 4, // 4-12px
          speedX: (Math.random() - 0.5) * 2, // Horizontal drift
          speedY: Math.random() * 2 + 1, // Fall speed
          rotationSpeed: (Math.random() - 0.5) * 10,
        })
      }
      
      setConfetti(pieces)
      
      // Auto-complete after animation
      const duration = deviceConfig.capability === 'low' ? 2000 : 3000
      setTimeout(() => {
        setConfetti([])
        if (onComplete) onComplete()
      }, duration)
    }
  }, [active])

  if (!active || confetti.length === 0) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className={`absolute ${
            piece.shape === 'circle' ? 'rounded-full' : ''
          }`}
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            animation: `confettiFall ${deviceConfig.capability === 'low' ? 2 : 3}s ease-out forwards`,
            animationDelay: `${Math.random() * 0.1}s`,
            clipPath: piece.shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none',
          }}
        />
      ))}
      
      <style jsx>{`
        @keyframes confettiFall {
          0% {
            transform: translateY(0) rotate(${Math.random() * 360}deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) translateX(${(Math.random() - 0.5) * 200}px) rotate(${Math.random() * 720}deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}
