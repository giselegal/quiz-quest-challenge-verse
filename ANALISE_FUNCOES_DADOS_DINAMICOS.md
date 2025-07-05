# FUNÇÕES DE DADOS DINÂMICOS - EDITOR VISUAL QUIZ

## 🔍 ANÁLISE COMPLETA DAS FUNÇÕES

### 📋 **1. FUNÇÕES PARA NOME DO USUÁRIO**

#### **1.1 Contexto de Autenticação (AuthContext)**
- **Arquivo**: `/client/src/context/AuthContext.tsx`
- **Funções principais**:
  - `login(name: string, email?: string)` - Salva nome do usuário
  - `logout()` - Remove dados do usuário
  - **localStorage**: `'userName'`, `'userEmail'`, `'userRole'`

```typescript
// Função para obter nome do usuário
const { user } = useAuth();
const userName = user?.userName || 'Usuário';
```

#### **1.2 Integração no Editor Visual**
- **Arquivo**: `/client/src/components/visual-editor/CaktoQuizAdvancedEditorFixed.tsx`
- **Componentes que usam userName**:
  - `Header` component (linhas 3645): `userName={block?.settings?.userName || 'Usuário'}`
  - `result-header-component` (linhas 3641-3649)
  - Painel de propriedades (linhas 6169-6172)

#### **1.3 Páginas que Consomem Nome**
- **ResultPage**: `userName={user?.userName}` (linha 148)
- **QuizContent**: `userName = user?.userName || localStorage.getItem('userName')` (linha 30)

---

### 🎯 **2. FUNÇÕES PARA RESULTADOS DO TESTE**

#### **2.1 Lógica Principal (useQuizLogic)**
- **Arquivo**: `/client/src/hooks/useQuizLogic.ts`
- **Função chave**: `calculateResults(clickOrderInternal: string[] = [])`

```typescript
const calculateResults = useCallback((clickOrderInternal: string[] = []) => {
  const styleCounter: Record<string, number> = {
    Natural: 0, Clássico: 0, Contemporâneo: 0, Elegante: 0,
    Romântico: 0, Sexy: 0, Dramático: 0, Criativo: 0,
  };
  
  // Conta pontuações por estilo baseado nas respostas
  Object.entries(answers).forEach(([questionId, optionIds]) => {
    // ... lógica de contagem
  });
  
  // Ordena resultados e define primário/secundários
  const primaryStyle = styleResults[0] || null;
  const secondaryStyles = styleResults.slice(1);
  
  // Salva no localStorage
  localStorage.setItem("quizResult", JSON.stringify(result));
  
  return result;
}, [answers, strategicAnswers]);
```

#### **2.2 Hook de Consumo (useQuiz)**
- **Arquivo**: `/client/src/hooks/useQuiz.ts`
- **Função**: `getQuizResult()` - Recupera do localStorage

```typescript
const getQuizResult = (): { primaryStyle: StyleResult; secondaryStyles: StyleResult[] } | null => {
  try {
    const savedResult = localStorage.getItem('quizResult');
    if (savedResult) {
      return JSON.parse(savedResult);
    }
    return null;
  } catch (error) {
    console.error('Error loading quiz result:', error);
    return null;
  }
};
```

#### **2.3 Integração no Editor Visual**
- **Componentes que usam resultados**:
  - `result-style-card-component` - Exibe estilo predominante
  - `secondary-styles-component` - Exibe estilos secundários
  - **Dados hardcoded no editor**: `primaryStyle: 'Elegante Clássica'`

---

### 🖼️ **3. FUNÇÕES PARA IMAGENS DOS ESTILOS**

#### **3.1 Configuração de Estilos (styleConfig)**
- **Arquivo**: `/client/src/config/styleConfig.ts`
- **Estrutura**:

```typescript
export const styleConfig = {
  Natural: {
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/2_ziffwx.webp',
    guideImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071344/GUIA_NATURAL_fzp6fc.webp',
    description: 'Você valoriza o conforto e a praticidade...'
  },
  Elegante: {
    image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/14_l2nprc.webp',
    guideImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071342/GUIA_ELEGANTE_asez1q.webp',
    description: 'Você tem um olhar refinado para detalhes sofisticados...'
  },
  // ... outros estilos
};
```

#### **3.2 Funções Utilitárias (styleUtils)**
- **Arquivo**: `/client/src/utils/styleUtils.ts`
- **Função**: `getStyleConfig(category: StyleCategory)`

```typescript
export const getStyleConfig = (category: StyleCategory) => {
  // Retorna configuração completa do estilo incluindo imagens
};
```

#### **3.3 Funções de Busca de Imagem**
- **Arquivo**: `/client/src/components/editor/blocks/StyleResultPreview.tsx`
- **Função**: `getStyleImage(styleType: string)`

```typescript
const getStyleImage = (styleType: string): string => {
  const styleImages = {
    'Elegante': 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/...',
    'Contemporâneo': '...',
    // ... outros estilos
  };
  
  return customImage || styleImages[styleType] || defaultImage;
};
```

---

## 🔗 **4. INTEGRAÇÃO ATUAL NO EDITOR VISUAL**

### **4.1 Problemas Identificados**

#### **❌ Dados Estáticos no Editor**
```typescript
// Linha 437-438 - DADOS HARDCODED
userName: 'Usuário',
primaryStyle: 'Elegante Clássica'

// Linha 450 - IMAGEM HARDCODED
styleImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/15_xezvcy.webp',
```

#### **❌ Falta de Sincronização Dinâmica**
- Editor não usa `useAuth()` para nome real do usuário
- Editor não usa `useQuiz()` para resultado real do teste
- Editor não usa `styleConfig` para imagens dinâmicas

### **4.2 Dados Usados Atualmente**

#### **No Editor Visual**:
- `block?.settings?.userName` (editável via painel)
- `block?.settings?.primaryStyle` (editável via painel)
- `block?.settings?.styleImage` (editável via painel)

#### **Nas Páginas Reais**:
- `user?.userName` (via AuthContext)
- `primaryStyle` (via useQuiz)
- `styleConfig[category].image` (via styleConfig)

---

## 📝 **5. FUNÇÕES NECESSÁRIAS PARA INTEGRAÇÃO DINÂMICA**

### **5.1 Função para Sincronizar Nome do Usuário**
```typescript
const getUserName = (): string => {
  const { user } = useAuth();
  return user?.userName || localStorage.getItem('userName') || 'Usuário';
};
```

### **5.2 Função para Sincronizar Resultado do Quiz**
```typescript
const getQuizResultData = () => {
  const { primaryStyle, secondaryStyles } = useQuiz();
  return {
    primaryStyle: primaryStyle?.category || 'Elegante',
    percentage: primaryStyle?.percentage || 92,
    secondaryStyles: secondaryStyles || []
  };
};
```

### **5.3 Função para Obter Imagem do Estilo**
```typescript
const getStyleImageUrl = (styleCategory: string): string => {
  return styleConfig[styleCategory]?.image || 
         'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/15_xezvcy.webp';
};

const getStyleGuideImage = (styleCategory: string): string => {
  return styleConfig[styleCategory]?.guideImage || 
         'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071347/MOCKUP_TABLETE_-_GUIA_DE_IMAGEM_E_ESTILO_ncctzi.webp';
};
```

---

## 🚀 **6. PRÓXIMOS PASSOS PARA INTEGRAÇÃO DINÂMICA**

### **6.1 Implementar Hook de Dados Dinâmicos**
```typescript
// /client/src/hooks/useDynamicEditorData.ts
export const useDynamicEditorData = () => {
  const { user } = useAuth();
  const { primaryStyle, secondaryStyles } = useQuiz();
  
  return {
    userName: user?.userName || 'Usuário',
    primaryStyle: primaryStyle?.category || 'Elegante',
    stylePercentage: primaryStyle?.percentage || 92,
    styleImage: styleConfig[primaryStyle?.category]?.image,
    guideImage: styleConfig[primaryStyle?.category]?.guideImage,
    secondaryStyles: secondaryStyles || []
  };
};
```

### **6.2 Atualizar Editor para Usar Dados Dinâmicos**
- Substituir valores hardcoded por dados dinâmicos
- Adicionar toggle "Usar dados reais" vs "Dados de exemplo"
- Implementar preview com dados reais

### **6.3 Criar Sistema de Preview Dinâmico**
- Botão "Preview com dados reais"
- Sincronização automática quando dados mudam
- Cache inteligente de imagens

---

## 📊 **RESUMO FUNCIONAL**

| Função | Localização | Status | Integração Editor |
|--------|-------------|--------|-------------------|
| `getUserName()` | AuthContext | ✅ Implementada | ❌ Não integrada |
| `getQuizResult()` | useQuiz | ✅ Implementada | ❌ Não integrada |
| `getStyleImage()` | styleConfig | ✅ Implementada | ❌ Não integrada |
| `calculateResults()` | useQuizLogic | ✅ Implementada | ❌ Não integrada |
| Sincronização Dinâmica | - | ❌ Não existe | ❌ Necessária |

**Conclusão**: Todas as funções de dados dinâmicos existem, mas não estão integradas ao editor visual. É necessário criar um sistema de sincronização entre dados reais e editor.
