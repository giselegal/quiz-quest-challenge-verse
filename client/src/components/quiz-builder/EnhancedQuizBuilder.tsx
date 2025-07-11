
import React from 'react';
import QuizBuilder from './QuizBuilder';
import { QuizQuestion } from '@/types/quiz';

/**
 * EnhancedQuizBuilder é um wrapper para o componente QuizBuilder
 * que pode adicionar funcionalidades extras como análises, ferramentas
 * avançadas de edição, e outras melhorias.
 */
const EnhancedQuizBuilder: React.FC = () => {
  const handleSave = (questions: QuizQuestion[]) => {
    console.log('Saving questions:', questions);
    // Here you would typically save to a backend or local storage
  };

  return (
    <div className="enhanced-quiz-builder">
      <QuizBuilder onSave={handleSave} />
    </div>
  );
};

export default EnhancedQuizBuilder;
