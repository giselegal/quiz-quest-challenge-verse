
import React from 'react';
import { QuizResult } from '@/types/quiz';
import { Button } from '@/components/ui/button';

interface CaktoQuizResultProps {
  result: QuizResult;
  onContinue: () => void;
}

const CaktoQuizResult: React.FC<CaktoQuizResultProps> = ({ result, onContinue }) => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="text-center space-y-6">
        <h2 className="text-3xl font-bold text-[#432818]">
          Seu Resultado
        </h2>
        
        <div className="bg-[#ffefec] p-6 rounded-lg">
          <h3 className="text-2xl font-playfair text-[#aa6b5d] mb-2">
            {result.primaryStyle.category}
          </h3>
          <p className="text-[#432818] text-lg">
            {result.primaryStyle.percentage}% de compatibilidade
          </p>
        </div>
        
        {result.secondaryStyles.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-lg font-medium text-[#432818]">
              Estilos Secundários:
            </h4>
            {result.secondaryStyles.map((style, index) => (
              <div key={index} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                <span className="font-medium text-[#432818]">{style.category}</span>
                <span className="text-[#B89B7A]">{style.percentage}%</span>
              </div>
            ))}
          </div>
        )}
        
        <Button 
          onClick={onContinue}
          className="bg-[#B89B7A] hover:bg-[#A38A69] text-white px-8 py-3 text-lg"
        >
          Continuar
        </Button>
      </div>
    </div>
  );
};

export default CaktoQuizResult;
