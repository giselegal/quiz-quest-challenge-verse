import React, { useState, useCallback } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, Sparkles, Heart, Target } from 'lucide-react';
import CaktoQuizQuestion from './CaktoQuizQuestion';
import CaktoQuizResult from './CaktoQuizResult';
import type { QuizResponse, QuizResult } from '@/types/quiz';
import { caktoquizQuestions, strategicQuestions, getAllQuestions } from '@/data/caktoquizQuestions';
import { calculateCaktoQuizResult } from '@/lib/caktoQuizEngine';

type QuizStage = 'intro' | 'normal-questions' | 'transition-1' | 'strategic-questions' | 'transition-2' | 'result';

export const CaktoQuizFlow: React.FC = () => {
  const [stage, setStage] = useState<QuizStage>('intro');
  const [participantName, setParticipantName] = useState('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<QuizResponse[]>([]);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  const allQuestions = getAllQuestions();
  const normalQuestions = caktoquizQuestions.sort((a, b) => (a.order || 0) - (b.order || 0));
  const strategicQuestionsData = strategicQuestions;

  // Handlers
  const handleStartQuiz = useCallback(() => {
    if (participantName.trim()) {
      setStage('normal-questions');
      setCurrentQuestionIndex(0);
    }
  }, [participantName]);

  const handleQuestionAnswer = useCallback((response: QuizResponse) => {
    setResponses(prev => {
      const existingIndex = prev.findIndex(r => r.questionId === response.questionId);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = response;
        return updated;
      }
      return [...prev, response];
    });
  }, []);

  const handleNextQuestion = useCallback(() => {
    const currentQuestion = stage === 'normal-questions' 
      ? normalQuestions[currentQuestionIndex]
      : strategicQuestionsData[currentQuestionIndex - normalQuestions.length];

    if (stage === 'normal-questions') {
      if (currentQuestionIndex < normalQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        // Finished normal questions, go to transition
        setStage('transition-1');
      }
    } else if (stage === 'strategic-questions') {
      if (currentQuestionIndex < allQuestions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        // Finished all questions, go to final transition
        setStage('transition-2');
        // Calculate result
        const result = calculateCaktoQuizResult(responses, participantName);
        setQuizResult(result);
      }
    }
  }, [stage, currentQuestionIndex, normalQuestions.length, allQuestions.length, responses, participantName]);

  const handleTransition1Complete = useCallback(() => {
    setStage('strategic-questions');
    setCurrentQuestionIndex(normalQuestions.length); // Start strategic questions
  }, [normalQuestions.length]);

  const handleTransition2Complete = useCallback(() => {
    setStage('result');
  }, []);

  // Render stages
  if (stage === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-8 shadow-xl">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="w-8 h-8 text-purple-600" />
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                Descubra Seu Estilo Único
              </h1>
            </div>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Em apenas alguns minutos, você descobrirá qual é o seu perfil de estilo pessoal 
              e receberá um guia personalizado para transformar seu guarda-roupa.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4">
                <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800">10 Questões</h3>
                <p className="text-sm text-gray-600">Análise completa do seu estilo</p>
              </div>
              <div className="text-center p-4">
                <Heart className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800">100% Personalizado</h3>
                <p className="text-sm text-gray-600">Resultado único para você</p>
              </div>
              <div className="text-center p-4">
                <Sparkles className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-800">Guia Prático</h3>
                <p className="text-sm text-gray-600">Dicas para aplicar no dia a dia</p>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Como você gostaria de ser chamada?
              </label>
              <Input
                type="text"
                value={participantName}
                onChange={(e) => setParticipantName(e.target.value)}
                placeholder="Digite seu nome"
                className="text-center text-lg"
                maxLength={50}
              />
            </div>

            <Button
              onClick={handleStartQuiz}
              disabled={!participantName.trim()}
              size="lg"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg py-3"
            >
              Começar o Quiz
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  if (stage === 'normal-questions') {
    const currentQuestion = normalQuestions[currentQuestionIndex];
    return (
      <CaktoQuizQuestion
        question={currentQuestion}
        questionIndex={currentQuestionIndex}
        totalQuestions={normalQuestions.length}
        onAnswer={handleQuestionAnswer}
        onNext={handleNextQuestion}
        isLastQuestion={currentQuestionIndex === normalQuestions.length - 1}
      />
    );
  }

  if (stage === 'transition-1') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-8 shadow-xl text-center">
          <div className="mb-6">
            <div className="animate-spin w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              🕐 Enquanto calculamos o seu resultado...
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Queremos te fazer algumas perguntas que vão tornar sua experiência ainda mais completa.
              A ideia é simples: te ajudar a enxergar com mais clareza onde você está agora — e para onde pode ir 
              com mais intenção, leveza e autenticidade.
            </p>
            <p className="text-purple-600 font-semibold mb-6">
              💬 Responda com sinceridade. Isso é só entre você e a sua nova versão.
            </p>
          </div>
          
          <Button
            onClick={handleTransition1Complete}
            size="lg"
            className="bg-purple-600 hover:bg-purple-700"
          >
            Continuar
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Card>
      </div>
    );
  }

  if (stage === 'strategic-questions') {
    const strategicIndex = currentQuestionIndex - normalQuestions.length;
    const currentQuestion = strategicQuestionsData[strategicIndex];
    return (
      <CaktoQuizQuestion
        question={currentQuestion}
        questionIndex={currentQuestionIndex}
        totalQuestions={allQuestions.length}
        onAnswer={handleQuestionAnswer}
        onNext={handleNextQuestion}
        isLastQuestion={currentQuestionIndex === allQuestions.length - 1}
      />
    );
  }

  if (stage === 'transition-2') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <Card className="max-w-2xl w-full p-8 shadow-xl text-center">
          <div className="mb-6">
            <div className="animate-pulse w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Obrigada por compartilhar, {participantName}!
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Estamos finalizando sua análise personalizada e preparando seu guia de estilo único.
              Em poucos segundos você descobrirá qual é o seu perfil e como aplicá-lo no seu dia a dia.
            </p>
          </div>
          
          <Button
            onClick={handleTransition2Complete}
            size="lg"
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
          >
            Ver Meu Resultado
            <Sparkles className="ml-2 w-4 h-4" />
          </Button>
        </Card>
      </div>
    );
  }

  if (stage === 'result' && quizResult) {
    return (
      <CaktoQuizResult
        result={quizResult}
        onContinue={() => {
          // Navigate to offer page or next step
          console.log('Continue to offer page');
        }}
      />
    );
  }

  return null;
};

export default CaktoQuizFlow;
