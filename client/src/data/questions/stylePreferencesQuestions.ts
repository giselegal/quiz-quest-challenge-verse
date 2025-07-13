
import { QuizQuestion } from '../../types/quiz';

export const stylePreferencesQuestions: QuizQuestion[] = [
  {
    id: '5',
    title: 'QUAIS ESTAMPAS VOCÊ MAIS SE IDENTIFICA?',
    type: 'both',
    multiSelect: 3,
    options: [
      {
        id: '5a',
        text: 'Estampas clean, com poucas informações.',
        imageUrl: 'https://res.cloudinary.com/der8kogzu/image/upload/v1752430276/Q5_-_A_k6gvtc.png',
        styleCategory: 'Natural',
        points: 1
      },
      {
        id: '5b',
        text: 'Estampas clássicas e atemporais.',
        imageUrl: 'https://res.cloudinary.com/der8kogzu/image/upload/v1752430277/Q5_-_B_a1emi6.png',
        styleCategory: 'Clássico',
        points: 1
      },
      {
        id: '5c',
        text: 'Atemporais, mas que tenham uma pegada de atual e moderna.',
        imageUrl: 'https://res.cloudinary.com/der8kogzu/image/upload/v1752430277/Q5_-_C_ywcxcx.png',
        styleCategory: 'Contemporâneo',
        points: 1
      },
      {
        id: '5d',
        text: 'Estampas clássicas e atemporais, mas sofisticadas.',
        imageUrl: 'https://res.cloudinary.com/der8kogzu/image/upload/v1752430277/Q5_-_D_y7u29d.png',
        styleCategory: 'Elegante',
        points: 1
      },
      {
        id: '5e',
        text: 'Estampas florais e/ou delicadas como bolinhas, borboletas e corações.',
        imageUrl: 'https://res.cloudinary.com/der8kogzu/image/upload/v1752430277/Q5_-_E_gnuvl3.png',
        styleCategory: 'Romântico',
        points: 1
      },
      {
        id: '5f',
        text: 'Estampas de animal print, como onça, zebra e cobra.',
        imageUrl: 'https://res.cloudinary.com/der8kogzu/image/upload/v1752430291/Q5_-_F_lzrw2j.png',
        styleCategory: 'Sexy',
        points: 1
      },
      {
        id: '5g',
        text: 'Estampas geométricas, abstratas e exageradas como grandes poás.',
        imageUrl: 'https://res.cloudinary.com/der8kogzu/image/upload/v1752430289/Q5_-_G_vr81is.png',
        styleCategory: 'Dramático',
        points: 1
      },
      {
        id: '5h',
        text: 'Estampas diferentes do usual, como africanas, xadrez grandes.',
        imageUrl: 'https://res.cloudinary.com/der8kogzu/image/upload/v1752430290/Q5_-_H_yjbt0s.png',
        styleCategory: 'Criativo',
        points: 1
      }
    ]
  },
  {
    id: '10',
    title: 'VOCÊ ESCOLHE CERTOS TECIDOS, PRINCIPALMENTE PORQUE ELES...',
    type: 'text',
    multiSelect: 3,
    options: [
      {
        id: '10a',
        text: 'São fáceis de cuidar.',
        styleCategory: 'Natural',
        points: 1
      },
      {
        id: '10b',
        text: 'São de excelente qualidade.',
        styleCategory: 'Clássico',
        points: 1
      },
      {
        id: '10c',
        text: 'São fáceis de cuidar e modernos.',
        styleCategory: 'Contemporâneo',
        points: 1
      },
      {
        id: '10d',
        text: 'São sofisticados.',
        styleCategory: 'Elegante',
        points: 1
      },
      {
        id: '10e',
        text: 'São delicados.',
        styleCategory: 'Romântico',
        points: 1
      },
      {
        id: '10f',
        text: 'São perfeitos ao meu corpo.',
        styleCategory: 'Sexy',
        points: 1
      },
      {
        id: '10g',
        text: 'São diferentes, e trazem um efeito para minha roupa.',
        styleCategory: 'Dramático',
        points: 1
      },
      {
        id: '10h',
        text: 'São exclusivos, criam identidade no look.',
        styleCategory: 'Criativo',
        points: 1
      }
    ]
  }
];
