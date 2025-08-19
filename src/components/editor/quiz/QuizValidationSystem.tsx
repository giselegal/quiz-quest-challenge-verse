/**
 * QuizValidationSystem.tsx - Real-time Validation Component
 * ✅ Real-time validation for quiz responses
 * ✅ Step-specific validation rules
 * ✅ Mode-aware validation behavior
 */

import React, { useEffect, useCallback, useState } from 'react';
import { QuizMode } from './QuizFlowPage';

export interface ValidationRule {
  field: string;
  type: 'required' | 'minLength' | 'maxLength' | 'minSelections' | 'maxSelections' | 'custom';
  value?: any;
  message: string;
  validator?: (value: any, context: any) => boolean;
}

export interface StepValidationConfig {
  stepNumber: number;
  stepType: string;
  rules: ValidationRule[];
  required: boolean;
}

export interface QuizValidationSystemProps {
  mode: QuizMode;
  currentStep: number;
  stepData: any[];
  answers: Record<string, any>;
  onValidationUpdate: (errors: Record<string, string[]>) => void;
  customValidationRules?: StepValidationConfig[];
  enableRealTimeValidation?: boolean;
}

export const QuizValidationSystem: React.FC<QuizValidationSystemProps> = ({
  mode,
  currentStep,
  stepData,
  answers,
  onValidationUpdate,
  customValidationRules = [],
  enableRealTimeValidation = true,
}) => {
  const [validationState, setValidationState] = useState<{
    errors: Record<string, string[]>;
    warnings: Record<string, string[]>;
    isValid: boolean;
  }>({
    errors: {},
    warnings: {},
    isValid: true,
  });

  // Define default validation rules based on step type
  const getDefaultValidationRules = useCallback((step: number): StepValidationConfig => {
    const stepType = getStepType(step);
    
    switch (stepType) {
      case 'name-input':
        return {
          stepNumber: step,
          stepType,
          required: true,
          rules: [
            {
              field: 'userName',
              type: 'required',
              message: 'Nome é obrigatório',
            },
            {
              field: 'userName',
              type: 'minLength',
              value: 2,
              message: 'Nome deve ter pelo menos 2 caracteres',
            },
          ],
        };

      case 'scoring-question':
        return {
          stepNumber: step,
          stepType,
          required: true,
          rules: [
            {
              field: `step-${step}`,
              type: 'minSelections',
              value: 1,
              message: 'Selecione pelo menos 1 opção',
            },
            {
              field: `step-${step}`,
              type: 'maxSelections',
              value: 3,
              message: 'Selecione no máximo 3 opções',
            },
          ],
        };

      case 'strategic-question':
        return {
          stepNumber: step,
          stepType,
          required: true,
          rules: [
            {
              field: `step-${step}`,
              type: 'minSelections',
              value: 1,
              message: 'Selecione 1 opção',
            },
            {
              field: `step-${step}`,
              type: 'maxSelections',
              value: 1,
              message: 'Selecione apenas 1 opção',
            },
          ],
        };

      default:
        return {
          stepNumber: step,
          stepType,
          required: false,
          rules: [],
        };
    }
  }, []);

  // Helper function to determine step type
  const getStepType = (step: number): string => {
    if (step === 1) return 'name-input';
    if (step >= 2 && step <= 11) return 'scoring-question';
    if (step === 12) return 'transition';
    if (step >= 13 && step <= 18) return 'strategic-question';
    if (step === 19) return 'processing';
    if (step === 20) return 'results';
    if (step === 21) return 'offer';
    return 'unknown';
  };

  // Get validation config for current step
  const getCurrentValidationConfig = useCallback((): StepValidationConfig => {
    // Check for custom rules first
    const customRule = customValidationRules.find(rule => rule.stepNumber === currentStep);
    if (customRule) {
      return customRule;
    }

    // Fallback to default rules
    return getDefaultValidationRules(currentStep);
  }, [currentStep, customValidationRules, getDefaultValidationRules]);

  // Validate a single rule
  const validateRule = useCallback((rule: ValidationRule, value: any, context: any): string | null => {
    switch (rule.type) {
      case 'required':
        if (!value || (Array.isArray(value) && value.length === 0)) {
          return rule.message;
        }
        break;

      case 'minLength':
        if (typeof value === 'string' && value.length < rule.value) {
          return rule.message;
        }
        break;

      case 'maxLength':
        if (typeof value === 'string' && value.length > rule.value) {
          return rule.message;
        }
        break;

      case 'minSelections':
        if (Array.isArray(value) && value.length < rule.value) {
          return rule.message;
        }
        break;

      case 'maxSelections':
        if (Array.isArray(value) && value.length > rule.value) {
          return rule.message;
        }
        break;

      case 'custom':
        if (rule.validator && !rule.validator(value, context)) {
          return rule.message;
        }
        break;
    }

    return null;
  }, []);

  // Validate current step
  const validateCurrentStep = useCallback(() => {
    const config = getCurrentValidationConfig();
    const errors: Record<string, string[]> = {};
    const warnings: Record<string, string[]> = {};

    config.rules.forEach(rule => {
      let value: any;

      // Get value based on field name
      if (rule.field === 'userName') {
        value = answers.userName;
      } else {
        value = answers[rule.field];
      }

      const error = validateRule(rule, value, { currentStep, answers, stepData });
      
      if (error) {
        if (!errors[rule.field]) {
          errors[rule.field] = [];
        }
        errors[rule.field].push(error);
      }
    });

    // Additional step-specific validations
    const stepValidations = validateStepSpecific(currentStep, answers);
    Object.keys(stepValidations.errors).forEach(field => {
      errors[field] = [...(errors[field] || []), ...stepValidations.errors[field]];
    });

    Object.keys(stepValidations.warnings).forEach(field => {
      warnings[field] = [...(warnings[field] || []), ...stepValidations.warnings[field]];
    });

    const isValid = Object.keys(errors).length === 0;

    setValidationState({
      errors,
      warnings,
      isValid,
    });

    // Notify parent component
    onValidationUpdate(errors);

    return { isValid, errors, warnings };
  }, [getCurrentValidationConfig, answers, currentStep, stepData, validateRule, onValidationUpdate]);

  // Step-specific validation logic
  const validateStepSpecific = useCallback((step: number, stepAnswers: Record<string, any>) => {
    const errors: Record<string, string[]> = {};
    const warnings: Record<string, string[]> = {};

    // Example: Check for conflicting selections in scoring questions
    if (step >= 2 && step <= 11) {
      const currentStepAnswers = stepAnswers[`step-${step}`];
      if (Array.isArray(currentStepAnswers) && currentStepAnswers.length > 0) {
        // Check for style conflicts (custom logic)
        const styleCategories = currentStepAnswers.map((answer: any) => answer.styleCategory).filter(Boolean);
        const uniqueStyles = new Set(styleCategories);
        
        if (styleCategories.length > uniqueStyles.size) {
          warnings[`step-${step}`] = warnings[`step-${step}`] || [];
          warnings[`step-${step}`].push('Você selecionou opções de estilos similares');
        }
      }
    }

    return { errors, warnings };
  }, []);

  // Run validation when answers or step changes
  useEffect(() => {
    if (enableRealTimeValidation && mode !== 'editor') {
      validateCurrentStep();
    }
  }, [answers, currentStep, enableRealTimeValidation, mode, validateCurrentStep]);

  // Validation summary for current step
  const getValidationSummary = useCallback(() => {
    const config = getCurrentValidationConfig();
    return {
      stepNumber: currentStep,
      stepType: config.stepType,
      isRequired: config.required,
      isValid: validationState.isValid,
      errors: validationState.errors,
      warnings: validationState.warnings,
      totalErrors: Object.values(validationState.errors).flat().length,
      totalWarnings: Object.values(validationState.warnings).flat().length,
    };
  }, [currentStep, getCurrentValidationConfig, validationState]);

  // Export validation functions for external use
  const validationAPI = {
    validateStep: validateCurrentStep,
    getValidationSummary,
    isStepValid: () => validationState.isValid,
    getErrors: () => validationState.errors,
    getWarnings: () => validationState.warnings,
    clearValidation: () => {
      setValidationState({
        errors: {},
        warnings: {},
        isValid: true,
      });
      onValidationUpdate({});
    },
  };

  // Attach validation API to window for debugging (editor mode)
  if (mode === 'editor' && typeof window !== 'undefined') {
    (window as any).quizValidation = validationAPI;
  }

  // This component doesn't render anything visible
  return null;
};

export default QuizValidationSystem;