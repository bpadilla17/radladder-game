import React, { useEffect, useRef } from 'react'
import { getDeviceConfig } from '../../utils/deviceCapability'

export default function ParticleBackground() {
  const canvasRef = useRef(null)
  const particlesRef = useRef([])
  const animationFrameRef = useRef(null)
  const deviceConfig = getDeviceConfig()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || deviceConfig.particleCount === 0) return

    const ctx = canvas.getContext('2d')
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Initialize particles
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.opacity = Math.random() * 0.5 + 0.2
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Wrap around screen
        if (this.x < 0) this.x = canvas.width
        if (this.x > canvas.width) this.x = 0
        if (this.y < 0) this.y = canvas.height
        if (this.y > canvas.height) this.y = 0
      }

      draw() {
        ctx.fillStyle = `rgba(0, 229, 255, ${this.opacity})`
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles
    particlesRef.current = []
    for (let i = 0; i < deviceConfig.particleCount; i++) {
      particlesRef.current.push(new Particle())
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particlesRef.current.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [deviceConfig.particleCount])

  if (deviceConfig.particleCount === 0) return null

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  )
}
