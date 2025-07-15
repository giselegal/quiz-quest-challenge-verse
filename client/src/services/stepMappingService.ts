/**
 * Step Mapping Service
 * Fixes the critical disconnect between editor steps and production pages
 */

import { STEP_TO_ROUTE_MAPPING, getStepByNumber, isResultPageStep, isOfferPageStep } from '../data/pageRouteMapping';
import type { SchemaDrivenPageData } from './schemaDrivenFunnelService';

/**
 * CRITICAL FIXES FOR STEPS 20 & 21:
 * - Step 20 should represent /resultado (ResultPage.tsx)
 * - Step 21 should represent /quiz-descubra-seu-estilo (QuizDescubraSeuEstilo.tsx)
 */

// Map result page blocks to editor-compatible blocks
export const mapResultPageToBlocks = (): any[] => {
  return [
    {
      id: 'result-hero-section',
      type: 'result-header',
      componentType: 'result-header',
      props: {
        title: 'Seu estilo é...',
        subtitle: '{styleName}',
        description: 'Baseado nas suas respostas, identificamos seu estilo dominante.',
        showUserName: true,
        userName: '{userName}',
        styleName: '{primaryStyle.name}',
        backgroundColor: '#FFFBF7'
      },
      editable: true,
      category: 'result'
    },
    {
      id: 'result-style-card',
      type: 'result-card',
      componentType: 'result-card', 
      props: {
        title: '{primaryStyle.name}',
        description: '{primaryStyle.description}',
        image: '{primaryStyle.image}',
        characteristics: '{primaryStyle.characteristics}',
        showImage: true,
        alignment: 'center'
      },
      editable: true,
      category: 'result'
    },
    {
      id: 'secondary-styles-section',
      type: 'secondary-styles',
      componentType: 'secondary-styles',
      props: {
        title: 'Seus estilos secundários',
        styles: '{secondaryStyles}',
        showImages: true,
        maxStyles: 3,
        layout: 'grid'
      },
      editable: true,
      category: 'result'
    },
    {
      id: 'result-cta',
      type: 'button',
      componentType: 'button',
      props: {
        text: 'Quero descobrir mais sobre meu estilo',
        url: '/quiz-descubra-seu-estilo',
        style: 'primary',
        size: 'large',
        fullWidth: true,
        backgroundColor: '#B89B7A',
        textColor: '#FFFFFF'
      },
      editable: true,
      category: 'interactive'
    }
  ];
};

// Map offer page blocks to editor-compatible blocks
export const mapOfferPageToBlocks = (): any[] => {
  return [
    {
      id: 'offer-hero',
      type: 'main-heading',
      componentType: 'main-heading',
      props: {
        title: 'Transforme Seu Estilo Pessoal',
        subtitle: 'Guia Completo Personalizado para {userName}',
        alignment: 'center',
        fontSize: 'large',
        textColor: '#432818'
      },
      editable: true,
      category: 'layout'
    },
    {
      id: 'offer-image',
      type: 'image-display',
      componentType: 'image-display',
      props: {
        src: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744921098/Espanhol_Portugu%C3%AAs_5_cptzyb.webp',
        alt: 'Guia de Estilo Personalizado',
        width: '100%',
        height: 'auto',
        alignment: 'center'
      },
      editable: true,
      category: 'media'
    },
    {
      id: 'offer-pricing',
      type: 'pricing-card',
      componentType: 'pricing-card',
      props: {
        title: 'Oferta Especial',
        originalPrice: 'R$ 197,00',
        currentPrice: 'R$ 97,00',
        savings: 'R$ 100,00',
        installments: '12x de R$ 9,70',
        features: [
          'Análise completa do seu estilo',
          'Guia de combinações personalizadas', 
          'Dicas de compras inteligentes',
          'Acesso vitalício ao conteúdo'
        ],
        guarantee: '7 dias de garantia total'
      },
      editable: true,
      category: 'conversion'
    },
    {
      id: 'urgency-countdown',
      type: 'countdown',
      componentType: 'countdown',
      props: {
        title: 'Oferta por tempo limitado!',
        endTime: '2024-12-31T23:59:59',
        showDays: false,
        showHours: true,
        showMinutes: true,
        showSeconds: true,
        onExpire: 'redirect'
      },
      editable: true,
      category: 'conversion'
    },
    {
      id: 'social-proof',
      type: 'testimonial-card',
      componentType: 'testimonial-card',
      props: {
        testimonials: [
          {
            name: 'Mariangela',
            role: 'Engenheira',
            text: 'Antes, a roupa me vestia. Hoje, eu me visto de propósito.',
            rating: 5
          },
          {
            name: 'Patrícia Paranhos',
            role: 'Advogada', 
            text: 'Aprendi a me valorizar e a dar valor para a imagem que transmito.',
            rating: 5
          }
        ],
        layout: 'grid',
        showRating: true
      },
      editable: true,
      category: 'social-proof'
    },
    {
      id: 'final-cta',
      type: 'button',
      componentType: 'button',
      props: {
        text: 'QUERO TRANSFORMAR MEU ESTILO AGORA',
        url: 'https://pay.hotmart.com/W98977034C?checkoutMode=10',
        style: 'primary',
        size: 'large',
        fullWidth: true,
        backgroundColor: '#22c55e',
        textColor: '#FFFFFF',
        pulse: true
      },
      editable: true,
      category: 'conversion'
    }
  ];
};

// Create corrected step configuration 
export const createCorrectedStepConfiguration = (stepNumber: number): SchemaDrivenPageData => {
  const stepInfo = getStepByNumber(stepNumber);
  const now = new Date();
  
  let blocks: any[] = [];
  let pageType: 'intro' | 'question' | 'result' | 'offer' | 'thank-you' | 'custom' = 'custom';
  let title = `Etapa ${stepNumber}`;
  
  if (isResultPageStep(stepNumber)) {
    // Step 20: Result Page (/resultado)
    blocks = mapResultPageToBlocks();
    pageType = 'result';
    title = 'Resultado Personalizado';
    
    console.log(`✅ Step ${stepNumber} configured as RESULT PAGE mapping to ${stepInfo?.route}`);
  } else if (isOfferPageStep(stepNumber)) {
    // Step 21: Offer Page (/quiz-descubra-seu-estilo) 
    blocks = mapOfferPageToBlocks();
    pageType = 'offer';
    title = 'Oferta Especial';
    
    console.log(`✅ Step ${stepNumber} configured as OFFER PAGE mapping to ${stepInfo?.route}`);
  } else {
    // Other steps - keep existing configuration
    title = stepInfo?.description || `Etapa ${stepNumber}`;
    
    // Add basic blocks for other steps
    blocks = [
      {
        id: `step-${stepNumber}-content`,
        type: 'text',
        componentType: 'text',
        props: {
          content: `Conteúdo da ${title}`,
          alignment: 'center'
        },
        editable: true,
        category: 'content'
      }
    ];
  }
  
  return {
    id: `step-${stepNumber}`,
    name: `step-${stepNumber}`,
    title,
    type: pageType,
    order: stepNumber,
    blocks,
    settings: {
      showProgress: stepNumber < 21,
      progressValue: Math.round((stepNumber / 21) * 100),
      backgroundColor: '#FFFBF7',
      textColor: '#432818',
      maxWidth: '1200px',
      padding: '2rem',
      customCSS: ''
    },
    metadata: {
      route: stepInfo?.route,
      component: stepInfo?.component,
      isResultPage: isResultPageStep(stepNumber),
      isOfferPage: isOfferPageStep(stepNumber),
      stepNumber,
      lastModified: now.toISOString()
    }
  };
};

// Validate and fix step mappings
export const validateStepMappings = () => {
  console.log('🔍 Validating step mappings...');
  
  const step20 = getStepByNumber(20);
  const step21 = getStepByNumber(21);
  
  const validation = {
    step20Valid: step20?.route === '/resultado',
    step21Valid: step21?.route === '/quiz-descubra-seu-estilo',
    step20Component: step20?.component,
    step21Component: step21?.component
  };
  
  console.log('📊 Step Mapping Validation Results:');
  console.log(`  Step 20 → ${step20?.route} (${validation.step20Valid ? '✅' : '❌'})`);
  console.log(`  Step 21 → ${step21?.route} (${validation.step21Valid ? '✅' : '❌'})`);
  
  if (validation.step20Valid && validation.step21Valid) {
    console.log('✅ Step mappings are correctly configured!');
  } else {
    console.error('❌ Step mappings need correction!');
  }
  
  return validation;
};

// Get blocks for a specific step (with corrections)
export const getBlocksForStep = (stepNumber: number): any[] => {
  if (isResultPageStep(stepNumber)) {
    return mapResultPageToBlocks();
  } else if (isOfferPageStep(stepNumber)) {
    return mapOfferPageToBlocks();
  } else {
    // Return default blocks for other steps
    return [
      {
        id: `default-content-${stepNumber}`,
        type: 'text',
        componentType: 'text',
        props: {
          content: `Conteúdo da etapa ${stepNumber}`,
          alignment: 'left'
        },
        editable: true,
        category: 'content'
      }
    ];
  }
};