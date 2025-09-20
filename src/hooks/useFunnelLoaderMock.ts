/**
 * 🧪 HOOK DE TESTE: useFunnelLoader Mock
 * 
 * Mock simples para testar a integração sem dependências externas
 */

export const useFunnelLoaderMock = (funnelId?: string, options?: any) => {
    // Simular estados de carregamento
    const isLoading = false;
    const isError = false;
    
    // Dados mock baseados no funnelId
    const funnel = funnelId && funnelId !== 'quiz-style-21-steps' ? {
        id: funnelId,
        name: `Funil Personalizado: ${funnelId}`,
        pages: [
            {
                title: 'Etapa 1 Personalizada',
                blocks: [
                    {
                        id: `${funnelId}-block-1`,
                        type: 'headline',
                        content: { title: `Bem-vindo ao ${funnelId}` },
                        properties: { fontSize: 'text-3xl', textAlign: 'center' },
                        order: 0
                    },
                    {
                        id: `${funnelId}-block-2`, 
                        type: 'text',
                        content: { text: `Este é um funil personalizado com ID: ${funnelId}` },
                        properties: { fontSize: 'text-base', textAlign: 'center' },
                        order: 1
                    }
                ]
            },
            {
                title: 'Etapa 2 Personalizada',
                blocks: [
                    {
                        id: `${funnelId}-block-3`,
                        type: 'quiz-question',
                        content: { question: `Qual é sua preferência no ${funnelId}?` },
                        properties: {},
                        order: 0
                    }
                ]
            }
        ]
    } : null;

    console.log('🧪 useFunnelLoaderMock:', { funnelId, hasFunnel: !!funnel });

    return {
        funnel,
        isLoading,
        isError,
        isReady: !isLoading && !isError && !!funnel
    };
};