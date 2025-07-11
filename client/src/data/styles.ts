
import { StyleResult, StyleType } from '@/types/quiz';

export const styles: StyleResult[] = [
  {
    id: '1',
    style: 'natural',
    category: 'Natural',
    points: 0,
    percentage: 0,
    rank: 1,
    score: 0
  },
  {
    id: '2',
    style: 'classico',
    category: 'Clássico',
    points: 0,
    percentage: 0,
    rank: 2,
    score: 0
  },
  {
    id: '3',
    style: 'contemporaneo',
    category: 'Contemporâneo',
    points: 0,
    percentage: 0,
    rank: 3,
    score: 0
  },
  {
    id: '4',
    style: 'elegante',
    category: 'Elegante',
    points: 0,
    percentage: 0,
    rank: 4,
    score: 0
  },
  {
    id: '5',
    style: 'romantico',
    category: 'Romântico',
    points: 0,
    percentage: 0,
    rank: 5,
    score: 0
  },
  {
    id: '6',
    style: 'sensual',
    category: 'Sensual',
    points: 0,
    percentage: 0,
    rank: 6,
    score: 0
  },
  {
    id: '7',
    style: 'dramatico',
    category: 'Dramático',
    points: 0,
    percentage: 0,
    rank: 7,
    score: 0
  },
  {
    id: '8',
    style: 'criativo',
    category: 'Criativo',
    points: 0,
    percentage: 0,
    rank: 8,
    score: 0
  }
];

export const getAllStyles = (): StyleResult[] => styles;

export const getStyleByCode = (code: string): StyleResult | undefined => {
  return styles.find(style => style.style === code || style.category.toLowerCase() === code.toLowerCase());
};

export const getStyleByName = (name: string): StyleResult | undefined => {
  return styles.find(style => style.name === name || style.category === name);
};

export const getStyleById = (id: string): StyleResult | undefined => {
  return styles.find(style => style.id === id || style.style === id);
};
