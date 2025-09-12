# 📋 MATRIZ DE CONSOLIDAÇÃO DE EDITORES

## 🎯 ANÁLISE: 179 arquivos relacionados a editores identificados

### **EDITORES PRINCIPAIS IDENTIFICADOS:**

#### **🥇 NÚCLEO 1 - Editor Principal Unificado**
```
/src/pages/MainEditorUnified.tsx ✅ (Principal)
/src/components/editor/UnifiedEditor.tsx ✅ (Componente Principal)
/src/components/unified-editor/UnifiedVisualEditor.tsx ✅ (Visual)
/src/lovables/UnifiedEditor.tsx (Duplicate? Avaliar)
```

#### **🥈 NÚCLEO 2 - Editor Profissional (Fallback)**
```
/src/components/editor/EditorPro.tsx ✅ (Principal)
/src/legacy/editor/EditorPro.tsx (Legacy - Remover?)
/src/components/editor/EditorPro/* (Submódulos)
```

#### **🥉 NÚCLEO 3 - Editor Simples (Último Recurso)**
```
/src/components/simple-editor/SimpleEditor.tsx ✅ (Principal)
/src/components/editor/EmptyEditor.tsx ✅ (Fallback)
```

---

## 🗑️ CANDIDATOS PARA REMOÇÃO/CONSOLIDAÇÃO

### **A. Editores Duplicados (Consolidar):**
```bash
# Quiz Editors duplicados:
/src/components/QuizEditorIntegration.tsx
/src/components/QuizEditorIntegration_correct.tsx ← Remover
/src/components/editor-fixed/QuizEditorIntegration.tsx ← Consolidar
/src/legacy/editor/QuizEditorPro.tsx ← Mover para legacy

# Result Editors espalhados:
/src/components/result-editor/* (40+ arquivos)
/src/components/result/* ← Consolidar com result-editor

# Property Editors duplicados:
/src/components/editor/properties/editors/* (15+ arquivos)
/src/components/enhanced-editor/properties/editors/* ← Consolidar
```

### **B. Componentes Debug (Organizar):**
```bash
# Mover todos para /debug
/src/components/debug/EditorContextTest.tsx ✅
/src/components/debug/EditorDebugInfo.tsx ✅  
/src/components/debug/EditorFixedStatus.tsx ✅
/src/components/debug/SimpleEditorTest.tsx ✅

# Adicionar ao /debug:
/src/components/editor/demo/EditorShowcase.tsx
/src/components/editor-fixed/EditorFixedMinimal.tsx
```

### **C. Arquivos Legacy (Deprecar):**
```bash
/src/legacy/editor/* ← Já organizados
/src/components/editor/EditorProvider-original-backup.tsx ← Remover
/src/pages/MainEditor.tsx.backup ← Remover
/src/pages/editors-backup/* ← Remover
```

---

## 🎯 PLANO DE CONSOLIDAÇÃO

### **FASE 1 - Limpeza Imediata (Hoje)**
1. ✅ **MainEditor.tsx removido** (Concluído)
2. 🗑️ **Remover arquivos backup** (5 arquivos)
3. 🗑️ **Remover duplicatas óbvias** (3 arquivos)

### **FASE 2 - Organização Debug (Hoje)**
1. 📁 **Criar `/src/components/debug-consolidated/`**
2. 🔄 **Mover 8 componentes debug**
3. 🧹 **Atualizar imports**

### **FASE 3 - Consolidação Property Editors (Amanhã)**
1. 📋 **Consolidar property editors** (30+ arquivos → 10)
2. 🔄 **Unificar result editors** (40+ arquivos → 15)

### **FASE 4 - Núcleos Principais (Esta Semana)**
1. 🥇 **Finalizar UnifiedEditor** como núcleo principal
2. 🥈 **Consolidar EditorPro** como fallback
3. 🥉 **Manter SimpleEditor** como mínimo

---

## 📊 MÉTRICAS DE SUCESSO

### **Antes:**
- 📁 **179 arquivos** relacionados a editor
- 🔄 **20+ editores principais**
- 🗂️ **40+ property editors**
- 🐛 **8 componentes debug espalhados**

### **Depois (Meta):**
- 📁 **≤ 100 arquivos** relacionados a editor
- 🔄 **3 editores principais**
- 🗂️ **≤ 15 property editors**
- 🐛 **Debug centralizado em 1 diretório**

### **Redução esperada:** ~45% dos arquivos de editor

---

## 🚀 PRÓXIMAS AÇÕES (HOJE)

### **1. Limpeza Imediata (15 min)**
```bash
# Remover backups e duplicatas
rm /src/components/editor/EditorProvider-original-backup.tsx
rm /src/pages/MainEditor.tsx.backup
rm /src/components/QuizEditorIntegration_correct.tsx
```

### **2. Organizar Debug (30 min)**
```bash
# Criar diretório consolidado
mkdir /src/components/debug-consolidated
# Mover e atualizar imports
```

### **3. Identificar TODOs Críticos (45 min)**
```bash
# Encontrar os 30 TODOs mais importantes
grep -r "TODO" /src --include="*.tsx" --include="*.ts" | head -30
```

**Total estimado hoje: 1h 30min** para completar Prioridade 1A ✅