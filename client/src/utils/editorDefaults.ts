
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
      
    // === DEFAULTS PARA TODOS OS COMPONENTES INLINE ===
    case 'header':
    case 'result-header':
    case 'quiz-intro-header':
    case 'vertical-canvas-header':
    case 'result-header-inline':
    case 'step-header-inline':
    case 'section-header-inline':
    case 'sticky-header-inline':
    case 'hero-title-inline':
    case 'quiz-title':
    case 'quiz-result-header':
    case 'quiz-offer-title':
      return {
        title: 'Título do Componente',
        subtitle: 'Subtítulo opcional',
        alignment: 'center' as const,
        style: {
          backgroundColor: '#ffffff',
          color: '#432818',
          paddingY: '16px',
          paddingX: '16px',
          borderRadius: 'md' as BorderRadiusType
        }
      };

    case 'text':
    case 'result-description':
    case 'text-inline':
    case 'heading-inline':
      return {
        text: 'Texto do componente. Este é um exemplo de conteúdo.',
        alignment: 'left' as const,
        style: {
          paddingY: '12px',
          paddingX: '16px'
        }
      };

    case 'button':
    case 'button-inline':
    case 'cta-button-inline':
      return {
        text: 'Clique Aqui',
        variant: 'primary',
        size: 'medium',
        backgroundColor: '#B89B7A',
        textColor: '#ffffff'
      };

    case 'image':
    case 'image-display-inline':
    case 'strategic-question-image':
      return {
        src: 'https://via.placeholder.com/400x300',
        alt: 'Imagem do componente',
        width: 400,
        height: 300
      };

    case 'spacer':
    case 'divider-inline':
      return {
        height: 32,
        backgroundColor: 'transparent'
      };

    case 'form-input':
    case 'quiz-name-input':
      return {
        label: 'Campo de Input',
        placeholder: 'Digite aqui...',
        type: 'text',
        required: false
      };

    case 'list':
    case 'problem-list-inline':
    case 'bonus-list-inline':
      return {
        items: ['Item 1', 'Item 2', 'Item 3'],
        listStyle: 'bullet'
      };

    case 'badge-inline':
    case 'hero-badge-inline':
    case 'highlight-box-inline':
    case 'guarantee-seal-inline':
      return {
        text: 'Badge',
        backgroundColor: '#10b981',
        textColor: '#ffffff'
      };

    case 'progress-inline':
    case 'quiz-progress':
      return {
        percentage: 75,
        showText: true,
        color: '#B89B7A'
      };

    case 'style-card-inline':
    case 'result-card-inline':
    case 'product-card-inline':
    case 'pricing-card-inline':
    case 'quiz-result-card':
      return {
        title: 'Card de Componente',
        description: 'Descrição do card',
        price: 'R$ 97,00',
        features: ['Recurso 1', 'Recurso 2', 'Recurso 3']
      };

    case 'testimonial-card-inline':
      return {
        name: 'Nome do Cliente',
        text: 'Depoimento sobre o produto...',
        rating: 5,
        image: 'https://via.placeholder.com/100x100'
      };

    case 'countdown-inline':
    case 'countdown-timer-inline':
    case 'quiz-offer-countdown':
      return {
        minutes: 15,
        title: 'Tempo restante:'
      };

    case 'stat-inline':
      return {
        number: '100+',
        label: 'Clientes Satisfeitos'
      };

    case 'loading-animation':
      return {
        text: 'Carregando...',
        duration: 3000
      };

    case 'options-grid':
      return {
        options: [
          { id: '1', text: 'Opção 1' },
          { id: '2', text: 'Opção 2' },
          { id: '3', text: 'Opção 3' }
        ],
        columns: 2,
        multipleSelection: true
      };

    case 'quiz-offer-pricing-inline':
    case 'price-highlight-inline':
      return {
        originalPrice: 'R$ 197,00',
        currentPrice: 'R$ 97,00',
        discount: '50% OFF'
      };

    case 'before-after-inline':
      return {
        beforeImage: 'https://via.placeholder.com/300x200',
        afterImage: 'https://via.placeholder.com/300x200',
        title: 'Antes e Depois'
      };

    case 'strategic-question-main':
    case 'strategic-question-inline':
      return {
        question: 'Pergunta estratégica?',
        options: [
          { id: '1', text: 'Opção A' },
          { id: '2', text: 'Opção B' }
        ]
      };

    case 'QuizQuestionBlock':
    case 'QuestionMultipleBlock':
    case 'StrategicQuestionBlock':
      return {
        question: 'Qual é sua pergunta?',
        options: [
          { id: '1', text: 'Resposta 1' },
          { id: '2', text: 'Resposta 2' }
        ],
        multipleSelection: false
      };

    case 'QuizTransitionBlock':
      return {
        title: 'Transição',
        message: 'Preparando próxima etapa...'
      };

    case 'ResultPageBlock':
      return {
        title: 'Seu Resultado',
        description: 'Aqui está seu resultado personalizado.'
      };

    case 'product-offer':
    case 'urgency-timer':
    case 'faq-section':
    case 'faq-item-inline':
    case 'quiz-offer-faq':
      return {
        title: 'Título da Seção',
        content: 'Conteúdo da seção...'
      };

    case 'video-player':
      return {
        url: 'https://www.youtube.com/watch?v=example',
        thumbnail: 'https://via.placeholder.com/640x360'
      };

    case 'trust-elements-inline':
      return {
        elements: ['✅ Seguro', '✅ Garantido', '✅ Confiável']
      };

    case 'hero-section':
    case 'bonus-carousel':
    case 'headline':
    case 'benefits':
    case 'pricing':
    case 'quiz-result-display':
    case 'style-result':
    case 'secondary-styles':
    case 'bonus':
      return {
        title: 'Componente Modular',
        content: 'Conteúdo do componente modular.'
      };

    // === NOVOS COMPONENTES MODULARES MANTIDOS ===
    case 'result-page-header':
      return {
        logoUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
        logoAlt: 'Logo',
        progressPercentage: 100,
        progressText: 'Quiz Completo!',
        userName: 'Usuário',
        userStyle: 'Clássico Elegante',
        backgroundColor: '#ffffff',
        textColor: '#333333'
      };

    case 'style-result-card':
      return {
        mainStyleName: 'Clássico Elegante',
        mainStyleDescription: 'Você tem um gosto refinado e aprecia peças atemporais.',
        mainStyleImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/style-classic.jpg',
        progressPercentage: 85,
        secondaryStyle1: 'Moderno Minimalista',
        secondaryStyle1Percentage: 65,
        secondaryStyle2: 'Boêmio Chic',
        secondaryStyle2Percentage: 45,
        guideTitle: 'Seu Guia de Estilo Personalizado',
        backgroundColor: '#f8f9fa'
      };

    case 'result-cta':
      return {
        mainTitle: 'Descubra Seu Estilo Completo',
        subtitle: 'Acesse seu guia personalizado agora!',
        valueItem1: 'Análise completa do seu perfil',
        valueItem2: 'Recomendações personalizadas',
        valueItem3: 'Guia de compras exclusivo',
        originalPrice: 'R$ 197,00',
        currentPrice: 'R$ 97,00',
        ctaText: 'QUERO MEU GUIA AGORA',
        ctaUrl: '/checkout',
        securityText: 'Compra 100% Segura',
        backgroundColor: '#ffffff',
        ctaColor: '#007bff'
      };

    case 'offer-header':
      return {
        logoUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
        logoAlt: 'Logo',
        countdownTitle: 'Oferta por tempo limitado!',
        countdownMinutes: 15,
        mainTitle: 'OFERTA ESPECIAL PARA VOCÊ!',
        subtitle: 'Seu Guia de Estilo Personalizado',
        description: 'Com base no seu resultado, preparamos uma oferta exclusiva.',
        heroImageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744916217/offer-hero.jpg',
        backgroundColor: '#f8f9fa',
        titleColor: '#dc3545'
      };

    case 'product-showcase':
      return {
        sectionTitle: 'O que você vai receber:',
        product1Name: 'Guia de Estilo Personalizado',
        product1Image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911687/product1.jpg',
        product1Price: 'R$ 97,00',
        product1Benefits: 'Análise completa do seu perfil\nRecomendações personalizadas\nGuia de compras',
        product2Name: 'Consultoria de Estilo Online',
        product2Image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745515076/product2.jpg',
        product2Price: 'R$ 197,00',
        product2Benefits: 'Sessão individual\nPlano personalizado\nSuporte contínuo',
        totalValue: 'R$ 294,00',
        backgroundColor: '#ffffff'
      };

    case 'offer-cta':
      return {
        urgencyText: '🔥 ÚLTIMAS VAGAS DISPONÍVEIS!',
        discountText: 'DESCONTO ESPECIAL DE 70%',
        originalPrice: 'R$ 294,00',
        discountPrice: 'R$ 87,00',
        installments: 'ou 3x de R$ 29,00',
        ctaText: 'SIM, QUERO APROVEITAR ESTA OFERTA!',
        ctaUrl: '/checkout',
        guaranteeText: '✅ Garantia de 30 dias',
        securityText: '🔒 Compra 100% Segura',
        backgroundColor: '#f8f9fa',
        ctaColor: '#28a745',
        urgencyColor: '#dc3545'
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
