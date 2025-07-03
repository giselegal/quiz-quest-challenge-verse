# 🚨 CORREÇÕES NECESSÁRIAS NO EDITOR

## ❌ PROBLEMAS ATUAIS IDENTIFICADOS:

### 1. **FunnelStepsColumn não integrado**
- Criamos o componente `FunnelStepsColumn.tsx` mas ele não está sendo usado no `SimpleDragDropEditor.tsx`
- A primeira coluna ainda mostra a lista genérica antiga

### 2. **Componentes não mapeiam as etapas reais**
- Ao clicar em uma etapa, não carrega os componentes específicos automaticamente
- QuizIntro deveria ter: Logo, Título, Subtítulo, Input (nome), Botão
- Questões deveriam ter: Título da questão + 8 opções específicas + progress

### 3. **Painel de propriedades muito genérico**
- Só edita texto/imagem básico
- Não tem editores específicos para cada tipo de etapa
- Questões precisam de editor para: título, opções, imagens, pontuação

### 4. **Canvas não reflete a realidade**
- Não mostra como realmente aparece no `/quiz`
- Falta layout específico para cada tipo de etapa

## ✅ SOLUÇÕES NECESSÁRIAS:

### 1. **Integrar FunnelStepsColumn**
```tsx
// Substituir primeira coluna por:
import FunnelStepsColumn from './FunnelStepsColumn';

<FunnelStepsColumn 
  onStepSelect={handleStepSelect}
  selectedStepId={selectedStepId}
/>
```

### 2. **Criar função handleStepSelect**
```tsx
const handleStepSelect = (step) => {
  // Criar página baseada na etapa selecionada
  const page = createPageFromRealStep(step);
  setCurrentFunnel(prev => ({
    ...prev,
    pages: [...prev.pages, page]
  }));
  setCurrentPageIndex(prev.pages.length);
};
```

### 3. **Melhorar createPageFromRealStep**
Cada etapa deve criar os componentes específicos:

#### QuizIntro:
- Logo component
- Title: "Descubra Seu Estilo Pessoal"  
- Subtitle: "Chega de um guarda-roupa lotado..."
- Input: nome
- Button: "COMEÇAR AGORA"

#### Q1-Q10:
- Title: pergunta específica
- 8 Option components (com imagem se type="both")
- Progress component

#### Transições:
- Title: texto específico
- Description: texto longo
- Button: CTA

### 4. **Criar editores específicos**
```tsx
const renderQuestionEditor = (component) => {
  // Editor específico para questões
  // - Editar título da questão
  // - Editar 8 opções
  // - Configurar imagens
  // - Configurar pontuação
};

const renderQuizIntroEditor = (component) => {
  // Editor específico para QuizIntro
  // - Editar título/subtítulo
  // - Placeholder do input
  // - Texto do botão
  // - Logo/imagens
};
```

### 5. **Preview real no canvas**
```tsx
const renderRealPreview = (step) => {
  // Renderizar exatamente como aparece no /quiz
  // Usar os mesmos componentes e estilos
  // QuizIntro real, QuizContent real, etc.
};
```

## 🎯 RESULTADO ESPERADO:

1. **Clicar numa etapa** → Carrega componentes específicos no canvas
2. **Canvas mostra preview real** → Idêntico ao /quiz funcionante  
3. **Propriedades específicas** → Editor customizado para cada tipo
4. **Totalmente editável** → Todos os textos, imagens, opções configuráveis

## 📋 PRÓXIMOS PASSOS:

1. ✅ Integrar FunnelStepsColumn no SimpleDragDropEditor
2. ✅ Implementar handleStepSelect 
3. ✅ Melhorar createPageFromRealStep com componentes específicos
4. ✅ Criar editores específicos no painel de propriedades
5. ✅ Implementar preview real no canvas
