import { createClient } from '@supabase/supabase-js'

// These will be set from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper functions for database operations
export const getQuestionForRung = async (rungLevel, alreadyAskedIds = []) => {
  try {
    let query = supabase
      .from('questions')
      .select('*')
      .eq('rung_level', rungLevel)

    if (alreadyAskedIds.length > 0) {
      query = query.not('question_id', 'in', `(${alreadyAskedIds.join(',')})`)
    }

    const { data, error } = await query

    if (error) throw error
    if (!data || data.length === 0) {
      // All questions for this rung have been asked, allow repeats
      const { data: allData } = await supabase
        .from('questions')
        .select('*')
        .eq('rung_level', rungLevel)
      
      if (allData && allData.length > 0) {
        return allData[Math.floor(Math.random() * allData.length)]
      }
      return null
    }

    // Return random question from available ones
    return data[Math.floor(Math.random() * data.length)]
  } catch (error) {
    console.error('Error fetching question:', error)
    return null
  }
}

export const createGameSession = async (playerName) => {
  try {
    const { data, error } = await supabase
      .from('game_sessions')
      .insert({
        player_name: playerName,
        start_time: new Date().toISOString(),
        current_rung: 3,
        total_questions: 0,
        correct_answers: 0,
        wrong_answers: 0,
        final_score: 0,
        completed: false
      })
      .select()
      .single()

    if (error) throw error
    return data
  } catch (error) {
    console.error('Error creating game session:', error)
    return null
  }
}

export const updateGameSession = async (sessionId, updates) => {
  try {
    const { error } = await supabase
      .from('game_sessions')
      .update(updates)
      .eq('id', sessionId)

    if (error) throw error
    return true
  } catch (error) {
    console.error('Error updating game session:', error)
    return false
  }
}

export const recordAnswer = async (sessionId, questionId, answer, isCorrect, timeTaken, currentRung) => {
  try {
    const { error } = await supabase
      .from('game_answers')
      .insert({
        session_id: sessionId,
        question_id: questionId,
        selected_answer: answer,
        is_correct: isCorrect,
        time_taken_seconds: timeTaken,
        rung_at_time: currentRung
      })

    if (error) throw error

    // Update answer statistics
    await updateAnswerStats(questionId, answer)
    return true
  } catch (error) {
    console.error('Error recording answer:', error)
    return false
  }
}

export const updateAnswerStats = async (questionId, selectedAnswer) => {
  try {
    const columnMap = {
      'A': 'option_a_count',
      'B': 'option_b_count',
      'C': 'option_c_count',
      'D': 'option_d_count'
    }

    const column = columnMap[selectedAnswer]
    if (!column) return

    const { data: existing } = await supabase
      .from('answer_statistics')
      .select('*')
      .eq('question_id', questionId)
      .single()

    if (existing) {
      const updates = {
        total_attempts: existing.total_attempts + 1,
        [column]: existing[column] + 1,
        updated_at: new Date().toISOString()
      }

      await supabase
        .from('answer_statistics')
        .update(updates)
        .eq('question_id', questionId)
    } else {
      await supabase
        .from('answer_statistics')
        .insert({
          question_id: questionId,
          total_attempts: 1,
          option_a_count: selectedAnswer === 'A' ? 1 : 0,
          option_b_count: selectedAnswer === 'B' ? 1 : 0,
          option_c_count: selectedAnswer === 'C' ? 1 : 0,
          option_d_count: selectedAnswer === 'D' ? 1 : 0
        })
    }
  } catch (error) {
    console.error('Error updating answer stats:', error)
  }
}

export const getAudienceStats = async (questionId) => {
  try {
    const { data, error } = await supabase
      .from('answer_statistics')
      .select('*')
      .eq('question_id', questionId)
      .single()

    if (error || !data || data.total_attempts < 10) {
      return null // Need at least 10 responses
    }

    const total = data.total_attempts
    return {
      A: Math.round((data.option_a_count / total) * 100),
      B: Math.round((data.option_b_count / total) * 100),
      C: Math.round((data.option_c_count / total) * 100),
      D: Math.round((data.option_d_count / total) * 100),
      total: total
    }
  } catch (error) {
    console.error('Error getting audience stats:', error)
    return null
  }
}

export const getLeaderboard = async (timeFrame = 'all') => {
  try {
    let query = supabase
      .from('game_sessions')
      .select('*')
      .eq('completed', true)
      .eq('final_rung', 10)
      .order('total_time_seconds', { ascending: true })
      .limit(5)

    if (timeFrame === 'week') {
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      query = query.gte('created_at', weekAgo.toISOString())
    }

    const { data, error } = await query

    if (error) throw error
    return data || []
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    return []
  }
}
