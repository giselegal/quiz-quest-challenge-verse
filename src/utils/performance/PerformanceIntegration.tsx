/**
 * 🚀 PERFORMANCE INTEGRATION - HOCs e Presets para Otimização
 * 
 * Integrações prontas para aplicar otimizações de performance aos componentes do editor
 */

import React from 'react';
import { withPerformanceProfiler } from './PerformanceProfiler';
import { withAdvancedMemo } from './AdvancedMemoization';
import { EditorLazyComponents } from './LazyLoadingSystem';

/**
 * 🎯 PRESETS DE MEMOIZAÇÃO PARA COMPONENTES DO EDITOR
 * 
 * Configurações pré-definidas para diferentes tipos de componentes
 */
export const EditorMemoPresets = {
    /**
     * Preset para componentes de sidebar (filtração pesada)
     */
    Sidebar: (Component: React.ComponentType<any>) =>
        withAdvancedMemo(Component, {
            strategy: 'deep',
            debugKey: 'Sidebar',
            ttl: 30000, // 30s cache para filtros
            propBlacklist: ['timestamp', 'debug']
        }),

    /**
     * Preset para componentes pesados (canvas, editores)
     */
    HeavyComponent: (Component: React.ComponentType<any>) =>
        withAdvancedMemo(Component, {
            strategy: 'shallow',
            debugKey: 'HeavyComponent',
            ttl: 60000, // 1min cache
            propBlacklist: ['onRender', 'debug', 'timestamp']
        }),

    /**
     * Preset para painéis de propriedades (muitas props)
     */
    PropertiesPanel: (Component: React.ComponentType<any>) =>
        withAdvancedMemo(Component, {
            strategy: 'deep',
            debugKey: 'PropertiesPanel',
            ttl: 15000, // 15s cache
            propBlacklist: ['onChange', 'onUpdate', 'timestamp']
        }),

    /**
     * Preset para listas de componentes (virtualizadas)
     */
    ComponentsList: (Component: React.ComponentType<any>) =>
        withAdvancedMemo(Component, {
            strategy: 'shallow',
            debugKey: 'ComponentsList',
            ttl: 45000, // 45s cache
            propBlacklist: ['onSelect', 'onFilter', 'debug']
        })
};

/**
 * 🎨 HOC COMBINADO: Performance + Profiling + Memoização
 * 
 * Aplica todas as otimizações de uma vez
 */
export const withFullPerformanceOptimization = <P extends {}>(
    Component: React.ComponentType<P>,
    options: {
        profileId: string;
        memoOptions?: any;
        enableProfiling?: boolean;
    }
) => {
    const { profileId, memoOptions = {}, enableProfiling = true } = options;

    // Aplicar memoização
    const MemoizedComponent = withAdvancedMemo(Component, {
        strategy: 'shallow',
        debugKey: profileId,
        ttl: 30000,
        ...memoOptions
    });

    // Aplicar profiling se habilitado
    if (enableProfiling) {
        return withPerformanceProfiler(MemoizedComponent, profileId);
    }

    return MemoizedComponent;
};

/**
 * 🔧 COMPONENTES EDITOR PRÉ-OTIMIZADOS
 * 
 * Versões otimizadas dos principais componentes do editor
 */
export const OptimizedEditorComponents = {
    /**
     * NewUnifiedEditor com lazy loading + profiling + memoização
     */
    NewUnifiedEditor: React.lazy(async () => {
        const { NewUnifiedEditor } = await import('@/components/editor/NewUnifiedEditor');
        const OptimizedEditor = withFullPerformanceOptimization(NewUnifiedEditor, {
            profileId: 'NewUnifiedEditor-Optimized',
            memoOptions: { strategy: 'shallow', ttl: 120000 }
        });
        return { default: OptimizedEditor };
    }),

    /**
     * EnhancedComponentsSidebar otimizado
     */
    EnhancedComponentsSidebar: withFullPerformanceOptimization(
        EditorLazyComponents.EnhancedComponentsSidebar,
        {
            profileId: 'EnhancedSidebar-Optimized',
            memoOptions: { strategy: 'deep', ttl: 30000, propBlacklist: ['timestamp', 'debug'] }
        }
    ),

    /**
     * PageEditorCanvas otimizado
     */
    PageEditorCanvas: withFullPerformanceOptimization(
        EditorLazyComponents.PageEditorCanvas,
        {
            profileId: 'PageCanvas-Optimized',
            memoOptions: { strategy: 'shallow', ttl: 60000, propBlacklist: ['onRender', 'debug', 'timestamp'] }
        }
    ),

    /**
     * InteractiveQuizCanvas otimizado
     */
    InteractiveQuizCanvas: withFullPerformanceOptimization(
        EditorLazyComponents.InteractiveQuizCanvas,
        {
            profileId: 'QuizCanvas-Optimized',
            memoOptions: { strategy: 'deep', ttl: 90000 }
        }
    ),

    /**
     * CombinedComponentsPanel otimizado
     */
    CombinedComponentsPanel: withFullPerformanceOptimization(
        EditorLazyComponents.CombinedComponentsPanel,
        {
            profileId: 'CombinedPanel-Optimized',
            memoOptions: { strategy: 'shallow', ttl: 45000, propBlacklist: ['onSelect', 'onFilter', 'debug'] }
        }
    )
};

/**
 * 📊 UTILS DE MONITORAMENTO DE PERFORMANCE
 */
export const PerformanceUtils = {
    /**
     * Detectar componentes com muitos re-renders
     */
    findHeavyRenders: (threshold: number = 10) => {
        const profilerData = (window as any).__PERFORMANCE_PROFILER_DATA__ || {};

        return Object.entries(profilerData)
            .filter(([, data]: [string, any]) => data.renderCount > threshold)
            .map(([id, data]: [string, any]) => ({
                component: id,
                renders: data.renderCount,
                avgTime: data.totalTime / data.renderCount,
                totalTime: data.totalTime
            }))
            .sort((a, b) => b.renders - a.renders);
    },

    /**
     * Obter estatísticas de cache
     */
    getCacheStats: () => {
        const cacheData = (window as any).__ADVANCED_MEMO_CACHE_STATS__ || {};

        return {
            totalCaches: Object.keys(cacheData).length,
            totalHits: Object.values(cacheData).reduce((sum: number, stats: any) => sum + (stats.hits || 0), 0),
            totalMisses: Object.values(cacheData).reduce((sum: number, stats: any) => sum + (stats.misses || 0), 0),
            hitRate: function () {
                const total = this.totalHits + this.totalMisses;
                return total > 0 ? (this.totalHits / total * 100).toFixed(1) + '%' : '0%';
            },
            cachesByComponent: cacheData
        };
    },

    /**
     * Limpar todos os caches
     */
    clearAllCaches: () => {
        if ((window as any).__ADVANCED_MEMO_CLEAR_ALL__) {
            (window as any).__ADVANCED_MEMO_CLEAR_ALL__();
            console.log('🧹 Todos os caches de memoização foram limpos');
        }
    },

    /**
     * Gerar relatório de performance
     */
    generateReport: () => {
        const heavyRenders = PerformanceUtils.findHeavyRenders(5);
        const cacheStats = PerformanceUtils.getCacheStats();

        console.group('📊 RELATÓRIO DE PERFORMANCE');
        console.log('🔄 Componentes com muitos re-renders:', heavyRenders);
        console.log('💾 Estatísticas de cache:', cacheStats);
        console.log(`🎯 Taxa de acerto no cache: ${cacheStats.hitRate()}`);
        console.groupEnd();

        return { heavyRenders, cacheStats };
    }
};

/**
 * 🎮 HOOK DE DESENVOLVIMENTO PARA DEBUGGING
 */
export const usePerformanceDebugging = (componentName: string) => {
    React.useEffect(() => {
        if (process.env.NODE_ENV === 'development') {
            console.log(`🔍 Performance debugging habilitado para: ${componentName}`);

            // Registrar componente para tracking
            const perfData = (window as any).__PERFORMANCE_PROFILER_DATA__ || {};
            if (!perfData[componentName]) {
                perfData[componentName] = {
                    renderCount: 0,
                    totalTime: 0,
                    lastRender: Date.now()
                };
            }
            (window as any).__PERFORMANCE_PROFILER_DATA__ = perfData;
        }
    }, [componentName]);

    return {
        reportRender: () => {
            if (process.env.NODE_ENV === 'development') {
                const perfData = (window as any).__PERFORMANCE_PROFILER_DATA__ || {};
                if (perfData[componentName]) {
                    perfData[componentName].renderCount++;
                    perfData[componentName].lastRender = Date.now();
                }
            }
        }
    };
};

export default {
    EditorMemoPresets,
    OptimizedEditorComponents,
    PerformanceUtils,
    withFullPerformanceOptimization,
    usePerformanceDebugging
};
