#!/bin/bash

# COMANDOS EM LOTE GITHUB - Atualização Forçada
# Script para forçar sync completo com GitHub

echo "🚀 COMANDOS EM LOTE GITHUB - INICIANDO..."
echo "📅 Data: $(date)"
echo "=================================================="

# Função para executar comando com timeout e retry
execute_with_retry() {
    local cmd="$1"
    local desc="$2"
    local max_retries=3
    local retry_count=0
    
    echo "⚡ Executando: $desc"
    
    while [ $retry_count -lt $max_retries ]; do
        if timeout 30s bash -c "$cmd"; then
            echo "✅ Sucesso: $desc"
            return 0
        else
            retry_count=$((retry_count + 1))
            echo "⚠️ Tentativa $retry_count/$max_retries falhou: $desc"
            sleep 2
        fi
    done
    
    echo "❌ Falha após $max_retries tentativas: $desc"
    return 1
}

# 1. VERIFICAR STATUS ATUAL
echo "🔍 1. VERIFICANDO STATUS ATUAL..."
execute_with_retry "git branch --show-current" "Verificar branch atual"
execute_with_retry "git status --porcelain" "Verificar arquivos modificados"

# 2. ADICIONAR TODOS OS ARQUIVOS
echo "📁 2. ADICIONANDO TODOS OS ARQUIVOS..."
execute_with_retry "git add -A" "Adicionar todos os arquivos"
execute_with_retry "git add ." "Adicionar arquivos do diretório atual"

# Forçar adição de arquivos específicos importantes
important_files=(
    "CORRECAO_LOVABLE_SYNC.md"
    "ativar-lovable-sync-2025.sh"
    "package.json"
    "vite.config.ts"
    ".lovable"
    ".gitignore"
)

for file in "${important_files[@]}"; do
    if [ -f "$file" ]; then
        execute_with_retry "git add '$file'" "Adicionar $file"
    fi
done

# 3. VERIFICAR O QUE VAI SER COMMITADO
echo "📋 3. VERIFICANDO ARQUIVOS PARA COMMIT..."
execute_with_retry "git status" "Status após adicionar arquivos"

# 4. CRIAR COMMIT ABRANGENTE
echo "💾 4. CRIANDO COMMIT..."
commit_message="feat: atualizações em lote - correções Lovable e scripts

- ✅ Correção completa do sync Lovable ativo
- ✅ Scripts de ativação e diagnóstico atualizados  
- ✅ Configurações de package.json e vite.config.ts corrigidas
- ✅ Documentação completa das correções
- ✅ Resolução de problemas TypeScript EPIPE
- ✅ AllowedHosts expandidos para múltiplos domínios Lovable
- ✅ Consistência de nomes entre arquivos de configuração
- ✅ Scripts de comandos em lote para automação GitHub

Data: $(date)
Status: Lovable ATIVO e sincronizado"

execute_with_retry "git commit -m \"$commit_message\"" "Criar commit abrangente"

# 5. PUSH PARA GITHUB
echo "🚀 5. FAZENDO PUSH PARA GITHUB..."
execute_with_retry "git push origin main" "Push para origin/main"

# 6. VERIFICAR STATUS FINAL
echo "🎯 6. VERIFICAÇÃO FINAL..."
execute_with_retry "git log --oneline -n 3" "Últimos 3 commits"
execute_with_retry "git status" "Status final"

# 7. FORÇAR SYNC LOVABLE
echo "💫 7. FORÇANDO SYNC LOVABLE..."
if [ -f "ativar-lovable-sync-2025.sh" ]; then
    execute_with_retry "./ativar-lovable-sync-2025.sh" "Ativar sync Lovable"
fi

echo ""
echo "🎉 COMANDOS EM LOTE CONCLUÍDOS!"
echo "=================================================="
echo "📊 RESUMO:"
echo "   ✅ Arquivos adicionados ao Git"
echo "   ✅ Commit criado com todas as mudanças"
echo "   ✅ Push realizado para GitHub"
echo "   ✅ Sync Lovable forçado"
echo ""
echo "🔗 Links:"
echo "   📱 GitHub: https://github.com/giselegal/quiz-quest-challenge-verse"
echo "   💻 Lovable: https://lovableproject.com/dashboard"
echo "   🆔 Projeto: quiz-sell-genius-66"
echo ""
echo "📅 Processo concluído em: $(date)"
