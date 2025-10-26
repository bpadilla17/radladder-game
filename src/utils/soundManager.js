/**
 * Sound Manager
 * Handles game sound effects with user toggle control
 * Uses Web Audio API for lightweight sound generation
 */

class SoundManager {
  constructor() {
    this.audioContext = null
    this.enabled = false
    this.initialized = false
  }

  // Initialize audio context (must be triggered by user interaction)
  init() {
    if (this.initialized) return
    
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
      this.initialized = true
    } catch (e) {
      console.warn('Web Audio API not supported')
    }
  }

  // Enable/disable sounds
  setEnabled(enabled) {
    this.enabled = enabled
    if (enabled && !this.initialized) {
      this.init()
    }
  }

  // Play a tone
  playTone(frequency, duration, type = 'sine') {
    if (!this.enabled || !this.audioContext) return

    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    oscillator.frequency.value = frequency
    oscillator.type = type

    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration)

    oscillator.start(this.audioContext.currentTime)
    oscillator.stop(this.audioContext.currentTime + duration)
  }

  // Button click sound
  click() {
    this.playTone(800, 0.05, 'sine')
  }

  // Button hover sound
  hover() {
    this.playTone(600, 0.03, 'sine')
  }

  // Correct answer sound
  correct() {
    if (!this.enabled || !this.audioContext) return
    
    // Play ascending tones
    this.playTone(523, 0.1, 'sine') // C
    setTimeout(() => this.playTone(659, 0.1, 'sine'), 100) // E
    setTimeout(() => this.playTone(784, 0.2, 'sine'), 200) // G
  }

  // Wrong answer sound
  wrong() {
    if (!this.enabled || !this.audioContext) return
    
    // Play descending tone
    this.playTone(200, 0.3, 'sawtooth')
  }

  // Success/celebration sound
  celebrate() {
    if (!this.enabled || !this.audioContext) return
    
    // Play quick ascending arpeggio
    const notes = [523, 659, 784, 1047] // C, E, G, C
    notes.forEach((freq, i) => {
      setTimeout(() => this.playTone(freq, 0.15, 'sine'), i * 80)
    })
  }

  // Warning/time running out sound
  warning() {
    this.playTone(440, 0.1, 'square')
  }

  // Rung climb up sound
  climbUp() {
    this.playTone(880, 0.15, 'triangle')
  }

  // Rung fall down sound
  fallDown() {
    if (!this.enabled || !this.audioContext) return
    
    // Descending slide
    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(200, this.audioContext.currentTime + 0.3)
    oscillator.type = 'sawtooth'

    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3)

    oscillator.start(this.audioContext.currentTime)
    oscillator.stop(this.audioContext.currentTime + 0.3)
  }
}

// Singleton instance
const soundManager = new SoundManager()

export default soundManager
