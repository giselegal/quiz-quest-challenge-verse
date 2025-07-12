
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface QuizWelcomeProps {
  onStart: (name: string) => void;
}

export const QuizWelcome: React.FC<QuizWelcomeProps> = ({ onStart }) => {
  const [name, setName] = useState('');

  const handleStart = () => {
    if (name.trim()) {
      onStart(name.trim());
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-3xl font-bold text-foreground">
          Descubra Seu Estilo Pessoal
        </h1>
        <p className="text-muted-foreground">
          Responda algumas perguntas rápidas e descubra qual é o seu estilo predominante.
        </p>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Digite seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full"
          />
          <Button 
            onClick={handleStart} 
            size="lg" 
            className="w-full"
            disabled={!name.trim()}
          >
            Começar Quiz
          </Button>
        </div>
      </div>
    </div>
  );
};
