import React, { useState } from 'react';
import {
  FunnelConfigProvider,
  FunnelIntroStep,
  NameCollectStep,
  QuizIntroStep,
  QuestionMultipleStep,
  QuizTransitionStep,
  ProcessingStep,
  ResultIntroStep,
  ResultDetailsStep,
  useFunnelNavigation
} from '@/components/funnel-blocks';
import { type FunnelStepConfig } from '@/types/funnel';

/**
 * Exemplo de implementação de um funil básico usando os componentes reutilizáveis
 * 
 * Este exemplo mostra como usar os componentes para criar um funil simples
 * com 8 etapas, incluindo perguntas de quiz e resultado.
 */
export const BasicFunnelExample: React.FC = () => {
  // Configuração do funil
  const [funnelConfig] = useState({
    steps: EXAMPLE_STEPS,
    theme: {
      primaryColor: '#4f46e5',
      secondaryColor: '#c7d2fe',
      backgroundColor: '#ffffff',
      textColor: '#1f2937',
      fontFamily: 'Inter, sans-serif'
    },
    settings: {
      showProgressBar: true,
      autoAdvance: false,
      enableHistory: true,
      analyticsEnabled: true
    }
  });
  
  // Estado para dados do usuário
  const [userData, setUserData] = useState({
    name: '',
    answers: {},
    result: null
  });
  
  // Hook de navegação
  const { 
    currentStepIndex, 
    goToNextStep, 
    goToPreviousStep 
  } = useFunnelNavigation({
    initialStep: 0,
    persistState: true
  });
  
  // Obter a etapa atual
  const currentStep = funnelConfig.steps[currentStepIndex] || funnelConfig.steps[0];
  
  // Handler para dados do usuário
  const handleUpdateUserData = (data: any) => {
    setUserData(prev => ({
      ...prev,
      ...data
    }));
  };
  
  // Renderizar o componente correto para a etapa atual
  const renderCurrentStep = () => {
    const commonProps = {
      id: currentStep.id,
      stepNumber: currentStepIndex + 1,
      totalSteps: funnelConfig.steps.length,
      onNext: goToNextStep,
      onPrevious: goToPreviousStep,
      data: currentStep.settings
    };
    
    switch (currentStep.stepType) {
      case 'intro':
        return <FunnelIntroStep {...commonProps} stepType="intro" />;
      
      case 'name-collect':
        return <NameCollectStep {...commonProps} stepType="name-collect" />;
      
      case 'quiz-intro':
        return <QuizIntroStep {...commonProps} stepType="quiz-intro" />;
      
      case 'question-multiple':
        return <QuestionMultipleStep {...commonProps} stepType="question-multiple" />;
      
      case 'quiz-transition':
        return <QuizTransitionStep {...commonProps} stepType="quiz-transition" />;
      
      case 'processing':
        return <ProcessingStep {...commonProps} stepType="processing" />;
      
      case 'result-intro':
        return <ResultIntroStep {...commonProps} stepType="result-intro" />;
      
      case 'result-details':
        return <ResultDetailsStep {...commonProps} stepType="result-details" />;
      
      default:
        return (
          <div className="p-4 border border-gray-300 rounded-lg">
            Etapa não implementada: {currentStep.stepType}
          </div>
        );
    }
  };

  return (
    <FunnelConfigProvider 
      config={funnelConfig}
      currentStepIndex={currentStepIndex}
      setCurrentStepIndex={(index) => goToNextStep(index)}
      userData={userData}
      updateUserData={handleUpdateUserData}
    >
      <div className="max-w-4xl mx-auto py-8 px-4">
        {renderCurrentStep()}
      </div>
    </FunnelConfigProvider>
  );
};

// Dados de exemplo para as etapas do funil
const EXAMPLE_STEPS: FunnelStepConfig[] = [
  {
    id: 'intro',
    stepType: 'intro',
    title: 'Introdução',
    settings: {
      title: 'Descubra seu Estilo de Design',
      subtitle: 'Responda algumas perguntas simples para descobrir seu estilo de design ideal',
      buttonText: 'Começar',
      backgroundImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7'
    }
  },
  {
    id: 'name',
    stepType: 'name-collect',
    title: 'Nome',
    settings: {
      title: 'Como podemos te chamar?',
      description: 'Para personalizar sua experiência, gostaríamos de saber seu nome:',
      buttonText: 'Continuar',
      placeholder: 'Digite seu nome'
    }
  },
  {
    id: 'quiz-intro',
    stepType: 'quiz-intro',
    title: 'Introdução às perguntas',
    settings: {
      title: 'Vamos descobrir seu estilo!',
      description: 'Responda as próximas perguntas com sinceridade para obtermos um resultado preciso e personalizado para você.',
      bullets: [
        'São apenas 3 perguntas rápidas',
        'Leva menos de 1 minuto',
        'Resultado personalizado imediato'
      ],
      buttonText: 'Iniciar questionário',
      imageUrl: 'https://images.unsplash.com/photo-1618221118493-9cfa1a38c296'
    }
  },
  {
    id: 'question-1',
    stepType: 'question-multiple',
    title: 'Pergunta 1',
    settings: {
      question: 'Como você descreveria seu ambiente ideal?',
      options: [
        { id: 'q1-1', text: 'Minimalista e organizado', value: 'minimalist' },
        { id: 'q1-2', text: 'Aconchegante e confortável', value: 'cozy' },
        { id: 'q1-3', text: 'Moderno e tecnológico', value: 'modern' }
      ],
      buttonText: 'Próxima pergunta'
    }
  },
  {
    id: 'processing',
    stepType: 'processing',
    title: 'Processando',
    settings: {
      title: 'Analisando suas respostas',
      processingText: 'Estamos gerando um resultado personalizado com base nas suas escolhas.',
      autoAdvanceDelay: 3
    }
  },
  {
    id: 'result-intro',
    stepType: 'result-intro',
    title: 'Introdução ao resultado',
    settings: {
      title: 'Seu resultado está pronto!',
      subtitle: 'Analisamos suas respostas e temos o seu estilo personalizado.',
      buttonText: 'Ver meu estilo',
      result: {
        category: 'Estilo Minimalista',
        imageUrl: 'https://images.unsplash.com/photo-1567225557594-88d73e55f2cb'
      }
    }
  },
  {
    id: 'result-details',
    stepType: 'result-details',
    title: 'Detalhes do resultado',
    settings: {
      title: 'Seu Estilo Personalizado',
      result: {
        category: 'Estilo Minimalista',
        title: 'Você tem um Estilo Minimalista',
        description: 'Pessoas com estilo minimalista valorizam ambientes limpos, organizados e com poucos elementos. Você tem preferência por soluções práticas e um visual descomplicado.',
        imageUrl: 'https://images.unsplash.com/photo-1567225557594-88d73e55f2cb',
        characteristics: [
          'Preferência por designs simples e funcionais',
          'Valorização de espaços organizados',
          'Tendência a escolher qualidade sobre quantidade',
          'Apreciação por cores neutras e naturais'
        ],
        recommendations: [
          'Invista em peças multifuncionais',
          'Mantenha apenas o essencial',
          'Use organizadores inteligentes',
          'Escolha tons neutros como base'
        ]
      },
      nextButtonText: 'Obrigado!'
    }
  }
];

export default BasicFunnelExample;
