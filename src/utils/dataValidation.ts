/**
 * 🛡️ UTILITÁRIOS DE VALIDAÇÃO DE DADOS
 * 
 * Funções para validar e sanitizar dados vindos de APIs (Supabase, etc.)
 * para evitar erros como "data.map is not a function".
 */

/**
 * Garante que o valor é um array válido
 */
export function ensureArray<T>(value: unknown): T[] {
    if (Array.isArray(value)) {
        return value as T[];
    }

    // Se é null, undefined ou qualquer outro tipo, retorna array vazio
    return [];
}

/**
 * Valida se data é array antes de usar .map
 * Mais seguro que (data || []).map
 */
export function safeMap<T, R>(
    data: unknown,
    mapFn: (item: T, index: number, array: T[]) => R
): R[] {
    if (!Array.isArray(data)) {
        console.warn('[safeMap] Dados não são array:', typeof data, data);
        return [];
    }

    return data.map(mapFn);
}

/**
 * Valida se data existe e é um objeto válido
 */
export function isValidObject(data: unknown): data is Record<string, any> {
    return data !== null &&
        data !== undefined &&
        typeof data === 'object' &&
        !Array.isArray(data);
}

/**
 * Valida resposta do Supabase
 */
export interface SupabaseResponse<T> {
    data: T | null;
    error: any;
}

export function validateSupabaseResponse<T>(
    response: SupabaseResponse<T>
): { isValid: boolean; data: T | null; error: string | null } {
    // Verifica se houve erro
    if (response.error) {
        return {
            isValid: false,
            data: null,
            error: response.error.message || 'Erro desconhecido do Supabase'
        };
    }

    // Verifica se data existe
    if (response.data === null || response.data === undefined) {
        return {
            isValid: false,
            data: null,
            error: 'Dados não encontrados'
        };
    }

    return {
        isValid: true,
        data: response.data,
        error: null
    };
}

/**
 * Valida array do Supabase especificamente
 */
export function validateSupabaseArray<T>(
    response: SupabaseResponse<T[]>
): { isValid: boolean; data: T[]; error: string | null } {
    const validation = validateSupabaseResponse(response);

    if (!validation.isValid) {
        return {
            isValid: false,
            data: [],
            error: validation.error
        };
    }

    // Garantir que é array
    const arrayData = ensureArray<T>(validation.data);

    return {
        isValid: true,
        data: arrayData,
        error: null
    };
}

/**
 * Helper para log de erros de validação
 */
export function logValidationError(
    context: string,
    expectedType: string,
    actualValue: unknown
): void {
    console.error(`[Validation Error] ${context}:`, {
        expected: expectedType,
        received: typeof actualValue,
        value: actualValue
    });
}

/**
 * Valida e extrai ID de objeto
 */
export function extractId(obj: unknown): string | null {
    if (!isValidObject(obj)) {
        return null;
    }

    const record = obj as Record<string, any>;
    return typeof record.id === 'string' ? record.id : null;
}

/**
 * Valida se string é um ID válido (não vazio, não null)
 */
export function isValidId(id: unknown): id is string {
    return typeof id === 'string' && id.trim().length > 0;
}

/**
 * Sanitiza dados para log (remove informações sensíveis)
 */
export function sanitizeForLog(data: unknown): any {
    if (typeof data !== 'object' || data === null) {
        return data;
    }

    if (Array.isArray(data)) {
        return data.map(item => sanitizeForLog(item));
    }

    const sanitized: Record<string, any> = {};
    const sensitiveKeys = ['password', 'token', 'secret', 'key', 'auth'];

    for (const [key, value] of Object.entries(data as Record<string, any>)) {
        if (sensitiveKeys.some(sensitive => key.toLowerCase().includes(sensitive))) {
            sanitized[key] = '[REDACTED]';
        } else {
            sanitized[key] = typeof value === 'object' ? sanitizeForLog(value) : value;
        }
    }

    return sanitized;
}

/**
 * Helper para debugging - mostra estrutura dos dados
 */
export function debugDataStructure(data: unknown, label = 'Data'): void {
    console.group(`🔍 [DEBUG] ${label}`);
    console.log('Type:', typeof data);
    console.log('Is Array:', Array.isArray(data));
    console.log('Is null:', data === null);
    console.log('Is undefined:', data === undefined);

    if (Array.isArray(data)) {
        console.log('Array length:', data.length);
        console.log('First item type:', data.length > 0 ? typeof data[0] : 'N/A');
    } else if (typeof data === 'object' && data !== null) {
        console.log('Object keys:', Object.keys(data));
    }

    console.log('Sanitized value:', sanitizeForLog(data));
    console.groupEnd();
}

/**
 * Wrapper para operações que podem falhar com dados inválidos
 */
export function safeOperation<T>(
    operation: () => T,
    fallback: T,
    context?: string
): T {
    try {
        return operation();
    } catch (error) {
        if (context) {
            console.error(`[Safe Operation] Error in ${context}:`, error);
        }
        return fallback;
    }
}