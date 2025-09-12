import React, { useState, useEffect, useCallback } from 'react';

interface UsabilityTest {
    id: string;
    name: string;
    description: string;
    steps: UsabilityStep[];
    status: 'pending' | 'running' | 'completed' | 'failed';
    result?: UsabilityResult;
}

interface UsabilityStep {
    id: string;
    action: string;
    selector: string;
    expectedOutcome: string;
    timeout: number;
}

interface UsabilityResult {
    success: boolean;
    duration: number;
    errors: string[];
    completedSteps: number;
    totalSteps: number;
    userExperience: 'excellent' | 'good' | 'poor';
}

interface UsabilityTesterProps {
    isVisible?: boolean;
    onTestComplete?: (result: UsabilityResult) => void;
}

export const UsabilityTester: React.FC<UsabilityTesterProps> = ({
    isVisible = false,
    onTestComplete
}) => {
    const [tests, setTests] = useState<UsabilityTest[]>([]);
    const [currentTest, setCurrentTest] = useState<string | null>(null);
    const [isRunning, setIsRunning] = useState(false);

    // Initialize tests
    useEffect(() => {
        const predefinedTests: UsabilityTest[] = [
            {
                id: 'component-library-test',
                name: '🎨 Teste da Biblioteca de Componentes',
                description: 'Verifica se o usuário consegue adicionar componentes facilmente',
                status: 'pending',
                steps: [
                    {
                        id: 'step1',
                        action: 'click',
                        selector: '[data-testid="component-button"]',
                        expectedOutcome: 'Componente deve ser adicionado ao canvas',
                        timeout: 3000
                    },
                    {
                        id: 'step2',
                        action: 'verify',
                        selector: '[data-testid="canvas-component"]',
                        expectedOutcome: 'Componente deve aparecer no canvas',
                        timeout: 2000
                    }
                ]
            },
            {
                id: 'properties-panel-test',
                name: '🔧 Teste do Painel de Propriedades',
                description: 'Verifica se as propriedades são editáveis',
                status: 'pending',
                steps: [
                    {
                        id: 'step1',
                        action: 'click',
                        selector: '[data-testid="canvas-component"]',
                        expectedOutcome: 'Painel de propriedades deve abrir',
                        timeout: 2000
                    },
                    {
                        id: 'step2',
                        action: 'type',
                        selector: '[data-testid="property-input"]',
                        expectedOutcome: 'Valor deve ser atualizado',
                        timeout: 3000
                    }
                ]
            },
            {
                id: 'mode-switching-test',
                name: '👁️ Teste de Alternância de Modos',
                description: 'Verifica se a alternância Visual/Preview funciona',
                status: 'pending',
                steps: [
                    {
                        id: 'step1',
                        action: 'click',
                        selector: '[data-testid="preview-mode-btn"]',
                        expectedOutcome: 'Deve alternar para modo preview',
                        timeout: 2000
                    },
                    {
                        id: 'step2',
                        action: 'click',
                        selector: '[data-testid="visual-mode-btn"]',
                        expectedOutcome: 'Deve voltar para modo visual',
                        timeout: 2000
                    }
                ]
            }
        ];

        setTests(predefinedTests);
    }, []);

    // Simulate step execution
    const executeStep = useCallback(async (step: UsabilityStep): Promise<boolean> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simulate random success/failure for testing
                const success = Math.random() > 0.2; // 80% success rate
                resolve(success);
            }, Math.random() * 1000 + 500); // 500-1500ms delay
        });
    }, []);

    // Run a specific test
    const runTest = useCallback(async (testId: string) => {
        const test = tests.find(t => t.id === testId);
        if (!test) return;

        setCurrentTest(testId);
        setIsRunning(true);

        const startTime = performance.now();
        let completedSteps = 0;
        const errors: string[] = [];

        // Update test status
        setTests(prev => prev.map(t =>
            t.id === testId
                ? { ...t, status: 'running' as const }
                : t
        ));

        try {
            for (const step of test.steps) {
                const stepSuccess = await executeStep(step);

                if (stepSuccess) {
                    completedSteps++;
                } else {
                    errors.push(`Falha na etapa: ${step.action} - ${step.expectedOutcome}`);
                    break;
                }
            }

            const duration = performance.now() - startTime;
            const success = completedSteps === test.steps.length;

            // Determine user experience
            let userExperience: 'excellent' | 'good' | 'poor';
            if (success && duration < 5000) {
                userExperience = 'excellent';
            } else if (success && duration < 10000) {
                userExperience = 'good';
            } else {
                userExperience = 'poor';
            }

            const result: UsabilityResult = {
                success,
                duration,
                errors,
                completedSteps,
                totalSteps: test.steps.length,
                userExperience
            };

            // Update test with result
            setTests(prev => prev.map(t =>
                t.id === testId
                    ? {
                        ...t,
                        status: success ? 'completed' : 'failed',
                        result
                    }
                    : t
            ));

            if (onTestComplete) {
                onTestComplete(result);
            }

        } catch (error) {
            setTests(prev => prev.map(t =>
                t.id === testId
                    ? { ...t, status: 'failed' as const }
                    : t
            ));
        }

        setIsRunning(false);
        setCurrentTest(null);
    }, [tests, executeStep, onTestComplete]);

    // Run all tests
    const runAllTests = useCallback(async () => {
        for (const test of tests) {
            await runTest(test.id);
            // Small delay between tests
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }, [tests, runTest]);

    // Get status color
    const getStatusColor = (status: UsabilityTest['status']) => {
        switch (status) {
            case 'completed': return 'bg-green-100 text-green-700 border-green-200';
            case 'failed': return 'bg-red-100 text-red-700 border-red-200';
            case 'running': return 'bg-blue-100 text-blue-700 border-blue-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    // Get UX score
    const getOverallUXScore = () => {
        const completedTests = tests.filter(t => t.result);
        if (completedTests.length === 0) return null;

        const scores = { excellent: 100, good: 75, poor: 50 };
        const avgScore = completedTests.reduce((sum, test) =>
            sum + (scores[test.result!.userExperience] || 0), 0
        ) / completedTests.length;

        return Math.round(avgScore);
    };

    if (!isVisible) {
        return null;
    }

    const uxScore = getOverallUXScore();

    return (
        <div className="fixed top-4 right-4 bg-white border border-gray-200 rounded-xl shadow-lg p-4 w-96 max-h-[80vh] overflow-y-auto z-50">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">🧪 Teste de Usabilidade</h3>
                {uxScore && (
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">UX Score:</span>
                        <span className={`px-2 py-1 rounded font-medium text-sm ${uxScore >= 90 ? 'bg-green-100 text-green-700' :
                                uxScore >= 70 ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-red-100 text-red-700'
                            }`}>
                            {uxScore}%
                        </span>
                    </div>
                )}
            </div>

            {/* Control Buttons */}
            <div className="flex gap-2 mb-4">
                <button
                    onClick={runAllTests}
                    disabled={isRunning}
                    className="px-3 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-lg text-sm font-medium transition"
                >
                    {isRunning ? '🔄 Executando...' : '▶️ Executar Todos'}
                </button>
                <button
                    onClick={() => setTests(prev => prev.map(t => ({ ...t, status: 'pending', result: undefined })))}
                    className="px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm font-medium transition"
                >
                    🔄 Reset
                </button>
            </div>

            {/* Tests List */}
            <div className="space-y-3">
                {tests.map((test) => (
                    <div
                        key={test.id}
                        className={`border rounded-lg p-3 transition-all ${getStatusColor(test.status)}`}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-sm">{test.name}</h4>
                            <div className="flex items-center gap-2">
                                {test.status === 'running' && (
                                    <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                )}
                                <button
                                    onClick={() => runTest(test.id)}
                                    disabled={isRunning || test.status === 'running'}
                                    className="px-2 py-1 bg-white bg-opacity-50 hover:bg-opacity-75 rounded text-xs font-medium transition"
                                >
                                    ▶️
                                </button>
                            </div>
                        </div>

                        <p className="text-xs text-gray-600 mb-2">{test.description}</p>

                        {/* Test Results */}
                        {test.result && (
                            <div className="mt-2 pt-2 border-t border-gray-200 space-y-1">
                                <div className="flex items-center justify-between text-xs">
                                    <span>Etapas: {test.result.completedSteps}/{test.result.totalSteps}</span>
                                    <span>Tempo: {(test.result.duration / 1000).toFixed(2)}s</span>
                                </div>

                                {test.result.errors.length > 0 && (
                                    <div className="text-xs text-red-600">
                                        <div className="font-medium">Erros:</div>
                                        {test.result.errors.map((error, index) => (
                                            <div key={index}>• {error}</div>
                                        ))}
                                    </div>
                                )}

                                <div className="flex items-center justify-between text-xs">
                                    <span>Experiência:</span>
                                    <span className={`font-medium ${test.result.userExperience === 'excellent' ? 'text-green-600' :
                                            test.result.userExperience === 'good' ? 'text-yellow-600' :
                                                'text-red-600'
                                        }`}>
                                        {test.result.userExperience === 'excellent' ? '🌟 Excelente' :
                                            test.result.userExperience === 'good' ? '👍 Boa' :
                                                '👎 Ruim'}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Summary */}
            {uxScore && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="text-center">
                        <h4 className="font-semibold text-gray-900 mb-2">📊 Resumo Geral</h4>
                        <div className={`text-2xl font-bold mb-1 ${uxScore >= 90 ? 'text-green-600' :
                                uxScore >= 70 ? 'text-yellow-600' :
                                    'text-red-600'
                            }`}>
                            {uxScore}%
                        </div>
                        <p className="text-xs text-gray-600">
                            {uxScore >= 90 ? 'Usabilidade excelente!' :
                                uxScore >= 70 ? 'Boa usabilidade' :
                                    'Necessita melhorias'}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UsabilityTester;