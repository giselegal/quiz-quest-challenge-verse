#!/bin/bash

# Script para inicializar o projeto com console limpo
echo "🚀 Iniciando Quiz Quest Challenge Verse..."
echo "🧹 Modo de desenvolvimento limpo ativado"

# Definir variáveis de ambiente para telemetria
export NODE_ENV=development
export DISABLE_TELEMETRY=true
export VITE_DISABLE_TELEMETRY=true

# Limpar o console
clear

echo "📦 Verificando dependências..."

# Verificar se as dependências estão instaladas
if [ ! -d "node_modules" ]; then
    echo "📥 Instalando dependências..."
    npm install
fi

echo "🔧 Iniciando servidores..."

# Iniciar o backend
echo "🖥️  Iniciando backend (porta 5000)..."
npm run dev &
BACKEND_PID=$!

# Aguardar um momento para o backend inicializar
sleep 3

# Iniciar o frontend
echo "🌐 Iniciando frontend (porta 8080)..."
npm run dev:client &
FRONTEND_PID=$!

echo ""
echo "✅ Servidores iniciados!"
echo "🔗 Frontend: http://localhost:8080"
echo "🔗 Backend:  http://localhost:5000"
echo "🎯 Editor:   http://localhost:8080/editor"
echo ""
echo "🛡️ Console limpo ativo - Telemetria silenciada"
echo "🔄 Pressione Ctrl+C para parar todos os servidores"

# Função para limpar processos ao sair
cleanup() {
    echo ""
    echo "🛑 Parando servidores..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    echo "✅ Servidores parados"
    exit 0
}

# Capturar Ctrl+C
trap cleanup INT

# Aguardar indefinidamente
wait
