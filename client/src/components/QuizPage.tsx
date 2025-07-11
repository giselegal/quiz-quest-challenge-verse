
import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { QuizWelcome } from './QuizWelcome';
import { QuizContent } from './quiz/QuizContent';
import QuizTransition from './QuizTransition';
import { UserResponse } from '../types/quiz';
import { useAuth } from '../context/AuthContext';
import { preloadCriticalImages } from '../utils/imageManager';

enum QuizState {
  Welcome,
  Quiz,
  Transition,
  Result,
}

interface StyleResult {
  style: string;
  points: number;
  percentage: number;
  rank: number;
}

const QuizPage: React.FC = () => {
  const location = useLocation();
  const [quizState, setQuizState] = useState(QuizState.Welcome);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentStrategicQuestionIndex, setCurrentStrategicQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState<UserResponse[]>([]);
  const [quizResult, setQuizResult] = useState<StyleResult[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showingStrategicQuestions, setShowingStrategicQuestions] = useState(false);
  const { user } = useAuth();

  // Mock questions for now
  const questions = [
    {
      id: 'q1',
      question: 'Qual é seu estilo preferido?',
      options: [
        { id: 'opt1', text: 'Clássico', styleCategory: 'classico' },
        { id: 'opt2', text: 'Moderno', styleCategory: 'moderno' },
        { id: 'opt3', text: 'Romântico', styleCategory: 'romantico' },
      ],
      type: 'text' as const,
      multiSelect: 1
    }
  ];

  const strategicQuestions = [
    {
      id: 'sq1',
      question: 'O que mais te motiva?',
      options: [
        { id: 'sopt1', text: 'Sucesso profissional', value: 'success' },
        { id: 'sopt2', text: 'Relacionamentos', value: 'relationships' },
        { id: 'sopt3', text: 'Crescimento pessoal', value: 'growth' },
      ],
      type: 'text' as const
    }
  ];

  const totalQuestions = questions.length;
  const totalStrategicQuestions = strategicQuestions.length;

  const handleAnswerSubmit = useCallback((response: UserResponse) => {
    setUserResponses((prevResponses) => {
      const existingResponseIndex = prevResponses.findIndex(
        (r) => r.questionId === response.questionId
      );

      if (existingResponseIndex !== -1) {
        const newResponses = [...prevResponses];
        newResponses[existingResponseIndex] = response;
        return newResponses;
      } else {
        return [...prevResponses, response];
      }
    });

    if (!showingStrategicQuestions) {
      localStorage.setItem(
        `question-${currentQuestionIndex + 1}`,
        JSON.stringify(response)
      );
    } else {
      localStorage.setItem(
        `strategic-question-${currentStrategicQuestionIndex + 1}`,
        JSON.stringify(response)
      );
    }
  }, [currentQuestionIndex, showingStrategicQuestions, currentStrategicQuestionIndex]);

  const handleNextClick = useCallback(() => {
    if (!showingStrategicQuestions) {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      } else {
        setShowingStrategicQuestions(true);
        setCurrentStrategicQuestionIndex(0);
        setQuizState(QuizState.Transition);
      }
    } else {
      if (currentStrategicQuestionIndex < totalStrategicQuestions - 1) {
        setCurrentStrategicQuestionIndex((prevIndex) => prevIndex + 1);
      } else {
        setIsLoading(true);
        setTimeout(() => {
          // Mock result calculation
          const mockResult = [
            { style: 'classico', points: 100, percentage: 85, rank: 1 }
          ];
          setQuizResult(mockResult);
          setQuizState(QuizState.Result);
          setIsLoading(false);
          // Navigate to result page
          window.location.href = '/resultado';
        }, 2000);
      }
    }
  }, [currentQuestionIndex, showingStrategicQuestions, currentStrategicQuestionIndex, userResponses]);

  const handlePrevious = useCallback(() => {
    if (showingStrategicQuestions) {
      if (currentStrategicQuestionIndex > 0) {
        setCurrentStrategicQuestionIndex((prevIndex) => prevIndex - 1);
      } else {
        setShowingStrategicQuestions(false);
        setCurrentQuestionIndex(questions.length - 1);
        setQuizState(QuizState.Quiz);
      }
    } else {
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
      } else {
        setQuizState(QuizState.Welcome);
      }
    }
  }, [currentQuestionIndex, showingStrategicQuestions, currentStrategicQuestionIndex]);

  const resetQuiz = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('persist:auth');
    setQuizState(QuizState.Welcome);
    setCurrentQuestionIndex(0);
    setCurrentStrategicQuestionIndex(0);
    setUserResponses([]);
    setQuizResult(null);
    setShowingStrategicQuestions(false);
    window.location.href = '/';
  };

  const getUserName = (): string => {
    return user?.userName || localStorage.getItem('userName') || '';
  };

  useEffect(() => {
    preloadCriticalImages(["quiz", "strategic"]);
  }, []);

  useEffect(() => {
    if (quizState === QuizState.Quiz) {
      window.scrollTo(0, 0);
    }
  }, [quizState, currentQuestionIndex]);

  const renderContent = () => {
    switch (quizState) {
      case QuizState.Welcome:
        return <QuizWelcome onStart={() => setQuizState(QuizState.Quiz)} />;
      case QuizState.Quiz:
        return (
          <QuizContent
            user={user}
            currentQuestionIndex={currentQuestionIndex}
            totalQuestions={totalQuestions}
            showingStrategicQuestions={showingStrategicQuestions}
            currentStrategicQuestionIndex={currentStrategicQuestionIndex}
            currentQuestion={questions[currentQuestionIndex]}
            currentAnswers={
              userResponses.find((r) => r.questionId === questions[currentQuestionIndex].id)
                ?.selectedOptions || []
            }
            handleAnswerSubmit={handleAnswerSubmit}
            handleNextClick={handleNextClick}
            handlePrevious={handlePrevious}
          />
        );
      case QuizState.Transition:
        return (
          <QuizTransition
            onContinue={handleNextClick}
            onAnswer={handleAnswerSubmit}
            currentAnswers={
              userResponses.find((r) => r.questionId === strategicQuestions[0].id)
                ?.selectedOptions || []
            }
          />
        );
      case QuizState.Result:
        return <div>Result Page Placeholder</div>;
      default:
        return <QuizWelcome onStart={() => setQuizState(QuizState.Quiz)} />;
    }
  };

  return <>{renderContent()}</>;
};

export default QuizPage;
