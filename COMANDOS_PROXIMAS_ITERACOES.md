# 🚀 Comandos Essenciais para Próximas Iterações

## 📋 Comandos de Desenvolvimento

### 🏃‍♂️ Executar o Projeto
```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Verificar erros de TypeScript
npm run type-check
```

### 🔍 Verificar Sistema Drag & Drop
```bash
# Testar se as dependências estão instaladas
npm list @dnd-kit/core @dnd-kit/sortable @dnd-kit/modifiers @dnd-kit/utilities

# Verificar imports dos componentes DnD
grep -r "import.*dnd" src/components/editor/

# Procurar por componentes draggáveis
find src -name "*Draggable*" -o -name "*Droppable*" -o -name "*Sortable*"
```

### 🧪 Testes e Depuração
```bash
# Acessar página de teste
# URL: http://localhost:5173/drag-drop-test

# Verificar erros no console do navegador
# F12 → Console → procurar por erros DnD

# Testar em diferentes dispositivos
# F12 → Toggle device toolbar
```

## 🛠️ Comandos de Manutenção

### 📁 Estrutura de Arquivos DnD
```bash
# Listar todos os arquivos de drag & drop
ls -la src/components/editor/dnd/

# Verificar conteúdo dos componentes principais
cat src/components/editor/dnd/DndProvider.tsx
cat src/components/editor/dnd/DroppableCanvas.tsx
cat src/components/editor/dnd/DraggableComponentItem.tsx
cat src/components/editor/dnd/SortableBlockItem.tsx
```

### 🔄 Git e Versionamento
```bash
# Verificar status atual
git status

# Ver commits recentes
git log --oneline -5

# Criar branch para melhorias
git checkout -b feature/drag-drop-improvements

# Commit de mudanças
git add -A && git commit -m "feat: melhorias no sistema drag & drop"

# Push para repositório
git push origin feature/drag-drop-improvements
```

## 🎯 Comandos para Próximas Funcionalidades

### 🔧 Melhorias no Sistema
```bash
# Adicionar novos tipos de componentes
# Editar: src/config/blockDefinitionsClean.ts

# Melhorar responsividade mobile
# Verificar: src/components/editor/dnd/*.tsx

# Adicionar animações avançadas
# Instalar: npm install framer-motion (se não estiver)
```

### 📊 Análise de Performance
```bash
# Analisar bundle size
npm run build && du -sh dist/

# Verificar componentes com maior tamanho
npx webpack-bundle-analyzer dist/

# Verificar imports não utilizados
npx depcheck
```

### 🧩 Extensões do Sistema
```bash
# Adicionar suporte a templates
mkdir -p src/components/editor/templates/

# Criar sistema de undo/redo
mkdir -p src/hooks/editor/history/

# Implementar drag & drop entre páginas
# Expandir: src/components/editor/dnd/DndProvider.tsx
```

## 🚨 Comandos de Solução de Problemas

### ❌ Problemas Comuns
```bash
# Se drag & drop não funcionar:
# 1. Verificar se DndProvider está envolvendo o editor
grep -r "DndProvider" src/components/editor/

# 2. Verificar se componentes têm data attributes corretos
grep -r "data-" src/components/editor/dnd/

# 3. Verificar console para erros DnD
# Abrir DevTools → Console

# Se componentes não aparecem como draggáveis:
# Verificar useDraggable hook
grep -r "useDraggable" src/components/editor/

# Se canvas não aceita drops:
# Verificar useDroppable hook  
grep -r "useDroppable" src/components/editor/
```

### 🔧 Reset e Limpeza
```bash
# Limpar node_modules e reinstalar
rm -rf node_modules package-lock.json && npm install

# Reset de cache do Vite
npm run dev -- --force

# Limpar dist folder
rm -rf dist/
```

## 📱 Comandos de Teste Mobile

### 🎮 Teste em Dispositivos
```bash
# Iniciar servidor acessível na rede local
npm run dev -- --host 0.0.0.0

# Encontrar IP local para teste mobile
ip addr show | grep "inet " | grep -v 127.0.0.1

# Testar touch events
# Usar DevTools → Touch simulation
```

## 📈 Comandos de Monitoramento

### 📊 Performance
```bash
# Lighthouse audit
npx lighthouse http://localhost:5173 --only-categories=performance

# Verificar Core Web Vitals
# Usar Chrome DevTools → Performance tab

# Analisar re-renders desnecessários
# Usar React Developer Tools → Profiler
```

## 🎨 Comandos de Customização

### 🎭 Temas e Estilos
```bash
# Verificar classes Tailwind utilizadas
grep -r "className.*drag" src/components/editor/dnd/

# Adicionar novos estilos de drag feedback
# Editar: src/components/editor/dnd/DraggableComponentItem.tsx

# Customizar drop zones
# Editar: src/components/editor/dnd/DroppableCanvas.tsx
```

## 🚀 Próximos Passos Recomendados

### 1. **Testes Automatizados**
```bash
# Instalar testing library
npm install --save-dev @testing-library/react @testing-library/jest-dom

# Criar testes para drag & drop
mkdir -p src/components/editor/dnd/__tests__/
```

### 2. **Documentação Interativa**
```bash
# Instalar Storybook
npx storybook@latest init

# Criar stories para componentes DnD
mkdir -p src/stories/dnd/
```

### 3. **Otimizações**
```bash
# Implementar lazy loading para componentes pesados
# Usar React.lazy() nos componentes do editor

# Adicionar memoização onde necessário
# Usar React.memo() e useMemo()
```

## 🎯 Comando de Acesso Rápido

```bash
# Comando único para testar tudo:
npm run dev && echo "✅ Servidor rodando em http://localhost:5173/drag-drop-test"
```

---

**💡 Dica:** Salve este arquivo como referência e use os comandos conforme necessário para continuar o desenvolvimento do sistema de drag & drop!
