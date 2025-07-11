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
          question={currentStepData.question}
          options={currentStepData.options}
          allowMultiple={currentStepData.allowMultiple}
          showImages={currentStepData.showImages}
          maxSelections={currentStepData.maxSelections}
          autoAdvance={true}
          autoAdvanceDelay={1500}
          onNext={handleNext}
          onBack={currentStep > 0 ? handleBack : undefined}
          progressPercent={progressPercent}
          logoUrl="https://cakto-quiz-br01.b-cdn.net/uploads/47fd613e-91a9-48cf-bd52-a9d4e180d5ab.png"
          onPropertyChange={(key, value) => {
            if (key === 'selectedOptions') {
              handleStepResponse(currentStepData.id, value);
            }
          }}
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
