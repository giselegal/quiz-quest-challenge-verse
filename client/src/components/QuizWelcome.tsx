
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

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
    <div className="min-h-screen bg-[#FFFAF0] flex items-center justify-center">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-playfair text-[#432818]">
            Descubra Seu Estilo Pessoal
          </CardTitle>
          <p className="text-[#8F7A6A] mt-2">
            Um quiz personalizado para descobrir seu estilo único
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="text-center"
            />
          </div>
          <Button
            onClick={handleStart}
            disabled={!name.trim()}
            className="w-full bg-[#B89B7A] hover:bg-[#A38A69] text-white"
          >
            Iniciar Quiz
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
