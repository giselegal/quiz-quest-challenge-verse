#!/bin/bash

# Script de configuração e inicialização do Lovable
echo "🚀 Configurando ambiente Lovable..."

# Verificar se o Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Instale o Node.js primeiro."
    exit 1
fi

# Verificar se o npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ npm não encontrado. Instale o npm primeiro."
    exit 1
fi

echo "✅ Node.js e npm encontrados"

# Instalar dependências se necessário
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    npm install
fi

# Criar diretório de build se não existir
mkdir -p dist/public

# Verificar se o arquivo .env.development existe
if [ ! -f ".env.development" ]; then
    echo "⚠️  Arquivo .env.development não encontrado. Criando arquivo padrão..."
    cp .env.development.example .env.development 2>/dev/null || echo "📝 Use o arquivo .env.development criado como base"
fi

echo "🔧 Verificando configuração do banco de dados..."

# Executar migrações do banco se necessário
if [ -f "drizzle.config.ts" ]; then
    echo "🗄️ Executando migrações do banco..."
    npm run db:push
fi

echo "✅ Configuração concluída!"
echo ""
echo "🎯 Para iniciar o ambiente de desenvolvimento:"
echo "   npm run dev"
echo ""
echo "🎨 Para acessar o editor Lovable:"
echo "   1. Inicie o servidor: npm run dev"
echo "   2. Abra: http://localhost:8080?lovable=true"
echo "   3. Ou acesse: http://localhost:8080/admin"
echo ""
echo "📚 Documentação do Lovable:"
echo "   - Componentes: client/src/components/lovable/"
echo "   - Configuração: client/lovable.config.json"
echo "   - Deploy: CONFIGURACAO_LOVABLE.md"
echo ""
