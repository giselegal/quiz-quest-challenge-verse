import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { AutoSaveStatus } from './AutoSaveStatus';
import { CombinedComponentsPanel } from './CombinedComponentsPanel';
import { SmartPropertiesPanel } from './SmartPropertiesPanel';
import { QuizStepsNavigation } from './QuizStepsNavigation';
import { Canvas } from './Canvas';

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
    const editorRef = useRef<HTMLDivElement>(null);

    // Estados do editor
    const [quiz, setQuiz] = useState(initialQuiz);
    const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
    const [error, setError] = useState<Error | null>(null);

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

    // Fallback para quiz vazio
    if (!quiz) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="text-center">
                    <h2 className="text-xl font-bold text-white mb-4">Carregando Editor</h2>
                    <p className="text-gray-400 mb-4">Preparando o ambiente de edição...</p>
                </div>
            </div>
        );
    }

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
                    <AutoSaveStatus />
                    {quickSave && (
                        <button
                            onClick={quickSave}
                            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-sm"
                        >
                            Save
                        </button>
                    )}
                </div>
            </div>

            {/* Main Layout - 4 colunas exatamente como o editor antigo */}
            <div className="flex h-[calc(100vh-3.5rem)]">

                {/* 1) Etapas - 10% */}
                <div className="w-[10%] bg-gray-900 border-r border-gray-800/50 overflow-y-auto">
                    <QuizStepsNavigation
                        currentStepIndex={0}
                        quiz={quiz}
                        onStepSelect={(index) => {
                            console.log(`Selected step: ${index}`);
                        }}
                    />
                </div>

                {/* 2) Componentes - 15% */}
                <div className="w-[15%] bg-gray-900 border-r border-gray-800/50 overflow-y-auto">
                    <CombinedComponentsPanel />
                </div>

                {/* 3) Canvas - 55% */}
                <div className="w-[55%] flex flex-col bg-black">
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
                                <Canvas
                                    quiz={quiz}
                                    selectedBlockId={selectedBlockId}
                                    onBlockSelect={setSelectedBlockId}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4) Propriedades - 20% */}
                <div className="w-[20%] bg-gray-900 border-l border-gray-800/50 overflow-y-auto">
                    <SmartPropertiesPanel
                        quiz={quiz}
                        selectedBlockId={selectedBlockId}
                        onQuizUpdate={handleQuizUpdate}
                    />
                </div>

            </div>
        </div>
    );
};

export default NewUnifiedEditor;