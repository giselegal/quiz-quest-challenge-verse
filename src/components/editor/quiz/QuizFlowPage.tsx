/**
 * QuizFlowPage.tsx - Main page that orchestrates the complete quiz flow
 * ✅ Modular architecture with reusable components
 * ✅ Three operation modes: editor, preview, production
 * ✅ Integration with quiz21StepsComplete.ts template
 */

import React, { useState, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { QUIZ_STYLE_21_STEPS_TEMPLATE } from '@/templates/quiz21StepsComplete';
import { QuizNavigationBlock } from './QuizNavigationBlock';
import { QuizStepRenderer } from './QuizStepRenderer';
import { QuizDataManager } from './QuizDataManager';
import { QuizValidationSystem } from './QuizValidationSystem';
import { QuizScoreCalculator } from './QuizScoreCalculator';

export type QuizMode = 'editor' | 'preview' | 'production';

export interface QuizFlowPageProps {
  mode?: QuizMode;
  template?: Record<string, any[]>;
  onBlocksChange?: (blocks: any[]) => void;
  customConfig?: {
    enableLivePreview?: boolean;
    enableValidation?: boolean;
    enableScoring?: boolean;
    theme?: {
      primaryColor?: string;
      backgroundColor?: string;
      textColor?: string;
    };
  };
  className?: string;
}

export interface QuizState {
  currentStep: number;
  totalSteps: number;
  userName: string;
  answers: Record<string, any>;
  scores: Record<string, number>;
  isCompleted: boolean;
  validationErrors: Record<string, string[]>;
}

export const QuizFlowPage: React.FC<QuizFlowPageProps> = ({
  mode = 'production',
  template = QUIZ_STYLE_21_STEPS_TEMPLATE,
  onBlocksChange,
  customConfig = {},
  className = '',
}) => {
  // Main quiz state
  const [quizState, setQuizState] = useState<QuizState>({
    currentStep: 1,
    totalSteps: 21,
    userName: '',
    answers: {},
    scores: {},
    isCompleted: false,
    validationErrors: {},
  });

  // Configuration with defaults
  const config = {
    enableLivePreview: true,
    enableValidation: true,
    enableScoring: true,
    theme: {
      primaryColor: '#B89B7A',
      backgroundColor: '#FEFEFE',
      textColor: '#432818',
    },
    ...customConfig,
  };

  // Update quiz state
  const updateQuizState = useCallback((updates: Partial<QuizState>) => {
    setQuizState(prev => ({ ...prev, ...updates }));
  }, []);

  // Handle navigation
  const handleNavigation = useCallback((direction: 'next' | 'prev' | 'jump', targetStep?: number) => {
    const { currentStep, totalSteps } = quizState;
    
    let newStep = currentStep;
    
    switch (direction) {
      case 'next':
        newStep = Math.min(currentStep + 1, totalSteps);
        break;
      case 'prev':
        newStep = Math.max(currentStep - 1, 1);
        break;
      case 'jump':
        if (targetStep && targetStep >= 1 && targetStep <= totalSteps) {
          newStep = targetStep;
        }
        break;
    }
    
    if (newStep !== currentStep) {
      updateQuizState({ currentStep: newStep });
    }
  }, [quizState, updateQuizState]);

  // Handle answer submission
  const handleAnswerSubmit = useCallback((stepId: string, answer: any) => {
    const newAnswers = {
      ...quizState.answers,
      [stepId]: answer,
    };
    
    updateQuizState({ answers: newAnswers });
    
    // Auto-advance if in production mode
    if (mode === 'production') {
      setTimeout(() => handleNavigation('next'), 500);
    }
  }, [quizState.answers, updateQuizState, handleNavigation, mode]);

  // Handle user name submission
  const handleUserNameSubmit = useCallback((name: string) => {
    updateQuizState({ userName: name.trim() });
    if (quizState.currentStep === 1) {
      handleNavigation('next');
    }
  }, [updateQuizState, quizState.currentStep, handleNavigation]);

  // Get current step data from template
  const getCurrentStepData = useCallback(() => {
    const stepKey = `step-${quizState.currentStep}`;
    return template[stepKey] || [];
  }, [template, quizState.currentStep]);

  // Handle blocks change (for editor mode)
  const handleBlocksChange = useCallback((blocks: any[]) => {
    if (onBlocksChange) {
      onBlocksChange(blocks);
    }
  }, [onBlocksChange]);

  // Apply theme styles
  const themeStyles = {
    '--quiz-primary-color': config.theme.primaryColor,
    '--quiz-background-color': config.theme.backgroundColor,
    '--quiz-text-color': config.theme.textColor,
  } as React.CSSProperties;

  return (
    <div 
      className={`quiz-flow-page ${className}`}
      style={themeStyles}
      data-mode={mode}
    >
      <Card className="max-w-6xl mx-auto">
        <CardContent className="p-0">
          {/* Navigation Component */}
          <QuizNavigationBlock
            mode={mode}
            currentStep={quizState.currentStep}
            totalSteps={quizState.totalSteps}
            onNavigation={handleNavigation}
            showDebugInfo={mode === 'editor'}
            theme={config.theme}
          />

          {/* Main Content Area */}
          <div className="min-h-[500px] p-6">
            {/* Step Renderer */}
            <QuizStepRenderer
              mode={mode}
              currentStep={quizState.currentStep}
              stepData={getCurrentStepData()}
              quizState={quizState}
              onAnswerSubmit={handleAnswerSubmit}
              onUserNameSubmit={handleUserNameSubmit}
              config={config}
            />
          </div>

          {/* Data Manager - Handles persistence and state management */}
          <QuizDataManager
            mode={mode}
            quizState={quizState}
            onStateUpdate={updateQuizState}
            enableAutoSave={mode !== 'editor'}
          />

          {/* Validation System - Real-time validation */}
          {config.enableValidation && (
            <QuizValidationSystem
              mode={mode}
              currentStep={quizState.currentStep}
              stepData={getCurrentStepData()}
              answers={quizState.answers}
              onValidationUpdate={(errors) => updateQuizState({ validationErrors: errors })}
            />
          )}

          {/* Score Calculator - Automatic scoring */}
          {config.enableScoring && (
            <QuizScoreCalculator
              mode={mode}
              answers={quizState.answers}
              onScoreUpdate={(scores) => updateQuizState({ scores })}
            />
          )}

          {/* Editor Mode Debug Panel */}
          {mode === 'editor' && (
            <div className="border-t border-gray-200 p-4 bg-gray-50">
              <div className="text-sm text-gray-600">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <strong>Mode:</strong> {mode}
                  </div>
                  <div>
                    <strong>Step:</strong> {quizState.currentStep}/{quizState.totalSteps}
                  </div>
                  <div>
                    <strong>Answers:</strong> {Object.keys(quizState.answers).length}
                  </div>
                  <div>
                    <strong>Scores:</strong> {Object.keys(quizState.scores).length}
                  </div>
                </div>
                <div className="mt-2">
                  <strong>Validation Errors:</strong> {JSON.stringify(quizState.validationErrors)}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizFlowPage;