
import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';

const QuizPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto">
        <Card className="p-6">
          <h1 className="text-2xl font-bold mb-4">Quiz de Estilo</h1>
          <p className="text-gray-600 mb-6">
            Descubra seu estilo pessoal respondendo às nossas perguntas.
          </p>
          <Button className="w-full">
            Começar Quiz
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default QuizPage;
