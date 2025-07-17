# 🌿 Comandos Git para Próximas Iterações

## 📋 Comandos Essenciais

### 🔄 Workflow Básico
```bash
# Verificar status atual
git status

# Ver commits recentes  
git log --oneline -5

# Ver todas as branches
git branch -a

# Ver branches remotas
git branch -r
```

### 🌱 Criação de Branches
```bash
# Criar nova branch para feature
git checkout -b feature/drag-drop-improvements

# Criar branch para bugfix
git checkout -b bugfix/dnd-mobile-issues

# Criar branch para refatoração
git checkout -b refactor/dnd-performance
```

### 🚀 Push e Pull
```bash
# Fazer push da branch atual
git push origin $(git branch --show-current)

# Fazer push e definir upstream
git push -u origin $(git branch --show-current)

# Atualizar branch local com remota
git pull origin main

# Fetch todas as mudanças remotas
git fetch --all
```

## 🎯 Comandos para Sistema Drag & Drop

### 📦 Commits Específicos
```bash
# Commit com escopo DnD
git add -A && git commit -m "feat(dnd): adicionar suporte a touch devices"

# Commit de bugfix
git add -A && git commit -m "fix(dnd): corrigir drop zone em mobile"

# Commit de melhoria de performance
git add -A && git commit -m "perf(dnd): otimizar re-renders durante drag"

# Commit de documentação
git add -A && git commit -m "docs(dnd): adicionar guia de implementação"
```

### 🔀 Merge e Rebase
```bash
# Merge de feature branch para main
git checkout main
git merge feature/drag-drop-improvements

# Rebase interativo para limpar commits
git rebase -i HEAD~3

# Rebase da main na feature branch
git checkout feature/drag-drop-improvements
git rebase main
```

## 🏷️ Tags e Releases

### 📌 Criação de Tags
```bash
# Criar tag para versão do sistema DnD
git tag -a v1.0.0-dnd -m "Sistema Drag & Drop v1.0.0 implementado"

# Push das tags
git push origin --tags

# Listar tags existentes
git tag -l
```

### 🚀 Release Workflow
```bash
# Criar branch de release
git checkout -b release/v1.1.0

# Finalizar release e merge
git checkout main
git merge release/v1.1.0
git tag -a v1.1.0 -m "Release v1.1.0 - Melhorias DnD"
git push origin main --tags
```

## 🛠️ Comandos de Manutenção

### 🧹 Limpeza
```bash
# Remover branches locais já mergeadas
git branch --merged | grep -v "\*\|main\|master" | xargs -n 1 git branch -d

# Limpar branches remotas que não existem mais
git remote prune origin

# Reset hard (cuidado!)
git reset --hard HEAD~1
```

### 📊 Análise
```bash
# Ver diferenças entre branches
git diff main..feature/drag-drop-improvements

# Ver arquivos modificados
git diff --name-only HEAD~1

# Ver estatísticas de commit
git shortlog -sn

# Ver histórico de um arquivo específico
git log --oneline -- src/components/editor/dnd/DndProvider.tsx
```

## 🤝 Comandos de Colaboração

### 👥 Trabalho em Equipe
```bash
# Ver quem modificou cada linha
git blame src/components/editor/dnd/DndProvider.tsx

# Ver commits de um autor específico
git log --author="username"

# Cherry-pick commit específico
git cherry-pick <commit-hash>
```

### 🔄 Sincronização
```bash
# Atualizar fork com upstream
git remote add upstream https://github.com/original/repo.git
git fetch upstream
git checkout main
git merge upstream/main

# Resolver conflitos interativamente
git mergetool
```

## 🎨 Comandos de Branch Strategy

### 🌊 Git Flow
```bash
# Inicializar git flow
git flow init

# Criar feature
git flow feature start drag-drop-v2

# Finalizar feature
git flow feature finish drag-drop-v2

# Criar release
git flow release start v1.2.0
```

### 🔗 GitHub CLI
```bash
# Criar PR via CLI
gh pr create --title "feat: sistema drag & drop v2" --body "Implementação melhorada"

# Ver PRs abertas
gh pr list

# Fazer checkout de PR
gh pr checkout 123
```

## 📋 Script de Automação Git

### 🚀 Comandos Combinados
```bash
# Script completo de deploy
git add -A && \
git commit -m "feat(dnd): melhorias implementadas" && \
git push origin $(git branch --show-current) && \
echo "✅ Deploy concluído!"

# Script de backup
git stash push -m "backup antes de mudanças" && \
git checkout -b backup/$(date +%Y%m%d-%H%M%S) && \
git stash pop
```

## 🎯 Próximos Comandos Recomendados

### 1. **Criar Branch de Melhorias**
```bash
git checkout -b feature/dnd-improvements-v2
```

### 2. **Implementar Mudanças**
```bash
# Fazer modificações no código
# Testar funcionamento
./dnd-commands.sh test
```

### 3. **Commit e Push**
```bash
git add -A
git commit -m "feat(dnd): implementar melhorias v2"
git push -u origin feature/dnd-improvements-v2
```

### 4. **Criar Pull Request**
```bash
gh pr create --title "feat: melhorias sistema drag & drop v2" \
             --body "- Otimizações de performance
- Suporte melhorado a mobile
- Animações aprimoradas"
```

---

**💡 Dica:** Use estes comandos conforme a necessidade e sempre teste localmente antes de fazer push!
