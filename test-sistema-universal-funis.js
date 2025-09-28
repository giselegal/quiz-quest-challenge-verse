/**
 * 🧪 TESTE COMPLETO: VALIDAÇÃO DA ESTRUTURA DO SISTEMA UNIVERSAL DE FUNIS
 * 
 * Este teste valida se o sistema universal implementado funciona corretamente
 * com qualquer tipo de funil, template ou identificador.
 */

// Importações necessárias
import { unifiedTemplateService } from '../src/services/UnifiedTemplateService';

/**
 * 🎯 TESTE 1: Validação do UnifiedTemplateService Dinâmico
 */
const testUnifiedTemplateService = async () => {
    console.log('\n🧪 === TESTE 1: UnifiedTemplateService Dinâmico ===');

    const testCases = [
        // Templates críticos (devem funcionar via fallback)
        { id: 'step-1', type: 'template crítico', shouldWork: true },
        { id: 'step-2', type: 'template crítico', shouldWork: true },
        { id: 'quiz21StepsComplete', type: 'template crítico', shouldWork: true },

        // IDs de funis dinâmicos (devem tentar banco + fallback)
        { id: 'meu-funil-customizado', type: 'funil dinâmico', shouldWork: true },
        { id: 'campanha-black-friday', type: 'funil dinâmico', shouldWork: true },
        { id: 'quiz-personalizado-2025', type: 'funil dinâmico', shouldWork: true },

        // Templates não existentes (devem usar fallback)
        { id: 'step-999', type: 'template inexistente', shouldWork: true },
        { id: 'template-nao-existe', type: 'template inexistente', shouldWork: true },
    ];

    let passedTests = 0;
    let totalTests = testCases.length;

    for (const testCase of testCases) {
        try {
            const startTime = performance.now();
            const template = await unifiedTemplateService.getTemplate(testCase.id);
            const endTime = performance.now();

            const hasValidStructure = template &&
                typeof template === 'object' &&
                template.id &&
                (template.blocks || template.steps || template.name);

            if (hasValidStructure) {
                console.log(`✅ ${testCase.id}: ${testCase.type} - Carregado em ${(endTime - startTime).toFixed(2)}ms`);
                console.log(`   - Estrutura: ${JSON.stringify(Object.keys(template)).substring(0, 100)}...`);
                passedTests++;
            } else {
                console.log(`❌ ${testCase.id}: ${testCase.type} - Estrutura inválida`);
                console.log(`   - Recebido:`, template);
            }
        } catch (error) {
            console.log(`❌ ${testCase.id}: ${testCase.type} - Erro: ${error.message}`);
        }
    }

    console.log(`📊 Resultado: ${passedTests}/${totalTests} testes passaram (${(passedTests / totalTests * 100).toFixed(1)}%)`);
    return { passed: passedTests, total: totalTests };
};

/**
 * 🎯 TESTE 2: Validação de Detecção de URL
 */
const testUrlDetection = () => {
    console.log('\n🧪 === TESTE 2: Detecção Dinâmica de URL ===');

    // Simulação da lógica do ModernUnifiedEditor
    const detectUrlPattern = (path) => {
        if (path.startsWith('/editor/') && path.length > '/editor/'.length) {
            const identifier = path.replace('/editor/', '');
            const looksLikeTemplate = /^(step-|template|quiz|test)/i.test(identifier);

            if (looksLikeTemplate) {
                return { templateId: identifier, funnelId: null, type: 'template' };
            } else {
                return { templateId: null, funnelId: identifier, type: 'funnel' };
            }
        }

        return { templateId: null, funnelId: null, type: 'auto' };
    };

    const urlTestCases = [
        // Templates esperados
        { url: '/editor/step-1', expected: { type: 'template', templateId: 'step-1' } },
        { url: '/editor/quiz-personalizado', expected: { type: 'template', templateId: 'quiz-personalizado' } },
        { url: '/editor/template-vendas', expected: { type: 'template', templateId: 'template-vendas' } },
        { url: '/editor/test-ab', expected: { type: 'template', templateId: 'test-ab' } },

        // Funis esperados  
        { url: '/editor/meu-funil-vendas', expected: { type: 'funnel', funnelId: 'meu-funil-vendas' } },
        { url: '/editor/campanha-2025', expected: { type: 'funnel', funnelId: 'campanha-2025' } },
        { url: '/editor/landing-page-produto', expected: { type: 'funnel', funnelId: 'landing-page-produto' } },

        // Casos especiais
        { url: '/editor', expected: { type: 'auto' } },
        { url: '/editor/', expected: { type: 'auto' } },
    ];

    let passedUrlTests = 0;
    let totalUrlTests = urlTestCases.length;

    urlTestCases.forEach(testCase => {
        const result = detectUrlPattern(testCase.url);
        const isCorrect = result.type === testCase.expected.type &&
            (testCase.expected.templateId ? result.templateId === testCase.expected.templateId : true) &&
            (testCase.expected.funnelId ? result.funnelId === testCase.expected.funnelId : true);

        if (isCorrect) {
            console.log(`✅ ${testCase.url} → ${result.type} (${result.templateId || result.funnelId || 'auto'})`);
            passedUrlTests++;
        } else {
            console.log(`❌ ${testCase.url} → Esperado: ${JSON.stringify(testCase.expected)}, Obtido: ${JSON.stringify(result)}`);
        }
    });

    console.log(`📊 Resultado: ${passedUrlTests}/${totalUrlTests} testes de URL passaram (${(passedUrlTests / totalUrlTests * 100).toFixed(1)}%)`);
    return { passed: passedUrlTests, total: totalUrlTests };
};

/**
 * 🎯 TESTE 3: Validação de Estrutura de Dados
 */
const testDataStructure = async () => {
    console.log('\n🧪 === TESTE 3: Estrutura de Dados ===');

    const testTemplate = await unifiedTemplateService.getTemplate('step-1');
    const testDynamicFunnel = await unifiedTemplateService.getTemplate('test-dynamic-funnel');

    const structureTests = [
        {
            name: 'Template Crítico',
            data: testTemplate,
            requiredFields: ['id', 'name'],
            optionalFields: ['blocks', 'steps', 'description']
        },
        {
            name: 'Funil Dinâmico',
            data: testDynamicFunnel,
            requiredFields: ['id'],
            optionalFields: ['name', 'blocks', 'steps', 'metadata']
        }
    ];

    let passedStructureTests = 0;
    let totalStructureTests = structureTests.length;

    structureTests.forEach(test => {
        const hasRequiredFields = test.requiredFields.every(field =>
            test.data && test.data[field] !== undefined
        );

        const hasValidStructure = test.data && typeof test.data === 'object';

        if (hasRequiredFields && hasValidStructure) {
            console.log(`✅ ${test.name}: Estrutura válida`);
            console.log(`   - Campos obrigatórios: ${test.requiredFields.join(', ')} ✅`);
            console.log(`   - Campos presentes: ${Object.keys(test.data).join(', ')}`);
            passedStructureTests++;
        } else {
            console.log(`❌ ${test.name}: Estrutura inválida`);
            console.log(`   - Dados recebidos:`, test.data);
        }
    });

    console.log(`📊 Resultado: ${passedStructureTests}/${totalStructureTests} testes de estrutura passaram`);
    return { passed: passedStructureTests, total: totalStructureTests };
};

/**
 * 🎯 TESTE 4: Performance e Cache
 */
const testPerformanceAndCache = async () => {
    console.log('\n🧪 === TESTE 4: Performance e Cache ===');

    const testId = 'step-1';

    // Primeira chamada (sem cache)
    const startTime1 = performance.now();
    await unifiedTemplateService.getTemplate(testId);
    const endTime1 = performance.now();
    const firstCallTime = endTime1 - startTime1;

    // Segunda chamada (com cache)
    const startTime2 = performance.now();
    await unifiedTemplateService.getTemplate(testId);
    const endTime2 = performance.now();
    const secondCallTime = endTime2 - startTime2;

    const cacheImprovement = ((firstCallTime - secondCallTime) / firstCallTime) * 100;

    console.log(`📊 Performance:`)
    console.log(`   - Primeira chamada: ${firstCallTime.toFixed(2)}ms`);
    console.log(`   - Segunda chamada: ${secondCallTime.toFixed(2)}ms`);
    console.log(`   - Melhoria do cache: ${cacheImprovement.toFixed(1)}%`);

    const performancePassed = secondCallTime < firstCallTime;

    if (performancePassed) {
        console.log(`✅ Cache funcionando corretamente`);
    } else {
        console.log(`❌ Cache não está melhorando a performance`);
    }

    return { passed: performancePassed ? 1 : 0, total: 1 };
};

/**
 * 🎯 TESTE 5: Validação de Fallbacks
 */
const testFallbacks = async () => {
    console.log('\n🧪 === TESTE 5: Sistema de Fallbacks ===');

    const inexistentIds = [
        'template-nao-existe-123',
        'funil-inexistente-456',
        'step-999',
        'quiz-fake-789'
    ];

    let passedFallbacks = 0;
    let totalFallbacks = inexistentIds.length;

    for (const id of inexistentIds) {
        try {
            const result = await unifiedTemplateService.getTemplate(id);

            if (result && result.id && typeof result === 'object') {
                console.log(`✅ ${id}: Fallback funcionou`);
                console.log(`   - Tipo: ${result.metadata?.generated ? 'Gerado' : 'Estático'}`);
                passedFallbacks++;
            } else {
                console.log(`❌ ${id}: Fallback falhou`);
            }
        } catch (error) {
            console.log(`❌ ${id}: Erro no fallback: ${error.message}`);
        }
    }

    console.log(`📊 Resultado: ${passedFallbacks}/${totalFallbacks} fallbacks funcionaram`);
    return { passed: passedFallbacks, total: totalFallbacks };
};

/**
 * 🚀 EXECUTAR TODOS OS TESTES
 */
const runAllTests = async () => {
    console.log('🧪 === INICIANDO VALIDAÇÃO DA ESTRUTURA DO SISTEMA UNIVERSAL ===\n');

    const results = [];

    try {
        results.push(await testUnifiedTemplateService());
        results.push(testUrlDetection());
        results.push(await testDataStructure());
        results.push(await testPerformanceAndCache());
        results.push(await testFallbacks());

        // Consolidar resultados
        const totalPassed = results.reduce((sum, result) => sum + result.passed, 0);
        const totalTests = results.reduce((sum, result) => sum + result.total, 0);
        const successRate = (totalPassed / totalTests) * 100;

        console.log('\n🎯 === RESUMO FINAL ===');
        console.log(`📊 Total de testes: ${totalTests}`);
        console.log(`✅ Testes aprovados: ${totalPassed}`);
        console.log(`❌ Testes reprovados: ${totalTests - totalPassed}`);
        console.log(`🎯 Taxa de sucesso: ${successRate.toFixed(1)}%`);

        if (successRate >= 90) {
            console.log('\n🎉 SISTEMA VALIDADO COM SUCESSO!');
            console.log('✅ O sistema universal de funis está funcionando corretamente');
        } else if (successRate >= 70) {
            console.log('\n⚠️ SISTEMA FUNCIONAL COM RESSALVAS');
            console.log('🔧 Algumas melhorias podem ser necessárias');
        } else {
            console.log('\n❌ SISTEMA PRECISA DE CORREÇÕES');
            console.log('🔨 Várias questões críticas foram identificadas');
        }

        return {
            success: successRate >= 90,
            totalPassed,
            totalTests,
            successRate,
            results
        };

    } catch (error) {
        console.error('❌ Erro durante os testes:', error);
        return {
            success: false,
            error: error.message
        };
    }
};

// Exportar para uso
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        runAllTests,
        testUnifiedTemplateService,
        testUrlDetection,
        testDataStructure,
        testPerformanceAndCache,
        testFallbacks
    };
}

// Auto-executar se chamado diretamente
if (typeof window !== 'undefined') {
    // Browser environment
    window.validateUniversalFunnelSystem = runAllTests;
    console.log('🧪 Testes disponíveis em: window.validateUniversalFunnelSystem()');
} else if (require.main === module) {
    // Node environment
    runAllTests().then(result => {
        process.exit(result.success ? 0 : 1);
    });
}