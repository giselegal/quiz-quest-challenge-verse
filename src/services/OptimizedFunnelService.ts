/**
 * 🎯 OPTIMIZED FUNNEL SERVICE
 * 
 * Handles large templates like quiz21StepsComplete.ts with performance optimizations
 * and direct integration with the funnel system.
 */

import { largeTemplateLoader } from './LargeTemplateLoader';
import { funnelUnifiedService } from './FunnelUnifiedService';
import { Block } from '@/types/editor';

export interface OptimizedFunnelOptions {
    enableLazyLoading: boolean;
    preloadSteps: string[];
    cacheTemplate: boolean;
    templateId: string;
}

class OptimizedFunnelService {
    private activeTemplate: string | null = null;
    private loadedSteps: Set<string> = new Set();

    /**
     * Create a funnel from quiz21StepsComplete template optimized for performance
     */
    async createFunnelFromQuiz21Template(funnelId: string): Promise<boolean> {
        try {
            console.log('🚀 [OPTIMIZED_FUNNEL] Creating funnel from quiz21StepsComplete:', funnelId);

            // Load template with optimization settings
            const template = await largeTemplateLoader.loadTemplate('quiz21StepsComplete', {
                enableChunking: true,
                chunkSize: 3,
                enableCache: true,
                preloadSteps: ['1', '2', '3'] // Preload first 3 steps
            });

            // Create funnel data structure
            const funnelData = {
                id: funnelId,
                name: 'Quiz de Estilo Pessoal - 21 Etapas',
                description: 'Template completo para descoberta do estilo pessoal',
                template_id: 'quiz21StepsComplete',
                steps: this.convertTemplateToSteps(template),
                metadata: {
                    totalSteps: Object.keys(template).length,
                    isOptimized: true,
                    createdAt: new Date().toISOString(),
                    templateSource: 'quiz21StepsComplete'
                },
                settings: {
                    lazyLoading: true,
                    chunkSize: 3,
                    cacheEnabled: true
                }
            };

            // Save to unified service
            const success = await funnelUnifiedService.createFunnel(funnelData);
            
            if (success) {
                this.activeTemplate = 'quiz21StepsComplete';
                console.log('✅ [OPTIMIZED_FUNNEL] Funnel created successfully:', funnelId);
            }

            return success;
        } catch (error) {
            console.error('❌ [OPTIMIZED_FUNNEL] Failed to create funnel:', error);
            return false;
        }
    }

    /**
     * Load specific step on-demand
     */
    async loadStep(funnelId: string, stepId: string): Promise<Block[]> {
        try {
            console.log('📦 [OPTIMIZED_FUNNEL] Loading step on-demand:', funnelId, stepId);

            // Check if step already loaded
            if (this.loadedSteps.has(stepId)) {
                const funnel = await funnelUnifiedService.getFunnel(funnelId);
                const step = funnel?.steps?.find(s => s.id === stepId);
                return step?.blocks || [];
            }

            // Load step from template
            const blocks = await largeTemplateLoader.getStep('quiz21StepsComplete', stepId);
            
            // Cache the loaded step
            this.loadedSteps.add(stepId);

            // Update funnel data if needed
            await this.updateFunnelStep(funnelId, stepId, blocks);

            console.log('✅ [OPTIMIZED_FUNNEL] Step loaded:', stepId, blocks.length, 'blocks');
            return blocks;

        } catch (error) {
            console.error('❌ [OPTIMIZED_FUNNEL] Failed to load step:', stepId, error);
            return [];
        }
    }

    /**
     * Get funnel with lazy loading support
     */
    async getFunnelOptimized(funnelId: string): Promise<any> {
        console.log('🎯 [OPTIMIZED_FUNNEL] Getting optimized funnel:', funnelId);

        const funnel = await funnelUnifiedService.getFunnel(funnelId);
        
        if (funnel?.settings?.lazyLoading) {
            // Return funnel with placeholder steps that load on-demand
            return {
                ...funnel,
                steps: funnel.steps?.map(step => ({
                    ...step,
                    blocks: this.loadedSteps.has(step.id) ? step.blocks : [],
                    isLazyLoaded: !this.loadedSteps.has(step.id)
                }))
            };
        }

        return funnel;
    }

    /**
     * Preload multiple steps for better UX
     */
    async preloadSteps(funnelId: string, stepIds: string[]): Promise<void> {
        console.log('⚡ [OPTIMIZED_FUNNEL] Preloading steps:', stepIds);

        const loadPromises = stepIds.map(stepId => this.loadStep(funnelId, stepId));
        await Promise.all(loadPromises);

        console.log('✅ [OPTIMIZED_FUNNEL] Steps preloaded successfully');
    }

    /**
     * Direct editor integration for quiz21StepsComplete
     */
    async openInEditor(templateId = 'quiz21StepsComplete'): Promise<string> {
        console.log('🎨 [OPTIMIZED_FUNNEL] Opening template in editor:', templateId);

        // Generate unique funnel ID
        const funnelId = `${templateId}-${Date.now()}`;

        // Create optimized funnel
        const success = await this.createFunnelFromQuiz21Template(funnelId);
        
        if (!success) {
            throw new Error('Failed to create funnel for editor');
        }

        // Preload first few steps for immediate editing
        await this.preloadSteps(funnelId, ['1', '2', '3']);

        // Return editor URL
        const editorUrl = `/editor?funnel=${funnelId}`;
        console.log('✅ [OPTIMIZED_FUNNEL] Editor URL generated:', editorUrl);
        
        return editorUrl;
    }

    /**
     * Check if template is large and needs optimization
     */
    requiresOptimization(templateId: string): boolean {
        return templateId === 'quiz21StepsComplete' || templateId.includes('21Steps');
    }

    /**
     * Clear cache and reset state
     */
    reset(): void {
        this.activeTemplate = null;
        this.loadedSteps.clear();
        largeTemplateLoader.clearCache();
    }

    private convertTemplateToSteps(template: Record<string, Block[]>): any[] {
        return Object.entries(template).map(([stepId, blocks]) => ({
            id: stepId,
            name: this.getStepName(stepId),
            blocks,
            isOptimized: true
        }));
    }

    private async updateFunnelStep(funnelId: string, stepId: string, blocks: Block[]): Promise<void> {
        try {
            const funnel = await funnelUnifiedService.getFunnel(funnelId);
            if (funnel?.steps) {
                const stepIndex = funnel.steps.findIndex(s => s.id === stepId);
                if (stepIndex >= 0) {
                    funnel.steps[stepIndex].blocks = blocks;
                    await funnelUnifiedService.updateFunnel(funnelId, funnel);
                }
            }
        } catch (error) {
            console.warn('⚠️ [OPTIMIZED_FUNNEL] Failed to update funnel step:', error);
        }
    }

    private getStepName(stepId: string): string {
        const stepNumber = parseInt(stepId);
        
        if (stepNumber === 1) return 'Coleta do Nome';
        if (stepNumber >= 2 && stepNumber <= 11) return `Questão ${stepNumber - 1} - Personalidade`;
        if (stepNumber === 12) return 'Transição - Questões Estratégicas';
        if (stepNumber >= 13 && stepNumber <= 18) return `Questão Estratégica ${stepNumber - 12}`;
        if (stepNumber === 19) return 'Transição - Resultado';
        if (stepNumber === 20) return 'Página de Resultado';
        if (stepNumber === 21) return 'Página de Oferta';
        
        return `Etapa ${stepNumber}`;
    }
}

export const optimizedFunnelService = new OptimizedFunnelService();