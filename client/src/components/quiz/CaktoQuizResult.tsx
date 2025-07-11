import React from 'react';
import { Button } from '../ui/button';
import { QuizResult as QuizResultType } from '@/types/quiz';

interface CaktoQuizResultProps {
  result: QuizResultType | null;
  onRestart: () => void;
}

const CaktoQuizResult: React.FC<CaktoQuizResultProps> = ({ result, onRestart }) => {
  if (!result || !result.primaryStyle) {
    return <div>Resultado não disponível</div>;
  }

  const primaryStyle = result.primaryStyle as string; // Fix: Cast to string
  const complementaryStyles = result.complementaryStyles || [];
  const styleScores = result.styleScores || {};

  const primaryScore = typeof styleScores === 'object' 
    ? Object.values(styleScores).reduce((a: number, b: any) => a + Number(b), 0) 
    : 0;

  const getComplementaryScore = (style: string) => {
    return typeof styleScores === 'object' && styleScores[style] 
      ? Number(styleScores[style]) 
      : 0;
  };

  const styleDefinitions: { [key: string]: { name: string; description: string; keywords: string[] } } = {
    Natural: {
      name: "Natural",
      description: "O estilo natural é descontraído e confortável, perfeito para quem busca praticidade no dia a dia.",
      keywords: ["conforto", "simplicidade", "funcionalidade"]
    },
    Classico: {
      name: "Clássico",
      description: "Elegância e sofisticação definem o estilo clássico, ideal para ambientes formais e tradicionais.",
      keywords: ["elegância", "tradição", "formalidade"]
    },
    Criativo: {
      name: "Criativo",
      description: "O estilo criativo é ousado e expressivo, perfeito para quem gosta de inovar e misturar tendências.",
      keywords: ["originalidade", "expressão", "inovação"]
    },
    Sexy: {
      name: "Sexy",
      description: "O estilo sexy é provocador e confiante, ideal para quem gosta de atrair olhares e valorizar as curvas.",
      keywords: ["sensualidade", "confiança", "ousadia"]
    }
  };

  const formatKeywords = (keywords: string[]) => {
    return keywords.map((keyword: string, i: number) => (
      <span key={i} className="inline-block bg-pink-100 text-pink-800 px-2 py-1 rounded-full text-xs mr-2 mb-2">
        {keyword}
      </span>
    ));
  };

  const getTotalScore = () => {
    return typeof styleScores === 'object' 
      ? Object.values(styleScores).reduce((total: number, score: any) => total + Number(score), 0)
      : 0;
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Resultado do Quiz</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold">Estilo Primário: {styleDefinitions[primaryStyle]?.name || primaryStyle}</h2>
        <p>{styleDefinitions[primaryStyle]?.description || "Descrição não disponível"}</p>
        <p>Pontuação: {primaryScore} / {getTotalScore()}</p>
        <p>Palavras-chave: {formatKeywords(styleDefinitions[primaryStyle]?.keywords || [])}</p>
      </div>

      {complementaryStyles.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Estilos Complementares</h2>
          <ul>
            {complementaryStyles.map((style, index) => (
              <li key={index} className="mb-2">
                {styleDefinitions[style]?.name || style} - Pontuação: {getComplementaryScore(style)}
              </li>
            ))}
          </ul>
        </div>
      )}

      <Button onClick={onRestart} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Refazer o Quiz
      </Button>
    </div>
  );
};

export default CaktoQuizResult;
