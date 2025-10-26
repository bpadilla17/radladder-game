// Device Capability Detection for Adaptive Performance
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

  performBenchmark() {
    const startTime = performance.now()
    let result = 0
    for (let i = 0; i < 1000000; i++) {
      result += Math.sqrt(i)
    }
    const endTime = performance.now()
    return endTime - startTime
  }

  checkHardwareSpecs() {
    return {
      cores: navigator.hardwareConcurrency || 2,
      memory: navigator.deviceMemory || 2,
    }
  }

  detect() {
    if (this.capability) return this.capability
    
    const specs = this.checkHardwareSpecs()
    const benchmarkTime = this.performBenchmark()
    
    // High-end: 6+ cores or fast benchmark, 6+ GB RAM
    if ((specs.cores >= 6 || benchmarkTime < 8) && (specs.memory >= 6 || specs.memory === undefined)) {
      this.capability = 'high'
      return 'high'
    }
    
    // Mid-range: 4+ cores, decent benchmark, 4+ GB RAM
    if (specs.cores >= 4 && benchmarkTime < 15 && specs.memory >= 4) {
      this.capability = 'medium'
      return 'medium'
    }
    
    // Low-end: Everything else
    this.capability = 'low'
    return 'low'
  }

  getConfig() {
    const capability = this.detect()
    
    const configs = {
      high: {
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
        particleCount: 0,
        confettiPieces: this.isMobile ? 20 : 30,
        animationSpeed: 'reduced',
        gradientAnimation: false,
        glowIntensity: 'low',
        hapticFeedback: this.isMobile,
        soundEffectsDefault: false,
        transitionDuration: 200,
        blurEffects: false,
        parallax: false,
      },
    }
    
    return configs[capability]
  }
}

export const deviceCapability = new DeviceCapabilityDetector()
