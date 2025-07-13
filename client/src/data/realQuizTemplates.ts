// Templates para o quiz de estilo pessoal
export const QUIZ_TEMPLATES = {
  basicQuiz: {
    id: "basic-quiz",
    name: "Quiz Básico de Estilo",
    description: "Template básico para quiz de descoberta de estilo pessoal",
  },
  styleQuiz: {
    id: "style-quiz",
    name: "Quiz de Estilo Pessoal",
    description: "Quiz completo para descobrir estilo pessoal",
  },
  intro: {
    id: "intro",
    title: "Descubra Seu Estilo Pessoal",
    type: "intro" as const,
    progress: 0,
    showHeader: true,
    showProgress: false,
    components: [
      {
        id: "intro-title",
        type: "heading",
        data: {
          text: "Descubra Seu Estilo Pessoal",
          level: 1,
          color: "#432818"
        },
        style: {
          textAlign: "center",
          marginBottom: "1rem"
        }
      },
      {
        id: "intro-subtitle", 
        type: "paragraph",
        data: {
          text: "Responda algumas perguntas rápidas e descubra qual estilo combina mais com você",
          color: "#8F7A6A"
        },
        style: {
          textAlign: "center",
          fontSize: "1.1rem"
        }
      }
    ]
  },
  transition: {
    id: "transition",
    title: "Quase lá!",
    type: "transition" as const,
    progress: 75,
    showHeader: true,
    showProgress: true,
    components: [
      {
        id: "transition-title",
        type: "heading",
        content: {
          text: "Quase terminando!",
          level: 2,
          color: "#432818"
        }
      }
    ]
  },
  loading: {
    id: "loading",
    title: "Calculando resultado...",
    type: "loading" as const,
    progress: 90,
    showHeader: true,
    showProgress: true,
    components: [
      {
        id: "loading-spinner",
        type: "loading",
        content: {
          text: "Analisando suas respostas..."
        }
      }
    ]
  },
  result: {
    id: "result",
    title: "Seu Resultado",
    type: "result" as const,
    progress: 100,
    showHeader: true,
    showProgress: false,
    components: [
      {
        id: "result-title",
        type: "heading",
        content: {
          text: "Seu Estilo é...",
          level: 1,
          color: "#432818"
        }
      }
    ]
  },
  offer: {
    id: "offer",
    title: "Oferta Especial",
    type: "offer" as const,
    progress: 100,
    showHeader: true,
    showProgress: false,
    components: [
      {
        id: "offer-title",
        type: "heading",
        content: {
          text: "Oferta Especial Para Você",
          level: 1,
          color: "#432818"
        }
      }
    ]
  }
};

export const generateRealQuestionTemplates = () => {
  return [
    // QUESTÃO 1: QUAL O SEU TIPO DE ROUPA FAVORITA?
    {
      id: "q1",
      title: "QUAL O SEU TIPO DE ROUPA FAVORITA?",
      type: "question" as const,
      progress: 10,
      showHeader: true,
      showProgress: true,
      questionType: "both", // texto + imagem
      multiSelect: 3,
      components: [
        {
          id: "q1-question",
          type: "multipleChoice",
          data: {
            text: "QUAL O SEU TIPO DE ROUPA FAVORITA?",
            maxSelections: 3,
            options: [
              { 
                id: "1a", 
                text: "Conforto, leveza e praticidade no vestir",
                imageUrl: "https://res.cloudinary.com/der8kogzu/image/upload/Q1_-_A_xlh5cg.png",
                styleCategory: "Natural",
                points: { natural: 1 }
              },
              { 
                id: "1b", 
                text: "Discrição, caimento clássico e sobriedade",
                imageUrl: "https://res.cloudinary.com/der8kogzu/image/upload/Q1_-_B_bm79bg.png",
                styleCategory: "Clássico",
                points: { classico: 1 }
              },
              { 
                id: "1c", 
                text: "Praticidade com um toque de estilo atual",
                imageUrl: "https://res.cloudinary.com/der8kogzu/image/upload/Q1_-_C_n2at5j.png",
                styleCategory: "Contemporâneo",
                points: { contemporaneo: 1 }
              },
              { 
                id: "1d", 
                text: "Elegância refinada, moderna e sem exageros",
                imageUrl: "https://res.cloudinary.com/der8kogzu/image/upload/Q1_-_D_psbhs9.png",
                styleCategory: "Elegante",
                points: { elegante: 1 }
              },
              { 
                id: "1e", 
                text: "Delicadeza em tecidos suaves e fluidos",
                imageUrl: "https://res.cloudinary.com/der8kogzu/image/upload/Q1_-_E_pwhukq.png",
                styleCategory: "Romântico",
                points: { romantico: 1 }
              },
              { 
                id: "1f", 
                text: "Sensualidade com destaque para o corpo",
                imageUrl: "https://res.cloudinary.com/der8kogzu/image/upload/Q1_-_F_z1nyug.png",
                styleCategory: "Sexy",
                points: { sexy: 1 }
              },
              { 
                id: "1g", 
                text: "Impacto visual com peças estruturadas e assimétricas",
                imageUrl: "https://res.cloudinary.com/der8kogzu/image/upload/Q1_-_G_zgy8mq.png",
                styleCategory: "Dramático",
                points: { dramatico: 1 }
              },
              { 
                id: "1h", 
                text: "Mix criativo com formas ousadas e originais",
                imageUrl: "https://res.cloudinary.com/der8kogzu/image/upload/Q1_-_H_dqhkzv.png",
                styleCategory: "Criativo",
                points: { criativo: 1 }
              }
            ]
          }
        }
      ]
    },

    // QUESTÃO 2: RESUMA A SUA PERSONALIDADE
    {
      id: "q2",
      title: "RESUMA A SUA PERSONALIDADE:",
      type: "question" as const,
      progress: 20,
      showHeader: true,
      showProgress: true,
      questionType: "text",
      multiSelect: 3,
      components: [
        {
          id: "q2-question",
          type: "multipleChoice",
          data: {
            text: "RESUMA A SUA PERSONALIDADE:",
            maxSelections: 3,
            options: [
              { id: "2a", text: "Informal, espontânea, alegre, essencialista", styleCategory: "Natural", points: { natural: 1 } },
              { id: "2b", text: "Conservadora, séria, organizada", styleCategory: "Clássico", points: { classico: 1 } },
              { id: "2c", text: "Informada, ativa, prática", styleCategory: "Contemporâneo", points: { contemporaneo: 1 } },
              { id: "2d", text: "Exigente, sofisticada, seletiva", styleCategory: "Elegante", points: { elegante: 1 } },
              { id: "2e", text: "Feminina, meiga, delicada, sensível", styleCategory: "Romântico", points: { romantico: 1 } },
              { id: "2f", text: "Glamorosa, vaidosa, sensual", styleCategory: "Sexy", points: { sexy: 1 } },
              { id: "2g", text: "Cosmopolita, moderna e audaciosa", styleCategory: "Dramático", points: { dramatico: 1 } },
              { id: "2h", text: "Exótica, aventureira, livre", styleCategory: "Criativo", points: { criativo: 1 } }
            ]
          }
        }
      ]
    },

    // QUESTÃO 3: QUAL VISUAL VOCÊ MAIS SE IDENTIFICA?
    {
      id: "q3",
      title: "QUAL VISUAL VOCÊ MAIS SE IDENTIFICA?",
      type: "question" as const,
      progress: 30,
      showHeader: true,
      showProgress: true,
      questionType: "both",
      multiSelect: 3,
      components: [
        {
          id: "q3-question",
          type: "multipleChoice",
          data: {
            text: "QUAL VISUAL VOCÊ MAIS SE IDENTIFICA?",
            maxSelections: 3,
            options: [
              { 
                id: "3a", 
                text: "Visual leve, despojado e natural",
                imageUrl: "https://res.cloudinary.com/der8kogzu/image/upload/Q1_-_A_xlh5cg.png",
                styleCategory: "Natural",
                points: { natural: 1 }
              },
              { 
                id: "3b", 
                text: "Visual clássico e tradicional",
                imageUrl: "https://res.cloudinary.com/der8kogzu/image/upload/Q1_-_B_bm79bg.png",
                styleCategory: "Clássico",
                points: { classico: 1 }
              },
              { 
                id: "3c", 
                text: "Visual casual com toque atual",
                imageUrl: "https://res.cloudinary.com/der8kogzu/image/upload/Q1_-_C_n2at5j.png",
                styleCategory: "Contemporâneo",
                points: { contemporaneo: 1 }
              },
              { 
                id: "3d", 
                text: "Visual refinado e imponente",
                imageUrl: "https://res.cloudinary.com/der8kogzu/image/upload/Q1_-_D_psbhs9.png",
                styleCategory: "Elegante",
                points: { elegante: 1 }
              },
              { 
                id: "3e", 
                text: "Visual romântico, feminino e delicado",
                imageUrl: "https://res.cloudinary.com/der8kogzu/image/upload/Q1_-_E_pwhukq.png",
                styleCategory: "Romântico",
                points: { romantico: 1 }
              },
              { 
                id: "3f", 
                text: "Visual sensual, com saia justa e decote",
                imageUrl: "https://res.cloudinary.com/der8kogzu/image/upload/Q1_-_F_z1nyug.png",
                styleCategory: "Sexy",
                points: { sexy: 1 }
              },
              { 
                id: "3g", 
                text: "Visual marcante e urbano (jeans + jaqueta)",
                imageUrl: "https://res.cloudinary.com/der8kogzu/image/upload/Q1_-_G_zgy8mq.png",
                styleCategory: "Dramático",
                points: { dramatico: 1 }
              },
              { 
                id: "3h", 
                text: "Visual criativo, colorido e ousado",
                imageUrl: "https://res.cloudinary.com/der8kogzu/image/upload/Q1_-_H_dqhkzv.png",
                styleCategory: "Criativo",
                points: { criativo: 1 }
              }
            ]
          }
        }
      ]
    },

    // QUESTÃO 4: QUAIS DETALHES VOCÊ GOSTA?
    {
      id: "q4",
      title: "QUAIS DETALHES VOCÊ GOSTA?",
      type: "question" as const,
      progress: 40,
      showHeader: true,
      showProgress: true,
      questionType: "text",
      multiSelect: 3,
      components: [
        {
          id: "q4-question",
          type: "multipleChoice",
          data: {
            text: "QUAIS DETALHES VOCÊ GOSTA?",
            maxSelections: 3,
            options: [
              { id: "4a", text: "Poucos detalhes, básico e prático", styleCategory: "Natural", points: { natural: 1 } },
              { id: "4b", text: "Bem discretos e sutis, clean e clássico", styleCategory: "Clássico", points: { classico: 1 } },
              { id: "4c", text: "Básico, mas com um toque de estilo", styleCategory: "Contemporâneo", points: { contemporaneo: 1 } },
              { id: "4d", text: "Detalhes refinados, chic e que deem status", styleCategory: "Elegante", points: { elegante: 1 } },
              { id: "4e", text: "Detalhes delicados, laços, babados", styleCategory: "Romântico", points: { romantico: 1 } },
              { id: "4f", text: "Roupas que valorizem meu corpo: couro, zíper, fendas", styleCategory: "Sexy", points: { sexy: 1 } },
              { id: "4g", text: "Detalhes marcantes, firmeza e peso", styleCategory: "Dramático", points: { dramatico: 1 } },
              { id: "4h", text: "Detalhes diferentes do convencional, produções ousadas", styleCategory: "Criativo", points: { criativo: 1 } }
            ]
          }
        }
      ]
    },

    // QUESTÃO 5: QUAIS ESTAMPAS VOCÊ MAIS SE IDENTIFICA?
    {
      id: "q5",
      title: "QUAIS ESTAMPAS VOCÊ MAIS SE IDENTIFICA?",
      type: "question" as const,
      progress: 50,
      showHeader: true,
      showProgress: true,
      questionType: "both",
      multiSelect: 3,
      components: [
        {
          id: "q5-question",
          type: "multipleChoice",
          data: {
            text: "QUAIS ESTAMPAS VOCÊ MAIS SE IDENTIFICA?",
            maxSelections: 3,
            options: [
              { 
                id: "5a", 
                text: "Estampas clean, com poucas informações",
                imageUrl: "https://res.cloudinary.com/der8kogzu/image/upload/Q1_-_A_xlh5cg.png",
                styleCategory: "Natural",
                points: { natural: 1 }
              },
              { 
                id: "5b", 
                text: "Estampas clássicas e atemporais",
                imageUrl: "https://res.cloudinary.com/der8kogzu/image/upload/Q1_-_B_bm79bg.png",
                styleCategory: "Clássico",
                points: { classico: 1 }
              },
              { 
                id: "5c", 
                text: "Atemporais, mas que tenham uma pegada de atual e moderna",
                imageUrl: "https://res.cloudinary.com/der8kogzu/image/upload/Q1_-_C_n2at5j.png",
                styleCategory: "Contemporâneo",
                points: { contemporaneo: 1 }
              },
              { 
                id: "5d", 
                text: "Estampas clássicas e atemporais, mas sofisticadas",
                imageUrl: "https://res.cloudinary.com/der8kogzu/image/upload/Q1_-_D_psbhs9.png",
                styleCategory: "Elegante",
                points: { elegante: 1 }
              },
              { 
                id: "5e", 
                text: "Estampas florais e/ou delicadas como bolinhas, borboletas e corações",
                imageUrl: "https://res.cloudinary.com/der8kogzu/image/upload/Q1_-_E_pwhukq.png",
                styleCategory: "Romântico",
                points: { romantico: 1 }
              },
              { 
                id: "5f", 
                text: "Estampas de animal print, como onça, zebra e cobra",
                imageUrl: "https://res.cloudinary.com/der8kogzu/image/upload/Q1_-_F_z1nyug.png",
                styleCategory: "Sexy",
                points: { sexy: 1 }
              },
              { 
                id: "5g", 
                text: "Estampas geométricas, abstratas e exageradas como grandes poás",
                imageUrl: "https://res.cloudinary.com/der8kogzu/image/upload/Q1_-_G_zgy8mq.png",
                styleCategory: "Dramático",
                points: { dramatico: 1 }
              },
              { 
                id: "5h", 
                text: "Estampas diferentes do usual, como africanas, xadrez grandes",
                imageUrl: "https://res.cloudinary.com/der8kogzu/image/upload/Q1_-_H_dqhkzv.png",
                styleCategory: "Criativo",
                points: { criativo: 1 }
              }
            ]
          }
        }
      ]
    },

    // QUESTÃO 6: QUAL CASACO É SEU FAVORITO?
    {
      id: "q6",
      title: "QUAL CASACO É SEU FAVORITO?",
      type: "question" as const,
      progress: 60,
      showHeader: true,
      showProgress: true,
      questionType: "both",
      multiSelect: 3,
      components: [
        {
          id: "q6-question",
          type: "multipleChoice",
          data: {
            text: "QUAL CASACO É SEU FAVORITO?",
            maxSelections: 3,
            options: [
              { 
                id: "6a", 
                text: "Cardigã bege confortável e casual",
                imageUrl: "https://res.cloudinary.com/der8kogzu/image/upload/v1744735372/29_sdogoy.webp",
                styleCategory: "Natural",
                points: { natural: 1 }
              },
              { 
                id: "6b", 
                text: "Blazer verde estruturado",
                imageUrl: "https://res.cloudinary.com/der8kogzu/image/upload/v1744735372/30_nfth8k.webp",
                styleCategory: "Clássico",
                points: { classico: 1 }
              },
              { 
                id: "6c", 
                text: "Trench coat bege tradicional",
                imageUrl: "https://res.cloudinary.com/der8kogzu/image/upload/v1744735372/31_tcmhcl.webp",
                styleCategory: "Contemporâneo",
                points: { contemporaneo: 1 }
              },
              { 
                id: "6d", 
                text: "Blazer branco refinado",
                imageUrl: "https://res.cloudinary.com/der8kogzu/image/upload/v1744735377/32_h78pd8.webp",
                styleCategory: "Elegante",
                points: { elegante: 1 }
              },
              { 
                id: "6e", 
                text: "Casaco pink vibrante e moderno",
                imageUrl: "https://res.cloudinary.com/der8kogzu/image/upload/v1744735377/33_u8pldd.webp",
                styleCategory: "Romântico",
                points: { romantico: 1 }
              },
              { 
                id: "6f", 
                text: "Jaqueta vinho de couro estilosa",
                imageUrl: "https://res.cloudinary.com/der8kogzu/image/upload/v1744735377/34_peadir.webp",
                styleCategory: "Sexy",
                points: { sexy: 1 }
              },
              { 
                id: "6g", 
                text: "Jaqueta preta estilo rocker",
                imageUrl: "https://res.cloudinary.com/der8kogzu/image/upload/v1744735379/35_pulzso.webp",
                styleCategory: "Dramático",
                points: { dramatico: 1 }
              },
              { 
                id: "6h", 
                text: "Casaco estampado criativo e colorido",
                imageUrl: "https://res.cloudinary.com/der8kogzu/image/upload/v1744735377/36_cympaq.webp",
                styleCategory: "Criativo",
                points: { criativo: 1 }
              }
            ]
          }
        }
      ]
    },

    // QUESTÃO 7: QUAL SUA CALÇA FAVORITA?
    {
      id: "q7",
      title: "QUAL SUA CALÇA FAVORITA?",
      type: "question" as const,
      progress: 70,
      showHeader: true,
      showProgress: true,
      questionType: "both",
      multiSelect: 3,
      components: [
        {
          id: "q7-question",
          type: "multipleChoice",
          data: {
            text: "QUAL SUA CALÇA FAVORITA?",
            maxSelections: 3,
            options: [
              { 
                id: "7a", 
                text: "Calça fluida acetinada bege",
                imageUrl: "https://res.cloudinary.com/der8kogzu/image/upload/v1744735419/38_iilv0l.webp",
                styleCategory: "Natural",
                points: { natural: 1 }
              },
              { 
                id: "7b", 
                text: "Calça de alfaiataria cinza",
                imageUrl: "https://res.cloudinary.com/der8kogzu/image/upload/v1744735417/39_arsswu.webp",
                styleCategory: "Clássico",
                points: { classico: 1 }
              },
              { 
                id: "7c", 
                text: "Jeans reto e básico",
                imageUrl: "https://res.cloudinary.com/der8kogzu/image/upload/v1744735419/40_beq52x.webp",
                styleCategory: "Contemporâneo",
                points: { contemporaneo: 1 }
              },
              { 
                id: "7d", 
                text: "Calça reta bege de tecido",
                imageUrl: "https://res.cloudinary.com/der8kogzu/image/upload/v1744735419/41_hconq4.webp",
                styleCategory: "Elegante",
                points: { elegante: 1 }
              },
              { 
                id: "7e", 
                text: "Calça ampla rosa alfaiatada",
                imageUrl: "https://res.cloudinary.com/der8kogzu/image/upload/v1744735420/42_q8xws1.webp",
                styleCategory: "Romântico",
                points: { romantico: 1 }
              },
              { 
                id: "7f", 
                text: "Legging preta de couro",
                imageUrl: "https://res.cloudinary.com/der8kogzu/image/upload/v1744735424/43_ljy7sh.webp",
                styleCategory: "Sexy",
                points: { sexy: 1 }
              },
              { 
                id: "7g", 
                text: "Calça reta preta de couro",
                imageUrl: "https://res.cloudinary.com/der8kogzu/image/upload/v1744735424/44_nqgvoq.webp",
                styleCategory: "Dramático",
                points: { dramatico: 1 }
              },
              { 
                id: "7h", 
                text: "Calça estampada floral leve e ampla",
                imageUrl: "https://res.cloudinary.com/der8kogzu/image/upload/v1744735425/45_lp64m8.webp",
                styleCategory: "Criativo",
                points: { criativo: 1 }
              }
            ]
          }
        }
      ]
    },

    // QUESTÃO 8: QUAL DESSES SAPATOS VOCÊ TEM OU MAIS GOSTA?
    {
      id: "q8",
      title: "QUAL DESSES SAPATOS VOCÊ TEM OU MAIS GOSTA?",
      type: "question" as const,
      progress: 80,
      showHeader: true,
      showProgress: true,
      questionType: "both",
      multiSelect: 3,
      components: [
        {
          id: "q8-question",
          type: "multipleChoice",
          data: {
            text: "QUAL DESSES SAPATOS VOCÊ TEM OU MAIS GOSTA?",
            maxSelections: 3,
            options: [
              { 
                id: "8a", 
                text: "Tênis nude casual e confortável",
                imageUrl: "https://res.cloudinary.com/der8kogzu/image/upload/v1744735426/47_bi6vgf.webp",
                styleCategory: "Natural",
                points: { natural: 1 }
              },
              { 
                id: "8b", 
                text: "Scarpin nude de salto baixo",
                imageUrl: "https://res.cloudinary.com/der8kogzu/image/upload/v1744735427/48_ymo1ur.webp",
                styleCategory: "Clássico",
                points: { classico: 1 }
              },
              { 
                id: "8c", 
                text: "Sandália dourada com salto bloco",
                imageUrl: "https://res.cloudinary.com/der8kogzu/image/upload/v1744735427/49_apcrwa.webp",
                styleCategory: "Contemporâneo",
                points: { contemporaneo: 1 }
              },
              { 
                id: "8d", 
                text: "Scarpin nude salto alto e fino",
                imageUrl: "https://res.cloudinary.com/der8kogzu/image/upload/v1744735428/50_qexxxo.webp",
                styleCategory: "Elegante",
                points: { elegante: 1 }
              },
              { 
                id: "8e", 
                text: "Sandália anabela off white",
                imageUrl: "https://res.cloudinary.com/der8kogzu/image/upload/v1744735428/51_xbgntp.webp",
                styleCategory: "Romântico",
                points: { romantico: 1 }
              },
              { 
                id: "8f", 
                text: "Sandália rosa de tiras finas",
                imageUrl: "https://res.cloudinary.com/der8kogzu/image/upload/v1744735429/52_edlp0e.webp",
                styleCategory: "Sexy",
                points: { sexy: 1 }
              },
              { 
                id: "8g", 
                text: "Scarpin preto moderno com vinil transparente",
                imageUrl: "https://res.cloudinary.com/der8kogzu/image/upload/v1744735429/53_bfdp6f.webp",
                styleCategory: "Dramático",
                points: { dramatico: 1 }
              },
              { 
                id: "8h", 
                text: "Scarpin colorido estampado",
                imageUrl: "https://res.cloudinary.com/der8kogzu/image/upload/v1744735430/54_xnilkc.webp",
                styleCategory: "Criativo",
                points: { criativo: 1 }
              }
            ]
          }
        }
      ]
    },

    // QUESTÃO 9: QUE TIPO DE ACESSÓRIOS VOCÊ GOSTA?
    {
      id: "q9",
      title: "QUE TIPO DE ACESSÓRIOS VOCÊ GOSTA?",
      type: "question" as const,
      progress: 90,
      showHeader: true,
      showProgress: true,
      questionType: "text",
      multiSelect: 3,
      components: [
        {
          id: "q9-question",
          type: "multipleChoice",
          data: {
            text: "QUE TIPO DE ACESSÓRIOS VOCÊ GOSTA?",
            maxSelections: 3,
            options: [
              { id: "9a", text: "Pequenos e discretos, às vezes nem uso", styleCategory: "Natural", points: { natural: 1 } },
              { id: "9b", text: "Brincos pequenos e discretos. Corrente fininha", styleCategory: "Clássico", points: { classico: 1 } },
              { id: "9c", text: "Acessórios que elevem meu look com um toque moderno", styleCategory: "Contemporâneo", points: { contemporaneo: 1 } },
              { id: "9d", text: "Acessórios sofisticados, joias ou semijoias", styleCategory: "Elegante", points: { elegante: 1 } },
              { id: "9e", text: "Peças delicadas e com um toque feminino", styleCategory: "Romântico", points: { romantico: 1 } },
              { id: "9f", text: "Brincos longos, colares que valorizem minha beleza", styleCategory: "Sexy", points: { sexy: 1 } },
              { id: "9g", text: "Acessórios pesados, que causem um impacto", styleCategory: "Dramático", points: { dramatico: 1 } },
              { id: "9h", text: "Acessórios diferentes, grandes e marcantes", styleCategory: "Criativo", points: { criativo: 1 } }
            ]
          }
        }
      ]
    },

    // QUESTÃO 10: VOCÊ ESCOLHE CERTOS TECIDOS, PRINCIPALMENTE PORQUE ELES...
    {
      id: "q10",
      title: "VOCÊ ESCOLHE CERTOS TECIDOS, PRINCIPALMENTE PORQUE ELES...",
      type: "question" as const,
      progress: 100,
      showHeader: true,
      showProgress: true,
      questionType: "text",
      multiSelect: 3,
      components: [
        {
          id: "q10-question",
          type: "multipleChoice",
          data: {
            text: "VOCÊ ESCOLHE CERTOS TECIDOS, PRINCIPALMENTE PORQUE ELES...",
            maxSelections: 3,
            options: [
              { id: "10a", text: "São fáceis de cuidar", styleCategory: "Natural", points: { natural: 1 } },
              { id: "10b", text: "São de excelente qualidade", styleCategory: "Clássico", points: { classico: 1 } },
              { id: "10c", text: "São fáceis de cuidar e modernos", styleCategory: "Contemporâneo", points: { contemporaneo: 1 } },
              { id: "10d", text: "São sofisticados", styleCategory: "Elegante", points: { elegante: 1 } },
              { id: "10e", text: "São delicados", styleCategory: "Romântico", points: { romantico: 1 } },
              { id: "10f", text: "São perfeitos ao meu corpo", styleCategory: "Sexy", points: { sexy: 1 } },
              { id: "10g", text: "São diferentes, e trazem um efeito para minha roupa", styleCategory: "Dramático", points: { dramatico: 1 } },
              { id: "10h", text: "São exclusivos, criam identidade no look", styleCategory: "Criativo", points: { criativo: 1 } }
            ]
          }
        }
      ]
    }
  ];
};

export const generateStrategicQuestionTemplates = () => {
  return [
    // ETAPA 11: Página de Transição 1
    {
      id: "transition1",
      title: "🕐 Enquanto calculamos o seu resultado...",
      type: "transition" as const,
      progress: 75,
      showHeader: true,
      showProgress: true,
      components: [
        {
          id: "transition1-content",
          type: "text",
          data: {
            text: "🕐 Enquanto calculamos o seu resultado...\n\nQueremos te fazer algumas perguntas que vão tornar sua experiência ainda mais completa.\nA ideia é simples: te ajudar a enxergar com mais clareza onde você está agora — e para onde pode ir com mais intenção, leveza e autenticidade.\n\n💬 Responda com sinceridade. Isso é só entre você e a sua nova versão.",
            fontSize: "1.1rem",
            textAlign: "center",
            color: "#432818",
            lineHeight: "1.6"
          },
          style: {
            backgroundColor: "#f8f9fa",
            padding: "2rem",
            borderRadius: "12px",
            textAlign: "center"
          }
        }
      ]
    },

    // QUESTÃO 12: Como você se vê hoje?
    {
      id: "s1",
      title: "Como você se vê hoje?",
      type: "question" as const,
      progress: 78,
      showHeader: true,
      showProgress: true,
      questionType: "text",
      components: [
        {
          id: "s1-question",
          type: "singleChoice",
          data: {
            text: "Quando você se olha no espelho, como se sente com sua imagem pessoal atualmente?",
            options: [
              { id: "s1a", text: "Me sinto desconectada da mulher que sou hoje", category: "low_confidence" },
              { id: "s1b", text: "Tenho dúvidas sobre o que realmente me valoriza", category: "uncertain" },
              { id: "s1c", text: "Às vezes acerto, às vezes erro", category: "moderate" },
              { id: "s1d", text: "Me sinto segura, mas sei que posso evoluir", category: "confident" }
            ],
            isStrategic: true
          },
          style: {
            backgroundColor: "#ffffff",
            padding: "1.5rem",
            borderRadius: "8px",
            border: "1px solid #e5e7eb"
          }
        }
      ]
    },

    // QUESTÃO 13: O que mais te desafia na hora de se vestir?
    {
      id: "s2",
      title: "O que mais te desafia na hora de se vestir?",
      type: "question" as const,
      progress: 81,
      showHeader: true,
      showProgress: true,
      questionType: "text",
      components: [
        {
          id: "s2-question",
          type: "singleChoice",
          data: {
            text: "O que mais te desafia na hora de se vestir?",
            options: [
              { id: "s2a", text: "Tenho peças, mas não sei como combiná-las", category: "combination" },
              { id: "s2b", text: "Compro por impulso e me arrependo depois", category: "impulse_buying" },
              { id: "s2c", text: "Minha imagem não reflete quem eu sou", category: "identity_mismatch" },
              { id: "s2d", text: "Perco tempo e acabo usando sempre os mesmos looks", category: "routine" }
            ],
            isStrategic: true
          }
        }
      ]
    },

    // QUESTÃO 14: Frequência do "Com que roupa eu vou?"
    {
      id: "s3",
      title: "Com que frequência você se pega pensando...",
      type: "question" as const,
      progress: 84,
      showHeader: true,
      showProgress: true,
      questionType: "text",
      components: [
        {
          id: "s3-question",
          type: "singleChoice",
          data: {
            text: "Com que frequência você se pega pensando: \"Com que roupa eu vou?\" — mesmo com o guarda-roupa cheio?",
            options: [
              { id: "s3a", text: "Quase todos os dias — é sempre uma indecisão", category: "daily_struggle" },
              { id: "s3b", text: "Sempre que tenho um compromisso importante", category: "special_occasions" },
              { id: "s3c", text: "Às vezes, mas me sinto limitada nas escolhas", category: "sometimes_limited" },
              { id: "s3d", text: "Raramente — já me sinto segura ao me vestir", category: "confident" }
            ],
            isStrategic: true
          }
        }
      ]
    },

    // QUESTÃO 15: Interesse em material estratégico
    {
      id: "s4",
      title: "Pense no quanto você já gastou...",
      type: "question" as const,
      progress: 87,
      showHeader: true,
      showProgress: true,
      questionType: "text",
      components: [
        {
          id: "s4-question",
          type: "singleChoice",
          data: {
            text: "Pense no quanto você já gastou com roupas que não usa ou que não representam quem você é...\nVocê acredita que ter acesso a um material estratégico, direto ao ponto, que te ensina a aplicar seu estilo com clareza, faria diferença?",
            options: [
              { id: "s4a", text: "Sim! Se existisse algo assim, eu quero", category: "very_interested" },
              { id: "s4b", text: "Sim, mas teria que ser no momento certo", category: "timing_dependent" },
              { id: "s4c", text: "Tenho dúvidas se funcionaria pra mim", category: "skeptical" },
              { id: "s4d", text: "Não, prefiro continuar como estou", category: "not_interested" }
            ],
            isStrategic: true
          }
        }
      ]
    },

    // QUESTÃO 16: Preço R$ 97,00
    {
      id: "s5",
      title: "Se esse conteúdo completo custasse R$ 97,00...",
      type: "question" as const,
      progress: 90,
      showHeader: true,
      showProgress: true,
      questionType: "text",
      components: [
        {
          id: "s5-question",
          type: "singleChoice",
          data: {
            text: "Se esse conteúdo completo custasse R$ 97,00 — incluindo Guia de Estilo, bônus especiais e um passo a passo prático para transformar sua imagem pessoal — você consideraria um bom investimento?",
            options: [
              { id: "s5a", text: "Sim! Por esse resultado, vale muito", category: "high_value" },
              { id: "s5b", text: "Sim, mas só se eu tiver certeza de que funciona pra mim", category: "need_proof" },
              { id: "s5c", text: "Talvez — depende do que está incluso", category: "need_details" },
              { id: "s5d", text: "Não, ainda não estou pronta para investir", category: "not_ready" }
            ],
            isStrategic: true
          }
        }
      ]
    },

    // QUESTÃO 17: Resultado desejado
    {
      id: "s6",
      title: "Qual desses resultados você mais gostaria de alcançar?",
      type: "question" as const,
      progress: 93,
      showHeader: true,
      showProgress: true,
      questionType: "text",
      components: [
        {
          id: "s6-question",
          type: "singleChoice",
          data: {
            text: "Qual desses resultados você mais gostaria de alcançar com os Guias de Estilo e Imagem?",
            options: [
              { id: "s6a", text: "Montar looks com mais facilidade e confiança", category: "confidence" },
              { id: "s6b", text: "Usar o que já tenho e me sentir estilosa", category: "optimization" },
              { id: "s6c", text: "Comprar com mais consciência e sem culpa", category: "conscious_shopping" },
              { id: "s6d", text: "Ser admirada pela imagem que transmito", category: "recognition" },
              { id: "s6e", text: "Resgatar peças esquecidas e criar novos looks com estilo", category: "creativity" }
            ],
            isStrategic: true
          }
        }
      ]
    },

    // ETAPA 18: Transição 2 - Antes do resultado
    {
      id: "transition2",
      title: "Obrigada por compartilhar...",
      type: "transition" as const,
      progress: 96,
      showHeader: true,
      showProgress: true,
      components: [
        {
          id: "transition2-content",
          type: "text",
          data: {
            text: "Obrigada por compartilhar...\n\nAgora vamos revelar seu resultado personalizado baseado em todas as suas respostas!\n\n✨ Preparando sua análise completa de estilo...",
            fontSize: "1.1rem",
            textAlign: "center",
            color: "#432818",
            lineHeight: "1.6"
          }
        }
      ]
    }
  ];
};
