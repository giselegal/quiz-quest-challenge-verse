import { useQuizLogic } from '@/hooks/useQuizLogic';
import { QuizDataService } from '@/services/core/QuizDataService';
import { QUIZ_STYLE_21_STEPS_TEMPLATE } from '@/templates/quiz21StepsComplete';
import { getStepInfo as coreGetStepInfo } from '@/utils/quiz21StepsRenderer';
import { TemplateManager } from '@/utils/TemplateManager';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { StorageService } from '@/services/core/StorageService';
import useOptimizedScheduler from '@/hooks/useOptimizedScheduler';
import { useStepNavigationStore } from '@/stores/useStepNavigationStore';

export interface QuizFlowProps {
  mode?: 'production' | 'preview' | 'editor';
  onStepChange?: (step: number) => void;
  initialStep?: number;
}

export interface QuizState {
  currentStep: number;
  totalSteps: number;
  userName: string;
  answers: any;
  quizResult: any;
  isLoading: boolean;
  mode: string;
  progress: number;
  // Extras para navegação/UX
  stepValidation?: Record<number, boolean>;
  stepInfo?: ReturnType<typeof coreGetStepInfo>;
  stepConfig?: ReturnType<typeof QuizDataService.getStepConfig>;
}

export interface QuizActions {
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  saveName: (name: string) => void;
  answerScoredQuestion: (questionId: string, optionId: string) => void;
  answerStrategy: (questionId: string, optionId: string) => void;
  getStepData: () => any;
  // Novos helpers
  setStepValid: (step: number, valid: boolean) => void;
  getStepInfo: (step?: number) => ReturnType<typeof coreGetStepInfo>;
  getStepConfig: (step?: number) => ReturnType<typeof QuizDataService.getStepConfig>;
  preloadTemplates: () => Promise<void>;
}

/**
 * 🎯 HOOK PRINCIPAL DO QUIZ FLOW
 *
 * Controla fluxo das 21 etapas usando dados reais
 * Funciona tanto em produção quanto no editor
 */
export const useQuizFlow = ({
  mode = 'production',
  onStepChange,
  initialStep = 1,
}: QuizFlowProps = {}) => {
  const { schedule, cancel } = useOptimizedScheduler();
  const stepNavStore = useStepNavigationStore();
  const [currentStep, setCurrentStep] = useState(initialStep);
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [stepValidation, setStepValidation] = useState<Record<number, boolean>>({});

  const {
    answers,
    answerQuestion,
    answerStrategicQuestion,
    setUserNameFromInput,
    quizResult,
  } = useQuizLogic();

  // Navegar para próxima etapa
  const nextStep = useCallback(() => {
    if (currentStep < 21) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      onStepChange?.(newStep);
    }
  }, [currentStep, onStepChange]);

  // Voltar etapa
  const prevStep = useCallback(() => {
    if (currentStep > 1) {
      const newStep = currentStep - 1;
      setCurrentStep(newStep);
      onStepChange?.(newStep);
    }
  }, [currentStep, onStepChange]);

  // Ir para etapa específica (para editor)
  const goToStep = useCallback(
    (step: number) => {
      if (step >= 1 && step <= 21) {
        setCurrentStep(step);
        onStepChange?.(step);
      }
    },
    [onStepChange]
  );

  // Salvar nome na etapa 1
  const saveName = useCallback(
    (name: string) => {
      setUserName(name);
      setUserNameFromInput(name);
      try { StorageService.safeSetString('userName', name); } catch { }
      // Validar etapa 1 quando nome preenchido
      setStepValidation(prev => ({ ...prev, 1: !!name?.trim() }));
      nextStep();
    },
    [nextStep, setUserNameFromInput]
  );

  // Responder pergunta com pontuação
  const answerScoredQuestion = useCallback(
    (questionId: string, optionId: string) => {
      answerQuestion(questionId, optionId);
      // Marca etapa atual como válida
      setStepValidation(prev => ({ ...prev, [currentStep]: true }));
      // Auto-advance controlado por store
      const cfg = stepNavStore.getStepConfig(`step-${currentStep}`);
      if (cfg.autoAdvanceOnComplete) {
        cancel('quizflow-ux-next');
        schedule('quizflow-ux-next', nextStep, cfg.autoAdvanceDelay ?? 500, 'timeout');
      }
    },
    [answerQuestion, nextStep, currentStep, stepNavStore, cancel, schedule]
  );

  // Responder pergunta estratégica
  const answerStrategy = useCallback(
    (questionId: string, optionId: string) => {
      answerStrategicQuestion(questionId, optionId, 'strategic', 'tracking');
      setStepValidation(prev => ({ ...prev, [currentStep]: true }));
      const cfg = stepNavStore.getStepConfig(`step-${currentStep}`);
      if (cfg.autoAdvanceOnComplete) {
        cancel('quizflow-ux-next');
        schedule('quizflow-ux-next', nextStep, cfg.autoAdvanceDelay ?? 500, 'timeout');
      }
    },
    [answerStrategicQuestion, nextStep, currentStep, stepNavStore, cancel, schedule]
  );

  // Auto-avançar na etapa 19 (processamento)
  useEffect(() => {
    if (currentStep === 19) {
      setIsLoading(true);
      cancel('quizflow-step19');
      schedule(
        'quizflow-step19',
        async () => {
          try {
            // 1) Checar threshold mínimo usando UnifiedQuizStorage
            const { unifiedQuizStorage } = await import('@/services/core/UnifiedQuizStorage');
            const hasEnough = unifiedQuizStorage.hasEnoughDataForResult();

            if (!hasEnough) {
              // Não calcular; apenas avançar
              setIsLoading(false);
              nextStep();
              return;
            }

            // 2) Obter selections e nome e orquestrar cálculo único
            const data = unifiedQuizStorage.loadData();
            const { ResultOrchestrator } = await import('@/services/core/ResultOrchestrator');
            const sessionId = StorageService.safeGetString('quizSessionId') || `local-${Date.now()}`;
            try { StorageService.safeSetString('quizSessionId', sessionId); } catch { }
            await ResultOrchestrator.run({
              selectionsByQuestion: data.selections,
              userName: data.formData.userName || data.formData.name || '',
              persistToSupabase: false,
              sessionId,
            });
            try { window.dispatchEvent(new Event('quiz-result-updated')); } catch { }
          } catch (e) {
            // Silencioso: a tela de resultado terá fallback neutro se necessário
          } finally {
            setIsLoading(false);
            nextStep();
          }
        },
        600,
        'timeout'
      );
      return () => cancel('quizflow-step19');
    }
  }, [currentStep, nextStep]);

  // Persistir resultado calculado no core para consumo universal (blocos de resultado)
  useEffect(() => {
    if (quizResult) {
      try {
        StorageService.safeSetJSON('quizResult', quizResult);
        // Notificar listeners (blocos de resultado) que o resultado mudou
        try {
          window.dispatchEvent(new Event('quiz-result-updated'));
        } catch { }
      } catch { }
    }
  }, [quizResult]);

  // Buscar dados da etapa atual
  const getStepData = useCallback(() => {
    // Template keys are padded: step-01, step-02, etc.
    const stepKey = `step-${String(currentStep).padStart(2, '0')}`;
    return QUIZ_STYLE_21_STEPS_TEMPLATE[stepKey] || [];
  }, [currentStep]);

  // Helpers derivados
  const stepInfo = useMemo(() => {
    const base = coreGetStepInfo(currentStep);
    const step = currentStep;

    const category = (() => {
      if (step === 1) return 'Introdução';
      if (step >= 2 && step <= 11) return 'Quiz Principal';
      if (step === 12) return 'Transição';
      if (step >= 13 && step <= 18) return 'Análise Estratégica';
      if (step === 19) return 'Processamento';
      if (step === 20) return 'Resultado';
      if (step === 21) return 'Conversão';
      return 'Indefinido';
    })();

    const requirements = (() => {
      if (step === 1) return { selections: 1, type: 'text-input' as const };
      if (step >= 2 && step <= 11) return { selections: 3, type: 'multiple-choice' as const };
      if (step === 12 || step === 19) return { selections: 1, type: 'transition' as const };
      if (step >= 13 && step <= 18) return { selections: 1, type: 'single-choice' as const };
      if (step === 20 || step === 21) return { selections: 1, type: 'result-offer' as const };
      return { selections: 1, type: 'unknown' as const };
    })();

    const flags = {
      isTransition: step === 12 || step === 19,
      isResult: step === 20 || step === 21,
      isStrategic: step >= 13 && step <= 18,
      isMainQuiz: step >= 2 && step <= 11,
    };

    const displayType = (() => {
      if (step === 1) return 'Início';
      if (step >= 2 && step <= 11) return 'Questões';
      if (step === 12) return 'Transição';
      if (step >= 13 && step <= 18) return 'Estratégicas';
      if (step === 19) return 'Análise';
      if (step === 20) return 'Resultado';
      if (step === 21) return 'Oferta';
      return 'Desconhecido';
    })();

    return { ...base, category, requirements, ...flags, displayType };
  }, [currentStep]);

  const setStepValid = useCallback((step: number, valid: boolean) => {
    setStepValidation(prev => ({ ...prev, [step]: valid }));
  }, []);

  const getStepInfo = useCallback(
    (step?: number) => coreGetStepInfo(step ?? currentStep),
    [currentStep]
  );

  const getStepConfig = useCallback(
    (step?: number) => QuizDataService.getStepConfig(step ?? currentStep),
    [currentStep]
  );

  const preloadTemplates = useCallback(async () => {
    try {
      await TemplateManager.preloadCommonTemplates();
    } catch (e) {
      console.warn('Falha ao pré-carregar templates:', e);
    }
  }, []);

  // Estado atual do quiz
  const quizState: QuizState = {
    currentStep,
    totalSteps: 21,
    userName,
    answers,
    quizResult,
    isLoading,
    mode,
    progress: Math.round((currentStep / 21) * 100),
    stepValidation,
    stepInfo,
    stepConfig: QuizDataService.getStepConfig(currentStep),
  };

  // Ações disponíveis
  const actions: QuizActions = {
    nextStep,
    prevStep,
    goToStep,
    saveName,
    answerScoredQuestion,
    answerStrategy,
    getStepData,
    setStepValid,
    getStepInfo,
    getStepConfig,
    preloadTemplates,
  };

  return { quizState, actions };
};
