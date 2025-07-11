
import React from 'react';
import { Button } from '@/components/ui/button';

interface QuizWelcomeProps {
  onStart: () => void;
}

export const QuizWelcome: React.FC<QuizWelcomeProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-3xl font-bold text-foreground">
          Descubra Seu Estilo Pessoal
        </h1>
        <p className="text-muted-foreground">
          Responda algumas perguntas rápidas e descubra qual é o seu estilo predominante.
        </p>
        <Button onClick={onStart} size="lg" className="w-full">
          Começar Quiz
        </Button>
      </div>
    </div>
  );
};
