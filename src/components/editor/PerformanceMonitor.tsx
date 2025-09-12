import React, { useState, useEffect, useRef, useCallback } from 'react';

interface PerformanceMetrics {
    renderTime: number;
    memoryUsage: number;
    componentCount: number;
    rerendersCount: number;
    loadTime: number;
    interactionLatency: number;
}

interface PerformanceMonitorProps {
    isVisible?: boolean;
    onMetricsUpdate?: (metrics: PerformanceMetrics) => void;
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
    isVisible = false,
    onMetricsUpdate
}) => {
    const [metrics, setMetrics] = useState<PerformanceMetrics>({
        renderTime: 0,
        memoryUsage: 0,
        componentCount: 0,
        rerendersCount: 0,
        loadTime: 0,
        interactionLatency: 0
    });

    const renderStartTime = useRef<number>(performance.now());
    const rerendersCount = useRef<number>(0);
    const lastInteractionTime = useRef<number>(0);

    // Monitor render performance
    useEffect(() => {
        const renderEndTime = performance.now();
        const renderTime = renderEndTime - renderStartTime.current;
        rerendersCount.current += 1;

        setMetrics(prev => ({
            ...prev,
            renderTime,
            rerendersCount: rerendersCount.current
        }));

        renderStartTime.current = performance.now();
    });

    // Monitor memory usage
    useEffect(() => {
        const updateMemoryUsage = () => {
            if ('memory' in performance) {
                const memInfo = (performance as any).memory;
                setMetrics(prev => ({
                    ...prev,
                    memoryUsage: memInfo.usedJSHeapSize / 1024 / 1024 // MB
                }));
            }
        };

        const interval = setInterval(updateMemoryUsage, 2000);
        return () => clearInterval(interval);
    }, []);

    // Monitor load time
    useEffect(() => {
        const loadTime = performance.now();
        setMetrics(prev => ({
            ...prev,
            loadTime
        }));
    }, []);

    // Monitor interaction latency
    const measureInteractionLatency = useCallback(() => {
        const now = performance.now();
        if (lastInteractionTime.current > 0) {
            const latency = now - lastInteractionTime.current;
            setMetrics(prev => ({
                ...prev,
                interactionLatency: latency
            }));
        }
        lastInteractionTime.current = now;
    }, []);

    // Callback for metrics updates
    useEffect(() => {
        if (onMetricsUpdate) {
            onMetricsUpdate(metrics);
        }
    }, [metrics, onMetricsUpdate]);

    // Get performance status color
    const getStatusColor = (value: number, thresholds: { good: number; warning: number }) => {
        if (value <= thresholds.good) return 'text-green-600 bg-green-50';
        if (value <= thresholds.warning) return 'text-yellow-600 bg-yellow-50';
        return 'text-red-600 bg-red-50';
    };

    // Performance recommendations
    const getRecommendations = () => {
        const recommendations: string[] = [];

        if (metrics.renderTime > 16) {
            recommendations.push('Render time alto - considere React.memo ou useMemo');
        }

        if (metrics.memoryUsage > 100) {
            recommendations.push('Uso de memória elevado - verifique vazamentos de memória');
        }

        if (metrics.rerendersCount > 50) {
            recommendations.push('Muitos re-renders - otimize dependências do useEffect');
        }

        if (metrics.interactionLatency > 100) {
            recommendations.push('Latência de interação alta - debounce ou throttle eventos');
        }

        return recommendations;
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className="fixed bottom-4 right-4 bg-white border border-gray-200 rounded-xl shadow-lg p-4 w-80 z-50">
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">📊 Performance Monitor</h3>
                <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-gray-600">Live</span>
                </div>
            </div>

            <div className="space-y-3">
                {/* Render Time */}
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Render Time</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(metrics.renderTime, { good: 8, warning: 16 })}`}>
                        {metrics.renderTime.toFixed(2)}ms
                    </span>
                </div>

                {/* Memory Usage */}
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Memory Usage</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(metrics.memoryUsage, { good: 50, warning: 100 })}`}>
                        {metrics.memoryUsage.toFixed(1)}MB
                    </span>
                </div>

                {/* Rerenders */}
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Re-renders</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(metrics.rerendersCount, { good: 20, warning: 50 })}`}>
                        {metrics.rerendersCount}
                    </span>
                </div>

                {/* Interaction Latency */}
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Interaction Latency</span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(metrics.interactionLatency, { good: 50, warning: 100 })}`}>
                        {metrics.interactionLatency.toFixed(2)}ms
                    </span>
                </div>

                {/* Load Time */}
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Load Time</span>
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs font-medium">
                        {(metrics.loadTime / 1000).toFixed(2)}s
                    </span>
                </div>
            </div>

            {/* Recommendations */}
            {getRecommendations().length > 0 && (
                <div className="mt-3 pt-3 border-t border-gray-200">
                    <h4 className="text-xs font-semibold text-gray-700 mb-2">💡 Recomendações</h4>
                    <div className="space-y-1">
                        {getRecommendations().slice(0, 2).map((rec, index) => (
                            <p key={index} className="text-xs text-gray-600">
                                • {rec}
                            </p>
                        ))}
                    </div>
                </div>
            )}

            {/* Quick Actions */}
            <div className="mt-3 pt-3 border-t border-gray-200 flex gap-2">
                <button
                    onClick={() => {
                        rerendersCount.current = 0;
                        setMetrics(prev => ({ ...prev, rerendersCount: 0 }));
                    }}
                    className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs font-medium text-gray-700 transition"
                >
                    Reset
                </button>
                <button
                    onClick={measureInteractionLatency}
                    className="px-3 py-1 bg-blue-100 hover:bg-blue-200 rounded text-xs font-medium text-blue-700 transition"
                >
                    Test Latency
                </button>
            </div>
        </div>
    );
};

export default PerformanceMonitor;