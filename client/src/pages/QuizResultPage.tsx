
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import QuizResult from '@/components/QuizResult';
import { StyleResult } from '@/types/quiz';
import { useAuth } from '@/context/AuthContext';
import ErrorState from '@/components/result/ErrorState';

const QuizResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [results, setResults] = useState<{
    primaryStyle: StyleResult;
    secondaryStyles: StyleResult[];
  } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Tentar obter resultados do state da navegação
    if (location.state && location.state.results) {
      const { primaryStyle, secondaryStyles } = location.state.results;
      setResults({ primaryStyle, secondaryStyles });
      setLoading(false);
      return;
    }

    // Tentar obter do localStorage como fallback
    try {
      const savedResults = localStorage.getItem('quizResults');
      if (savedResults) {
        const parsed = JSON.parse(savedResults);
        if (parsed.primaryStyle && parsed.secondaryStyles) {
          setResults(parsed);
          setLoading(false);
          return;
        }
      }
    } catch (error) {
      console.error('Error loading saved results:', error);
    }

    // Se não encontrou resultados, criar um resultado mock para demonstração
    const mockResults = {
      primaryStyle: {
        style: 'classico',
        category: 'Clássico',
        points: 85,
        percentage: 85,
        rank: 1
      },
      secondaryStyles: [
        {
          style: 'elegante',
          category: 'Elegante',
          points: 65,
          percentage: 65,
          rank: 2
        },
        {
          style: 'moderno',
          category: 'Moderno',
          points: 45,
          percentage: 45,
          rank: 3
        }
      ]
    };

    setResults(mockResults);
    setLoading(false);
  }, [location.state]);

  const handleReset = () => {
    localStorage.removeItem('quizResults');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!results) {
    return <ErrorState />;
  }

  return (
    <QuizResult
      primaryStyle={results.primaryStyle}
      secondaryStyles={results.secondaryStyles}
      onReset={handleReset}
    />
  );
};

export default QuizResultPage;
