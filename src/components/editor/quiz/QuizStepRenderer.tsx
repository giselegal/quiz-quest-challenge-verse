/**
 * QuizStepRenderer.tsx - Dynamic Step Renderer Component
 * ✅ Renders different step types dynamically
 * ✅ Mode-aware rendering (editor/preview/production)
 * ✅ Integration with template blocks
 */

import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { QuizQuestionBlockModular } from './QuizQuestionBlockModular';
import { QuizMode, QuizState } from './QuizFlowPage';

export interface QuizStepRendererProps {
  mode: QuizMode;
  currentStep: number;
  stepData: any[];
  quizState: QuizState;
  onAnswerSubmit: (stepId: string, answer: any) => void;
  onUserNameSubmit: (name: string) => void;
  config?: {
    enableLivePreview?: boolean;
    enableValidation?: boolean;
    enableScoring?: boolean;
    theme?: {
      primaryColor?: string;
      backgroundColor?: string;
      textColor?: string;
    };
  };
  className?: string;
}

export const QuizStepRenderer: React.FC<QuizStepRendererProps> = ({
  mode,
  currentStep,
  stepData,
  quizState,
  onAnswerSubmit,
  onUserNameSubmit,
  config = {},
  className = '',
}) => {
  // Determine step type based on step number
  const getStepType = () => {
    if (currentStep === 1) return 'name-input';
    if (currentStep >= 2 && currentStep <= 11) return 'scoring-question';
    if (currentStep === 12) return 'transition';
    if (currentStep >= 13 && currentStep <= 18) return 'strategic-question';
    if (currentStep === 19) return 'processing';
    if (currentStep === 20) return 'results';
    if (currentStep === 21) return 'offer';
    return 'unknown';
  };

  const stepType = getStepType();

  // Process step data from template
  const processedStepData = useMemo(() => {
    if (!stepData || stepData.length === 0) {
      return { blocks: [], metadata: {} };
    }

    const blocks = stepData.map(block => ({
      ...block,
      stepType,
      currentStep,
      mode,
    }));

    const metadata = {
      stepType,
      currentStep,
      totalBlocks: blocks.length,
      hasQuestions: blocks.some(block => block.type === 'quiz-question'),
      hasTransition: blocks.some(block => block.type === 'hero'),
    };

    return { blocks, metadata };
  }, [stepData, stepType, currentStep, mode]);

  // Render block based on type
  const renderBlock = (block: any, index: number) => {
    const blockProps = {
      key: `${block.id}-${index}`,
      block,
      mode,
      stepType,
      currentStep,
      quizState,
      onAnswerSubmit,
      onUserNameSubmit,
      config,
    };

    switch (block.type) {
      case 'quiz-intro-header':
        return <QuizIntroHeaderRenderer {...blockProps} />;
      
      case 'form-input':
        return <NameInputRenderer {...blockProps} />;
      
      case 'quiz-question':
        return (
          <QuizQuestionBlockModular
            {...blockProps}
            questionData={block.content}
            onAnswer={onAnswerSubmit}
          />
        );
      
      case 'hero':
        return <TransitionRenderer {...blockProps} />;
      
      case 'quiz-results':
        return <ResultsRenderer {...blockProps} />;
      
      default:
        return <DefaultBlockRenderer {...blockProps} />;
    }
  };

  // Render step content
  const renderStepContent = () => {
    const { blocks, metadata } = processedStepData;

    if (blocks.length === 0) {
      return <EmptyStepRenderer stepType={stepType} currentStep={currentStep} mode={mode} />;
    }

    return (
      <div className="space-y-6">
        {/* Step Metadata (Editor Mode) */}
        {mode === 'editor' && (
          <Card className="border-dashed border-2 border-gray-300">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm text-gray-600">
                Step {currentStep} - {stepType}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="text-xs text-gray-500 grid grid-cols-2 gap-4">
                <div>Tipo: {metadata?.stepType || 'unknown'}</div>
                <div>Blocos: {metadata?.totalBlocks || 0}</div>
                <div>Questões: {metadata?.hasQuestions ? 'Sim' : 'Não'}</div>
                <div>Transição: {metadata?.hasTransition ? 'Sim' : 'Não'}</div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Render Blocks */}
        {blocks.map((block, index) => renderBlock(block, index))}
      </div>
    );
  };

  return (
    <div className={`quiz-step-renderer ${className}`} data-step-type={stepType}>
      {renderStepContent()}
    </div>
  );
};

// Individual Block Renderers

const QuizIntroHeaderRenderer: React.FC<any> = ({ block, mode }) => (
  <Card className="text-center">
    <CardContent className="p-8">
      {block.content.showLogo && block.properties.logoUrl && (
        <div className="mb-6">
          <img
            src={block.properties.logoUrl}
            alt={block.properties.logoAlt || 'Logo'}
            className="mx-auto h-16 object-contain"
          />
        </div>
      )}
      <h1 className="text-3xl font-bold mb-4" style={{ color: '#432818' }}>
        {block.content.title}
      </h1>
      <p className="text-lg mb-4" style={{ color: '#6B4F43' }}>
        {block.content.subtitle}
      </p>
      <p className="text-sm" style={{ color: '#6B4F43' }}>
        {block.content.description}
      </p>
      {mode === 'editor' && (
        <Badge variant="outline" className="mt-4">
          Quiz Intro Header Block
        </Badge>
      )}
    </CardContent>
  </Card>
);

const NameInputRenderer: React.FC<any> = ({ 
  block, 
  mode, 
  quizState, 
  onUserNameSubmit 
}) => {
  const [nameInput, setNameInput] = React.useState(quizState.userName || '');

  const handleSubmit = () => {
    if (nameInput.trim()) {
      onUserNameSubmit(nameInput.trim());
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardContent className="p-6">
        <div className="space-y-4">
          <input
            type="text"
            placeholder={block.content?.placeholder || "Digite seu nome"}
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            className="w-full px-4 py-3 border rounded-lg text-center"
            disabled={mode === 'editor'}
          />
          <Button
            onClick={handleSubmit}
            disabled={!nameInput.trim() || mode === 'editor'}
            className="w-full"
            style={{ backgroundColor: '#B89B7A' }}
          >
            {block.content?.buttonText || "Começar Quiz"}
          </Button>
          {mode === 'editor' && (
            <Badge variant="outline" className="w-full justify-center">
              Name Input Block
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

const TransitionRenderer: React.FC<any> = ({ block, mode }) => (
  <Card className="text-center">
    <CardContent className="p-8">
      <h2 className="text-2xl font-bold mb-4" style={{ color: '#432818' }}>
        {block.content.title}
      </h2>
      <p className="text-lg mb-6" style={{ color: '#6B4F43' }}>
        {block.content.subtitle}
      </p>
      {block.content.description && (
        <p className="text-sm mb-6" style={{ color: '#6B4F43' }}>
          {block.content.description}
        </p>
      )}
      {mode === 'editor' && (
        <Badge variant="outline">
          Transition Block
        </Badge>
      )}
    </CardContent>
  </Card>
);

const ResultsRenderer: React.FC<any> = ({ mode, quizState }) => (
  <Card>
    <CardContent className="p-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-4" style={{ color: '#432818' }}>
          Seus Resultados, {quizState.userName}!
        </h2>
      </div>
      
      {/* Score Display */}
      <div className="grid gap-4 mb-6">
        {Object.entries(quizState.scores).map(([style, score]) => (
          <div key={style} className="flex justify-between p-3 bg-gray-50 rounded">
            <span className="font-medium">{style}</span>
            <span>{typeof score === 'number' ? score : 0} pontos</span>
          </div>
        ))}
      </div>

      {mode === 'editor' && (
        <Badge variant="outline" className="w-full justify-center">
          Results Block
        </Badge>
      )}
    </CardContent>
  </Card>
);

const DefaultBlockRenderer: React.FC<any> = ({ block, mode }) => (
  <Card className="border-dashed">
    <CardContent className="p-6 text-center">
      <div className="text-gray-500">
        <div className="text-sm">Tipo de bloco: {block.type}</div>
        <div className="text-xs mt-2">ID: {block.id}</div>
      </div>
      {mode === 'editor' && (
        <Badge variant="outline" className="mt-4">
          {block.type} Block
        </Badge>
      )}
    </CardContent>
  </Card>
);

const EmptyStepRenderer: React.FC<{ 
  stepType: string; 
  currentStep: number; 
  mode: QuizMode 
}> = ({ stepType, currentStep, mode }) => (
  <Card className="border-dashed border-2 border-gray-300">
    <CardContent className="p-8 text-center text-gray-500">
      <div className="text-lg mb-2">Etapa {currentStep} - {stepType}</div>
      <div className="text-sm">Nenhum bloco configurado para esta etapa</div>
      {mode === 'editor' && (
        <Badge variant="outline" className="mt-4">
          Empty Step
        </Badge>
      )}
    </CardContent>
  </Card>
);

export default QuizStepRenderer;