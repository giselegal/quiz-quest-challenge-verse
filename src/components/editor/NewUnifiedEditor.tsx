import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { CombinedComponentsPanel } from './CombinedComponentsPanel';

interface UnifiedEditorProps {
    quiz?: any;
    onQuizUpdate?: (quiz: any) => void;
    quickSave?: () => void;
}

export const NewUnifiedEditor: React.FC<UnifiedEditorProps> = ({
    quiz: initialQuiz,
    onQuizUpdate,
    quickSave
}) => {
    const navigate = useNavigate();

    // Estados do editor
    const [quiz, setQuiz] = useState(initialQuiz || {
        title: 'Novo Quiz',
        stages: [{
            id: 'step-1',
            name: 'Etapa 1',
            blocks: []
        }]
    });
    const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [currentStep, setCurrentStep] = useState(1);

    // Atualizar quiz quando props mudarem
    useEffect(() => {
        if (initialQuiz) {
            setQuiz(initialQuiz);
        }
    }, [initialQuiz]);

    const handleQuizUpdate = (updatedQuiz: any) => {
        setQuiz(updatedQuiz);
        onQuizUpdate?.(updatedQuiz);
    };

    const handleStepSelect = (stepNumber: number) => {
        setCurrentStep(stepNumber);
        console.log(`Selecionada etapa: ${stepNumber}`);
    };

    // Componente de navegação por etapas
    const StepsNavigation = () => (
        <div className="flex flex-col h-full">
            <div className="p-3 border-b border-gray-800/50">
                <h3 className="text-sm font-semibold text-white">📝 Etapas</h3>
                <p className="text-xs text-gray-400">21 etapas total</p>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
                {Array.from({ length: 21 }, (_, i) => i + 1).map(stepNumber => (
                    <button
                        key={stepNumber}
                        onClick={() => handleStepSelect(stepNumber)}
                        className={`w-full mb-1 px-2 py-2 rounded text-xs font-medium transition-colors ${currentStep === stepNumber
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-400 hover:text-white hover:bg-gray-800'
                            }`}
                    >
                        {stepNumber}
                    </button>
                ))}
            </div>
        </div>
    );

    return (
        <div className="h-screen w-full bg-black overflow-hidden">
            {/* Top Bar - Idêntico ao editor antigo */}
            <div className="h-14 bg-gray-900 border-b border-gray-800/50 flex items-center justify-between px-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="flex items-center gap-2 px-3 py-1.5 text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        <span className="text-sm">Dashboard</span>
                    </button>
                </div>
                <h1 className="text-lg font-semibold text-white">Quiz Editor</h1>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">Auto-save ativo</span>
                    {quickSave && (
                        <button
                            onClick={quickSave}
                            className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-sm"
                        >
                            <Save className="w-3 h-3" />
                            Save
                        </button>
                    )}
                </div>
            </div>

            {/* Main Layout - 4 colunas exatamente como o editor antigo */}
            <div className="flex h-[calc(100vh-3.5rem)]">

                {/* 1) Etapas - 10% */}
                <div className="w-[10%] bg-gray-900 border-r border-gray-800/50 overflow-y-auto">
                    <StepsNavigation />
                </div>

                {/* 2) Componentes - 15% */}
                <div className="w-[15%] bg-gray-900 border-r border-gray-800/50 overflow-y-auto">
                    <div className="p-3 border-b border-gray-800/50">
                        <h3 className="text-sm font-semibold text-white">📦 Componentes</h3>
                        <p className="text-xs text-gray-400">Arraste para adicionar</p>
                    </div>
                    <CombinedComponentsPanel />
                </div>

                {/* 3) Canvas - 55% */}
                <div className="w-[55%] flex flex-col bg-black">
                    {/* Header do Canvas */}
                    <div className="bg-gray-900 border-b border-gray-800/50 p-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <h2 className="text-sm font-bold text-white">
                                📝 Etapa {currentStep}
                            </h2>
                            <span className="text-xs text-gray-400">
                                0 blocos
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400">Preview</span>
                        </div>
                    </div>

                    <div className="flex-1 relative overflow-auto">
                        {error && (
                            <div className="absolute inset-0 z-50 bg-red-900/20 backdrop-blur-sm flex items-center justify-center">
                                <div className="bg-red-900 border border-red-700 rounded-lg p-6 max-w-md">
                                    <h3 className="text-white font-semibold mb-2">Editor Error</h3>
                                    <p className="text-red-200 mb-4">{error.message}</p>
                                    <button
                                        onClick={() => setError(null)}
                                        className="px-3 py-1.5 bg-red-800 hover:bg-red-700 text-white rounded text-sm"
                                    >
                                        Dismiss
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="h-full flex items-center justify-center p-8">
                            <div className="max-w-4xl w-full">
                                {/* Canvas Placeholder - será substituído pelo Canvas real */}
                                <div className="bg-white rounded-lg shadow-lg min-h-96 p-6 border-2 border-dashed border-gray-300">
                                    <div className="text-center text-gray-500">
                                        <h3 className="text-lg font-semibold mb-2">Canvas do Quiz</h3>
                                        <p className="text-sm">Arraste componentes aqui para construir sua etapa</p>
                                        <div className="mt-4 p-4 bg-gray-50 rounded">
                                            <p className="text-xs text-gray-400">
                                                Etapa atual: {currentStep}/21
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4) Propriedades - 20% */}
                <div className="w-[20%] bg-gray-900 border-l border-gray-800/50 overflow-y-auto">
                    <div className="p-3 border-b border-gray-800/50">
                        <h3 className="text-sm font-semibold text-white">⚙️ Propriedades</h3>
                        <p className="text-xs text-gray-400">Configure o bloco selecionado</p>
                    </div>
                    <div className="p-4">
                        {selectedBlockId ? (
                            <div className="text-white text-sm">
                                Configurações do bloco: {selectedBlockId}
                            </div>
                        ) : (
                            <div className="text-gray-400 text-xs text-center py-8">
                                Selecione um bloco para<br />configurar suas propriedades
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default NewUnifiedEditor;