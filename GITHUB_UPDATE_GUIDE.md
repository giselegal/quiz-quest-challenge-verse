# 📚 Guia Completo para Atualizações no GitHub

Este guia te ajudará a fazer atualizações seguras no seu repositório GitHub a partir do Replit.

## 🚀 Processo Recomendado para Atualizações

### 1. **Verificar Status dos Arquivos**
```bash
git status
```
Isso mostra quais arquivos foram modificados.

### 2. **Adicionar Arquivos para Commit**

**Para adicionar todos os arquivos modificados:**
```bash
git add .
```

**Para adicionar arquivos específicos:**
```bash
git add client/src/main.tsx
git add .gitignore
git add GITHUB_UPDATE_GUIDE.md
```

### 3. **Fazer o Commit com Mensagem Descritiva**
```bash
git commit -m "Fix: Corrigidos problemas de carregamento de módulos e caracteres UTF-8"
```

### 4. **Enviar para o GitHub**
```bash
git push origin main
```
*ou `git push origin master` se o branch principal for master*

## 📝 Convenções de Mensagens de Commit

Use estas convenções para mensagens claras:

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Atualização de documentação
- `style:` Formatação de código
- `refactor:` Refatoração de código
- `test:` Testes
- `chore:` Tarefas de manutenção

**Exemplos:**
```bash
git commit -m "feat: Adiciona novo editor visual de quiz"
git commit -m "fix: Resolve problemas de carregamento no main.tsx"
git commit -m "docs: Atualiza guia de instalação"
git commit -m "style: Melhora formatação dos componentes React"
```

## 🔄 Fluxo Completo Recomendado

### Para Correções Rápidas:
```bash
git add .
git commit -m "fix: [descrição da correção]"
git push origin main
```

### Para Novas Funcionalidades:
```bash
git add .
git commit -m "feat: [descrição da funcionalidade]"
git push origin main
```

## 📋 Checklist Antes de Cada Push

- [ ] Testei as mudanças localmente
- [ ] Revisei os arquivos que serão enviados (`git status`)
- [ ] Escrevi uma mensagem de commit clara e descritiva
- [ ] Confirmei que não estou enviando arquivos sensíveis (.env, chaves API)

## 🛡️ Práticas de Segurança

1. **Nunca envie:**
   - Arquivos .env
   - Chaves de API
   - Senhas
   - node_modules/

2. **Sempre use o .gitignore:**
   - O arquivo .gitignore já está configurado corretamente
   - Ele impede que arquivos sensíveis sejam enviados acidentalmente

## 🆘 Comandos Úteis para Problemas

### Se você fez commit mas ainda não fez push:
```bash
git reset --soft HEAD~1  # Desfaz o último commit mas mantém as mudanças
```

### Para ver o histórico de commits:
```bash
git log --oneline
```

### Para ver diferenças nos arquivos:
```bash
git diff
```

### Para descartar mudanças em um arquivo:
```bash
git checkout -- nome-do-arquivo
```

## 📈 Exemplo Prático - Atualização de Hoje

Para as mudanças que fizemos hoje, você faria:

```bash
# 1. Verificar status
git status

# 2. Adicionar arquivos
git add .

# 3. Fazer commit
git commit -m "fix: Corrige caracteres UTF-8 corrompidos e simplifica main.tsx

- Remove caracteres UTF-8 corrompidos em SimpleDragDropEditor.tsx
- Simplifica imports em main.tsx para resolver problemas de carregamento
- Melhora .gitignore com mais exclusões
- Aplicação agora carrega sem erros de módulos"

# 4. Enviar para GitHub
git push origin main
```

## 💡 Dicas Importantes

1. **Commits pequenos e frequentes** são melhores que um commit grande
2. **Sempre teste** antes de fazer push
3. **Use mensagens descritivas** - você agradecerá no futuro
4. **Revise as mudanças** com `git diff` antes do commit

## 🎯 Próximos Passos

Agora você pode fazer suas atualizações seguindo este processo. Lembre-se de sempre testar no Replit antes de enviar para o GitHub!