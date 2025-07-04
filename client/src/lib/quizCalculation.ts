import type { 
  QuizResponse, 
  StyleScore, 
  QuizResult, 
  StyleType,
  StyleCalculationEngine 
} from '@/types/quiz';
import { getAllStyles } from '@/data/styles';
import { getNormalQuestions } from '@/data/caktoquizQuestions';

/**
 * Engine de cálculo de estilos para o CaktoQuiz REAL
 * Implementa a lógica exata:
 * - 10 questões normais com múltiplas seleções (até 3 por questão)
 * - 1 ponto por seleção de cada estilo
 * - Desempate pela primeira resposta empatada
 * - Percentuais baseados no total de seleções
 */
export class QuizCalculationEngine implements StyleCalculationEngine {
  
  /**
   * Calcula os scores de todos os estilos baseado nas respostas
   */
  calculateStyleScores(responses: QuizResponse[]): StyleScore[] {
    const normalQuestions = getNormalQuestions();
    
    // Filtrar apenas respostas de questões normais
    const normalResponses = responses.filter(response => {
      const question = normalQuestions.find(q => q.id === response.questionId);
      return question?.type === 'normal';
    });

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

    // Mapear ordem das respostas para desempate (por questão)
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

    let totalSelections = 0;

    // Processar cada resposta
    normalResponses.forEach((response, responseIndex) => {
      if (response.selectedStyles && response.selectedStyles.length > 0) {
        // Para múltiplas seleções
        response.selectedStyles.forEach((style, selectionIndex) => {
          stylePoints[style] += 1;
          totalSelections += 1;
          
          // Registrar ordem da primeira aparição para desempate
          const orderKey = responseIndex * 10 + selectionIndex; // Garante ordem cronológica
          if (responseOrder[style] === Infinity) {
            responseOrder[style] = orderKey;
          }
        });
      } else if (response.selectedStyle) {
        // Para seleção única (backward compatibility)
        const style = response.selectedStyle;
        stylePoints[style] += 1;
        totalSelections += 1;
        
        if (responseOrder[style] === Infinity) {
          responseOrder[style] = responseIndex;
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
      points,
      percentage: Math.round((points / totalSelections) * 100),
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
      .filter(score => score.points > 0) // Apenas estilos com pontuação
      .map(score => score.style);

    const normalQuestions = getNormalQuestions();

    return {
      id: crypto.randomUUID(),
      participantName,
      responses,
      styleScores,
      predominantStyle,
      complementaryStyles,
      totalNormalQuestions: normalQuestions.length,
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
   * Processa uma seleção múltipla de uma questão
   */
  processMultipleSelections(
    questionId: string, 
    selectedOptionIds: string[], 
    normalQuestions = getNormalQuestions()
  ): QuizResponse {
    const question = normalQuestions.find(q => q.id === questionId);
    
    if (!question) {
      return {
        questionId,
        selectedOptionIds,
        selectedStyles: [],
        timestamp: new Date()
      };
    }

    // Mapear opções selecionadas para estilos
    const selectedStyles: StyleType[] = [];
    
    selectedOptionIds.forEach(optionId => {
      const option = question.options.find(opt => opt.id === optionId);
      if (option && option.style) {
        selectedStyles.push(option.style);
      }
    });

    return {
      questionId,
      selectedOptionIds,
      selectedStyles,
      timestamp: new Date()
    };
  }

  /**
   * Valida se todas as questões normais foram respondidas
   */
  validateCompleteness(responses: QuizResponse[]): boolean {
    const normalQuestions = getNormalQuestions();
    const answeredQuestions = new Set(responses.map(r => r.questionId));
    
    return normalQuestions.every(q => answeredQuestions.has(q.id));
  }

  /**
   * Calcula score estratégico baseado nas questões de qualificação
   */
  calculateStrategicScore(responses: QuizResponse[]): number {
    const strategicResponses = responses.filter(response => 
      response.questionId.startsWith('s')
    );

    let totalScore = 0;
    
    strategicResponses.forEach(response => {
      // Para questões estratégicas, usar o weight da opção selecionada
      if (response.selectedOptionIds && response.selectedOptionIds.length > 0) {
        // Usar a primeira seleção para questões estratégicas
        const optionId = response.selectedOptionIds[0];
        
        // Extrair peso baseado no ID da opção (simplificado)
        // s1_a = 3, s1_b = 2, s1_c = 1, s1_d = 0
        const optionLetter = optionId.split('_')[1];
        const weights: Record<string, number> = { 'a': 3, 'b': 2, 'c': 1, 'd': 0, 'e': 2 };
        totalScore += weights[optionLetter] || 0;
      }
    });

    return totalScore;
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

export const processMultipleSelections = (
  questionId: string, 
  selectedOptionIds: string[]
): QuizResponse => {
  return quizCalculationEngine.processMultipleSelections(questionId, selectedOptionIds);
};

export const getStyleScores = (responses: QuizResponse[]): StyleScore[] => {
  return quizCalculationEngine.calculateStyleScores(responses);
};

export const calculateStrategicScore = (responses: QuizResponse[]): number => {
  return quizCalculationEngine.calculateStrategicScore(responses);
};
