# LOCALIZAÇÃO DOS COMPONENTES CRIADOS - MAPA COMPLETO

## ✅ **TODOS OS COMPONENTES ESTÃO INTEGRADOS E FUNCIONANDO**

### **🎯 EDITOR PRINCIPAL ATIVO**

**📍 Página:** `/advanced-editor`  
**📄 Arquivo:** `/client/src/app/advanced-editor/page.tsx`  
**🔧 Usa:** `SchemaDrivenEditorLayoutV2`  

### **🔄 FLUXO DE RENDERIZAÇÃO**

```
/advanced-editor 
    ↓ 
SchemaDrivenEditorLayoutV2.tsx (linha 330)
    ↓
BlockRenderer.tsx (importado na linha 4)
    ↓
Todos os 31+ componentes mapeados no switch
```

### **📋 ONDE ENCONTRAR CADA COMPONENTE**

#### **1. BlockRenderer.tsx - CENTRO NEVRÁLGICO**
**📍 Local:** `/client/src/components/editor/blocks/BlockRenderer.tsx`

**🔧 Função:** Mapeia todos os tipos de bloco para componentes React
```typescript
switch (block.type) {
  case 'quiz-start-page': return <QuizStartPageBlock {...commonProps} />;
  case 'result-page': return <ResultPageBlock {...commonProps} />;
  case 'quiz-offer-page': return <QuizOfferPageBlock {...commonProps} />;
  case 'question-multiple': return <QuestionMultipleBlock {...commonProps} />;
  case 'alert': return <AlertBlock {...commonProps} />;
  // ... 27+ outros componentes
}
```

#### **2. Componentes Físicos dos Blocos**
**📍 Local:** `/client/src/components/editor/blocks/`

**📁 Estrutura:**
```
/blocks/
├── QuizStartPageBlock.tsx        ✅ (Etapa 1 do funil real)
├── ResultPageBlock.tsx           ✅ (Etapa 20)
├── QuizOfferPageBlock.tsx        ✅ (Etapa 21)
├── QuestionMultipleBlock.tsx     ✅ (Pergunta múltipla escolha completa)
├── AlertBlock.tsx                ✅ (16 blocos UI/Avançados)
├── ArgumentsBlock.tsx            ✅
├── AudioBlock.tsx                ✅
├── CarouselBlock.tsx             ✅
├── LoaderBlock.tsx               ✅
├── CompareBlock.tsx              ✅
├── ConfettiBlock.tsx             ✅
├── QuoteBlock.tsx                ✅
├── FormInputBlock.tsx            ✅
├── ChartAreaBlock.tsx            ✅
├── ChartLevelBlock.tsx           ✅
├── ListBlock.tsx                 ✅
├── MarqueeBlock.tsx              ✅
├── OptionsGridBlock.tsx          ✅
├── ScriptBlock.tsx               ✅
├── TermsBlock.tsx                ✅
├── HeaderBlock.tsx               ✅ (Blocos básicos existentes)
├── TextBlock.tsx                 ✅
├── ImageBlock.tsx                ✅
├── ButtonBlock.tsx               ✅
└── ... (outros blocos básicos)
```

#### **3. Definições dos Blocos (Schema)**
**📍 Local:** `/client/src/config/blockDefinitions.ts`

**🔧 Função:** Define propriedades configuráveis para cada bloco
```typescript
export const blockDefinitions: BlockDefinition[] = [
  {
    id: 'quiz-start-page',
    type: 'quiz-start-page', 
    name: 'Quiz Início (Etapa 1)',
    propertiesSchema: [/* 13 propriedades */]
  },
  {
    id: 'question-multiple',
    type: 'question-multiple',
    name: 'Pergunta Múltipla Escolha', 
    propertiesSchema: [/* 22 propriedades */]
  },
  // ... 29+ outras definições
];
```

#### **4. Exportações (index.ts)**
**📍 Local:** `/client/src/components/editor/blocks/index.ts`

**🔧 Função:** Exporta todos os componentes para uso
```typescript
// Blocos especiais das etapas do funil
export { default as QuizStartPageBlock } from './QuizStartPageBlock';
export { default as ResultPageBlock } from './ResultPageBlock';
export { default as QuizOfferPageBlock } from './QuizOfferPageBlock';
export { default as QuestionMultipleBlock } from './QuestionMultipleBlock';

// Novos blocos UI/Avançados
export { default as AlertBlock } from './AlertBlock';
// ... 15+ outros blocos
```

### **🚀 COMO OS COMPONENTES APARECEM NO EDITOR**

#### **1. Sidebar de Componentes**
- **Local:** `SchemaDrivenComponentsSidebar`
- **Função:** Lista todos os blocos por categoria
- **Dados:** Vem do `blockDefinitions.ts`

#### **2. Canvas Principal**
- **Local:** `SchemaDrivenEditorLayoutV2` (linha 330)
- **Função:** Renderiza blocos usando `BlockRenderer`
- **Interação:** Clique, seleção, edição inline

#### **3. Painel de Propriedades**
- **Local:** `DynamicPropertiesPanel`
- **Função:** Edita propriedades do bloco selecionado
- **Dados:** Schema do `blockDefinitions.ts`

### **📊 RESUMO DOS COMPONENTES CRIADOS**

#### **✅ BLOCOS ESPECIAIS DO FUNIL (4 blocos):**
1. **QuizStartPageBlock** - Etapa 1 real do funil
2. **ResultPageBlock** - Etapa 20 (página de resultado)
3. **QuizOfferPageBlock** - Etapa 21 (página de oferta)
4. **QuestionMultipleBlock** - Pergunta múltipla escolha completa

#### **✅ BLOCOS UI/AVANÇADOS (16 blocos):**
1. AlertBlock, 2. ArgumentsBlock, 3. AudioBlock, 4. CarouselBlock
5. LoaderBlock, 6. CompareBlock, 7. ConfettiBlock, 8. QuoteBlock
9. FormInputBlock, 10. ChartAreaBlock, 11. ChartLevelBlock, 12. ListBlock
13. MarqueeBlock, 14. OptionsGridBlock, 15. ScriptBlock, 16. TermsBlock

#### **✅ BLOCOS BÁSICOS (11+ blocos existentes):**
HeaderBlock, TextBlock, ImageBlock, ButtonBlock, SpacerBlock, etc.

### **🎯 COMO TESTAR NO EDITOR**

1. **Acessar:** `http://localhost:3000/advanced-editor`
2. **Sidebar:** Escolher categoria (Quiz, UI, Funil, etc.)
3. **Arrastar:** Bloco para o canvas
4. **Editar:** Clicar no bloco para seleção
5. **Configurar:** Usar painel lateral direito
6. **Inline:** Clicar nos textos para edição direta

### **📍 LOCALIZAÇÃO FÍSICA NO PROJETO**

```
/workspaces/quiz-quest-challenge-verse/
├── client/src/app/advanced-editor/page.tsx              (ENTRADA)
├── client/src/components/editor/
│   ├── SchemaDrivenEditorLayoutV2.tsx                   (EDITOR PRINCIPAL)
│   └── blocks/
│       ├── BlockRenderer.tsx                            (MAPEAMENTO)
│       ├── index.ts                                     (EXPORTAÇÕES) 
│       ├── QuizStartPageBlock.tsx                       (ETAPA 1)
│       ├── ResultPageBlock.tsx                          (ETAPA 20)
│       ├── QuizOfferPageBlock.tsx                       (ETAPA 21)
│       ├── QuestionMultipleBlock.tsx                    (PERGUNTA COMPLETA)
│       └── 16 outros blocos UI/Avançados...
└── client/src/config/blockDefinitions.ts               (SCHEMAS)
```

**Status: ✅ TODOS OS 31+ COMPONENTES ESTÃO INTEGRADOS E FUNCIONANDO NO EDITOR**
