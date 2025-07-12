
import { OfferSection } from '@/types/resultPageConfig';

export const createOfferSectionConfig = (): OfferSection => {
  return {
    hero: {
      visible: true,
      content: {
        title: 'Guia de Estilo e Imagem Personalizado',
        description: 'Adquira seu guia completo com análise detalhada, paleta de cores personalizada e recomendações específicas.',
        ctaText: 'Adquirir meu Guia de Estilo',
        price: 'R$ 67,00',
        regularPrice: 'R$ 97,00'
      },
      style: {
        padding: '24px',
        backgroundColor: '#FAF9F7',
        textColor: '#432818'
      }
    },
    benefits: {
      visible: true,
      content: {
        title: 'O que você vai receber:',
        items: [
          'Análise detalhada do seu estilo pessoal',
          'Paleta de cores personalizada',
          'Guia de peças essenciais',
          'Dicas de tecidos e modelagens'
        ]
      },
      style: {
        padding: '20px'
      }
    },
    products: {
      visible: true,
      content: {},
      style: {}
    },
    pricing: {
      visible: true,
      content: {},
      style: {}
    },
    testimonials: {
      visible: true,
      content: {},
      style: {}
    },
    guarantee: {
      visible: true,
      content: {},
      style: {}
    }
  };
};
