// Componente criado usando snippets ES7 React/Redux/React-Native/JS
// Usando snippet "rafce" + Tab

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAnalytics, useViewport } from '@/hooks/useQuizHooks';
import { cn } from '@/lib/utils';
import { 
  Star, 
  Share2, 
  Download, 
  ArrowRight, 
  Sparkles,
  TrendingUp,
  Award
} from 'lucide-react';

// Usando snippet "interface" + Tab
interface QuizResult {
  id: string;
  title: string;
  description: string;
  percentage: number;
  color: string;
  icon: string;
  recommendations: string[];
  imageUrl?: string;
}

interface QuizResultsProps {
  result: QuizResult;
  onContinue: () => void;
  onShare?: () => void;
  className?: string;
}

// Usando snippet "uch" + Tab para criar custom hook
const useResultAnimation = (percentage: number) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  
  // Usando snippet "useEffect" + Tab
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Usando snippet "useEffect" + Tab
  useEffect(() => {
    if (!isVisible) return;
    
    const duration = 2000;
    const increment = percentage / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= percentage) {
        setAnimatedPercentage(percentage);
        clearInterval(timer);
      } else {
        setAnimatedPercentage(Math.floor(current));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [percentage, isVisible]);
  
  return { animatedPercentage, isVisible };
};

// Usando snippet "memo" + Tab para otimizar performance
const QuizResults: React.FC<QuizResultsProps> = React.memo(({ 
  result, 
  onContinue, 
  onShare, 
  className 
}) => {
  // Usando snippet "dob" + Tab para destructuring
  const { 
    title, 
    description, 
    percentage, 
    color, 
    recommendations,
    imageUrl
  } = result;
  
  // Usando custom hooks
  const { animatedPercentage, isVisible } = useResultAnimation(percentage);
  const { trackEvent } = useAnalytics();
  const { isMobile, isTablet } = useViewport();
  
  // Usando snippet "useState" + Tab
  const [isShared, setIsShared] = useState(false);
  
  // Usando snippet "useMemo" + Tab para otimizar cálculos
  const cardStyles = useMemo(() => ({
    background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
    borderColor: `${color}30`,
  }), [color]);
  
  const progressStyles = useMemo(() => ({
    '--progress-background': `linear-gradient(to right, ${color}, ${color}CC)`,
    transition: 'all 0.5s ease-in-out',
  }), [color]);
  
  // Usando snippet "useCallback" + Tab para otimizar funções
  const handleShare = useCallback(async () => {
    trackEvent('result_share_clicked', { resultId: result.id });
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Meu resultado: ${title}`,
          text: `Descobri que meu estilo é ${title}! ${description}`,
          url: window.location.href,
        });
        setIsShared(true);
        trackEvent('result_shared', { resultId: result.id, method: 'native' });
      } catch (error) {
        // Usuário cancelou o compartilhamento
      }
    } else {
      // Fallback para navegadores sem suporte
      navigator.clipboard.writeText(window.location.href);
      setIsShared(true);
      trackEvent('result_shared', { resultId: result.id, method: 'clipboard' });
    }
    
    onShare?.();
  }, [result.id, title, description, onShare, trackEvent]);
  
  const handleContinue = useCallback(() => {
    trackEvent('result_continue_clicked', { resultId: result.id });
    onContinue();
  }, [result.id, onContinue, trackEvent]);
  
  const handleDownload = useCallback(() => {
    trackEvent('result_download_clicked', { resultId: result.id });
    // Implementar download do resultado
  }, [result.id, trackEvent]);
  
  return (
    <Card className={cn(
      'w-full max-w-2xl mx-auto p-6 lg:p-8',
      'shadow-2xl border-2 rounded-2xl overflow-hidden',
      'transition-all duration-500 hover:shadow-3xl',
      isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
      className
    )} style={cardStyles}>
      
      {/* Header com Badge */}
      <div className="text-center mb-8">
        <Badge 
          variant="secondary" 
          className="mb-4 px-4 py-2 text-sm font-medium"
          style={{ backgroundColor: `${color}20`, color: color }}
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Seu Resultado
        </Badge>
        
        <div className="relative inline-block">
          <h1 className={cn(
            'font-bold text-center bg-gradient-to-r bg-clip-text text-transparent',
            isMobile ? 'text-3xl' : 'text-4xl lg:text-5xl'
          )} style={{ 
            backgroundImage: `linear-gradient(135deg, ${color}, ${color}CC)` 
          }}>
            {title}
          </h1>
          
          {/* Decoração */}
          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full animate-pulse" 
               style={{ backgroundColor: `${color}40` }} />
          <div className="absolute -bottom-2 -left-2 w-4 h-4 rounded-full animate-pulse" 
               style={{ backgroundColor: `${color}60` }} />
        </div>
      </div>
      
      {/* Imagem do Resultado */}
      {imageUrl && (
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <img 
              src={imageUrl} 
              alt={title}
              className={cn(
                'rounded-xl shadow-lg object-cover transition-transform duration-300 hover:scale-105',
                isMobile ? 'w-48 h-48' : 'w-64 h-64'
              )}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl" />
          </div>
        </div>
      )}
      
      {/* Percentual Animado */}
      <div className="mb-8 text-center">
        <div className="relative inline-block">
          <div className={cn(
            'font-bold mb-2',
            isMobile ? 'text-4xl' : 'text-6xl'
          )} style={{ color }}>
            {animatedPercentage}%
          </div>
          <div className="w-20 h-1 rounded-full mx-auto" 
               style={{ backgroundColor: `${color}40` }}>
            <div 
              className="h-full rounded-full transition-all duration-2000 ease-out"
              style={{ 
                width: `${animatedPercentage}%`,
                backgroundColor: color 
              }}
            />
          </div>
        </div>
        <p className="text-gray-600 mt-2">de compatibilidade</p>
      </div>
      
      {/* Descrição */}
      <div className="mb-8 text-center">
        <p className={cn(
          'text-gray-700 leading-relaxed',
          isMobile ? 'text-base' : 'text-lg'
        )}>
          {description}
        </p>
      </div>
      
      {/* Recomendações */}
      {recommendations && recommendations.length > 0 && (
        <div className="mb-8">
          <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" style={{ color }} />
            Características do seu estilo:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {recommendations.map((rec, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg bg-white/50 border border-gray-200"
              >
                <div 
                  className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: color }}
                />
                <span className="text-sm text-gray-700">{rec}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          onClick={handleContinue}
          className={cn(
            'flex items-center gap-2 px-6 py-3',
            'bg-gradient-to-r hover:shadow-lg',
            'transition-all duration-200 transform hover:scale-105',
            'text-white font-medium'
          )}
          style={{ 
            background: `linear-gradient(135deg, ${color}, ${color}CC)`,
            boxShadow: `0 4px 20px ${color}40`
          }}
        >
          <Award className="w-5 h-5" />
          <span>Ver Guia Completo</span>
          <ArrowRight className="w-5 h-5" />
        </Button>
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-3 border-2 hover:bg-gray-50"
            style={{ borderColor: `${color}40` }}
          >
            <Share2 className="w-4 h-4" />
            {isShared ? 'Compartilhado!' : 'Compartilhar'}
          </Button>
          
          <Button
            variant="outline"
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-3 border-2 hover:bg-gray-50"
            style={{ borderColor: `${color}40` }}
          >
            <Download className="w-4 h-4" />
            Baixar
          </Button>
        </div>
      </div>
      
      {/* Feedback de compartilhamento */}
      {isShared && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-center">
          <p className="text-sm text-green-700">
            ✅ Resultado compartilhado com sucesso!
          </p>
        </div>
      )}
    </Card>
  );
});

// Usando snippet para definir displayName
QuizResults.displayName = 'QuizResults';

export default QuizResults;
