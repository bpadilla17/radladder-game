/**
 * Haptic Feedback Utility
 * Provides vibration feedback on mobile devices
 */

class HapticManager {
  constructor() {
    this.isSupported = 'vibrate' in navigator
  }

  // Light tap (button press)
  light() {
    if (this.isSupported) {
      navigator.vibrate(10)
    }
  }

  // Medium tap (selection)
  medium() {
    if (this.isSupported) {
      navigator.vibrate(20)
    }
  }

  // Heavy tap (error)
  heavy() {
    if (this.isSupported) {
      navigator.vibrate(50)
    }
  }

  // Success pattern
  success() {
    if (this.isSupported) {
      navigator.vibrate([10, 50, 10])
    }
  }

  // Error pattern
  error() {
    if (this.isSupported) {
      navigator.vibrate([50, 100, 50])
    }
  }

  // Warning pattern
  warning() {
    if (this.isSupported) {
      navigator.vibrate([30, 50, 30])
    }
  }
}

// Singleton instance
const hapticManager = new HapticManager()

export default hapticManager
