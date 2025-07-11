
import React, { useState } from 'react';
import { QuizQuestion } from './QuizQuestion';
import { UserResponse, QuizQuestion as QuizQuestionType } from '@/types/quiz';
import { quizQuestions } from '@/data/quizQuestions';

const QuizPage: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<UserResponse[]>([]);

  const handleAnswer = (response: UserResponse) => {
    setResponses([...responses, response]);
    
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz completed, navigate to results
      console.log('Quiz completed:', responses);
    }
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];

  if (!currentQuestion) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Question {currentQuestionIndex + 1} of {quizQuestions.length}
              </span>
              <div className="w-64 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <QuizQuestion
          question={currentQuestion}
          onAnswer={handleAnswer}
          currentAnswers={[]}
          showQuestionImage={true}
        />
      </div>
    </div>
  );
};

export default QuizPage;
