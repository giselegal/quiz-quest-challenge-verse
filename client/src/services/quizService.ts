
import { QuizQuestion, StyleResult } from '@/types/quiz';

import { supabase } from '../../../src/integrations/supabase/client';

export const fetchQuizQuestions = async (quizId: string) => {
  try {
    const { data: questions, error } = await supabase
      .from('quiz_questions')
      .select(`
        *,
        question_options (*)
      `)
      .eq('quiz_id', quizId)
      .eq('active', true)
      .order('order_index');
      
    if (error) throw error;
    return questions || [];
  } catch (error) {
    console.error('Error fetching quiz questions:', error);
    // Fallback to local questions
    const { quizQuestions } = await import('@/data/quizQuestions');
    return quizQuestions;
  }
};

export const saveParticipant = async (name: string, email: string, quizId: string) => {
  try {
    const { data, error } = await supabase
      .from('quiz_participants')
      .insert({
        name,
        email,
        quiz_id: quizId,
        utm_source: new URLSearchParams(window.location.search).get('utm_source'),
        utm_medium: new URLSearchParams(window.location.search).get('utm_medium'),
        utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign'),
      })
      .select()
      .single();
      
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error saving participant:', error);
    throw error;
  }
};

export const saveAnswers = async (
  participantId: string,
  answers: Array<{ questionId: string; optionId: string; points: number }>
) => {
  try {
    const answerData = answers.map(answer => ({
      participant_id: participantId,
      question_id: answer.questionId,
      option_id: answer.optionId,
      points: answer.points
    }));
    
    const { error } = await supabase
      .from('participant_answers')
      .insert(answerData);
      
    if (error) throw error;
    console.log(`Saved ${answers.length} answers to database`);
  } catch (error) {
    console.error('Error saving answers:', error);
    // Continue processing locally as fallback
  }
};

export const saveResults = async (
  participantId: string,
  results: Array<StyleResult>
) => {
  try {
    const resultData = results.map((result, index) => ({
      participant_id: participantId,
      style_type_id: result.style,
      points: result.points,
      percentage: result.percentage,
      rank: index + 1,
      is_primary: index === 0
    }));
    
    const { error } = await supabase
      .from('style_results')
      .insert(resultData);
      
    if (error) throw error;
    console.log(`Saved ${results.length} style results to database`);
  } catch (error) {
    console.error('Error saving results:', error);
    // Continue with local display as fallback
  }
};
