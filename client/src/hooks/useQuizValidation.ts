import { useCallback, useMemo } from 'react';
import { useQuizConfig } from '@/hooks/useQuizConfig';

interface ValidationResult {
  isValid: boolean;
  errors: string[];
  optionMappings: Record<string, any>;
}

interface QuizValidationRules {
  optionId: string;
  points: Record<string, number>;
  validationRules?: {
    required?: boolean;
    maxSelections?: number;
    minSelections?: number;
  };
}

export const useQuizValidation = () => {
  const { quizConfig, quizQuestions } = useQuizConfig();

  // Valida se uma seleção de opção é válida baseada nas regras do quiz
  const validateOptionSelection = useCallback((
    blockId: string, 
    optionId: string, 
    selectedOptions: string[]
  ): ValidationResult => {
    console.log('🔍 Validando seleção:', { blockId, optionId, selectedOptions });

    const errors: string[] = [];
    
    // Buscar regras específicas para este bloco
    const blockConfig = localStorage.getItem('quiz-editor-config');
    if (blockConfig) {
      try {
        const config = JSON.parse(blockConfig);
        const question = config.questions?.find((q: any) => 
          q.id === blockId || q.id.includes(blockId)
        );

        if (question) {
          const option = question.options?.find((o: any) => o.id === optionId);
          
          if (option && option.points) {
            // Validação de pontuação
            const hasValidPoints = Object.keys(option.points).length > 0;
            if (!hasValidPoints) {
              errors.push(`Opção ${optionId} não tem pontuação definida`);
            }

            // Validação de seleção múltipla
            if (question.type === 'single' && selectedOptions.length > 1) {
              errors.push('Questão permite apenas uma seleção');
            }

            console.log('✅ Validação OK:', { 
              option: option.text, 
              points: option.points,
              isValid: errors.length === 0 
            });
          } else {
            errors.push(`Opção ${optionId} não encontrada ou sem configuração`);
          }
        } else {
          console.log('⚠️ Questão não encontrada para bloco:', blockId);
        }
      } catch (error) {
        console.error('❌ Erro ao validar:', error);
        errors.push('Erro ao carregar configurações do quiz');
      }
    } else {
      console.log('⚠️ Nenhuma configuração de quiz encontrada');
      errors.push('Configure o quiz na aba Quiz primeiro');
    }

    return {
      isValid: errors.length === 0,
      errors,
      optionMappings: {}
    };
  }, []);

  // Calcula pontuação baseada nas seleções
  const calculateScore = useCallback((
    selections: Record<string, string[]>
  ): Record<string, number> => {
    const scores: Record<string, number> = {};
    
    try {
      const blockConfig = localStorage.getItem('quiz-editor-config');
      if (!blockConfig) return scores;

      const config = JSON.parse(blockConfig);
      
      Object.entries(selections).forEach(([blockId, selectedOptions]) => {
        const question = config.questions?.find((q: any) => 
          q.id === blockId || q.id.includes(blockId)
        );

        if (question) {
          selectedOptions.forEach(optionId => {
            const option = question.options?.find((o: any) => o.id === optionId);
            if (option && option.points) {
              Object.entries(option.points).forEach(([category, points]) => {
                scores[category] = (scores[category] || 0) + (points as number);
              });
            }
          });
        }
      });

      console.log('📊 Pontuação calculada:', scores);
    } catch (error) {
      console.error('❌ Erro ao calcular pontuação:', error);
    }

    return scores;
  }, []);

  // Verifica se o quiz está configurado
  const isQuizConfigured = useMemo(() => {
    const config = localStorage.getItem('quiz-editor-config');
    if (!config) return false;
    
    try {
      const parsed = JSON.parse(config);
      return parsed.questions?.length > 0 && parsed.results?.length > 0;
    } catch {
      return false;
    }
  }, []);

  // Obter regras de validação para um bloco específico
  const getValidationRulesForBlock = useCallback((blockId: string): QuizValidationRules[] => {
    try {
      const blockConfig = localStorage.getItem('quiz-editor-config');
      if (!blockConfig) return [];

      const config = JSON.parse(blockConfig);
      const question = config.questions?.find((q: any) => 
        q.id === blockId || q.id.includes(blockId)
      );

      if (question && question.options) {
        return question.options.map((option: any) => ({
          optionId: option.id,
          points: option.points || {},
          validationRules: {
            required: false,
            maxSelections: question.type === 'single' ? 1 : undefined,
            minSelections: 1
          }
        }));
      }
    } catch (error) {
      console.error('❌ Erro ao obter regras:', error);
    }

    return [];
  }, []);

  return {
    validateOptionSelection,
    calculateScore,
    isQuizConfigured,
    getValidationRulesForBlock,
    quizConfig,
    quizQuestions
  };
};
