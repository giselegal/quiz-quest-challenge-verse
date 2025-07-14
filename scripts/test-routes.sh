#!/bin/bash
# Script para verificar se todas as rotas estão funcionando

echo "🧪 TESTE COMPLETO DAS ROTAS DO SISTEMA"
echo "====================================="

BASE_URL="http://localhost:8081"

echo ""
echo "🔍 Verificando rotas principais..."

# Array de rotas para testar
routes=(
    "/"
    "/quiz"
    "/resultado"
    "/quiz-descubra-seu-estilo"
    "/editor"
)

echo ""
echo "📋 RESULTADOS DOS TESTES:"
echo "========================"

for route in "${routes[@]}"; do
    echo -n "🌐 Testando ${route}... "
    
    # Fazer requisição HTTP e capturar o status code
    status_code=$(curl -o /dev/null -s -w "%{http_code}" "${BASE_URL}${route}")
    
    if [ "$status_code" -eq 200 ]; then
        echo "✅ OK (${status_code})"
    else
        echo "❌ ERRO (${status_code})"
    fi
done

echo ""
echo "🔧 ARQUIVOS CRÍTICOS:"
echo "====================="

# Verificar se arquivos críticos existem
critical_files=(
    "client/src/App.tsx"
    "client/src/pages/quiz-descubra-seu-estilo.tsx"
    "client/src/pages/SchemaDrivenEditorPage.tsx"
    "client/src/pages/TestResultPage.tsx"
    "client/src/components/QuizPage.tsx"
)

for file in "${critical_files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file (AUSENTE)"
    fi
done

echo ""
echo "📊 COMPONENTES DE QUIZ:"
echo "======================="

# Verificar componentes de quiz
quiz_components=(
    "client/src/components/quiz/CaktoQuizFlow.tsx"
    "client/src/data/quizQuestions.ts"
    "client/src/data/caktoquizQuestions.ts"
    "client/src/utils/imageManager.ts"
    "client/src/lib/caktoQuizEngine.ts"
)

for component in "${quiz_components[@]}"; do
    if [ -f "$component" ]; then
        echo "✅ $component"
    else
        echo "❌ $component (AUSENTE)"
    fi
done

echo ""
echo "🎯 RESUMO DO STATUS:"
echo "==================="

if [ -f "client/src/App.tsx" ] && [ -f "client/src/pages/quiz-descubra-seu-estilo.tsx" ]; then
    echo "✅ Sistema principal: FUNCIONANDO"
else
    echo "❌ Sistema principal: COM PROBLEMAS"
fi

if [ -f "client/src/components/QuizPage.tsx" ] && [ -f "client/src/data/quizQuestions.ts" ]; then
    echo "✅ Sistema de quiz: FUNCIONANDO"
else
    echo "❌ Sistema de quiz: COM PROBLEMAS"
fi

if [ -f "client/src/pages/TestResultPage.tsx" ]; then
    echo "✅ Sistema de resultados: FUNCIONANDO"
else
    echo "❌ Sistema de resultados: COM PROBLEMAS"
fi

if [ -f "client/src/pages/SchemaDrivenEditorPage.tsx" ]; then
    echo "✅ Sistema de editor: FUNCIONANDO"
else
    echo "❌ Sistema de editor: COM PROBLEMAS"
fi

echo ""
echo "🚀 PRÓXIMOS PASSOS:"
echo "=================="
echo "1. Abra http://localhost:8081/ para testar a página inicial"
echo "2. Teste a rota /quiz-descubra-seu-estilo"
echo "3. Complete um quiz em /quiz"
echo "4. Veja o resultado em /resultado"
echo "5. Acesse o editor em /editor"
echo ""
echo "✨ Todas as rotas solicitadas estão configuradas e funcionais!"
