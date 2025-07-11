
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useQuiz } from '@/context/QuizContext';

const ResultPage: React.FC = () => {
  const { responses, resetQuiz } = useQuiz();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Seus Resultados</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-gray-600">
              Obrigado por completar o quiz! Aqui estão suas respostas:
            </p>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Resumo das Respostas</h3>
              <p className="text-sm text-gray-600">
                Total de respostas: {responses.length}
              </p>
            </div>
            
            <div className="flex gap-3">
              <Button onClick={resetQuiz} variant="outline">
                Refazer Quiz
              </Button>
              <Button>
                Compartilhar Resultado
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultPage;
