#!/bin/bash

# Script para alternar entre SQLite (local) e Supabase (cloud)

echo "🔧 Configurador de Banco de Dados"
echo "🎨 Projeto Lovable: https://lovable.dev/projects/65efd17d-5178-405d-9721-909c97470c6d"
echo "🔗 Replit: https://replit.com/@giselegal/quiz-quest-challenge-verse"
echo ""
echo "Escolha o banco de dados:"
echo "1) SQLite (local) - Recomendado para desenvolvimento"
echo "2) Supabase (cloud) - Para produção/integração"
echo ""

read -p "Digite sua escolha (1 ou 2): " choice

case $choice in
  1)
    echo "📦 Configurando SQLite local..."
    
    # Backup do .env.development
    cp .env.development .env.development.bak
    
    # Configurar SQLite
    sed -i 's/^DATABASE_URL=.*/DATABASE_URL=file:\.\/dev.db/' .env.development
    
    echo "✅ SQLite configurado!"
    echo "📍 Banco: ./dev.db"
    echo "🚀 Iniciar: npm run lovable:dev"
    ;;
    
  2)
    echo "☁️ Configurando Supabase..."
    
    # Backup do .env.development  
    cp .env.development .env.development.bak
    
    # Configurar Supabase
    if grep -q "SUPABASE_DATABASE_URL" .env.development; then
      supabase_url=$(grep "SUPABASE_DATABASE_URL" .env.development | cut -d'"' -f2)
      sed -i "s|^DATABASE_URL=.*|DATABASE_URL=\"$supabase_url\"|" .env.development
      
      echo "✅ Supabase configurado!"
      echo "📍 Banco: Supabase PostgreSQL"
      echo "🔧 Executando migrações..."
      npm run db:push
      
      if [ $? -eq 0 ]; then
        echo "✅ Migrações concluídas!"
        echo "🚀 Iniciar: npm run lovable:dev"
      else
        echo "❌ Erro nas migrações. Voltando para SQLite..."
        sed -i 's/^DATABASE_URL=.*/DATABASE_URL=file:\.\/dev.db/' .env.development
        echo "📦 SQLite restaurado como fallback"
      fi
    else
      echo "❌ Credenciais do Supabase não encontradas"
      echo "📝 Configure SUPABASE_DATABASE_URL em .env.development"
    fi
    ;;
    
  *)
    echo "❌ Opção inválida. Mantendo configuração atual."
    ;;
esac

echo ""
echo "📄 Configuração atual:"
grep "^DATABASE_URL" .env.development
