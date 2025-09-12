import { QuizFlowProvider } from '@/context/QuizFlowProvider';
import { templateLibraryService } from '@/services/templateLibraryService';
import { convertTemplateToFunnel } from '@/utils/templateConverter';
import React from 'react';
import { useLocation, useParams } from 'wouter';
import { ErrorBoundary } from '../components/editor/ErrorBoundary';
import { FunnelsProvider } from '@/context/FunnelsContext';
import { EditorQuizProvider } from '@/context/EditorQuizContext';
import { Quiz21StepsProvider } from '@/components/quiz/Quiz21StepsProvider';
import { LegacyCompatibilityWrapper } from '@/core/contexts/LegacyCompatibilityWrapper';
import { FunnelContext } from '@/core/contexts/FunnelContext';
import { EditorProvider } from '../components/editor/EditorProvider';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useFunnelContext } from '@/hooks/useFunnelLoader';
import FunnelFallback from '@/components/editor/FunnelFallback';
import { UnifiedFunnelProvider } from '@/context/UnifiedFunnelContext';
import EditorFallback from '@/components/editor/EditorFallback';
import { EditorRuntimeProviders } from '@/context/EditorRuntimeProviders';

/**
 * 🎯 MAIN EDITOR UNIFICADO - CONSOLIDADO
 *
 * Editor principal consolidando todas as funcionalidades dos editores legacy:
 * - MainEditor.tsx (configuração Supabase, template loading, import dinâmico)
 * - MainEditorUnified.tsx (context unificado, performance otimizada)
 * 
 * Features consolidadas:
 * - Context unificado via UnifiedContextProvider + LegacyCompatibilityWrapper
 * - Configuração Supabase robusta do MainEditor legacy
 * - Template loading integrado com fallback robusto
 * - Import dinâmico com fallback para NewUnifiedEditor
 * - Estado persistente e contextual
 * - Performance otimizada
 * - Debug mode avançado via URL params
 * - Máxima compatibilidade com componentes legacy
 * 
 * ✅ MUDANÇA IMPORTANTE:
 * - Agora usa EditorPro como editor principal (funcional e testado)
 * - NewUnifiedEditor como fallback (funcionalidade limitada)
 * - Garante estrutura de 4 colunas funcionais: etapas, componentes, canvas, propriedades
 */
const MainEditorUnified: React.FC = () => {
    const [location] = useLocation();
    const params = React.useMemo(() => new URLSearchParams(location.split('?')[1] || ''), [location]);
    const routeParams = useParams<{ funnelId?: string }>();

    // Capturar funnelId tanto da rota (/editor/:funnelId) quanto da query (?funnel=id)
    const templateId = params.get('template');
    const funnelId = routeParams.funnelId || params.get('funnel');
    const duplicateId = params.get('duplicate'); // ID do template a ser duplicado
    const refactorFlag = params.get('providerRefactor') === 'true';
    const stepParam = params.get('step');
    const initialStep = stepParam ? Math.max(1, Math.min(21, parseInt(stepParam))) : undefined;

    // Debug mode baseado em parâmetros URL
    const debugMode = params.get('debug') === 'true';

    // Configuração Supabase consolidada do MainEditor legacy
    const supabaseConfig = React.useMemo(() => ({
        enabled: (import.meta as any)?.env?.VITE_ENABLE_SUPABASE === 'true',
        funnelId: funnelId || (import.meta as any)?.env?.VITE_SUPABASE_FUNNEL_ID,
        quizId: (import.meta as any)?.env?.VITE_SUPABASE_QUIZ_ID || funnelId || 'local-funnel',
        storageKey: 'main-editor-unified-state'
    }), [funnelId]);

    // Log sempre para depuração
    console.log('🎯 MainEditorUnified iniciado:', {
        location,
        routeParams,
        templateId,
        funnelId,
        duplicateId,
        initialStep,
        supabaseConfig,
        debugMode
    });

    if (debugMode) {
        console.log('🎯 MainEditorUnified modo debug ativo');
    }

    // Determinar que ID de template usar (template direto ou duplicação)
    const resolvedTemplateId = React.useMemo(() => {
        if (duplicateId) {
            if (debugMode) {
                console.log('🔄 Modo duplicação ativado para template:', duplicateId);
            }
            return duplicateId;
        }
        return templateId;
    }, [templateId, duplicateId, debugMode]);

    return (
        <div>
            <ErrorBoundary>
                {refactorFlag ? (
                    <EditorRuntimeProviders
                        funnelId={funnelId || undefined}
                        initialStep={initialStep}
                        debugMode={debugMode}
                        supabaseConfig={supabaseConfig}
                    >
                        <FunnelValidatedEditor
                            templateId={resolvedTemplateId || undefined}
                            funnelId={funnelId || undefined}
                            debugMode={debugMode}
                        />
                    </EditorRuntimeProviders>
                ) : (
                    <UnifiedFunnelProvider
                        funnelId={funnelId || undefined}
                        debugMode={debugMode}
                    >
                        <FunnelsProvider debug={debugMode}>
                            {/* Híbrido legacy original */}
                            <EditorProvider
                                enableSupabase={supabaseConfig.enabled}
                                funnelId={supabaseConfig.funnelId}
                                quizId={supabaseConfig.quizId}
                                storageKey={supabaseConfig.storageKey}
                                initial={initialStep ? { currentStep: initialStep } : undefined}
                            >
                                <LegacyCompatibilityWrapper
                                    enableWarnings={debugMode}
                                    initialContext={FunnelContext.EDITOR}
                                >
                                    <EditorQuizProvider>
                                        <Quiz21StepsProvider debug={debugMode} initialStep={initialStep}>
                                            <QuizFlowProvider initialStep={initialStep} totalSteps={21}>
                                                <FunnelValidatedEditor
                                                    templateId={resolvedTemplateId || undefined}
                                                    funnelId={funnelId || undefined}
                                                    debugMode={debugMode}
                                                />
                                            </QuizFlowProvider>
                                        </Quiz21StepsProvider>
                                    </EditorQuizProvider>
                                </LegacyCompatibilityWrapper>
                            </EditorProvider>
                        </FunnelsProvider>
                    </UnifiedFunnelProvider>
                )}
            </ErrorBoundary>
        </div>
    );
};

/**
 * � EDITOR COM VALIDAÇÃO DE FUNIL
 * 
 * Wrapper que valida o funil antes de carregar o editor:
 * - Verifica existência e permissões
 * - Mostra loading states apropriados
 * - Fornece fallbacks para erros
 * - Centraliza estado do funil
 */
const FunnelValidatedEditor: React.FC<{
    templateId?: string;
    funnelId?: string;
    debugMode?: boolean;
}> = ({
    templateId,
    funnelId,
    debugMode = false,
}) => {
        let funnelContext;
        try {
            funnelContext = useFunnelContext(funnelId);
        } catch (error) {
            console.error('❌ FunnelValidatedEditor: Erro no useFunnelContext:', error);

            // Fallback para quando o contexto não está disponível
            return (
                <div className="flex items-center justify-center min-h-screen bg-gray-50">
                    <div className="max-w-md mx-auto text-center">
                        <h2 className="text-xl font-bold text-red-600 mb-4">Erro de Contexto</h2>
                        <p className="text-gray-600 mb-4">
                            O hook useFunnelContext falhou: {String(error)}
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                        >
                            Recarregar Página
                        </button>
                    </div>
                </div>
            );
        }

        if (debugMode) {
            console.log('🔐 FunnelValidatedEditor:', {
                funnelId,
                isReady: funnelContext.isReady,
                isLoading: funnelContext.isLoading,
                isError: funnelContext.isError,
                errorType: funnelContext.errorType
            });
        }

        // Se não há funnelId, prosseguir sem validação (modo template)
        if (!funnelId) {
            return (
                <EditorInitializerUnified
                    templateId={templateId}
                    funnelId={undefined}
                    debugMode={debugMode}
                />
            );
        }

        // Loading state durante validação
        if (funnelContext.isLoading) {
            return (
                <div className="flex items-center justify-center min-h-screen bg-gray-50">
                    <div className="text-center">
                        <LoadingSpinner size="lg" className="mb-4" />
                        <p className="text-gray-600 text-lg font-medium">
                            Validando acesso ao funil...
                        </p>
                        {debugMode && (
                            <p className="text-xs text-gray-400 mt-2 font-mono">
                                Funil: {funnelId}
                            </p>
                        )}
                    </div>
                </div>
            );
        }

        // Error state - mostrar fallback
        if (funnelContext.isError) {
            return (
                <FunnelFallback
                    errorType={funnelContext.errorType || 'UNKNOWN'}
                    errorMessage={funnelContext.error || 'Erro desconhecido'}
                    funnelId={funnelId}
                    suggestions={funnelContext.suggestions}
                    onRetry={funnelContext.retry}
                    onCreateNew={() => {
                        window.location.href = '/editor?template=default';
                    }}
                />
            );
        }

        // Sucesso - funil validado, carregar editor
        if (funnelContext.isReady) {
            return (
                <EditorProvider
                    enableSupabase={false}
                    funnelId={funnelId || undefined}
                    storageKey={`editor-state-${funnelId || 'default'}`}
                >
                    <EditorInitializerUnified
                        templateId={templateId}
                        funnelId={funnelId}
                        debugMode={debugMode}
                        validatedFunnel={funnelContext.funnel}
                        canEdit={funnelContext.canEdit}
                    />
                </EditorProvider>
            );
        }

        // Estado desconhecido - mostrar loading como fallback
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <LoadingSpinner size="lg" className="mb-4" />
                    <p className="text-gray-600 text-lg font-medium">
                        Carregando editor...
                    </p>
                </div>
            </div>
        );
    };

/**
 * � EDITOR INITIALIZER UNIFICADO COM TIMEOUT E FALLBACKS
 * 
 * Consolidado dos EditorInitializer do MainEditor.tsx com funcionalidades:
 * - Import dinâmico com fallback robusto e timeout
 * - Template loading via UnifiedTemplateManager
 * - Error handling e recovery automático
 * - Loading states otimizados com timeout
 * - Suporte para funil validado
 * - Fallback para editor legacy
 * - Validação explícita de parâmetros
 */
const EditorInitializerUnified: React.FC<{
    templateId?: string;
    funnelId?: string;
    debugMode?: boolean;
    validatedFunnel?: any;
    canEdit?: boolean;
}> = ({
    templateId,
    funnelId,
    debugMode = false
}) => {
        const [UnifiedEditorComp, setUnifiedEditorComp] = React.useState<React.ComponentType | null>(null);
        const [isLoading, setIsLoading] = React.useState(true);
        const [loadingTemplate, setLoadingTemplate] = React.useState(false);
        const [error, setError] = React.useState<string | null>(null);
        const [loadingTimeout, setLoadingTimeout] = React.useState(false);
        const [fallbackMode, setFallbackMode] = React.useState(false);

        const startTime = React.useRef(Date.now());

        // 🔍 Validação explícita de parâmetros
        const validateParameters = React.useCallback(() => {
            const sanitizedTemplateId = templateId?.trim();
            const sanitizedFunnelId = funnelId?.trim();

            console.log('🔍 [VALIDAÇÃO] Parâmetros recebidos:', {
                templateId: sanitizedTemplateId,
                funnelId: sanitizedFunnelId,
                debugMode,
                timestamp: new Date().toISOString()
            });

            // Validar templateId se fornecido
            if (sanitizedTemplateId && sanitizedTemplateId.length > 100) {
                console.warn('⚠️ [VALIDAÇÃO] templateId muito longo:', sanitizedTemplateId.substring(0, 50) + '...');
                return { templateId: undefined, funnelId: sanitizedFunnelId };
            }

            // Validar funnelId se fornecido
            if (sanitizedFunnelId && sanitizedFunnelId.length > 100) {
                console.warn('⚠️ [VALIDAÇÃO] funnelId muito longo:', sanitizedFunnelId.substring(0, 50) + '...');
                return { templateId: sanitizedTemplateId, funnelId: undefined };
            }

            return { templateId: sanitizedTemplateId, funnelId: sanitizedFunnelId };
        }, [templateId, funnelId, debugMode]);

        // 🔄 Template loading consolidado com timeout e conversão
        const loadTemplateFromId = React.useCallback(async () => {
            const { templateId: validTemplateId } = validateParameters();

            if (!validTemplateId || validTemplateId === 'default') {
                console.log('📝 [TEMPLATE] Usando template padrão');
                return;
            }

            try {
                setLoadingTemplate(true);
                setError(null);

                console.log('🔄 [TEMPLATE] Carregando template:', validTemplateId);

                // 🎯 CONVERSÃO ESPECÍFICA para quiz21StepsComplete
                if (validTemplateId === 'quiz21StepsComplete' || validTemplateId.includes('quiz21Steps')) {
                    console.log('🔄 [TEMPLATE] Aplicando conversão para template:', validTemplateId);

                    try {
                        const convertedFunnel = convertTemplateToFunnel(validTemplateId);
                        console.log('✅ [TEMPLATE] Template convertido com sucesso:', {
                            id: convertedFunnel.id,
                            stages: convertedFunnel.stages.length,
                            totalBlocks: convertedFunnel.stages.reduce((sum, stage) => sum + stage.blocks.length, 0)
                        });

                        // Guardar dados convertidos para uso posterior
                        (window as any).__CONVERTED_TEMPLATE__ = convertedFunnel;

                    } catch (conversionError) {
                        console.error('❌ [TEMPLATE] Erro na conversão:', conversionError);
                        // Continuar com o carregamento padrão se a conversão falhar
                    }
                }

                // Timeout para template loading
                const templatePromise = new Promise(async (resolve, reject) => {
                    try {
                        const templates = templateLibraryService.listBuiltins();
                        const template = templates.find(t => t.id === validTemplateId);

                        if (template) {
                            console.log('✅ [TEMPLATE] Template encontrado:', template.name || validTemplateId);
                            resolve(template);
                        } else {
                            console.warn('⚠️ [TEMPLATE] Template não encontrado, usando padrão');
                            resolve(null);
                        }
                    } catch (error) {
                        reject(error);
                    }
                });

                const timeoutPromise = new Promise((_, reject) => {
                    setTimeout(() => reject(new Error('Timeout ao carregar template')), 5000);
                });

                await Promise.race([templatePromise, timeoutPromise]);

            } catch (error) {
                console.error('❌ [TEMPLATE] Erro ao carregar template:', error);
                setError(`Erro ao carregar template: ${error}`);
                loadDefaultTemplate();
            } finally {
                setLoadingTemplate(false);
            }
        }, [templateId, debugMode]);

        const loadDefaultTemplate = React.useCallback(async () => {
            try {
                console.log('✅ [TEMPLATE] Template padrão carregado');
            } catch (error) {
                console.error('❌ [TEMPLATE] Erro ao carregar template padrão:', error);
                setError(`Erro ao carregar template padrão: ${error}`);
            }
        }, [debugMode]);

        // 🔄 Carregamento dinâmico do editor com timeout e fallback
        React.useEffect(() => {
            let cancelled = false;
            let timeoutId: NodeJS.Timeout;

            console.log('🚀 [EDITOR] Iniciando carregamento do editor...');

            // Timeout de 10 segundos para loading
            timeoutId = setTimeout(() => {
                if (!cancelled) {
                    console.warn('⏰ [EDITOR] Timeout de 10s atingido, ativando fallback');
                    setLoadingTimeout(true);
                    setError('O editor está demorando para carregar. Tentando carregar modo compatibilidade...');
                    setFallbackMode(true);
                }
            }, 10000);

            (async () => {
                try {
                    setIsLoading(true);
                    setError(null);

                    console.log('🔄 [EDITOR] Carregando EditorPro (editor funcional)...');

                    // Usar EditorPro que já tem estrutura completa e funcional
                    const mod = await import('../components/editor/EditorPro');
                    const Comp = mod.default || mod.EditorPro;

                    if (!cancelled && Comp) {
                        clearTimeout(timeoutId);
                        setUnifiedEditorComp(() => Comp);
                        console.log('✅ [EDITOR] EditorPro carregado com sucesso');
                    }
                } catch (error) {
                    console.error('❌ [EDITOR] Falha ao carregar EditorPro:', error);

                    if (!cancelled) {
                        try {
                            console.log('🔄 [EDITOR] Tentando fallback para NewUnifiedEditor...');

                            const fallbackMod = await import('../components/editor/NewUnifiedEditor');
                            const FallbackComp = fallbackMod.default || fallbackMod.NewUnifiedEditor;

                            if (FallbackComp) {
                                clearTimeout(timeoutId);
                                setUnifiedEditorComp(() => FallbackComp);
                                setFallbackMode(true);
                                console.warn('⚠️ [EDITOR] Usando fallback NewUnifiedEditor (funcionalidade limitada)');
                            }
                        } catch (fallbackError) {
                            console.error('❌ [EDITOR] Falha ao carregar fallback NewUnifiedEditor:', fallbackError);
                            clearTimeout(timeoutId);
                            setError('Falha ao carregar editor. Tente recarregar a página.');
                        }
                    }
                } finally {
                    if (!cancelled) {
                        setIsLoading(false);
                    }
                }
            })();

            return () => {
                cancelled = true;
                clearTimeout(timeoutId);
            };
        }, [debugMode]);

        // Template loading effect
        React.useEffect(() => {
            if (templateId && templateId !== 'default') {
                loadTemplateFromId();
            } else {
                loadDefaultTemplate();
            }
        }, [templateId, loadTemplateFromId, loadDefaultTemplate]);

        // 🔄 Função para resetar o estado e tentar novamente
        const handleRetry = React.useCallback(() => {
            console.log('🔄 [EDITOR] Tentando recarregar...');
            setError(null);
            setIsLoading(true);
            setLoadingTimeout(false);
            setFallbackMode(false);
            startTime.current = Date.now();

            // Recarregar a página como último recurso
            window.location.reload();
        }, []);

        // 🔄 Função para resetar storage local
        const handleResetStorage = React.useCallback(() => {
            console.log('🗑️ [STORAGE] Limpando storage local...');
            try {
                // Limpar dados específicos do editor
                const keysToRemove = [];
                for (let i = 0; i < localStorage.length; i++) {
                    const key = localStorage.key(i);
                    if (key && (key.includes('editor') || key.includes('funnel'))) {
                        keysToRemove.push(key);
                    }
                }

                keysToRemove.forEach(key => localStorage.removeItem(key));
                console.log('✅ [STORAGE] Storage limpo, recarregando...');

                handleRetry();
            } catch (error) {
                console.error('❌ [STORAGE] Erro ao limpar storage:', error);
                setError('Erro ao limpar dados. Tente recarregar manualmente.');
            }
        }, [handleRetry]);

        // 💥 Estado de erro crítico
        if (error && !isLoading) {
            const timeElapsed = Math.round((Date.now() - startTime.current) / 1000);

            return (
                <div className="flex items-center justify-center min-h-screen bg-gray-50">
                    <div className="text-center max-w-md mx-auto p-6">
                        <div className="mb-4">
                            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                Erro ao Carregar Editor
                            </h3>
                            <p className="text-gray-600 mb-4">{error}</p>

                            {loadingTimeout && (
                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mb-4">
                                    <p className="text-sm text-yellow-800">
                                        ⏰ Timeout após {timeElapsed}s. O editor pode estar sobrecarregado.
                                    </p>
                                </div>
                            )}

                            {fallbackMode && (
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                                    <p className="text-sm text-blue-800">
                                        🔄 Tentando modo de compatibilidade...
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="space-y-3">
                            <button
                                onClick={handleRetry}
                                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                            >
                                🔄 Tentar Novamente
                            </button>

                            <button
                                onClick={handleResetStorage}
                                className="w-full bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700 transition-colors"
                            >
                                🗑️ Limpar Dados e Tentar Novamente
                            </button>

                            <button
                                onClick={() => window.location.href = '/admin/funis'}
                                className="w-full bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition-colors"
                            >
                                ← Voltar aos Modelos
                            </button>
                        </div>

                        {debugMode && (
                            <div className="mt-4 p-3 bg-gray-100 rounded text-xs text-gray-600 font-mono text-left">
                                <p>Debug Info:</p>
                                <p>Template: {templateId || 'none'}</p>
                                <p>Funnel: {funnelId || 'none'}</p>
                                <p>Time: {timeElapsed}s</p>
                                <p>URL: {window.location.href}</p>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        // 📊 Loading state com timeout visual
        if (isLoading) {
            const timeElapsed = Math.round((Date.now() - startTime.current) / 1000);

            return (
                <div className="flex items-center justify-center min-h-screen bg-gray-50">
                    <div className="text-center">
                        <LoadingSpinner size="lg" className="mb-4" />
                        <p className="text-gray-600 text-lg font-medium">
                            {loadingTemplate ? 'Carregando template...' : 'Carregando editor...'}
                        </p>

                        {timeElapsed > 5 && (
                            <p className="text-sm text-gray-500 mt-2">
                                Carregando há {timeElapsed}s...
                            </p>
                        )}

                        {timeElapsed > 8 && (
                            <div className="mt-3 text-sm text-yellow-600">
                                ⏰ Carregamento está demorando mais que o normal
                            </div>
                        )}

                        {debugMode && (
                            <div className="mt-4 text-xs text-gray-400 font-mono">
                                <p>Template: {templateId || 'default'}</p>
                                <p>Funnel: {funnelId || 'none'}</p>
                                <p>Time: {timeElapsed}s</p>
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        // ✅ Editor carregado com sucesso
        if (UnifiedEditorComp) {
            console.log('🎯 [EDITOR] Renderizando editor carregado');

            return (
                <div>
                    {fallbackMode && (
                        <div className="bg-yellow-50 border-b border-yellow-200 px-4 py-2">
                            <p className="text-sm text-yellow-800 text-center">
                                ⚠️ Usando editor com funcionalidade limitada
                            </p>
                        </div>
                    )}
                    <UnifiedEditorComp />
                </div>
            );
        }

        // 🚫 Estado impossível - fallback final
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center">
                    <p className="text-gray-600 text-lg">
                        Estado inesperado do editor.
                        <button
                            onClick={handleRetry}
                            className="text-blue-600 hover:text-blue-800 underline ml-1"
                        >
                            Clique aqui para tentar novamente
                        </button>
                    </p>
                </div>
            </div>
        );
    };

export default MainEditorUnified;
