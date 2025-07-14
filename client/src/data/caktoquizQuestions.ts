import type { QuizQuestion, StyleType } from '@/types/quiz';

/**
 * QUESTÕES REAIS DO CAKTOQUIZ
 * 10 questões normais que pontuam para os estilos
 * Mapeamento: A=Natural, B=Clássico, C=Contemporâneo, D=Elegante, E=Romântico, F=Sexy, G=Dramático, H=Criativo
 */

export const caktoquizQuestions: QuizQuestion[] = [
  // QUESTÃO 1: TIPO DE ROUPA FAVORITA
  {
    id: 'q1',
    order: 1,
    question: 'QUAL O SEU TIPO DE ROUPA FAVORITA?',
    type: 'normal',
    multiSelect: 3,
    options: [
      {
        id: 'q1_a',
        text: 'Conforto, leveza e praticidade no vestir.',
        style: 'natural',
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/11_hqmr8l.webp',
        weight: 1
      },
      {
        id: 'q1_b',
        text: 'Discrição, caimento clássico e sobriedade.',
        style: 'classico',
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/12_edlmwf.webp',
        weight: 1
      },
      {
        id: 'q1_c',
        text: 'Praticidade com um toque de estilo atual.',
        style: 'contemporaneo',
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/4_snhaym.webp',
        weight: 1
      },
      {
        id: 'q1_d',
        text: 'Elegância refinada, moderna e sem exageros.',
        style: 'elegante',
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/14_l2nprc.webp',
        weight: 1
      },
      {
        id: 'q1_e',
        text: 'Delicadeza em tecidos suaves e fluidos.',
        style: 'romantico',
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/15_xezvcy.webp',
        weight: 1
      },
      {
        id: 'q1_f',
        text: 'Sensualidade com destaque para o corpo.',
        style: 'sensual',
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735316/16_mpqpew.webp',
        weight: 1
      },
      {
        id: 'q1_g',
        text: 'Impacto visual com peças estruturadas e assimétricas.',
        style: 'dramatico',
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735319/17_m5ogub.webp',
        weight: 1
      },
      {
        id: 'q1_h',
        text: 'Mix criativo com formas ousadas e originais.',
        style: 'criativo',
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/18_j8ipfb.webp',
        weight: 1
      }
    ]
  },

  // QUESTÃO 2: PERSONALIDADE
  {
    id: 'q2',
    order: 2,
    question: 'RESUMA A SUA PERSONALIDADE:',
    type: 'normal',
    multiSelect: 3,
    options: [
      {
        id: 'q2_a',
        text: 'Informal, espontânea, alegre, essencialista',
        style: 'natural',
        weight: 1
      },
      {
        id: 'q2_b',
        text: 'Conservadora, séria, organizada',
        style: 'classico',
        weight: 1
      },
      {
        id: 'q2_c',
        text: 'Informada, ativa, prática',
        style: 'contemporaneo',
        weight: 1
      },
      {
        id: 'q2_d',
        text: 'Exigente, sofisticada, seletiva',
        style: 'elegante',
        weight: 1
      },
      {
        id: 'q2_e',
        text: 'Feminina, meiga, delicada, sensível',
        style: 'romantico',
        weight: 1
      },
      {
        id: 'q2_f',
        text: 'Glamorosa, vaidosa, sensual',
        style: 'sensual',
        weight: 1
      },
      {
        id: 'q2_g',
        text: 'Cosmopolita, moderna e audaciosa',
        style: 'dramatico',
        weight: 1
      },
      {
        id: 'q2_h',
        text: 'Exótica, aventureira, livre',
        style: 'criativo',
        weight: 1
      }
    ]
  },

  // QUESTÃO 3: VISUAL IDENTIFICAÇÃO
  {
    id: 'q3',
    order: 3,
    question: 'QUAL VISUAL VOCÊ MAIS SE IDENTIFICA?',
    type: 'normal',
    multiSelect: 3,
    options: [
      {
        id: 'q3_a',
        text: 'Visual leve, despojado e natural',
        style: 'natural',
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/2_ziffwx.webp',
        weight: 1
      },
      {
        id: 'q3_b',
        text: 'Visual clássico e tradicional',
        style: 'classico',
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/3_asaunw.webp',
        weight: 1
      },
      {
        id: 'q3_c',
        text: 'Visual casual com toque atual',
        style: 'contemporaneo',
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/13_uvbciq.webp',
        weight: 1
      },
      {
        id: 'q3_d',
        text: 'Visual refinado e imponente',
        style: 'elegante',
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/5_dhrgpf.webp',
        weight: 1
      },
      {
        id: 'q3_e',
        text: 'Visual romântico, feminino e delicado',
        style: 'romantico',
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/6_gnoxfg.webp',
        weight: 1
      },
      {
        id: 'q3_f',
        text: 'Visual sensual, com saia justa e decote',
        style: 'sensual',
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735327/7_ynez1z.webp',
        weight: 1
      },
      {
        id: 'q3_g',
        text: 'Visual marcante e urbano (jeans + jaqueta)',
        style: 'dramatico',
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/8_yqu3hw.webp',
        weight: 1
      },
      {
        id: 'q3_h',
        text: 'Visual criativo, colorido e ousado',
        style: 'criativo',
        imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/9_x6so6a.webp',
        weight: 1
      }
    ]
  },

  // QUESTÃO 4: DETALHES
  {
    id: 'q4',
    order: 4,
    question: 'QUAIS DETALHES VOCÊ GOSTA?',
    type: 'normal',
    multiSelect: 3,
    options: [
      {
        id: 'q4_a',
        text: 'Poucos detalhes, básico e prático',
        style: 'natural',
        weight: 1
      },
      {
        id: 'q4_b',
        text: 'Bem discretos e sutis, clean e clássico',
        style: 'classico',
        weight: 1
      },
      {
        id: 'q4_c',
        text: 'Básico, mas com um toque de estilo',
        style: 'contemporaneo',
        weight: 1
      },
      {
        id: 'q4_d',
        text: 'Detalhes refinados, chic e que deem status',
        style: 'elegante',
        weight: 1
      },
      {
        id: 'q4_e',
        text: 'Detalhes delicados, laços, babados',
        style: 'romantico',
        weight: 1
      },
      {
        id: 'q4_f',
        text: 'Roupas que valorizem meu corpo: couro, zíper, fendas',
        style: 'sensual',
        weight: 1
      },
      {
        id: 'q4_g',
        text: 'Detalhes marcantes, firmeza e peso',
        style: 'dramatico',
        weight: 1
      },
      {
        id: 'q4_h',
        text: 'Detalhes diferentes do convencional, produções ousadas',
        style: 'criativo',
        weight: 1
      }
    ]
  },

  // QUESTÃO 5: ESTAMPAS
  {
    id: 'q5',
    order: 5,
    question: 'QUAIS ESTAMPAS VOCÊ MAIS SE IDENTIFICA?',
    type: 'normal',
    multiSelect: 3,
    options: [
      {
        id: 'q5_a',
        text: 'Estampas clean, com poucas informações',
        style: 'natural',
        weight: 1
      },
      {
        id: 'q5_b',
        text: 'Estampas clássicas e atemporais',
        style: 'classico',
        weight: 1
      },
      {
        id: 'q5_c',
        text: 'Atemporais, mas que tenham uma pegada de atual e moderna',
        style: 'contemporaneo',
        weight: 1
      },
      {
        id: 'q5_d',
        text: 'Estampas clássicas e atemporais, mas sofisticadas',
        style: 'elegante',
        weight: 1
      },
      {
        id: 'q5_e',
        text: 'Estampas florais e/ou delicadas como bolinhas, borboletas e corações',
        style: 'romantico',
        weight: 1
      },
      {
        id: 'q5_f',
        text: 'Estampas de animal print, como onça, zebra e cobra',
        style: 'sensual',
        weight: 1
      },
      {
        id: 'q5_g',
        text: 'Estampas geométricas, abstratas e exageradas como grandes poás',
        style: 'dramatico',
        weight: 1
      },
      {
        id: 'q5_h',
        text: 'Estampas diferentes do usual, como africanas, xadrez grandes',
        style: 'criativo',
        weight: 1
      }
    ]
  },

  // QUESTÃO 6: CASACO FAVORITO
  {
    id: 'q6',
    order: 6,
    question: 'QUAL CASACO É SEU FAVORITO?',
    type: 'normal',
    multiSelect: 3,
    options: [
      {
        id: 'q6_a',
        text: 'Cardigã bege confortável e casual',
        style: 'natural',
        imageUrl: 'https://res.cloudinary.com/der8kogzu/image/upload/v1752430285/Q6_-_A_ydwyde.png',
        weight: 1
      },
      {
        id: 'q6_b',
        text: 'Blazer verde estruturado',
        style: 'classico',
        imageUrl: 'https://res.cloudinary.com/der8kogzu/image/upload/v1752430285/Q6_-_B_xz6flj.png',
        weight: 1
      },
      {
        id: 'q6_c',
        text: 'Trench coat bege tradicional',
        style: 'contemporaneo',
        imageUrl: 'https://res.cloudinary.com/der8kogzu/image/upload/v1752430286/Q6_-_C_zk2ab3.png',
        weight: 1
      },
      {
        id: 'q6_d',
        text: 'Blazer branco refinado',
        style: 'elegante',
        imageUrl: 'https://res.cloudinary.com/der8kogzu/image/upload/v1752430286/Q6_-_D_hh759o.png',
        weight: 1
      },
      {
        id: 'q6_e',
        text: 'Casaco pink vibrante e moderno',
        style: 'romantico',
        imageUrl: 'https://res.cloudinary.com/der8kogzu/image/upload/v1752430286/Q6_-_E_opj922.png',
        weight: 1
      },
      {
        id: 'q6_f',
        text: 'Jaqueta vinho de couro estilosa',
        style: 'sensual',
        imageUrl: 'https://res.cloudinary.com/der8kogzu/image/upload/v1752430287/Q6_-_F_n4mgoz.png',
        weight: 1
      },
      {
        id: 'q6_g',
        text: 'Jaqueta preta estilo rocker',
        style: 'dramatico',
        imageUrl: 'https://res.cloudinary.com/der8kogzu/image/upload/v1752430294/Q6_-_G_ue5itf.png',
        weight: 1
      },
      {
        id: 'q6_h',
        text: 'Casaco estampado criativo e colorido',
        style: 'criativo',
        imageUrl: 'https://res.cloudinary.com/der8kogzu/image/upload/v1752430296/Q6_-_H_t6xmoz.png',
        weight: 1
      }
    ]
  },

  // QUESTÃO 7: CALÇA FAVORITA
  {
    id: 'q7',
    order: 7,
    question: 'QUAL SUA CALÇA FAVORITA?',
    type: 'normal',
    multiSelect: 3,
    options: [
      {
        id: 'q7_a',
        text: 'Calça fluida acetinada bege',
        style: 'natural',
        imageUrl: 'https://res.cloudinary.com/der8kogzu/image/upload/v1752430292/Q7_-_A_txdfij.png',
        weight: 1
      },
      {
        id: 'q7_b',
        text: 'Calça de alfaiataria cinza',
        style: 'classico',
        imageUrl: 'https://res.cloudinary.com/der8kogzu/image/upload/v1752430294/Q7_-_B_xp3bqm.png',
        weight: 1
      },
      {
        id: 'q7_c',
        text: 'Jeans reto e básico',
        style: 'contemporaneo',
        imageUrl: 'https://res.cloudinary.com/der8kogzu/image/upload/v1752430299/Q7_-_C_vzwcvi.png',
        weight: 1
      },
      {
        id: 'q7_d',
        text: 'Calça reta bege de tecido',
        style: 'elegante',
        imageUrl: 'https://res.cloudinary.com/der8kogzu/image/upload/v1752430296/Q7_-_D_vzgr64.png',
        weight: 1
      },
      {
        id: 'q7_e',
        text: 'Calça ampla rosa alfaiatada',
        style: 'romantico',
        imageUrl: 'https://res.cloudinary.com/der8kogzu/image/upload/v1752430295/Q7_-_E_akiks2.png',
        weight: 1
      },
      {
        id: 'q7_f',
        text: 'Legging preta de couro',
        style: 'sensual',
        imageUrl: 'https://res.cloudinary.com/der8kogzu/image/upload/v1752430296/Q7_-_F_u8oswz.png',
        weight: 1
      },
      {
        id: 'q7_g',
        text: 'Calça reta preta de couro',
        style: 'dramatico',
        imageUrl: 'https://res.cloudinary.com/der8kogzu/image/upload/v1752430329/Q7_-_G_bnnneg.png',
        weight: 1
      },
      {
        id: 'q7_h',
        text: 'Calça estampada floral leve e ampla',
        style: 'criativo',
        imageUrl: 'https://res.cloudinary.com/der8kogzu/image/upload/v1752430328/Q7_-_H_votjzt.png',
        weight: 1
      }
    ]
  },

  // QUESTÃO 8: SAPATOS
  {
    id: 'q8',
    order: 8,
    question: 'QUAL DESSES SAPATOS VOCÊ TEM OU MAIS GOSTA?',
    type: 'normal',
    multiSelect: 3,
    options: [
      {
        id: 'q8_a',
        text: 'Tênis nude casual e confortável',
        style: 'natural',
        imageUrl: 'https://res.cloudinary.com/der8kogzu/image/upload/v1752430297/Q8_-_A_zk7yf0.png',
        weight: 1
      },
      {
        id: 'q8_b',
        text: 'Scarpin nude de salto baixo',
        style: 'classico',
        imageUrl: 'https://res.cloudinary.com/der8kogzu/image/upload/v1752430300/Q8_-_B_azy3ox.png',
        weight: 1
      },
      {
        id: 'q8_c',
        text: 'Sandália dourada com salto bloco',
        style: 'contemporaneo',
        imageUrl: 'https://res.cloudinary.com/der8kogzu/image/upload/v1752430335/Q8_-_C_theeds.png',
        weight: 1
      },
      {
        id: 'q8_d',
        text: 'Scarpin nude salto alto e fino',
        style: 'elegante',
        imageUrl: 'https://res.cloudinary.com/der8kogzu/image/upload/v1752430335/Q8_-_D_ocqyca.png',
        weight: 1
      },
      {
        id: 'q8_e',
        text: 'Sandália anabela off white',
        style: 'romantico',
        imageUrl: 'https://res.cloudinary.com/der8kogzu/image/upload/v1752430334/Q8_-_E_i7b4hk.png',
        weight: 1
      },
      {
        id: 'q8_f',
        text: 'Sandália rosa de tiras finas',
        style: 'sensual',
        imageUrl: 'https://res.cloudinary.com/der8kogzu/image/upload/v1752430334/Q8_-_F_wa1spu.png',
        weight: 1
      },
      {
        id: 'q8_g',
        text: 'Scarpin preto moderno com vinil transparente',
        style: 'dramatico',
        imageUrl: 'https://res.cloudinary.com/der8kogzu/image/upload/v1752430334/Q8_-_G_fo3y4o.png',
        weight: 1
      },
      {
        id: 'q8_h',
        text: 'Scarpin colorido estampado',
        style: 'criativo',
        imageUrl: 'https://res.cloudinary.com/der8kogzu/image/upload/v1752430335/Q8_-_H_qe9iqk.png',
        weight: 1
      }
    ]
  },

  // QUESTÃO 9: ACESSÓRIOS
  {
    id: 'q9',
    order: 9,
    question: 'QUE TIPO DE ACESSÓRIOS VOCÊ GOSTA?',
    type: 'normal',
    multiSelect: 3,
    options: [
      {
        id: 'q9_a',
        text: 'Pequenos e discretos, às vezes nem uso',
        style: 'natural',
        imageUrl: 'https://res.cloudinary.com/der8kogzu/image/upload/v1752430351/Q9_-_A_cffjcw.png',
        weight: 1
      },
      {
        id: 'q9_b',
        text: 'Brincos pequenos e discretos. Corrente fininha',
        style: 'classico',
        imageUrl: 'https://res.cloudinary.com/der8kogzu/image/upload/v1752431503/Q9_B.png',
        weight: 1
      },
      {
        id: 'q9_c',
        text: 'Acessórios que elevem meu look com um toque moderno',
        style: 'contemporaneo',
        imageUrl: 'https://res.cloudinary.com/der8kogzu/image/upload/v1752431483/Q9_C_fr3bxa.png',
        weight: 1
      },
      {
        id: 'q9_d',
        text: 'Acessórios sofisticados, joias ou semijoias',
        style: 'elegante',
        imageUrl: 'https://res.cloudinary.com/der8kogzu/image/upload/v1752430353/Q9_-_D_e1flwe.png',
        weight: 1
      },
      {
        id: 'q9_e',
        text: 'Peças delicadas e com um toque feminino',
        style: 'romantico',
        imageUrl: 'https://res.cloudinary.com/der8kogzu/image/upload/v1752430363/Q9_-_E_f9thcb.png',
        weight: 1
      },
      {
        id: 'q9_f',
        text: 'Brincos longos, colares que valorizem minha beleza',
        style: 'sensual',
        imageUrl: 'https://res.cloudinary.com/der8kogzu/image/upload/v1752430351/Q9_-_F_gtxs9r.png',
        weight: 1
      },
      {
        id: 'q9_g',
        text: 'Acessórios pesados, que causem um impacto',
        style: 'dramatico',
        imageUrl: 'https://res.cloudinary.com/der8kogzu/image/upload/v1752430352/Q9_-_G_bihqmg.png',
        weight: 1
      },
      {
        id: 'q9_h',
        text: 'Acessórios diferentes, grandes e marcantes',
        style: 'criativo',
        imageUrl: 'https://res.cloudinary.com/der8kogzu/image/upload/v1752430352/Q9_-_H_bddztd.png',
        weight: 1
      }
    ]
  },

  // QUESTÃO 10: TECIDOS
  {
    id: 'q10',
    order: 10,
    question: 'VOCÊ ESCOLHE CERTOS TECIDOS, PRINCIPALMENTE PORQUE ELES...',
    type: 'normal',
    multiSelect: 3,
    options: [
      {
        id: 'q10_a',
        text: 'São fáceis de cuidar',
        style: 'natural',
        weight: 1
      },
      {
        id: 'q10_b',
        text: 'São de excelente qualidade',
        style: 'classico',
        weight: 1
      },
      {
        id: 'q10_c',
        text: 'São fáceis de cuidar e modernos',
        style: 'contemporaneo',
        weight: 1
      },
      {
        id: 'q10_d',
        text: 'São sofisticados',
        style: 'elegante',
        weight: 1
      },
      {
        id: 'q10_e',
        text: 'São delicados',
        style: 'romantico',
        weight: 1
      },
      {
        id: 'q10_f',
        text: 'São perfeitos ao meu corpo',
        style: 'sensual',
        weight: 1
      },
      {
        id: 'q10_g',
        text: 'São diferentes, e trazem um efeito para minha roupa',
        style: 'dramatico',
        weight: 1
      },
      {
        id: 'q10_h',
        text: 'São exclusivos, criam identidade no look',
        style: 'criativo',
        weight: 1
      }
    ]
  }
];

// Questões estratégicas (para qualificação de lead)
export const strategicQuestions: QuizQuestion[] = [
  {
    id: 's1',
    order: 11,
    question: 'Como você se vê hoje? Quando você se olha no espelho, como se sente com sua imagem pessoal atualmente?',
    type: 'strategic',
    options: [
      {
        id: 's1_a',
        text: 'Me sinto desconectada da mulher que sou hoje',
        weight: 3
      },
      {
        id: 's1_b',
        text: 'Tenho dúvidas sobre o que realmente me valoriza',
        weight: 2
      },
      {
        id: 's1_c',
        text: 'Às vezes acerto, às vezes erro',
        weight: 1
      },
      {
        id: 's1_d',
        text: 'Me sinto segura, mas sei que posso evoluir',
        weight: 1
      }
    ]
  },

  {
    id: 's2',
    order: 12,
    question: 'O que mais te desafia na hora de se vestir?',
    type: 'strategic',
    options: [
      {
        id: 's2_a',
        text: 'Tenho peças, mas não sei como combiná-las',
        weight: 3
      },
      {
        id: 's2_b',
        text: 'Compro por impulso e me arrependo depois',
        weight: 2
      },
      {
        id: 's2_c',
        text: 'Minha imagem não reflete quem eu sou',
        weight: 3
      },
      {
        id: 's2_d',
        text: 'Perco tempo e acabo usando sempre os mesmos looks',
        weight: 2
      }
    ]
  },

  {
    id: 's3',
    order: 13,
    question: 'Com que frequência você se pega pensando: "Com que roupa eu vou?" — mesmo com o guarda-roupa cheio?',
    type: 'strategic',
    options: [
      {
        id: 's3_a',
        text: 'Quase todos os dias — é sempre uma indecisão',
        weight: 3
      },
      {
        id: 's3_b',
        text: 'Sempre que tenho um compromisso importante',
        weight: 2
      },
      {
        id: 's3_c',
        text: 'Às vezes, mas me sinto limitada nas escolhas',
        weight: 1
      },
      {
        id: 's3_d',
        text: 'Raramente — já me sinto segura ao me vestir',
        weight: 0
      }
    ]
  },

  {
    id: 's4',
    order: 14,
    question: 'Pense no quanto você já gastou com roupas que não usa ou que não representam quem você é... Você acredita que ter acesso a um material estratégico, direto ao ponto, que te ensina a aplicar seu estilo com clareza, faria diferença?',
    type: 'strategic',
    options: [
      {
        id: 's4_a',
        text: 'Sim! Se existisse algo assim, eu quero',
        weight: 3
      },
      {
        id: 's4_b',
        text: 'Sim, mas teria que ser no momento certo',
        weight: 2
      },
      {
        id: 's4_c',
        text: 'Tenho dúvidas se funcionaria pra mim',
        weight: 1
      },
      {
        id: 's4_d',
        text: 'Não, prefiro continuar como estou',
        weight: 0
      }
    ]
  },

  {
    id: 's5',
    order: 15,
    question: 'Se esse conteúdo completo custasse R$ 97,00 — incluindo Guia de Estilo, bônus especiais e um passo a passo prático para transformar sua imagem pessoal — você consideraria um bom investimento?',
    type: 'strategic',
    options: [
      {
        id: 's5_a',
        text: 'Sim! Por esse resultado, vale muito',
        weight: 3
      },
      {
        id: 's5_b',
        text: 'Sim, mas só se eu tiver certeza de que funciona pra mim',
        weight: 2
      },
      {
        id: 's5_c',
        text: 'Talvez — depende do que está incluso',
        weight: 1
      },
      {
        id: 's5_d',
        text: 'Não, ainda não estou pronta para investir',
        weight: 0
      }
    ]
  },

  {
    id: 's6',
    order: 16,
    question: 'Qual desses resultados você mais gostaria de alcançar com os Guias de Estilo e Imagem?',
    type: 'strategic',
    options: [
      {
        id: 's6_a',
        text: 'Montar looks com mais facilidade e confiança',
        weight: 2
      },
      {
        id: 's6_b',
        text: 'Usar o que já tenho e me sentir estilosa',
        weight: 2
      },
      {
        id: 's6_c',
        text: 'Comprar com mais consciência e sem culpa',
        weight: 2
      },
      {
        id: 's6_d',
        text: 'Ser admirada pela imagem que transmito',
        weight: 3
      },
      {
        id: 's6_e',
        text: 'Resgatar peças esquecidas e criar novos looks com estilo',
        weight: 2
      }
    ]
  }
];

// Helper para obter todas as questões em ordem
export const getAllQuestions = (): QuizQuestion[] => {
  return [...caktoquizQuestions, ...strategicQuestions].sort((a, b) => (a.order || 0) - (b.order || 0));
};

// Helper para obter apenas questões normais
export const getNormalQuestions = (): QuizQuestion[] => {
  return caktoquizQuestions;
};

// Helper para obter apenas questões estratégicas  
export const getStrategicQuestions = (): QuizQuestion[] => {
  return strategicQuestions;
};
