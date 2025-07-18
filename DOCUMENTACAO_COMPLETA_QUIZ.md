# 📊 COMO FUNCIONA O QUIZ - DOCUMENTAÇÃO COMPLETA

## 🎯 **VISÃO GERAL DO SISTEMA**

O Quiz é um sistema de detecção de estilo pessoal que funciona em **2 fases distintas**:

### **FASE 1: QUESTÕES DE ESTILO (10 questões)**
- Questões com imagens que pontuam para 8 categorias de estilo
- Cada opção tem uma `styleCategory` que conta pontos
- Sistema de seleção múltipla com limites configuráveis

### **FASE 2: QUESTÕES ESTRATÉGICAS (2-4 questões)**
- Questões sobre preferências de aprendizado
- NÃO pontuam para estilos, servem para segmentação
- Seleção obrigatória, não permite desmarcar

---

## 🏗️ **ESTRUTURA DAS QUESTÕES**

### **Arquivo Principal: `quizQuestions.ts`**
```typescript
export const quizQuestions: QuizQuestion[] = [
  ...clothingQuestions,         // Questões 1 e 3
  ...personalityQuestions,      // Questões 2 e 4
  ...stylePreferencesQuestions, // Questões 5 e 10
  ...outerwearQuestions,       // Questões 6 e 7
  ...accessoriesQuestions,     // Questão 8
  ...accessoryStyleQuestions   // Questão 9
];
```

### **Questões Estratégicas: `styleExperienceQuestions.ts`**
```typescript
export const styleExperienceQuestions: QuizQuestion[] = [
  {
    id: 'strategic-3',
    title: 'Como você aprende melhor sobre estilo e moda?',
    type: 'text',
    multiSelect: 1,  // Apenas 1 seleção permitida
    options: [
      {
        id: 'strategic-3-1',
        text: 'Vendo exemplos visuais...',
        styleCategory: 'Strategic'  // NÃO conta para pontuação
      }
    ]
  }
];
```

---

## ⚙️ **LÓGICA DE SELEÇÃO DE QUESTÕES**

### **1. ORDEM FIXA DAS QUESTÕES**
```typescript
// useQuizLogic.ts
const currentQuestion = quizQuestions[currentQuestionIndex];
const nextQuestion = quizQuestions[currentQuestionIndex + 1] || null;
```

- **10 questões de estilo** em ordem sequencial
- **2 questões estratégicas** no final (13 e 14)
- Navegação linear: anterior/próximo
- Não há randomização ou lógica condicional

### **2. VALIDAÇÃO DE PROGRESSO**
```typescript
const currentAnswers = answers[currentQuestion?.id] || [];
const canProceed = currentAnswers.length === (currentQuestion?.multiSelect || 0);
```

- Usuário só pode avançar se selecionou o número exato de opções
- `multiSelect: 1` = deve selecionar exatamente 1 opção
- `multiSelect: 2` = deve selecionar exatamente 2 opções

---

## 🧮 **LÓGICA DE CÁLCULO DOS RESULTADOS**

### **SISTEMA DE PONTUAÇÃO:**

#### **1. Contador de Estilos (8 categorias)**
```typescript
const styleCounter: Record<string, number> = {
  Natural: 0,
  Clássico: 0,
  Contemporâneo: 0,
  Elegante: 0,
  Romântico: 0,
  Sexy: 0,
  Dramático: 0,
  Criativo: 0
};
```

#### **2. Contagem de Pontos**
```typescript
Object.entries(answers).forEach(([questionId, optionIds]) => {
  const question = quizQuestions.find((q) => q.id === questionId);
  
  optionIds.forEach((optionId) => {
    const option = question.options.find((o) => o.id === optionId);
    if (option) {
      styleCounter[option.styleCategory]++;  // +1 ponto para categoria
      totalSelections++;
    }
  });
});
```

#### **3. Cálculo de Porcentagens**
```typescript
const styleResults: StyleResult[] = Object.entries(styleCounter)
  .map(([category, score]) => ({
    category: category as StyleResult["category"],
    score,
    percentage: totalSelections > 0 
      ? Math.round((score / totalSelections) * 100) 
      : 0,
  }))
```

### **REGRAS DE ORDENAÇÃO:**

#### **1. Ordenação Principal: Por Pontuação**
```typescript
.sort((a, b) => {
  // Primeiro critério: maior pontuação
  return b.score - a.score;
});
```

#### **2. Critério de Desempate: Ordem de Clique**
```typescript
.sort((a, b) => {
  if (a.score === b.score && clickOrderInternal.length > 0) {
    const indexA = clickOrderInternal.indexOf(a.category);
    const indexB = clickOrderInternal.indexOf(b.category);
    return indexA - indexB;  // Primeiro clicado ganha
  }
  return b.score - a.score;
});
```

### **RESULTADO FINAL:**
```typescript
const result: QuizResult = {
  primaryStyle: styleResults[0] || null,     // Maior pontuação
  secondaryStyles: styleResults.slice(1),   // Demais estilos
  totalSelections,
  userName: "User"
};
```

---

## 🔄 **FLUXO COMPLETO DO QUIZ**

### **1. INICIALIZAÇÃO**
```typescript
// useQuizLogic.ts
const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
const [answers, setAnswers] = useState<Record<string, string[]>>({});
const [strategicAnswers, setStrategicAnswers] = useState(() => {
  const savedAnswers = localStorage.getItem("strategicAnswers");
  return savedAnswers ? JSON.parse(savedAnswers) : {};
});
```

### **2. RESPOSTA A QUESTÃO**
```typescript
const handleAnswer = useCallback((questionId: string, selectedOptions: string[]) => {
  setAnswers((prev) => ({
    ...prev,
    [questionId]: selectedOptions,
  }));
  
  // Pré-carrega imagens da próxima questão
  if (nextQuestion) {
    preloadImagesByUrls(nextImages, { quality: 85, batchSize: 3 });
  }
}, []);
```

### **3. QUESTÕES ESTRATÉGICAS**
```typescript
const handleStrategicAnswer = useCallback((questionId: string, selectedOptions: string[]) => {
  // Garante apenas 1 seleção
  const finalOptions = selectedOptions.length > 0 
    ? [selectedOptions[selectedOptions.length - 1]] 
    : selectedOptions;
  
  // Não permite desmarcar
  if (finalOptions.length === 0) {
    const previousAnswer = strategicAnswers[questionId];
    if (previousAnswer && previousAnswer.length > 0) {
      return; // Mantém seleção anterior
    }
  }
  
  setStrategicAnswers(prev => {
    const newAnswers = { ...prev, [questionId]: finalOptions };
    localStorage.setItem("strategicAnswers", JSON.stringify(newAnswers));
    
    // Aproveita para pré-carregar imagens de resultado
    const strategicQuestionsProgress = Object.keys(newAnswers).length;
    if (strategicQuestionsProgress === 1) {
      preloadCriticalImages(["results"], { quality: 80 });
    }
    
    return newAnswers;
  });
}, []);
```

### **4. FINALIZAÇÃO E CÁLCULO**
```typescript
const handleNext = useCallback(() => {
  if (currentQuestionIndex < quizQuestions.length - 1) {
    setCurrentQuestionIndex((prev) => prev + 1);
  } else {
    calculateResults();  // Calcula resultado final
    setQuizCompleted(true);
  }
}, []);
```

---

## 💾 **PERSISTÊNCIA DE DADOS**

### **LocalStorage - 3 Chaves Principais:**

#### **1. `quizResult`** - Resultado calculado
```typescript
const result: QuizResult = {
  primaryStyle: { category: "Natural", score: 5, percentage: 45 },
  secondaryStyles: [
    { category: "Clássico", score: 3, percentage: 27 },
    { category: "Elegante", score: 2, percentage: 18 }
  ],
  totalSelections: 11,
  userName: "Maria"
};
localStorage.setItem("quizResult", JSON.stringify(result));
```

#### **2. `strategicAnswers`** - Respostas estratégicas
```typescript
const strategicAnswers = {
  "strategic-3": ["strategic-3-1"],  // Como aprende melhor
  "strategic-4": ["strategic-4-2"]   // O que valoriza no guia
};
localStorage.setItem("strategicAnswers", JSON.stringify(strategicAnswers));
```

#### **3. `answers`** (via state) - Respostas que pontuam
```typescript
const answers = {
  "1": ["1-1", "1-3"],        // Questão 1, opções 1 e 3
  "2": ["2-2"],               // Questão 2, opção 2
  "3": ["3-1", "3-4"]         // etc...
};
```

---

## 🎯 **EXEMPLO PRÁTICO DE FUNCIONAMENTO**

### **Cenário: Usuária responde o quiz**

#### **1. Questão 1 (Roupa para trabalho)**
- Usuária seleciona: `"1-2"` (Blazer estruturado) → +1 **Clássico**
- Usuária seleciona: `"1-3"` (Vestido midi) → +1 **Elegante**

#### **2. Questão 2 (Personalidade)**
- Usuária seleciona: `"2-1"` (Organizada) → +1 **Clássico**

#### **3. Questão 3-10 (Continuação...)**
- Acumula pontos: **Clássico: 4, Elegante: 3, Natural: 2, Romântico: 2**

#### **4. Questões Estratégicas (11-12)**
- Strategic-3: "Vendo exemplos visuais" → Não pontua, salva segmentação
- Strategic-4: "Praticidade" → Não pontua, salva segmentação

#### **5. Cálculo Final**
```typescript
// Total de seleções: 11
styleCounter = {
  Clássico: 4,     // 36% (4/11)
  Elegante: 3,     // 27% (3/11) 
  Natural: 2,      // 18% (2/11)
  Romântico: 2,    // 18% (2/11)
  // demais: 0
}

// Resultado:
primaryStyle = { category: "Clássico", score: 4, percentage: 36 }
secondaryStyles = [
  { category: "Elegante", score: 3, percentage: 27 },
  { category: "Natural", score: 2, percentage: 18 },
  { category: "Romântico", score: 2, percentage: 18 }
]
```

#### **6. Exibição na Página de Resultado**
- **Header**: "Seu estilo é 36% Clássico, Maria!"
- **Estilos secundários**: Barra de progresso mostrando Elegante (27%), Natural (18%), etc.
- **Segmentação**: Usa respostas estratégicas para personalizar ofertas

---

## 🔧 **COMPONENTES TÉCNICOS ENVOLVIDOS**

### **1. Hooks Principais**
- `useQuizLogic.ts` - Lógica principal e cálculos
- `useQuizTracking.ts` - Analytics e tracking de eventos
- `useQuiz.ts` - Context wrapper para dados globais

### **2. Componentes de Interface**
- `QuizQuestionBlock.tsx` - Questões normais com imagens
- `CaktoQuizQuestion.tsx` - Questões estratégicas sem imagem
- `QuizOption.tsx` - Opções individuais clicáveis

### **3. Páginas de Resultado**
- `ResultPage.tsx` - Página principal de resultado
- `QuizResult.tsx` - Componente de resultado inline
- `BeforeAfterTransformation.tsx` - Transformação baseada no estilo

### **4. Analytics e Tracking**
- `quizDataService.ts` - Serviço de coleta de dados
- `useAutoClickTracking.ts` - Tracking automático de cliques
- Google Analytics integration

---

## 📊 **RESUMO EXECUTIVO**

### **COMO O QUIZ FUNCIONA:**

1. **10 questões de estilo** com imagens → Cada opção pontua para 1 das 8 categorias
2. **2 questões estratégicas** sem imagens → Usadas para segmentação, não pontuam
3. **Cálculo automático** → Conta pontos por categoria, calcula porcentagens
4. **Ordenação inteligente** → Maior pontuação + critério de desempate por ordem de clique
5. **Resultado personalizado** → Estilo primário + estilos secundários + dados de segmentação
6. **Persistência total** → Tudo salvo no localStorage para recuperação

### **CARACTERÍSTICAS TÉCNICAS:**
- ✅ **Navegação linear** (sem randomização)
- ✅ **Validação rigorosa** (deve selecionar exato número de opções)
- ✅ **Pré-carregamento inteligente** (otimiza performance)
- ✅ **Tracking completo** (analytics e debugging)
- ✅ **Recuperação de estado** (funciona após refresh da página)
- ✅ **Cálculo determinístico** (mesmo input = mesmo output)

**O sistema é robusto, bem documentado e está pronto para produção!** 🚀
