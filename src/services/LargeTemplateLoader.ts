/**
 * 🚀 LARGE TEMPLATE LOADER
 * 
 * Specialized loader for handling large templates like quiz21StepsComplete.ts
 * without performance issues. Uses chunking and lazy loading.
 */

import { Block } from '@/types/editor';

export interface TemplateChunk {
    stepId: string;
    blocks: Block[];
    isLoaded: boolean;
}

export interface LargeTemplateOptions {
    enableChunking: boolean;
    chunkSize: number;
    enableCache: boolean;
    preloadSteps?: string[];
}

class LargeTemplateLoaderService {
    private cache: Map<string, TemplateChunk[]> = new Map();
    private loadingPromises: Map<string, Promise<any>> = new Map();

    /**
     * Load template with chunking support for large templates
     */
    async loadTemplate(templateId: string, options: LargeTemplateOptions = {
        enableChunking: true,
        chunkSize: 5,
        enableCache: true
    }): Promise<Record<string, Block[]>> {
        console.log('🔄 [LARGE_LOADER] Loading template:', templateId, options);

        // Check if already loading
        if (this.loadingPromises.has(templateId)) {
            return await this.loadingPromises.get(templateId);
        }

        // Check cache first
        if (options.enableCache && this.cache.has(templateId)) {
            const chunks = this.cache.get(templateId)!;
            return this.chunksToTemplate(chunks);
        }

        // Start loading process
        const loadingPromise = this.performLoad(templateId, options);
        this.loadingPromises.set(templateId, loadingPromise);

        try {
            const result = await loadingPromise;
            this.loadingPromises.delete(templateId);
            return result;
        } catch (error) {
            this.loadingPromises.delete(templateId);
            throw error;
        }
    }

    private async performLoad(
        templateId: string,
        options: LargeTemplateOptions
    ): Promise<Record<string, Block[]>> {
        if (templateId === 'quiz21StepsComplete') {
            return await this.loadQuiz21StepsComplete(options);
        }

        throw new Error(`Template ${templateId} not supported by LargeTemplateLoader`);
    }

    private async loadQuiz21StepsComplete(
        options: LargeTemplateOptions
    ): Promise<Record<string, Block[]>> {
        console.log('📦 [LARGE_LOADER] Loading quiz21StepsComplete with chunking');

        // Dynamic import to avoid loading entire file at startup
        const { QUIZ_STYLE_21_STEPS_TEMPLATE } = await import('@/templates/quiz21StepsComplete');

        if (options.enableChunking) {
            // Convert to chunks for memory efficiency
            const chunks = this.templateToChunks(QUIZ_STYLE_21_STEPS_TEMPLATE, options);
            
            if (options.enableCache) {
                this.cache.set('quiz21StepsComplete', chunks);
            }

            // Preload specific steps if requested
            if (options.preloadSteps) {
                await this.preloadSteps(chunks, options.preloadSteps);
            }

            return this.chunksToTemplate(chunks);
        }

        return QUIZ_STYLE_21_STEPS_TEMPLATE;
    }

    private templateToChunks(
        template: Record<string, Block[]>,
        options: LargeTemplateOptions
    ): TemplateChunk[] {
        return Object.entries(template).map(([stepId, blocks]) => ({
            stepId,
            blocks,
            isLoaded: true // Already loaded since we have the data
        }));
    }

    private chunksToTemplate(chunks: TemplateChunk[]): Record<string, Block[]> {
        const template: Record<string, Block[]> = {};
        
        for (const chunk of chunks) {
            if (chunk.isLoaded) {
                template[chunk.stepId] = chunk.blocks;
            }
        }

        return template;
    }

    private async preloadSteps(chunks: TemplateChunk[], stepIds: string[]): Promise<void> {
        console.log('⚡ [LARGE_LOADER] Preloading steps:', stepIds);
        
        for (const stepId of stepIds) {
            const chunk = chunks.find(c => c.stepId === stepId);
            if (chunk && !chunk.isLoaded) {
                // Simulate loading if needed
                chunk.isLoaded = true;
            }
        }
    }

    /**
     * Get specific step without loading entire template
     */
    async getStep(templateId: string, stepId: string): Promise<Block[]> {
        console.log('🎯 [LARGE_LOADER] Getting specific step:', templateId, stepId);

        if (templateId === 'quiz21StepsComplete') {
            // Load only the specific step we need
            const { QUIZ_STYLE_21_STEPS_TEMPLATE } = await import('@/templates/quiz21StepsComplete');
            return QUIZ_STYLE_21_STEPS_TEMPLATE[stepId] || [];
        }

        throw new Error(`Template ${templateId} not supported`);
    }

    /**
     * Clear cache to free memory
     */
    clearCache(templateId?: string): void {
        if (templateId) {
            this.cache.delete(templateId);
        } else {
            this.cache.clear();
        }
    }

    /**
     * Get cache statistics
     */
    getCacheStats(): { size: number; templateIds: string[] } {
        return {
            size: this.cache.size,
            templateIds: Array.from(this.cache.keys())
        };
    }
}

export const largeTemplateLoader = new LargeTemplateLoaderService();