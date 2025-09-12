/**
 * 🎯 URGENT FUNNEL ACCESS PAGE
 * 
 * Direct access page for users to immediately edit the quiz21StepsComplete template
 * using the optimized funnel system. Solves the 2-day accessibility issue.
 */

import React, { useState, useEffect } from 'react';
import QuickFunnelCreator from '@/components/QuickFunnelCreator';
import { optimizedFunnelService } from '@/services/OptimizedFunnelService';

const UrgentFunnelAccessPage: React.FC = () => {
    const [recentFunnels, setRecentFunnels] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadRecentFunnels();
    }, []);

    const loadRecentFunnels = async () => {
        try {
            // Load recently created funnels from quiz21StepsComplete
            const funnels = []; // TODO: Implement if needed
            setRecentFunnels(funnels);
        } catch (error) {
            console.error('Failed to load recent funnels:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFunnelCreated = (editorUrl: string) => {
        console.log('✅ Funnel created successfully, redirecting to:', editorUrl);
        
        // Redirect to editor with the new funnel
        window.location.href = editorUrl;
    };

    const handleError = (error: string) => {
        console.error('❌ Error creating funnel:', error);
        alert(`Erro ao criar funil: ${error}`);
    };

    const handleDirectEdit = async () => {
        try {
            const editorUrl = await optimizedFunnelService.openInEditor('quiz21StepsComplete');
            window.location.href = editorUrl;
        } catch (error) {
            console.error('❌ Error opening editor:', error);
            alert('Erro ao abrir editor');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        🚀 Sistema de Funis - Acesso Direto
                    </h1>
                    <p className="text-gray-600">
                        Edite o template quiz21StepsComplete diretamente no sistema de funis otimizado
                    </p>
                </div>

                {/* Urgent Access Card */}
                <div className="max-w-4xl mx-auto">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="flex-shrink-0">
                                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-lg font-medium text-yellow-800">
                                    ⚡ SOLUÇÃO PARA PROBLEMA DE ACESSO
                                </h3>
                                <p className="text-yellow-700">
                                    Sistema otimizado para resolver os problemas de performance com templates grandes.
                                </p>
                            </div>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <h4 className="font-semibold text-yellow-800 mb-2">✅ Problemas Resolvidos:</h4>
                                <ul className="text-sm text-yellow-700 space-y-1">
                                    <li>• Template grande (3.341 linhas) otimizado</li>
                                    <li>• Carregamento em chunks para performance</li>
                                    <li>• Sistema de cache inteligente</li>
                                    <li>• Integração direta com editor</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-semibold text-yellow-800 mb-2">🎯 Funcionalidades:</h4>
                                <ul className="text-sm text-yellow-700 space-y-1">
                                    <li>• Edição completa das 21 etapas</li>
                                    <li>• Preserva estrutura original exata</li>
                                    <li>• Auto-save e sincronização</li>
                                    <li>• Sistema de funis totalmente funcional</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Quick Creator */}
                    <div className="grid lg:grid-cols-2 gap-8">
                        <QuickFunnelCreator
                            onSuccess={handleFunnelCreated}
                            onError={handleError}
                        />

                        {/* Alternative Access Methods */}
                        <div className="bg-white rounded-lg border shadow-sm p-6">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                🔧 Métodos Alternativos
                            </h3>

                            <div className="space-y-4">
                                <button
                                    onClick={handleDirectEdit}
                                    className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <div className="text-left">
                                        <div className="font-medium text-gray-900">Edição Direta</div>
                                        <div className="text-sm text-gray-600">Abrir editor com template carregado</div>
                                    </div>
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>

                                <a
                                    href="/editor?template=quiz21StepsComplete"
                                    className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <div className="text-left">
                                        <div className="font-medium text-gray-900">URL Direta</div>
                                        <div className="text-sm text-gray-600">Usar parâmetro template na URL</div>
                                    </div>
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-1M10 6V5a2 2 0 012-2h2a2 2 0 012 2v1M10 6h4" />
                                    </svg>
                                </a>

                                <div className="bg-blue-50 rounded-lg p-4">
                                    <h4 className="font-medium text-blue-900 mb-2">📝 URL de Teste Rápido:</h4>
                                    <div className="bg-white p-2 rounded border font-mono text-sm break-all">
                                        {window.location.origin}/editor?template=quiz21StepsComplete
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Technical Information */}
                    <div className="mt-8 bg-gray-900 text-white rounded-lg p-6">
                        <h3 className="text-lg font-semibold mb-4">⚙️ Informações Técnicas</h3>
                        <div className="grid md:grid-cols-2 gap-6 text-sm">
                            <div>
                                <h4 className="font-medium text-gray-300 mb-2">Template Original:</h4>
                                <ul className="text-gray-400 space-y-1">
                                    <li>• Arquivo: quiz21StepsComplete.ts</li>
                                    <li>• Tamanho: 3.341 linhas / 102KB</li>
                                    <li>• Etapas: 21 completas</li>
                                    <li>• Blocos: 200+ componentes</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-medium text-gray-300 mb-2">Otimizações Aplicadas:</h4>
                                <ul className="text-gray-400 space-y-1">
                                    <li>• Carregamento lazy/chunked</li>
                                    <li>• Cache inteligente</li>
                                    <li>• Preload das primeiras 3 etapas</li>
                                    <li>• Integração direta com funis</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UrgentFunnelAccessPage;