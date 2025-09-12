/**
 * 🔄 TEMPLATE CONVERTER
 * 
 * Converte templates do formato Record<string, Block[]> 
 * para a estrutura de funil esperada pelo editor
 */

import { QUIZ_STYLE_21_STEPS_TEMPLATE } from '@/templates/quiz21StepsComplete';
import { Block } from '@/types/editor';

export interface FunnelStage {
    id: string;
    name: string;
    blocks: Block[];
}

export interface ConvertedFunnel {
    id: string;
    title: string;
    description?: string;
    stages: FunnelStage[];
}

/**
 * Converte o template quiz21StepsComplete para estrutura de funil
 */
export function convertTemplateToFunnel(templateId: string = 'quiz21StepsComplete'): ConvertedFunnel {
    console.log('🔄 [CONVERTER] Convertendo template:', templateId);

    const stages: FunnelStage[] = Object.entries(QUIZ_STYLE_21_STEPS_TEMPLATE).map(([stepId, blocks]) => {
        const stepNumber = stepId.replace('step-', '');
        const stepName = getStepName(parseInt(stepNumber));

        return {
            id: stepId,
            name: stepName,
            blocks: blocks as Block[]
        };
    });

    const convertedFunnel: ConvertedFunnel = {
        id: templateId,
        title: 'Quiz de Estilo Pessoal - 21 Etapas Completo',
        description: 'Template completo para descoberta do estilo pessoal com 21 etapas, incluindo coleta de dados, quiz pontuado, questões estratégicas e ofertas.',
        stages
    };

    console.log('✅ [CONVERTER] Template convertido:', {
        id: convertedFunnel.id,
        stageCount: convertedFunnel.stages.length,
        totalBlocks: convertedFunnel.stages.reduce((sum, stage) => sum + stage.blocks.length, 0)
    });

    return convertedFunnel;
}

/**
 * Retorna nome descritivo para cada etapa baseado no número
 */
function getStepName(stepNumber: number): string {
    const stepNames: Record<number, string> = {
        1: 'Coleta de Nome',
        2: 'Questão 1 - Estilo Base',
        3: 'Questão 2 - Preferências',
        4: 'Questão 3 - Ocasiões',
        5: 'Questão 4 - Cores',
        6: 'Questão 5 - Texturas',
        7: 'Questão 6 - Silhuetas',
        8: 'Questão 7 - Acessórios',
        9: 'Questão 8 - Inspiração',
        10: 'Questão 9 - Lifestyle',
        11: 'Questão 10 - Personalidade',
        12: 'Transição - Questões Estratégicas',
        13: 'Estratégica 1 - Orçamento',
        14: 'Estratégica 2 - Tempo',
        15: 'Estratégica 3 - Desafios',
        16: 'Estratégica 4 - Objetivos',
        17: 'Estratégica 5 - Motivação',
        18: 'Estratégica 6 - Compromisso',
        19: 'Transição - Resultado',
        20: 'Resultado Personalizado',
        21: 'Oferta Premium'
    };

    return stepNames[stepNumber] || `Etapa ${stepNumber}`;
}

/**
 * Converte qualquer template do formato Record<string, Block[]> para funil
 */
export function convertGenericTemplateToFunnel(
    template: Record<string, Block[]>,
    metadata: {
        id: string;
        title: string;
        description?: string;
    }
): ConvertedFunnel {
    console.log('🔄 [CONVERTER] Convertendo template genérico:', metadata.id);

    const stages: FunnelStage[] = Object.entries(template).map(([stepId, blocks]) => ({
        id: stepId,
        name: `Etapa ${stepId.replace('step-', '')}`,
        blocks: blocks as Block[]
    }));

    return {
        id: metadata.id,
        title: metadata.title,
        description: metadata.description,
        stages
    };
}

/**
 * Valida se um template convertido está correto
 */
export function validateConvertedFunnel(funnel: ConvertedFunnel): boolean {
    if (!funnel.id || !funnel.title || !funnel.stages || funnel.stages.length === 0) {
        console.error('❌ [CONVERTER] Funil inválido:', funnel);
        return false;
    }

    for (const stage of funnel.stages) {
        if (!stage.id || !stage.name || !Array.isArray(stage.blocks)) {
            console.error('❌ [CONVERTER] Etapa inválida:', stage);
            return false;
        }
    }

    console.log('✅ [CONVERTER] Funil validado com sucesso');
    return true;
}

/**
 * Hook para usar template convertido no editor
 */
export function useConvertedTemplate(templateId: string = 'quiz21StepsComplete') {
    const convertedFunnel = convertTemplateToFunnel(templateId);
    const isValid = validateConvertedFunnel(convertedFunnel);

    return {
        funnel: convertedFunnel,
        isValid,
        stageCount: convertedFunnel.stages.length,
        totalBlocks: convertedFunnel.stages.reduce((sum, stage) => sum + stage.blocks.length, 0)
    };
}