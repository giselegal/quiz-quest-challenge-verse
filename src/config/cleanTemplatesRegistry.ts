/**
 * 🗂️ CLEAN UNIFIED TEMPLATES REGISTRY
 * 
 * Registry limpo sem duplicações - apenas templates funcionais
 * Foco no template principal quiz21StepsComplete
 */

export interface UnifiedTemplate {
    id: string;
    name: string;
    description: string;
    category: string;
    theme: string;
    stepCount: number;
    isOfficial: boolean;
    usageCount: number;
    tags: string[];
    features: string[];
    conversionRate: string;
    image: string;
    createdAt: string;
    updatedAt: string;
    isFunctional: boolean; // Flag para indicar se está totalmente funcional
    hasConverter: boolean; // Flag para indicar se tem conversor implementado
}

/**
 * Registry oficial de templates - VERSÃO LIMPA
 * ✅ Sem duplicações
 * ✅ Apenas templates testados e funcionais
 * ✅ Template principal priorizado
 */
export const CLEAN_TEMPLATE_REGISTRY: Record<string, UnifiedTemplate> = {
    // 🎯 TEMPLATE PRINCIPAL - PRIORIDADE ALTA
    'quiz21StepsComplete': {
        id: 'quiz21StepsComplete',
        name: 'Quiz de Estilo Pessoal - 21 Etapas Completo',
        description: 'Template principal completo para descoberta do estilo pessoal com 21 etapas, incluindo coleta de dados, quiz pontuado, questões estratégicas e ofertas',
        category: 'quiz-complete',
        theme: 'fashion-premium',
        stepCount: 21,
        isOfficial: true,
        usageCount: 2150,
        tags: ['principal', 'estilo', 'completo', '21-etapas', 'premium', 'funcional'],
        features: [
            '✅ Template Principal',
            '✅ Quiz Pontuado Completo',
            '✅ Questões Estratégicas',
            '✅ Resultado + Oferta Premium',
            '✅ Conversor Implementado',
            '✅ Editor Compatível',
        ],
        conversionRate: '94%',
        image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
        createdAt: '2024-12-01T00:00:00.000Z',
        updatedAt: '2025-09-12T15:00:00.000Z',
        isFunctional: true,
        hasConverter: true
    },

    // 🏗️ TEMPLATE BÁSICO - PARA TESTES E DESENVOLVIMENTO
    'simple-quiz-template': {
        id: 'simple-quiz-template',
        name: 'Quiz Simples - 5 Etapas',
        description: 'Template básico com 5 etapas para testes e desenvolvimento',
        category: 'quiz-basic',
        theme: 'minimal-clean',
        stepCount: 5,
        isOfficial: true,
        usageCount: 145,
        tags: ['básico', 'teste', 'desenvolvimento', 'simples'],
        features: [
            'Template Simples',
            'Ideal para Testes',
            'Estrutura Básica',
            'Compatível com Editor',
        ],
        conversionRate: '72%',
        image: 'https://via.placeholder.com/400x300/e0e0e0/666666?text=Quiz+Simples',
        createdAt: '2025-09-12T15:00:00.000Z',
        updatedAt: '2025-09-12T15:00:00.000Z',
        isFunctional: true,
        hasConverter: false
    },

    // 📝 TEMPLATE LEAD MAGNET - FUNCIONAL
    'lead-magnet-style': {
        id: 'lead-magnet-style',
        name: 'Ímã de Leads - Estilo Pessoal',
        description: 'Template focado em captura de leads com descobre de estilo rápida (3 etapas)',
        category: 'lead-magnet',
        theme: 'conversion-focused',
        stepCount: 3,
        isOfficial: true,
        usageCount: 893,
        tags: ['lead-magnet', 'conversão', 'rápido', 'estilo'],
        features: [
            'Captura Otimizada',
            'Conversão Alta',
            'Processo Rápido',
            'Mobile First',
        ],
        conversionRate: '89%',
        image: 'https://via.placeholder.com/400x300/4f46e5/ffffff?text=Lead+Magnet',
        createdAt: '2025-09-12T15:00:00.000Z',
        updatedAt: '2025-09-12T15:00:00.000Z',
        isFunctional: true,
        hasConverter: false
    }
};

/**
 * Função para obter apenas templates funcionais
 */
export function getFunctionalTemplates(): UnifiedTemplate[] {
    return Object.values(CLEAN_TEMPLATE_REGISTRY).filter(template => template.isFunctional);
}

/**
 * Função para obter templates com conversor implementado
 */
export function getTemplatesWithConverter(): UnifiedTemplate[] {
    return Object.values(CLEAN_TEMPLATE_REGISTRY).filter(template => template.hasConverter);
}

/**
 * Função para obter template principal (quiz21StepsComplete)
 */
export function getPrimaryTemplate(): UnifiedTemplate {
    return CLEAN_TEMPLATE_REGISTRY['quiz21StepsComplete'];
}

/**
 * Estatísticas dos templates limpos
 */
export function getCleanTemplateStats() {
    const templates = Object.values(CLEAN_TEMPLATE_REGISTRY);
    return {
        total: templates.length,
        functional: templates.filter(t => t.isFunctional).length,
        withConverter: templates.filter(t => t.hasConverter).length,
        categories: [...new Set(templates.map(t => t.category))],
        totalUsage: templates.reduce((sum, t) => sum + t.usageCount, 0)
    };
}

// Exportar como padrão também
export default CLEAN_TEMPLATE_REGISTRY;