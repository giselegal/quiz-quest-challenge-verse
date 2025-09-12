/**
 * 🎯 MAIN EDITOR UNIFIED - Versão Refatorada
 * 
 * ANTES: 7 providers aninhados + wrapper de compatibilidade
 * DEPOIS: 1 provider unificado + EditorProUnified simplificado
 * 
 * ELIMINAÇÕES:
 * ❌ UnifiedFunnelProvider (substituído por EditorUnifiedProvider)
 * ❌ FunnelsProvider (funcionalidade absorvida)
 * ❌ EditorProvider (funcionalidade absorvida)
 * ❌ EditorQuizProvider (funcionalidade absorvida)  
 * ❌ Quiz21StepsProvider (funcionalidade absorvida)
 * ❌ QuizFlowProvider (funcionalidade absorvida)
 * ❌ LegacyCompatibilityWrapper (não mais necessário)
 * 
 * ADIÇÕES:
 * ✅ EditorUnifiedProvider - Single source of truth
 * ✅ EditorProUnified - Versão otimizada e simplificada
 * ✅ Performance melhorada (1 provider vs 7)
 * ✅ Menos re-renders e conflitos de estado
 */

import React, { useCallback, useEffect, useState, Suspense } from 'react';
import { useLocation } from 'wouter';
import { EditorUnifiedProvider } from '@/context/EditorUnifiedProvider';
import { EditorProUnified } from '@/legacy/editor/EditorProUnified';
import { logger } from '@/utils/debugLogger';
import ErrorBoundary from '@/components/ErrorBoundary';

/**
 * Loading Spinner Component
 */
const LoadingSpinner = () => (
    <div className="h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando editor...</p>
        </div>
    </div>
);

/**
 * Error Fallback Component
 */
const EditorErrorFallback = ({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) => (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md mx-auto text-center p-6 bg-white rounded-lg shadow-lg border border-red-200">
            <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Erro no Editor</h2>
            <p className="text-gray-600 mb-4">{error.message}</p>
            <div className="space-y-2">
                <button
                    onClick={resetErrorBoundary}
                    className="block w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Tentar Novamente
                </button>
                <button
                    onClick={() => window.location.href = '/meus-funis'}
                    className="block w-full bg-gray-200 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                >
                    Voltar aos Funis
                </button>
            </div>
        </div>
    </div>
);

/**
 * 🎯 MainEditorUnified - VERSÃO REFATORADA
 * 
 * Arquitetura simplificada:
 * 1️⃣ EditorUnifiedProvider (único provider)
 * 2️⃣ EditorProUnified (editor otimizado)  
 * 3️⃣ Error boundary e loading states
 * 4️⃣ Suporte a templates e criação de novos funis
 */
export const MainEditorUnified: React.FC = () => {
    const [location, setLocation] = useLocation();
    
    // Extract funnelId from URL path - mais inteligente
    const pathParts = location.split('/').filter(Boolean);
    const funnelId = pathParts.length > 1 && pathParts[1] !== 'editor' ? pathParts[1] : null;
    const [isInitializing, setIsInitializing] = useState(true);

    // Parse query parameters para templates e outras configurações
    const params = React.useMemo(() => new URLSearchParams(location.split('?')[1] || ''), [location]);
    const templateId = params.get('template');
    const debugMode = params.get('debug') === 'true';

    useEffect(() => {
        logger.info('🚀 MainEditorUnified: Iniciando editor UNIFICADO', {
            funnelId,
            templateId,
            debugMode,
            location
        });

        // Simular tempo de inicialização
        const timer = setTimeout(() => {
            setIsInitializing(false);
        }, 300); // Reduzido de 500ms para 300ms

        return () => clearTimeout(timer);
    }, [funnelId, templateId, debugMode, location]);

    const handleNavigateBack = useCallback(() => {
        logger.info('🔙 MainEditorUnified: Navigating back to funnels');
        setLocation('/meus-funis');
    }, [setLocation]);
<<<<<<< Updated upstream

    const handleCreateNewFunnel = useCallback(() => {
        logger.info('✨ MainEditorUnified: Creating new funnel');
        // Gerar um ID temporário para novo funil
        const newFunnelId = `novo-funil-${Date.now()}`;
        setLocation(`/editor/${newFunnelId}${templateId ? `?template=${templateId}` : ''}`);
    }, [setLocation, templateId]);
=======
>>>>>>> Stashed changes

    if (isInitializing) {
        return <LoadingSpinner />;
    }

    // Se não há funnelId, mas há template ou queremos criar novo funil
    if (!funnelId) {
<<<<<<< Updated upstream
        logger.info('⚠️ MainEditorUnified: No funnel ID, checking for template or creating new funnel', { templateId });

        if (templateId) {
            // Se há um template, criar novo funil com esse template
            logger.info('🎨 MainEditorUnified: Template detected, creating new funnel', { templateId });
            const newFunnelId = `template-${templateId}-${Date.now()}`;
            setLocation(`/editor/${newFunnelId}?template=${templateId}`);
            return <LoadingSpinner />;
        }

        return (
            <div className="h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
                    <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Criar Novo Funil</h2>
                    <p className="text-gray-600 mb-4">Deseja criar um novo funil ou voltar aos seus funis existentes?</p>
                    <div className="space-y-2">
                        <button
                            onClick={handleCreateNewFunnel}
                            className="block w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            ✨ Criar Novo Funil
                        </button>
                        <button
                            onClick={handleNavigateBack}
                            className="block w-full bg-gray-200 text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            📁 Voltar aos Funis
                        </button>
                    </div>
=======
        logger.info('ℹ️ MainEditorUnified: No funnel ID provided, showing funnel selector');
        return (
            <div className="h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center max-w-md mx-auto p-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Selecione um Funil</h2>
                    <p className="text-gray-600 mb-6">Para usar o editor, você precisa selecionar ou criar um funil.</p>
                    
                    <div className="space-y-3">
                        <button
                            onClick={() => setLocation('/meus-funis')}
                            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                            Ver Meus Funis
                        </button>
                        
                        <button
                            onClick={() => setLocation('/admin/funis')}
                            className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                        >
                            Criar Novo Funil
                        </button>
                        
                        <button
                            onClick={() => setLocation('/')}
                            className="w-full px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
                        >
                            Voltar ao Início
                        </button>
                    </div>
                    
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-blue-800">
                            <strong>Dica:</strong> Para editar um funil específico, use a URL: <br/>
                            <code className="text-xs bg-blue-100 px-2 py-1 rounded">/editor/[ID-DO-FUNIL]</code>
                        </p>
                    </div>
>>>>>>> Stashed changes
                </div>
            </div>
        );
    }

    return (
        <ErrorBoundary fallback={<EditorErrorFallback error={new Error('Editor error')} resetErrorBoundary={() => window.location.reload()} />}>
            {/* 
        🎯 ARQUITETURA UNIFICADA:
        1️⃣ EditorUnifiedProvider - Single source of truth para todo o estado
        2️⃣ EditorProUnified - Editor otimizado sem dependências de providers legados
        
        BENEFÍCIOS:
        ⚡ Performance: 1 provider vs 7 providers aninhados
        🧹 Simplicidade: Eliminação de conflitos de estado  
        🔧 Manutenibilidade: Código centralizado e organizado
        🚀 Startup: Menos tempo de inicialização e setup
        ✨ Templates: Suporte completo a templates e criação de novos funis
      */}
            <EditorUnifiedProvider
                funnelId={funnelId || undefined}
                debugMode={debugMode}
                initialStep={templateId ? 1 : undefined}
            >
                <Suspense fallback={<LoadingSpinner />}>
                    <EditorProUnified />
                </Suspense>
            </EditorUnifiedProvider>
        </ErrorBoundary>
    );
};

export default MainEditorUnified;