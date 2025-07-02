#!/bin/bash

# Script para Ativar Sync Lovable - Versão Atualizada 2025

echo "🚀 Ativando Sync Lovable..."
echo "📅 Data: $(date)"

# Função para verificar se o Lovable está ativo
check_lovable_status() {
    echo "🔍 Verificando status atual..."
    
    if [ -f ".lovable" ]; then
        echo "✅ Arquivo .lovable encontrado"
        echo "📋 Configuração atual:"
        cat .lovable | head -15
    else
        echo "❌ Arquivo .lovable não encontrado"
        return 1
    fi
}

# Função para forçar ativação
force_activation() {
    echo "🔧 Forçando ativação do Lovable..."
    
    # Atualizar timestamp
    current_timestamp=$(date +%s)
    current_iso=$(date -u +%Y-%m-%dT%H:%M:%SZ)
    
    # Criar configuração temporária
    cat > .lovable.tmp << EOF
{
  "github": {
    "autoSyncFromGithub": true,
    "autoPushToGithub": true,
    "branch": "main"
  },
  "projectName": "Quiz Sell Genius",
  "projectId": "quiz-sell-genius-66",
  "version": "2.4.${current_timestamp}",
  "lastUpdate": "${current_iso}",
  "features": {
    "componentTagger": true,
    "liveEditing": true,
    "enhancedSync": true,
    "visualEditor": true,
    "forceSync": true,
    "webhookAlternative": true,
    "activeSync": true
  },
  "editor": {
    "enableLiveMode": true,
    "autoSave": true,
    "componentHighlighting": true,
    "realTimeUpdates": true
  },
  "sync": {
    "forced": true,
    "timestamp": ${current_timestamp},
    "method": "webhook-alternative",
    "tokenRequired": false,
    "status": "active",
    "lastSync": "${current_iso}"
  },
  "scripts": {
    "prepare": "node scripts/prepare-lovable.js",
    "sync": "node scripts/manual-sync.js",
    "test": "node scripts/test-sync.js"
  }
}
EOF

    # Substituir arquivo original
    mv .lovable.tmp .lovable
    echo "✅ Configuração atualizada"
}

# Função para testar conectividade
test_connectivity() {
    echo "🌐 Testando conectividade..."
    
    # Verificar se o servidor local está rodando
    if curl -s http://localhost:8080 > /dev/null 2>&1; then
        echo "✅ Servidor local ativo (porta 8080)"
    else
        echo "⚠️ Servidor local não encontrado"
        echo "💡 Executando: npm run dev"
        npm run dev &
        sleep 5
    fi
}

# Função para sincronizar com GitHub
sync_github() {
    echo "📤 Sincronizando com GitHub..."
    
    git add .lovable
    git commit -m "feat: ativar sync Lovable com configuração atualizada

- Força ativação do sync em tempo real
- Atualiza timestamp e versão
- Habilita todas as features do Lovable
- Configura sync bidirecional GitHub ↔ Lovable"
    
    git push origin main
    echo "✅ Sincronização concluída"
}

# Executar script
echo "🎯 Iniciando processo de ativação..."

check_lovable_status
force_activation
test_connectivity
sync_github

echo ""
echo "🎉 ATIVAÇÃO CONCLUÍDA!"
echo "📋 Próximos passos:"
echo "   1. Verificar se o projeto aparece ativo no dashboard Lovable"
echo "   2. Testar edições em tempo real"
echo "   3. Verificar sync bidirecional"
echo ""
echo "🔗 URL do projeto: https://lovableproject.com/dashboard"
echo "📱 ID do projeto: quiz-sell-genius-66"
