// Sound Manager for Optional Audio Feedback
class SoundManager {
  constructor() {
    this.enabled = false
    this.audioContext = null
    this.sounds = {}
  }

  init() {
    if (this.audioContext) return
    
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
    } catch (e) {
      console.log('Web Audio API not supported')
    }
  }

  enable() {
    this.enabled = true
    this.init()
  }

  disable() {
    this.enabled = false
  }

  toggle() {
    this.enabled = !this.enabled
    if (this.enabled) this.init()
  }

  // Play a simple beep using Web Audio API (no external files needed)
  playTone(frequency = 440, duration = 100, type = 'sine') {
    if (!this.enabled || !this.audioContext) return
    
    try {
      const oscillator = this.audioContext.createOscillator()
      const gainNode = this.audioContext.createGain()
      
      oscillator.connect(gainNode)
      gainNode.connect(this.audioContext.destination)
      
      oscillator.frequency.value = frequency
      oscillator.type = type
      
      gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration / 1000)
      
      oscillator.start(this.audioContext.currentTime)
      oscillator.stop(this.audioContext.currentTime + duration / 1000)
    } catch (e) {
      console.log('Error playing sound:', e)
    }
  }

  // Preset sounds
  click() {
    this.playTone(800, 50, 'sine')
  }

  success() {
    this.playTone(523, 100, 'sine')  // C note
    setTimeout(() => this.playTone(659, 100, 'sine'), 100)  // E note
  }

  error() {
    this.playTone(200, 200, 'square')
  }

  levelUp() {
    this.playTone(523, 100, 'sine')
    setTimeout(() => this.playTone(659, 100, 'sine'), 100)
    setTimeout(() => this.playTone(784, 150, 'sine'), 200)
  }

  hover() {
    this.playTone(1000, 30, 'sine')
  }
}

export const soundManager = new SoundManager()
