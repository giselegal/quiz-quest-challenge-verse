
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { QuizQuestion as QuizQuestionType, UserResponse } from '@/types/quiz';

interface CaktoQuizQuestionProps {
  question: QuizQuestionType;
  onAnswer: (response: UserResponse) => void;
  selectedAnswers?: string[];
  onNext?: () => void;
}

const CaktoQuizQuestion: React.FC<CaktoQuizQuestionProps> = ({
  question,
  onAnswer,
  selectedAnswers = [],
  onNext
}) => {
  const [answers, setAnswers] = useState<string[]>(selectedAnswers);

  const isMultipleChoice = question.type !== 'single';

  const handleAnswerToggle = (optionId: string) => {
    if (isMultipleChoice) {
      if (answers.includes(optionId)) {
        setAnswers(prevAnswers => prevAnswers.filter(id => id !== optionId));
      } else {
        setAnswers(prevAnswers => [...prevAnswers, optionId]);
      }
    } else {
      setAnswers([optionId]);
    }
  };

  const handleSubmit = () => {
    const selectedStyleCategories = answers
      .map(answerId => {
        const option = question.options.find(opt => opt.id === answerId);
        return option?.styleCategory;
      })
      .filter((category): category is string => Boolean(category));

    onAnswer({
      questionId: question.id,
      selectedOptionId: answers[0],
      selectedOptionIds: answers,
      answers,
      styleCategories: selectedStyleCategories as any[]
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">{question.question || question.text}</h2>
      <div className="space-y-4">
        {question.options.map(option => (
          <Button
            key={option.id}
            variant={answers.includes(option.id) ? 'default' : 'outline'}
            className="w-full text-left"
            onClick={() => handleAnswerToggle(option.id)}
          >
            {option.text}
          </Button>
        ))}
      </div>
      <div className="mt-6">
        <Button onClick={handleSubmit} className="w-full bg-blue-500 text-white">
          Responder
        </Button>
      </div>
    </div>
  );
};

export default CaktoQuizQuestion;
