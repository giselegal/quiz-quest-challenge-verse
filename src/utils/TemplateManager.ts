// @ts-nocheck
import { canonicalTemplateService } from '../services/core/CanonicalTemplateService';
import type { Block } from '../types/editor';
import { StorageService } from '@/services/core/StorageService';

/**
 * 🎯 TEMPLATE MANAGER - SPRINT 1 MIGRADO
 * 
 * Agora usa CanonicalTemplateService (consolidado)
 * Mantém API backward compatible
 */
export class TemplateManager {
  private static cache = new Map<string, Block[]>();
  private static PUBLISH_PREFIX = 'quiz_published_blocks_';

  static async loadStepBlocks(stepId: string, funnelId?: string): Promise<Block[]> {
    try {
      const canonical = await canonicalTemplateService.getTemplate(stepId);
      // Converter canonical para blocks (simplificado)
      return canonical.questions.map((q, idx) => ({
        id: q.id,
        type: 'options-grid',
        order: idx,
        content: { question: q.text, options: q.options },
        properties: {}
      } as any));
    } catch {
      return [];
    }
  }

  static publishStep(stepId: string, blocks: Block[]): void {
    // Manter publicação local para compatibilidade
    this.cache.set(`${this.PUBLISH_PREFIX}${stepId}`, blocks);
  }

  static unpublishStep(stepId: string): void {
    this.cache.delete(`${this.PUBLISH_PREFIX}${stepId}`);
  }

  static async preloadCommonTemplates(): Promise<void> {
    return canonicalTemplateService.preloadCommonTemplates();
  }

  static async reloadTemplate(stepId: string, funnelId?: string): Promise<Block[]> {
    canonicalTemplateService.clearCache(stepId);
    return this.loadStepBlocks(stepId, funnelId);
  }

  static getAvailableTemplates(maxSteps: number = 21): string[] {
    return Array.from({ length: maxSteps }, (_, i) => `step-${i + 1}`);
  }

  static hasTemplate(stepId: string, maxSteps: number = 21): boolean {
    const stepNumber = parseInt(stepId.replace('step-', ''));
    return stepNumber >= 1 && stepNumber <= maxSteps;
  }

  static clearCache(): void {
    unifiedTemplateService.invalidateCache();
  }
}