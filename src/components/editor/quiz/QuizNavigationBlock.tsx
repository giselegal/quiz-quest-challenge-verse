/**
 * QuizNavigationBlock.tsx - Modular Navigation Component
 * ✅ Intelligent and responsive navigation
 * ✅ Progress tracking and visualization
 * ✅ Mode-aware functionality (editor/preview/production)
 */

import React from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronLeft, 
  ChevronRight, 
  Home, 
  Settings, 
  Eye, 
  Play,
  RotateCcw 
} from 'lucide-react';
import { QuizMode } from './QuizFlowPage';

export interface QuizNavigationBlockProps {
  mode: QuizMode;
  currentStep: number;
  totalSteps: number;
  onNavigation: (direction: 'next' | 'prev' | 'jump', targetStep?: number) => void;
  showDebugInfo?: boolean;
  theme?: {
    primaryColor?: string;
    backgroundColor?: string;
    textColor?: string;
  };
  onModeChange?: (newMode: QuizMode) => void;
  onReset?: () => void;
  onExit?: () => void;
  className?: string;
}

export const QuizNavigationBlock: React.FC<QuizNavigationBlockProps> = ({
  mode,
  currentStep,
  totalSteps,
  onNavigation,
  showDebugInfo = false,
  theme = {},
  onModeChange,
  onReset,
  onExit,
  className = '',
}) => {
  // Calculate progress percentage
  const progressPercentage = Math.round((currentStep / totalSteps) * 100);
  
  // Define step phases for better UX
  const getStepPhase = () => {
    if (currentStep === 1) return 'intro';
    if (currentStep >= 2 && currentStep <= 11) return 'scoring';
    if (currentStep === 12) return 'transition';
    if (currentStep >= 13 && currentStep <= 18) return 'strategic';
    if (currentStep === 19) return 'processing';
    if (currentStep === 20) return 'results';
    if (currentStep === 21) return 'offer';
    return 'unknown';
  };

  const stepPhase = getStepPhase();
  
  // Phase-specific labels and colors
  const phaseConfig = {
    intro: { label: 'Introdução', color: '#3B82F6' },
    scoring: { label: 'Perguntas de Estilo', color: '#8B5CF6' },
    transition: { label: 'Transição', color: '#06B6D4' },
    strategic: { label: 'Perguntas Estratégicas', color: '#10B981' },
    processing: { label: 'Processando', color: '#F59E0B' },
    results: { label: 'Resultados', color: '#EF4444' },
    offer: { label: 'Oferta', color: '#84CC16' },
    unknown: { label: 'Desconhecido', color: '#6B7280' },
  };

  const currentPhase = phaseConfig[stepPhase];

  // Mode-specific controls
  const renderModeControls = () => {
    if (mode === 'editor') {
      return (
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            Editor
          </Badge>
          {onModeChange && (
            <div className="flex gap-1">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onModeChange('preview')}
                title="Modo Preview"
              >
                <Eye className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onModeChange('production')}
                title="Modo Produção"
              >
                <Play className="h-3 w-3" />
              </Button>
            </div>
          )}
        </div>
      );
    }
    
    if (mode === 'preview') {
      return (
        <Badge variant="outline" className="text-xs text-blue-600">
          Preview
        </Badge>
      );
    }
    
    return null;
  };

  return (
    <div 
      className={`quiz-navigation-block border-b bg-white ${className}`}
      style={{ 
        borderColor: '#E5DDD5',
        backgroundColor: theme.backgroundColor || '#FEFEFE'
      }}
    >
      {/* Main Navigation Header */}
      <div className="flex items-center justify-between p-4">
        {/* Left Side - Step Info */}
        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            <span className="font-medium">Etapa {currentStep}</span>
            <span className="text-gray-400"> de {totalSteps}</span>
          </div>
          
          <Badge 
            variant="secondary" 
            style={{ 
              backgroundColor: currentPhase.color + '20',
              color: currentPhase.color,
              borderColor: currentPhase.color + '40'
            }}
          >
            {currentPhase.label}
          </Badge>
        </div>

        {/* Right Side - Controls */}
        <div className="flex items-center gap-2">
          {renderModeControls()}
          
          {/* Navigation Buttons */}
          <div className="flex gap-1">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onNavigation('prev')}
              disabled={currentStep === 1}
              className="px-2"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <Button
              size="sm"
              variant="outline"
              onClick={() => onNavigation('next')}
              disabled={currentStep === totalSteps}
              className="px-2"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Additional Controls */}
          <div className="flex gap-1 ml-2 border-l pl-2">
            {onReset && (
              <Button
                size="sm"
                variant="ghost"
                onClick={onReset}
                title="Reiniciar Quiz"
              >
                <RotateCcw className="h-3 w-3" />
              </Button>
            )}
            
            {onExit && (
              <Button
                size="sm"
                variant="ghost"
                onClick={onExit}
                title="Sair"
              >
                <Home className="h-3 w-3" />
              </Button>
            )}
            
            {mode === 'editor' && (
              <Button
                size="sm"
                variant="ghost"
                title="Configurações"
              >
                <Settings className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="px-4 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex-1">
            <Progress 
              value={progressPercentage} 
              className="h-2"
              style={{
                backgroundColor: '#E5DDD5',
              }}
            />
          </div>
          <div className="text-xs text-gray-500 min-w-fit">
            {progressPercentage}%
          </div>
        </div>
      </div>

      {/* Debug Info Panel (Editor Mode) */}
      {showDebugInfo && mode === 'editor' && (
        <div className="px-4 pb-3 border-t border-gray-100">
          <div className="text-xs text-gray-500 space-y-1 mt-2">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <strong>Fase:</strong> {stepPhase}
              </div>
              <div>
                <strong>Progresso:</strong> {progressPercentage}%
              </div>
              <div>
                <strong>Modo:</strong> {mode}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Step Jump Navigation (Editor Mode) */}
      {mode === 'editor' && (
        <div className="px-4 pb-3 border-t border-gray-100">
          <div className="text-xs text-gray-600 mb-2">Navegação Rápida:</div>
          <div className="flex flex-wrap gap-1">
            {Array.from({ length: totalSteps }, (_, i) => i + 1).map(step => (
              <Button
                key={step}
                size="sm"
                variant={currentStep === step ? 'default' : 'ghost'}
                onClick={() => onNavigation('jump', step)}
                className="h-6 w-6 p-0 text-xs"
                style={{
                  backgroundColor: currentStep === step ? theme.primaryColor : 'transparent',
                  color: currentStep === step ? 'white' : theme.textColor,
                }}
              >
                {step}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizNavigationBlock;