import React, { useState, useEffect } from 'react';
import { Crown, Star, Award, CheckCircle, Trophy, Heart, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AnimatedWrapper } from '@/components/ui/animated-wrapper';
import { InlineEditText } from './InlineEditText';
import type { BlockComponentProps } from '@/types/blocks';

interface QuizResult {
  id: string;
  title: string;
  description: string;
  image?: string;
  characteristics?: string[];
  color?: string;
  icon?: string;
}

const QuizResultDisplayBlock: React.FC<BlockComponentProps> = ({
  block,
  isSelected = false,
  isEditing = false,
  onClick,
  onPropertyChange,
  className = ''
}) => {
  const {
    showAnimation = true,
    showCharacteristics = true,
    showProgressBar = true,
    accentColor = '#B89B7A',
    textColor = '#432818',
    backgroundColor = '#fffaf7',
    resultId = '',
    customTitle = '',
    customDescription = '',
    customImage = '',
    layoutStyle = 'card' // 'card', 'hero', 'minimal'
  } = block.properties;

  const [currentResult, setCurrentResult] = useState<QuizResult | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [progressValue, setProgressValue] = useState(0);

  // Carregar resultado do quiz do localStorage
  useEffect(() => {
    const loadQuizResult = () => {
      try {
        // Tentar carregar do localStorage
        const quizConfig = localStorage.getItem('quiz-editor-config');
        const lastQuizResult = localStorage.getItem('last-quiz-result');
        
        if (lastQuizResult) {
          const result = JSON.parse(lastQuizResult);
          setCurrentResult(result);
        } else if (quizConfig) {
          const config = JSON.parse(quizConfig);
          const results = config.results || [];
          
          // Se há resultId específico, usar esse
          if (resultId && results.length > 0) {
            const specificResult = results.find((r: QuizResult) => r.id === resultId);
            if (specificResult) {
              setCurrentResult(specificResult);
            }
          } else if (results.length > 0) {
            // Usar primeiro resultado como exemplo
            setCurrentResult(results[0]);
          }
        }
        
        // Resultado padrão se nada for encontrado
        if (!currentResult) {
          setCurrentResult({
            id: 'default',
            title: customTitle || 'Seu Resultado',
            description: customDescription || 'Parabéns! Aqui está seu resultado personalizado.',
            characteristics: [
              'Resultado baseado em suas respostas',
              'Personalizado para você',
              'Resultado único e especial'
            ],
            color: accentColor,
            icon: 'trophy'
          });
        }
      } catch (error) {
        console.error('Erro ao carregar resultado:', error);
      }
    };

    loadQuizResult();
    setIsLoaded(true);
  }, [resultId, customTitle, customDescription, accentColor]);

  // Animação da barra de progresso
  useEffect(() => {
    if (showProgressBar && isLoaded) {
      const timer = setTimeout(() => {
        setProgressValue(85 + Math.random() * 15); // 85-100%
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [showProgressBar, isLoaded]);

  const getIcon = (iconName?: string) => {
    const icons = {
      crown: Crown,
      star: Star,
      award: Award,
      trophy: Trophy,
      heart: Heart,
      sparkles: Sparkles,
      check: CheckCircle
    };
    
    const IconComponent = icons[iconName as keyof typeof icons] || Trophy;
    return IconComponent;
  };

  const Icon = getIcon(currentResult?.icon);

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  if (!currentResult) {
    return (
      <div className="w-full py-8 px-4 text-center">
        <div className="text-gray-500">Carregando resultado...</div>
      </div>
    );
  }

  const renderCardLayout = () => (
    <Card className="overflow-hidden shadow-xl border-0 max-w-xs sm:max-w-lg md:max-w-4xl mx-auto">
      <CardHeader 
        className="text-center pb-6" 
        style={{ backgroundColor: `${accentColor}15` }}
      >
        <div className="flex items-center justify-center mb-4">
          <Icon className="w-16 h-16 mr-4" style={{ color: accentColor }} />
          <div>
            <h2 
              className="text-3xl md:text-4xl font-bold mb-2" 
              style={{ color: textColor }}
            >
              {isEditing ? (
                <InlineEditText
                  value={currentResult.title}
                  onChange={(value) => handlePropertyChange('customTitle', value)}
                  className="text-center"
                />
              ) : (
                currentResult.title
              )}
            </h2>
            <Badge 
              variant="secondary" 
              className="text-sm"
              style={{ backgroundColor: accentColor, color: 'white' }}
            >
              Seu resultado personalizado
            </Badge>
          </div>
        </div>

        {showProgressBar && (
          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2" style={{ color: textColor }}>
              <span>Compatibilidade</span>
              <span>{Math.round(progressValue)}%</span>
            </div>
            <Progress 
              value={progressValue} 
              className="h-3"
              style={{ 
                backgroundColor: `${accentColor}20`,
              }}
            />
          </div>
        )}
      </CardHeader>

      <CardContent className="p-8">
        {currentResult.image && (
          <div className="mb-6 text-center">
            <img 
              src={currentResult.image}
              alt={currentResult.title}
              className="w-48 sm:w-56 md:w-64 h-48 sm:h-56 md:h-64 object-cover rounded-lg mx-auto shadow-md"
            />
          </div>
        )}

        <div className="text-center mb-8">
          <p 
            className="text-lg leading-relaxed max-w-xs sm:max-w-lg md:max-w-2xl mx-auto"
            style={{ color: textColor }}
          >
            {isEditing ? (
              <InlineEditText
                value={currentResult.description}
                onChange={(value) => handlePropertyChange('customDescription', value)}
                multiline
                className="text-center"
              />
            ) : (
              currentResult.description
            )}
          </p>
        </div>

        {showCharacteristics && currentResult.characteristics && (
          <div className="mb-8">
            <h3 
              className="text-xl font-semibold mb-4 text-center"
              style={{ color: textColor }}
            >
              Características do seu resultado:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentResult.characteristics.map((characteristic, index) => (
                <div 
                  key={index}
                  className="flex items-center p-3 rounded-lg"
                  style={{ backgroundColor: `${accentColor}10` }}
                >
                  <CheckCircle 
                    className="w-5 h-5 mr-3 flex-shrink-0" 
                    style={{ color: accentColor }}
                  />
                  <span style={{ color: textColor }}>{characteristic}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-center">
          <Button 
            size="lg"
            className="px-8 py-3 text-lg"
            style={{ 
              backgroundColor: accentColor,
              color: 'white',
              border: 'none'
            }}
          >
            Descobrir Mais
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderHeroLayout = () => (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor }}>
      <div className="text-center max-w-xs sm:max-w-lg md:max-w-4xl mx-auto px-4">
        <AnimatedWrapper show={isLoaded}>
          <Icon className="w-24 h-24 mx-auto mb-6" style={{ color: accentColor }} />
          
          <h1 
            className="text-5xl md:text-6xl font-bold mb-6"
            style={{ color: textColor }}
          >
            {currentResult.title}
          </h1>
          
          <p 
            className="text-xl md:text-2xl mb-8 leading-relaxed"
            style={{ color: textColor }}
          >
            {currentResult.description}
          </p>

          {showProgressBar && (
            <div className="mb-8 max-w-md mx-auto">
              <div className="flex justify-between text-lg mb-3" style={{ color: textColor }}>
                <span>Compatibilidade</span>
                <span>{Math.round(progressValue)}%</span>
              </div>
              <Progress 
                value={progressValue} 
                className="h-4"
                style={{ backgroundColor: `${accentColor}20` }}
              />
            </div>
          )}

          <Button 
            size="lg"
            className="px-12 py-4 text-xl"
            style={{ 
              backgroundColor: accentColor,
              color: 'white',
              border: 'none'
            }}
          >
            Ver Detalhes
          </Button>
        </AnimatedWrapper>
      </div>
    </div>
  );

  const renderMinimalLayout = () => (
    <div className="max-w-xs sm:max-w-lg md:max-w-2xl mx-auto text-center py-8">
      <Icon className="w-12 h-12 mx-auto mb-4" style={{ color: accentColor }} />
      <h2 className="text-2xl font-bold mb-4" style={{ color: textColor }}>
        {currentResult.title}
      </h2>
      <p className="text-lg mb-6" style={{ color: textColor }}>
        {currentResult.description}
      </p>
      {showProgressBar && (
        <div className="mb-6">
          <Progress value={progressValue} className="h-2" />
        </div>
      )}
      <Button style={{ backgroundColor: accentColor, color: 'white' }}>
        Continuar
      </Button>
    </div>
  );

  const renderLayout = () => {
    switch (layoutStyle) {
      case 'hero':
        return renderHeroLayout();
      case 'minimal':
        return renderMinimalLayout();
      case 'card':
      default:
        return renderCardLayout();
    }
  };

  return (
    <div
      className={`
        w-full py-8 px-4 transition-all duration-200
        ${isSelected 
          ? 'ring-2 ring-blue-400 ring-opacity-50 bg-blue-50/20' 
          : 'hover:shadow-sm'
        }
        ${className}
      `}
      onClick={onClick}
      data-block-id={block.id}
      data-block-type={block.type}
      style={{ backgroundColor: layoutStyle === 'hero' ? 'transparent' : backgroundColor }}
    >
      <AnimatedWrapper show={showAnimation ? isLoaded : true}>
        {renderLayout()}
      </AnimatedWrapper>
    </div>
  );
};

export default QuizResultDisplayBlock;
