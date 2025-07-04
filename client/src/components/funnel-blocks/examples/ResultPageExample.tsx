import React from 'react';
import {
  PrimaryStyleDisplay,
  BeforeAfterSection,
  MotivationSection,
  BonusSection,
  TestimonialsGrid,
  GuaranteeSection,
  MentorSection,
  SalesOffer
} from '../index';

/**
 * ResultPageExample - Exemplo de como reconstruir a ResultPage usando apenas blocos reutilizáveis
 * 
 * Esta implementação demonstra como toda a lógica da ResultPage pode ser
 * quebrada em blocos independentes e reutilizáveis.
 */
export const ResultPageExample: React.FC = () => {
  // Dados mockados - em um caso real viriam das props ou contexto
  const primaryStyleData = {
    category: 'elegante',
    percentage: 85,
    description: 'Seu estilo combina elegância atemporal com sofisticação refinada. Você aprecia peças bem estruturadas e cores neutras.'
  };

  const secondaryStylesData = [
    { category: 'clássico', percentage: 65 },
    { category: 'minimalista', percentage: 45 }
  ];

  const styleImageUrl = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/style-example.webp";
  const guideImageUrl = "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/guide-example.webp";

  const transformationsData = [
    {
      id: "1",
      name: "Adriana",
      combinedImage: "https://res.cloudinary.com/dqljyf76t/image/upload/v1745519979/transformation-1.webp",
      testimonial: "Transformou completamente meu estilo! Me sinto muito mais confiante.",
      results: ["Mais confiança no trabalho", "Economia nas compras", "Estilo definido"]
    },
    {
      id: "2", 
      name: "Mariangela",
      combinedImage: "https://res.cloudinary.com/dqljyf76t/image/upload/v1745522326/transformation-2.webp",
      testimonial: "O quiz foi certeiro! As recomendações são perfeitas.",
      results: ["Look mais harmônico", "Peças que valorizam", "Autoestima elevada"]
    }
  ];

  const motivationData = [
    {
      id: "1",
      title: "Estilo Autêntico",
      description: "Desenvolva um estilo que seja verdadeiramente seu, sem seguir modas passageiras.",
      isHighlighted: true
    },
    {
      id: "2",
      title: "Economia Inteligente",
      description: "Pare de comprar por impulso. Invista apenas no que realmente combina com você."
    },
    {
      id: "3",
      title: "Confiança Renovada",
      description: "Sinta-se poderosa e confiante em qualquer ocasião com looks assertivos."
    }
  ];

  const bonusData = [
    {
      id: "1",
      title: "Guia de Peças-Chave",
      description: "Lista completa das peças essenciais para seu guarda-roupa.",
      imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911668/bonus-1.webp",
      value: "R$ 79,00",
      badge: "Bônus Exclusivo"
    },
    {
      id: "2",
      title: "Guia de Visagismo",
      description: "Descubra os cortes e estilos que mais valorizam seu rosto.",
      imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1745515076/bonus-2.webp", 
      value: "R$ 29,00",
      badge: "Oferta Especial"
    }
  ];

  const testimonialsData = [
    {
      id: "1",
      author: "Maria Silva",
      role: "Empresária",
      text: "Transformou completamente meu guarda-roupa! Agora me sinto muito mais confiante.",
      rating: 5,
      avatar: "https://example.com/avatar1.jpg",
      location: "São Paulo, SP"
    },
    {
      id: "2",
      author: "Ana Santos", 
      role: "Advogada",
      text: "O quiz foi certeiro! As recomendações são perfeitas para meu estilo de vida.",
      rating: 5,
      avatar: "https://example.com/avatar2.jpg",
      location: "Rio de Janeiro, RJ"
    }
  ];

  const mentorData = {
    name: "Gisele Galvão",
    title: "Consultora de Imagem e Estilo",
    description: "Com mais de 10 anos de experiência, já transformou a vida de milhares de mulheres através do poder da imagem.",
    imageUrl: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744911667/gisele-mentor.webp",
    credentials: [
      "Formação em Consultoria de Imagem",
      "Especialização em Visagismo",
      "Certificação Internacional em Personal Styling"
    ],
    achievements: [
      "Mais de 10.000 mulheres atendidas",
      "Reconhecida como Top Consultant 2023",
      "Palestrante em eventos internacionais"
    ],
    experience: "10+ anos transformando vidas através da imagem pessoal"
  };

  const handleCTAClick = () => {
    // Redirecionar para pagamento
    window.location.href = 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912';
  };

  return (
    <div className="min-h-screen bg-[#fffaf7]">
      {/* Estilo primário com progresso */}
      <PrimaryStyleDisplay
        primaryStyle={primaryStyleData}
        secondaryStyles={secondaryStylesData}
        styleImage={styleImageUrl}
        guideImage={guideImageUrl}
        deviceView="desktop"
      />

      {/* Transformações antes/depois */}
      <BeforeAfterSection
        title="Transformações Reais de Nossas Clientes"
        subtitle="Veja como outras mulheres transformaram seu estilo:"
        transformations={transformationsData}
        displayMode="carousel"
        showTestimonials={true}
        showResults={true}
        deviceView="desktop"
      />

      {/* Seção de motivação */}
      <MotivationSection
        title="Por Que Isso Funciona?"
        subtitle="Descubra os motivos pelos quais nossa abordagem transforma vidas:"
        motivations={motivationData}
        layout="grid"
        deviceView="desktop"
        onAction={handleCTAClick}
        actionText="Quero Transformar Meu Estilo"
      />

      {/* Bônus exclusivos */}
      <BonusSection
        title="Bônus Exclusivos para Você"
        subtitle="Além do guia principal, você receberá estas ferramentas complementares:"
        bonuses={bonusData}
        layout="grid"
        columns={2}
        deviceView="desktop"
      />

      {/* Depoimentos */}
      <TestimonialsGrid
        title="O que nossas clientes estão dizendo"
        subtitle="Mais de 10.000 mulheres já transformaram seu estilo"
        testimonials={testimonialsData}
        layout="grid"
        columns={2}
        showRatings={true}
        showAvatars={true}
        cardStyle="elegant"
        deviceView="desktop"
      />

      {/* Oferta principal */}
      <SalesOffer
        title="Transforme Seu Estilo Agora"
        subtitle="Consultoria Personalizada Baseada no Seu Resultado"
        description="Receba um guia completo com seu estilo + bônus exclusivos"
        priceConfig={{
          originalPrice: 'R$ 175,00',
          currentPrice: 'R$ 39,00',
          discount: '78% OFF',
          currency: 'BRL'
        }}
        features={[
          { title: 'Guia de Estilo Personalizado', isIncluded: true },
          { title: 'Guia de Peças-Chave', isIncluded: true },
          { title: 'Guia de Visagismo Facial', isIncluded: true },
          { title: 'Suporte por 30 dias', isIncluded: true },
          { title: 'Garantia de 7 dias', isIncluded: true }
        ]}
        urgencyText="Oferta exclusiva para quem fez o quiz!"
        buttonText="Garantir Meu Guia + Bônus Especiais"
        buttonSubtext="Pagamento único e seguro"
        onPurchase={handleCTAClick}
        deviceView="desktop"
      />

      {/* Garantia */}
      <GuaranteeSection
        title="Garantia de Satisfação Total"
        period="7 dias"
        description="Se você não ficar 100% satisfeita, devolvemos todo seu dinheiro."
        features={[
          { title: 'Reembolso integral em até 7 dias', isIncluded: true },
          { title: 'Sem perguntas ou complicações', isIncluded: true },
          { title: 'Processamento imediato', isIncluded: true }
        ]}
        sealStyle="shield"
        layout="horizontal"
        showIcon={true}
        deviceView="desktop"
      />

      {/* Apresentação da mentora */}
      <MentorSection
        title="Conheça sua Mentora"
        mentor={mentorData}
        layout="horizontal"
        showCredentials={true}
        showAchievements={true}
        deviceView="desktop"
        onAction={handleCTAClick}
        actionText="Quero Começar Minha Transformação"
      />
    </div>
  );
};

export default ResultPageExample;
