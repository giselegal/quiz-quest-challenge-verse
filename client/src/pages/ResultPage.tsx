
import React from 'react';
import { useQuiz } from '@/context/QuizContext';

const ResultPage: React.FC = () => {
  const { quizResult } = useQuiz();

  if (!quizResult) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Nenhum resultado encontrado</h1>
          <p className="text-muted-foreground">Complete o quiz primeiro para ver seus resultados.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Seus Resultados</h1>
        <div className="grid gap-6">
          {quizResult.map((result, index) => (
            <div key={index} className="bg-card p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold mb-2">{result.style}</h2>
              <p className="text-lg mb-2">Pontuação: {result.points}</p>
              <p className="text-lg mb-2">Porcentagem: {result.percentage}%</p>
              <p className="text-sm text-muted-foreground mb-4">Ranking: {result.rank}</p>
              <p className="text-muted-foreground">{result.category}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
