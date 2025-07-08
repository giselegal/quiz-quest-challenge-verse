import React, { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InlineEditableText } from './InlineEditableText';
import { 
  ChevronRight, 
  ChevronLeft, 
  Check, 
  Star,
  Clock,
  Users,
  Sparkles,
  ArrowRight,
  RefreshCw,
  CheckCircle2
} from 'lucide-react';
import type { BlockComponentProps } from '@/types/blocks';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface QuizOption {
  id: string;
  text: string;
  description?: string;
  image?: string;
  value?: number;
  color?: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  subtitle?: string;
  type: 'single' | 'multiple' | 'scale';
  options: QuizOption[];
  required?: boolean;
}

interface InteractiveQuizBlockProps extends BlockComponentProps {
  block: {
    id: string;
    type: 'interactive-quiz';
    properties: {
      title?: string;
      subtitle?: string;
      questions?: QuizQuestion[];
      showProgress?: boolean;
      showTimer?: boolean;
      allowBack?: boolean;
      completionMessage?: string;
      ctaText?: string;
      ctaUrl?: string;
      theme?: 'modern' | 'elegant' | 'playful';
      backgroundColor?: string;
      accentColor?: string;
    };
  };
}

const InteractiveQuizBlock: React.FC<InteractiveQuizBlockProps> = ({
  block,
  isSelected = false,
  isEditing = false,
  onClick,
  onPropertyChange,
  className = ''
}) => {
  const {
    title = 'Descubra Seu Estilo Pessoal',
    subtitle = 'Responda 4 perguntas rápidas e descubra qual estilo combina mais com você',
    questions = [
      {
        id: 'q1',
        question: 'Qual dessas palavras mais te descreve?',
        subtitle: 'Escolha a opção que mais se conecta com sua personalidade',
        type: 'single',
        options: [
          {
            id: 'opt1',
            text: 'Romântica',
            description: 'Amo peças delicadas e femininas',
            color: '#F8BBD9'
          },
          {
            id: 'opt2',
            text: 'Elegante',
            description: 'Prefiro looks sofisticados e atemporais',
            color: '#B89B7A'
          },
          {
            id: 'opt3',
            text: 'Autêntica',
            description: 'Gosto de ser eu mesma, sem artificialismo',
            color: '#87CEEB'
          },
          {
            id: 'opt4',
            text: 'Marcante',
            description: 'Adoro chamar atenção com meu estilo',
            color: '#8B4513'
          }
        ]
      },
      {
        id: 'q2',
        question: 'Qual é sua ocasião favorita para se arrumar?',
        subtitle: 'Pense em quando você se sente mais confiante',
        type: 'single',
        options: [
          {
            id: 'opt5',
            text: 'Encontro romântico',
            description: 'Jantar a dois, cinema, passeios especiais',
            color: '#F8BBD9'
          },
          {
            id: 'opt6',
            text: 'Reunião de trabalho',
            description: 'Apresentações, meetings, eventos corporativos',
            color: '#B89B7A'
          },
          {
            id: 'opt7',
            text: 'Encontro com amigas',
            description: 'Café, shopping, conversa descontraída',
            color: '#87CEEB'
          },
          {
            id: 'opt8',
            text: 'Festa ou evento',
            description: 'Formatura, casamento, festa especial',
            color: '#8B4513'
          }
        ]
      }
    ],
    showProgress = true,
    showTimer = false,
    allowBack = true,
    completionMessage = 'Parabéns! Você descobriu seu estilo pessoal.',
    ctaText = 'Ver Meu Resultado',
    ctaUrl = '/resultado',
    theme = 'modern',
    backgroundColor = '#ffffff',
    accentColor = '#B89B7A'
  } = block.properties;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string[]>>({});
  const [isCompleted, setIsCompleted] = useState(false);
  const [timeSpent, setTimeSpent] = useState(0);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showTimer && !isCompleted) {
      interval = setInterval(() => {
        setTimeSpent(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [showTimer, isCompleted]);

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  const handleOptionSelect = useCallback((questionId: string, optionId: string, isMultiple = false) => {
    setAnswers(prev => {
      const currentAnswers = prev[questionId] || [];
      
      if (isMultiple) {
        const newAnswers = currentAnswers.includes(optionId)
          ? currentAnswers.filter(id => id !== optionId)
          : [...currentAnswers, optionId];
        return { ...prev, [questionId]: newAnswers };
      } else {
        return { ...prev, [questionId]: [optionId] };
      }
    });
  }, []);

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setIsCompleted(false);
    setTimeSpent(0);
  };

  const getThemeClasses = () => {
    switch (theme) {
      case 'elegant':
        return {
          container: 'bg-gradient-to-br from-[#FAF9F7] to-white',
          card: 'bg-white border border-[#B89B7A]/20 shadow-xl',
          accent: 'text-[#432818]',
          button: 'bg-[#B89B7A] hover:bg-[#A68A6A] text-white'
        };
      case 'playful':
        return {
          container: 'bg-gradient-to-br from-pink-50 to-purple-50',
          card: 'bg-white border-2 border-pink-200 shadow-lg',
          accent: 'text-purple-600',
          button: 'bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white'
        };
      case 'modern':
      default:
        return {
          container: 'bg-gradient-to-br from-gray-50 to-white',
          card: 'bg-white border border-gray-200 shadow-lg',
          accent: 'text-gray-800',
          button: 'bg-gray-900 hover:bg-gray-800 text-white'
        };
    }
  };

  const themeClasses = getThemeClasses();
  const progress = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;
  const currentQ = questions[currentQuestion];
  const currentAnswers = answers[currentQ?.id] || [];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!questions || questions.length === 0) {
    return (
      <div
        className={cn(
          'bg-gray-100 p-8 rounded-lg text-gray-500 flex flex-col items-center justify-center min-h-[400px] cursor-pointer transition-all duration-200',
          isSelected 
            ? 'outline-2 outline-[#B89B7A] outline-offset-2' 
            : 'hover:shadow-sm',
          className
        )}
        onClick={onClick}
        data-block-id={block.id}
        data-block-type={block.type}
      >
        <Sparkles className="w-12 h-12 mb-4 opacity-50" />
        <p className="text-center">Configure as perguntas do quiz no painel de propriedades.</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'py-12 px-4 cursor-pointer transition-all duration-200 min-h-[600px]',
        themeClasses.container,
        isSelected 
          ? 'outline-2 outline-[#B89B7A] outline-offset-2' 
          : 'hover:shadow-sm',
        className
      )}
      onClick={onClick}
      data-block-id={block.id}
      data-block-type={block.type}
      style={{ backgroundColor }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ color: accentColor }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <InlineEditableText
              value={title}
              onSave={(value: string) => handlePropertyChange('title', value)}
              className="inline-block"
              placeholder="Título do quiz"
              tag="span"
            />
          </motion.h2>
          
          {subtitle && (
            <motion.p 
              className="text-lg text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <InlineEditableText
                value={subtitle}
                onSave={(value: string) => handlePropertyChange('subtitle', value)}
                className="inline-block"
                placeholder="Subtítulo do quiz"
                tag="span"
              />
            </motion.p>
          )}
        </div>

        {/* Quiz Stats */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <Badge variant="outline" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            {questions.length} perguntas
          </Badge>
          
          {showTimer && (
            <Badge variant="outline" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {formatTime(timeSpent)}
            </Badge>
          )}
          
          <Badge variant="outline" className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            ~2 minutos
          </Badge>
        </div>

        {/* Progress Bar */}
        {showProgress && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">
                Pergunta {currentQuestion + 1} de {questions.length}
              </span>
              <span className="text-sm text-gray-600">
                {Math.round(progress)}%
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Quiz Content */}
        <Card className={themeClasses.card}>
          <CardContent className="p-8">
            <AnimatePresence mode="wait">
              {!isCompleted ? (
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Question */}
                  <div className="text-center">
                    <h3 className="text-xl md:text-2xl font-semibold mb-2" style={{ color: accentColor }}>
                      {isEditing ? (
                        <InlineEditableText
                          value={currentQ.question}
                          onSave={(value: string) => {
                            const updatedQuestions = questions.map(q => 
                              q.id === currentQ.id ? { ...q, question: value } : q
                            );
                            handlePropertyChange('questions', updatedQuestions);
                          }}
                          className="inline-block"
                          placeholder="Pergunta do quiz"
                          tag="span"
                        />
                      ) : (
                        currentQ.question
                      )}
                    </h3>
                    
                    {currentQ.subtitle && (
                      <p className="text-gray-600">
                        {isEditing ? (
                          <InlineEditableText
                            value={currentQ.subtitle}
                            onSave={(value: string) => {
                              const updatedQuestions = questions.map(q => 
                                q.id === currentQ.id ? { ...q, subtitle: value } : q
                              );
                              handlePropertyChange('questions', updatedQuestions);
                            }}
                            className="inline-block"
                            placeholder="Subtítulo da pergunta"
                            tag="span"
                          />
                        ) : (
                          currentQ.subtitle
                        )}
                      </p>
                    )}
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentQ.options.map((option, index) => {
                      const isSelected = currentAnswers.includes(option.id);
                      
                      return (
                        <motion.div
                          key={option.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={cn(
                            'p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 group',
                            isSelected 
                              ? 'border-[#B89B7A] bg-[#FAF9F7] shadow-md' 
                              : 'border-gray-200 hover:border-[#B89B7A]/50 hover:bg-gray-50'
                          )}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!isEditing) {
                              handleOptionSelect(currentQ.id, option.id, currentQ.type === 'multiple');
                            }
                          }}
                          style={{
                            backgroundColor: isSelected && option.color 
                              ? `${option.color}20` 
                              : undefined
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <div 
                              className={cn(
                                'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all',
                                isSelected 
                                  ? 'border-[#B89B7A] bg-[#B89B7A]' 
                                  : 'border-gray-300 group-hover:border-[#B89B7A]'
                              )}
                            >
                              {isSelected && <Check className="w-3 h-3 text-white" />}
                            </div>
                            
                            <div className="flex-1">
                              <div className="font-medium text-gray-900">
                                {option.text}
                              </div>
                              {option.description && (
                                <div className="text-sm text-gray-600 mt-1">
                                  {option.description}
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between items-center pt-6">
                    {allowBack && currentQuestion > 0 ? (
                      <Button
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!isEditing) prevQuestion();
                        }}
                        className="flex items-center gap-2"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Anterior
                      </Button>
                    ) : (
                      <div />
                    )}

                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isEditing && currentAnswers.length > 0) {
                          nextQuestion();
                        }
                      }}
                      disabled={currentAnswers.length === 0}
                      className={cn(
                        'flex items-center gap-2',
                        themeClasses.button
                      )}
                    >
                      {currentQuestion < questions.length - 1 ? 'Próxima' : 'Finalizar'}
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ) : (
                /* Completion Screen */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-6"
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold mb-2" style={{ color: accentColor }}>
                      {completionMessage}
                    </h3>
                    <p className="text-gray-600">
                      Você respondeu {Object.keys(answers).length} de {questions.length} perguntas
                      {showTimer && ` em ${formatTime(timeSpent)}`}.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isEditing) resetQuiz();
                      }}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Refazer Quiz
                    </Button>
                    
                    <Button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isEditing && ctaUrl) {
                          window.location.href = ctaUrl;
                        }
                      }}
                      className={cn(
                        'flex items-center gap-2',
                        themeClasses.button
                      )}
                    >
                      {ctaText}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Debug info */}
        {isEditing && (
          <motion.div 
            className="mt-8 p-4 bg-[#FAF9F7] border border-[#B89B7A]/20 rounded-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-sm text-[#8F7A6A]">
              Modo de edição: Pergunta {currentQuestion + 1}/{questions.length} • 
              Respostas: {Object.keys(answers).length} • 
              Tema: {theme} • 
              Concluído: {isCompleted ? 'sim' : 'não'}
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default InteractiveQuizBlock;
