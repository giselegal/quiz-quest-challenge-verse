/**
 * 🌉 QUIZ EDITOR BRIDGE - Ponte entre Editor e Produção
 * 
 * Serviço que sincroniza edições do editor com o runtime de produção
 * Permite editar, salvar e substituir o funil /quiz-estilo
 * 
 * ✅ FASE 6.5: Integrado com utilitários testados (91 testes)
 */

import { QUIZ_STEPS, STEP_ORDER, type QuizStep } from '@/data/quizSteps';
import { supabase } from '@/integrations/supabase/client';
import { autoFillNextSteps } from '@/utils/autoFillNextSteps';
// ✅ SPRINT 1: Imports do sistema canonical
import { toCanonicalAny } from '@/services/core/adapters';
import { validateSelection } from '@/services/core/CanonicalScorer';
import type { CanonicalQuiz } from '@/types/quizCanonical';
// @TEMP: Helper para forçar reconhecimento de tabelas recém adicionadas nos tipos gerados
type AnySupabase = typeof supabase & { from: (table: string) => any };
const supabaseAny = supabase as AnySupabase;

// ✅ FASE 4: Conversões bidirecionais testadas (600+ linhas, 32 testes)
import {
    convertStepToBlocks,
    convertBlocksToStep,
    validateRoundTrip
} from '@/utils/quizConversionUtils';

// ✅ FASE 5: Validações de integridade testadas (550+ linhas, 22 testes)
import {
    validateCompleteFunnel,
    validateStyleIds,
    validateNextStep,
    validateOfferMap,
    validateFormInput
} from '@/utils/quizValidationUtils';

interface EditorQuizStep extends QuizStep {
    id: string;
    order: number;
}

interface QuizFunnelData {
    id: string;
    name: string;
    slug: string;
    steps: EditorQuizStep[];
    isPublished: boolean;
    version: number;
    createdAt?: string;
    updatedAt?: string;
    // Campos opcionais adicionais (schema unificado)
    runtime?: any;
    results?: any;
    ui?: any;
    settings?: any;
}

class QuizEditorBridge {
    private cache = new Map<string, QuizFunnelData>();
    private readonly PRODUCTION_SLUG = 'quiz-estilo';
    private readonly DRAFT_TABLE = 'quiz_drafts';
    private readonly PRODUCTION_TABLE = 'quiz_production';

    /**
     * 🎯 Carregar funil para edição (draft ou produção)
     */
    async loadFunnelForEdit(funnelId?: string): Promise<QuizFunnelData> {
        console.log('📥 Carregando funil para edição:', funnelId || 'produção');

        // Se não tem ID, carregar funil de produção atual
        if (!funnelId || funnelId === this.PRODUCTION_SLUG) {
            return this.loadProductionFunnel();
        }

        // Tentar carregar draft do Supabase
        const draft = await this.loadDraftFromDatabase(funnelId);
        if (draft) return draft;

        // Fallback: criar novo draft baseado na produção
        return this.createDraftFromProduction(funnelId);
    }

    /**
     * 📦 Carregar funil de produção (QUIZ_STEPS atual)
     */
    private loadProductionFunnel(): QuizFunnelData {
        const steps: EditorQuizStep[] = STEP_ORDER.map((stepId, index) => {
            const stepData = QUIZ_STEPS[stepId];
            return {
                id: stepId,
                order: index + 1,
                ...stepData
            };
        });

        return {
            id: 'production',
            name: 'Quiz Estilo Pessoal - Produção',
            slug: this.PRODUCTION_SLUG,
            steps,
            isPublished: true,
            version: 1
        };
    }

    /**
     * 💾 Salvar rascunho de edição
     * ✅ FASE 6.5: Validações automáticas antes de salvar
     */
    async saveDraft(funnel: QuizFunnelData): Promise<string> {
        console.log('💾 Salvando rascunho:', funnel.name);

        // 🔧 Auto-preencher nextStep se faltar (robustez extra caso editor não tenha aplicado)
        let workingSteps = funnel.steps.map(s => ({ ...s }));
        const auto = autoFillNextSteps(workingSteps.map(s => ({ id: s.id, order: s.order, nextStep: (s as any).nextStep })) as any);
        if (auto.adjusted) {
            const map = new Map(auto.steps.map(s => [s.id, s.nextStep] as const));
            workingSteps = workingSteps.map(s => ({ ...s, nextStep: map.get(s.id) }));
            console.log('🛠️ nextStep preenchido automaticamente em', auto.filledCount, 'etapas');
        }

        // ✅ FASE 5: Validar integridade completa antes de salvar usando steps pós-autoFill
        const validation = validateCompleteFunnel(workingSteps as any);

        if (!validation.isValid) {
            // Agrupar erros de nextStep para mensagem mais clara
            // Determinar última etapa dinamicamente (maior order; fallback pelo maior índice numérico em id)
            const lastStep = workingSteps.reduce((acc, s) => {
                if (!acc) return s;
                if ((s.order ?? 0) > (acc.order ?? 0)) return s;
                return acc;
            }, workingSteps[0]);
            const lastId = lastStep?.id;
            const missingNextStepIds = workingSteps
                .filter(s => s.id !== lastId && (s.nextStep === undefined || s.nextStep === null))
                .map(s => s.id);
            const baseMsg = validation.errors.map(e => e.message).join('; ');
            const errorMsg = missingNextStepIds.length
                ? `${baseMsg}; Etapas faltando: ${missingNextStepIds.join(', ')}`
                : baseMsg;
            console.error('❌ Validação falhou:', errorMsg, { missingNextStepIds });
            throw new Error(`Validação falhou: ${errorMsg}`);
        }

        if (validation.warnings.length > 0) {
            console.warn('⚠️ Avisos de validação:', validation.warnings);
        }

        console.log('✅ Validação passou:', validation);

        const draftId = funnel.id === 'production' ? `draft-${Date.now()}` : funnel.id;

        const draftData = {
            id: draftId,
            name: funnel.name,
            slug: funnel.slug,
            steps: workingSteps.map(s => ({ ...s, autoLinked: !funnel.steps.find(o => o.id === s.id)?.nextStep && s.nextStep ? true : (s as any).autoLinked })),
            version: (funnel.version || 0) + 1,
            is_published: false,
            updated_at: new Date().toISOString(),
            // Persistência opcional de runtime/results/ui (pode exigir colunas JSONB no Supabase)
            runtime: (funnel as any).runtime,
            results: (funnel as any).results,
            ui: (funnel as any).ui,
            settings: (funnel as any).settings,
        };

        // Salvar no Supabase (melhor esforço) e sempre manter cache local como fallback
        try {
            const { error } = await supabaseAny
                .from(this.DRAFT_TABLE)
                .upsert(draftData);
            if (error) {
                console.warn('⚠️ Supabase indisponível ao salvar draft. Usando cache local:', error?.message || error);
            }
        } catch (err) {
            console.warn('⚠️ Falha geral ao acessar Supabase ao salvar draft. Continuando com cache local.', err);
        }

        // Atualizar cache SEMPRE para habilitar fluxo dev/local sem backend
        this.cache.set(draftId, { ...funnel, steps: workingSteps as any, id: draftId });

        console.log('✅ Rascunho salvo (com fallback local se necessário):', draftId);
        return draftId;
    }

    /**
     * 🚀 Publicar e substituir produção
     * ✅ FASE 6.5: Validações críticas antes de publicar
     */
    async publishToProduction(funnelId: string): Promise<void> {
        console.log('🚀 Publicando para produção:', funnelId);

        // Carregar draft
        let draft = await this.loadDraftFromDatabase(funnelId);
        // Fallback em memória: em ambientes sem Supabase real, recuperar do cache local
        if (!draft) {
            const cached = this.cache.get(funnelId);
            if (cached) {
                console.warn('⚠️ Supabase indisponível ou sem dados. Usando draft do cache em memória para publicar.');
                draft = cached;
            }
        }
        if (!draft) {
            throw new Error('Draft não encontrado');
        }

        // 🔧 Garantir nextStep preenchido antes de validar/publicar
        let publishingSteps = draft.steps.map(s => ({ ...s }));
        const auto = autoFillNextSteps(publishingSteps.map(s => ({ id: s.id, order: s.order, nextStep: (s as any).nextStep })) as any);
        if (auto.adjusted) {
            const map = new Map(auto.steps.map(s => [s.id, s.nextStep] as const));
            publishingSteps = publishingSteps.map(s => ({ ...s, nextStep: map.get(s.id) }));
            console.log('🛠️ (publish) nextStep preenchido automaticamente em', auto.filledCount, 'etapas');
        }

        // ✅ FASE 5: Validação CRÍTICA antes de publicar usando steps finalizados
        const validation = validateCompleteFunnel(publishingSteps as any);

        if (!validation.isValid) {
            const errorMsg = validation.errors.map(e => e.message).join('; ');
            console.error('❌ PUBLICAÇÃO BLOQUEADA - Validação falhou:', errorMsg);
            throw new Error(`Publicação bloqueada: ${errorMsg}`);
        }

        console.log('✅ Validação passou. Publicando...');

        // Converter steps para formato QUIZ_STEPS
        const quizSteps = this.convertToQuizSteps(publishingSteps as any);

        // Salvar na tabela de produção (inclui runtime/results/ui quando disponíveis)
        const productionData = {
            slug: this.PRODUCTION_SLUG,
            steps: quizSteps,
            version: draft.version,
            published_at: new Date().toISOString(),
            source_draft_id: funnelId,
            runtime: (draft as any).runtime,
            results: (draft as any).results,
            ui: (draft as any).ui,
            settings: (draft as any).settings,
        };

        const { error } = await supabaseAny
            .from(this.PRODUCTION_TABLE)
            .upsert(productionData);

        if (error) {
            console.error('❌ Erro ao publicar:', error);
            throw new Error(`Falha na publicação: ${error.message}`);
        }

        // Invalidar cache
        this.cache.clear();

        console.log('✅ Publicado com sucesso! Versão:', draft.version);
    }

    /**
     * 🔄 Converter steps editáveis para formato QUIZ_STEPS
     */
    private convertToQuizSteps(steps: EditorQuizStep[]): Record<string, QuizStep> {
        const quizSteps: Record<string, QuizStep> = {};

        steps.forEach(step => {
            const { id, order, ...stepData } = step;
            quizSteps[id] = stepData;
        });

        return quizSteps;
    }

    /**
     * 📂 Carregar draft do banco
     */
    private async loadDraftFromDatabase(draftId: string): Promise<QuizFunnelData | null> {
        const { data, error } = await supabaseAny
            .from(this.DRAFT_TABLE)
            .select('*')
            .eq('id', draftId)
            .single();

        if (error || !data) {
            // Fallback em memória
            const cached = this.cache.get(draftId);
            if (cached) return cached;
            return null;
        }

        return {
            id: data.id,
            name: data.name,
            slug: data.slug,
            steps: data.steps as EditorQuizStep[],
            isPublished: data.is_published || false,
            version: data.version || 1,
            createdAt: data.created_at,
            updatedAt: data.updated_at,
            // Campos opcionais
            runtime: (data as any).runtime,
            results: (data as any).results,
            ui: (data as any).ui,
            settings: (data as any).settings,
        };
    }

    /**
     * � Listar drafts disponíveis (Supabase + cache em memória)
     * Útil para o dashboard "Meus Funis" exibir rascunhos mesmo em dev sem backend real.
     */
    async listDrafts(): Promise<QuizFunnelData[]> {
        let drafts: QuizFunnelData[] = [];
        try {
            const { data } = await supabaseAny
                .from(this.DRAFT_TABLE)
                .select('*')
                .order('updated_at', { ascending: false });

            if (Array.isArray(data)) {
                drafts = data.map((d: any) => ({
                    id: d.id,
                    name: d.name,
                    slug: d.slug,
                    steps: d.steps as EditorQuizStep[],
                    isPublished: d.is_published || false,
                    version: d.version || 1,
                    createdAt: d.created_at,
                    updatedAt: d.updated_at,
                    runtime: d.runtime,
                    results: d.results,
                    ui: d.ui,
                    settings: d.settings,
                }));
            }
        } catch {
            // Ignorar erros – usaremos cache
        }

        // Mesclar com cache em memória
        const cached = Array.from(this.cache.values());

        // Unificar por id (priorizar supabase e preencher faltantes com cache)
        const byId = new Map<string, QuizFunnelData>();
        drafts.forEach(d => byId.set(d.id, d));
        cached.forEach(c => {
            if (!byId.has(c.id)) byId.set(c.id, c);
        });

        // Ordenar por updatedAt/createdAt desc
        const list = Array.from(byId.values()).sort((a, b) => {
            const ta = new Date(a.updatedAt || a.createdAt || 0).getTime();
            const tb = new Date(b.updatedAt || b.createdAt || 0).getTime();
            return tb - ta;
        });
        return list;
    }

    /**
     * 🔎 Somente drafts do cache (memória) – útil em dev puro
     */
    listCachedDrafts(): QuizFunnelData[] {
        return Array.from(this.cache.values());
    }

    /**
     * �📋 Criar draft baseado na produção
     */
    private createDraftFromProduction(draftId: string): QuizFunnelData {
        const production = this.loadProductionFunnel();

        return {
            ...production,
            id: draftId,
            name: `${production.name} - Rascunho`,
            isPublished: false
        };
    }

    /**
     * 🎯 Carregar funil para runtime (usado pelo QuizApp)
     */
    async loadForRuntime(funnelId?: string): Promise<Record<string, QuizStep>> {
        console.log('🎯 Carregando para runtime:', funnelId || 'produção');

        // Se não tem funnelId, usar produção
        if (!funnelId) {
            // Tentar buscar versão publicada mais recente
            const published = await this.getLatestPublished();
            return published?.steps || QUIZ_STEPS;
        }

        // Carregar draft específico (preview)
        const draft = await this.loadDraftFromDatabase(funnelId);
        if (draft) {
            return this.convertToQuizSteps(draft.steps);
        }
        // Fallback em memória: se salvo nesta sessão
        const cached = this.cache.get(funnelId);
        if (cached) {
            return this.convertToQuizSteps(cached.steps as any);
        }

        // Fallback para produção
        return QUIZ_STEPS;
    }

    /**
     * 📦 Buscar versão publicada mais recente
     */
    private async getLatestPublished(): Promise<{ steps: Record<string, QuizStep>; runtime?: any; results?: any; ui?: any; settings?: any } | null> {
        try {
            const { data, error } = await supabaseAny
                .from(this.PRODUCTION_TABLE)
                .select('steps, runtime, results, ui, settings')
                .eq('slug', this.PRODUCTION_SLUG)
                .order('published_at', { ascending: false })
                .limit(1)
                .single();

            if (error || !data) return null;

            return {
                steps: data.steps as Record<string, QuizStep>,
                runtime: (data as any).runtime,
                results: (data as any).results,
                ui: (data as any).ui,
                settings: (data as any).settings,
            };
        } catch {
            return null;
        }
    }

    /**
     * ⚙️ Carregar configuração de runtime/resultados/ui (draft ou produção)
     */
    async loadRuntimeConfig(funnelId?: string): Promise<{ runtime?: any; results?: any; ui?: any; settings?: any } | null> {
        if (!funnelId) {
            const published = await this.getLatestPublished();
            return published ? { runtime: published.runtime, results: published.results, ui: published.ui, settings: published.settings } : null;
        }

        const draft = await this.loadDraftFromDatabase(funnelId);
        if (draft) {
            const { runtime, results, ui, settings } = draft as any;
            return { runtime, results, ui, settings };
        }

        const cached = this.cache.get(funnelId);
        if (cached) {
            const { runtime, results, ui, settings } = cached as any;
            return { runtime, results, ui, settings };
        }

        // Fallback nulo se não houver
        return null;
    }

    /**
     * 🔄 Converter steps para canonical
     * ✅ SPRINT 1: Novo método usando sistema canonical
     */
    private toCanonical(steps: EditorQuizStep[]): CanonicalQuiz {
        return toCanonicalAny({ steps });
    }

    /**
     * 📊 Validar integridade do funil
     * ✅ SPRINT 1: Usa sistema canonical + validações legacy
     */
    validateFunnel(funnel: QuizFunnelData): { valid: boolean; errors: string[]; warnings: string[] } {
        console.log('🔍 Validando funil com sistema canonical...');

        // ✅ SPRINT 1: Normalizar para canonical
        const canonical = this.toCanonical(funnel.steps);

        // ✅ Validar constraints de seleção usando canonical
        const canonicalErrors: string[] = [];
        canonical.questions.forEach(q => {
            // Validar com seleção vazia (verifica se constraints são válidas)
            if (!validateSelection(q, [])) {
                if (q.requiredSelections) {
                    canonicalErrors.push(`${q.id}: requer exatamente ${q.requiredSelections} seleções`);
                } else if (q.minSelections || q.maxSelections) {
                    const min = q.minSelections || 0;
                    const max = q.maxSelections || q.options.length;
                    canonicalErrors.push(`${q.id}: requer entre ${min} e ${max} seleções`);
                }
            }
        });

        // ✅ Validações legacy (mantidas para compatibilidade)
        const validation = validateCompleteFunnel(funnel.steps as any);

        const allErrors = [
            ...validation.errors.map(e => e.message),
            ...canonicalErrors
        ];
        const warnings = validation.warnings.map(w => w.message);

        console.log('✅ Validação completa (canonical + legacy):', {
            valid: allErrors.length === 0,
            canonicalErrors: canonicalErrors.length,
            legacyErrors: validation.errors.length,
            warnings: warnings.length
        });

        return {
            valid: allErrors.length === 0,
            errors: allErrors,
            warnings
        };
    }
}

// Singleton
export const quizEditorBridge = new QuizEditorBridge();
export default quizEditorBridge;
