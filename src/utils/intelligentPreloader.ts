/**
 * 🚀 INTELLIGENT PRELOAD SYSTEM
 * 
 * Sistema de preload inteligente baseado no comportamento do usuário:
 * - Preload de recursos críticos
 * - Preload baseado em hover/intent
 * - Cache inteligente
 * - Performance monitoring
 */

interface PreloadConfig {
    delay?: number;
    priority?: 'high' | 'low';
    condition?: () => boolean;
}

interface ResourceMetrics {
    loadTime: number;
    size?: number;
    success: boolean;
    timestamp: number;
}

class IntelligentPreloader {
    private preloadCache = new Map<string, Promise<any>>();
    private metrics = new Map<string, ResourceMetrics>();

    constructor() {
        this.startMetricsCollection();
    }

    /**
     * 🎯 PRELOAD CRITICAL COMPONENTS
     * Preload componentes identificados como críticos na análise do bundle
     */
    preloadCriticalComponents() {
        const criticalComponents = [
            // Editor components (high priority)
            () => import('@/legacy/editor/EditorProUnified'),
            () => import('@/components/editor/blocks/UniversalBlockRenderer'),

            // Core pages (medium priority) 
            () => import('@/pages/admin/DashboardPage'),
            () => import('@/pages/QuizModularPage'),
        ];

        criticalComponents.forEach((importFn, index) => {
            this.preloadResource(`critical-${index}`, importFn, {
                priority: 'high',
                delay: index * 500 // Stagger loading
            });
        });
    }

    /**
     * 📊 PRELOAD HEAVY CHARTS
     * Preload da biblioteca de gráficos pesada (410kB identificados)
     */
    preloadChartsLibrary() {
        this.preloadResource('recharts-library', () => import('recharts'), {
            priority: 'low',
            delay: 3000,
            condition: () => {
                // Só preload se usuário está em página que pode usar gráficos
                const pathname = window.location.pathname;
                return pathname.includes('admin') || pathname.includes('metrics');
            }
        });
    }

    /**
     * 🎨 PRELOAD ON HOVER
     * Preload baseado em hover de links/botões
     */
    setupHoverPreload() {
        const preloadMap = {
            '[href="/admin/metrics"]': () => import('@/pages/admin/MetricsPage'),
            '[href="/admin/participants"]': () => import('@/pages/admin/ParticipantsPage'),
            '[href="/editor"]': () => import('@/pages/MainEditorUnified'),
            '[href*="quiz"]': () => import('@/pages/QuizModularPage'),
        };

        Object.entries(preloadMap).forEach(([selector, importFn]) => {
            document.addEventListener('mouseover', (e) => {
                const target = e.target as HTMLElement;
                if (target.matches?.(selector) || target.closest?.(selector)) {
                    const resourceKey = `hover-${selector}`;
                    if (!this.preloadCache.has(resourceKey)) {
                        this.preloadResource(resourceKey, importFn, { delay: 100 });
                    }
                }
            });
        });
    }

    /**
     * 📱 ADAPTIVE PRELOAD
     * Adapta preload baseado na conexão e device
     */
    adaptivePreload() {
        const connection = (navigator as any).connection;
        const isSlowConnection = connection?.effectiveType === '2g' || connection?.effectiveType === 'slow-2g';
        const isLowEndDevice = navigator.hardwareConcurrency <= 2;

        if (isSlowConnection || isLowEndDevice) {
            console.log('🐌 Slow connection/device detected, reducing preload');
            return; // Skip aggressive preloading
        }

        // Safe to preload more aggressively
        this.preloadAdminPages();
        this.preloadChartsLibrary();
    }

    /**
     * 📋 PRELOAD ADMIN PAGES
     * Preload das páginas admin pesadas identificadas
     */
    preloadAdminPages() {
        const adminPages = [
            { name: 'metrics', import: () => import('@/pages/admin/MetricsPage') },
            { name: 'participants', import: () => import('@/pages/admin/ParticipantsPage') },
            { name: 'nocode', import: () => import('@/pages/admin/NoCodeConfigPage') },
            { name: 'settings', import: () => import('@/pages/admin/SettingsPage') },
        ];

        adminPages.forEach(({ name, import: importFn }, index) => {
            this.preloadResource(`admin-${name}`, importFn, {
                priority: 'low',
                delay: 2000 + (index * 1000),
                condition: () => window.location.pathname.includes('admin')
            });
        });
    }

    /**
     * 🔧 CORE PRELOAD FUNCTION
     */
    private async preloadResource(
        key: string,
        importFn: () => Promise<any>,
        config: PreloadConfig = {}
    ) {
        if (this.preloadCache.has(key)) {
            return this.preloadCache.get(key);
        }

        // Check condition if provided
        if (config.condition && !config.condition()) {
            return;
        }

        const startTime = performance.now();

        const preloadPromise = new Promise<any>((resolve, reject) => {
            const load = async () => {
                try {
                    const module = await importFn();
                    const loadTime = performance.now() - startTime;

                    this.metrics.set(key, {
                        loadTime,
                        success: true,
                        timestamp: Date.now()
                    });

                    console.log(`✅ Preloaded ${key} in ${loadTime.toFixed(2)}ms`);
                    resolve(module);
                } catch (error) {
                    this.metrics.set(key, {
                        loadTime: performance.now() - startTime,
                        success: false,
                        timestamp: Date.now()
                    });

                    console.warn(`❌ Failed to preload ${key}:`, error);
                    reject(error);
                }
            };

            if (config.delay) {
                setTimeout(load, config.delay);
            } else {
                // Use requestIdleCallback for non-critical resources
                if ('requestIdleCallback' in window) {
                    requestIdleCallback(load);
                } else {
                    setTimeout(load, 0);
                }
            }
        });

        this.preloadCache.set(key, preloadPromise);
        return preloadPromise;
    }

    /**
     * 📊 METRICS COLLECTION
     */
    private startMetricsCollection() {
        // Performance observer for navigation timing
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                list.getEntries().forEach((entry) => {
                    if (entry.entryType === 'navigation') {
                        const navEntry = entry as PerformanceNavigationTiming;
                        console.log('📊 Navigation timing:', {
                            DOMContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart,
                            loadComplete: navEntry.loadEventEnd - navEntry.loadEventStart,
                            firstPaint: navEntry.responseEnd - navEntry.requestStart
                        });
                    }
                });
            });

            observer.observe({ entryTypes: ['navigation'] });
        }
    }

    /**
     * 📈 GET PERFORMANCE REPORT
     */
    getPerformanceReport() {
        const report = {
            preloadedResources: this.preloadCache.size,
            metrics: Array.from(this.metrics.entries()).map(([key, metrics]) => ({
                resource: key,
                ...metrics
            })),
            averageLoadTime: 0,
            successRate: 0
        };

        const successfulLoads = report.metrics.filter(m => m.success);
        report.averageLoadTime = successfulLoads.reduce((sum, m) => sum + m.loadTime, 0) / successfulLoads.length;
        report.successRate = (successfulLoads.length / report.metrics.length) * 100;

        return report;
    }

    /**
     * 🧹 CLEANUP
     */
    cleanup() {
        this.preloadCache.clear();
        this.metrics.clear();
    }
}

// 🌟 SINGLETON INSTANCE
export const intelligentPreloader = new IntelligentPreloader();

// 🚀 AUTO-INITIALIZATION
if (typeof window !== 'undefined') {
    // Start preloading after page load
    window.addEventListener('load', () => {
        setTimeout(() => {
            intelligentPreloader.preloadCriticalComponents();
            intelligentPreloader.setupHoverPreload();
            intelligentPreloader.adaptivePreload();
        }, 1000);
    });

    // Report performance in dev mode
    if (import.meta.env.DEV) {
        window.addEventListener('beforeunload', () => {
            const report = intelligentPreloader.getPerformanceReport();
            console.log('📊 Preload Performance Report:', report);
        });
    }

    // Cleanup on page unload
    window.addEventListener('beforeunload', () => {
        intelligentPreloader.cleanup();
    });
}

export default intelligentPreloader;
