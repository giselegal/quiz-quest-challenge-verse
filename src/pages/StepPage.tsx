// Usar a variante simples e padronizada do Canvas
import { CanvasDropZone } from '@/components/editor/canvas/CanvasDropZone.simple';
import QuizNavigation from '@/components/quiz/QuizNavigation';
import { QuizFlowProvider, useQuizFlow } from '@/context/QuizFlowProvider';
import { templateService } from '@/services/templateService';
import { Block } from '@/types/editor';
import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'wouter';

// Removido Step20Result inexistente; usar blocos do templateService

/**
 * ðŸŽ¯ PÃ¡gina genÃ©rica para todas as etapas do quiz de 21 passos
 *
 * Features:
 * - âœ… Carregamento dinÃ¢mico de templates por etapa
 * - âœ… NavegaÃ§Ã£o integrada com persistÃªncia
 * - âœ… RenderizaÃ§Ã£o automÃ¡tica de blocos
 * - âœ… Sistema de progresso
 * - âœ… ValidaÃ§Ã£o de respostas
 */

// ConfiguraÃ§Ã£o bÃ¡sica das etapas
const STEPS_CONFIG = [
  { step: 1, name: 'IntroduÃ§Ã£o', description: 'Tela inicial do quiz', component: 'generic' }, // âœ… Mudado para usar sistema de blocos
  { step: 2, name: 'Nome', description: 'Coleta do nome pessoal', component: 'generic' },
  { step: 3, name: 'Roupa Favorita', description: 'Tipo de roupa preferida', component: 'generic' },
  { step: 4, name: 'Estilo Pessoal', description: 'IdentificaÃ§Ã£o do estilo', component: 'generic' },
  { step: 5, name: 'OcasiÃµes', description: 'Contextos de uso', component: 'generic' },
  { step: 6, name: 'Cores', description: 'PreferÃªncias de cores', component: 'generic' },
  { step: 7, name: 'Texturas', description: 'Texturas favoritas', component: 'generic' },
  { step: 8, name: 'Silhuetas', description: 'Formas preferidas', component: 'generic' },
  { step: 9, name: 'AcessÃ³rios', description: 'AcessÃ³rios de estilo', component: 'generic' },
  { step: 10, name: 'InspiraÃ§Ã£o', description: 'ReferÃªncias de moda', component: 'generic' },
  { step: 11, name: 'Conforto', description: 'Prioridade de conforto', component: 'generic' },
  { step: 12, name: 'TendÃªncias', description: 'Interesse em tendÃªncias', component: 'generic' },
  { step: 13, name: 'Investimento', description: 'OrÃ§amento para roupas', component: 'generic' },
  { step: 14, name: 'Personalidade', description: 'TraÃ§os pessoais', component: 'generic' },
  { step: 15, name: 'TransiÃ§Ã£o', description: 'PreparaÃ§Ã£o para resultado', component: 'generic' },
  { step: 16, name: 'Processamento', description: 'Calculando resultado', component: 'generic' },
  { step: 17, name: 'Resultado Parcial', description: 'Primeiro resultado', component: 'generic' },
  { step: 18, name: 'Resultado Completo', description: 'AnÃ¡lise completa', component: 'generic' },
  { step: 19, name: 'Resultado Final', description: 'ApresentaÃ§Ã£o final', component: 'generic' },
  { step: 20, name: 'Lead Capture', description: 'Captura de contato', component: 'generic' },
  { step: 21, name: 'Oferta', description: 'PÃ¡gina de oferta final', component: 'generic' },
];

// Removed unused LoadingSpinner to satisfy TS check

const StepContent: React.FC = () => {
  const { step } = useParams<{ step: string }>();
  const [, setLocation] = useLocation();

  const stepNumber = parseInt(step || '1');
  const { currentStep, next, previous, canProceed } = useQuizFlow();

  // Estados para o sistema de blocos
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [isLoadingTemplate, setIsLoadingTemplate] = useState(true);
  const [templateError, setTemplateError] = useState<string | null>(null);

  // Verificar se a etapa Ã© vÃ¡lida
  const stepConfig = STEPS_CONFIG.find(config => config.step === stepNumber);

  // Carregar template da etapa
  useEffect(() => {
    const loadStepTemplate = async () => {
      setIsLoadingTemplate(true);
      setTemplateError(null);

      try {
        const template = await templateService.getTemplateByStep(stepNumber);

        if (template && template.blocks) {
          const editorBlocks = templateService.convertTemplateBlocksToEditorBlocks(template.blocks);
          setBlocks(editorBlocks);
        } else {
          // Fallback para etapas sem template especÃ­fico
          setBlocks([]);
        }
      } catch (error) {
        console.error('Erro ao carregar template:', error);
        setTemplateError(error instanceof Error ? error.message : 'Erro desconhecido');
        setBlocks([]);
      } finally {
        setIsLoadingTemplate(false);
      }
    };

    loadStepTemplate();
  }, [stepNumber]);

  if (!stepConfig) {
    return (
      <div className="min-h-screen bg-[#FAF9F7] flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-[#1A0F3D] mb-4">Etapa nÃ£o encontrada</h1>
          <p className="text-[#6B4F43] mb-6">
            A etapa {stepNumber} nÃ£o foi encontrada ou ainda nÃ£o foi configurada.
          </p>
          <button
            onClick={() => setLocation('/admin')}
            className="px-6 py-3 bg-[#B89B7A] text-white rounded-lg hover:opacity-90"
          >
            Voltar ao Dashboard
          </button>
        </div>
      </div>
    );
  }

  // FunÃ§Ã£o para navegar entre etapas
  const handleNext = () => next();
  const handlePrevious = () => previous();

  // FunÃ§Ãµes para sistema de blocos (modo preview)
  const handleSelectBlock = (_id: string) => {
    // No modo preview/produÃ§Ã£o, nÃ£o permitir seleÃ§Ã£o
  };

  const handleUpdateBlock = (_id: string, _updates: any) => {
    // No modo preview/produÃ§Ã£o, nÃ£o permitir ediÃ§Ã£o
  };

  const handleDeleteBlock = (_id: string) => {
    // No modo preview/produÃ§Ã£o, nÃ£o permitir exclusÃ£o
  };

  // Renderizar conteÃºdo da etapa usando sistema de blocos
  const renderStepContent = () => {
    const sessionId = `session-${Date.now()}`;

    // Loading state
    if (isLoadingTemplate) {
      return (
        <div className="min-h-screen bg-[#FAF9F7] flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-lightBlue mx-auto"></div>
            <p className="text-brand-darkBlue">Carregando etapa {stepNumber}...</p>
          </div>
        </div>
      );
    }

    // Error state
    if (templateError) {
      return (
        <div className="min-h-screen bg-[#FAF9F7] flex items-center justify-center">
          <div className="bg-[#FAF9F7] border border-[#D4C4A8] rounded-lg p-6 text-center max-w-md">
            <h2 className="text-xl font-bold text-[#1A0F3D] mb-2">Erro ao carregar a etapa</h2>
            <p className="text-[#1A0F3D] mb-4">
              NÃ£o foi possÃ­vel carregar o conteÃºdo da etapa {stepNumber}.
            </p>
            <p className="text-sm text-[#8B6F47] mb-4">{templateError}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[#1A0F3D] text-white rounded hover:bg-[#2A1810]"
            >
              Recarregar
            </button>
          </div>
        </div>
      );
    }

    try {
      // âœ… REMOVIDO: Caso especial Step01 - agora usa sistema de blocos
      // Step01 agora utiliza template JSON com lead-form como outros steps

      // Step20Result removido; renderizaÃ§Ã£o segue via sistema de blocos

      // ðŸš€ SISTEMA DE BLOCOS - RENDERIZAÃ‡ÃƒO COMO PREVIEW DO EDITOR
      return (
        <>
          {/* ðŸš€ NAVEGAÃ‡ÃƒO PREMIUM INTEGRADA */}
          <QuizNavigation
            canProceed={canProceed}
            onNext={handleNext}
            onPrevious={handlePrevious}
            currentQuestionType="normal"
            selectedOptionsCount={3}
            isLastQuestion={currentStep === 21}
            currentStep={currentStep}
            totalSteps={21}
            stepName={stepConfig.name}
            showUserInfo={true}
            userName={undefined}
            sessionId={sessionId}
          />

          {/* ðŸŽ¯ CONTEÃšDO RENDERIZADO COM SISTEMA DE BLOCOS */}
          <div className="min-h-screen bg-gradient-to-br from-[#FAF9F7] via-white/30 to-[#B89B7A]/10">
            <div className="container mx-auto px-4">
              {blocks.length > 0 ? (
                // Usar o mesmo sistema do editor em modo preview
                <div className="max-w-4xl mx-auto">
                  <CanvasDropZone
                    blocks={blocks}
                    selectedBlockId={null}
                    isPreviewing={true} // ðŸŽ¯ MODO PREVIEW - sem controles de ediÃ§Ã£o
                    onSelectBlock={handleSelectBlock}
                    onUpdateBlock={handleUpdateBlock}
                    onDeleteBlock={handleDeleteBlock}
                    className="py-8"
                    scopeId={currentStep}
                  />
                </div>
              ) : (
                // Fallback para etapas sem template de blocos
                <div className="max-w-4xl mx-auto py-8">
                  <div className="space-y-6">
                    <div className="text-center">
                      <h1 className="text-3xl font-bold text-[#1A0F3D] mb-4">{stepConfig.name}</h1>
                      <p className="text-lg text-[#6B4F43] mb-8">{stepConfig.description}</p>
                    </div>

                    <div className="bg-white rounded-lg p-6 border border-gray-200">
                      <p className="text-center text-gray-500">
                        ConteÃºdo da etapa {stepNumber} serÃ¡ implementado aqui.
                      </p>
                      <p className="text-sm text-gray-400 mt-4 text-center">
                        Template: step-{stepNumber.toString().padStart(2, '0')}.json
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      );
    } catch (error) {
      console.error('Erro ao renderizar conteÃºdo da etapa:', error);

      return (
        <div className="min-h-screen bg-[#FAF9F7] flex items-center justify-center">
          <div className="bg-[#FAF9F7] border border-[#D4C4A8] rounded-lg p-6 text-center max-w-md">
            <h2 className="text-xl font-bold text-[#1A0F3D] mb-2">Erro ao carregar a etapa</h2>
            <p className="text-[#1A0F3D] mb-4">
              NÃ£o foi possÃ­vel carregar o conteÃºdo da etapa {stepNumber}.
            </p>
            <p className="text-sm text-[#8B6F47] mb-4">
              {error instanceof Error ? error.message : 'Erro desconhecido'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[#1A0F3D] text-white rounded hover:bg-[#2A1810]"
            >
              Recarregar
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      {renderStepContent()}

      {/* Debug Info (apenas em desenvolvimento) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-lg text-sm z-50">
          <div>Etapa: {stepNumber}</div>
          <div>Componente: {stepConfig.component}</div>
        </div>
      )}
    </>
  );
};

const StepPage: React.FC = () => {
  const { step } = useParams<{ step: string }>();
  const [, setLocation] = useLocation();
  const stepNumber = parseInt(step || '1');
  return (
    <QuizFlowProvider
      initialStep={stepNumber}
      totalSteps={21}
      autoAdvance={true}
      onNavigate={n => setLocation(`/step/${n}`)}
    >
      <StepContent />
    </QuizFlowProvider>
  );
};

export default StepPage;

