/**
 * 🎯 EDITOR UNIFIED PROVIDER
 * 
 * Provider único que consolida TODAS as responsabilidades dos 7 providers anteriores:
 * ❌ UnifiedFunnelProvider → EditorUnifiedProvider (integração direta com core)
 * ❌ FunnelsProvider → EditorUnifiedProvider (dados via FunnelUnifiedService)
 * ❌ EditorProvider → EditorUnifiedProvider (estado de blocos unificado)
 * ❌ LegacyCompatibilityWrapper → EditorUnifiedProvider (sem adaptações)
 * ❌ EditorQuizProvider → EditorUnifiedProvider (estado de quiz integrado)
 * ❌ Quiz21StepsProvider → EditorUnifiedProvider (navegação unificada)
 * ❌ QuizFlowProvider → EditorUnifiedProvider (fluxo integrado)
 * 
 * BENEFÍCIOS:
 * - Single source of truth para TODOS os dados
 * - Performance otimizada (sem re-renders em cascata)
 * - Event system limpo e centralizado
 * - Integração direta com FunnelUnifiedService (core)
 * - Memory leaks eliminados
 * - Race conditions eliminadas
 */

import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
    ReactNode
} from 'react';
import { funnelUnifiedService, type UnifiedFunnelData } from '@/services/FunnelUnifiedService';
import { FunnelContext } from '@/core/contexts/FunnelContext';
import { Block } from '@/types/editor';
import { getBlocksForStep } from '@/config/quizStepsComplete';
import { useHistoryState } from '@/hooks/useHistoryState';
import { logger } from '@/utils/debugLogger';
import { calculateAndSaveQuizResult } from '@/utils/quizResultCalculator';
import { validateStep } from '@/utils/stepValidationRegistry';

// ============================================================================
// INTERFACES UNIFICADAS
// ============================================================================

/**
 * Estado unificado que consolida TODOS os estados dos providers anteriores
 */
export interface EditorUnifiedState {
    // 🎯 FUNIL (ex-UnifiedFunnelProvider)
    funnelId: string | null;
    funnel: UnifiedFunnelData | null;
    isLoading: boolean;
    error: string | null;

    // 🎯 EDITOR (ex-EditorProvider)  
    stepBlocks: Record<string, Block[]>;
    selectedBlockId: string | null;
    stepValidation: Record<number, boolean>;

    // 🎯 NAVEGAÇÃO (ex-Quiz21StepsProvider + QuizFlowProvider)
    currentStep: number;
    totalSteps: number;
    canGoNext: boolean;
    canGoPrevious: boolean;

    // 🎯 QUIZ (ex-EditorQuizProvider)
    answers: Array<{
        questionId: string;
        optionId: string;
        value: any;
        stepNumber: number;
    }>;
    sessionData: Record<string, any>;
    userName: string;

    // 🎯 VALIDAÇÃO
    isCurrentStepComplete: boolean;
    progress: number; // 0-100
}

/**
 * Ações unificadas que consolidam TODAS as ações dos providers anteriores
 */
export interface EditorUnifiedActions {
    // 🎯 FUNIL
    loadFunnel: (id: string) => Promise<void>;
    createFunnel: (name: string, options?: any) => Promise<UnifiedFunnelData>;
    updateFunnel: (updates: any) => Promise<void>;
    saveFunnel: () => Promise<void>;

    // 🎯 NAVEGAÇÃO
    goToStep: (step: number) => void;
    goToNextStep: () => void;
    goToPreviousStep: () => void;

    // 🎯 EDITOR
    addBlock: (stepKey: string, block: Block, index?: number) => void;
    updateBlock: (stepKey: string, blockId: string, updates: Record<string, any>) => void;
    removeBlock: (stepKey: string, blockId: string) => void;
    reorderBlocks: (stepKey: string, oldIndex: number, newIndex: number) => void;
    setSelectedBlockId: (blockId: string | null) => void;

    // 🎯 QUIZ
    saveAnswer: (questionId: string, optionId: string, value?: any) => void;
    setUserName: (name: string) => void;
    updateSessionData: (data: Record<string, any>) => void;
    resetQuiz: () => void;
    calculateResult: () => Promise<void>;

    // 🎯 HISTÓRICO
    undo: () => void;
    redo: () => void;
    canUndo: boolean;
    canRedo: boolean;

    // 🎯 VALIDAÇÃO
    setStepValid: (step: number, isValid: boolean) => void;
    validateCurrentStep: () => boolean;

    // 🎯 UTILITÁRIOS
    exportState: () => string;
    importState: (json: string) => void;
    retry: () => void;
}

/**
 * Context value unificado
 */
export interface EditorUnifiedContextValue {
    state: EditorUnifiedState;
    actions: EditorUnifiedActions;
}

// ============================================================================
// CONTEXT & HOOK
// ============================================================================

const EditorUnifiedContext = createContext<EditorUnifiedContextValue | null>(null);

export const useEditorUnified = (): EditorUnifiedContextValue => {
    const context = useContext(EditorUnifiedContext);
    if (!context) {
        throw new Error('useEditorUnified must be used within EditorUnifiedProvider');
    }
    return context;
};

// Hook com fallback seguro para componentes que podem existir fora do editor
export const useEditorUnifiedOptional = (): EditorUnifiedContextValue | null => {
    return useContext(EditorUnifiedContext);
};

// ============================================================================
// EVENT MANAGER CENTRALIZADO 
// ============================================================================

/**
 * Manager centralizado que substitui os 13 event listeners distribuídos
 */
class EditorEventManager {
    private static instance: EditorEventManager;
    private navigationHandlers = new Set<(step: number) => void>();
    private selectionHandlers = new Set<(valid: boolean) => void>();
    private isListening = false;

    static getInstance(): EditorEventManager {
        if (!this.instance) {
            this.instance = new EditorEventManager();
        }
        return this.instance;
    }

    addNavigationListener(handler: (step: number) => void): void {
        this.navigationHandlers.add(handler);
        this.startListening();
    }

    removeNavigationListener(handler: (step: number) => void): void {
        this.navigationHandlers.delete(handler);
        this.stopListeningIfEmpty();
    }

    addSelectionListener(handler: (valid: boolean) => void): void {
        this.selectionHandlers.add(handler);
        this.startListening();
    }

    removeSelectionListener(handler: (valid: boolean) => void): void {
        this.selectionHandlers.delete(handler);
        this.stopListeningIfEmpty();
    }

    private startListening(): void {
        if (this.isListening) return;

        window.addEventListener('navigate-to-step', this.handleNavigation);
        window.addEventListener('quiz-navigate-to-step', this.handleNavigation);
        window.addEventListener('quiz-selection-change', this.handleSelection);
        window.addEventListener('quiz-form-complete', this.handleSelection);

        this.isListening = true;
        logger.debug('🎧 EditorEventManager: Started listening');
    }

    private stopListeningIfEmpty(): void {
        if (this.navigationHandlers.size === 0 && this.selectionHandlers.size === 0) {
            window.removeEventListener('navigate-to-step', this.handleNavigation);
            window.removeEventListener('quiz-navigate-to-step', this.handleNavigation);
            window.removeEventListener('quiz-selection-change', this.handleSelection);
            window.removeEventListener('quiz-form-complete', this.handleSelection);

            this.isListening = false;
            logger.debug('🔇 EditorEventManager: Stopped listening');
        }
    }

    private handleNavigation = (event: Event): void => {
        const customEvent = event as CustomEvent;
        const detail = customEvent.detail || {};

        let targetStep: number | null = null;
        if (typeof detail.step === 'number') {
            targetStep = detail.step;
        } else if (typeof detail.stepId === 'string') {
            const parsed = parseInt(detail.stepId.replace(/\D/g, ''), 10);
            if (!isNaN(parsed)) targetStep = parsed;
        }

        if (targetStep && targetStep >= 1 && targetStep <= 21) {
            this.navigationHandlers.forEach(handler => {
                try {
                    handler(targetStep!);
                } catch (error) {
                    logger.error('🚨 Navigation handler error:', error);
                }
            });
        }
    };

    private handleSelection = (event: Event): void => {
        const customEvent = event as CustomEvent;
        const detail = customEvent.detail || {};
        const isValid = Boolean(detail.valid);

        this.selectionHandlers.forEach(handler => {
            try {
                handler(isValid);
            } catch (error) {
                logger.error('🚨 Selection handler error:', error);
            }
        });
    };
}

// ============================================================================
// PROVIDER PROPS
// ============================================================================

export interface EditorUnifiedProviderProps {
    children: ReactNode;
    funnelId?: string;
    initialStep?: number;
    debugMode?: boolean;
    userId?: string;
    enableSupabase?: boolean;
}

// ============================================================================
// PROVIDER IMPLEMENTATION
// ============================================================================

export const EditorUnifiedProvider: React.FC<EditorUnifiedProviderProps> = ({
    children,
    funnelId,
    initialStep = 1,
    debugMode = false,
    userId,
    enableSupabase = false
}) => {
    // ========================================================================
    // STATE MANAGEMENT COM HISTORY
    // ========================================================================

    const getInitialState = (): EditorUnifiedState => ({
        // Funil
        funnelId: funnelId || null,
        funnel: null,
        isLoading: false,
        error: null,

        // Editor  
        stepBlocks: {},
        selectedBlockId: null,
        stepValidation: {},

        // Navegação
        currentStep: initialStep,
        totalSteps: 21,
        canGoNext: false,
        canGoPrevious: initialStep > 1,

        // Quiz
        answers: [],
        sessionData: {},
        userName: '',

        // Validação
        isCurrentStepComplete: false,
        progress: Math.round((initialStep / 21) * 100)
    });

    const {
        present: state,
        setPresent: setState,
        undo: historyUndo,
        redo: historyRedo,
        canUndo,
        canRedo,
    } = useHistoryState<EditorUnifiedState>(getInitialState(), {
        historyLimit: 50,
    });

    // Refs para evitar re-renders desnecessários
    const eventManagerRef = useRef(EditorEventManager.getInstance());
    const isInitializedRef = useRef(false);

    // ========================================================================
    // COMPUTED VALUES
    // ========================================================================

    const currentStepKey = useMemo(() => `step-${state.currentStep}`, [state.currentStep]);

    const currentStepBlocks = useMemo(() => {
        return getBlocksForStep(state.currentStep, state.stepBlocks) || [];
    }, [state.currentStep, state.stepBlocks]);

    const isCurrentStepComplete = useMemo(() => {
        // Lógica de validação específica por tipo de etapa
        if (state.currentStep === 1) {
            // Etapa de nome - verificar se userName foi preenchido
            return !!state.userName.trim();
        }

        if (state.currentStep >= 2 && state.currentStep <= 18) {
            // Etapas de quiz - verificar se há resposta salva
            return state.answers.some(answer => answer.stepNumber === state.currentStep);
        }

        if (state.currentStep === 19) {
            // Etapa de processamento - sempre permite avançar
            return true;
        }

        if (state.currentStep >= 20) {
            // Etapas finais - sempre permite
            return true;
        }

        return false;
    }, [state.currentStep, state.userName, state.answers]);

    // ========================================================================
    // FUNNEL OPERATIONS
    // ========================================================================

    const loadFunnel = useCallback(async (id: string) => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));

        try {
            logger.info('🎯 EditorUnified: Loading funnel', id);
            const funnel = await funnelUnifiedService.getFunnel(id, userId);

            if (funnel) {
                // Extrair stepBlocks do funil carregado
                const stepBlocks: Record<string, Block[]> = {};
                if (funnel.pages && Array.isArray(funnel.pages)) {
                    funnel.pages.forEach((page: any) => {
                        const stepKey = `step-${page.stepNumber || page.order}`;
                        stepBlocks[stepKey] = page.blocks || [];
                    });
                }

                setState(prev => ({
                    ...prev,
                    funnelId: id,
                    funnel,
                    stepBlocks,
                    isLoading: false,
                    error: null
                }));

                logger.info('✅ Funnel loaded successfully');
            } else {
                throw new Error('Funnel not found');
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            logger.error('❌ Error loading funnel:', errorMessage);

            setState(prev => ({
                ...prev,
                isLoading: false,
                error: errorMessage,
                funnel: null
            }));
        }
    }, [userId, setState]);

    const createFunnel = useCallback(async (name: string, options: any = {}) => {
        setState(prev => ({ ...prev, isLoading: true, error: null }));

        try {
            const funnel = await funnelUnifiedService.createFunnel({
                name,
                context: FunnelContext.EDITOR,
                userId,
                ...options
            });

            setState(prev => ({
                ...prev,
                funnelId: funnel.id,
                funnel,
                isLoading: false,
                error: null
            }));

            logger.info('✅ Funnel created successfully:', funnel.id);
            return funnel;
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error creating funnel';
            logger.error('❌ Error creating funnel:', errorMessage);

            setState(prev => ({
                ...prev,
                isLoading: false,
                error: errorMessage
            }));

            throw error;
        }
    }, [userId, setState]);

    const updateFunnel = useCallback(async (updates: any) => {
        if (!state.funnelId) {
            throw new Error('No funnel loaded to update');
        }

        try {
            const updatedFunnel = await funnelUnifiedService.updateFunnel(
                state.funnelId,
                updates,
                userId
            );

            setState(prev => ({
                ...prev,
                funnel: updatedFunnel
            }));

            logger.info('✅ Funnel updated successfully');
        } catch (error) {
            logger.error('❌ Error updating funnel:', error);
            throw error;
        }
    }, [state.funnelId, userId, setState]);

    const saveFunnel = useCallback(async () => {
        if (!state.funnelId || !state.funnel) {
            logger.warn('⚠️ No funnel to save');
            return;
        }

        try {
            // Converter stepBlocks para formato de páginas
            const pages = Object.entries(state.stepBlocks).map(([stepKey, blocks]) => ({
                stepNumber: parseInt(stepKey.replace('step-', '')),
                blocks: blocks || [],
                order: parseInt(stepKey.replace('step-', ''))
            }));

            await updateFunnel({ pages });
        } catch (error) {
            logger.error('❌ Error saving funnel:', error);
            throw error;
        }
    }, [state.funnelId, state.funnel, state.stepBlocks, updateFunnel]);

    // ========================================================================
    // NAVIGATION OPERATIONS
    // ========================================================================

    const goToStep = useCallback((step: number) => {
        if (step < 1 || step > 21) {
            logger.warn('⚠️ Invalid step:', step);
            return;
        }

        setState(prev => ({
            ...prev,
            currentStep: step,
            canGoNext: step < 21,
            canGoPrevious: step > 1,
            progress: Math.round((step / 21) * 100)
        }));

        logger.debug('📍 Navigate to step:', step);
    }, [setState]);

    const goToNextStep = useCallback(() => {
        if (state.currentStep < 21 && isCurrentStepComplete) {
            goToStep(state.currentStep + 1);
        }
    }, [state.currentStep, isCurrentStepComplete, goToStep]);

    const goToPreviousStep = useCallback(() => {
        if (state.currentStep > 1) {
            goToStep(state.currentStep - 1);
        }
    }, [state.currentStep, goToStep]);

    // ========================================================================
    // BLOCK OPERATIONS
    // ========================================================================

    const addBlock = useCallback((stepKey: string, block: Block, index?: number) => {
        setState(prev => {
            const currentBlocks = prev.stepBlocks[stepKey] || [];
            const newBlocks = [...currentBlocks];

            if (typeof index === 'number') {
                newBlocks.splice(index, 0, block);
            } else {
                newBlocks.push(block);
            }

            return {
                ...prev,
                stepBlocks: {
                    ...prev.stepBlocks,
                    [stepKey]: newBlocks
                },
                selectedBlockId: block.id
            };
        });

        logger.debug('🧩 Block added:', { stepKey, blockId: block.id, index });
    }, [setState]);

    const updateBlock = useCallback((stepKey: string, blockId: string, updates: Record<string, any>) => {
        setState(prev => {
            const blocks = prev.stepBlocks[stepKey] || [];
            const blockIndex = blocks.findIndex(b => b.id === blockId);

            if (blockIndex === -1) {
                logger.warn('⚠️ Block not found for update:', blockId);
                return prev;
            }

            const newBlocks = [...blocks];
            newBlocks[blockIndex] = {
                ...newBlocks[blockIndex],
                ...updates
            };

            return {
                ...prev,
                stepBlocks: {
                    ...prev.stepBlocks,
                    [stepKey]: newBlocks
                }
            };
        });

        logger.debug('✏️ Block updated:', { stepKey, blockId });
    }, [setState]);

    const removeBlock = useCallback((stepKey: string, blockId: string) => {
        setState(prev => {
            const blocks = prev.stepBlocks[stepKey] || [];
            const newBlocks = blocks.filter(b => b.id !== blockId);

            return {
                ...prev,
                stepBlocks: {
                    ...prev.stepBlocks,
                    [stepKey]: newBlocks
                },
                selectedBlockId: prev.selectedBlockId === blockId ? null : prev.selectedBlockId
            };
        });

        logger.debug('🗑️ Block removed:', { stepKey, blockId });
    }, [setState]);

    const reorderBlocks = useCallback((stepKey: string, oldIndex: number, newIndex: number) => {
        setState(prev => {
            const blocks = prev.stepBlocks[stepKey] || [];
            if (oldIndex < 0 || oldIndex >= blocks.length || newIndex < 0 || newIndex >= blocks.length) {
                return prev;
            }

            const newBlocks = [...blocks];
            const [movedBlock] = newBlocks.splice(oldIndex, 1);
            newBlocks.splice(newIndex, 0, movedBlock);

            return {
                ...prev,
                stepBlocks: {
                    ...prev.stepBlocks,
                    [stepKey]: newBlocks
                }
            };
        });

        logger.debug('🔄 Blocks reordered:', { stepKey, oldIndex, newIndex });
    }, [setState]);

    const setSelectedBlockId = useCallback((blockId: string | null) => {
        setState(prev => ({ ...prev, selectedBlockId: blockId }));
    }, [setState]);

    // ========================================================================
    // QUIZ OPERATIONS
    // ========================================================================

    const saveAnswer = useCallback((questionId: string, optionId: string, value?: any) => {
        setState(prev => {
            const existingAnswerIndex = prev.answers.findIndex(
                a => a.questionId === questionId && a.stepNumber === prev.currentStep
            );

            const newAnswer = {
                questionId,
                optionId,
                value: value || optionId,
                stepNumber: prev.currentStep
            };

            const newAnswers = [...prev.answers];
            if (existingAnswerIndex >= 0) {
                newAnswers[existingAnswerIndex] = newAnswer;
            } else {
                newAnswers.push(newAnswer);
            }

            return {
                ...prev,
                answers: newAnswers
            };
        });

        logger.debug('💾 Answer saved:', { questionId, optionId, step: state.currentStep });
    }, [state.currentStep, setState]);

    const setUserName = useCallback((name: string) => {
        setState(prev => ({ ...prev, userName: name.trim() }));
        logger.debug('👤 Username set:', name);
    }, [setState]);

    const updateSessionData = useCallback((data: Record<string, any>) => {
        setState(prev => ({
            ...prev,
            sessionData: { ...prev.sessionData, ...data }
        }));
    }, [setState]);

    const resetQuiz = useCallback(() => {
        setState(prev => ({
            ...prev,
            currentStep: 1,
            answers: [],
            sessionData: {},
            userName: '',
            selectedBlockId: null,
            canGoNext: false,
            canGoPrevious: false,
            progress: Math.round((1 / 21) * 100)
        }));

        logger.info('🔄 Quiz reset');
    }, [setState]);

    const calculateResult = useCallback(async () => {
        try {
            logger.info('🧮 Calculating quiz result');
            await calculateAndSaveQuizResult();
            logger.info('✅ Quiz result calculated');
        } catch (error) {
            logger.error('❌ Error calculating result:', error);
            throw error;
        }
    }, []);

    // ========================================================================
    // VALIDATION OPERATIONS
    // ========================================================================

    const setStepValid = useCallback((step: number, isValid: boolean) => {
        setState(prev => ({
            ...prev,
            stepValidation: {
                ...prev.stepValidation,
                [step]: isValid
            }
        }));
    }, [setState]);

    const validateCurrentStep = useCallback(() => {
        try {
            const result = validateStep(state.currentStep, state.stepBlocks);
            const isValid = Boolean(result.valid);
            setStepValid(state.currentStep, isValid);
            return isValid;
        } catch (error) {
            logger.error('❌ Validation error:', error);
            return false;
        }
    }, [state.currentStep, state.stepBlocks, setStepValid]);

    // ========================================================================
    // UTILITY OPERATIONS
    // ========================================================================

    const exportState = useCallback(() => {
        return JSON.stringify({
            ...state,
            timestamp: new Date().toISOString(),
            version: '1.0'
        }, null, 2);
    }, [state]);

    const importState = useCallback((json: string) => {
        try {
            const imported = JSON.parse(json);
            if (imported.version === '1.0') {
                setState(imported);
                logger.info('✅ State imported successfully');
            } else {
                throw new Error('Unsupported state version');
            }
        } catch (error) {
            logger.error('❌ Error importing state:', error);
            throw error;
        }
    }, [setState]);

    const retry = useCallback(() => {
        if (state.funnelId) {
            loadFunnel(state.funnelId);
        }
    }, [state.funnelId, loadFunnel]);

    // ========================================================================
    // EFFECTS
    // ========================================================================

    // Initialize provider
    useEffect(() => {
        if (isInitializedRef.current) return;
        isInitializedRef.current = true;

        logger.info('🎯 EditorUnifiedProvider initialized', {
            funnelId,
            initialStep,
            debugMode,
            userId
        });

        // Load funnel if provided
        if (funnelId) {
            loadFunnel(funnelId);
        }

        // Setup event listeners
        const eventManager = eventManagerRef.current;
        eventManager.addNavigationListener(goToStep);

        return () => {
            eventManager.removeNavigationListener(goToStep);
        };
    }, [funnelId, initialStep, debugMode, userId, loadFunnel, goToStep]);

    // Update computed state
    useEffect(() => {
        setState(prev => ({
            ...prev,
            isCurrentStepComplete,
            canGoNext: isCurrentStepComplete && prev.currentStep < 21
        }));
    }, [isCurrentStepComplete, setState]);

    // Auto-calculate result on steps 19/20
    useEffect(() => {
        if (state.currentStep === 19 || state.currentStep === 20) {
            const timer = setTimeout(() => {
                calculateResult().catch(error => {
                    logger.error('Auto-calculation failed:', error);
                });
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [state.currentStep, calculateResult]);

    // Global state exposure for debugging
    useEffect(() => {
        if (debugMode && typeof window !== 'undefined') {
            (window as any).__EDITOR_UNIFIED_STATE__ = state;
            (window as any).__EDITOR_UNIFIED_ACTIONS__ = {
                loadFunnel,
                goToStep,
                addBlock,
                updateBlock,
                removeBlock,
                saveAnswer,
                resetQuiz
            };
        }
    }, [debugMode, state]);

    // ========================================================================
    // CONTEXT VALUE
    // ========================================================================

    const contextValue: EditorUnifiedContextValue = useMemo(() => ({
        state: {
            ...state,
            isCurrentStepComplete,
            canGoNext: isCurrentStepComplete && state.currentStep < 21
        },
        actions: {
            // Funil
            loadFunnel,
            createFunnel,
            updateFunnel,
            saveFunnel,

            // Navegação
            goToStep,
            goToNextStep,
            goToPreviousStep,

            // Editor
            addBlock,
            updateBlock,
            removeBlock,
            reorderBlocks,
            setSelectedBlockId,

            // Quiz
            saveAnswer,
            setUserName,
            updateSessionData,
            resetQuiz,
            calculateResult,

            // Histórico
            undo: historyUndo,
            redo: historyRedo,
            canUndo,
            canRedo,

            // Validação
            setStepValid,
            validateCurrentStep,

            // Utilitários
            exportState,
            importState,
            retry
        }
    }), [
        state,
        isCurrentStepComplete,
        loadFunnel,
        createFunnel,
        updateFunnel,
        saveFunnel,
        goToStep,
        goToNextStep,
        goToPreviousStep,
        addBlock,
        updateBlock,
        removeBlock,
        reorderBlocks,
        setSelectedBlockId,
        saveAnswer,
        setUserName,
        updateSessionData,
        resetQuiz,
        calculateResult,
        historyUndo,
        historyRedo,
        canUndo,
        canRedo,
        setStepValid,
        validateCurrentStep,
        exportState,
        importState,
        retry
    ]);

    if (debugMode) {
        logger.debug('🔍 EditorUnifiedProvider render:', {
            currentStep: state.currentStep,
            blocksCount: Object.keys(state.stepBlocks).length,
            answersCount: state.answers.length,
            isLoading: state.isLoading,
            error: state.error
        });
    }

    return (
        <EditorUnifiedContext.Provider value={contextValue}>
            {children}
        </EditorUnifiedContext.Provider>
    );
};

export default EditorUnifiedProvider;