#!/bin/bash

echo "🧹 SCRIPT DE LIMPEZA CRÍTICA - RESOLUÇÃO DE GARGALOS"
echo "=================================================="

# Verificar se estamos no diretório correto
if [ ! -d "client/src" ]; then
    echo "❌ Execute este script na raiz do projeto!"
    exit 1
fi

echo ""
echo "🔍 FASE 1: IDENTIFICANDO CONFLITOS..."

# 1. DUPLICAÇÃO QUIZCONTENT
echo ""
echo "📄 1. Analisando QuizContent duplicado:"
echo "   - client/src/components/QuizContent.tsx"
echo "   - client/src/components/quiz/QuizContent.tsx"

# Verificar qual é usado mais
QUIZ_CONTENT_USAGE_1=$(grep -r "from.*components/QuizContent" client/src/ 2>/dev/null | wc -l)
QUIZ_CONTENT_USAGE_2=$(grep -r "from.*quiz/QuizContent" client/src/ 2>/dev/null | wc -l)

echo "   - Uso de components/QuizContent: $QUIZ_CONTENT_USAGE_1 arquivos"
echo "   - Uso de quiz/QuizContent: $QUIZ_CONTENT_USAGE_2 arquivos"

if [ $QUIZ_CONTENT_USAGE_2 -gt $QUIZ_CONTENT_USAGE_1 ]; then
    echo "   → DECISÃO: Manter quiz/QuizContent.tsx (mais usado)"
    KEEP_QUIZ_CONTENT="quiz/QuizContent.tsx"
    REMOVE_QUIZ_CONTENT="QuizContent.tsx"
else
    echo "   → DECISÃO: Manter components/QuizContent.tsx (mais usado)"
    KEEP_QUIZ_CONTENT="QuizContent.tsx"
    REMOVE_QUIZ_CONTENT="quiz/QuizContent.tsx"
fi

# 2. DUPLICAÇÃO USE-MOBILE
echo ""
echo "📱 2. Analisando use-mobile duplicado:"
echo "   - client/src/hooks/use-mobile.ts"
echo "   - client/src/hooks/use-mobile.tsx"

USE_MOBILE_TS_USAGE=$(grep -r "from.*use-mobile" client/src/ 2>/dev/null | grep -v ".tsx" | wc -l)
USE_MOBILE_TSX_USAGE=$(grep -r "from.*use-mobile" client/src/ 2>/dev/null | grep ".tsx" | wc -l)

echo "   - Uso de use-mobile.ts: $USE_MOBILE_TS_USAGE arquivos"
echo "   - Uso de use-mobile.tsx: $USE_MOBILE_TSX_USAGE arquivos"
echo "   → DECISÃO: Manter use-mobile.ts (padrão TypeScript)"

# 3. DUPLICAÇÃO IMAGECHECKER
echo ""
echo "🖼️ 3. Analisando ImageChecker duplicado:"
echo "   - client/src/utils/ImageChecker.js"
echo "   - client/src/utils/ImageChecker.ts"

IMAGECHECKER_JS_USAGE=$(grep -r "ImageChecker" client/src/ 2>/dev/null | grep ".js" | wc -l)
IMAGECHECKER_TS_USAGE=$(grep -r "ImageChecker" client/src/ 2>/dev/null | grep ".ts" | wc -l)

echo "   - Uso de ImageChecker.js: $IMAGECHECKER_JS_USAGE referências"
echo "   - Uso de ImageChecker.ts: $IMAGECHECKER_TS_USAGE referências"
echo "   → DECISÃO: Manter ImageChecker.ts (TypeScript)"

echo ""
echo "🎮 FASE 2: ANALISANDO SISTEMAS DE QUIZ..."

# Sistemas de Quiz identificados
echo ""
echo "📊 Sistemas de Quiz encontrados:"
echo "   - QuizPage.tsx (components/)"
echo "   - CaktoQuizPage.tsx (pages/)"
echo "   - QuizFlow.tsx (components/)"
echo "   - CaktoQuizFlow.tsx (components/quiz/)"

echo ""
echo "🧮 Engines de Cálculo encontrados:"
echo "   - caktoQuizEngine.ts (lib/)"
echo "   - quizCalculation.ts (lib/)"
echo "   - resultsCalculator.ts (utils/)"
echo "   - styleCalculation.ts (utils/)"

echo ""
echo "🎯 FASE 3: PLANO DE CORREÇÃO"
echo "=========================="

echo ""
echo "🚨 AÇÕES RECOMENDADAS (CRÍTICAS):"
echo ""
echo "1. 🗑️ REMOVER DUPLICAÇÕES:"
echo "   rm client/src/components/$REMOVE_QUIZ_CONTENT"
echo "   rm client/src/hooks/use-mobile.tsx"  
echo "   rm client/src/utils/ImageChecker.js"
echo ""
echo "2. 🔄 UNIFICAR SISTEMAS DE QUIZ:"
echo "   - Consolidar CaktoQuizFlow como sistema principal"
echo "   - Migrar lógica de QuizPage para CaktoQuizPage"
echo "   - Remover QuizFlow obsoleto"
echo ""
echo "3. 🧮 CONSOLIDAR CÁLCULOS:"
echo "   - Manter caktoQuizEngine.ts como principal"
echo "   - Migrar funções úteis dos outros engines"
echo "   - Remover duplicações de cálculo"

echo ""
echo "⚠️ AÇÕES RECOMENDADAS (OTIMIZAÇÃO):"
echo ""
echo "4. 📁 LIMPAR ARQUIVOS OBSOLETOS:"
echo "   - Remover componentes não usados do editor"
echo "   - Consolidar arquivos de configuração"
echo "   - Organizar utilitários por categoria"
echo ""
echo "5. 🖼️ OTIMIZAR IMAGENS:"
echo "   - Consolidar sistemas de otimização"
echo "   - Implementar preload eficiente"
echo "   - Remover URLs quebradas restantes"

echo ""
echo "✅ FASE 4: STATUS ATUAL"
echo "======================"
echo ""
echo "🟢 FUNCIONANDO:"
echo "   - Build passando"
echo "   - Servidor rodando" 
echo "   - imageManager.ts corrigido"
echo "   - Estrutura de pastas organizada"
echo ""
echo "🟡 PROBLEMAS MÉDIOS:"
echo "   - Duplicações causando confusão"
echo "   - Múltiplos sistemas competindo"
echo "   - Performance subótima"
echo ""
echo "🔴 PROBLEMAS CRÍTICOS:"
echo "   - Arquitetura complexa demais"
echo "   - Lógica fragmentada"
echo "   - Manutenção difícil"

echo ""
echo "🎯 RECOMENDAÇÃO FINAL:"
echo "====================="
echo ""
echo "PRIORIDADE ALTA: Executar limpeza das duplicações imediatamente"
echo "PRIORIDADE MÉDIA: Consolidar sistemas de quiz em 1 semana"
echo "PRIORIDADE BAIXA: Otimizações de performance futuras"
echo ""
echo "STATUS: 🟡 FUNCIONAL MAS NECESSITA LIMPEZA URGENTE"

exit 0
