/**
 * 🎯 CONTEXTUAL FUNNEL SERVICE
 * 
 * Service isolado por contexto para evitar vazamento de dados entre:
 * - Editor (/editor)
 * - Templates (/admin/templates) 
 * - Meus Funis (/admin/meus-funis)
 * - Preview/outras páginas
 */

import { supabase } from '@/integrations/supabase/client';
import {
    FunnelContext,
    ContextualService,
    generateContextualId,
    generateContextualStorageKey,
    validateContextualId
} from '@/core/contexts/FunnelContext';
import {
    type InsertFunnel,
    type UpdateFunnel,
    type AutoSaveState,
    type FunnelVersion,
    generateId,
} from '@/types/unified-schema';

export interface ContextualFunnelData {
    id: string;
    name: string;
    description: string | null;
    pages: any[];
    theme?: string;
    isPublished?: boolean;
    version?: number;
    config?: any;
    createdAt?: Date;
    lastModified?: Date;
    user_id?: string;
    context: FunnelContext; // ✅ NOVO: Identificação do contexto
}

export interface ContextualPageData {
    id: string;
    name: string;
    title: string;
    type: string;
    order: number;
    blocks: any[];
    funnel_id: string;
    context: FunnelContext; // ✅ NOVO: Identificação do contexto
}

/**
 * Service de funis com isolamento por contexto
 */
export class ContextualFunnelService implements ContextualService {
    constructor(public readonly context: FunnelContext) { }

    /**
     * Cria um novo funil no contexto específico
     */
    async createFunnel(funnel: Partial<ContextualFunnelData>): Promise<ContextualFunnelData> {
        try {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            if (!user) throw new Error('Usuário não autenticado');

            // ✅ Gerar ID contextual único
            const contextualId = generateContextualId(this.context, funnel.id);

            const funnelData: InsertFunnel = {
                id: contextualId,
                name: funnel.name || 'Novo Funil',
                description: funnel.description || '',
                user_id: user.id,
                is_published: funnel.isPublished || false,
                version: funnel.version || 1,
                settings: {
                    theme: funnel.theme || 'default',
                    config: funnel.config || {},
                    context: this.context, // ✅ Salvar contexto nos settings
                },
            };

            const { data, error } = await supabase.from('funnels').insert(funnelData).select().single();
            if (error) throw error;

            // ✅ Salvar também no localStorage contextual
            const contextualData: ContextualFunnelData = {
                id: data.id,
                name: data.name,
                description: data.description,
                pages: [],
                theme: (data.settings as any)?.theme || 'default',
                isPublished: data.is_published || false,
                version: data.version || 1,
                config: (data.settings as any)?.config || {},
                createdAt: data.created_at ? new Date(data.created_at) : new Date(),
                lastModified: data.updated_at ? new Date(data.updated_at) : new Date(),
                user_id: data.user_id || '',
                context: this.context,
            };
            this.saveToContextualLocalStorage(contextualId, contextualData);

            return {
                id: data.id,
                name: data.name,
                description: data.description || '',
                pages: [],
                theme: (data.settings as any)?.theme || 'default',
                isPublished: data.is_published || false,
                version: data.version || 1,
                config: (data.settings as any)?.config || {},
                createdAt: data.created_at ? new Date(data.created_at) : new Date(),
                lastModified: data.updated_at ? new Date(data.updated_at) : new Date(),
                user_id: data.user_id || '',
                context: this.context,
            };
        } catch (error) {
            console.error(`❌ Erro ao criar funil no contexto ${this.context}:`, error);
            throw error;
        }
    }

    /**
     * Salva um funil no contexto específico
     */
    async saveFunnel(funnel: ContextualFunnelData): Promise<ContextualFunnelData> {
        try {
            // ✅ Validar que o funil pertence ao contexto correto
            if (!validateContextualId(funnel.id, this.context)) {
                throw new Error(`Funil ${funnel.id} não pertence ao contexto ${this.context}`);
            }

            const {
                data: { user },
            } = await supabase.auth.getUser();
            if (!user) throw new Error('Usuário não autenticado');

            const updateData: UpdateFunnel = {
                name: funnel.name,
                description: funnel.description,
                is_published: funnel.isPublished,
                version: funnel.version,
                settings: {
                    theme: funnel.theme,
                    config: funnel.config,
                    context: this.context, // ✅ Manter contexto
                },
                updated_at: new Date().toISOString(),
            };

            const { data, error } = await supabase
                .from('funnels')
                .update(updateData)
                .eq('id', funnel.id)
                .eq('user_id', user.id)
                .select()
                .single();

            if (error) throw error;

            // ✅ Salvar páginas com contexto
            if (funnel.pages && funnel.pages.length > 0) {
                await this.savePages(funnel.id, funnel.pages);
            }

            // ✅ Atualizar localStorage contextual
            const contextualSaved: ContextualFunnelData = {
                id: data.id,
                name: data.name,
                description: data.description,
                pages: funnel.pages || [],
                theme: (data.settings as any)?.theme,
                isPublished: data.is_published || false,
                version: data.version || 1,
                config: (data.settings as any)?.config || {},
                createdAt: data.created_at ? new Date(data.created_at) : new Date(),
                lastModified: data.updated_at ? new Date(data.updated_at) : new Date(),
                user_id: data.user_id || '',
                context: this.context,
            };
            this.saveToContextualLocalStorage(funnel.id, contextualSaved);

            return {
                id: data.id,
                name: data.name,
                description: data.description || '',
                pages: funnel.pages || [],
                theme: (data.settings as any)?.theme,
                isPublished: data.is_published || false,
                version: data.version || 1,
                config: (data.settings as any)?.config || {},
                createdAt: data.created_at ? new Date(data.created_at) : new Date(),
                lastModified: data.updated_at ? new Date(data.updated_at) : new Date(),
                user_id: data.user_id || '',
                context: this.context,
            };
        } catch (error) {
            console.error(`❌ Erro ao salvar funil no contexto ${this.context}:`, error);
            throw error;
        }
    }

    /**
     * Carrega um funil do contexto específico
     */
    async loadFunnel(id: string): Promise<ContextualFunnelData | null> {
        try {
            // ✅ Validar contexto
            if (!validateContextualId(id, this.context)) {
                console.warn(`⚠️ Tentativa de carregar funil ${id} no contexto ${this.context}`);
                return null;
            }

            const {
                data: { user },
            } = await supabase.auth.getUser();
            if (!user) throw new Error('Usuário não autenticado');

            // ✅ Primeiro tentar localStorage contextual
            const localData = this.loadFromContextualLocalStorage(id);
            if (localData) {
                console.log(`💾 Funil carregado do localStorage contextual: ${id}`);
                return localData;
            }

            // ✅ Fallback para Supabase
            const { data: funnel, error } = await supabase
                .from('funnels')
                .select('*')
                .eq('id', id)
                .eq('user_id', user.id)
                .single();

            if (error) throw error;
            if (!funnel) return null;

            // ✅ Verificar contexto nos settings
            const settings = (funnel.settings as any) || {};
            if (settings.context && settings.context !== this.context) {
                console.warn(`⚠️ Funil ${id} pertence ao contexto ${settings.context}, não ${this.context}`);
                return null;
            }

            // ✅ Buscar páginas
            const { data: pages } = await supabase
                .from('funnel_pages')
                .select('*')
                .eq('funnel_id', id)
                .order('page_order');

            const funnelData: ContextualFunnelData = {
                id: funnel.id,
                name: funnel.name,
                description: funnel.description || '',
                pages: pages || [],
                theme: settings.theme || 'default',
                isPublished: funnel.is_published || false,
                version: funnel.version || 1,
                config: settings.config || {},
                createdAt: funnel.created_at ? new Date(funnel.created_at) : new Date(),
                lastModified: funnel.updated_at ? new Date(funnel.updated_at) : new Date(),
                user_id: funnel.user_id || '',
                context: this.context,
            };

            // ✅ Salvar no localStorage contextual para próximas carregadas
            this.saveToContextualLocalStorage(id, funnelData);

            return funnelData;
        } catch (error) {
            console.error(`❌ Erro ao carregar funil no contexto ${this.context}:`, error);
            return null;
        }
    }

    /**
     * Lista funis do contexto específico
     */
    async listFunnels(): Promise<ContextualFunnelData[]> {
        try {
            const {
                data: { user },
            } = await supabase.auth.getUser();
            if (!user) throw new Error('Usuário não autenticado');

            // ✅ Sintaxe correta v2.x: .from() seguido de .select() 
            const { data: funnels, error } = await supabase
                .from('funnels')
                .select('*')
                .eq('user_id', user.id)
                .order('updated_at', { ascending: false });

            if (error) throw error;

            // ✅ Validação robusta de dados
            const validatedFunnels = Array.isArray(funnels) ? funnels : [];
            console.log(`[ContextualFunnelService] Encontrados ${validatedFunnels.length} funis para contexto ${this.context}`);

            // ✅ Filtrar apenas funis do contexto atual
            const contextualFunnels = validatedFunnels.filter(funnel => {
                const settings = (funnel.settings as any) || {};
                return settings.context === this.context ||
                    (validateContextualId(funnel.id, this.context));
            });

            return contextualFunnels.map(funnel => {
                const settings = (funnel.settings as any) || {};
                return {
                    id: funnel.id,
                    name: funnel.name,
                    description: funnel.description || '',
                    pages: [],
                    theme: settings.theme || 'default',
                    isPublished: funnel.is_published || false,
                    version: funnel.version || 1,
                    config: settings.config || {},
                    createdAt: funnel.created_at ? new Date(funnel.created_at) : new Date(),
                    lastModified: funnel.updated_at ? new Date(funnel.updated_at) : new Date(),
                    user_id: funnel.user_id || '',
                    context: this.context,
                };
            });
        } catch (error) {
            console.error(`❌ Erro ao listar funis no contexto ${this.context}:`, error);
            return [];
        }
    }

    /**
     * Remove um funil do contexto específico
     */
    async deleteFunnel(id: string): Promise<boolean> {
        try {
            // ✅ Validar contexto
            if (!validateContextualId(id, this.context)) {
                throw new Error(`Funil ${id} não pertence ao contexto ${this.context}`);
            }

            const {
                data: { user },
            } = await supabase.auth.getUser();
            if (!user) throw new Error('Usuário não autenticado');

            // ✅ Remover páginas primeiro
            await supabase.from('funnel_pages').delete().eq('funnel_id', id);

            // ✅ Remover funil
            const { error } = await supabase
                .from('funnels')
                .delete()
                .eq('id', id)
                .eq('user_id', user.id);

            if (error) throw error;

            // ✅ Remover do localStorage contextual
            this.removeFromContextualLocalStorage(id);

            console.log(`✅ Funil ${id} removido do contexto ${this.context}`);
            return true;
        } catch (error) {
            console.error(`❌ Erro ao deletar funil no contexto ${this.context}:`, error);
            return false;
        }
    }

    // ============================================================================
    // MÉTODOS PRIVADOS - LOCALSTORAGE CONTEXTUAL
    // ============================================================================

    private saveToContextualLocalStorage(id: string, data: ContextualFunnelData): void {
        try {
            const key = generateContextualStorageKey(this.context, 'funnel', id);
            localStorage.setItem(key, JSON.stringify(data));

            // ✅ Atualizar lista contextual
            this.updateContextualFunnelsList(data);
        } catch (error) {
            console.warn(`⚠️ Erro ao salvar no localStorage contextual:`, error);
        }
    }

    private loadFromContextualLocalStorage(id: string): ContextualFunnelData | null {
        try {
            const key = generateContextualStorageKey(this.context, 'funnel', id);
            const data = localStorage.getItem(key);

            if (data) {
                const parsed = JSON.parse(data) as ContextualFunnelData;
                // ✅ Validar contexto
                if (parsed.context === this.context) {
                    return parsed;
                }
            }
            return null;
        } catch (error) {
            console.warn(`⚠️ Erro ao carregar do localStorage contextual:`, error);
            return null;
        }
    }

    private removeFromContextualLocalStorage(id: string): void {
        try {
            const key = generateContextualStorageKey(this.context, 'funnel', id);
            localStorage.removeItem(key);

            // ✅ Atualizar lista contextual
            this.removeFromContextualFunnelsList(id);
        } catch (error) {
            console.warn(`⚠️ Erro ao remover do localStorage contextual:`, error);
        }
    }

    private updateContextualFunnelsList(funnel: ContextualFunnelData): void {
        try {
            const listKey = generateContextualStorageKey(this.context, 'funnels-list');
            const existingList = JSON.parse(localStorage.getItem(listKey) || '[]') as ContextualFunnelData[];

            const index = existingList.findIndex(f => f.id === funnel.id);
            if (index >= 0) {
                existingList[index] = funnel;
            } else {
                existingList.push(funnel);
            }

            localStorage.setItem(listKey, JSON.stringify(existingList));
        } catch (error) {
            console.warn(`⚠️ Erro ao atualizar lista contextual:`, error);
        }
    }

    private removeFromContextualFunnelsList(id: string): void {
        try {
            const listKey = generateContextualStorageKey(this.context, 'funnels-list');
            const existingList = JSON.parse(localStorage.getItem(listKey) || '[]') as ContextualFunnelData[];

            const filtered = existingList.filter(f => f.id !== id);
            localStorage.setItem(listKey, JSON.stringify(filtered));
        } catch (error) {
            console.warn(`⚠️ Erro ao remover da lista contextual:`, error);
        }
    }

    private async savePages(funnelId: string, pages: any[]): Promise<void> {
        try {
            // ✅ Remover páginas existentes
            await supabase.from('funnel_pages').delete().eq('funnel_id', funnelId);

            // ✅ Inserir novas páginas com validação
            if (pages.length > 0) {
                // ✅ Validação robusta antes de usar .map()
                const validatedPages = Array.isArray(pages) ? pages : [];
                
                const pagesData = validatedPages.map((page, index) => ({
                    id: page.id || generateId(),
                    funnel_id: funnelId,
                    page_type: page.pageType || 'step',
                    page_order: page.pageOrder || index + 1,
                    title: page.title || 'Untitled',
                    blocks: page.blocks || [],
                    metadata: page.metadata || {},
                }));

                const { error } = await supabase.from('funnel_pages').insert(pagesData);
                if (error) throw error;
            }
        } catch (error) {
            console.error('❌ Erro ao salvar páginas:', error);
            throw error;
        }
    }
}

// ============================================================================
// FACTORY PARA CRIAR SERVICES CONTEXTUAIS
// ============================================================================

/**
 * Factory para criar instances contextuais do service
 */
export const createContextualFunnelService = (context: FunnelContext): ContextualFunnelService => {
    return new ContextualFunnelService(context);
};

// ============================================================================
// INSTANCES PRÉ-CONFIGURADAS
// ============================================================================

/** Service para contexto do Editor */
export const editorFunnelService = createContextualFunnelService(FunnelContext.EDITOR);

/** Service para contexto de Templates */
export const templatesFunnelService = createContextualFunnelService(FunnelContext.TEMPLATES);

/** Service para contexto de Meus Funis */
export const myFunnelsFunnelService = createContextualFunnelService(FunnelContext.MY_FUNNELS);

/** Service para contexto de Preview */
export const previewFunnelService = createContextualFunnelService(FunnelContext.PREVIEW);

/** Service para contexto de Desenvolvimento */
export const devFunnelService = createContextualFunnelService(FunnelContext.DEV);

// Re-export types for backward compatibility
export type { AutoSaveState, FunnelVersion };
