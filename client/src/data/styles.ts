
import { StyleResult } from '@/types/quiz';

export const styles: StyleResult[] = [
  {
    style: 'classico',
    category: 'Clássico',
    points: 0,
    percentage: 0,
    rank: 0,
    score: 0
  },
  {
    style: 'elegante',
    category: 'Elegante',
    points: 0,
    percentage: 0,
    rank: 0,
    score: 0
  },
  {
    style: 'contemporaneo',
    category: 'Contemporâneo',
    points: 0,
    percentage: 0,
    rank: 0,
    score: 0
  },
  {
    style: 'natural',
    category: 'Natural',
    points: 0,
    percentage: 0,
    rank: 0,
    score: 0
  },
  {
    style: 'romantico',
    category: 'Romântico',
    points: 0,
    percentage: 0,
    rank: 0,
    score: 0
  },
  {
    style: 'sensual',
    category: 'Sensual',
    points: 0,
    percentage: 0,
    rank: 0,
    score: 0
  },
  {
    style: 'dramatico',
    category: 'Dramático',
    points: 0,
    percentage: 0,
    rank: 0,
    score: 0
  },
  {
    style: 'criativo',
    category: 'Criativo',
    points: 0,
    percentage: 0,
    rank: 0,
    score: 0
  }
];

export const getStyleByName = (styleName: string): StyleResult | undefined => {
  return styles.find(style => style.category.toLowerCase() === styleName.toLowerCase());
};

export const getStylesByRank = (): StyleResult[] => {
  return styles.sort((a, b) => a.rank - b.rank);
};
