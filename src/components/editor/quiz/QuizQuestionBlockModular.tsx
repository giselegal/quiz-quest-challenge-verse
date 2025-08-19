/**
 * QuizQuestionBlockModular.tsx - Reusable Question Block Component
 * ✅ Improved modular question block with enhanced functionality
 * ✅ Supports multiple question types and layouts
 * ✅ Mode-aware rendering and interaction
 */

import React, { useState, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle2, 
  Circle, 
  RotateCcw, 
  ArrowRight, 
  AlertCircle 
} from 'lucide-react';
import { QuizMode } from './QuizFlowPage';

export interface QuestionOption {
  id: string;
  text: string;
  value?: string;
  category?: string;
  styleCategory?: string;
  points?: number;
  imageUrl?: string;
  description?: string;
}

export interface QuestionData {
  id: string;
  title: string;
  description?: string;
  type: 'single' | 'multiple' | 'scale' | 'text';
  options: QuestionOption[];
  validation?: {
    required?: boolean;
    minSelections?: number;
    maxSelections?: number;
    minLength?: number;
    maxLength?: number;
  };
  layout?: {
    columns?: number;
    showImages?: boolean;
    imageSize?: 'small' | 'medium' | 'large';
    optionStyle?: 'card' | 'button' | 'checkbox';
  };
  scoring?: {
    enabled?: boolean;
    method?: 'points' | 'category' | 'weighted';
  };
}

export interface QuizQuestionBlockModularProps {
  mode: QuizMode;
  stepType: string;
  currentStep: number;
  questionData: QuestionData;
  initialAnswers?: string[];
  onAnswer: (questionId: string, answers: string[] | string) => void;
  onValidationChange?: (isValid: boolean, errors: string[]) => void;
  showProgress?: boolean;
  progressValue?: number;
  theme?: {
    primaryColor?: string;
    backgroundColor?: string;
    textColor?: string;
  };
  className?: string;
}

export const QuizQuestionBlockModular: React.FC<QuizQuestionBlockModularProps> = ({
  mode,
  stepType,
  currentStep,
  questionData,
  initialAnswers = [],
  onAnswer,
  onValidationChange,
  showProgress = false,
  progressValue = 0,
  theme = {},
  className = '',
}) => {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(initialAnswers);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Default theme values
  const defaultTheme = {
    primaryColor: '#B89B7A',
    backgroundColor: '#FEFEFE',
    textColor: '#432818',
  };
  const appliedTheme = { ...defaultTheme, ...theme };

  // Question validation configuration
  const validation = questionData.validation || {};
  const layout = questionData.layout || {};
  
  // Determine if multiple selection is allowed
  const isMultipleSelection = questionData.type === 'multiple' || 
    (validation.maxSelections && validation.maxSelections > 1);

  // Validate current selection
  const validateSelection = useCallback((answers: string[]): string[] => {
    const errors: string[] = [];
    
    if (validation.required && answers.length === 0) {
      errors.push('Esta pergunta é obrigatória');
    }
    
    if (validation.minSelections && answers.length < validation.minSelections) {
      errors.push(`Selecione pelo menos ${validation.minSelections} opções`);
    }
    
    if (validation.maxSelections && answers.length > validation.maxSelections) {
      errors.push(`Selecione no máximo ${validation.maxSelections} opções`);
    }

    return errors;
  }, [validation]);

  // Handle option selection
  const handleOptionSelect = useCallback((optionId: string) => {
    if (mode === 'editor') return;

    let newSelection: string[];

    if (isMultipleSelection) {
      const maxSelections = validation.maxSelections || 3;
      
      if (selectedAnswers.includes(optionId)) {
        // Remove selection
        newSelection = selectedAnswers.filter(id => id !== optionId);
      } else if (selectedAnswers.length < maxSelections) {
        // Add selection
        newSelection = [...selectedAnswers, optionId];
      } else {
        // Replace oldest selection
        newSelection = [optionId, ...selectedAnswers.slice(0, maxSelections - 1)];
      }
    } else {
      // Single selection
      newSelection = selectedAnswers.includes(optionId) ? [] : [optionId];
    }

    setSelectedAnswers(newSelection);

    // Validate
    const errors = validateSelection(newSelection);
    setValidationErrors(errors);
    
    if (onValidationChange) {
      onValidationChange(errors.length === 0, errors);
    }

    // Notify parent
    const answerValue = isMultipleSelection ? newSelection : newSelection[0] || '';
    onAnswer(questionData.id, answerValue);
  }, [
    mode, 
    isMultipleSelection, 
    selectedAnswers, 
    validation.maxSelections, 
    validateSelection, 
    onValidationChange, 
    onAnswer, 
    questionData.id
  ]);

  // Reset selections
  const handleReset = useCallback(() => {
    if (mode === 'editor') return;
    
    setSelectedAnswers([]);
    setValidationErrors([]);
    
    if (onValidationChange) {
      onValidationChange(false, ['Esta pergunta é obrigatória']);
    }
    
    onAnswer(questionData.id, isMultipleSelection ? [] : '');
  }, [mode, onValidationChange, onAnswer, questionData.id, isMultipleSelection]);

  // Get selection info text
  const getSelectionInfo = useMemo(() => {
    const count = selectedAnswers.length;
    const max = validation.maxSelections || (isMultipleSelection ? 3 : 1);
    
    if (isMultipleSelection) {
      return `${count} de ${max} selecionadas`;
    }
    
    return count > 0 ? '1 selecionada' : 'Nenhuma seleção';
  }, [selectedAnswers.length, validation.maxSelections, isMultipleSelection]);

  // Render option based on layout style
  const renderOption = (option: QuestionOption) => {
    const isSelected = selectedAnswers.includes(option.id);
    const optionStyle = layout.optionStyle || 'card';

    const commonProps = {
      key: option.id,
      onClick: () => handleOptionSelect(option.id),
      className: `transition-all duration-200 ${mode === 'editor' ? 'pointer-events-none' : 'cursor-pointer'}`,
    };

    switch (optionStyle) {
      case 'button':
        return (
          <Button
            {...commonProps}
            variant={isSelected ? 'default' : 'outline'}
            className={`h-auto p-4 text-left justify-start ${commonProps.className}`}
            style={{
              backgroundColor: isSelected ? appliedTheme.primaryColor : 'transparent',
              borderColor: isSelected ? appliedTheme.primaryColor : '#E5DDD5',
              color: isSelected ? 'white' : appliedTheme.textColor,
            }}
          >
            <div className="flex items-start gap-3 w-full">
              <div className="pt-0.5">
                {isSelected ? (
                  <CheckCircle2 className="h-4 w-4" />
                ) : (
                  <Circle className="h-4 w-4" />
                )}
              </div>
              <div className="flex-1 min-w-0 text-left">
                <div className="font-medium">{option.text}</div>
                {option.description && (
                  <div className="text-sm opacity-80 mt-1">{option.description}</div>
                )}
              </div>
            </div>
          </Button>
        );

      case 'checkbox':
        return (
          <div
            {...commonProps}
            className={`flex items-start gap-3 p-3 rounded-lg border ${commonProps.className}`}
            style={{
              borderColor: isSelected ? appliedTheme.primaryColor : '#E5DDD5',
              backgroundColor: isSelected ? appliedTheme.primaryColor + '10' : appliedTheme.backgroundColor,
            }}
          >
            <div className="pt-0.5">
              {isSelected ? (
                <CheckCircle2 className="h-4 w-4" style={{ color: appliedTheme.primaryColor }} />
              ) : (
                <Circle className="h-4 w-4 text-gray-300" />
              )}
            </div>
            <div className="flex-1">
              <div className="font-medium" style={{ color: appliedTheme.textColor }}>
                {option.text}
              </div>
              {option.description && (
                <div className="text-sm text-gray-600 mt-1">{option.description}</div>
              )}
            </div>
          </div>
        );

      default: // 'card'
        return (
          <Card
            {...commonProps}
            className={`border-2 hover:shadow-sm ${commonProps.className}`}
            style={{
              borderColor: isSelected ? appliedTheme.primaryColor : '#E5DDD5',
              backgroundColor: isSelected ? appliedTheme.primaryColor + '08' : appliedTheme.backgroundColor,
            }}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="pt-0.5">
                  {isSelected ? (
                    <CheckCircle2 className="h-4 w-4" style={{ color: appliedTheme.primaryColor }} />
                  ) : (
                    <Circle className="h-4 w-4 text-gray-300" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  {option.imageUrl && layout.showImages && (
                    <div className="mb-2">
                      <img
                        src={option.imageUrl}
                        alt={option.text}
                        className={`rounded object-cover ${
                          layout.imageSize === 'large' ? 'h-20 w-20' :
                          layout.imageSize === 'medium' ? 'h-16 w-16' : 'h-12 w-12'
                        }`}
                      />
                    </div>
                  )}
                  <div className="font-medium" style={{ color: appliedTheme.textColor }}>
                    {option.text}
                  </div>
                  {option.description && (
                    <div className="text-sm text-gray-600 mt-1">{option.description}</div>
                  )}
                  {option.styleCategory && (
                    <Badge variant="secondary" className="mt-2 text-xs">
                      {option.styleCategory}
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
    }
  };

  // Grid columns configuration
  const gridColumns = layout.columns || (layout.showImages ? 2 : 1);
  const gridClass = `grid gap-3 ${
    gridColumns === 3 ? 'grid-cols-1 md:grid-cols-3' :
    gridColumns === 2 ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'
  }`;

  return (
    <Card className={`quiz-question-block-modular ${className}`}>
      <CardHeader className="pb-4">
        <CardTitle className="text-lg" style={{ color: appliedTheme.textColor }}>
          {questionData.title}
        </CardTitle>
        {questionData.description && (
          <p className="text-sm text-gray-600">{questionData.description}</p>
        )}
        
        {/* Selection requirements */}
        <div className="flex flex-wrap gap-2">
          {isMultipleSelection && (
            <Badge variant="outline" style={{ borderColor: appliedTheme.primaryColor }}>
              Selecione {validation.minSelections || 1} a {validation.maxSelections || 3} opções
            </Badge>
          )}
          {validation.required && (
            <Badge variant="outline" className="text-red-600 border-red-200">
              Obrigatório
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Progress bar */}
        {showProgress && (
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-600">
              <span>Progresso</span>
              <span>{Math.round(progressValue)}%</span>
            </div>
            <Progress 
              value={progressValue} 
              className="h-2"
              style={{ backgroundColor: '#E5DDD5' }}
            />
          </div>
        )}

        {/* Options grid */}
        <div className={gridClass}>
          {questionData.options.map(option => renderOption(option))}
        </div>

        {/* Validation errors */}
        {validationErrors.length > 0 && mode !== 'editor' && (
          <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
            <div className="text-sm text-red-700">
              {validationErrors.map((error, index) => (
                <div key={index}>{error}</div>
              ))}
            </div>
          </div>
        )}

        {/* Action controls */}
        {selectedAnswers.length > 0 && mode !== 'editor' && (
          <div className="flex justify-between items-center pt-4 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="text-gray-600"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Limpar
            </Button>

            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600">{getSelectionInfo}</span>
              <Button 
                size="sm" 
                style={{ backgroundColor: appliedTheme.primaryColor }}
                disabled={validationErrors.length > 0}
              >
                Continuar
                <ArrowRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* Editor mode overlay */}
        {mode === 'editor' && (
          <div className="absolute inset-0 bg-black bg-opacity-5 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-sm font-medium text-gray-700">
                Quiz Question Block (Modular)
              </div>
              <div className="text-xs text-gray-500">
                {questionData.type} • Step {currentStep} • {stepType}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuizQuestionBlockModular;