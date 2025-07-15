import type { 
  QuizResponse, 
  StyleScore, 
  QuizResult, 
  StyleType,
  QuizQuestion 
} from '@/types/quiz';
import { getAllStyles } from '@/data/styles';

/**
 * Engine de cálculo atualizado para o CaktoQuiz com múltiplas seleções
 * Implementa a lógica exata: 3 seleções obrigatórias por questão normal
 */
export class CaktoQuizCalculationEngine {
  
  /**
   * Processa respostas de múltipla escolha (3 seleções por questão normal)
   */
  processMultipleResponses(
    questionId: string, 
    selectedOptionIds: string[],
    selectedStyles: StyleType[]
  ): QuizResponse {
    return {
      questionId,
      selectedOptionIds,
      selectedStyles,
      timestamp: new Date()
    };
  }

  /**
   * Calcula scores considerando múltiplas seleções por questão
   */
  calculateStyleScores(responses: QuizResponse[]): StyleScore[] {
    // Filtrar apenas respostas de questões normais (que têm styles)
    const normalResponses = responses.filter(response => 
      response.selectedStyles && response.selectedStyles.length > 0
    );

    if (normalResponses.length === 0) {
      return this.getEmptyStyleScores();
    }

    // Contar pontos por estilo
    const stylePoints: Record<StyleType, number> = {
      classico: 0,
      romantico: 0,
      dramatico: 0,
      natural: 0,
      criativo: 0,
      elegante: 0,
      sensual: 0,
      contemporaneo: 0
    };

    // Mapear ordem das respostas para desempate (primeira aparição de cada estilo)
    const firstAppearance: Record<StyleType, number> = {
      classico: Infinity,
      romantico: Infinity,
      dramatico: Infinity,
      natural: Infinity,
      criativo: Infinity,
      elegante: Infinity,
      sensual: Infinity,
      contemporaneo: Infinity
    };

    // Processar todas as respostas normais
    normalResponses.forEach((response, responseIndex) => {
      if (response.selectedStyles) {
        response.selectedStyles.forEach((style, styleIndex) => {
          // Cada seleção = 1 ponto
          stylePoints[style] += 1;
          
          // Registrar primeira aparição para desempate
          const globalIndex = responseIndex * 10 + styleIndex; // Ordem global
          if (firstAppearance[style] === Infinity) {
            firstAppearance[style] = globalIndex;
          }
        });
      }
    });

    // Calcular total de pontos para percentuais
    const totalPoints = Object.values(stylePoints).reduce((sum, points) => sum + points, 0);

    // Converter para StyleScore array
    const styleScores: StyleScore[] = Object.entries(stylePoints).map(([style, points]) => ({
      style: style as StyleType,
      points,
      percentage: totalPoints > 0 ? Math.round((points / totalPoints) * 100) : 0,
      rank: 0 // Será calculado abaixo
    }));

    // Ordenar por pontos (desc) e depois por primeira aparição (asc) para desempate
    styleScores.sort((a, b) => {
      if (b.points !== a.points) {
        return b.points - a.points; // Mais pontos primeiro
      }
      // Em caso de empate, primeira aparição vence
      return firstAppearance[a.style] - firstAppearance[b.style];
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
  calculateResult(
    responses: QuizResponse[], 
    participantName: string
  ): QuizResult {
    const styleScores = this.calculateStyleScores(responses);
    const predominantStyle = styleScores[0]?.style || 'classico';
    
    // Estilos complementares: 2º e 3º lugar
    const complementaryStyles = styleScores
      .slice(1, 3)
      .map(score => score.style);

    const normalResponses = responses.filter(response => 
      response.selectedStyles && response.selectedStyles.length > 0
    );

    return {
      id: crypto.randomUUID?.() ?? Math.random().toString(36),
      participantName,
      responses,
      styleScores,
      predominantStyle,
      complementaryStyles,
      totalNormalQuestions: normalResponses.length,
      calculatedAt: new Date()
    };
  }

  /**
   * Valida se uma questão normal foi respondida corretamente (3 seleções)
   */
  validateNormalQuestion(response: QuizResponse): boolean {
    return response.selectedStyles ? response.selectedStyles.length === 3 : false;
  }

  /**
   * Valida se uma questão estratégica foi respondida (1 seleção)
   */
  validateStrategicQuestion(response: QuizResponse): boolean {
    return response.selectedOptionIds ? response.selectedOptionIds.length === 1 : false;
  }

  /**
   * Valida se todas as questões normais foram respondidas corretamente
   */
  validateAllNormalQuestions(responses: QuizResponse[], totalNormalQuestions: number): boolean {
    const validNormalResponses = responses.filter(response => 
      this.validateNormalQuestion(response)
    );
    return validNormalResponses.length === totalNormalQuestions;
  }

  /**
   * Retorna scores vazios para inicialização
   */
  private getEmptyStyleScores(): StyleScore[] {
    const allStyles = getAllStyles();
    return allStyles.map((style, index) => ({
      style: style.id,
      points: 0,
      percentage: 0,
      rank: index + 1
    }));
  }
}

// Instância singleton para uso global
export const caktoQuizEngine = new CaktoQuizCalculationEngine();

// Helper functions para uso direto
export const calculateCaktoQuizResult = (
  responses: QuizResponse[], 
  participantName: string
): QuizResult => {
  return caktoQuizEngine.calculateResult(responses, participantName);
};

export const processMultipleSelections = (
  questionId: string, 
  selectedOptionIds: string[],
  selectedStyles: StyleType[]
): QuizResponse => {
  return caktoQuizEngine.processMultipleResponses(questionId, selectedOptionIds, selectedStyles);
};

export const validateQuestionResponse = (
  response: QuizResponse,
  isNormalQuestion: boolean
): boolean => {
  return isNormalQuestion 
    ? caktoQuizEngine.validateNormalQuestion(response)
    : caktoQuizEngine.validateStrategicQuestion(response);
};
