
import React from 'react';
import { QuizResult } from '@/types/quiz';
import { Button } from '../ui/button';

interface CaktoQuizResultProps {
  result: QuizResult;
  onContinue: () => void;
}

const CaktoQuizResult: React.FC<CaktoQuizResultProps> = ({ result, onContinue }) => {
  const primaryStyleName = typeof result.primaryStyle === 'string' 
    ? result.primaryStyle 
    : result.primaryStyle.style || result.primaryStyle.category;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold mb-4">Seu Resultado</h2>
      <div className="mb-6">
        <h3 className="text-xl mb-2">Estilo Principal: {primaryStyleName}</h3>
        <p className="text-gray-600">
          Parabéns! Descobrimos seu estilo predominante.
        </p>
      </div>
      <Button onClick={onContinue} className="w-full">
        Continuar
      </Button>
    </div>
  );
};

export default CaktoQuizResult;
