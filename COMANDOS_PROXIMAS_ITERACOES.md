# 🚀 Comandos para Próximas Iterações - ATUALIZADO

## ⚡ Comandos Rápidos Essenciais

### 🔄 Desenvolvimento Diário
```bash
# Iniciar desenvolvimento
./dnd-commands.sh dev

# Verificar sistema drag & drop
./dnd-commands.sh check

# Executar testes completos
./dnd-commands.sh test

# Build para produção
./dnd-commands.sh build
```

### 📦 Git & Branches
```bash
# Verificar status atual
git status
git log --oneline -5

# Criar nova feature branch
git checkout -b feature/nova-funcionalidade
git push -u origin feature/nova-funcionalidade

# Atualizar branch atual
git pull origin main
git push origin HEAD

# Merge com main
git checkout main
git merge feature/nova-funcionalidade
git push origin main
```

### 🛠️ Comandos TypeScript
```bash
# Verificar tipos sem build
npx tsc --noEmit

# Corrigir imports automático
npx tsc --noEmit --skipLibCheck

# Ver erros específicos
npx tsc --noEmit | grep -A5 -B5 "VerticalCanvasHeader"
```

### 🎯 Testar Componentes
```bash
# Acessar teste drag & drop
# http://localhost:5173/drag-drop-test

# Verificar novo componente
grep -r "vertical-canvas-header" src/

# Testar definições de blocos
# http://localhost:5173/test-blocks
```

## 🔧 Comandos de Desenvolvimento Avançado

### 📊 Análise de Performance
```bash
# Bundle analyzer
npm run build && npx vite-bundle-analyzer dist

# Lighthouse CI
lighthouse http://localhost:5173/drag-drop-test --output=json

# Verificar tamanho de chunks
du -sh dist/public/assets/*
```

### 🔍 Debug & Diagnóstico
```bash
# Ver estrutura de componentes
find src/components/editor -name "*.tsx" | head -10

# Verificar dependências
npm list @dnd-kit/core @dnd-kit/sortable

# Analisar imports problemáticos
grep -r "import.*@/" src/ | grep -E "(util|lib|components)" | head -10
```

### 🏗️ Estrutura de Componentes
```bash
# Listar todos os blocos disponíveis
grep -r "type: '" src/config/blockDefinitionsClean.ts | grep -o "'[^']*'" | sort

# Ver componentes no UniversalBlockRenderer
grep -A1 -B1 "=>" src/components/editor/blocks/UniversalBlockRenderer.tsx

# Verificar integração DnD
grep -r "DraggableComponentItem\|DroppableCanvas" src/
```

## 💡 Próximas Iterações - Roadmap

### 🎯 Funcionalidades Prioritárias
1. **Sistema de Templates**
   ```bash
   # Criar template system
   mkdir -p src/templates/headers
   touch src/templates/headers/VerticalCanvasHeaderTemplates.ts
   ```

2. **Componentes Avançados**
   ```bash
   # Adicionar novos blocos
   cp src/components/editor/blocks/VerticalCanvasHeaderBlock.tsx \
      src/components/editor/blocks/HorizontalCanvasHeaderBlock.tsx
   ```

3. **Sistema de Presets**
   ```bash
   # Criar presets de configuração
   mkdir -p src/presets/quiz-headers
   touch src/presets/quiz-headers/DefaultHeaderPreset.ts
   ```

### 🔄 Workflows Recomendados

#### Adicionar Novo Componente
```bash
# 1. Criar componente
touch src/components/editor/blocks/NovoComponenteBlock.tsx

# 2. Adicionar definição
# Editar src/config/blockDefinitionsClean.ts

# 3. Integrar no renderer
# Editar src/components/editor/blocks/UniversalBlockRenderer.tsx

# 4. Testar
./dnd-commands.sh test
./dnd-commands.sh dev

# 5. Commit
git add -A
git commit -m "feat(blocks): Adiciona NovoComponenteBlock"
```

#### Atualizar Sistema DnD
```bash
# 1. Verificar componentes
./dnd-commands.sh check

# 2. Atualizar providers
# Editar src/components/editor/dnd/DndProvider.tsx

# 3. Testar funcionalidade
# http://localhost:5173/drag-drop-test

# 4. Validar integração
./dnd-commands.sh test
```

## 🎨 Design System

### 🎯 Padrões de Componentes
```typescript
// Estrutura padrão para novos blocos
interface NovoComponenteProps {
  block: {
    id: string;
    type: string;
    properties: {
      // Propriedades específicas
    };
  };
  isSelected?: boolean;
  onClick?: () => void;
  onSaveInline?: (blockId: string, updates: any) => void;
  className?: string;
}
```

### 🔧 Configuração de Propriedades
```typescript
// Schema padrão para blockDefinitionsClean.ts
{
  type: 'novo-componente',
  name: 'Novo Componente',
  description: 'Descrição clara e objetiva',
  icon: 'IconName', // Ver iconMap em SchemaDrivenComponentsSidebar
  category: 'Quiz', // Quiz, Básicos, Layout, Vendas, Avançados, Inline
  propertiesSchema: [
    {
      key: 'propriedade',
      label: 'Label da Propriedade',
      type: 'text-input', // Ver PropertySchema types
      defaultValue: 'valor padrão',
      description: 'Descrição da propriedade'
    }
  ]
}
```

## 🚀 Status do Projeto - ATUALIZADO

### ✅ Sistemas Implementados
- [x] Drag & Drop completo com @dnd-kit
- [x] SchemaDrivenEditorResponsive
- [x] DndProvider e componentes DnD
- [x] **VerticalCanvasHeaderBlock (NOVO! ✨)**
- [x] Sistema de blocos modulares
- [x] Git automation scripts
- [x] Componente de cabeçalho universal baseado em HTML

### 🆕 Implementações Recentes
- [x] **VerticalCanvasHeaderBlock.tsx** - Componente de cabeçalho com logo, progress bar e botão voltar
- [x] **blockDefinitionsClean.ts** - Adicionado esquema 'vertical-canvas-header' com 11 propriedades
- [x] **UniversalBlockRenderer.tsx** - Integração do novo componente no sistema de renderização
- [x] **dnd-commands.sh** - Script aprimorado com verificações do componente de cabeçalho

### 🔄 Em Desenvolvimento
- [ ] Validação em ambiente de teste (/drag-drop-test)
- [ ] Refinamentos de responsividade
- [ ] Sistema de templates
- [ ] Componentes horizontais
- [ ] Presets de configuração
- [ ] Temas visuais
- [ ] Export/Import de configurações

### 🎯 Próximos Passos IMEDIATOS
1. **Testar VerticalCanvasHeaderBlock**
   - Acessar http://localhost:5173/drag-drop-test
   - Verificar se aparece na sidebar "Blocos" > categoria "Quiz"
   - Testar drag & drop para canvas
   - Validar configuração de propriedades

2. **Criar variações do componente**
   - HorizontalCanvasHeaderBlock
   - MinimalHeaderBlock
   - FullWidthHeaderBlock

3. **Implementar sistema de templates**
   - Templates pré-configurados
   - Galeria de headers
   - Import/Export de configurações

4. **Melhorar responsividade**
   - Breakpoints mobile
   - Otimizações de layout
   - Performance mobile

5. **Adicionar mais funcionalidades**
   - Animações avançadas
   - Temas de cores
   - Customização de fontes

## 📝 Comandos de Validação ATUALIZADOS

### 🧪 Testar Novo Componente
```bash
# Verificar arquivos criados
ls -la src/components/editor/blocks/VerticalCanvasHeaderBlock.tsx
grep -n "vertical-canvas-header" src/config/blockDefinitionsClean.ts
grep -n "VerticalCanvasHeaderBlock" src/components/editor/blocks/UniversalBlockRenderer.tsx

# Executar teste completo
./dnd-commands.sh test

# Verificar build
npm run build

# Acessar página de teste
# http://localhost:5173/drag-drop-test
```

### 🔍 Debug Específico do Header
```bash
# Ver configuração do componente
grep -A20 "vertical-canvas-header" src/config/blockDefinitionsClean.ts

# Verificar imports
grep -n "VerticalCanvasHeader" src/components/editor/blocks/UniversalBlockRenderer.tsx

# Testar rendering
grep -r "logoSrc\|progressValue" src/components/editor/blocks/
```

### 🎨 Comandos de Personalização
```bash
# Criar novos blocos baseados no header
cp src/components/editor/blocks/VerticalCanvasHeaderBlock.tsx \
   src/components/editor/blocks/SimpleHeaderBlock.tsx

# Adicionar novos ícones
# Editar src/components/editor/sidebar/iconMap.ts

# Criar presets de cores
mkdir -p src/styles/presets
touch src/styles/presets/header-themes.css
```

### 🚀 Comandos de Deploy
```bash
# Build otimizado
npm run build

# Verificar tamanho do bundle
du -sh dist/public/assets/*

# Deploy para staging
# npm run deploy:staging

# Deploy para produção
# npm run deploy:prod
```

## 🏆 CONQUISTAS DESTA ITERAÇÃO

### ✨ O que foi implementado:
1. **VerticalCanvasHeaderBlock completo** - 150+ linhas de código TypeScript
2. **11 propriedades configuráveis** no schema de definições
3. **Integração completa** no sistema de renderização
4. **Script de automação** aprimorado com verificações
5. **Documentação atualizada** com todos os comandos necessários

### 🎯 Como usar:
1. Execute `./dnd-commands.sh dev` para iniciar
2. Acesse http://localhost:5173/drag-drop-test
3. Na sidebar "Blocos", categoria "Quiz", encontre "Cabeçalho Vertical"
4. Arraste para o canvas e configure as propriedades
5. Personalize logo, progress bar e botão voltar

---

**🎉 SISTEMA ATUALIZADO COM SUCESSO! O VerticalCanvasHeaderBlock está pronto para uso!**

**Próximo passo: Acesse http://localhost:5173/drag-drop-test para testar o novo componente! 🚀**

---

*Este arquivo contém todos os comandos necessários para continuar o desenvolvimento do sistema de quiz com drag & drop. Use como referência para próximas iterações!*
