/**
 * 🎯 CANONICAL TEMPLATE SERVICE
 * 
 * Serviço unificado para templates que normaliza todos os formatos para Canonical
 * Consolida lógica de HybridTemplateService, UnifiedTemplateService e outros
 * 
 * ✅ Sempre usa sistema canonical
 * ✅ Cache inteligente
 * ✅ Validação automática
 */

import { toCanonicalAny } from './adapters';
import { validateSelection } from './CanonicalScorer';
import type { CanonicalQuiz, CanonicalQuestion } from '@/types/quizCanonical';

interface CachedTemplate {
    canonical: CanonicalQuiz;
    timestamp: number;
    ttl: number;
}

class CanonicalTemplateService {
    private cache = new Map<string, CachedTemplate>();
    private loadingPromises = new Map<string, Promise<CanonicalQuiz>>();
    private readonly DEFAULT_TTL = 5 * 60 * 1000; // 5 minutos

    /**
     * 🎯 Método principal: obtém template normalizado para canonical
     */
    async getTemplate(templateId: string): Promise<CanonicalQuiz> {
        // 1. Verificar cache
        const cached = this.getCached(templateId);
        if (cached) {
            console.log(`⚡ [Canonical] Cache hit: ${templateId}`);
            return cached;
        }

        // 2. Verificar se já está carregando
        if (this.loadingPromises.has(templateId)) {
            console.log(`🔄 [Canonical] Aguardando carregamento: ${templateId}`);
            return await this.loadingPromises.get(templateId)!;
        }

        // 3. Carregar e normalizar
        const loadPromise = this.loadAndNormalize(templateId);
        this.loadingPromises.set(templateId, loadPromise);

        try {
            const canonical = await loadPromise;
            this.setCached(templateId, canonical);
            this.loadingPromises.delete(templateId);
            return canonical;
        } catch (error) {
            this.loadingPromises.delete(templateId);
            throw error;
        }
    }

    /**
     * 🔄 Carrega template raw e normaliza para canonical
     */
    private async loadAndNormalize(templateId: string): Promise<CanonicalQuiz> {
        console.log(`📥 [Canonical] Carregando template: ${templateId}`);

        try {
            // 1. Carregar template raw (prioridade: TS template → DB → fallback)
            const rawTemplate = await this.loadRaw(templateId);

            // 2. ✅ Normalizar para canonical
            const canonical = toCanonicalAny(rawTemplate);

            // 3. ✅ Validar constraints de todas as perguntas
            this.validateQuestions(canonical);

            console.log(`✅ [Canonical] Template normalizado: ${templateId}`, {
                questions: canonical.questions.length,
                validQuestions: canonical.questions.filter(q => 
                    this.isQuestionValid(q)
                ).length
            });

            return canonical;

        } catch (error) {
            console.error(`❌ [Canonical] Erro ao carregar ${templateId}:`, error);
            throw error;
        }
    }

    /**
     * 📦 Carrega template raw de diferentes fontes
     */
    private async loadRaw(templateId: string): Promise<any> {
        // Prioridade 1: Template TypeScript completo
        if (templateId === 'quiz21StepsComplete' || templateId.startsWith('step-')) {
            const { getQuiz21StepsTemplate } = await import('@/templates/imports');
            const QUIZ_TEMPLATE = getQuiz21StepsTemplate();

            if (templateId === 'quiz21StepsComplete') {
                // Retornar template completo
                return QUIZ_TEMPLATE;
            }

            // Step individual
            const stepBlocks = QUIZ_TEMPLATE[templateId];
            if (stepBlocks) {
                return { [templateId]: stepBlocks };
            }
        }

        // Prioridade 2: Banco de dados
        try {
            const dbTemplate = await this.loadFromDatabase(templateId);
            if (dbTemplate) return dbTemplate;
        } catch (error) {
            console.warn(`⚠️ [Canonical] Template não encontrado no DB: ${templateId}`);
        }

        // Prioridade 3: Fallback vazio (será tratado pelo adapter)
        console.warn(`⚠️ [Canonical] Usando fallback para ${templateId}`);
        return { id: templateId, steps: [] };
    }

    /**
     * 🗄️ Carrega do banco de dados
     */
    private async loadFromDatabase(templateId: string): Promise<any | null> {
        try {
            const { supabase } = await import('@/integrations/supabase/client');

            const { data, error } = await supabase
                .from('funnels')
                .select('*')
                .eq('id', templateId)
                .single();

            if (error || !data) return null;

            return {
                id: data.id,
                steps: (data.settings as any)?.steps || [],
                questionData: (data.settings as any)?.questionData || []
            };
        } catch {
            return null;
        }
    }

    /**
     * ✅ Valida todas as perguntas do quiz
     */
    private validateQuestions(quiz: CanonicalQuiz): void {
        const invalidQuestions: string[] = [];

        quiz.questions.forEach(q => {
            if (!this.isQuestionValid(q)) {
                invalidQuestions.push(q.id);
                console.warn(`⚠️ [Canonical] Pergunta com constraints inválidas: ${q.id}`, {
                    kind: q.kind,
                    requiredSelections: q.requiredSelections,
                    minSelections: q.minSelections,
                    maxSelections: q.maxSelections,
                    optionsCount: q.options.length
                });
            }
        });

        if (invalidQuestions.length > 0) {
            console.warn(`⚠️ [Canonical] ${invalidQuestions.length} perguntas com problemas:`, invalidQuestions);
        }
    }

    /**
     * ✅ Verifica se pergunta tem constraints válidas
     */
    private isQuestionValid(q: CanonicalQuestion): boolean {
        // Para perguntas de pontuação, verificar constraints
        if (q.kind === 'scored') {
            // Se tem requiredSelections, verificar se é válido
            if (typeof q.requiredSelections === 'number') {
                return q.requiredSelections > 0 && q.requiredSelections <= q.options.length;
            }

            // Se tem min/max, verificar se são válidos
            if (typeof q.minSelections === 'number' || typeof q.maxSelections === 'number') {
                const min = q.minSelections || 0;
                const max = q.maxSelections || q.options.length;
                return min >= 0 && max > 0 && min <= max && max <= q.options.length;
            }

            // Se não tem constraints, considerar válido (seleção livre)
            return true;
        }

        // Perguntas estratégicas sempre válidas
        return true;
    }

    /**
     * 💾 Gerenciamento de cache
     */
    private getCached(templateId: string): CanonicalQuiz | null {
        const cached = this.cache.get(templateId);
        if (!cached) return null;

        const now = Date.now();
        if (now - cached.timestamp > cached.ttl) {
            this.cache.delete(templateId);
            return null;
        }

        return cached.canonical;
    }

    private setCached(templateId: string, canonical: CanonicalQuiz, ttl = this.DEFAULT_TTL): void {
        this.cache.set(templateId, {
            canonical,
            timestamp: Date.now(),
            ttl
        });
    }

    /**
     * 🗑️ Limpar cache
     */
    clearCache(templateId?: string): void {
        if (templateId) {
            this.cache.delete(templateId);
            this.loadingPromises.delete(templateId);
            console.log(`🗑️ [Canonical] Cache limpo: ${templateId}`);
        } else {
            this.cache.clear();
            this.loadingPromises.clear();
            console.log('🗑️ [Canonical] Cache completo limpo');
        }
    }

    /**
     * 📊 Estatísticas do cache
     */
    getCacheStats() {
        return {
            cached: this.cache.size,
            loading: this.loadingPromises.size,
            memoryUsage: this.estimateMemory()
        };
    }

    private estimateMemory(): string {
        const entries = Array.from(this.cache.values());
        const totalSize = entries.reduce((acc, entry) => {
            return acc + JSON.stringify(entry.canonical).length;
        }, 0);
        return `${(totalSize / 1024).toFixed(2)} KB`;
    }

    /**
     * 🔄 Preload de templates críticos
     */
    async preloadCommonTemplates(): Promise<void> {
        const templates = ['quiz21StepsComplete', 'step-1', 'step-2', 'step-12', 'step-20', 'step-21'];
        
        console.log('🚀 [Canonical] Preloading templates...');
        
        await Promise.allSettled(
            templates.map(id => this.getTemplate(id))
        );

        console.log(`✅ [Canonical] Preload completo (${this.cache.size} templates)`);
    }
}

// Singleton
export const canonicalTemplateService = new CanonicalTemplateService();
export default canonicalTemplateService;
