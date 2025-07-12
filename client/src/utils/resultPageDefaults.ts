
import { ResultPageConfig } from '@/types/resultPageConfig';

export const createDefaultConfig = (styleType: string): ResultPageConfig => {
  return {
    styleType,
    header: {
      visible: true,
      content: {
        title: 'Seu Estilo Predominante',
        subtitle: 'Descubra mais sobre seu estilo único'
      },
      style: {
        paddingY: '24',
        paddingX: '16',
        backgroundColor: '#FAF9F7',
        textColor: '#432818',
        borderRadius: '0'
      }
    },
    mainContent: {
      visible: true,
      content: {
        description: 'Aqui será exibida uma descrição detalhada do seu estilo predominante.',
        mainImage: 'https://placehold.co/600x400?text=Estilo+Predominante',
        showSecondaryStyles: true,
        showOffer: true
      },
      style: {
        padding: '20px',
        backgroundColor: '#FFFFFF',
        textColor: '#432818'
      }
    },
    offer: {
      hero: {
        visible: true,
        content: {
          title: 'Guia de Estilo Personalizado',
          description: 'Adquira seu guia completo com análise detalhada.',
          ctaText: 'Adquirir meu Guia',
          price: 'R$ 67,00'
        },
        style: {
          padding: '24px',
          backgroundColor: '#FAF9F7',
          textColor: '#432818'
        }
      },
      benefits: {
        visible: true,
        content: {},
        style: {}
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
    },
    globalStyles: {
      primaryColor: '#B89B7A',
      secondaryColor: '#432818',
      textColor: '#432818',
      backgroundColor: '#FAF9F7',
      fontFamily: 'Playfair Display, serif'
    },
    blocks: []
  };
};
