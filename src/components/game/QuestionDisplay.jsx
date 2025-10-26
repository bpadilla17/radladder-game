import React, { useState, useEffect } from 'react';

export default function QuestionDisplay({ 
  question, 
  onAnswer, 
  onPass, 
  timeLimit,
  passesRemaining,
  lifelines,
  onUseLifeline
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(timeLimit);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Simple haptic feedback function (built-in)
  const triggerHaptic = (intensity = 'medium') => {
    if ('vibrate' in navigator) {
      const patterns = {
        light: 10,
        medium: 20,
        heavy: 50
      };
      navigator.vibrate(patterns[intensity] || 20);
    }
  };

  // Timer effect
  useEffect(() => {
    setTimeRemaining(timeLimit);
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [question.id, timeLimit]);

  // Reset state when question changes
  useEffect(() => {
    setSelectedAnswer(null);
    setCurrentImageIndex(0);
    setIsSubmitting(false);
  }, [question.id]);

  const handleTimeout = () => {
    if (!isSubmitting) {
      alert("Time's up! You must answer or pass.");
    }
  };

  const handleAnswerSelect = (answer) => {
    if (isSubmitting) return;
    setSelectedAnswer(answer);
    triggerHaptic('medium');
  };

  const handleSubmit = () => {
    if (!selectedAnswer || isSubmitting) return;
    setIsSubmitting(true);
    triggerHaptic('heavy');
    onAnswer(selectedAnswer);
  };

  const handlePass = () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    triggerHaptic('medium');
    onPass();
  };

  const handleImageNavigation = (direction, e) => {
    // Prevent page scrolling
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    const images = question.images || [];
    if (direction === 'next') {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    } else {
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
    triggerHaptic('light');
  };

  // Handle keyboard navigation without scrolling
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handleImageNavigation('prev');
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleImageNavigation('next');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [question.images]);

  const images = question.images || [];
  const hasMultipleImages = images.length > 1;

  // Timer color based on time remaining
  const getTimerColor = () => {
    const percentage = (timeRemaining / timeLimit) * 100;
    if (percentage > 50) return 'text-cyan-400';
    if (percentage > 25) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      {/* Clinical Scenario */}
      <div className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 border border-cyan-500/20">
        <p className="text-cyan-100 text-lg leading-relaxed">
          {question.scenario}
        </p>
      </div>

      {/* Image Display with Carousel */}
      {images.length > 0 && (
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-lg p-4 border border-cyan-500/20">
          <div className="relative">
            {/* Image */}
            <div className="flex justify-center items-center bg-black/50 rounded-lg overflow-hidden">
              <img
                src={images[currentImageIndex]}
                alt={`Medical image ${currentImageIndex + 1}`}
                className="max-h-[450px] w-auto object-contain"
              />
            </div>

            {/* Navigation Arrows */}
            {hasMultipleImages && (
              <>
                <button
                  onClick={(e) => handleImageNavigation('prev', e)}
                  onMouseDown={(e) => e.preventDefault()}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-cyan-600/80 hover:bg-cyan-500 text-white rounded-full p-3 transition-all hover:scale-110 shadow-lg backdrop-blur-sm"
                  aria-label="Previous image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={(e) => handleImageNavigation('next', e)}
                  onMouseDown={(e) => e.preventDefault()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-cyan-600/80 hover:bg-cyan-500 text-white rounded-full p-3 transition-all hover:scale-110 shadow-lg backdrop-blur-sm"
                  aria-label="Next image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Carousel Dots */}
            {hasMultipleImages && (
              <div className="flex justify-center items-center gap-2 mt-4">
                <span className="text-cyan-300 text-sm mr-2">
                  {currentImageIndex + 1} / {images.length}
                </span>
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentImageIndex(index);
                      triggerHaptic('light');
                    }}
                    className={`transition-all ${
                      index === currentImageIndex
                        ? 'w-3 h-3 bg-cyan-400 shadow-lg shadow-cyan-400/50'
                        : 'w-2 h-2 bg-cyan-700/50 hover:bg-cyan-600/70'
                    } rounded-full`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Timer */}
      <div className="flex justify-center">
        <div className={`text-2xl font-bold ${getTimerColor()} transition-colors`}>
          ⏱️ {timeRemaining}s
        </div>
      </div>

      {/* Answer Options */}
      <div className="space-y-3">
        {question.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleAnswerSelect(option.id)}
            disabled={isSubmitting}
            className={`w-full p-4 rounded-lg text-left transition-all transform ${
              selectedAnswer === option.id
                ? 'bg-cyan-600 text-white border-2 border-cyan-400 shadow-lg shadow-cyan-500/50 scale-[1.02]'
                : 'bg-slate-700/50 text-cyan-100 border-2 border-slate-600/50 hover:border-cyan-500/50 opacity-80'
            } ${isSubmitting ? 'cursor-not-allowed' : 'hover:scale-[1.01] cursor-pointer'}`}
          >
            <span className="font-semibold mr-2 text-cyan-300">({option.label})</span>
            <span className={selectedAnswer === option.id ? 'text-white' : 'text-cyan-100'}>
              {option.text}
            </span>
          </button>
        ))}
      </div>

      {/* Lifelines */}
      <div className="flex flex-wrap gap-3 justify-center">
        {lifelines.fiftyFifty.available && (
          <button
            onClick={() => onUseLifeline('fiftyFifty')}
            disabled={lifelines.fiftyFifty.used || isSubmitting}
            className="px-4 py-2 bg-purple-600/80 hover:bg-purple-500 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-purple-400/30"
          >
            🎯 50/50
          </button>
        )}
        {lifelines.askAudience.available && (
          <button
            onClick={() => onUseLifeline('askAudience')}
            disabled={lifelines.askAudience.used || isSubmitting}
            className="px-4 py-2 bg-blue-600/80 hover:bg-blue-500 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-blue-400/30"
          >
            📊 Ask Audience
          </button>
        )}
        {lifelines.safetyNet.available && (
          <button
            onClick={() => onUseLifeline('safetyNet')}
            disabled={lifelines.safetyNet.used || isSubmitting}
            className="px-4 py-2 bg-green-600/80 hover:bg-green-500 text-white rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-green-400/30"
          >
            🛡️ Safety Net
          </button>
        )}
      </div>

      {/* Submit and Pass Buttons */}
      <div className="flex gap-4 justify-center">
        <button
          onClick={handleSubmit}
          disabled={!selectedAnswer || isSubmitting}
          className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg disabled:shadow-none transform hover:scale-105 disabled:scale-100"
        >
          Submit Answer
        </button>
        {passesRemaining > 0 && (
          <button
            onClick={handlePass}
            disabled={isSubmitting}
            className="px-8 py-3 bg-slate-600/80 hover:bg-slate-500 text-white font-semibold rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-slate-400/30"
          >
            Pass ({passesRemaining} left)
          </button>
        )}
      </div>
    </div>
  );
}
