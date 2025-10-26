// Haptic Feedback Utility
export const triggerHaptic = (type = 'light') => {
  // Check if device supports vibration
  if (!navigator.vibrate) return
  
  const patterns = {
    light: 10,      // Quick tap
    medium: 20,     // Button press
    heavy: 30,      // Error/wrong answer
    success: [10, 50, 10], // Double tap for success
    error: [30, 100, 30],  // Strong for errors
  }
  
  const pattern = patterns[type] || patterns.light
  navigator.vibrate(pattern)
}

export const hapticFeedback = {
  light: () => triggerHaptic('light'),
  medium: () => triggerHaptic('medium'),
  heavy: () => triggerHaptic('heavy'),
  success: () => triggerHaptic('success'),
  error: () => triggerHaptic('error'),
}
