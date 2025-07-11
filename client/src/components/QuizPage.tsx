
import React, { useEffect } from 'react';
import { useQuiz } from '@/context/QuizContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const QuizPage: React.FC = () => {
  const { questions, currentQuestionIndex, nextQuestion, previousQuestion, addResponse, setQuestions, isCompleted } = useQuiz();

  useEffect(() => {
    // Initialize with some sample questions if none exist
    if (questions.length === 0) {
      setQuestions([
        {
          id: '1',
          title: 'Qual é seu estilo preferido?',
          type: 'single',
          options: [
            { id: '1a', text: 'Clássico', points: { classic: 5 } },
            { id: '1b', text: 'Moderno', points: { modern: 5 } },
            { id: '1c', text: 'Minimalista', points: { minimal: 5 } }
          ]
        },
        {
          id: '2',
          title: 'Quais cores você mais gosta?',
          type: 'multiple',
          options: [
            { id: '2a', text: 'Azul', points: { cool: 3 } },
            { id: '2b', text: 'Vermelho', points: { warm: 3 } },
            { id: '2c', text: 'Verde', points: { natural: 3 } },
            { id: '2d', text: 'Neutro', points: { minimal: 3 } }
          ]
        }
      ]);
    }
  }, [questions.length, setQuestions]);

  if (isCompleted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Quiz Concluído!</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Obrigado por completar o quiz. Seus resultados estão sendo processados.
            </p>
            <Button className="w-full">Ver Resultados</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-gray-600">Carregando quiz...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionSelect = (optionId: string) => {
    addResponse({
      questionId: currentQuestion.id,
      selectedOptions: [optionId],
      timestamp: Date.now()
    });
    
    setTimeout(() => {
      nextQuestion();
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">
              Pergunta {currentQuestionIndex + 1} de {questions.length}
            </span>
            <div className="w-full max-w-xs bg-gray-200 rounded-full h-2 ml-4">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>
          <CardTitle className="text-xl">{currentQuestion.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {currentQuestion.options?.map((option) => (
              <Button
                key={option.id}
                variant="outline"
                className="w-full text-left justify-start p-4 h-auto"
                onClick={() => handleOptionSelect(option.id)}
              >
                {option.text}
              </Button>
            ))}
          </div>
          
          <div className="flex justify-between mt-6">
            <Button 
              variant="outline" 
              onClick={previousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Anterior
            </Button>
            <Button 
              onClick={nextQuestion}
              disabled={currentQuestionIndex === questions.length - 1}
            >
              Próxima
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizPage;
