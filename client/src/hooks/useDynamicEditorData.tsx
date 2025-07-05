import React, { useEffect } from 'react';
import { useQuizData } from '@/services/quizDataService';
import { useAuth } from '@/context/AuthContext';
import { useQuiz } from '@/hooks/useQuiz';

// Hook para integrar dados dinâmicos no editor visual
export const useDynamicEditorData = () => {
  const { user } = useAuth();
  const { primaryStyle, secondaryStyles } = useQuiz();
  const { getCurrentSession, startSession } = useQuizData();

  // Inicializar sessão se necessário
  useEffect(() => {
    const session = getCurrentSession();
    if (!session && user?.userName) {
      startSession(user.userName, user.email);
    }
  }, [user, getCurrentSession, startSession]);

  // Obter dados dinâmicos do usuário
  const getDynamicUserData = () => {
    const session = getCurrentSession();
    
    return {
      // Nome do usuário
      userName: user?.userName || session?.userName || 'Usuário',
      userEmail: user?.email || session?.userEmail || '',
      
      // Dados da sessão atual
      sessionId: session?.sessionId || '',
      sessionDuration: session ? 
        Math.round((new Date().getTime() - new Date(session.startTime).getTime()) / 1000) : 0,
      questionsAnswered: session?.answers?.length || 0,
      totalClicks: session?.clickEvents?.length || 0,
      
      // Resultados do quiz
      primaryStyleName: primaryStyle?.category || 'Elegante',
      primaryStylePercentage: primaryStyle?.percentage || 92,
      secondaryStylesCount: secondaryStyles?.length || 0,
      
      // Status da sessão
      hasActiveSession: !!session,
      hasCompletedQuiz: !!primaryStyle,
      isLoggedIn: !!user?.userName
    };
  };

  // Obter dados dinâmicos para imagens
  const getDynamicImageData = () => {
    const styleCategory = primaryStyle?.category || 'Elegante';
    
    // Importar styleConfig dinamicamente se necessário
    const styleImages = {
      'Natural': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/2_ziffwx.webp',
      'Clássico': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/12_edlmwf.webp',
      'Contemporâneo': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/13_uvbciq.webp',
      'Elegante': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/14_l2nprc.webp',
      'Romântico': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/6_gnoxfg.webp',
      'Sexy': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735327/7_ynez1z.webp',
      'Dramático': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/8_yqu3hw.webp',
      'Criativo': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/9_x6so6a.webp'
    };

    const guideImages = {
      'Natural': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071344/GUIA_NATURAL_fzp6fc.webp',
      'Clássico': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071343/GUIA_CL%C3%81SSICO_ux1yhf.webp',
      'Contemporâneo': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071343/GUIA_CONTEMPOR%C3%82NEO_vcklxe.webp',
      'Elegante': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071342/GUIA_ELEGANTE_asez1q.webp',
      'Romântico': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071343/GUIA_ROM%C3%82NTICO_ci4hgk.webp',
      'Sexy': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071349/GUIA_SEXY_t5x2ov.webp',
      'Dramático': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745073346/GUIA_DRAM%C3%81TICO_mpn60d.webp',
      'Criativo': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071342/GUIA_CRIATIVO_ntbzph.webp'
    };

    return {
      styleImage: styleImages[styleCategory] || styleImages['Elegante'],
      guideImage: guideImages[styleCategory] || guideImages['Elegante'],
      styleCategory
    };
  };

  // Obter configurações completas para o editor
  const getEditorDynamicSettings = () => {
    const userData = getDynamicUserData();
    const imageData = getDynamicImageData();

    return {
      // Configurações do Header
      headerSettings: {
        userName: userData.userName,
        primaryStyle: userData.primaryStyleName,
        logoUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp'
      },

      // Configurações do Card de Estilo
      styleCardSettings: {
        styleName: userData.primaryStyleName,
        percentage: userData.primaryStylePercentage,
        styleImage: imageData.styleImage,
        guideImage: imageData.guideImage,
        description: `Sua personalidade ${userData.primaryStyleName.toLowerCase()} refletida no seu estilo de vestir.`
      },

      // Configurações de CTA
      ctaSettings: {
        text: 'Garantir Meu Guia + Bônus Especiais',
        subtitle: 'Quero meu Guia de Estilo Agora',
        securityText: `🔒 Pagamento 100% Seguro\n✓ Garantia de 7 dias\n🛡️ Oferta exclusiva - ${userData.userName}`
      },

      // Configurações de Value Stack
      valueStackSettings: {
        title: 'O Que Você Recebe Hoje',
        items: [
          { name: 'Guia Principal', price: 'R$ 67,00' },
          { name: 'Bônus - Peças-chave', price: 'R$ 79,00' },
          { name: 'Bônus - Visagismo Facial', price: 'R$ 29,00' }
        ],
        totalLabel: 'Valor Total',
        totalPrice: 'R$ 175,00',
        discountLabel: 'Hoje por apenas',
        finalPrice: 'R$ 39,00',
        paymentNote: 'Pagamento único'
      },

      // Metadados da sessão
      sessionMetadata: {
        ...userData,
        lastUpdated: new Date().toISOString(),
        dataSource: 'dynamic'
      }
    };
  };

  return {
    getDynamicUserData,
    getDynamicImageData,
    getEditorDynamicSettings,
    isDataAvailable: !!(user || getCurrentSession()),
    refreshData: () => {
      // Força re-render dos componentes que usam estes dados
      window.dispatchEvent(new CustomEvent('quiz-data-updated'));
    }
  };
};
