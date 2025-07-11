
import { QuizQuestion, UserResponse, StyleResult, QuizResult, StyleType } from '@/types/quiz';

const STYLE_WEIGHTS: Record<StyleType, number> = {
  natural: 1,
  classico: 1,
  contemporaneo: 1,
  elegante: 1,
  romantico: 1,
  sensual: 1,
  dramatico: 1,
  criativo: 1
};

export const calculateStyleScores = (responses: UserResponse[], questions: QuizQuestion[]): Record<StyleType, number> => {
  const scores: Record<StyleType, number> = {
    natural: 0,
    classico: 0,
    contemporaneo: 0,
    elegante: 0,
    romantico: 0,
    sensual: 0,
    dramatico: 0,
    criativo: 0
  };

  responses.forEach((response) => {
    const question = questions.find(q => q.id === response.questionId);
    if (!question) return;

    // Handle different response formats
    const selectedOptionIds = response.selectedOptionIds || 
                              response.selectedOptions || 
                              (response.selectedOptionId ? [response.selectedOptionId] : []);

    selectedOptionIds.forEach(optionId => {
      const option = question.options.find(opt => opt.id === optionId);
      if (option?.points) {
        Object.entries(option.points).forEach(([style, points]) => {
          if (style in scores) {
            scores[style as StyleType] += points;
          }
        });
      }
    });

    // Handle legacy selectedStyles format
    if (response.selectedStyles) {
      response.selectedStyles.forEach((style: string, styleIndex: number) => {
        if (style in scores) {
          scores[style as StyleType] += STYLE_WEIGHTS[style as StyleType] || 1;
        }
      });
    }
  });

  return scores;
};

export const calculateResults = (responses: UserResponse[], questions: QuizQuestion[]): QuizResult => {
  const scores = calculateStyleScores(responses, questions);
  
  // Convert scores to results
  const totalPoints = Object.values(scores).reduce((sum, points) => sum + points, 0);
  
  const styleResults: StyleResult[] = Object.entries(scores)
    .map(([style, points], index) => ({
      style,
      category: style.charAt(0).toUpperCase() + style.slice(1),
      points,
      percentage: totalPoints > 0 ? Math.round((points / totalPoints) * 100) : 0,
      rank: index + 1,
      score: points
    }))
    .sort((a, b) => b.points - a.points)
    .map((result, index) => ({ ...result, rank: index + 1 }));

  const primaryStyle = styleResults[0];
  const secondaryStyles = styleResults.slice(1, 3);

  return {
    id: `result-${Date.now()}`,
    primaryStyle,
    secondaryStyles,
    responses,
    completedAt: new Date()
  };
};
