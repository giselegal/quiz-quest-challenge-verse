#!/bin/bash

echo "🔧 Testando sistema básico..."

# Verificar se os arquivos principais existem
echo "📁 Verificando arquivos principais..."

files=(
    "client/src/main.tsx"
    "client/src/App.tsx" 
    "client/src/pages/Index.tsx"
    "client/index.html"
)

for file in "${files[@]}"; do
    if [[ -f "$file" ]]; then
        echo "✅ $file - Encontrado"
    else
        echo "❌ $file - NÃO encontrado"
    fi
done

echo ""
echo "🚀 Iniciando servidor de teste..."

# Limpar processos anteriores
pkill -f "vite\|tsx" 2>/dev/null || true

# Aguardar limpeza
sleep 2

echo "🖥️ Iniciando frontend na porta 8080..."
cd client && npm run dev -- --port 8080 &
FRONTEND_PID=$!

echo "✅ Servidor iniciado (PID: $FRONTEND_PID)"
echo "🔗 Acesse: http://localhost:8080"
echo ""
echo "⏱️ Aguardando 10 segundos para inicialização..."
sleep 10

echo "🔍 Verificando se o servidor está respondendo..."
if curl -s http://localhost:8080 > /dev/null; then
    echo "✅ Servidor está respondendo!"
else
    echo "❌ Servidor não está respondendo"
fi

echo ""
echo "🛑 Para parar o servidor: kill $FRONTEND_PID"
echo "🔄 Pressione Ctrl+C para parar"

# Aguardar
wait $FRONTEND_PID
