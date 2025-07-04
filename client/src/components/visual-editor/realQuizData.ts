// Configurações das questões reais do quiz
export const REAL_QUIZ_QUESTIONS = [
  // Questão 1: QUAL O SEU TIPO DE ROUPA FAVORITA?
  {
    id: 1,
    question: "Qual o seu tipo de roupa favorita?",
    type: "both", // texto + imagem
    multipleSelection: true,
    maxSelections: 3,
    options: [
      {
        id: "natural",
        text: "Conforto, leveza e praticidade no vestir",
        imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/11_hqmr8l.webp",
        value: "natural",
        category: "natural"
      },
      {
        id: "classico",
        text: "Discrição, caimento clássico e sobriedade",
        imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/12_edlmwf.webp",
        value: "classico",
        category: "classico"
      },
      {
        id: "contemporaneo",
        text: "Praticidade com um toque de estilo atual",
        imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/4_snhaym.webp",
        value: "contemporaneo",
        category: "contemporaneo"
      },
      {
        id: "elegante",
        text: "Elegância refinada, moderna e sem exageros",
        imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/14_l2nprc.webp",
        value: "elegante",
        category: "elegante"
      },
      {
        id: "romantico",
        text: "Delicadeza em tecidos suaves e fluidos",
        imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/15_xezvcy.webp",
        value: "romantico",
        category: "romantico"
      },
      {
        id: "sexy",
        text: "Sensualidade com destaque para o corpo",
        imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735316/16_mpqpew.webp",
        value: "sexy",
        category: "sexy"
      },
      {
        id: "dramatico",
        text: "Impacto visual com peças estruturadas e assimétricas",
        imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735319/17_m5ogub.webp",
        value: "dramatico",
        category: "dramatico"
      },
      {
        id: "criativo",
        text: "Mix criativo com formas ousadas e originais",
        imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/18_j8ipfb.webp",
        value: "criativo",
        category: "criativo"
      }
    ]
  },

  // Questão 2: RESUMA A SUA PERSONALIDADE
  {
    id: 2,
    question: "Resuma a sua personalidade:",
    type: "text",
    multipleSelection: true,
    maxSelections: 3,
    options: [
      { id: "natural", text: "Informal, espontânea, alegre, essencialista", value: "natural" },
      { id: "classico", text: "Conservadora, séria, organizada", value: "classico" },
      { id: "contemporaneo", text: "Informada, ativa, prática", value: "contemporaneo" },
      { id: "elegante", text: "Exigente, sofisticada, seletiva", value: "elegante" },
      { id: "romantico", text: "Feminina, meiga, delicada, sensível", value: "romantico" },
      { id: "sexy", text: "Glamorosa, vaidosa, sensual", value: "sexy" },
      { id: "dramatico", text: "Cosmopolita, moderna e audaciosa", value: "dramatico" },
      { id: "criativo", text: "Exótica, aventureira, livre", value: "criativo" }
    ]
  },

  // Questão 3: QUAL VISUAL VOCÊ MAIS SE IDENTIFICA?
  {
    id: 3,
    question: "Qual visual você mais se identifica?",
    type: "both",
    multipleSelection: true,
    maxSelections: 3,
    options: [
      {
        id: "natural",
        text: "Visual leve, despojado e natural",
        imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/2_ziffwx.webp",
        value: "natural"
      },
      {
        id: "classico",
        text: "Visual clássico e tradicional",
        imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/3_asaunw.webp",
        value: "classico"
      },
      {
        id: "contemporaneo",
        text: "Visual casual com toque atual",
        imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/13_uvbciq.webp",
        value: "contemporaneo"
      },
      {
        id: "elegante",
        text: "Visual refinado e imponente",
        imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/5_dhrgpf.webp",
        value: "elegante"
      },
      {
        id: "romantico",
        text: "Visual romântico, feminino e delicado",
        imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/6_gnoxfg.webp",
        value: "romantico"
      },
      {
        id: "sexy",
        text: "Visual sensual, com saia justa e decote",
        imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735327/7_ynez1z.webp",
        value: "sexy"
      },
      {
        id: "dramatico",
        text: "Visual marcante e urbano (jeans + jaqueta)",
        imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/8_yqu3hw.webp",
        value: "dramatico"
      },
      {
        id: "criativo",
        text: "Visual criativo, colorido e ousado",
        imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/9_x6so6a.webp",
        value: "criativo"
      }
    ]
  },

  // Questão 4: QUAIS DETALHES VOCÊ GOSTA?
  {
    id: 4,
    question: "Quais detalhes você gosta?",
    type: "text",
    multipleSelection: true,
    maxSelections: 3,
    options: [
      { id: "natural", text: "Poucos detalhes, básico e prático", value: "natural" },
      { id: "classico", text: "Bem discretos e sutis, clean e clássico", value: "classico" },
      { id: "contemporaneo", text: "Básico, mas com um toque de estilo", value: "contemporaneo" },
      { id: "elegante", text: "Detalhes refinados, chic e que deem status", value: "elegante" },
      { id: "romantico", text: "Detalhes delicados, laços, babados", value: "romantico" },
      { id: "sexy", text: "Roupas que valorizem meu corpo: couro, zíper, fendas", value: "sexy" },
      { id: "dramatico", text: "Detalhes marcantes, firmeza e peso", value: "dramatico" },
      { id: "criativo", text: "Detalhes diferentes do convencional, produções ousadas", value: "criativo" }
    ]
  },

  // Questão 5: QUAIS ESTAMPAS VOCÊ MAIS SE IDENTIFICA?
  {
    id: 5,
    question: "Quais estampas você mais se identifica?",
    type: "both",
    multipleSelection: true,
    maxSelections: 3,
    options: [
      {
        id: "natural",
        text: "Estampas clean, com poucas informações",
        imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735372/20_oh44vh.webp",
        value: "natural"
      },
      {
        id: "classico",
        text: "Estampas clássicas e atemporais",
        imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735368/21_o7wkte.webp",
        value: "classico"
      },
      {
        id: "contemporaneo",
        text: "Atemporais, mas que tenham uma pegada de atual e moderna",
        imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735369/22_siebw2.webp",
        value: "contemporaneo"
      },
      {
        id: "elegante",
        text: "Estampas clássicas e atemporais, mas sofisticadas",
        imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735371/23_bdfxrh.webp",
        value: "elegante"
      },
      {
        id: "romantico",
        text: "Estampas florais e/ou delicadas como bolinhas, borboletas e corações",
        imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735371/24_nptszu.webp",
        value: "romantico"
      },
      {
        id: "sexy",
        text: "Estampas de animal print, como onça, zebra e cobra",
        imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735371/25_motk6b.webp",
        value: "sexy"
      },
      {
        id: "dramatico",
        text: "Estampas geométricas, abstratas e exageradas como grandes poás",
        imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735371/26_dptanw.webp",
        value: "dramatico"
      },
      {
        id: "criativo",
        text: "Estampas diferentes do usual, como africanas, xadrez grandes",
        imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735372/27_wxmklx.webp",
        value: "criativo"
      }
    ]
  },

  // Questão 6: QUAL CASACO É SEU FAVORITO?
  {
    id: 6,
    question: "Qual casaco é seu favorito?",
    type: "both",
    multipleSelection: true,
    maxSelections: 3,
    options: [
      {
        id: "natural",
        text: "Cardigã bege confortável e casual",
        imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735372/29_sdogoy.webp",
        value: "natural"
      },
      {
        id: "classico",
        text: "Blazer verde estruturado",
        imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735372/30_nfth8k.webp",
        value: "classico"
      },
      {
        id: "contemporaneo",
        text: "Trench coat bege tradicional",
        imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735372/31_tcmhcl.webp",
        value: "contemporaneo"
      },
      {
        id: "elegante",
        text: "Blazer branco refinado",
        imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735377/32_h78pd8.webp",
        value: "elegante"
      },
      {
        id: "romantico",
        text: "Casaco pink vibrante e moderno",
        imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735377/33_u8pldd.webp",
        value: "romantico"
      },
      {
        id: "sexy",
        text: "Jaqueta vinho de couro estilosa",
        imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735377/34_peadir.webp",
        value: "sexy"
      },
      {
        id: "dramatico",
        text: "Jaqueta preta estilo rocker",
        imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735379/35_pulzso.webp",
        value: "dramatico"
      },
      {
        id: "criativo",
        text: "Casaco estampado criativo e colorido",
        imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735377/36_cympaq.webp",
        value: "criativo"
      }
    ]
  },

  // Questão 7: QUAL SUA CALÇA FAVORITA?
  {
    id: 7,
    question: "Qual sua calça favorita?",
    type: "both",
    multipleSelection: true,
    maxSelections: 3,
    options: [
      {
        id: "natural",
        text: "Calça fluida acetinada bege",
        imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735419/38_iilv0l.webp",
        value: "natural"
      },
      {
        id: "classico",
        text: "Calça de alfaiataria cinza",
        imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735417/39_arsswu.webp",
        value: "classico"
      },
      {
        id: "contemporaneo",
        text: "Jeans reto e básico",
        imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735419/40_beq52x.webp",
        value: "contemporaneo"
      },
      {
        id: "elegante",
        text: "Calça reta bege de tecido",
        imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735419/41_hconq4.webp",
        value: "elegante"
      },
      {
        id: "romantico",
        text: "Calça ampla rosa alfaiatada",
        imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735420/42_q8xws1.webp",
        value: "romantico"
      },
      {
        id: "sexy",
        text: "Legging preta de couro",
        imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735424/43_ljy7sh.webp",
        value: "sexy"
      },
      {
        id: "dramatico",
        text: "Calça reta preta de couro",
        imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735424/44_nqgvoq.webp",
        value: "dramatico"
      },
      {
        id: "criativo",
        text: "Calça estampada floral leve e ampla",
        imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735425/45_lp64m8.webp",
        value: "criativo"
      }
    ]
  },

  // Questão 8: QUAL DESSES SAPATOS VOCÊ TEM OU MAIS GOSTA?
  {
    id: 8,
    question: "Qual desses sapatos você tem ou mais gosta?",
    type: "both",
    multipleSelection: true,
    maxSelections: 3,
    options: [
      {
        id: "natural",
        text: "Tênis nude casual e confortável",
        imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735426/47_bi6vgf.webp",
        value: "natural"
      },
      {
        id: "classico",
        text: "Scarpin nude de salto baixo",
        imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735427/48_ymo1ur.webp",
        value: "classico"
      },
      {
        id: "contemporaneo",
        text: "Sandália dourada com salto bloco",
        imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735427/49_apcrwa.webp",
        value: "contemporaneo"
      },
      {
        id: "elegante",
        text: "Scarpin nude salto alto e fino",
        imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735428/50_qexxxo.webp",
        value: "elegante"
      },
      {
        id: "romantico",
        text: "Sandália anabela off white",
        imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735428/51_xbgntp.webp",
        value: "romantico"
      },
      {
        id: "sexy",
        text: "Sandália rosa de tiras finas",
        imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735429/52_edlp0e.webp",
        value: "sexy"
      },
      {
        id: "dramatico",
        text: "Scarpin preto moderno com vinil transparente",
        imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735429/53_bfdp6f.webp",
        value: "dramatico"
      },
      {
        id: "criativo",
        text: "Scarpin colorido estampado",
        imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735430/54_xnilkc.webp",
        value: "criativo"
      }
    ]
  },

  // Questão 9: QUE TIPO DE ACESSÓRIOS VOCÊ GOSTA?
  {
    id: 9,
    question: "Que tipo de acessórios você gosta?",
    type: "text",
    multipleSelection: true,
    maxSelections: 3,
    options: [
      { id: "natural", text: "Pequenos e discretos, às vezes nem uso", value: "natural" },
      { id: "classico", text: "Brincos pequenos e discretos. Corrente fininha", value: "classico" },
      { id: "contemporaneo", text: "Acessórios que elevem meu look com um toque moderno", value: "contemporaneo" },
      { id: "elegante", text: "Acessórios sofisticados, joias ou semijoias", value: "elegante" },
      { id: "romantico", text: "Peças delicadas e com um toque feminino", value: "romantico" },
      { id: "sexy", text: "Brincos longos, colares que valorizem minha beleza", value: "sexy" },
      { id: "dramatico", text: "Acessórios pesados, que causem um impacto", value: "dramatico" },
      { id: "criativo", text: "Acessórios diferentes, grandes e marcantes", value: "criativo" }
    ]
  },

  // Questão 10: VOCÊ ESCOLHE CERTOS TECIDOS, PRINCIPALMENTE PORQUE ELES...
  {
    id: 10,
    question: "Você escolhe certos tecidos, principalmente porque eles...",
    type: "text",
    multipleSelection: true,
    maxSelections: 3,
    options: [
      { id: "natural", text: "São fáceis de cuidar", value: "natural" },
      { id: "classico", text: "São de excelente qualidade", value: "classico" },
      { id: "contemporaneo", text: "São fáceis de cuidar e modernos", value: "contemporaneo" },
      { id: "elegante", text: "São sofisticados", value: "elegante" },
      { id: "romantico", text: "São delicados", value: "romantico" },
      { id: "sexy", text: "São perfeitos ao meu corpo", value: "sexy" },
      { id: "dramatico", text: "São diferentes, e trazem um efeito para minha roupa", value: "dramatico" },
      { id: "criativo", text: "São exclusivos, criam identidade no look", value: "criativo" }
    ]
  }
];

// Questões estratégicas (6 questões)
export const STRATEGIC_QUESTIONS = [
  // Questão 1: Como você se vê hoje?
  {
    id: 1,
    question: "Como você se vê hoje?",
    subtitle: "Quando você se olha no espelho, como se sente com sua imagem pessoal atualmente?",
    options: [
      { id: "1", text: "Me sinto desconectada da mulher que sou hoje", value: "disconnected" },
      { id: "2", text: "Tenho dúvidas sobre o que realmente me valoriza", value: "doubtful" },
      { id: "3", text: "Às vezes acerto, às vezes erro", value: "inconsistent" },
      { id: "4", text: "Me sinto segura, mas sei que posso evoluir", value: "confident" }
    ]
  },

  // Questão 2: O que mais te desafia na hora de se vestir?
  {
    id: 2,
    question: "O que mais te desafia na hora de se vestir?",
    options: [
      { id: "1", text: "Tenho peças, mas não sei como combiná-las", value: "combination" },
      { id: "2", text: "Compro por impulso e me arrependo depois", value: "impulse" },
      { id: "3", text: "Minha imagem não reflete quem eu sou", value: "identity" },
      { id: "4", text: "Perco tempo e acabo usando sempre os mesmos looks", value: "repetition" }
    ]
  },

  // Questão 3: Com que frequência você se pega pensando: "Com que roupa eu vou?"
  {
    id: 3,
    question: "Com que frequência você se pega pensando: \"Com que roupa eu vou?\" — mesmo com o guarda-roupa cheio?",
    options: [
      { id: "1", text: "Quase todos os dias — é sempre uma indecisão", value: "daily" },
      { id: "2", text: "Sempre que tenho um compromisso importante", value: "important-events" },
      { id: "3", text: "Às vezes, mas me sinto limitada nas escolhas", value: "sometimes" },
      { id: "4", text: "Raramente — já me sinto segura ao me vestir", value: "rarely" }
    ]
  },

  // Questão 4: Sobre material estratégico
  {
    id: 4,
    question: "Pense no quanto você já gastou com roupas que não usa ou que não representam quem você é...",
    subtitle: "Você acredita que ter acesso a um material estratégico, direto ao ponto, que te ensina a aplicar seu estilo com clareza, faria diferença?",
    options: [
      { id: "1", text: "Sim! Se existisse algo assim, eu quero", value: "yes-want" },
      { id: "2", text: "Sim, mas teria que ser no momento certo", value: "yes-timing" },
      { id: "3", text: "Tenho dúvidas se funcionaria pra mim", value: "doubtful" },
      { id: "4", text: "Não, prefiro continuar como estou", value: "no" }
    ]
  },

  // Questão 5: Sobre investimento R$ 97,00
  {
    id: 5,
    question: "Se esse conteúdo completo custasse R$ 97,00 — incluindo Guia de Estilo, bônus especiais e um passo a passo prático para transformar sua imagem pessoal — você consideraria um bom investimento?",
    options: [
      { id: "1", text: "Sim! Por esse resultado, vale muito", value: "yes-worth" },
      { id: "2", text: "Sim, mas só se eu tiver certeza de que funciona pra mim", value: "yes-certainty" },
      { id: "3", text: "Talvez — depende do que está incluso", value: "maybe" },
      { id: "4", text: "Não, ainda não estou pronta para investir", value: "no-ready" }
    ]
  },

  // Questão 6: Resultados desejados
  {
    id: 6,
    question: "Qual desses resultados você mais gostaria de alcançar com os Guias de Estilo e Imagem?",
    options: [
      { id: "1", text: "Montar looks com mais facilidade e confiança", value: "confidence" },
      { id: "2", text: "Usar o que já tenho e me sentir estilosa", value: "optimize" },
      { id: "3", text: "Comprar com mais consciência e sem culpa", value: "conscious-buying" },
      { id: "4", text: "Ser admirada pela imagem que transmito", value: "admiration" },
      { id: "5", text: "Resgatar peças esquecidas e criar novos looks com estilo", value: "rescue-pieces" }
    ]
  }
];

// Configurações das transições
export const TRANSITIONS = {
  mainTransition: {
    title: "🕐 Enquanto calculamos o seu resultado...",
    message: "Queremos te fazer algumas perguntas que vão tornar sua experiência ainda mais completa.",
    submessage: "A ideia é simples: te ajudar a enxergar com mais clareza onde você está agora — e para onde pode ir com mais intenção, leveza e autenticidade.",
    additionalMessage: "💬 Responda com sinceridade. Isso é só entre você e a sua nova versão."
  },
  finalTransition: {
    title: "Obrigada por compartilhar...",
    message: "Agora vamos preparar seu resultado personalizado com base em todas as suas respostas.",
    showLoading: true,
    duration: 3000
  }
};
