
import React, { useState, useEffect, useRef } from 'react';
import { ModernSidebar } from './sidebar/ModernSidebar';
import { ModernCanvas } from './canvas/ModernCanvas';
import { ModernToolbar } from './toolbar/ModernToolbar';
import { StepsPanel } from './steps/StepsPanel';
import { ModernPropertiesPanel } from './properties/ModernPropertiesPanel';
import { EditorDebugPanel } from './debug/EditorDebugPanel';
import { useModernEditor } from '@/hooks/useModernEditor';
import { useStepsManager } from '@/hooks/useStepsManager';
import { useSupabaseQuestions } from '@/hooks/useSupabaseQuestions';
import { setQuestionsCache } from '@/utils/stepTemplates';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { toast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { RefreshCw, AlertCircle, Database, Bug } from 'lucide-react';

interface ModernVisualEditorProps {
  funnelId: string;
  onSave?: (data: any) => void;
}

export const ModernVisualEditor: React.FC<ModernVisualEditorProps> = ({
  funnelId,
  onSave
}) => {
  const [viewportSize, setViewportSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('lg');
  const [isDebugVisible, setIsDebugVisible] = useState(false);
  const hasInitializedRef = useRef(false);

  // Hook para questões do Supabase
  const { 
    questions: supabaseQuestions, 
    strategicQuestions: supabaseStrategicQuestions, 
    loading: questionsLoading, 
    error: questionsError 
  } = useSupabaseQuestions();

  const {
    elements,
    selectedElementId,
    isPreviewMode,
    isInitializing,
    failedSteps,
    canUndo,
    canRedo,
    addElement,
    addStepTemplate,
    updateElement,
    duplicateElement,
    deleteElement,
    selectElement,
    togglePreview,
    undo,
    redo,
    save,
    getElementsByStep,
    initializeSteps,
    retryFailedSteps,
    resetPopulatedSteps
  } = useModernEditor();

  const {
    steps,
    activeStepId,
    activeStep,
    isInitialized: stepsInitialized,
    addQuizIntroStep,
    addQuizQuestionStep,
    addStrategicQuestionStep,
    addQuizTransitionStep,
    addQuizResultStep,
    addOfferPageStep,
    deleteStep,
    duplicateStep,
    editStep,
    updateStep,
    reorderStep,
    selectStep,
    getStepTypeInfo
  } = useStepsManager();

  // Atualizar cache das questões quando carregarem do Supabase
  useEffect(() => {
    if (supabaseQuestions.length > 0 || supabaseStrategicQuestions.length > 0) {
      console.log('📋 Updating questions cache with Supabase data');
      setQuestionsCache(supabaseQuestions, supabaseStrategicQuestions);
    }
  }, [supabaseQuestions, supabaseStrategicQuestions]);

  // Inicialização sequencial aguardando tanto questões quanto etapas
  useEffect(() => {
    const shouldInitialize = !hasInitializedRef.current && 
                            stepsInitialized && 
                            steps.length > 0 && 
                            !questionsLoading;

    if (shouldInitialize) {
      console.log('🚀 Starting enhanced steps initialization...', {
        stepsCount: steps.length,
        questionsCount: supabaseQuestions.length,
        strategicCount: supabaseStrategicQuestions.length
      });
      
      hasInitializedRef.current = true;
      
      // Preparar lista de etapas para inicialização com dados das questões
      const stepsToInitialize = steps.map(step => ({
        id: step.id,
        type: step.type,
        questionData: step.questionData // Incluir dados da questão se disponível
      }));
      
      // Usar a nova função de inicialização em lote
      initializeSteps(stepsToInitialize).then(() => {
        console.log('✅ All steps initialization completed');
        toast({
          title: "Editor carregado",
          description: "Todas as etapas foram inicializadas com sucesso.",
        });
      }).catch((error) => {
        console.error('❌ Steps initialization failed:', error);
        toast({
          title: "Erro na inicialização",
          description: "Algumas etapas podem não ter sido carregadas corretamente.",
          variant: "destructive"
        });
      });
    }
  }, [steps, stepsInitialized, initializeSteps, questionsLoading, supabaseQuestions, supabaseStrategicQuestions]);

  const handleAddElement = (type: string) => {
    if (activeStepId) {
      addElement(type, undefined, activeStepId);
    } else {
      toast({
        title: "Selecione uma etapa",
        description: "Selecione uma etapa antes de adicionar componentes.",
        variant: "destructive"
      });
    }
  };

  const handleStepAdd = (type: 'quiz-intro' | 'quiz-question' | 'strategic-question' | 'quiz-transition' | 'quiz-result' | 'offer-page') => {
    let stepId: string;
    
    switch (type) {
      case 'quiz-intro':
        stepId = addQuizIntroStep();
        break;
      case 'quiz-question':
        stepId = addQuizQuestionStep();
        break;
      case 'strategic-question':
        stepId = addStrategicQuestionStep();
        break;
      case 'quiz-transition':
        stepId = addQuizTransitionStep();
        break;
      case 'quiz-result':
        stepId = addQuizResultStep();
        break;
      case 'offer-page':
        stepId = addOfferPageStep();
        break;
      default:
        return;
    }
    
    // Adicionar template para a nova etapa
    setTimeout(() => {
      addStepTemplate(type, stepId);
    }, 100);
  };

  const handleSave = async () => {
    try {
      const data = await save();
      
      const fullData = {
        elements: data.elements || [],
        timestamp: data.timestamp || new Date().toISOString(),
        steps,
        activeStepId,
        funnelId
      };
      
      onSave?.(fullData);
      
      toast({
        title: "Projeto salvo",
        description: "Todas as alterações foram salvas com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar o projeto.",
        variant: "destructive"
      });
    }
  };

  const handleElementUpdate = (id: string, updates: Partial<any>) => {
    updateElement(id, updates);
  };

  const handleRetryFailed = () => {
    retryFailedSteps();
    toast({
      title: "Tentando novamente",
      description: "Recarregando etapas que falharam...",
    });
  };

  const handleReset = () => {
    resetPopulatedSteps();
    hasInitializedRef.current = false;
    toast({
      title: "Reset realizado",
      description: "Todas as etapas serão recarregadas...",
    });
  };

  // Get elements for active step with proper sorting
  const activeStepElements = activeStepId ? getElementsByStep(activeStepId) : [];
  const selectedElement = activeStepElements.find(el => el.id === selectedElementId);

  // Convert viewport size to viewport format for ModernCanvas
  const getViewport = (): 'desktop' | 'tablet' | 'mobile' => {
    switch (viewportSize) {
      case 'sm':
        return 'mobile';
      case 'md':
      case 'lg':
        return 'tablet';
      case 'xl':
        return 'desktop';
      default:
        return 'desktop';
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gray-50 overflow-hidden">
      <ModernToolbar
        canUndo={canUndo}
        canRedo={canRedo}
        isPreviewMode={isPreviewMode}
        viewportSize={viewportSize}
        onUndo={undo}
        onRedo={redo}
        onTogglePreview={togglePreview}
        onViewportChange={setViewportSize}
        onSave={handleSave}
      />
      
      {/* Status panel melhorado */}
      {(questionsLoading || isInitializing || !stepsInitialized || failedSteps.size > 0 || questionsError) && (
        <div className="bg-blue-50 border-b border-blue-200 px-4 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {questionsLoading && (
                <>
                  <Database className="w-4 h-4 animate-pulse text-blue-600" />
                  <span className="text-sm text-blue-700">Carregando questões do Supabase...</span>
                </>
              )}
              {!questionsLoading && !stepsInitialized && (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
                  <span className="text-sm text-blue-700">Inicializando etapas...</span>
                </>
              )}
              {!questionsLoading && stepsInitialized && isInitializing && (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
                  <span className="text-sm text-blue-700">Carregando templates...</span>
                </>
              )}
              {questionsError && (
                <>
                  <AlertCircle className="w-4 h-4 text-red-600" />
                  <span className="text-sm text-red-700">Erro ao carregar questões: {questionsError}</span>
                </>
              )}
              {failedSteps.size > 0 && (
                <>
                  <AlertCircle className="w-4 h-4 text-orange-600" />
                  <span className="text-sm text-orange-700">
                    {failedSteps.size} etapa(s) com problemas
                  </span>
                </>
              )}
              {!questionsLoading && stepsInitialized && !isInitializing && !questionsError && (
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-700">
                    ✅ {steps.length} etapas | {supabaseQuestions.length} questões | {supabaseStrategicQuestions.length} estratégicas
                  </span>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              {failedSteps.size > 0 && (
                <Button size="sm" variant="outline" onClick={handleRetryFailed}>
                  Tentar Novamente
                </Button>
              )}
              <Button size="sm" variant="outline" onClick={handleReset}>
                Reset
              </Button>
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => setIsDebugVisible(!isDebugVisible)}
              >
                <Bug className="w-3 h-3" />
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex-1 flex overflow-hidden">
        <StepsPanel
          steps={steps}
          activeStepId={activeStepId}
          onStepSelect={selectStep}
          onStepAdd={handleStepAdd}
          onStepEdit={editStep}
          onStepDelete={deleteStep}
          onStepDuplicate={duplicateStep}
          onStepReorder={reorderStep}
          getStepTypeInfo={getStepTypeInfo}
        />
        
        <ResizablePanelGroup direction="horizontal" className="flex-1">
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <ModernSidebar 
              onAddElement={handleAddElement}
              activeStepType={activeStep?.type}
            />
          </ResizablePanel>
          
          <ResizableHandle />
          
          <ResizablePanel defaultSize={60}>
            <ModernCanvas
              elements={activeStepElements}
              selectedElementId={selectedElementId}
              onSelectElement={selectElement}
              onUpdateElement={updateElement}
              onDeleteElement={deleteElement}
              onAddElement={handleAddElement}
              isPreviewMode={isPreviewMode}
              viewport={getViewport()}
            />
          </ResizablePanel>
          
          <ResizableHandle />
          
          <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
            <ModernPropertiesPanel
              selectedElement={selectedElement}
              onUpdate={(updates) => {
                if (selectedElementId) {
                  handleElementUpdate(selectedElementId, updates);
                }
              }}
              onClose={() => selectElement(null)}
            />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Debug Panel */}
      <EditorDebugPanel
        steps={steps}
        activeStepId={activeStepId}
        elements={elements}
        isVisible={isDebugVisible}
        onToggle={() => setIsDebugVisible(!isDebugVisible)}
      />
    </div>
  );
};
