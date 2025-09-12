/**
 * 🎯 QUICK FUNNEL CREATOR
 * 
 * Component that allows users to instantly create and edit funnels
 * from the quiz21StepsComplete template with optimized performance.
 */

import React, { useState } from 'react';
import { optimizedFunnelService } from '@/services/OptimizedFunnelService';

interface QuickFunnelCreatorProps {
    onSuccess?: (editorUrl: string) => void;
    onError?: (error: string) => void;
    className?: string;
}

export const QuickFunnelCreator: React.FC<QuickFunnelCreatorProps> = ({
    onSuccess,
    onError,
    className = ''
}) => {
    const [isCreating, setIsCreating] = useState(false);
    const [status, setStatus] = useState<string>('');

    const handleCreateFunnel = async () => {
        try {
            setIsCreating(true);
            setStatus('Criando funil otimizado...');

            console.log('🚀 [QUICK_CREATOR] Creating funnel from quiz21StepsComplete');

            // Create optimized funnel and get editor URL
            const editorUrl = await optimizedFunnelService.openInEditor('quiz21StepsComplete');

            setStatus('Funil criado com sucesso! Redirecionando...');
            console.log('✅ [QUICK_CREATOR] Funnel created, URL:', editorUrl);

            // Notify parent component
            if (onSuccess) {
                onSuccess(editorUrl);
            } else {
                // Redirect directly
                window.location.href = editorUrl;
            }

        } catch (error) {
            console.error('❌ [QUICK_CREATOR] Failed to create funnel:', error);
            const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
            setStatus(`Erro: ${errorMessage}`);
            
            if (onError) {
                onError(errorMessage);
            }
        } finally {
            setIsCreating(false);
        }
    };

    return (
        <div className={`bg-white rounded-lg border shadow-sm p-6 ${className}`}>
            <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    🎯 Quiz 21 Etapas - Template Completo
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                    Template otimizado para descoberta de estilo pessoal com 21 etapas completas.
                    Carregamento otimizado para máxima performance no editor.
                </p>

                <div className="bg-blue-50 rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-center space-x-2 text-blue-700">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                  d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span className="font-medium">Sistema Otimizado</span>
                    </div>
                    <p className="text-blue-600 text-xs mt-1">
                        ⚡ Carregamento em chunks • 📦 Cache inteligente • 🚀 Performance máxima
                    </p>
                </div>

                {status && (
                    <div className={`rounded-lg p-3 mb-4 ${
                        status.includes('Erro') 
                            ? 'bg-red-50 text-red-700 border border-red-200'
                            : 'bg-green-50 text-green-700 border border-green-200'
                    }`}>
                        <div className="flex items-center justify-center space-x-2">
                            {isCreating && (
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
                            )}
                            <span className="text-sm">{status}</span>
                        </div>
                    </div>
                )}

                <button
                    onClick={handleCreateFunnel}
                    disabled={isCreating}
                    className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                        isCreating
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md'
                    }`}
                >
                    {isCreating ? (
                        <span className="flex items-center justify-center space-x-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            <span>Criando Funil...</span>
                        </span>
                    ) : (
                        <span className="flex items-center justify-center space-x-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            <span>Editar Template no Funil</span>
                        </span>
                    )}
                </button>

                <div className="mt-4 text-xs text-gray-500">
                    <p>✅ Template será carregado com sistema de chunks otimizado</p>
                    <p>🎯 Pronto para edição imediata no sistema de funis</p>
                    <p>💾 Dados automaticamente sincronizados</p>
                </div>
            </div>
        </div>
    );
};

export default QuickFunnelCreator;