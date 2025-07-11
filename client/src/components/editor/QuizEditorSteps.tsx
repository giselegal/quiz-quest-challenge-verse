import React, { useState } from 'react';
import QuizQuestionBlock from './blocks/QuizQuestionBlock';

interface QuizStep {
  id: string;
  question: string;
  options: Array<{ id: string; text: string; imageUrl?: string }>;
  allowMultiple?: boolean;
  showImages?: boolean;
  maxSelections?: number;
}

const QUIZ_STEPS: QuizStep[] = [
  // ETAPA 1: Estilo predominante
  {
    id: 'step-1',
    question: 'Etapa 1: Qual dessas opções representa melhor seu estilo predominante?',
    options: [
      { id: '1', text: 'Clássico e elegante', imageUrl: 'https://res.cloudinary.com/dtx0k4ue6/image/upload/v1710847234/estilo-classico_urkpfx.jpg' },
      { id: '2', text: 'Moderno e descolado', imageUrl: 'https://res.cloudinary.com/dtx0k4ue6/image/upload/v1710847235/estilo-moderno_hqxmzv.jpg' },
      { id: '3', text: 'Natural e autêntico', imageUrl: 'https://res.cloudinary.com/dtx0k4ue6/image/upload/v1710847236/estilo-natural_wnxkdi.jpg' },
      { id: '4', text: 'Casual e descontraído' }
    ],
    allowMultiple: true,
    showImages: true,
    maxSelections: 3
  },
  // ETAPA 2: Ambiente
  {
    id: 'step-2',
    question: 'Etapa 2: Qual ambiente você mais se identifica?',
    options: [
      { id: '1', text: 'Casa aconchegante', imageUrl: 'https://res.cloudinary.com/dtx0k4ue6/image/upload/v1710847237/ambiente-casa_abc123.jpg' },
      { id: '2', text: 'Escritório moderno', imageUrl: 'https://res.cloudinary.com/dtx0k4ue6/image/upload/v1710847238/ambiente-escritorio_def456.jpg' },
      { id: '3', text: 'Natureza ao ar livre', imageUrl: 'https://res.cloudinary.com/dtx0k4ue6/image/upload/v1710847239/ambiente-natureza_ghi789.jpg' },
      { id: '4', text: 'Café urbano' }
    ],
    allowMultiple: false,
    showImages: true,
    maxSelections: 1
  },
  // ETAPA 3: Cores
  {
    id: 'step-3',
    question: 'Etapa 3: Quais cores mais combinam com você?',
    options: [
      { id: '1', text: 'Tons neutros (bege, branco, cinza)' },
      { id: '2', text: 'Cores vibrantes (azul, vermelho, amarelo)' },
      { id: '3', text: 'Tons terrosos (marrom, verde, ocre)' },
      { id: '4', text: 'Cores pastéis (rosa, lilás, azul claro)' }
    ],
    allowMultiple: true,
    showImages: false,
    maxSelections: 2
  },
  // ETAPA 4: Tecidos
  {
    id: 'step-4',
    question: 'Etapa 4: Que tipo de tecido você prefere?',
    options: [
      { id: '1', text: 'Algodão e linho (naturais e respiráveis)' },
      { id: '2', text: 'Seda e cetim (elegantes e fluidos)' },
      { id: '3', text: 'Lã e tricot (quentes e aconchegantes)' },
      { id: '4', text: 'Jeans e moletom (resistentes e casuais)' }
    ],
    allowMultiple: true,
    showImages: false,
    maxSelections: 2
  },
  // ETAPA 5: Ocasiões
  {
    id: 'step-5',
    question: 'Etapa 5: Para que ocasiões você mais se veste?',
    options: [
      { id: '1', text: 'Trabalho e reuniões profissionais' },
      { id: '2', text: 'Eventos sociais e festas' },
      { id: '3', text: 'Atividades casuais e lazer' },
      { id: '4', text: 'Casa e momentos relaxantes' }
    ],
    allowMultiple: true,
    showImages: false,
    maxSelections: 2
  },
  // ETAPA 6: Acessórios
  {
    id: 'step-6',
    question: 'Etapa 6: Que tipo de acessórios você usa mais?',
    options: [
      { id: '1', text: 'Joias delicadas e minimalistas' },
      { id: '2', text: 'Peças statement e chamativas' },
      { id: '3', text: 'Acessórios práticos (relógio, bolsa funcional)' },
      { id: '4', text: 'Raramente uso acessórios' }
    ],
    allowMultiple: false,
    showImages: false,
    maxSelections: 1
  },
  // ETAPA 7: Silhueta
  {
    id: 'step-7',
    question: 'Etapa 7: Que silhueta você prefere em suas roupas?',
    options: [
      { id: '1', text: 'Ajustada ao corpo' },
      { id: '2', text: 'Ampla e fluida' },
      { id: '3', text: 'Estruturada e definida' },
      { id: '4', text: 'Confortável e solta' }
    ],
    allowMultiple: false,
    showImages: false,
    maxSelections: 1
  },
  // ETAPA 8: Estação
  {
    id: 'step-8',
    question: 'Etapa 8: Em que estação você se sente mais à vontade para se expressar?',
    options: [
      { id: '1', text: 'Verão - roupas leves e frescas' },
      { id: '2', text: 'Inverno - camadas e texturas' },
      { id: '3', text: 'Primavera - cores suaves e renewal' },
      { id: '4', text: 'Outono - tons terrosos e aconchegantes' }
    ],
    allowMultiple: false,
    showImages: false,
    maxSelections: 1
  },
  // ETAPA 9: Inspiração
  {
    id: 'step-9',
    question: 'Etapa 9: De onde você busca inspiração para se vestir?',
    options: [
      { id: '1', text: 'Revistas de moda e passarelas' },
      { id: '2', text: 'Redes sociais e influenciadores' },
      { id: '3', text: 'Filme, séries e personagens' },
      { id: '4', text: 'Meu próprio instinto e humor do dia' }
    ],
    allowMultiple: true,
    showImages: false,
    maxSelections: 2
  },
  // ETAPA 10: Conforto
  {
    id: 'step-10',
    question: 'Etapa 10: O que é mais importante para você ao escolher uma roupa?',
    options: [
      { id: '1', text: 'Conforto e praticidade' },
      { id: '2', text: 'Estilo e aparência' },
      { id: '3', text: 'Qualidade e durabilidade' },
      { id: '4', text: 'Preço e acessibilidade' }
    ],
    allowMultiple: false,
    showImages: false,
    maxSelections: 1
  },
  // ETAPA 11: Personalidade
  {
    id: 'step-11',
    question: 'Etapa 11: Como você gostaria que as pessoas te vissem?',
    options: [
      { id: '1', text: 'Sofisticada e elegante' },
      { id: '2', text: 'Criativa e original' },
      { id: '3', text: 'Confiável e profissional' },
      { id: '4', text: 'Descontraída e autêntica' }
    ],
    allowMultiple: false,
    showImages: false,
    maxSelections: 1
  },
  // ETAPA 12: Ousadia
  {
    id: 'step-12',
    question: 'Etapa 12: O quanto você gosta de ousar na moda?',
    options: [
      { id: '1', text: 'Adoro experimentar tendências novas' },
      { id: '2', text: 'Gosto de algumas peças diferentes' },
      { id: '3', text: 'Prefiro um estilo mais seguro' },
      { id: '4', text: 'Tenho medo de errar e chamar atenção' }
    ],
    allowMultiple: false,
    showImages: false,
    maxSelections: 1
  },
  // ETAPA 13: Lifestyle
  {
    id: 'step-13',
    question: 'Etapa 13: Como é sua rotina diária?',
    options: [
      { id: '1', text: 'Muito ativa e dinâmica' },
      { id: '2', text: 'Equilibrada entre trabalho e lazer' },
      { id: '3', text: 'Focada principalmente no trabalho' },
      { id: '4', text: 'Mais caseira e tranquila' }
    ],
    allowMultiple: false,
    showImages: false,
    maxSelections: 1
  },
  // ETAPA 14: Orçamento
  {
    id: 'step-14',
    question: 'Etapa 14: Como você gosta de investir em roupas?',
    options: [
      { id: '1', text: 'Poucas peças de alta qualidade' },
      { id: '2', text: 'Mix de básicos e algumas peças especiais' },
      { id: '3', text: 'Muitas opções com bom custo-benefício' },
      { id: '4', text: 'Depende da ocasião e necessidade' }
    ],
    allowMultiple: false,
    showImages: false,
    maxSelections: 1
  },
  // ETAPA 15: Confiança
  {
    id: 'step-15',
    question: 'Etapa 15: Em que tipo de roupa você se sente mais confiante?',
    options: [
      { id: '1', text: 'Um blazer bem cortado' },
      { id: '2', text: 'Um vestido que valoriza meu corpo' },
      { id: '3', text: 'Jeans e uma blusa confortável' },
      { id: '4', text: 'Uma peça única que ninguém mais tem' }
    ],
    allowMultiple: false,
    showImages: false,
    maxSelections: 1
  },
  // ETAPA 16: Tendências
  {
    id: 'step-16',
    question: 'Etapa 16: Como você se relaciona com as tendências de moda?',
    options: [
      { id: '1', text: 'Sigo sempre as últimas tendências' },
      { id: '2', text: 'Adapto tendências ao meu estilo' },
      { id: '3', text: 'Prefiro clássicos atemporais' },
      { id: '4', text: 'Crio meu próprio estilo independente' }
    ],
    allowMultiple: false,
    showImages: false,
    maxSelections: 1
  },
  // ETAPA 17: Peça-chave
  {
    id: 'step-17',
    question: 'Etapa 17: Qual peça não pode faltar no seu guarda-roupa?',
    options: [
      { id: '1', text: 'Camisa branca clássica' },
      { id: '2', text: 'Jeans perfeito' },
      { id: '3', text: 'Vestido curinga' },
      { id: '4', text: 'Blazer estruturado' }
    ],
    allowMultiple: false,
    showImages: false,
    maxSelections: 1
  },
  // ETAPA 18: Expressão
  {
    id: 'step-18',
    question: 'Etapa 18: Como você gosta de expressar sua personalidade através da moda?',
    options: [
      { id: '1', text: 'Com cores e estampas marcantes' },
      { id: '2', text: 'Com cortes e silhuetas interessantes' },
      { id: '3', text: 'Com acessórios únicos' },
      { id: '4', text: 'Com a combinação harmoniosa das peças' }
    ],
    allowMultiple: false,
    showImages: false,
    maxSelections: 1
  },
  // ETAPA 19: Momento
  {
    id: 'step-19',
    question: 'Etapa 19: Em que momento da vida você está agora?',
    options: [
      { id: '1', text: 'Descobrindo meu estilo pessoal' },
      { id: '2', text: 'Renovando meu guarda-roupa' },
      { id: '3', text: 'Ganhando mais confiança' },
      { id: '4', text: 'Buscando praticidade sem perder estilo' }
    ],
    allowMultiple: false,
    showImages: false,
    maxSelections: 1
  },
  // ETAPA 20: Objetivo
  {
    id: 'step-20',
    question: 'Etapa 20: Qual é seu maior objetivo com este quiz?',
    options: [
      { id: '1', text: 'Descobrir meu estilo único' },
      { id: '2', text: 'Receber orientações personalizadas' },
      { id: '3', text: 'Ter mais clareza nas escolhas' },
      { id: '4', text: 'Me sentir mais confiante e autêntica' }
    ],
    allowMultiple: false,
    showImages: false,
    maxSelections: 1
  },
  // ETAPA 21: Investimento
  {
    id: 'step-21',
    question: 'Etapa 21: Você estaria disposta a investir em uma consultoria personalizada?',
    options: [
      { id: '1', text: 'Sim, quero saber mais sobre o atendimento personalizado' },
      { id: '2', text: 'Talvez, dependendo do valor e benefícios' },
      { id: '3', text: 'Prefiro primeiro ver o resultado do quiz' },
      { id: '4', text: 'Não neste momento' }
    ],
    allowMultiple: false,
    showImages: false,
    maxSelections: 1
  }
];

const QuizEditorSteps = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<Record<string, string[]>>({});

  const handleNext = () => {
    if (currentStep < QUIZ_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Quiz finalizado
      console.log('Quiz finalizado! Respostas:', responses);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleStepResponse = (stepId: string, selectedOptions: string[]) => {
    setResponses(prev => ({
      ...prev,
      [stepId]: selectedOptions
    }));
  };

  const currentStepData = QUIZ_STEPS[currentStep];
  const progressPercent = Math.round(((currentStep + 1) / QUIZ_STEPS.length) * 100);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <QuizQuestionBlock
          blockId={currentStepData.id}
          question={currentStepData.question}
          options={currentStepData.options.map(opt => ({ ...opt, value: opt.id }))}
          multipleSelection={currentStepData.allowMultiple}
          showImages={currentStepData.showImages}
          maxSelections={currentStepData.maxSelections}
          onAnswer={(answers) => handleStepResponse(currentStepData.id, answers)}
          onBack={currentStep > 0 ? handleBack : undefined}
          progressPercent={progressPercent}
          logoUrl="/api/placeholder/96/96"
          showBackButton={currentStep > 0}
        />
        
        {/* Debug Info */}
        <div className="mt-8 p-4 bg-white rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold mb-2">Estado do Quiz:</h3>
          <p><strong>Etapa atual:</strong> {currentStep + 1} de {QUIZ_STEPS.length}</p>
          <p><strong>Progresso:</strong> {progressPercent}%</p>
          <p><strong>Respostas:</strong></p>
          <pre className="mt-2 text-sm bg-gray-100 p-2 rounded">
            {JSON.stringify(responses, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default QuizEditorSteps;
