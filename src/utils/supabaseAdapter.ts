/**
 * 🔧 ADAPTADOR SUPABASE V2.55.0
 * 
 * Funções que encapsulam as chamadas do Supabase com a sintaxe correta
 * e validação robusta de dados para evitar erros comuns.
 */

import { supabase } from '../config/supabaseConfig';
import { 
    validateSupabaseArray, 
    validateSupabaseResponse,
    ensureArray,
    logValidationError,
    debugDataStructure 
} from './dataValidation';

/**
 * ✅ BUSCAR FUNIS - Sintaxe correta Supabase v2.x
 */
export async function fetchFunis(userId?: string) {
    try {
        let query = supabase
            .from('funis')
            .select('*');
            
        if (userId) {
            query = query.eq('user_id', userId);
        }
        
        // ✅ Sintaxe v2.x: .order() APÓS .eq()
        const response = await query.order('created_at', { ascending: false });
        
        const validation = validateSupabaseArray(response);
        
        if (!validation.isValid) {
            logValidationError('fetchFunis', 'Array de funis', response.data);
            return [];
        }
        
        return validation.data;
        
    } catch (error) {
        console.error('[fetchFunis] Erro:', error);
        return [];
    }
}

/**
 * ✅ CRIAR FUNIL - Sintaxe correta Supabase v2.x
 */
export async function createFunil(funnelData: any) {
    try {
        // ✅ Sintaxe v2.x: .insert() seguido de .select()
        const response = await supabase
            .from('funis')
            .insert([funnelData])
            .select()
            .single();
            
        const validation = validateSupabaseResponse(response);
        
        if (!validation.isValid) {
            console.error('[createFunil] Erro ao criar funil:', validation.error);
            return null;
        }
        
        return validation.data;
        
    } catch (error) {
        console.error('[createFunil] Erro:', error);
        return null;
    }
}

/**
 * ✅ BUSCAR QUIZ POR ID - Sintaxe correta
 */
export async function fetchQuizById(quizId: string) {
    try {
        if (!quizId?.trim()) {
            console.warn('[fetchQuizById] ID inválido:', quizId);
            return null;
        }
        
        const response = await supabase
            .from('quizzes')
            .select('*')
            .eq('id', quizId)
            .single();
            
        const validation = validateSupabaseResponse(response);
        
        if (!validation.isValid) {
            console.warn('[fetchQuizById] Quiz não encontrado:', validation.error);
            return null;
        }
        
        return validation.data;
        
    } catch (error) {
        console.error('[fetchQuizById] Erro:', error);
        return null;
    }
}

/**
 * ✅ BUSCAR PERGUNTAS - Com validação robusta
 */
export async function fetchQuestions(quizId: string) {
    try {
        if (!quizId?.trim()) {
            console.warn('[fetchQuestions] Quiz ID inválido:', quizId);
            return [];
        }
        
        const response = await supabase
            .from('questions')
            .select('*')
            .eq('quiz_id', quizId)
            .order('order_index', { ascending: true });
            
        const validation = validateSupabaseArray(response);
        
        if (!validation.isValid) {
            logValidationError('fetchQuestions', 'Array de perguntas', response.data);
            return [];
        }
        
        // ✅ Dados já validados como array
        return validation.data;
        
    } catch (error) {
        console.error('[fetchQuestions] Erro:', error);
        return [];
    }
}

/**
 * ✅ ATUALIZAR FUNIL - Sintaxe correta
 */
export async function updateFunil(funnelId: string, updates: any) {
    try {
        if (!funnelId?.trim()) {
            console.error('[updateFunil] ID do funil inválido:', funnelId);
            return null;
        }
        
        const response = await supabase
            .from('funis')
            .update(updates)
            .eq('id', funnelId)
            .select()
            .single();
            
        const validation = validateSupabaseResponse(response);
        
        if (!validation.isValid) {
            console.error('[updateFunil] Erro ao atualizar:', validation.error);
            return null;
        }
        
        return validation.data;
        
    } catch (error) {
        console.error('[updateFunil] Erro:', error);
        return null;
    }
}

/**
 * ✅ DELETAR COM VALIDAÇÃO
 */
export async function deleteFunil(funnelId: string) {
    try {
        if (!funnelId?.trim()) {
            console.error('[deleteFunil] ID do funil inválido:', funnelId);
            return false;
        }
        
        const response = await supabase
            .from('funis')
            .delete()
            .eq('id', funnelId);
            
        if (response.error) {
            console.error('[deleteFunil] Erro ao deletar:', response.error);
            return false;
        }
        
        return true;
        
    } catch (error) {
        console.error('[deleteFunil] Erro:', error);
        return false;
    }
}

/**
 * ✅ BUSCAR COM PAGINAÇÃO
 */
export async function fetchFunisWithPagination(
    page: number = 0, 
    limit: number = 10,
    userId?: string
) {
    try {
        let query = supabase
            .from('funis')
            .select('*', { count: 'exact' });
            
        if (userId) {
            query = query.eq('user_id', userId);
        }
        
        const response = await query
            .order('created_at', { ascending: false })
            .range(page * limit, (page + 1) * limit - 1);
            
        // Validar dados
        const validation = validateSupabaseArray(response);
        
        return {
            data: validation.data,
            count: response.count || 0,
            error: validation.error,
            hasMore: validation.data.length === limit
        };
        
    } catch (error) {
        console.error('[fetchFunisWithPagination] Erro:', error);
        return {
            data: [],
            count: 0,
            error: 'Erro ao buscar dados',
            hasMore: false
        };
    }
}

/**
 * 🎯 EXEMPLOS DE USO CORRETO
 */

// ❌ ANTES (problemático):
// const { data } = await supabase.from('funis').select('*').order('created_at');
// return data.map(item => item.id); // ⚠️ data pode ser null

// ✅ DEPOIS (seguro):
// const funis = await fetchFunis();
// return funis.map(item => item.id); // ✅ funis sempre é array

// ❌ ANTES (problemático):
// const { data } = await supabase.from('funis').insert([newFunil]).select();
// return data[0]; // ⚠️ data pode ser null

// ✅ DEPOIS (seguro):
// const newFunil = await createFunil(funnelData);
// return newFunil; // ✅ já validado ou null

/**
 * 🛠️ FUNÇÃO DE MIGRAÇÃO PARA REFATORAR CÓDIGO EXISTENTE
 */
export function migrateSupabaseCall(
    oldCall: string, 
    tableName: string, 
    operation: 'select' | 'insert' | 'update' | 'delete'
) {
    console.group('🔄 Migração Supabase');
    console.log('Código antigo:', oldCall);
    
    let suggestion = '';
    
    switch (operation) {
        case 'select':
            suggestion = `
// ✅ Nova versão:
const data = await fetch${tableName.charAt(0).toUpperCase() + tableName.slice(1)}();
// Dados já validados como array, pode usar .map() com segurança
`;
            break;
            
        case 'insert':
            suggestion = `
// ✅ Nova versão:
const result = await create${tableName.charAt(0).toUpperCase() + tableName.slice(1)}(data);
// result é null em caso de erro, objeto válido em caso de sucesso
`;
            break;
    }
    
    console.log('Sugestão:', suggestion);
    console.groupEnd();
    
    return suggestion;
}