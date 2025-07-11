
import { QuizQuestion, StyleResult } from '@/types/quiz';
import { supabase } from '@/integrations/supabase/client';

export const fetchQuizQuestions = async (quizId: string = 'default') => {
  try {
    console.log('🔍 Buscando questões do quiz:', quizId);
    
    const { data: questions, error } = await supabase
      .from('quiz_questions')
      .select(`
        *,
        question_options (*)
      `)
      .eq('quiz_id', quizId)
      .eq('active', true)
      .order('order_index');
      
    if (error) {
      console.warn('⚠️ Erro ao buscar questões do Supabase:', error);
      throw error;
    }
    
    if (questions && questions.length > 0) {
      console.log('✅ Questões carregadas do Supabase:', questions.length);
      return questions;
    } else {
      console.log('📋 Nenhuma questão encontrada no Supabase, usando fallback local');
      const { quizQuestions } = await import('@/data/quizQuestions');
      return quizQuestions;
    }
  } catch (error) {
    console.error('❌ Erro ao buscar questões:', error);
    // Fallback to local questions
    const { quizQuestions } = await import('@/data/quizQuestions');
    return quizQuestions;
  }
};

export const saveParticipant = async (name: string, email: string, quizId: string = 'default') => {
  try {
    console.log('💾 Salvando participante:', { name, email, quizId });
    
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
      
    if (error) {
      console.error('❌ Erro ao salvar participante:', error);
      throw error;
    }
    
    console.log('✅ Participante salvo com sucesso:', data.id);
    return data;
  } catch (error) {
    console.error('❌ Erro ao salvar participante:', error);
    throw error;
  }
};

export const saveAnswers = async (
  participantId: string,
  answers: Array<{ questionId: string; optionId: string; points: number }>
) => {
  try {
    console.log('💾 Salvando respostas:', { participantId, answersCount: answers.length });
    
    const answerData = answers.map(answer => ({
      participant_id: participantId,
      question_id: answer.questionId,
      option_id: answer.optionId,
      points: answer.points
    }));
    
    const { error } = await supabase
      .from('participant_answers')
      .insert(answerData);
      
    if (error) {
      console.error('❌ Erro ao salvar respostas:', error);
      throw error;
    }
    
    console.log(`✅ ${answers.length} respostas salvas com sucesso`);
  } catch (error) {
    console.error('❌ Erro ao salvar respostas:', error);
    // Continue processing locally as fallback
    console.log('🔧 Continuando com processamento local');
  }
};

export const saveResults = async (
  participantId: string,
  results: Array<StyleResult>
) => {
  try {
    console.log('💾 Salvando resultados:', { participantId, resultsCount: results.length });
    
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
      
    if (error) {
      console.error('❌ Erro ao salvar resultados:', error);
      throw error;
    }
    
    console.log(`✅ ${results.length} resultados salvos com sucesso`);
  } catch (error) {
    console.error('❌ Erro ao salvar resultados:', error);
    // Continue with local display as fallback
    console.log('🔧 Continuando com exibição local');
  }
};

// Nova função para testar conectividade
export const testSupabaseConnection = async () => {
  try {
    const { data, error } = await supabase
      .from('quizzes')
      .select('id, title')
      .limit(1);
    
    if (error) throw error;
    
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
};
