// Script de verificação de erros no console do navegador
// Cole este código no console do navegador (F12 -> Console) enquanto estiver em http://localhost:8080/quiz-estilo

console.log('🔍 === VERIFICAÇÃO DE ERROS DO QUIZ === 🔍');

// 1. Verificar se os estilos estão sendo carregados corretamente
console.log('\n📊 1. Testando carregamento dos estilos...');

// Tentar acessar os dados dos estilos
try {
    // Se estivermos no contexto do React, verificar o estado
    if (window.React) {
        console.log('✅ React detectado no contexto');
    }

    // Verificar se não há erros de componente não encontrado
    const blockRendererErrors = [];
    const originalConsoleError = console.error;

    console.error = function (...args) {
        const errorMessage = args.join(' ');
        if (errorMessage.includes('Componente não encontrado') ||
            errorMessage.includes('quiz-options') ||
            errorMessage.includes('reading \'name\'')) {
            blockRendererErrors.push(errorMessage);
        }
        originalConsoleError.apply(console, args);
    };

    // Aguardar um pouco para capturar erros
    setTimeout(() => {
        console.error = originalConsoleError;

        if (blockRendererErrors.length === 0) {
            console.log('✅ Nenhum erro crítico detectado no console');
        } else {
            console.error('❌ Erros críticos ainda presentes:', blockRendererErrors);
        }
    }, 3000);

} catch (error) {
    console.error('❌ Erro ao verificar contexto:', error);
}

// 2. Verificar se o quiz está funcionando
console.log('\n🎮 2. Testando funcionalidade do quiz...');

// Simular interação com o quiz se possível
try {
    // Procurar elementos do quiz na página
    const quizContainer = document.querySelector('[class*="quiz"]');
    const questionElements = document.querySelectorAll('[class*="question"]');
    const optionElements = document.querySelectorAll('[class*="option"]');
    const buttonElements = document.querySelectorAll('button');

    console.log('🔍 Elementos encontrados:');
    console.log(`  - Containers de quiz: ${quizContainer ? 1 : 0}`);
    console.log(`  - Elementos de pergunta: ${questionElements.length}`);
    console.log(`  - Elementos de opção: ${optionElements.length}`);
    console.log(`  - Botões: ${buttonElements.length}`);

    if (quizContainer) {
        console.log('✅ Quiz detectado na página');
    } else {
        console.log('📝 Quiz pode estar carregando ou usar classes diferentes');
    }

} catch (error) {
    console.error('❌ Erro ao analisar elementos da página:', error);
}

// 3. Monitorar erros por mais tempo
console.log('\n⏱️ 3. Monitorando erros por 10 segundos...');

let errorCount = 0;
const startTime = Date.now();

const errorMonitor = setInterval(() => {
    const elapsedTime = Date.now() - startTime;
    if (elapsedTime > 10000) {
        clearInterval(errorMonitor);
        console.log(`\n📋 RELATÓRIO FINAL (após 10s):`);
        console.log(`   - Erros capturados: ${errorCount}`);
        if (errorCount === 0) {
            console.log('🎉 SUCESSO: Quiz funcionando sem erros críticos!');
        } else {
            console.log('⚠️ ATENÇÃO: Ainda há alguns erros - verifique o console');
        }
        console.log('\n🎯 === VERIFICAÇÃO CONCLUÍDA === 🎯');
    }
}, 1000);

// Interceptar erros globais
const originalErrorHandler = window.onerror;
window.onerror = function (msg, url, lineNo, columnNo, error) {
    errorCount++;
    console.log(`🚨 Erro capturado [${errorCount}]: ${msg}`);
    if (originalErrorHandler) {
        return originalErrorHandler(msg, url, lineNo, columnNo, error);
    }
};

console.log('✅ Verificação iniciada - aguarde 10 segundos para o relatório final...');