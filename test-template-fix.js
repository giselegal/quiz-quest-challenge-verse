/**
 * 🧪 TESTE: Verificação da correção dos erros de Template
 * 
 * Este teste verifica se a correção do UnifiedTemplateService
 * eliminou os 7 erros de fetch de templates.
 */

// Importar o UnifiedTemplateService corrigido
import { unifiedTemplateService } from '../src/services/UnifiedTemplateService';

const testTemplateLoading = async () => {
    console.log('🧪 INICIANDO TESTE DA CORREÇÃO...');

    const templatesParaTestar = [
        'step-1', 'step-2', 'step-12', 'step-20', 'step-21',
        'quiz21StepsComplete', 'quiz-style-express'
    ];

    let errorsCount = 0;
    let successCount = 0;

    console.log('🎯 Testando carregamento dos templates críticos...');

    for (const templateId of templatesParaTestar) {
        try {
            const startTime = performance.now();
            const template = await unifiedTemplateService.getTemplate(templateId);
            const endTime = performance.now();

            if (template && Object.keys(template).length > 0) {
                successCount++;
                console.log(`✅ ${templateId}: Carregado com sucesso em ${(endTime - startTime).toFixed(2)}ms`);
                console.log(`   - Tipo: ${template.id ? 'Estático' : 'Fallback'}`);
                console.log(`   - Blocos: ${template.blocks ? template.blocks.length : 'N/A'}`);
            } else {
                errorsCount++;
                console.log(`❌ ${templateId}: Template vazio ou inválido`);
            }
        } catch (error) {
            errorsCount++;
            console.error(`❌ ${templateId}: Erro no carregamento:`, error.message);
        }
    }

    console.log('\n📊 RESULTADO DO TESTE:');
    console.log(`✅ Sucessos: ${successCount}/${templatesParaTestar.length}`);
    console.log(`❌ Erros: ${errorsCount}/${templatesParaTestar.length}`);
    console.log(`📈 Taxa de sucesso: ${(successCount / templatesParaTestar.length * 100).toFixed(1)}%`);

    if (errorsCount === 0) {
        console.log('🎉 CORREÇÃO BEM-SUCEDIDA! Todos os templates carregaram sem erro.');
    } else {
        console.log('⚠️  Ainda há erros no carregamento dos templates.');
    }

    return { successCount, errorsCount };
};

// Executar o teste
testTemplateLoading().catch(console.error);

// Também testar o preload
const testPreload = async () => {
    console.log('\n🚀 Testando preload de templates...');
    const startTime = performance.now();

    try {
        await unifiedTemplateService.preloadCriticalTemplates();
        const endTime = performance.now();
        console.log(`✅ Preload concluído em ${(endTime - startTime).toFixed(2)}ms`);
    } catch (error) {
        console.error('❌ Erro no preload:', error);
    }
};

setTimeout(() => {
    testPreload().catch(console.error);
}, 1000);