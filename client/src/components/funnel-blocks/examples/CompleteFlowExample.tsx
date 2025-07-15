import React from 'react';
import {
  IntroPage,
  QuizQuestion,
  QuizTransition,
  StrategicQuestion,
  PrimaryStyleDisplay,
  BeforeAfterSection,
  MotivationSection,
  BonusSection,
  TestimonialsGrid,
  SalesOffer,
  GuaranteeSection,
  MentorSection,
  VideoSection,
  FeatureHighlight,
  CountdownTimer,
  FAQSection,
  SocialProof
} from '@/components/funnel-blocks';

/**
 * EXEMPLO COMPLETO: RECONSTRUÇÃO DO FUNIL REAL COM COMPONENTES REUTILIZÁVEIS
 * 
 * Este exemplo demonstra como cada etapa do funil original pode ser 
 * reconstruída pixel-perfect usando apenas os blocos reutilizáveis.
 */

// ETAPA 1: INTRODUÇÃO
export const Step1_Introduction = () => (
  <IntroPage
    title="Descubra Seu Estilo Pessoal"
    subtitle="Chega de guarda-roupa lotado sem ter o que vestir"
    logoUrl="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp"
    backgroundImage="https://res.cloudinary.com/dqljyf76t/image/upload/v1745193445/4fb35a75-02dd-40b9-adae-854e90228675_ibkrmt.webp"
    showNameInput={true}
    buttonText="Começar Quiz"
    className="min-h-screen"
    onSubmit={(data) => console.log('Nome:', data.name)}
  />
);

// ETAPA 2: PRIMEIRA QUESTÃO - ROUPA FAVORITA
export const Step2_FirstQuestion = () => (
  <QuizQuestion
    question="Qual o seu tipo de roupa favorita?"
    questionNumber={1}
    totalQuestions={10}
    options={[
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
    ]}
    multipleSelection={true}
    maxSelections={3}
    optionStyle="card"
    showLetters={true}
    progressConfig={{
      showProgress: true,
      progressValue: 10, // (1/10) * 100
      currentStep: 1,
      totalSteps: 10
    }}
    onAnswer={(answers) => console.log('Respostas Q1:', answers)}
  />
);

// ETAPA 3: SEGUNDA QUESTÃO - PERSONALIDADE
export const Step3_PersonalityQuestion = () => (
  <QuizQuestion
    question="Resuma a sua personalidade:"
    questionNumber={2}
    totalQuestions={10}
    options={[
      { id: "natural", text: "Informal, espontânea, alegre, essencialista", value: "natural" },
      { id: "classico", text: "Conservadora, séria, organizada", value: "classico" },
      { id: "contemporaneo", text: "Informada, ativa, prática", value: "contemporaneo" },
      { id: "elegante", text: "Exigente, sofisticada, seletiva", value: "elegante" },
      { id: "romantico", text: "Feminina, meiga, delicada, sensível", value: "romantico" },
      { id: "sexy", text: "Glamorosa, vaidosa, sensual", value: "sexy" },
      { id: "dramatico", text: "Cosmopolita, moderna e audaciosa", value: "dramatico" },
      { id: "criativo", text: "Exótica, aventureira, livre", value: "criativo" }
    ]}
    multipleSelection={true}
    maxSelections={3}
    optionStyle="list"
    progressConfig={{
      showProgress: true,
      progressValue: 20,
      currentStep: 2,
      totalSteps: 10
    }}
    onAnswer={(answers) => console.log('Respostas Q2:', answers)}
  />
);

// ETAPAS 4-11: Demais questões seguem o mesmo padrão...
// (Omitidas para brevidade, mas todas seguem a mesma estrutura)

// ETAPA 12: TRANSIÇÃO PARA QUESTÕES ESTRATÉGICAS
export const Step12_TransitionToStrategic = () => (
  <QuizTransition
    title="🕐 Enquanto calculamos o seu resultado..."
    message="Queremos te fazer algumas perguntas que vão tornar sua experiência ainda mais completa."
    submessage="A ideia é simples: te ajudar a enxergar com mais clareza onde você está agora — e para onde pode ir com mais intenção, leveza e autenticidade."
    icon="🎯"
    showLoading={true}
    duration={5000}
    showContinueButton={true}
    buttonText="Continuar"
    onComplete={() => console.log('Iniciando questões estratégicas')}
  />
);

// ETAPA 13: PRIMEIRA QUESTÃO ESTRATÉGICA
export const Step13_StrategicQuestion1 = () => (
  <StrategicQuestion
    question="Como você se vê hoje?"
    subtitle="Quando você se olha no espelho, como se sente com sua imagem pessoal atualmente?"
    options={[
      { id: "1", text: "Me sinto desconectada da mulher que sou hoje", value: "disconnected" },
      { id: "2", text: "Tenho dúvidas sobre o que realmente me valoriza", value: "doubtful" },
      { id: "3", text: "Às vezes acerto, às vezes erro", value: "inconsistent" },
      { id: "4", text: "Me sinto segura, mas sei que posso evoluir", value: "confident" }
    ]}
    questionNumber={1}
    totalQuestions={6}
    onAnswer={(answer) => console.log('Resposta estratégica 1:', answer)}
  />
);

// ETAPAS 14-18: Demais questões estratégicas seguem o mesmo padrão...

// ETAPA 19: TRANSIÇÃO FINAL
export const Step19_FinalTransition = () => (
  <QuizTransition
    title="Obrigada por compartilhar..."
    message="Agora vamos preparar seu resultado personalizado com base em todas as suas respostas."
    showLoading={true}
    duration={3000}
    onComplete={() => console.log('Resultado pronto')}
  />
);

// ETAPA 20: PÁGINA DE RESULTADO (TESTE A)
export const Step20_ResultPageA = () => (
  <div className="result-page space-y-12">
    {/* Estilo Principal */}
    <PrimaryStyleDisplay
      primaryStyle={{
        name: "Elegante",
        description: "Seu estilo é sofisticado e refinado",
        percentage: 65,
        category: "elegante"
      }}
      secondaryStyles={[
        { name: "Clássico", percentage: 20 },
        { name: "Contemporâneo", percentage: 15 }
      ]}
      styleImage="https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/14_l2nprc.webp"
      guideImage="https://res.cloudinary.com/dqljyf76t/image/upload/v1745071347/MOCKUP_TABLETE_-_GUIA_DE_IMAGEM_E_ESTILO_ncctzi.webp"
      onDownloadGuide={() => console.log('Download do guia')}
    />

    {/* Transformações Antes/Depois */}
    <BeforeAfterSection
      title="Veja as Transformações Reais"
      transformations={[
        {
          id: "1",
          beforeImage: "https://res.cloudinary.com/dqljyf76t/image/upload/v1746334756/ChatGPT_Image_4_de_mai._de_2025_01_42_42_jlugsc.webp",
          afterImage: "https://res.cloudinary.com/dqljyf76t/image/upload/v1746334754/ChatGPT_Image_4_de_mai._de_2025_00_30_44_naqom0.webp",
          description: "Cliente descobriu seu estilo e agora se veste com confiança"
        }
      ]}
    />

    {/* Motivação */}
    <MotivationSection
      title="Sua jornada começa agora"
      motivations={[
        "Descubra quais peças realmente combinam com você",
        "Monte looks incríveis com o que já tem no guarda-roupa",
        "Compre com consciência e pare de errar nas escolhas"
      ]}
    />

    {/* Bônus */}
    <BonusSection
      title="Bônus Exclusivos"
      bonuses={[
        {
          id: "1",
          title: "Guia de Peças-Chave",
          description: "Lista completa das peças essenciais para seu estilo",
          value: "R$ 47,00",
          image: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911687/C%C3%B3pia_de_MOCKUPS_12_w8fwrn.webp"
        }
      ]}
    />

    {/* Depoimentos */}
    <TestimonialsGrid
      title="O que nossas clientes dizem"
      testimonials={[
        {
          id: "1",
          author: "Maria Silva",
          text: "Finalmente descobri meu estilo! Agora me visto com confiança.",
          rating: 5,
          avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b55c?w=64&h=64&fit=crop&crop=face"
        }
      ]}
    />

    {/* Oferta Principal */}
    <SalesOffer
      title="Transforme Seu Estilo Agora"
      subtitle="Acesso completo aos Guias de Estilo e Imagem Pessoal"
      priceConfig={{
        originalPrice: "R$ 175,00",
        currentPrice: "R$ 39,00",
        discount: "78% OFF",
        installments: { quantity: 3, value: "R$ 13,00" }
      }}
      features={[
        "Guia do seu estilo personalizado",
        "Dicas de como usar cada peça",
        "Combinações perfeitas para seu tipo físico"
      ]}
      buttonText="Quero Meu Guia de Estilo"
      onPurchase={() => console.log('Compra iniciada')}
    />

    {/* Garantia */}
    <GuaranteeSection
      title="Garantia de 7 dias"
      description="Se não ficar satisfeita, devolvemos seu dinheiro"
      period="7 dias"
      image="https://res.cloudinary.com/dqljyf76t/image/upload/v1744916216/C%C3%B3pia_de_01._P%C3%A1gina_-_Produto_de_Entrada_2_hamaox.webp"
    />

    {/* Mentora */}
    <MentorSection
      name="Gisele Galvão"
      title="Especialista em Imagem Pessoal"
      description="Mais de 10 anos transformando a autoestima de mulheres através do estilo."
      image="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911667/WhatsApp_Image_2025-04-02_at_09.40.53_cv8p5y.webp"
      credentials={[
        "Consultora de Imagem certificada",
        "Mais de 1000 clientes atendidas",
        "Especialista em styling pessoal"
      ]}
    />
  </div>
);

// ETAPA 21: QUIZ DESCUBRA SEU ESTILO (TESTE B)
export const Step21_QuizOfferPageB = () => (
  <div className="quiz-offer-page space-y-16">
    {/* Introdução */}
    <IntroPage
      title="Transforme Seu Estilo com Confiança"
      subtitle="Da confusão no guarda-roupa à clareza total"
      logoUrl="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp"
      showNameInput={false}
      buttonText="Descobrir Agora"
    />

    {/* Problemas */}
    <MotivationSection
      title="Você está cansada de..."
      motivations={[
        "Guarda-roupa cheio mas 'sem nada para vestir'",
        "Comprar peças que nunca usa",
        "Se sentir insegura com suas escolhas",
        "Perder tempo decidindo o que vestir"
      ]}
      variant="problems"
    />

    {/* Vídeo Demonstrativo */}
    <VideoSection
      title="Veja Como Funciona"
      description="Descubra como nossos guias vão transformar seu estilo"
      videoUrl="demo-video-url"
      thumbnail="https://res.cloudinary.com/dqljyf76t/image/upload/v1746650306/oie_1_gcozz9.webp"
      autoplay={false}
      controls={true}
    />

    {/* Benefícios dos Guias */}
    <FeatureHighlight
      title="O que você vai receber"
      features={[
        {
          id: "1",
          title: "Guia Personalizado do Seu Estilo",
          description: "Descubra qual é realmente seu estilo e como aplicar no dia a dia",
          icon: "✨"
        },
        {
          id: "2", 
          title: "Dicas de Combinações",
          description: "Monte looks incríveis com as peças que você já tem",
          icon: "👗"
        },
        {
          id: "3",
          title: "Lista de Peças Essenciais",
          description: "Saiba exatamente o que comprar para seu guarda-roupa",
          icon: "📝"
        }
      ]}
    />

    {/* Bônus */}
    <BonusSection
      title="Bônus Exclusivos"
      bonuses={[
        {
          id: "1",
          title: "Guia de Peças-Chave",
          description: "As peças fundamentais para cada estilo",
          value: "R$ 47,00",
          image: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911687/C%C3%B3pia_de_MOCKUPS_12_w8fwrn.webp"
        },
        {
          id: "2",
          title: "Guia de Visagismo",
          description: "Descubra cortes e cores ideais para seu rosto",
          value: "R$ 37,00",
          image: "https://res.cloudinary.com/dqljyf76t/image/upload/v1745515076/C%C3%B3pia_de_MOCKUPS_10_-_Copia_bvoccn.webp"
        }
      ]}
    />

    {/* Transformações */}
    <BeforeAfterSection
      title="Transformações Reais"
      subtitle="Veja os resultados de quem aplicou nossos guias"
      transformations={[
        {
          id: "1",
          beforeImage: "https://res.cloudinary.com/dqljyf76t/image/upload/v1746334756/ChatGPT_Image_4_de_mai._de_2025_01_42_42_jlugsc.webp",
          afterImage: "https://res.cloudinary.com/dqljyf76t/image/upload/v1746334754/ChatGPT_Image_4_de_mai._de_2025_00_30_44_naqom0.webp",
          description: "Ana descobriu seu estilo e ganhou confiança"
        }
      ]}
    />

    {/* Depoimentos */}
    <TestimonialsGrid
      title="Histórias de Transformação"
      testimonials={[
        {
          author: "Carla Santos",
          text: "Mudou completamente minha relação com a moda. Agora me visto com propósito!",
          rating: 5,
          role: "Empresária"
        }
      ]}
    />

    {/* Oferta Principal com Urgência */}
    <div className="space-y-8">
      <CountdownTimer
        endTime={new Date(Date.now() + 24 * 60 * 60 * 1000)} // 24h
        urgencyText="Oferta especial expira em:"
        onExpire={() => console.log('Oferta expirou')}
      />
      
      <SalesOffer
        title="Acesso Completo por Apenas"
        priceConfig={{
          originalPrice: "R$ 175,00",
          currentPrice: "R$ 97,00",
          discount: "45% OFF",
          installments: { quantity: 12, value: "R$ 9,70" }
        }}
        features={[
          "Guia completo do seu estilo",
          "Bônus: Guia de Peças-Chave",
          "Bônus: Guia de Visagismo",
          "Suporte por WhatsApp",
          "Acesso vitalício"
        ]}
        buttonText="Quero Transformar Meu Estilo"
        highlightOffer={true}
        onPurchase={() => console.log('Compra B iniciada')}
      />
    </div>

    {/* Garantia */}
    <GuaranteeSection
      title="Garantia Incondicional"
      description="7 dias para testar. Não gostou? Devolvemos seu dinheiro."
      period="7 dias"
      image="https://res.cloudinary.com/dqljyf76t/image/upload/v1744916216/C%C3%B3pia_de_01._P%C3%A1gina_-_Produto_de_Entrada_2_hamaox.webp"
    />

    {/* Mentora */}
    <MentorSection
      name="Gisele Galvão"
      title="Consultora de Imagem e Estilo"
      description="Especialista em transformar a autoestima feminina através do estilo pessoal."
      image="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911667/WhatsApp_Image_2025-04-02_at_09.40.53_cv8p5y.webp"
      credentials={[
        "10+ anos de experiência",
        "1000+ mulheres transformadas",
        "Método exclusivo de styling"
      ]}
    />

    {/* FAQ */}
    <FAQSection
      title="Dúvidas Frequentes"
      faqs={[
        {
          id: "1",
          question: "Como funciona o guia personalizado?",
          answer: "Baseado nas suas respostas do quiz, criamos um guia específico para seu estilo com dicas práticas de como aplicar no dia a dia."
        },
        {
          id: "2",
          question: "Posso usar as dicas mesmo tendo poucas roupas?",
          answer: "Sim! O guia ensina como maximizar as peças que você já tem e quais são realmente essenciais para investir."
        }
      ]}
    />

    {/* Prova Social */}
    <SocialProof
      stats={[
        { number: "1000+", label: "Mulheres transformadas" },
        { number: "4.9/5", label: "Avaliação média" },
        { number: "95%", label: "Satisfação dos clientes" }
      ]}
    />
  </div>
);

/**
 * CONFIGURAÇÃO PARA USO NO EDITOR AVANÇADO
 * 
 * Este é o formato que o editor avançado deve usar para renderizar
 * cada etapa do funil usando os componentes reutilizáveis.
 */
export const funnelConfiguration = {
  steps: [
    {
      id: 'intro',
      component: 'IntroPage',
      props: {
        title: "Descubra Seu Estilo Pessoal",
        subtitle: "Chega de guarda-roupa lotado sem ter o que vestir",
        showNameInput: true,
        logoUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp"
      }
    },
    {
      id: 'question-1',
      component: 'QuizQuestion',
      props: {
        question: "Qual o seu tipo de roupa favorita?",
        questionNumber: 1,
        totalQuestions: 10,
        multipleSelection: true,
        maxSelections: 3,
        options: [/* todas as opções com imagens */]
      }
    },
    // ... todas as outras etapas seguem o mesmo padrão
  ],
  
  // Configurações de AB Testing
  variants: {
    resultPage: 'Step20_ResultPageA',
    offerPage: 'Step21_QuizOfferPageB'
  }
};

export default {
  Step1_Introduction,
  Step2_FirstQuestion,
  Step3_PersonalityQuestion,
  Step12_TransitionToStrategic,
  Step13_StrategicQuestion1,
  Step19_FinalTransition,
  Step20_ResultPageA,
  Step21_QuizOfferPageB,
  funnelConfiguration
};
