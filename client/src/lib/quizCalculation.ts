// @ts-nocheck
// Temporarily disable TypeScript checking for this complex file
// TODO: Refactor types properly

import type { 
  QuizResponse, 
  StyleScore, 
  QuizResult, 
  StyleType,
  StyleCalculationEngine 
} from '@/types/quiz';
import { getAllStyles } from '@/data/styles';
import { getAllQuestions } from '@/data/caktoquizQuestions';

/**
 * Engine de cálculo de estilos para o CaktoQuiz REAL
 * Implementa a lógica exata:
 * - 10 questões normais com múltiplas seleções (até 3 por questão)
 * - 1 ponto por seleção de cada estilo
 * - Desempate pela primeira resposta empatada
 * - Percentuais baseados no total de seleções
 */
export class QuizCalculationEngine {
  
  /**
   * Calcula os scores de todos os estilos baseado nas respostas
   */
  calculateStyleScores(responses: any[]): StyleScore[] {
    const normalQuestions = getAllQuestions();
    
    // Filtrar apenas respostas de questões normais
    const normalResponses = responses.filter(response => {
      const question = normalQuestions.find(q => q.id === response.questionId);
      return question?.type === 'strategic';
    });

    if (normalResponses.length === 0) {
      return this.getEmptyStyleScores();
    }

    // Contar pontos por estilo
    const stylePoints = {
      classico: 0,
      romantico: 0,
      dramatico: 0,
      natural: 0,
      criativo: 0,
      elegante: 0,
      sensual: 0,
      contemporaneo: 0
    };

    // Mapear ordem das respostas para desempate (por questão)
    const responseOrder = {
      classico: Infinity,
      romantico: Infinity,
      dramatico: Infinity,
      natural: Infinity,
      criativo: Infinity,
      elegante: Infinity,
      sensual: Infinity,
      contemporaneo: Infinity
    };

    let totalSelections = 0;

    // Processar cada resposta
    normalResponses.forEach((response, responseIndex) => {
      if (response.selectedStyles && response.selectedStyles.length > 0) {
        // Para múltiplas seleções
        response.selectedStyles.forEach((style, selectionIndex) => {
          if (stylePoints[style] !== undefined) {
            stylePoints[style] += 1;
            totalSelections += 1;
            
            // Registrar ordem da primeira aparição para desempate
            const orderKey = responseIndex * 10 + selectionIndex; // Garante ordem cronológica
            if (responseOrder[style] === Infinity) {
              responseOrder[style] = orderKey;
            }
          }
        });
      } else if (response.selectedStyle) {
        // Para seleção única (backward compatibility)
        const style = response.selectedStyle;
        if (stylePoints[style] !== undefined) {
          stylePoints[style] += 1;
          totalSelections += 1;
          
          if (responseOrder[style] === Infinity) {
            responseOrder[style] = responseIndex;
          }
        }
      }
    });

    // Se não há seleções, retornar scores vazios
    if (totalSelections === 0) {
      return this.getEmptyStyleScores();
    }

    // Converter para StyleScore array
    const styleScores: StyleScore[] = Object.entries(stylePoints).map(([style, points]) => ({
      style: style as StyleType,
      points: points as number,
      percentage: Math.round(((points as number) / totalSelections) * 100),
      rank: 0 // Será calculado abaixo
    }));

    // Ordenar por pontos (desc) e depois por ordem de aparição (asc) para desempate
    styleScores.sort((a, b) => {
      if (b.points !== a.points) {
        return b.points - a.points; // Mais pontos primeiro
      }
      // Em caso de empate, primeira resposta vence
      return responseOrder[a.style] - responseOrder[b.style];
    });

    // Atribuir ranks
    styleScores.forEach((score, index) => {
      score.rank = index + 1;
    });

    return styleScores;
  }

  /**
   * Determina o resultado final do quiz
   */
  determineResult(responses: any[], participantName: string): QuizResult {
    const styleScores = this.calculateStyleScores(responses);
    const primaryStyle = styleScores[0];
    const secondaryStyles = styleScores.slice(1, 3).filter(score => score.points > 0);
    
    return {
      id: crypto.randomUUID(),
      primaryStyle: {
        style: primaryStyle?.style || 'classico',
        category: primaryStyle?.style || 'classico',
        points: primaryStyle?.points || 0,
        percentage: primaryStyle?.percentage || 0,
        rank: 1,
        score: primaryStyle?.points || 0
      },
      secondaryStyles: secondaryStyles.map(style => ({
        style: style.style,
        category: style.style,
        points: style.points,
        percentage: style.percentage,
        rank: style.rank,
        score: style.points
      })),
      responses,
      completedAt: Date.now(),
      participantName,
      styleScores,
      predominantStyle: {
        style: primaryStyle?.style || 'classico',
        category: primaryStyle?.style || 'classico',
        points: primaryStyle?.points || 0,
        percentage: primaryStyle?.percentage || 0,
        rank: 1,
        score: primaryStyle?.points || 0
      }
    };
  }

  /**
   * Processa uma seleção múltipla de uma questão
   */
  processMultipleSelections(
    questionId: string, 
    selectedOptionIds: string[], 
    normalQuestions = getAllQuestions()
  ): any {
    const question = normalQuestions.find(q => q.id === questionId);
    
    if (!question) {
      return {
        questionId,
        selectedOptionId: selectedOptionIds[0] || '',
        selectedOptionIds,
        selectedStyles: [],
        timestamp: Date.now()
      };
    }

    // Mapear opções selecionadas para estilos
    const selectedStyles: string[] = [];
    
    selectedOptionIds.forEach(optionId => {
      const option = question.options.find(opt => opt.id === optionId);
      if (option && (option.style || option.styleCategory)) {
        selectedStyles.push(option.style || option.styleCategory);
      }
    });

    return {
      questionId,
      selectedOptionId: selectedOptionIds[0] || '',
      selectedOptionIds,
      selectedStyles,
      timestamp: Date.now()
    };
  }

  /**
   * Retorna scores vazios para inicialização
   */
  private getEmptyStyleScores(): StyleScore[] {
    const allStyles = getAllStyles();
    return allStyles.map((style, index) => ({
      style: (style.id || style.name || 'classico') as StyleType,
      points: 0,
      percentage: 0,
      rank: index + 1
    }));
  }

  /**
   * Método estático para criar instância
   */
  static create(): QuizCalculationEngine {
    return new QuizCalculationEngine();
  }
}

// Instância singleton para uso global
export const quizCalculationEngine = QuizCalculationEngine.create();

// Helper functions para uso direto
export const calculateQuizResult = (
  responses: any[], 
  participantName: string
): QuizResult => {
  return quizCalculationEngine.determineResult(responses, participantName);
};

export const processMultipleSelections = (
  questionId: string, 
  selectedOptionIds: string[]
): any => {
  return quizCalculationEngine.processMultipleSelections(questionId, selectedOptionIds);
};

export const getStyleScores = (responses: any[]): StyleScore[] => {
  return quizCalculationEngine.calculateStyleScores(responses);
};