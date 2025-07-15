# Estrutura Git do Repositório Quiz Quest Challenge Verse

## Ramificações Atuais

- **main**: Ramificação principal do projeto
- **replit**: Ramificação para desenvolvimento no ambiente Replit
- **replit-agent**: Ramificação para integração com o agente Replit

## Estado Atual

Todas as ramificações estão sincronizadas e apontam para o mesmo commit. O repositório está em um estado limpo e organizado.

## Resolução de Problemas de Autenticação VS Code

Se você está enfrentando erros como:
```
Timed out waiting for authentication provider to register
[warning] [LanguageModelAccess] LanguageModel/Embeddings are not available without auth token
```

Tente as seguintes soluções:

1. **Reautenticar no VS Code**:
   - Clique no ícone de conta no canto inferior esquerdo
   - Selecione "Sair" e depois faça login novamente

2. **Reiniciar o VS Code**:
   - Feche e reabra o VS Code
   - Se estiver usando GitHub Codespaces, recarregue a janela

3. **Verificar conexões de rede**:
   - Certifique-se de que sua conexão com a internet está estável
   - Verifique se não há bloqueios de firewall para api.github.com

4. **Reinstalar extensões relacionadas**:
   - GitHub Copilot
   - GitHub Authentication

5. **Limpar cache do VS Code**:
   ```bash
   # No terminal
   rm -rf ~/.vscode/extensions/github*
   # Então reinicie o VS Code
   ```

## Comandos Úteis para Manutenção do Git

```bash
# Atualizar todas as referências remotas
git fetch --all

# Verificar status da branch atual
git status

# Sincronizar branch atual com remoto
git pull origin NOME_DA_BRANCH

# Mudar para outra branch
git checkout NOME_DA_BRANCH

# Resetar uma branch para o estado de outra
git checkout BRANCH_A_RESETAR
git reset --hard BRANCH_REFERENCIA
git push -f origin BRANCH_A_RESETAR
```
