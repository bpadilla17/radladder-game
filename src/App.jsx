import { useState } from 'react'
import LandingPage from './components/LandingPage'
import NameEntry from './components/NameEntry'
import GameScreen from './components/GameScreen'
import Leaderboard from './components/Leaderboard'
import HowToPlay from './components/HowToPlay'

function App() {
  const [screen, setScreen] = useState('landing') // landing, nameEntry, game, leaderboard, howToPlay
  const [playerName, setPlayerName] = useState('')
  const [gameSession, setGameSession] = useState(null)

  const handleStartGame = () => {
    setScreen('nameEntry')
  }

  const handleNameSubmit = (name) => {
    setPlayerName(name)
    setScreen('game')
  }

  const handleViewLeaderboard = () => {
    setScreen('leaderboard')
  }

  const handleHowToPlay = () => {
    setScreen('howToPlay')
  }

  const handleBackHome = () => {
    setScreen('landing')
    setPlayerName('')
    setGameSession(null)
  }

  const handleGameComplete = (session) => {
    setGameSession(session)
    // Could auto-show leaderboard or completion screen
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {screen === 'landing' && (
        <LandingPage
          onStartGame={handleStartGame}
          onViewLeaderboard={handleViewLeaderboard}
          onHowToPlay={handleHowToPlay}
        />
      )}

      {screen === 'nameEntry' && (
        <NameEntry
          onSubmit={handleNameSubmit}
          onBack={handleBackHome}
        />
      )}

      {screen === 'game' && (
        <GameScreen
          playerName={playerName}
          onGameComplete={handleGameComplete}
          onBackHome={handleBackHome}
        />
      )}

      {screen === 'leaderboard' && (
        <Leaderboard
          onBackHome={handleBackHome}
          onPlayAgain={handleStartGame}
        />
      )}

      {screen === 'howToPlay' && (
        <HowToPlay
          onBackHome={handleBackHome}
          onStartPlaying={handleStartGame}
        />
      )}
    </div>
  )
}

export default App
