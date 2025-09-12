/**
 * 🚀 DIRECT TEMPLATE EDITOR
 * 
 * Simple, direct solution for immediate access to quiz21StepsComplete template
 * Bypasses complex funnel service issues for urgent user needs.
 */

import React, { useState, useEffect } from 'react';
import { largeTemplateLoader } from '@/services/LargeTemplateLoader';
import { Block } from '@/types/editor';

interface DirectTemplateEditorProps {
    templateId: string;
    onReady?: (templateData: Record<string, Block[]>) => void;
    onError?: (error: string) => void;
}

export const DirectTemplateEditor: React.FC<DirectTemplateEditorProps> = ({
    templateId,
    onReady,
    onError
}) => {
    const [isLoading, setIsLoading] = useState(true);
    const [templateData, setTemplateData] = useState<Record<string, Block[]> | null>(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (templateId === 'quiz21StepsComplete') {
            loadTemplate();
        }
    }, [templateId]);

    const loadTemplate = async () => {
        try {
            setIsLoading(true);
            setError(null);
            
            console.log('🎯 [DIRECT_EDITOR] Loading quiz21StepsComplete directly...');
            
            // Load template with optimized settings
            const template = await largeTemplateLoader.loadTemplate('quiz21StepsComplete', {
                enableChunking: true,
                chunkSize: 5,
                enableCache: true,
                preloadSteps: ['1', '2', '3', '4', '5']
            });

            console.log('✅ [DIRECT_EDITOR] Template loaded successfully:', Object.keys(template).length, 'steps');
            
            setTemplateData(template);
            
            if (onReady) {
                onReady(template);
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar template';
            console.error('❌ [DIRECT_EDITOR] Failed to load template:', err);
            setError(errorMessage);
            
            if (onError) {
                onError(errorMessage);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const getCurrentStepBlocks = (): Block[] => {
        if (!templateData) return [];
        // Template uses keys like 'step-1', 'step-2', etc.
        return templateData[`step-${currentStep}`] || [];
    };

    const getTotalSteps = (): number => {
        if (!templateData) return 0;
        return Object.keys(templateData).length;
    };

    const goToStep = (step: number) => {
        const total = getTotalSteps();
        if (step >= 1 && step <= total) {
            setCurrentStep(step);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center p-8">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        Carregando Template Quiz 21 Etapas
                    </h2>
                    <p className="text-gray-600 mb-4">
                        Sistema otimizado carregando template com 3.341 linhas...
                    </p>
                    <div className="bg-blue-50 rounded-lg p-3 max-w-sm mx-auto">
                        <p className="text-blue-700 text-sm">
                            ⚡ Carregamento em chunks para máxima performance
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center p-8 max-w-md">
                    <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Erro ao Carregar Template</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <button
                        onClick={loadTemplate}
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Tentar Novamente
                    </button>
                </div>
            </div>
        );
    }

    if (!templateData) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center p-8">
                    <p className="text-gray-600">Nenhum template carregado</p>
                </div>
            </div>
        );
    }

    const currentBlocks = getCurrentStepBlocks();
    const totalSteps = getTotalSteps();

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white border-b shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">
                                Quiz 21 Etapas - Editor Direto
                            </h1>
                            <p className="text-gray-600">
                                Template carregado com sistema otimizado • {totalSteps} etapas • Etapa atual: {currentStep}
                            </p>
                        </div>
                        <div className="flex items-center space-x-3">
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                ✅ Carregado
                            </span>
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                ⚡ Otimizado
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-6">
                <div className="grid grid-cols-12 gap-6">
                    {/* Step Navigator */}
                    <div className="col-span-3">
                        <div className="bg-white rounded-lg shadow-sm border p-4">
                            <h3 className="font-semibold text-gray-900 mb-4">Navegação das Etapas</h3>
                            <div className="space-y-2 max-h-96 overflow-y-auto">
                                {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => {
                                    const stepKey = `step-${step}`;
                                    const stepBlocks = templateData[stepKey] || [];
                                    
                                    return (
                                        <button
                                            key={step}
                                            onClick={() => goToStep(step)}
                                            className={`w-full text-left p-2 rounded transition-colors ${
                                                step === currentStep
                                                    ? 'bg-blue-100 text-blue-900 font-medium'
                                                    : 'hover:bg-gray-100 text-gray-700'
                                            }`}
                                        >
                                            Etapa {step}
                                            {stepBlocks.length > 0 && (
                                                <span className="ml-2 text-xs text-gray-500">
                                                    ({stepBlocks.length} blocos)
                                                </span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* Template Content */}
                    <div className="col-span-9">
                        <div className="bg-white rounded-lg shadow-sm border">
                            <div className="border-b px-6 py-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-semibold text-gray-900">
                                        Etapa {currentStep} de {totalSteps}
                                    </h2>
                                    <div className="flex items-center space-x-2">
                                        <button
                                            onClick={() => goToStep(currentStep - 1)}
                                            disabled={currentStep <= 1}
                                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            ← Anterior
                                        </button>
                                        <button
                                            onClick={() => goToStep(currentStep + 1)}
                                            disabled={currentStep >= totalSteps}
                                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Próxima →
                                        </button>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="p-6">
                                {currentBlocks.length > 0 ? (
                                    <div className="space-y-4">
                                        <div className="bg-gray-50 rounded-lg p-4">
                                            <h4 className="font-medium text-gray-900 mb-2">
                                                Blocos desta Etapa ({currentBlocks.length})
                                            </h4>
                                            <div className="space-y-3">
                                                {currentBlocks.map((block, index) => (
                                                    <div key={block.id || index} className="bg-white p-3 rounded border">
                                                        <div className="flex items-center justify-between mb-2">
                                                            <span className="font-medium text-gray-900">
                                                                {block.type}
                                                            </span>
                                                            <span className="text-xs text-gray-500">
                                                                ID: {block.id || `block-${index}`}
                                                            </span>
                                                        </div>
                                                        {block.properties && Object.keys(block.properties).length > 0 && (
                                                            <div className="text-sm text-gray-600">
                                                                <strong>Propriedades:</strong>
                                                                <pre className="mt-1 bg-gray-50 p-2 rounded text-xs overflow-x-auto">
                                                                    {JSON.stringify(block.properties, null, 2)}
                                                                </pre>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-12 text-gray-500">
                                        <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                        <p>Nenhum bloco encontrado para esta etapa</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DirectTemplateEditor;