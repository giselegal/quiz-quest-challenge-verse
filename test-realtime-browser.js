/**
 * 🧪 TESTE EM TEMPO REAL: VALIDAÇÃO NO BROWSER
 * 
 * Adicione este script ao console do browser em http://localhost:8080/editor
 * ou carregue via <script> tag para testar o sistema funcionando
 */

(async function testUniversalFunnelSystem() {
    console.log('🧪 === TESTE EM TEMPO REAL: SISTEMA UNIVERSAL DE FUNIS ===\n');

    // Aguardar carregamento completo
    await new Promise(resolve => {
        if (document.readyState === 'complete') {
            resolve();
        } else {
            window.addEventListener('load', resolve);
        }
    });

    const results = {
        tests: 0,
        passed: 0,
        failed: 0,
        errors: []
    };

    function logTest(name, passed, details = '') {
        results.tests++;
        if (passed) {
            results.passed++;
            console.log(`✅ ${name}${details ? ` - ${details}` : ''}`);
        } else {
            results.failed++;
            console.log(`❌ ${name}${details ? ` - ${details}` : ''}`);
        }
    }

    try {
        // 🔍 TESTE 1: Verificar se UnifiedTemplateService está disponível
        const unifiedService = window.__UNIFIED_TEMPLATE_SERVICE__ ||
            (window as any).unifiedTemplateService;

        logTest('UnifiedTemplateService disponível', !!unifiedService);

        // 🔍 TESTE 2: Verificar logs do console
        const consoleEntries = [];
        const originalLog = console.log;
        console.log = function (...args) {
            consoleEntries.push(args.join(' '));
            originalLog.apply(console, args);
        };

        // Aguardar alguns logs
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Restaurar console
        console.log = originalLog;

        const hasUnifiedServiceLogs = consoleEntries.some(entry =>
            entry.includes('UnifiedTemplateService') ||
            entry.includes('Template carregado') ||
            entry.includes('Preload concluído')
        );

        logTest('Logs do UnifiedTemplateService presentes', hasUnifiedServiceLogs,
            `${consoleEntries.length} entradas de log capturadas`);

        // 🔍 TESTE 3: Verificar se não há erros críticos no console
        const hasTemplateErrors = consoleEntries.some(entry =>
            entry.includes('Error fetching template: null') ||
            entry.includes('TemplateService.ts:122')
        );

        logTest('Sem erros críticos de template', !hasTemplateErrors);

        // 🔍 TESTE 4: Verificar URL atual e detecção
        const currentUrl = window.location.pathname;
        const isEditorPage = currentUrl.includes('/editor');

        logTest('Executando na página do editor', isEditorPage, currentUrl);

        // 🔍 TESTE 5: Verificar se componentes React estão carregados
        const hasReactRoot = document.querySelector('#root') &&
            document.querySelector('#root').children.length > 0;

        logTest('Aplicação React carregada', hasReactRoot);

        // 🔍 TESTE 6: Verificar se há elementos do editor
        const hasEditorElements = document.querySelector('[class*="editor"]') ||
            document.querySelector('[class*="canvas"]') ||
            document.querySelector('[class*="sidebar"]');

        logTest('Elementos do editor presentes', !!hasEditorElements);

        // 🔍 TESTE 7: Verificar se PureBuilderProvider está funcionando
        const hasPureBuilderLogs = consoleEntries.some(entry =>
            entry.includes('PureBuilderProvider') ||
            entry.includes('Pure Builder') ||
            entry.includes('Builder System')
        );

        logTest('PureBuilderProvider ativo', hasPureBuilderLogs);

        // 🔍 TESTE 8: Verificar se não há 'pure-builder-quiz' hardcodado
        const hasHardcodedTemplate = consoleEntries.some(entry =>
            entry.includes('pure-builder-quiz') &&
            !entry.includes('não encontrado')
        );

        logTest('Template hardcodado removido', !hasHardcodedTemplate);

        // 🔍 TESTE 9: Verificar se sistema está gerando IDs dinâmicos
        const hasDynamicIds = consoleEntries.some(entry =>
            entry.includes('dynamic-funnel') ||
            entry.includes('targetFunnelId') ||
            entry.includes('Usando funnelId fornecido')
        );

        logTest('Sistema de IDs dinâmicos ativo', hasDynamicIds);

        // 🔍 TESTE 10: Testar função global (se disponível)
        if (typeof window.validateUniversalFunnelSystem === 'function') {
            try {
                await window.validateUniversalFunnelSystem();
                logTest('Teste global executado com sucesso', true);
            } catch (error) {
                logTest('Teste global executado com sucesso', false, error.message);
            }
        }

        // 📊 RESULTADOS FINAIS
        console.log('\n🎯 === RELATÓRIO DO TESTE EM TEMPO REAL ===');
        console.log(`📊 Total de testes: ${results.tests}`);
        console.log(`✅ Testes aprovados: ${results.passed}`);
        console.log(`❌ Testes reprovados: ${results.failed}`);
        console.log(`🎯 Taxa de sucesso: ${(results.passed / results.tests * 100).toFixed(1)}%`);

        const successRate = results.passed / results.tests;

        if (successRate >= 0.9) {
            console.log('\n🎉 SISTEMA FUNCIONANDO PERFEITAMENTE!');
            console.log('✅ O sistema universal de funis está operacional');
        } else if (successRate >= 0.7) {
            console.log('\n⚠️ SISTEMA FUNCIONAL COM RESSALVAS');
            console.log('🔧 Algumas melhorias podem ser necessárias');
        } else {
            console.log('\n❌ SISTEMA PRECISA DE ATENÇÃO');
            console.log('🔨 Várias questões foram identificadas');
        }

        // 🔍 TESTE ADICIONAL: Tentar carregar template via console
        console.log('\n🧪 Teste adicional disponível:');
        console.log('Execute: testTemplate("meu-template-customizado") para testar carregamento');

        window.testTemplate = async function (templateId) {
            console.log(`🔍 Testando carregamento de: ${templateId}`);

            // Tentar diferentes métodos de acesso
            const methods = [
                () => window.__UNIFIED_TEMPLATE_SERVICE__?.getTemplate(templateId),
                () => window.unifiedTemplateService?.getTemplate(templateId),
                () => fetch(`/api/templates/${templateId}`).then(r => r.json())
            ];

            for (let i = 0; i < methods.length; i++) {
                try {
                    const result = await methods[i]();
                    if (result) {
                        console.log(`✅ Método ${i + 1} funcionou:`, result);
                        return result;
                    }
                } catch (error) {
                    console.log(`❌ Método ${i + 1} falhou:`, error.message);
                }
            }

            console.log('⚠️ Nenhum método de carregamento funcionou');
            return null;
        };

        return {
            success: successRate >= 0.8,
            results: results,
            logs: consoleEntries
        };

    } catch (error) {
        console.error('❌ Erro durante teste em tempo real:', error);
        return {
            success: false,
            error: error.message
        };
    }
})();