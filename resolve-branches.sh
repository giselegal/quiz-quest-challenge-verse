#!/bin/bash
# Comandos para Resolver Conflitos de Ramificações (Branches)

echo "🔧 COMANDOS PARA RESOLVER CONFLITOS DE BRANCHES"
echo "================================================"

echo ""
echo "1. 📋 VERIFICAR STATUS E BRANCHES:"
echo "   git status"
echo "   git branch -a"
echo "   git log --oneline -10"

echo ""
echo "2. 🔄 SINCRONIZAR COM REMOTO:"
echo "   git fetch --all"
echo "   git pull origin main"

echo ""
echo "3. 🔀 RESOLVER CONFLITOS DE MERGE:"
echo "   git pull origin main --no-rebase"
echo "   # Se houver conflitos, editar arquivos manualmente"
echo "   git add ."
echo "   git commit -m 'Resolve merge conflicts'"

echo ""
echo "4. 🔁 REBASE (ALTERNATIVA):"
echo "   git stash                    # Guardar mudanças locais"
echo "   git pull origin main --rebase"
echo "   git stash pop               # Restaurar mudanças"

echo ""
echo "5. 🚀 FORCE PUSH (CUIDADO):"
echo "   git push origin main --force-with-lease"

echo ""
echo "6. 🆕 CRIAR NOVA BRANCH:"
echo "   git checkout -b nova-branch"
echo "   git push -u origin nova-branch"

echo ""
echo "7. 🔄 MERGE DE OUTRAS BRANCHES:"
echo "   git checkout main"
echo "   git merge nome-da-branch"
echo "   git push origin main"

echo ""
echo "8. 🔧 RESOLVER CONFLITO ESPECÍFICO:"
echo "   git checkout main"
echo "   git reset --hard origin/main  # CUIDADO: Remove mudanças locais"
echo "   git pull origin main"

echo ""
echo "9. 📝 CHERRY-PICK (COMMITS ESPECÍFICOS):"
echo "   git cherry-pick <commit-hash>"

echo ""
echo "10. 🔄 RESET E RELOAD:"
echo "    git reset --hard HEAD"
echo "    git clean -fd"
echo "    git pull origin main"

echo ""
echo "✅ COMANDO RÁPIDO PARA SINCRONIZAR:"
echo "   git stash && git pull origin main && git stash pop"
