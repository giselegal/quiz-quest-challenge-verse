// Teste isolado de import do template
console.log('🔧 Testando imports...');

try {
    import('./src/templates/quiz21StepsComplete.js').then(module => {
        console.log('✅ Template importado com sucesso');
        console.log('📊 Etapas disponíveis:', Object.keys(module.QUIZ_STYLE_21_STEPS_TEMPLATE || {}));
    }).catch(err => {
        console.error('❌ Erro ao importar template:', err);
    });

    import('./src/utils/templateDiagnostic.js').then(() => {
        console.log('✅ Diagnostic importado com sucesso');
    }).catch(err => {
        console.error('❌ Erro ao importar diagnostic:', err);
    });

    import('./src/hooks/useQuizState.js').then(() => {
        console.log('✅ useQuizState importado com sucesso');
    }).catch(err => {
        console.error('❌ Erro ao importar useQuizState:', err);
    });

} catch (err) {
    console.error('❌ Erro geral:', err);
}

console.log('🏁 Teste de imports finalizado');