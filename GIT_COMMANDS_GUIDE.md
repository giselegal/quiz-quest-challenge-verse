# 🚀 COMANDOS GIT EM LOTE - GUIA AVANÇADO

## 📋 COMANDOS BÁSICOS IMPLEMENTADOS

### 1. **Atualizar Branch Principal**
```bash
./git-batch-commands.sh update_main
```

### 2. **Criar Nova Branch**
```bash
./git-batch-commands.sh create_branch feature/novo-editor
./git-batch-commands.sh create_branch hotfix/corrigir-bug
./git-batch-commands.sh create_branch refactor/reorganizar-codigo
```

### 3. **Commit e Push Rápido**
```bash
./git-batch-commands.sh commit_and_push "Adiciona nova funcionalidade"
./git-batch-commands.sh commit_and_push "Corrige bug crítico"
./git-batch-commands.sh commit_and_push "Refatora componente X"
```

### 4. **Sincronizar com Remoto**
```bash
./git-batch-commands.sh sync_with_remote
```

### 5. **Verificar Conflitos**
```bash
./git-batch-commands.sh resolve_conflicts
```

### 6. **Limpar Branches Antigas**
```bash
./git-batch-commands.sh cleanup_branches
```

---

## 🎯 COMANDOS MANUAIS ÚTEIS

### **Branches**
```bash
# Listar todas as branches
git branch -a

# Mudar para branch específica
git checkout nome-da-branch

# Criar e mudar para nova branch
git checkout -b nova-branch

# Deletar branch local
git branch -d nome-da-branch

# Deletar branch remota
git push origin --delete nome-da-branch

# Renomear branch atual
git branch -m novo-nome
```

### **Commits**
```bash
# Commit com mensagem
git commit -m "Mensagem do commit"

# Commit incluindo arquivos modificados
git commit -am "Mensagem do commit"

# Alterar último commit
git commit --amend -m "Nova mensagem"

# Resetar último commit (mantém arquivos)
git reset --soft HEAD~1

# Resetar último commit (remove arquivos)
git reset --hard HEAD~1
```

### **Sincronização**
```bash
# Buscar atualizações sem merge
git fetch origin

# Buscar e fazer merge
git pull origin main

# Enviar branch atual
git push

# Enviar nova branch
git push -u origin nome-da-branch

# Forçar push (cuidado!)
git push --force
```

### **Stash (Guardar mudanças temporariamente)**
```bash
# Guardar mudanças
git stash

# Guardar com mensagem
git stash save "Trabalho em progresso"

# Listar stashes
git stash list

# Aplicar último stash
git stash pop

# Aplicar stash específico
git stash apply stash@{0}

# Deletar stash
git stash drop stash@{0}
```

### **Logs e Histórico**
```bash
# Ver histórico simplificado
git log --oneline

# Ver últimos 10 commits
git log --oneline -10

# Ver histórico gráfico
git log --graph --oneline --all

# Ver mudanças de um commit
git show commit-hash

# Ver diferenças entre commits
git diff commit1..commit2
```

### **Merge e Rebase**
```bash
# Fazer merge de branch
git merge nome-da-branch

# Fazer rebase
git rebase main

# Continuar rebase após resolver conflitos
git rebase --continue

# Cancelar rebase
git rebase --abort

# Rebase interativo (últimos 3 commits)
git rebase -i HEAD~3
```

---

## 🔄 FLUXOS DE TRABALHO RECOMENDADOS

### **1. Fluxo de Feature (Nova Funcionalidade)**
```bash
# 1. Atualizar main
./git-batch-commands.sh update_main

# 2. Criar branch de feature
./git-batch-commands.sh create_branch feature/nova-funcionalidade

# 3. Fazer mudanças...

# 4. Commit e push
./git-batch-commands.sh commit_and_push "Adiciona nova funcionalidade"

# 5. Criar Pull Request no GitHub
```

### **2. Fluxo de Hotfix (Correção Urgente)**
```bash
# 1. Criar branch de hotfix
./git-batch-commands.sh create_branch hotfix/corrigir-bug-critico

# 2. Fazer correção...

# 3. Commit e push
./git-batch-commands.sh commit_and_push "Corrige bug crítico"

# 4. Merge direto na main (se aprovado)
git checkout main
git merge hotfix/corrigir-bug-critico
git push
```

### **3. Fluxo de Sincronização Diária**
```bash
# 1. Sincronizar com remoto
./git-batch-commands.sh sync_with_remote

# 2. Verificar conflitos
./git-batch-commands.sh resolve_conflicts

# 3. Fazer suas mudanças...

# 4. Commit das mudanças
./git-batch-commands.sh commit_and_push "Trabalho do dia"
```

---

## 🚨 COMANDOS DE EMERGÊNCIA

### **Desfazer Mudanças**
```bash
# Desfazer mudanças não commitadas
git checkout -- arquivo.txt

# Desfazer todas as mudanças não commitadas
git checkout -- .

# Resetar para estado anterior
git reset --hard HEAD
```

### **Recuperar Commits**
```bash
# Ver commits deletados
git reflog

# Recuperar commit específico
git cherry-pick commit-hash

# Voltar para commit específico
git reset --hard commit-hash
```

### **Resolver Conflitos de Merge**
```bash
# 1. Ver arquivos em conflito
git status

# 2. Editar arquivos manualmente

# 3. Marcar como resolvido
git add arquivo-resolvido.txt

# 4. Finalizar merge
git commit -m "Resolve conflitos de merge"
```

---

## 📊 COMANDOS DE INFORMAÇÃO

### **Status e Informações**
```bash
# Status detalhado
git status -v

# Informações do repositório
git remote -v

# Último commit de cada branch
git branch -v

# Configurações do Git
git config --list

# Tamanho do repositório
du -sh .git
```

---

## 🎯 DICAS E MELHORES PRÁTICAS

### **Mensagens de Commit**
```bash
# ✅ Boas mensagens
"Adiciona validação de email no formulário"
"Corrige erro de carregamento na página de resultados"
"Refatora componente de quiz para melhor performance"

# ❌ Mensagens ruins
"fix"
"update"
"changes"
```

### **Estratégias de Branch**
```bash
# Estrutura recomendada:
main                    # Branch principal (sempre estável)
feature/nome-feature    # Novas funcionalidades
hotfix/nome-bug        # Correções urgentes
refactor/nome-refactor # Refatorações
experiment/nome-teste  # Experimentos
```

### **Comandos de Limpeza**
```bash
# Limpar arquivos não rastreados
git clean -fd

# Otimizar repositório
git gc

# Verificar integridade
git fsck
```

---

## 🔗 INTEGRAÇÃO COM GITHUB

### **Pull Requests via CLI (GitHub CLI)**
```bash
# Instalar GitHub CLI: https://cli.github.com

# Criar PR
gh pr create --title "Nova funcionalidade" --body "Descrição"

# Listar PRs
gh pr list

# Ver PR específico
gh pr view 123

# Fazer merge de PR
gh pr merge 123
```

---

## 📞 SUPPORT E TROUBLESHOOTING

### **Problemas Comuns**

1. **"Permission denied"**
   - Verificar chaves SSH: `ssh -T git@github.com`

2. **"Branch diverged"**
   - Fazer rebase: `git rebase origin/main`

3. **"Merge conflicts"**
   - Usar: `./git-batch-commands.sh resolve_conflicts`

4. **"Arquivo muito grande"**
   - Usar Git LFS: `git lfs track "*.pdf"`

---

**🎉 AGORA VOCÊ TEM UM ARSENAL COMPLETO DE COMANDOS GIT!**
