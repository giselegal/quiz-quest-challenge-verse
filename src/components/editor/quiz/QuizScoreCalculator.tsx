/**
 * QuizScoreCalculator.tsx - Automatic Score Calculation Component
 * ✅ Real-time score calculation
 * ✅ Multiple scoring algorithms
 * ✅ Style category scoring for fashion quiz
 */

import React, { useEffect, useCallback, useState } from 'react';
import { QuizMode } from './QuizFlowPage';

export interface ScoreConfig {
  styleCategories: string[];
  scoringMethod: 'weighted' | 'simple' | 'percentage';
  enableRealTimeCalculation: boolean;
  minimumAnswersForScore: number;
}

export interface StyleScore {
  category: string;
  score: number;
  percentage: number;
  rank: number;
  answers: any[];
}

export interface QuizScoreCalculatorProps {
  mode: QuizMode;
  answers: Record<string, any>;
  onScoreUpdate: (scores: Record<string, number>) => void;
  scoreConfig?: Partial<ScoreConfig>;
  customScoringRules?: Record<string, any>;
  enableDebugMode?: boolean;
}

export const QuizScoreCalculator: React.FC<QuizScoreCalculatorProps> = ({
  mode,
  answers,
  onScoreUpdate,
  scoreConfig = {},
  customScoringRules = {},
  enableDebugMode = false,
}) => {
  const [scoreState, setScoreState] = useState<{
    scores: Record<string, number>;
    styleScores: StyleScore[];
    totalAnswers: number;
    calculationMethod: string;
    lastCalculated: Date | null;
  }>({
    scores: {},
    styleScores: [],
    totalAnswers: 0,
    calculationMethod: 'weighted',
    lastCalculated: null,
  });

  // Default score configuration
  const defaultConfig: ScoreConfig = {
    styleCategories: [
      'natural',
      'classico',
      'contemporaneo',
      'elegante',
      'romantico',
      'sexy',
      'dramatico',
      'criativo'
    ],
    scoringMethod: 'weighted',
    enableRealTimeCalculation: true,
    minimumAnswersForScore: 1,
  };

  const config = { ...defaultConfig, ...scoreConfig };

  // Extract style categories from answers
  const extractStyleAnswers = useCallback(() => {
    const styleAnswers: Record<string, any[]> = {};
    
    // Initialize categories
    config.styleCategories.forEach(category => {
      styleAnswers[category] = [];
    });

    // Process scoring questions (steps 2-11)
    for (let step = 2; step <= 11; step++) {
      const stepKey = `step-${step}`;
      const stepAnswers = answers[stepKey];
      
      if (Array.isArray(stepAnswers)) {
        stepAnswers.forEach(answer => {
          if (answer && answer.styleCategory) {
            const category = answer.styleCategory.toLowerCase();
            if (styleAnswers[category]) {
              styleAnswers[category].push({
                ...answer,
                step,
                points: answer.points || 1,
              });
            }
          }
        });
      }
    }

    return styleAnswers;
  }, [answers, config.styleCategories]);

  // Calculate scores using different methods
  const calculateScores = useCallback(() => {
    const styleAnswers = extractStyleAnswers();
    const scores: Record<string, number> = {};
    const styleScores: StyleScore[] = [];
    let totalPoints = 0;

    // Calculate raw scores for each category
    config.styleCategories.forEach(category => {
      const categoryAnswers = styleAnswers[category] || [];
      let categoryScore = 0;

      switch (config.scoringMethod) {
        case 'simple':
          // Simple count of selections
          categoryScore = categoryAnswers.length;
          break;

        case 'weighted':
          // Weighted by points and answer quality
          categoryScore = categoryAnswers.reduce((sum, answer) => {
            const basePoints = answer.points || 1;
            const stepWeight = getStepWeight(answer.step);
            return sum + (basePoints * stepWeight);
          }, 0);
          break;

        case 'percentage':
          // Percentage based on total possible points
          const maxPossiblePoints = 10 * 3; // 10 questions * max 3 selections
          categoryScore = (categoryAnswers.length / maxPossiblePoints) * 100;
          break;
      }

      scores[category] = Math.round(categoryScore * 100) / 100; // Round to 2 decimals
      totalPoints += categoryScore;
    });

    // Calculate percentages and ranks
    config.styleCategories.forEach((category, index) => {
      const score = scores[category] || 0;
      const percentage = totalPoints > 0 ? Math.round((score / totalPoints) * 100) : 0;
      
      styleScores.push({
        category,
        score,
        percentage,
        rank: index + 1, // Will be sorted later
        answers: styleAnswers[category] || [],
      });
    });

    // Sort by score to determine ranks
    styleScores.sort((a, b) => b.score - a.score);
    styleScores.forEach((styleScore, index) => {
      styleScore.rank = index + 1;
    });

    return { scores, styleScores, totalPoints };
  }, [extractStyleAnswers, config]);

  // Get weight for different steps (some questions might be more important)
  const getStepWeight = useCallback((step: number): number => {
    // Custom weight rules
    if (customScoringRules.stepWeights && customScoringRules.stepWeights[step]) {
      return customScoringRules.stepWeights[step];
    }

    // Default weights
    if (step >= 2 && step <= 6) return 1.2; // Early questions slightly more weighted
    if (step >= 7 && step <= 11) return 1.0; // Standard weight
    return 1.0;
  }, [customScoringRules]);

  // Calculate strategic question insights
  const calculateStrategicInsights = useCallback(() => {
    const insights: Record<string, any> = {};

    // Process strategic questions (steps 13-18)
    for (let step = 13; step <= 18; step++) {
      const stepKey = `step-${step}`;
      const answer = answers[stepKey];
      
      if (answer) {
        const questionType = getStrategicQuestionType(step);
        insights[questionType] = answer;
      }
    }

    return insights;
  }, [answers]);

  // Get strategic question type
  const getStrategicQuestionType = (step: number): string => {
    const questionTypes: Record<number, string> = {
      13: 'lifestyle',
      14: 'occasions',
      15: 'budget',
      16: 'priorities',
      17: 'challenges',
      18: 'objectives',
    };

    return questionTypes[step] || `strategic-${step}`;
  };

  // Main calculation function
  const performCalculation = useCallback(() => {
    const totalAnswers = Object.keys(answers).length;
    
    // Check if we have minimum answers required
    if (totalAnswers < config.minimumAnswersForScore) {
      return;
    }

    const { scores, styleScores, totalPoints } = calculateScores();
    const strategicInsights = calculateStrategicInsights();

    // Combine all scores (only numeric values)
    const combinedScores: Record<string, number> = {
      ...scores,
      totalScore: totalPoints,
    };

    // Additional non-numeric metadata
    const metadata = {
      dominantStyle: styleScores[0]?.category || '',
      secondaryStyle: styleScores[1]?.category || '',
      ...strategicInsights,
    };

    // Update state
    setScoreState({
      scores: {
        ...combinedScores,
        dominantStyle: 0, // Store as number for consistency
        secondaryStyle: 0, // Store as number for consistency
        ...Object.fromEntries(
          Object.entries(metadata).map(([key, value]) => [
            key, 
            typeof value === 'string' ? 0 : value // Convert strings to 0 for numeric scoring
          ])
        )
      },
      styleScores,
      totalAnswers,
      calculationMethod: config.scoringMethod,
      lastCalculated: new Date(),
    });

    // Notify parent (only numeric scores)
    onScoreUpdate(combinedScores);

    if (enableDebugMode) {
      console.log('[QuizScoreCalculator] Calculation completed:', {
        totalAnswers,
        totalPoints,
        dominantStyle: styleScores[0]?.category,
        scores: combinedScores,
      });
    }
  }, [answers, config, calculateScores, calculateStrategicInsights, onScoreUpdate, enableDebugMode]);

  // Real-time calculation effect
  useEffect(() => {
    if (config.enableRealTimeCalculation && mode !== 'editor') {
      performCalculation();
    }
  }, [answers, performCalculation, config.enableRealTimeCalculation, mode]);

  // Get user's style profile
  const getStyleProfile = useCallback(() => {
    if (scoreState.styleScores.length === 0) {
      return null;
    }

    const dominant = scoreState.styleScores[0];
    const secondary = scoreState.styleScores[1];
    const tertiary = scoreState.styleScores[2];

    return {
      primary: {
        style: dominant.category,
        percentage: dominant.percentage,
        score: dominant.score,
        description: getStyleDescription(dominant.category),
      },
      secondary: secondary ? {
        style: secondary.category,
        percentage: secondary.percentage,
        score: secondary.score,
        description: getStyleDescription(secondary.category),
      } : null,
      tertiary: tertiary ? {
        style: tertiary.category,
        percentage: tertiary.percentage,
        score: tertiary.score,
        description: getStyleDescription(tertiary.category),
      } : null,
      allStyles: scoreState.styleScores,
    };
  }, [scoreState.styleScores]);

  // Get style description
  const getStyleDescription = (styleCategory: string): string => {
    const descriptions: Record<string, string> = {
      natural: 'Estilo descontraído e autêntico, valorizando a naturalidade',
      classico: 'Elegância atemporal com peças estruturadas e sofisticadas',
      contemporaneo: 'Moderno e atual, sempre em sintonia com as tendências',
      elegante: 'Refinamento e sofisticação em cada detalhe',
      romantico: 'Feminilidade e delicadeza em tons suaves e fluidos',
      sexy: 'Sensualidade e confiança com peças marcantes',
      dramatico: 'Impacto visual forte com contrastes e estruturas marcantes',
      criativo: 'Originalidade e expressão artística através do vestuário',
    };

    return descriptions[styleCategory] || 'Descrição não disponível';
  };

  // Score calculation API
  const scoreAPI = {
    calculate: performCalculation,
    getScores: () => scoreState.scores,
    getStyleProfile,
    getStyleScores: () => scoreState.styleScores,
    getTotalAnswers: () => scoreState.totalAnswers,
    getLastCalculated: () => scoreState.lastCalculated,
    reset: () => {
      setScoreState({
        scores: {},
        styleScores: [],
        totalAnswers: 0,
        calculationMethod: config.scoringMethod,
        lastCalculated: null,
      });
      onScoreUpdate({});
    },
  };

  // Attach score API to window for debugging (editor mode)
  if (mode === 'editor' && typeof window !== 'undefined') {
    (window as any).quizScoreCalculator = scoreAPI;
  }

  // This component doesn't render anything visible
  return null;
};

export default QuizScoreCalculator;