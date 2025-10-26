/**
 * Device Capability Detection
 * Determines device performance level to apply appropriate optimizations
 * 
 * Levels:
 * - 'high': 2022+ phones (iPhone 14+, Galaxy S22+) - Full AAA experience
 * - 'medium': 2019-2021 phones (iPhone 11-13, Galaxy S20-S21) - Optimized AAA
 * - 'low': Pre-2019 phones - Clean & fast experience
 */

class DeviceCapabilityDetector {
  constructor() {
    this.capability = null
    this.isMobile = this.detectMobile()
  }

  detectMobile() {
    return (
      window.innerWidth < 768 ||
      /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
    )
  }

  // Perform performance benchmark
  performBenchmark() {
    const startTime = performance.now()
    
    // CPU test: Simple computation
    let result = 0
    for (let i = 0; i < 1000000; i++) {
      result += Math.sqrt(i)
    }
    
    const endTime = performance.now()
    const cpuTime = endTime - startTime
    
    return cpuTime
  }

  // Check hardware specs if available
  checkHardwareSpecs() {
    const specs = {
      cores: navigator.hardwareConcurrency || 2,
      memory: navigator.deviceMemory || 2, // GB
    }
    
    return specs
  }

  // Detect capability level
  detect() {
    if (this.capability) return this.capability
    
    const specs = this.checkHardwareSpecs()
    const benchmarkTime = this.performBenchmark()
    
    // High-end device criteria (2022+ phones)
    // - 6+ CPU cores OR very fast benchmark
    // - 6+ GB RAM (if available)
    // - Fast CPU performance
    if (
      (specs.cores >= 6 || benchmarkTime < 8) &&
      (specs.memory >= 6 || specs.memory === undefined)
    ) {
      this.capability = 'high'
      return 'high'
    }
    
    // Medium device criteria (2019-2021 phones)
    // - 4+ CPU cores
    // - 4+ GB RAM
    // - Reasonable performance
    if (
      specs.cores >= 4 &&
      benchmarkTime < 15 &&
      specs.memory >= 4
    ) {
      this.capability = 'medium'
      return 'medium'
    }
    
    // Low-end device (older phones)
    this.capability = 'low'
    return 'low'
  }

  // Get performance config based on capability
  getConfig() {
    const capability = this.detect()
    
    const configs = {
      high: {
        // 2022+ phones: FULL AAA UNLEASHED
        particleCount: this.isMobile ? 80 : 150,
        confettiPieces: this.isMobile ? 100 : 200,
        animationSpeed: 'fast',
        gradientAnimation: true,
        glowIntensity: 'high',
        hapticFeedback: true,
        soundEffectsDefault: !this.isMobile,
        transitionDuration: 300,
        blurEffects: true,
        parallax: !this.isMobile,
      },
      medium: {
        // 2019-2021 phones: OPTIMIZED AAA
        particleCount: this.isMobile ? 20 : 50,
        confettiPieces: this.isMobile ? 50 : 80,
        animationSpeed: 'normal',
        gradientAnimation: 'subtle',
        glowIntensity: 'medium',
        hapticFeedback: true,
        soundEffectsDefault: false,
        transitionDuration: 250,
        blurEffects: false,
        parallax: false,
      },
      low: {
        // Pre-2019 phones: CLEAN & FAST
        particleCount: 0,
        confettiPieces: this.isMobile ? 15 : 30,
        animationSpeed: 'slow',
        gradientAnimation: false,
        glowIntensity: 'low',
        hapticFeedback: false,
        soundEffectsDefault: false,
        transitionDuration: 200,
        blurEffects: false,
        parallax: false,
      },
    }
    
    return {
      ...configs[capability],
      capability,
      isMobile: this.isMobile,
    }
  }
}

// Singleton instance
let detectorInstance = null

export const getDeviceCapability = () => {
  if (!detectorInstance) {
    detectorInstance = new DeviceCapabilityDetector()
  }
  return detectorInstance.detect()
}

export const getDeviceConfig = () => {
  if (!detectorInstance) {
    detectorInstance = new DeviceCapabilityDetector()
  }
  return detectorInstance.getConfig()
}

export default {
  getDeviceCapability,
  getDeviceConfig,
}
