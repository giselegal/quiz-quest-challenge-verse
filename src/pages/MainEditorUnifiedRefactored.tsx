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
import { useParams } from 'wouter';
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
 */
export const MainEditorUnified: React.FC = () => {
    const { funnelId } = useParams<{ funnelId: string }>();
    const [, setLocation] = useLocation();
    const [isInitializing, setIsInitializing] = useState(true);

    useEffect(() => {
        logger.info('🚀 MainEditorUnified: Iniciando editor UNIFICADO', { funnelId });

        // Simular tempo de inicialização
        const timer = setTimeout(() => {
            setIsInitializing(false);
        }, 300); // Reduzido de 500ms para 300ms

        return () => clearTimeout(timer);
    }, [funnelId]);

    const handleNavigateBack = useCallback(() => {
        logger.info('🔙 MainEditorUnified: Navigating back to funnels');
        setLocation('/admin/meus-funis');
    }, [setLocation]);

    if (isInitializing) {
        return <LoadingSpinner />;
    }

    if (!funnelId) {
        logger.error('❌ MainEditorUnified: No funnel ID provided');
        return (
            <div className="h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Funil não encontrado</h2>
                    <p className="text-gray-600 mb-4">ID do funil não foi fornecido</p>
                    <button
                        onClick={handleNavigateBack}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Voltar aos Funis
                    </button>
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
      */}
            <EditorUnifiedProvider funnelId={funnelId}>
                <Suspense fallback={<LoadingSpinner />}>
                    <EditorProUnified />
                </Suspense>
            </EditorUnifiedProvider>
        </ErrorBoundary>
    );
};

export default MainEditorUnified;