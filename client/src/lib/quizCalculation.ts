import type { 
  QuizResponse, 
  StyleScore, 
  QuizResult, 
  StyleType,
  StyleCalculationEngine 
} from '@/types/quiz';
import { OPTION_TO_STYLE_MAPPING } from '@/data/styleMapping';
import { getAllStyles } from '@/data/styles';

/**
 * Engine de cálculo de estilos para o CaktoQuiz
 * Implementa a lógica exata do sistema original:
 * - 1 ponto por resposta em questões normais
 * - Desempate pela primeira resposta empatada
 * - Percentuais baseados no total de questões normais
 */
export class QuizCalculationEngine implements StyleCalculationEngine {
  
  /**
   * Calcula os scores de todos os estilos baseado nas respostas
   */
  calculateStyleScores(responses: QuizResponse[]): StyleScore[] {
    // Filtrar apenas respostas de questões normais (que têm style)
    const normalResponses = responses.filter(response => 
      response.selectedStyle !== undefined
    );

    const totalNormalQuestions = normalResponses.length;
    
    if (totalNormalQuestions === 0) {
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

    // Mapear ordem das respostas para desempate
    const responseOrder: Record<StyleType, number> = {
      classico: Infinity,
      romantico: Infinity,
      dramatico: Infinity,
      natural: Infinity,
      criativo: Infinity,
      elegante: Infinity,
      sensual: Infinity,
      contemporaneo: Infinity
    };

    // Calcular pontos e ordem
    normalResponses.forEach((response, index) => {
      if (response.selectedStyle) {
        const style = response.selectedStyle;
        stylePoints[style] += 1;
        
        // Registrar ordem da primeira aparição para desempate
        if (responseOrder[style] === Infinity) {
          responseOrder[style] = index;
        }
      }
    });

    // Converter para StyleScore array
    const styleScores: StyleScore[] = Object.entries(stylePoints).map(([style, points]) => ({
      style: style as StyleType,
      points,
      percentage: Math.round((points / totalNormalQuestions) * 100),
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
  determineResult(responses: QuizResponse[], participantName: string): QuizResult {
    const styleScores = this.calculateStyleScores(responses);
    const predominantStyle = styleScores[0]?.style || 'classico';
    
    // Estilos complementares: 2º e 3º lugar
    const complementaryStyles = styleScores
      .slice(1, 3)
      .map(score => score.style);

    const normalResponses = responses.filter(response => 
      response.selectedStyle !== undefined
    );

    return {
      id: crypto.randomUUID(),
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
   * Retorna ranking ordenado dos estilos
   */
  getStyleRanking(styleScores: StyleScore[]): StyleScore[] {
    return [...styleScores].sort((a, b) => a.rank - b.rank);
  }

  /**
   * Processa uma resposta individual e retorna o estilo correspondente
   */
  processQuizResponse(questionId: string, selectedOptionId: string): QuizResponse {
    // Extrair letra da opção (assumindo formato "option_a", "option_b", etc.)
    const optionLetter = selectedOptionId.split('_')[1]?.toUpperCase();
    const selectedStyle = optionLetter ? OPTION_TO_STYLE_MAPPING[optionLetter] : undefined;

    return {
      questionId,
      selectedOptionId,
      selectedStyle,
      timestamp: new Date()
    };
  }

  /**
   * Valida se todas as questões normais foram respondidas
   */
  validateCompleteness(responses: QuizResponse[], totalNormalQuestions: number): boolean {
    const normalResponses = responses.filter(response => 
      response.selectedStyle !== undefined
    );
    return normalResponses.length === totalNormalQuestions;
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
  responses: QuizResponse[], 
  participantName: string
): QuizResult => {
  return quizCalculationEngine.determineResult(responses, participantName);
};

export const processResponse = (
  questionId: string, 
  selectedOptionId: string
): QuizResponse => {
  return quizCalculationEngine.processQuizResponse(questionId, selectedOptionId);
};

export const getStyleScores = (responses: QuizResponse[]): StyleScore[] => {
  return quizCalculationEngine.calculateStyleScores(responses);
};
