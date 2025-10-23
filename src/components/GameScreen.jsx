import React, { useState, useEffect, useCallback } from 'react'
import {
  createGameSession,
  updateGameSession,
  getQuestionForRung,
  recordAnswer,
  getAudienceStats
} from '../supabaseClient'
import Ladder from './game/Ladder'
import QuestionDisplay from './game/QuestionDisplay'
import AnswerFeedback from './game/AnswerFeedback'
import GameComplete from './game/GameComplete'
import AskAudienceModal from './game/AskAudienceModal'

export default function GameScreen({ playerName, onGameComplete, onBackHome }) {
  // Game state
  const [gameSession, setGameSession] = useState(null)
  const [currentRung, setCurrentRung] = useState(3)
  const [currentQuestion, setCurrentQuestion] = useState(null)
  const [askedQuestionIds, setAskedQuestionIds] = useState([])
  const [gamePhase, setGamePhase] = useState('loading') // loading, question, feedback, complete
  const [feedbackData, setFeedbackData] = useState(null)
  
  // Stats
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [wrongAnswers, setWrongAnswers] = useState(0)
  const [score, setScore] = useState(0)
  const [startTime, setStartTime] = useState(null)

  // Lifelines
  const [passesRemaining, setPassesRemaining] = useState(2)
  const [lifelinesUsed, setLifelinesUsed] = useState({
    askAudience: false,
    safetyNet: false
  })
  const [safetyNetActive, setSafetyNetActive] = useState(false)
  const [showAudienceModal, setShowAudienceModal] = useState(false)
  const [audienceData, setAudienceData] = useState(null)

  // Timer
  const [timeLeft, setTimeLeft] = useState(30)
  const [timerRunning, setTimerRunning] = useState(false)
  const [questionStartTime, setQuestionStartTime] = useState(null)

  // Initialize game
  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = async () => {
    const session = await createGameSession(playerName)
    if (session) {
      setGameSession(session)
      setStartTime(Date.now())
      loadQuestion(3)
    } else {
      alert('Error starting game. Please try again.')
      onBackHome()
    }
  }

  const loadQuestion = async (rung) => {
    setGamePhase('loading')
    const question = await getQuestionForRung(rung, askedQuestionIds)
    
    if (!question) {
      alert('Error loading question. Please try again.')
      onBackHome()
      return
    }

    setCurrentQuestion(question)
    setAskedQuestionIds(prev => [...prev, question.question_id])
    
    // Set timer based on rung
    const timeLimit = getTimeLimit(rung)
    setTimeLeft(timeLimit)
    setQuestionStartTime(Date.now())
    setTimerRunning(true)
    setGamePhase('question')
  }

  const getTimeLimit = (rung) => {
    if (rung <= 3) return 30
    if (rung <= 6) return 25
    return 20
  }

  // Timer countdown
  useEffect(() => {
    if (!timerRunning || gamePhase !== 'question') return

    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          handleTimeout()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [timerRunning, gamePhase])

  const handleTimeout = () => {
    setTimerRunning(false)
    handleAnswer('timeout', false)
  }

  const handleAnswer = async (selectedAnswer, isCorrect) => {
    setTimerRunning(false)
    
    const timeTaken = Math.floor((Date.now() - questionStartTime) / 1000)
    
    // Record answer
    await recordAnswer(
      gameSession.id,
      currentQuestion.question_id,
      selectedAnswer === 'timeout' ? 'T' : selectedAnswer,
      isCorrect,
      timeTaken,
      currentRung
    )

    // Update stats
    setTotalQuestions(prev => prev + 1)
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1)
      const points = calculatePoints(currentRung)
      setScore(prev => prev + points)
    } else {
      setWrongAnswers(prev => prev + 1)
    }

    // Calculate new rung
    let newRung = currentRung
    if (isCorrect) {
      newRung = Math.min(currentRung + 1, 10)
    } else {
      const drop = safetyNetActive ? 1 : 2
      newRung = Math.max(currentRung - drop, 1)
    }

    // Reset safety net
    setSafetyNetActive(false)

    // Show feedback
    setFeedbackData({
      isCorrect,
      correctAnswer: currentQuestion.correct_answer,
      teachingPoint: currentQuestion.teaching_point,
      newRung,
      oldRung: currentRung,
      timeTaken,
      points: isCorrect ? calculatePoints(currentRung) : 0
    })

    setCurrentRung(newRung)
    setGamePhase('feedback')

    // Check if game complete
    if (newRung === 10) {
      await completeGame(newRung)
    }
  }

  const calculatePoints = (rung) => {
    if (rung <= 3) return 10
    if (rung <= 6) return 25
    if (rung <= 8) return 50
    return 100
  }

  const handleNextQuestion = () => {
    if (currentRung === 10) {
      setGamePhase('complete')
    } else {
      loadQuestion(currentRung)
    }
  }

  const handlePass = () => {
    if (passesRemaining > 0) {
      setPassesRemaining(prev => prev - 1)
      setTimerRunning(false)
      loadQuestion(currentRung) // Load new question at same rung
    }
  }

  const handleAskAudience = async () => {
    if (!lifelinesUsed.askAudience) {
      setTimerRunning(false)
      const stats = await getAudienceStats(currentQuestion.question_id)
      setAudienceData(stats)
      setShowAudienceModal(true)
      setLifelinesUsed(prev => ({ ...prev, askAudience: true }))
    }
  }

  const handleCloseAudienceModal = () => {
    setShowAudienceModal(false)
    setTimerRunning(true)
  }

  const handleSafetyNet = () => {
    if (!lifelinesUsed.safetyNet) {
      setSafetyNetActive(true)
      setLifelinesUsed(prev => ({ ...prev, safetyNet: true }))
    }
  }

  const completeGame = async (finalRung) => {
    const totalTime = Math.floor((Date.now() - startTime) / 1000)
    
    await updateGameSession(gameSession.id, {
      end_time: new Date().toISOString(),
      final_rung: finalRung,
      total_questions: totalQuestions + 1,
      correct_answers: correctAnswers + (feedbackData?.isCorrect ? 1 : 0),
      wrong_answers: wrongAnswers + (feedbackData?.isCorrect ? 0 : 1),
      total_time_seconds: totalTime,
      final_score: score,
      completed: finalRung === 10
    })

    onGameComplete({
      ...gameSession,
      final_rung: finalRung,
      total_time_seconds: totalTime,
      total_questions: totalQuestions + 1,
      correct_answers: correctAnswers + (feedbackData?.isCorrect ? 1 : 0),
      wrong_answers: wrongAnswers + (feedbackData?.isCorrect ? 0 : 1),
      final_score: score
    })
  }

  if (gamePhase === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading game...</p>
      </div>
    )
  }

  if (gamePhase === 'complete') {
    return (
      <GameComplete
        playerName={playerName}
        stats={{
          totalTime: Math.floor((Date.now() - startTime) / 1000),
          totalQuestions: totalQuestions,
          correctAnswers: correctAnswers,
          wrongAnswers: wrongAnswers,
          finalScore: score,
          finalRung: currentRung
        }}
        onPlayAgain={() => window.location.reload()}
        onBackHome={onBackHome}
      />
    )
  }

  if (gamePhase === 'feedback') {
    return (
      <AnswerFeedback
        feedbackData={feedbackData}
        onNext={handleNextQuestion}
      />
    )
  }

  return (
    <div className="min-h-screen p-4 md:p-6">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-4">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            👤 {playerName}
          </div>
          <div className="text-sm text-gray-600">
            ⏱️ {Math.floor((Date.now() - startTime) / 1000)}s
          </div>
          <div className="text-sm text-gray-600">
            🏆 Score: {score}
          </div>
        </div>
      </div>

      {/* Main Game Area */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-[300px,1fr] gap-6">
        {/* Ladder - Left Side */}
        <div className="order-2 md:order-1">
          <Ladder
            currentRung={currentRung}
            passesRemaining={passesRemaining}
            lifelines={{
              askAudience: !lifelinesUsed.askAudience,
              safetyNet: !lifelinesUsed.safetyNet
            }}
            safetyNetActive={safetyNetActive}
          />
        </div>

        {/* Question Area - Right Side */}
        <div className="order-1 md:order-2">
          {currentQuestion && (
            <QuestionDisplay
              question={currentQuestion}
              timeLeft={timeLeft}
              totalTime={getTimeLimit(currentRung)}
              onAnswer={(answer) => handleAnswer(answer, answer === currentQuestion.correct_answer)}
              onPass={handlePass}
              onAskAudience={handleAskAudience}
              onSafetyNet={handleSafetyNet}
              passesRemaining={passesRemaining}
              lifelines={{
                askAudience: !lifelinesUsed.askAudience,
                safetyNet: !lifelinesUsed.safetyNet
              }}
              safetyNetActive={safetyNetActive}
            />
          )}
        </div>
      </div>

      {/* Ask Audience Modal */}
      {showAudienceModal && (
        <AskAudienceModal
          audienceData={audienceData}
          onClose={handleCloseAudienceModal}
        />
      )}
    </div>
  )
}
