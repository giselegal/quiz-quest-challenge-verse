import React, { useState, useEffect, useCallback } from 'react';

interface OptimizationRule {
    id: string;
    name: string;
    description: string;
    category: 'performance' | 'usability' | 'accessibility';
    severity: 'low' | 'medium' | 'high' | 'critical';
    check: () => Promise<OptimizationResult>;
    fix?: () => Promise<void>;
}

interface OptimizationResult {
    passed: boolean;
    message: string;
    impact: number; // 1-10 scale
    recommendation?: string;
    autoFixAvailable: boolean;
}

interface OptimizationRecommendation {
    rule: OptimizationRule;
    result: OptimizationResult;
    timestamp: Date;
}

interface AutoOptimizerProps {
    isVisible?: boolean;
    onOptimizationComplete?: (results: OptimizationRecommendation[]) => void;
}

export const AutoOptimizer: React.FC<AutoOptimizerProps> = ({
    isVisible = false,
    onOptimizationComplete
}) => {
    const [recommendations, setRecommendations] = useState<OptimizationRecommendation[]>([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isOptimizing, setIsOptimizing] = useState(false);

    // Define optimization rules
    const optimizationRules: OptimizationRule[] = [
        {
            id: 'bundle-size',
            name: '📦 Tamanho do Bundle',
            description: 'Verifica se o tamanho do bundle está otimizado',
            category: 'performance',
            severity: 'high',
            check: async () => {
                // Simulate bundle size check
                const bundleSize = Math.random() * 2000 + 500; // 500-2500 KB
                return {
                    passed: bundleSize < 1000,
                    message: `Bundle atual: ${bundleSize.toFixed(0)}KB`,
                    impact: bundleSize > 1500 ? 8 : bundleSize > 1000 ? 5 : 2,
                    recommendation: bundleSize > 1000
                        ? 'Considere code splitting ou tree shaking'
                        : 'Tamanho do bundle está otimizado',
                    autoFixAvailable: bundleSize > 1200
                };
            },
            fix: async () => {
                // Simulate bundle optimization
                await new Promise(resolve => setTimeout(resolve, 2000));
                console.log('Bundle size optimization applied');
            }
        },
        {
            id: 'memory-leaks',
            name: '🧠 Vazamentos de Memória',
            description: 'Detecta possíveis vazamentos de memória',
            category: 'performance',
            severity: 'critical',
            check: async () => {
                // Simulate memory leak detection
                const memoryUsage = Math.random() * 200 + 50; // 50-250 MB
                const hasLeaks = memoryUsage > 150;

                return {
                    passed: !hasLeaks,
                    message: `Uso de memória: ${memoryUsage.toFixed(1)}MB`,
                    impact: hasLeaks ? 9 : 3,
                    recommendation: hasLeaks
                        ? 'Verifique event listeners não removidos e refs circulares'
                        : 'Uso de memória está normal',
                    autoFixAvailable: false
                };
            }
        },
        {
            id: 'render-optimization',
            name: '🎨 Otimização de Renders',
            description: 'Analisa re-renders desnecessários',
            category: 'performance',
            severity: 'medium',
            check: async () => {
                // Simulate render analysis
                const renderCount = Math.floor(Math.random() * 100) + 20; // 20-120
                const excessive = renderCount > 50;

                return {
                    passed: !excessive,
                    message: `${renderCount} renders detectados`,
                    impact: excessive ? 6 : 2,
                    recommendation: excessive
                        ? 'Use React.memo, useMemo ou useCallback'
                        : 'Número de renders está otimizado',
                    autoFixAvailable: excessive
                };
            },
            fix: async () => {
                // Simulate render optimization
                await new Promise(resolve => setTimeout(resolve, 1500));
                console.log('Render optimization applied');
            }
        },
        {
            id: 'accessibility',
            name: '♿ Acessibilidade',
            description: 'Verifica conformidade com WCAG',
            category: 'accessibility',
            severity: 'high',
            check: async () => {
                // Simulate accessibility check
                const score = Math.random() * 100; // 0-100

                return {
                    passed: score > 80,
                    message: `Score de acessibilidade: ${score.toFixed(0)}%`,
                    impact: score < 60 ? 8 : score < 80 ? 5 : 2,
                    recommendation: score < 80
                        ? 'Adicione labels ARIA e melhore contraste'
                        : 'Acessibilidade está em conformidade',
                    autoFixAvailable: score < 70
                };
            },
            fix: async () => {
                // Simulate accessibility fixes
                await new Promise(resolve => setTimeout(resolve, 1000));
                console.log('Accessibility improvements applied');
            }
        },
        {
            id: 'ux-flow',
            name: '🚀 Fluxo de UX',
            description: 'Analisa a fluidez da experiência do usuário',
            category: 'usability',
            severity: 'medium',
            check: async () => {
                // Simulate UX flow analysis
                const flowScore = Math.random() * 100; // 0-100

                return {
                    passed: flowScore > 75,
                    message: `Score de fluxo UX: ${flowScore.toFixed(0)}%`,
                    impact: flowScore < 50 ? 7 : flowScore < 75 ? 4 : 2,
                    recommendation: flowScore < 75
                        ? 'Reduza cliques necessários e melhore feedback visual'
                        : 'Fluxo de UX está otimizado',
                    autoFixAvailable: false
                };
            }
        }
    ];

    // Run all optimization checks
    const runAnalysis = useCallback(async () => {
        setIsAnalyzing(true);
        const newRecommendations: OptimizationRecommendation[] = [];

        for (const rule of optimizationRules) {
            try {
                const result = await rule.check();
                newRecommendations.push({
                    rule,
                    result,
                    timestamp: new Date()
                });
            } catch (error) {
                console.error(`Error checking rule ${rule.id}:`, error);
            }
        }

        setRecommendations(newRecommendations);
        setIsAnalyzing(false);

        if (onOptimizationComplete) {
            onOptimizationComplete(newRecommendations);
        }
    }, [optimizationRules, onOptimizationComplete]);

    // Apply automatic fixes
    const applyAutomaticFixes = useCallback(async () => {
        setIsOptimizing(true);
        const fixableRecommendations = recommendations.filter(rec =>
            rec.result.autoFixAvailable && rec.rule.fix
        );

        for (const recommendation of fixableRecommendations) {
            try {
                await recommendation.rule.fix!();
            } catch (error) {
                console.error(`Error applying fix for ${recommendation.rule.id}:`, error);
            }
        }

        setIsOptimizing(false);
        // Re-run analysis after fixes
        await runAnalysis();
    }, [recommendations, runAnalysis]);

    // Get severity color
    const getSeverityColor = (severity: OptimizationRule['severity']) => {
        switch (severity) {
            case 'critical': return 'bg-red-100 text-red-800 border-red-200';
            case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
            case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'low': return 'bg-blue-100 text-blue-800 border-blue-200';
        }
    };

    // Get category icon
    const getCategoryIcon = (category: OptimizationRule['category']) => {
        switch (category) {
            case 'performance': return '⚡';
            case 'usability': return '👤';
            case 'accessibility': return '♿';
        }
    };

    // Calculate overall score
    const getOverallScore = () => {
        if (recommendations.length === 0) return null;

        const totalImpact = recommendations.reduce((sum, rec) => sum + rec.result.impact, 0);
        const maxPossibleImpact = recommendations.length * 10;
        const score = Math.max(0, 100 - (totalImpact / maxPossibleImpact) * 100);

        return Math.round(score);
    };

    // Auto-run analysis on mount
    useEffect(() => {
        if (isVisible && recommendations.length === 0) {
            runAnalysis();
        }
    }, [isVisible, runAnalysis]);

    if (!isVisible) {
        return null;
    }

    const overallScore = getOverallScore();
    const criticalIssues = recommendations.filter(rec => rec.rule.severity === 'critical' && !rec.result.passed);
    const autoFixableCount = recommendations.filter(rec => rec.result.autoFixAvailable).length;

    return (
        <div className="fixed top-4 left-4 bg-white border border-gray-200 rounded-xl shadow-lg p-4 w-80 max-h-[80vh] overflow-y-auto z-50">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">🔧 Auto Otimizador</h3>
                {overallScore !== null && (
                    <div className={`px-2 py-1 rounded font-medium text-sm ${overallScore >= 90 ? 'bg-green-100 text-green-700' :
                            overallScore >= 70 ? 'bg-yellow-100 text-yellow-700' :
                                'bg-red-100 text-red-700'
                        }`}>
                        {overallScore}%
                    </div>
                )}
            </div>

            {/* Quick Stats */}
            {recommendations.length > 0 && (
                <div className="grid grid-cols-3 gap-2 mb-4 text-center">
                    <div className="bg-red-50 p-2 rounded">
                        <div className="text-lg font-bold text-red-600">{criticalIssues.length}</div>
                        <div className="text-xs text-red-600">Crítico</div>
                    </div>
                    <div className="bg-green-50 p-2 rounded">
                        <div className="text-lg font-bold text-green-600">
                            {recommendations.filter(rec => rec.result.passed).length}
                        </div>
                        <div className="text-xs text-green-600">OK</div>
                    </div>
                    <div className="bg-blue-50 p-2 rounded">
                        <div className="text-lg font-bold text-blue-600">{autoFixableCount}</div>
                        <div className="text-xs text-blue-600">Auto-fix</div>
                    </div>
                </div>
            )}

            {/* Control Buttons */}
            <div className="flex gap-2 mb-4">
                <button
                    onClick={runAnalysis}
                    disabled={isAnalyzing}
                    className="flex-1 px-3 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-lg text-sm font-medium transition"
                >
                    {isAnalyzing ? '🔍 Analisando...' : '🔍 Analisar'}
                </button>
                {autoFixableCount > 0 && (
                    <button
                        onClick={applyAutomaticFixes}
                        disabled={isOptimizing}
                        className="flex-1 px-3 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-300 text-white rounded-lg text-sm font-medium transition"
                    >
                        {isOptimizing ? '🔧 Otimizando...' : `🔧 Corrigir (${autoFixableCount})`}
                    </button>
                )}
            </div>

            {/* Recommendations */}
            <div className="space-y-3">
                {recommendations.map((recommendation) => (
                    <div
                        key={recommendation.rule.id}
                        className={`border rounded-lg p-3 ${recommendation.result.passed
                                ? 'border-green-200 bg-green-50'
                                : getSeverityColor(recommendation.rule.severity)
                            }`}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <span>{getCategoryIcon(recommendation.rule.category)}</span>
                                <span className="font-medium text-sm">{recommendation.rule.name}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                {recommendation.result.passed ? (
                                    <span className="text-green-600 text-xs">✅</span>
                                ) : (
                                    <span className="text-red-600 text-xs">❌</span>
                                )}
                                {recommendation.result.autoFixAvailable && (
                                    <span className="text-blue-600 text-xs" title="Auto-fix disponível">🔧</span>
                                )}
                            </div>
                        </div>

                        <p className="text-xs text-gray-600 mb-2">{recommendation.rule.description}</p>
                        <p className="text-xs font-medium">{recommendation.result.message}</p>

                        {recommendation.result.recommendation && (
                            <p className="text-xs text-gray-600 mt-1">
                                💡 {recommendation.result.recommendation}
                            </p>
                        )}

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200">
                            <span className="text-xs text-gray-500">
                                Impacto: {recommendation.result.impact}/10
                            </span>
                            <span className="text-xs text-gray-500">
                                {recommendation.timestamp.toLocaleTimeString()}
                            </span>
                        </div>
                    </div>
                ))}

                {recommendations.length === 0 && !isAnalyzing && (
                    <div className="text-center py-8 text-gray-500">
                        <div className="text-4xl mb-2">🔍</div>
                        <p className="text-sm">Clique em "Analisar" para começar</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AutoOptimizer;