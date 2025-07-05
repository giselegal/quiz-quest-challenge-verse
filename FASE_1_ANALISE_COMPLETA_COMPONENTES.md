# MAPEAMENTO COMPLETO DOS COMPONENTES - FASE 1 ANÁLISE

## 📊 TIPOS DE BLOCO IDENTIFICADOS NO EDITOR ATUAL

### CATEGORIA: BÁSICOS
1. **header** - Cabeçalho principal
2. **text** - Texto simples
3. **image** - Imagem
4. **button** - Botão de ação
5. **spacer** - Espaçador

### CATEGORIA: FORMULÁRIOS E INPUTS
6. **form-input** - Campo de entrada genérico
7. **email-input** - Campo de email
8. **phone-input** - Campo de telefone

### CATEGORIA: QUIZ ESPECÍFICO
9. **quiz-intro-section** - Seção de introdução do quiz
10. **question-multiple** - Pergunta múltipla escolha
11. **strategic-question** - Pergunta estratégica
12. **quiz-progress-bar** - Barra de progresso
13. **quiz-navigation-controls** - Controles de navegação
14. **quiz-transition-page** - Página de transição

### CATEGORIA: LOADING E TRANSIÇÕES
15. **loader** - Carregamento simples
16. **loading-animation** - Animação de carregamento
17. **transition-text** - Texto de transição

### CATEGORIA: VENDAS E CONVERSÃO
18. **price** - Exibição de preço
19. **sales-offer** - Oferta de vendas
20. **countdown** - Contador regressivo
21. **countdown-timer-component-real** - Timer real
22. **offer-button-component-real** - Botão de oferta

### CATEGORIA: SOCIAL PROOF
23. **testimonial** - Depoimento individual
24. **testimonials-grid** - Grade de depoimentos
25. **testimonials-component-real** - Depoimentos reais
26. **social-proof** - Prova social genérica

### CATEGORIA: GARANTIAS E CONFIANÇA
27. **guarantee** - Garantia simples
28. **guarantee-section** - Seção de garantia
29. **guarantee-component-real** - Garantia real
30. **secure-purchase-component-real** - Compra segura

### CATEGORIA: RESULTADOS
31. **style-result-display** - Exibição de resultado de estilo
32. **header-component-real** - Cabeçalho real da página resultado
33. **card-component-real** - Card de resultado
34. **secondary-styles-component-real** - Estilos secundários
35. **before-after-component-real** - Antes e depois

### CATEGORIA: MOTIVAÇÃO E BENEFÍCIOS
36. **bonus** - Bônus simples
37. **bonus-component-real** - Seção de bônus real
38. **motivation-component-real** - Seção motivacional
39. **guides-benefits-section-real** - Benefícios dos guias

### CATEGORIA: INFORMAÇÕES E FAQ
40. **faq** - Perguntas frequentes
41. **video** - Player de vídeo

### CATEGORIA: COMPONENTES ESPECÍFICOS RESULTADO
42. **button-component-real** - Botão da página resultado
43. **mentor-component-real** - Seção do mentor
44. **vista-se-section-real** - Seção "vista-se"
45. **value-stack-component-real** - Stack de valor
46. **custom-styles-component-real** - Estilos customizados
47. **fixed-intro-image-component-real** - Imagem fixa intro
48. **section-title-component-real** - Título de seção
49. **problem-section-component-real** - Seção do problema
50. **solution-section-component-real** - Seção da solução
51. **pricing-section-component-real** - Seção de preços

## 🔍 ANÁLISE POR ETAPA DO FUNIL

### ETAPA 1: QUIZ INTRO
**Componentes utilizados:**
- quiz-intro-section
- header
- text
- button
- fixed-intro-image-component-real

**Funcionalidades:**
- Captura de nome
- Call-to-action para iniciar
- Imagem de fundo fixa
- Design responsivo

### ETAPA 2-10: QUESTÕES DO QUIZ
**Componentes utilizados:**
- question-multiple
- quiz-progress-bar
- quiz-navigation-controls
- image
- text

**Funcionalidades:**
- Múltipla escolha com/sem imagens
- Progresso visual
- Navegação anterior/próximo
- Validação de respostas

### ETAPA 11: TRANSIÇÃO PRINCIPAL
**Componentes utilizados:**
- quiz-transition-page
- loader
- loading-animation
- transition-text

**Funcionalidades:**
- Animação de carregamento
- Mensagens motivacionais
- Transição suave

### ETAPA 12-17: QUESTÕES ESTRATÉGICAS
**Componentes utilizados:**
- strategic-question
- quiz-progress-bar
- text
- button

**Funcionalidades:**
- Perguntas mais focadas
- Captura de dados específicos
- Progresso continuado

### ETAPA 18: PÁGINA DE RESULTADO
**Componentes utilizados:**
- header-component-real
- card-component-real
- secondary-styles-component-real
- before-after-component-real
- motivation-component-real
- bonus-component-real
- button-component-real

**Funcionalidades:**
- Exibição do resultado calculado
- Estilos secundários recomendados
- Motivação personalizada
- Call-to-action para venda

### ETAPA 19: PÁGINA DE VENDAS
**Componentes utilizados:**
- sales-offer
- pricing-section-component-real
- testimonials-component-real
- guarantee-component-real
- secure-purchase-component-real
- countdown-timer-component-real
- value-stack-component-real
- mentor-component-real

**Funcionalidades:**
- Apresentação da oferta
- Prova social
- Garantias
- Urgência
- Call-to-action final

## 📋 PROPRIEDADES PRINCIPAIS IDENTIFICADAS

### Propriedades Comuns
```typescript
interface CommonBlockProps {
  id: string;
  type: string;
  content?: {
    title?: string;
    text?: string;
    subtitle?: string;
    backgroundColor?: string;
    textColor?: string;
    alignment?: 'left' | 'center' | 'right';
    fontSize?: string;
    fontWeight?: string;
    padding?: string;
    margin?: string;
  };
  style?: Record<string, any>;
  visible?: boolean;
  order?: number;
}
```

### Propriedades Específicas Quiz
```typescript
interface QuizBlockProps extends CommonBlockProps {
  questionData?: {
    question: string;
    options: QuizOption[];
    multiSelect?: boolean;
    required?: boolean;
    category?: string;
  };
  navigationData?: {
    showPrevious?: boolean;
    showNext?: boolean;
    showProgress?: boolean;
    progressPercent?: number;
  };
}
```

### Propriedades Específicas Resultado
```typescript
interface ResultBlockProps extends CommonBlockProps {
  resultData?: {
    styleType?: string;
    personalizedContent?: boolean;
    showSecondaryStyles?: boolean;
    beforeAfterImages?: string[];
    motivationText?: string;
  };
}
```

### Propriedades Específicas Vendas
```typescript
interface SalesBlockProps extends CommonBlockProps {
  salesData?: {
    productName?: string;
    originalPrice?: number;
    currentPrice?: number;
    discount?: number;
    testimonials?: TestimonialData[];
    guaranteeText?: string;
    urgencyTimer?: number;
    features?: string[];
  };
}
```

## 🎯 PRÓXIMOS PASSOS IDENTIFICADOS

### PRIORIDADE 1: SCHEMAS CRÍTICOS
1. **Quiz Intro Schema** - Base para captura inicial
2. **Quiz Question Schema** - Core do quiz
3. **Result Display Schema** - Apresentação de resultados
4. **Sales Funnel Schema** - Conversão final

### PRIORIDADE 2: COMPONENTES CRÍTICOS
1. **QuizIntroBlock** - Entrada do funil
2. **QuizQuestionBlock** - Perguntas dinâmicas  
3. **ResultDisplayBlock** - Resultado personalizado
4. **SalesOfferBlock** - Oferta principal

### PRIORIDADE 3: SISTEMA DE FLUXO
1. **Step Navigation** - Navegação entre etapas
2. **Progress Tracking** - Acompanhamento do progresso
3. **Data Persistence** - Salvar respostas do usuário
4. **Result Calculation** - Cálculo do resultado

## ✅ ANÁLISE FASE 1 COMPLETA

**RESUMO:**
- ✅ 51 tipos de blocos identificados
- ✅ 19 etapas do funil mapeadas
- ✅ Propriedades principais extraídas
- ✅ Dependências identificadas

**PRÓXIMO PASSO:** 
Iniciar FASE 2 - Expansão de Schemas com base nesta análise.
