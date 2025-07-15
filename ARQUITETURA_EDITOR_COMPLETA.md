# 🏗️ ARQUITETURA COMPLETA DO EDITOR - Análise Estrutural

## 📋 ESTRUTURA PRINCIPAL DO SISTEMA

### **1. EDITORES PRINCIPAIS**

#### **A. Schema-Driven Editor (PRINCIPAL - 21 Etapas)**
- **Arquivo**: `SchemaDrivenEditorResponsive.tsx`
- **Rota**: `/editor` e `/editor/:id`
- **Hook**: `useSchemaEditorFixed.ts`
- **Serviço**: `schemaDrivenFunnelService.ts`
- **Função**: Editor modular das 21 etapas do funil

#### **B. Editores Legados**
- **ModularQuizEditor.tsx**: Editor antigo modular
- **ModernQuizEditor.tsx**: Editor moderno simplificado
- **QuizEditorInterface.tsx**: Interface de quiz tradicional

### **2. SISTEMA DE BLOCOS**

#### **A. Blocos Principais do Quiz (21 Etapas)**
```
/components/editor/blocks/
├── QuizStartPageBlock.tsx         # Etapa 1: Introdução
├── QuizQuestionBlock.tsx          # Etapas 2-11: Questões principais
├── StrategicQuestionBlock.tsx     # Etapas 13-18: Questões estratégicas
├── QuizTransitionBlock.tsx        # Etapas 12, 19: Transições
├── ResultPageBlock.tsx            # Etapa 20: Resultado
├── QuizOfferPageBlock.tsx         # Etapa 21: Oferta
└── ModernResultPageBlock.tsx      # Alternativa moderna resultado
```

#### **B. Blocos de Interface/UI**
```
├── QuizIntroHeaderBlock.tsx       # Cabeçalho com logo e progresso
├── QuizNameInputBlock.tsx         # Campo de nome
├── QuizTitleBlock.tsx            # Títulos editáveis
├── OptionsGridBlock.tsx          # Grade de opções responsiva
├── ButtonBlock.tsx               # Botões de ação
├── TextBlock.tsx                 # Textos diversos
├── ImageBlock.tsx                # Imagens
└── SpacerBlock.tsx               # Espaçadores
```

#### **C. Blocos Específicos da Oferta**
```
├── QuizOfferCountdownBlock.tsx    # Timer de oferta
├── QuizOfferPricingBlock.tsx      # Preços e valores
├── QuizOfferFAQBlock.tsx          # FAQ da oferta
├── QuizOfferTestimonialsBlock.tsx # Depoimentos
└── QuizOfferFinalCTABlock.tsx     # CTA final
```

### **3. SISTEMA DE HOOKS**

#### **A. Hook Principal**
- **`useSchemaEditorFixed.ts`**: Gerencia estado completo do editor
  - Funções: criar, carregar, salvar funis
  - Estado: páginas, blocos, seleções
  - Auto-save e sincronização

#### **B. Hooks Especializados**
```
/hooks/editor/
├── useBlockOperations.ts          # Operações com blocos
├── useEditorHistory.ts           # Histórico de ações (undo/redo)
├── useEditorBlocks.ts            # Manipulação de blocos
├── useEditorTheme.ts             # Temas e estilos
├── useEditorPersistence.ts       # Persistência de dados
├── useKeyboardShortcuts.ts       # Atalhos de teclado
└── useEditorTemplates.ts         # Templates pré-definidos
```

### **4. SISTEMA DND (DRAG & DROP)**

#### **A. Canvas Principal**
- **`DroppableCanvas.tsx`**: Container principal dos blocos
  - Layout horizontal com `flex-wrap`
  - Responsividade automática
  - Sistema de seleção

#### **B. Componentes DND**
```
/components/editor/dnd/
├── DroppableCanvas.tsx           # Canvas principal
├── DraggableBlock.tsx           # Blocos arrastáveis  
└── DragOverlay.tsx              # Overlay de drag
```

### **5. PAINÉIS DE INTERFACE**

#### **A. Sidebar Esquerda - Componentes**
- **`SchemaDrivenComponentsSidebar.tsx`**: Lista de blocos disponíveis
- Categorias: Básicos, Quiz, Ofertas, UI

#### **B. Sidebar Direita - Propriedades**
- **`DynamicPropertiesPanel.tsx`**: Painel de propriedades dinâmico
- Editores específicos por tipo de bloco

#### **C. Painéis Diversos**
```
/components/editor/panels/
├── PropertiesPanel.tsx           # Propriedades gerais
├── ConfigPanel.tsx               # Configurações do funil
├── FunnelManagementPanel.tsx     # Gerenciamento de funis
└── VersioningPanel.tsx           # Controle de versões
```

### **6. SERVIÇOS E DADOS**

#### **A. Serviço Principal**
- **`schemaDrivenFunnelService.ts`**: Serviço completo do editor
  - `createDefaultFunnel()`: Cria funil com 21 páginas
  - `createModularPages()`: Gera todas as etapas
  - Auto-save, persistência, sincronização

#### **B. Dados das Questões**
- **`realQuizData.ts`**: Dados reais do quiz
  - `REAL_QUIZ_QUESTIONS`: 10 questões principais
  - `STRATEGIC_QUESTIONS`: 6 questões estratégicas
  - `TRANSITIONS`: Textos de transição

#### **C. Configurações**
- **`blockDefinitionsClean.ts`**: Definições de todos os blocos
- **`componentDefinitions.ts`**: Componentes disponíveis

### **7. SISTEMA DE RESPONSIVIDADE**

#### **A. Layout Base**
```css
/* Container principal */
.flex.flex-row.flex-wrap {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

/* Itens (blocos) */
.canvas-item {
  max-width: 100%;
  flex-basis: 100%;
  margin-right: auto;
}
```

#### **B. Breakpoints Tailwind**
- **Mobile**: Default (< 768px)
- **Tablet**: `md:` (768px+)
- **Desktop**: `lg:` (1024px+)

#### **C. Comportamento Responsivo**
- **Telas grandes**: Até 2 colunas lado a lado
- **Telas pequenas**: Empilhamento vertical automático
- **Sidebars**: Overlay em mobile, fixas em desktop

### **8. FLUXO DE DADOS**

#### **A. Inicialização**
```
1. SchemaDrivenEditorPage.tsx (rota /editor)
2. SchemaDrivenEditorResponsive.tsx (interface)
3. useSchemaEditorFixed.ts (hook principal)
4. schemaDrivenFunnelService.ts (serviço)
5. createDefaultFunnel() → createModularPages()
6. Gera 21 páginas automaticamente
```

#### **B. Edição de Blocos**
```
1. Usuário clica em bloco → setSelectedBlock()
2. DynamicPropertiesPanel mostra propriedades
3. Usuário edita → onPropertyChange()
4. updateBlock() → updateFunnelState()
5. Auto-save após 1 segundo
```

#### **C. Persistência**
```
1. Mudanças → markPendingChanges()
2. Auto-save (10s) → saveFunnel()
3. localStorage (backup local)
4. Sincronização com backend (opcional)
```

## 🎯 PROBLEMA IDENTIFICADO

### **A. Possíveis Causas da Desconfiguração**

1. **Importação Falhando**:
   - `REAL_QUIZ_QUESTIONS` não carregando
   - `STRATEGIC_QUESTIONS` não disponível
   - Erro no `realQuizData.ts`

2. **Serviço com Problema**:
   - `createModularPages()` retornando array vazio
   - `forEach` nas questões falhando
   - Erro na estrutura das páginas

3. **Hook não Inicializando**:
   - `createNewFunnel()` não sendo chamado
   - Auto-criação não funcionando
   - Estado não sendo atualizado

### **B. Verificações Necessárias**

1. **Logs de Debug**: Adicionar console.logs nas funções principais
2. **Estrutura de Dados**: Verificar se arrays têm dados
3. **Fluxo de Inicialização**: Rastrear chamadas de função
4. **Estado do Hook**: Verificar estado atual do editor

## 🔧 PRÓXIMOS PASSOS

1. **Adicionar Debug Detalhado** no serviço e hook
2. **Verificar Importações** dos dados das questões
3. **Testar Manualmente** a criação de funil
4. **Verificar Console** por erros de JavaScript
5. **Implementar Fallbacks** caso dados não carreguem

---

**Esta arquitetura está bem estruturada, mas o problema parece estar na inicialização dos dados das 21 etapas.**
