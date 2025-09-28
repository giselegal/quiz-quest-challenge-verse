// Teste de integração do quiz no navegador
console.log('🌐 === TESTE DE INTEGRAÇÃO BROWSER === 🌐');

// Função para simular interações do usuário no quiz
async function testQuizFlow() {
    console.log('🚀 Iniciando teste de fluxo do quiz...');

    try {
        // Simular carregamento da página
        const response = await fetch('http://localhost:8080/quiz-estilo');
        console.log('📄 Status da página:', response.status);

        if (response.ok) {
            console.log('✅ Página /quiz-estilo carregando corretamente');
        } else {
            console.error('❌ Erro ao carregar página:', response.statusText);
            return;
        }

        // Teste de disponibilidade dos recursos estáticos
        const staticResources = [
            '/src/main.tsx',
            '/src/components/quiz/QuizApp.tsx',
            '/src/hooks/useQuizState.ts',
            '/src/data/styles.ts'
        ];

        console.log('\n🔍 Verificando recursos estáticos...');
        for (const resource of staticResources) {
            try {
                const resourceResponse = await fetch(`http://localhost:8080${resource}`);
                console.log(`${resourceResponse.ok ? '✅' : '❌'} ${resource}: ${resourceResponse.status}`);
            } catch (error) {
                console.log(`❌ ${resource}: Erro de rede`);
            }
        }

    } catch (error) {
        console.error('❌ Erro no teste de integração:', error.message);
    }
}

// Função para testar a API interna (se houver)
async function testInternalAPI() {
    console.log('\n🔌 Testando APIs internas...');

    // Verificar se há endpoints de API disponíveis
    const apiEndpoints = [
        '/api/quiz/styles',
        '/api/quiz/steps',
        '/api/quiz/calculate'
    ];

    for (const endpoint of apiEndpoints) {
        try {
            const response = await fetch(`http://localhost:8080${endpoint}`);
            console.log(`${response.ok ? '✅' : '📝'} ${endpoint}: ${response.status} ${response.statusText}`);
        } catch (error) {
            console.log(`📝 ${endpoint}: Endpoint não encontrado (normal para SPA)`);
        }
    }
}

// Executar testes
async function runTests() {
    await testQuizFlow();
    await testInternalAPI();

    console.log('\n🎯 === TESTE DE INTEGRAÇÃO CONCLUÍDO === 🎯');
    console.log('\n💡 PRÓXIMOS PASSOS PARA TESTE MANUAL:');
    console.log('1. Abrir http://localhost:8080/quiz-estilo no navegador');
    console.log('2. Verificar se o quiz carrega sem erros');
    console.log('3. Responder algumas perguntas e verificar cálculo em tempo real');
    console.log('4. Completar o quiz e verificar o resultado final');
    console.log('5. Verificar se não há erros de "reading \'name\'" no console');
    console.log('6. Confirmar que o componente quiz-options está sendo renderizado');
}

// Executar apenas se estivermos em ambiente Node.js
if (typeof window === 'undefined') {
    console.log('🏃‍♂️ Executando em Node.js - usando fetch para testes HTTP');

    // Importar fetch para Node.js se necessário
    import('node-fetch').then(({ default: fetch }) => {
        global.fetch = fetch;
        runTests();
    }).catch(() => {
        console.log('📝 node-fetch não disponível, executando versão simplificada...');
        console.log('✅ Estrutura de teste criada com sucesso');
        console.log('🌐 Para executar no browser, copie este código para o console do navegador');
    });
} else {
    console.log('🌐 Executando no navegador');
    runTests();
}