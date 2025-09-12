# 🔧 TOP 30 TODOs CRÍTICOS - PLANO DE RESOLUÇÃO

## 🎯 PRIORIDADE MÁXIMA - useUnifiedEditor.ts (10 TODOs)

### **ARQUIVO:** `/src/hooks/core/useUnifiedEditor.ts`
**IMPACTO:** 🔴 **CRÍTICO** - Editor principal não funcional

```typescript
// TODOs identificados:
1. deleteFunnel: async () => false, // TODO: Implement
2. updateStage: async () => {}, // TODO: Implement  
3. deleteStage: async () => {}, // TODO: Implement
4. reorderStages: async () => {}, // TODO: Implement
5. deleteBlock: async () => {}, // TODO: Implement
6. duplicateBlock: async () => '', // TODO: Implement
7. reorderBlocks: async () => {}, // TODO: Implement
8. updateBlockProperty: async () => {}, // TODO: Implement
9. updateBlockProperties: async () => {}, // TODO: Implement
10. resetBlockProperties: async () => {}, // TODO: Implement
```

**STATUS:** 🚨 **BLOQUEIO FUNCIONAL** - Essas funções são essenciais para o editor

---

## 🎯 PRIORIDADE ALTA - useStepNavigation.ts (3 TODOs)

### **ARQUIVO:** `/src/hooks/useStepNavigation.ts`
**IMPACTO:** 🟠 **ALTO** - Navegação e lógica de quiz

```typescript
// TODOs identificados:
11. // TODO: Adicionar validações específicas por tipo de etapa
12. // TODO: Implementar algoritmo de análise das respostas  
13. // TODO: Implementar sistema de recomendações baseado no perfil
```

---

## 🎯 OUTROS TODOs CRÍTICOS

### **ARQUIVO:** `/src/hooks/core/useStorage.tsx`
```typescript
14. // TODO: Implementar backup para servidor
15. // TODO: Implementar restore do servidor
```

### **ARQUIVO:** `/src/hooks/index.ts`
```typescript
16. // export { useSupabase } from './useSupabase'; // TODO: Create if needed
```

### **ARQUIVO:** `/src/hooks/useQuizStepsIntegration.ts`
```typescript
17. completedSteps: 0, // TODO: Implementar tracking
18. completion: 0, // TODO: Implementar tracking
```

---

## 🚀 PLANO DE RESOLUÇÃO - HOJE

### **FASE 1 - Implementar useUnifiedEditor (2 horas)**

#### **1.1 Implementar operações de Funnel (30min)**
```typescript
deleteFunnel: async (funnelId: string) => {
  // Implementar delete no Supabase + localStorage
  await supabaseService.deleteFunnel(funnelId);
  localStorage.removeItem(`funnel-${funnelId}`);
  return true;
},
```

#### **1.2 Implementar operações de Stage (45min)**
```typescript
updateStage: async (stageId: string, updates: Partial<Stage>) => {
  // Atualizar stage no contexto + persistência
},
deleteStage: async (stageId: string) => {
  // Remover stage e reorganizar
},
reorderStages: async (stages: Stage[]) => {
  // Reordenar stages
},
```

#### **1.3 Implementar operações de Block (45min)**
```typescript
deleteBlock: async (blockId: string) => {
  // Remover block do stage atual
},
duplicateBlock: async (blockId: string) => {
  // Clonar block com novo ID
  return newBlockId;
},
reorderBlocks: async (blocks: Block[]) => {
  // Reordenar blocks no stage
},
```

### **FASE 2 - Implementar useStepNavigation (1 hora)**

#### **2.1 Validações por tipo de etapa**
```typescript
const validateStep = (stepType: string, data: any) => {
  switch(stepType) {
    case 'quiz-question':
      return validateQuizQuestion(data);
    case 'lead-capture':  
      return validateLeadCapture(data);
    // etc...
  }
};
```

#### **2.2 Algoritmo de análise de respostas**
```typescript
const analyzeResponses = (responses: QuizResponse[]) => {
  // Calcular pontuação por categoria
  // Determinar resultado predominante
  // Gerar insights
};
```

### **FASE 3 - Storage e Tracking (30min)**

#### **3.1 Backup servidor**
```typescript
const backupToServer = async (data: any) => {
  if (supabaseEnabled) {
    await supabase.from('editor_backups').insert(data);
  }
};
```

---

## 📊 IMPACTO ESPERADO

### **Antes:**
- 🚨 **10 funções críticas não funcionais**
- 🔄 **Navegação de etapas limitada**
- 💾 **Sem backup servidor**
- 📊 **Sem tracking de progresso**

### **Depois (3.5 horas de trabalho):**
- ✅ **Editor 100% funcional**
- ✅ **Navegação inteligente**
- ✅ **Backup automático**
- ✅ **Tracking completo**

---

## 🎯 PRÓXIMAS AÇÕES (AGORA)

### **1. Começar implementação useUnifiedEditor**
- Abrir `/src/hooks/core/useUnifiedEditor.ts`
- Implementar `deleteFunnel` primeiro (mais crítico)
- Testar cada função antes de prosseguir

### **2. Cronograma de implementação:**
- **13:00-13:30**: deleteFunnel + updateStage
- **13:30-14:15**: deleteStage + reorderStages  
- **14:15-15:00**: operações de Block
- **15:00-16:00**: useStepNavigation
- **16:00-16:30**: Storage e tracking

**Meta:** Resolver os 18 TODOs mais críticos hoje! 🚀