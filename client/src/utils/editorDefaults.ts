
import { BlockType, EditableContent } from '@/types/editor';
import { BorderRadiusType } from '@/types/styleTypes';

export const getDefaultContentForType = (type: BlockType): EditableContent => {
  switch (type) {
    case 'quiz-question':
      return {
        question: 'Etapa 1: Qual dessas opções representa melhor seu estilo predominante?',
        options: [
          { id: '1', text: 'Clássico e elegante', imageUrl: 'https://res.cloudinary.com/dtx0k4ue6/image/upload/v1710847234/estilo-classico_urkpfx.jpg' },
          { id: '2', text: 'Moderno e descolado', imageUrl: 'https://res.cloudinary.com/dtx0k4ue6/image/upload/v1710847235/estilo-moderno_hqxmzv.jpg' },
          { id: '3', text: 'Natural e autêntico', imageUrl: 'https://res.cloudinary.com/dtx0k4ue6/image/upload/v1710847236/estilo-natural_wnxkdi.jpg' },
          { id: '4', text: 'Casual e descontraído' }
        ],
        multipleSelection: true,
        showImages: true,
        maxSelections: 3,
        minSelections: 1,
        progressPercent: 75, // Valor visível para teste
        logoUrl: '/api/placeholder/96/96',
        showBackButton: true,
        optionLayout: 'grid',
        alignment: 'center',
        style: {
          backgroundColor: '#ffffff',
          color: '#432818',
          paddingY: '24px',
          paddingX: '16px',
          borderRadius: 'md' as BorderRadiusType
        }
      };
    case 'headline':
      return {
        title: 'Título Principal',
        subtitle: 'Subtítulo ou descrição',
        alignment: 'center' as const,
        style: {
          backgroundColor: '#ffffff',
          color: '#432818',
          paddingY: '24px',
          paddingX: '16px',
          borderRadius: 'md' as BorderRadiusType
        }
      };
    case 'text':
      return {
        text: 'Descubra como se vestir com confiança e destacar sua personalidade única. Este é o primeiro passo para transformar seu estilo.',
        alignment: 'left' as const,
        style: {
          backgroundColor: '#F9F5F1',
          color: '#8F7A6A',
          paddingY: '16px',
          paddingX: '16px',
          borderRadius: 'md' as BorderRadiusType
        }
      };
    case 'image':
      return {
        imageUrl: 'https://via.placeholder.com/800x400?text=Imagem',
        imageAlt: 'Descrição da imagem',
        alignment: 'center' as const,
        style: {
          paddingY: '16px',
          paddingX: '16px',
          borderRadius: 'md' as BorderRadiusType
        }
      };
    case 'pricing':
      return {
        title: 'Oferta Especial',
        price: 'R$ 197',
        regularPrice: 'R$ 397',
        ctaText: 'Comprar Agora',
        ctaUrl: '#comprar',
        alignment: 'center' as const,
        style: {
          backgroundColor: '#ffffff',
          color: '#432818',
          buttonColor: '#B89B7A',
          paddingY: '24px',
          paddingX: '16px',
          borderRadius: 'md' as BorderRadiusType
        }
      };
    case 'benefits':
      return {
        title: 'Benefícios',
        benefits: [
          'Benefício 1: Descrição do primeiro benefício.',
          'Benefício 2: Descrição do segundo benefício.',
          'Benefício 3: Descrição do terceiro benefício.'
        ],
        alignment: 'left' as const,
        style: {
          backgroundColor: '#ffffff',
          color: '#432818',
          paddingY: '24px',
          paddingX: '16px',
          borderRadius: 'md' as BorderRadiusType
        }
      };
    case 'testimonials':
      return {
        title: 'O que nossos usuários dizem',
        testimonials: [
          {
            id: '1',
            name: 'Ana Silva',
            role: 'Empresária',
            content: 'Este quiz me ajudou a descobrir aspectos sobre minha personalidade que eu não conhecia. Recomendo!',
            rating: 5,
            text: 'Este quiz me ajudou a descobrir aspectos sobre minha personalidade que eu não conhecia. Recomendo!',
            image: 'https://via.placeholder.com/100'
          },
          {
            id: '2',
            name: 'Carlos Santos',
            role: 'Designer',
            content: 'Interface incrível e resultado muito preciso. Compartilhei com todos os meus amigos.',
            rating: 5,
            text: 'Interface incrível e resultado muito preciso. Compartilhei com todos os meus amigos.',
            image: 'https://via.placeholder.com/100'
          },
          {
            id: '3',
            name: 'Maria Costa',
            role: 'Psicóloga',
            content: 'Como profissional da área, posso dizer que este quiz tem uma base sólida e resultados confiáveis.',
            rating: 5,
            text: 'Como profissional da área, posso dizer que este quiz tem uma base sólida e resultados confiáveis.',
            image: 'https://via.placeholder.com/100'
          }
        ],
        alignment: 'center' as const,
        style: {
          backgroundColor: '#F9F5F1',
          color: '#432818',
          paddingY: '24px',
          paddingX: '16px',
          borderRadius: 'md' as BorderRadiusType
        }
      };
    case 'guarantee':
      return {
        title: 'Garantia de Satisfação',
        text: '7 dias de garantia incondicional. Se você não ficar satisfeito, devolvemos seu dinheiro.',
        imageUrl: 'https://via.placeholder.com/200?text=Selo+de+Garantia',
        alignment: 'center' as const,
        style: {
          backgroundColor: '#ffffff',
          color: '#432818',
          paddingY: '24px',
          paddingX: '16px',
          borderRadius: 'md' as BorderRadiusType
        }
      };
    case 'header':
      return {
        title: 'VOCÊ DESCOBRIU SEU ESTILO',
        subtitle: 'Agora é hora de aplicar com clareza — e se vestir de você',
        logo: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
        logoAlt: 'Logo da marca',
        alignment: 'center' as const,
        style: {
          backgroundColor: 'transparent',
          color: '#432818',
          paddingY: '16px',
          paddingX: '16px',
          borderRadius: 'none' as BorderRadiusType
        }
      };
      
    // === COMPONENTES BOXFLEX ETAPA 20 ===
    case 'header-boxflex-inline':
      return {
        logo: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
        funnelName: 'Quiz Gisele',
        isPublished: false
      };
      
    case 'result-main-boxflex-inline':
      return {
        styleName: 'Natural',
        stylePercentage: '85',
        description: 'Você é autêntica e natural',
        image: 'https://dummyimage.com/120x120/aaa/fff.png&text=Estilo'
      };
      
    case 'secondary-styles-boxflex-inline':
      return {
        secondaryStyles: [
          { category: 'Moderno', percentage: 10 },
          { category: 'Romântico', percentage: 5 }
        ]
      };
      
    case 'before-after-boxflex-inline':
      return {
        before: 'Antes: insegurança',
        after: 'Depois: confiança',
        beforeImg: 'https://dummyimage.com/80x80/eee/333.png&text=Antes',
        afterImg: 'https://dummyimage.com/80x80/eee/333.png&text=Depois'
      };
      
    case 'motivation-boxflex-inline':
      return {
        motivationText: 'Vista-se de você — na prática'
      };
      
    case 'bonus-boxflex-inline':
      return {
        bonusList: [
          'Peças-chave do guarda-roupa',
          'Visagismo facial personalizado'
        ]
      };
      
    case 'testimonials-boxflex-inline':
      return {
        testimonials: [
          'Adorei! Mudou completamente minha forma de me vestir',
          'Finalmente entendi meu estilo. Recomendo para todas!'
        ]
      };
      
    case 'cta-green-boxflex-inline':
      return {
        ctaText: 'Quero meu guia agora!'
      };
      
    case 'guarantee-boxflex-inline':
      return {
        guaranteeText: '7 dias de garantia incondicional'
      };
      
    case 'mentor-boxflex-inline':
      return {
        mentorText: 'Gisele Galvão - Especialista em Imagem'
      };
      
    case 'value-stack-boxflex-inline':
      return {
        stackList: [
          'Guia principal - R$67',
          'Peças-chave - R$79', 
          'Visagismo facial - R$29'
        ],
        totalValue: 'R$175,00',
        offerValue: 'R$39,00'
      };
      
    case 'build-info-boxflex-inline':
      return {
        buildInfo: 'v1.0.0 - 2025-01-15'
      };
      
    // === TIPOS ADICIONAIS DE BLOCOS ===
    case 'text-inline':
      return {
        text: 'Este é um texto inline editável. Descubra como personalizar seu estilo de forma única e autêntica.',
        alignment: 'left' as const,
        style: {
          backgroundColor: '#F9F5F1',
          color: '#432818',
          paddingY: '12px',
          paddingX: '16px',
          borderRadius: 'md' as BorderRadiusType
        }
      };
      
    case 'heading-inline':
    case 'result-header':
    case 'result-header-inline':
      return {
        title: 'Parabéns! Seu estilo predominante foi identificado.',
        subtitle: 'Agora você tem clareza sobre sua identidade visual',
        alignment: 'center' as const,
        style: {
          backgroundColor: '#ffffff',
          color: '#432818',
          paddingY: '24px',
          paddingX: '16px',
          borderRadius: 'md' as BorderRadiusType
        }
      };
      
    case 'result-description':
      return {
        text: 'Descubra como se vestir com confiança e destacar sua personalidade única através do seu estilo pessoal.',
        alignment: 'center' as const,
        style: {
          backgroundColor: '#F9F5F1',
          color: '#8F7A6A',
          paddingY: '16px',
          paddingX: '16px',
          borderRadius: 'md' as BorderRadiusType
        }
      };
      
    case 'button-inline':
    case 'cta-button-inline':
      return {
        text: 'Descobrir meu estilo',
        url: '#next-step',
        style: {
          backgroundColor: '#B89B7A',
          color: '#ffffff',
          paddingY: '12px',
          paddingX: '24px',
          borderRadius: 'md' as BorderRadiusType
        }
      };
      
    case 'badge-inline':
      return {
        text: '✨ Resultado Personalizado',
        style: {
          backgroundColor: '#B89B7A',
          color: '#ffffff',
          paddingY: '8px',
          paddingX: '16px',
          borderRadius: 'full' as BorderRadiusType
        }
      };
      
    case 'testimonials-grid':
      return {
        title: 'O que nossos usuários dizem',
        testimonials: [
          {
            id: '1',
            name: 'Ana Silva',
            role: 'Empresária',
            content: 'Este quiz me ajudou a descobrir aspectos sobre minha personalidade que eu não conhecia. Recomendo!',
            rating: 5,
            text: 'Este quiz me ajudou a descobrir aspectos sobre minha personalidade que eu não conhecia. Recomendo!',
            avatar: ''
          },
          {
            id: '2',
            name: 'Carlos Santos',
            role: 'Designer',
            content: 'Interface incrível e resultado muito preciso. Compartilhei com todos os meus amigos.',
            rating: 5,
            text: 'Interface incrível e resultado muito preciso. Compartilhei com todos os meus amigos.',
            avatar: ''
          }
        ],
        gridColumns: 2,
        showRating: true,
        showAvatar: true,
        alignment: 'center' as const,
        style: {
          backgroundColor: '#F9F5F1',
          color: '#432818',
          paddingY: '24px',
          paddingX: '16px',
          borderRadius: 'md' as BorderRadiusType
        }
      };
      
    // Add more default content types as needed
    default:
      return {
        text: 'Descubra sua verdadeira personalidade através do estilo. Este conteúdo personalizado foi criado especialmente para você.',
        alignment: 'left' as const,
        style: {
          paddingY: '16px',
          paddingX: '16px'
        }
      };
  }
};
