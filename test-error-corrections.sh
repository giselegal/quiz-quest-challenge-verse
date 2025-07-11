#!/bin/bash

echo "🧪 TESTE DE CORREÇÃO DE ERROS DE CONSOLE"
echo "========================================"

# Verificar se o servidor está rodando
echo "📡 1. Verificando servidor..."
curl -s http://localhost:5000 > /dev/null
if [ $? -eq 0 ]; then
    echo "✅ Servidor respondendo na porta 5000"
else
    echo "❌ Servidor não está respondendo"
    exit 1
fi

# Testar APIs schema-driven
echo "📡 2. Testando API Schema-driven..."
RESPONSE=$(curl -s -w "%{http_code}" http://localhost:5000/api/schema-driven/funnels)
HTTP_CODE=${RESPONSE: -3}
if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ API Schema-driven funcionando (HTTP $HTTP_CODE)"
else
    echo "❌ API Schema-driven com problema (HTTP $HTTP_CODE)"
fi

# Testar APIs principais
echo "📡 3. Testando APIs principais..."
for endpoint in "quiz-results" "conversion-events" "utm-analytics"; do
    HTTP_CODE=$(curl -s -w "%{http_code}" -o /dev/null http://localhost:5000/api/$endpoint)
    if [ "$HTTP_CODE" = "200" ]; then
        echo "✅ /api/$endpoint - OK ($HTTP_CODE)"
    else
        echo "❌ /api/$endpoint - PROBLEMA ($HTTP_CODE)"
    fi
done

echo ""
echo "🎯 RESUMO DAS CORREÇÕES APLICADAS:"
echo "=================================="
echo "✅ Melhor tratamento de erro em checkOrphanFunnels()"
echo "✅ Inicialização tolerante a falhas do LocalStorageFixer"
echo "✅ Filtro de console para logs externos desnecessários"
echo "✅ Logs mais informativos e menos poluídos"
echo ""
echo "🌐 Para testar no browser:"
echo "  http://localhost:5000"
echo ""
echo "📋 Logs que devem estar limpos agora:"
echo "  - ❌ Erro ao verificar funnels órfãos: {}"
echo "  - Logs de Grafana, RUM collection suprimidos"
echo "  - Errors 404/500 de serviços externos filtrados"
