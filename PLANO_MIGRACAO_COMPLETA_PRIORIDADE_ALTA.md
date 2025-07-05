# PLANO DE MIGRAÇÃO COMPLETA - PRIORIDADE ALTA

## 🎯 OBJETIVO
Migrar todo o sistema existente do editor CaktoQuiz para o novo sistema schema-driven V2, mantendo todas as funcionalidades e etapas do projeto.

## 📋 ESTADO ATUAL IDENTIFICADO

### Editores Existentes
1. **CaktoQuizAdvancedEditorFixed.tsx** (7488 linhas) - Editor principal atual
2. **UnifiedEditor.tsx** - Editor unificado com quiz/result/sales
3. **QuizEditor.tsx** - Editor específico de perguntas
4. **TypeformEditor.tsx** - Editor de formulários

### Etapas do Projeto Mapeadas
1. **Quiz Intro** (LIVE_QUIZ_INTRO)
2. **9 Questões Quiz** (LIVE_QUIZ_QUESTIONS)
3. **Transição Principal** (LIVE_MAIN_TRANSITION)
4. **6 Questões Estratégicas** (LIVE_STRATEGIC_QUESTIONS)
5. **Resultado Final** (resultado page)
6. **Página de Vendas** (sales funnel)

### Componentes Específicos
- QuizIntroBlock, StartButtonBlock, QuizBenefitsBlock
- Header, SecondaryStylesSection, BeforeAfterTransformation
- MotivationSection, BonusSection, Testimonials
- SecurePurchaseElement, GuaranteeSection, MentorSection

## 🚀 PLANO DE MIGRAÇÃO EM FASES

### FASE 1: ANÁLISE E MAPEAMENTO (2-3 horas)
1. **Extrair Schemas dos Editores Existentes**
   - Mapear todos os tipos de bloco do CaktoQuizAdvancedEditorFixed
   - Documentar propriedades e estruturas de dados
   - Identificar dependências entre componentes

2. **Mapear Etapas do Funil**
   - Quiz Intro → Schema-driven blocks
   - Questões Quiz → Dynamic question blocks
   - Transições → Transition blocks
   - Resultado → Result page blocks
   - Vendas → Sales funnel blocks

### FASE 2: EXPANSÃO DE SCHEMAS (4-5 horas)
1. **Expandir blockDefinitions.ts**
   - Adicionar todos os blocos específicos do quiz
   - Criar schemas para questões dinâmicas
   - Definir blocos de transição e resultado

2. **Criar Novos Tipos de Bloco**
   - QuizIntroBlock schema
   - QuizQuestionBlock schema
   - TransitionBlock schema
   - ResultBlock schema variants
   - SalesBlock schema variants

### FASE 3: MIGRAÇÃO DE COMPONENTES (6-8 horas)
1. **Migrar Componentes de Quiz**
   - QuizIntroBlock → Schema-driven
   - QuizQuestionBlock → Dynamic questions
   - TransitionBlock → Animated transitions

2. **Migrar Componentes de Resultado**
   - Header, SecondaryStyles, BeforeAfter
   - Motivation, Bonus, Testimonials
   - SecurePurchase, Guarantee, Mentor

3. **Migrar Componentes de Vendas**
   - Product offers, pricing tables
   - Call-to-action blocks
   - Trust signals

### FASE 4: INTEGRAÇÃO COMPLETA (3-4 horas)
1. **Atualizar Editor Principal**
   - Integrar todos os novos schemas
   - Configurar fluxo completo do funil
   - Implementar navegação entre etapas

2. **Sistema de Etapas**
   - Wizard de criação de funil
   - Preview de cada etapa
   - Publicação do funil completo

### FASE 5: TESTE E REFINAMENTO (2-3 horas)
1. **Testes de Integração**
   - Fluxo completo do quiz
   - Persistência de dados
   - Navegação entre etapas

2. **Otimizações**
   - Performance
   - UX/UI polish
   - Error handling

## 📝 IMPLEMENTAÇÃO DETALHADA

### 1. PRIMEIRO PASSO - EXPANDIR SCHEMAS
```typescript
// Adicionar ao blockDefinitions.ts
export const QUIZ_BLOCK_DEFINITIONS = [
  {
    type: 'quiz-intro',
    name: 'Quiz Introdução',
    description: 'Tela inicial do quiz com call-to-action',
    category: 'quiz',
    icon: 'target',
    propertiesSchema: [
      {
        key: 'title',
        label: 'Título Principal',
        type: 'text',
        defaultValue: 'Descubra Seu Estilo Pessoal'
      },
      {
        key: 'subtitle', 
        label: 'Subtítulo',
        type: 'textarea',
        defaultValue: 'Um quiz personalizado para descobrir seu estilo único'
      },
      {
        key: 'buttonText',
        label: 'Texto do Botão',
        type: 'text',
        defaultValue: 'Iniciar Quiz'
      },
      {
        key: 'backgroundColor',
        label: 'Cor de Fundo',
        type: 'color',
        defaultValue: '#faf8f5'
      }
    ]
  },
  {
    type: 'quiz-question',
    name: 'Questão do Quiz',
    description: 'Bloco de pergunta com opções',
    category: 'quiz',
    icon: 'help-circle',
    propertiesSchema: [
      {
        key: 'question',
        label: 'Pergunta',
        type: 'textarea',
        defaultValue: 'Qual seu estilo preferido?'
      },
      {
        key: 'options',
        label: 'Opções',
        type: 'array-editor',
        defaultValue: [],
        itemSchema: [
          { key: 'text', label: 'Texto', type: 'text' },
          { key: 'image', label: 'Imagem', type: 'image' },
          { key: 'points', label: 'Pontos', type: 'number' }
        ]
      },
      {
        key: 'multiSelect',
        label: 'Múltipla Escolha',
        type: 'boolean',
        defaultValue: false
      }
    ]
  }
  // ... mais definições
];
```

### 2. SEGUNDO PASSO - MIGRAR COMPONENTES
```typescript
// Criar QuizIntroBlock.tsx schema-driven
import { BlockComponentProps } from '@/types/blocks';

export const QuizIntroBlock: React.FC<BlockComponentProps> = ({ 
  block, 
  isEditing, 
  onPropertyChange 
}) => {
  const { title, subtitle, buttonText, backgroundColor } = block.properties;
  
  return (
    <div 
      className="quiz-intro-block min-h-screen flex items-center justify-center"
      style={{ backgroundColor }}
    >
      <div className="text-center max-w-2xl mx-auto p-8">
        <InlineEditableText
          value={title}
          onChange={(value) => onPropertyChange('title', value)}
          className="text-4xl font-bold mb-4"
          isEditing={isEditing}
        />
        <InlineEditableText
          value={subtitle}
          onChange={(value) => onPropertyChange('subtitle', value)}
          className="text-xl mb-8"
          isEditing={isEditing}
        />
        <button className="btn-primary">
          <InlineEditableText
            value={buttonText}
            onChange={(value) => onPropertyChange('buttonText', value)}
            isEditing={isEditing}
          />
        </button>
      </div>
    </div>
  );
};
```

### 3. TERCEIRO PASSO - SISTEMA DE ETAPAS
```typescript
// Criar FunnelStepsManager.tsx
interface FunnelStep {
  id: string;
  name: string;
  type: 'quiz-intro' | 'quiz-questions' | 'transition' | 'result' | 'sales';
  blocks: BlockData[];
  config: any;
}

export const FunnelStepsManager: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<FunnelStep[]>([]);
  
  // Navegação entre etapas
  // Preview de cada etapa
  // Configuração específica por tipo
  
  return (
    <div className="funnel-steps-manager">
      <StepsNavigation 
        steps={steps}
        currentStep={currentStep}
        onStepChange={setCurrentStep}
      />
      <StepEditor
        step={steps[currentStep]}
        onStepUpdate={(updatedStep) => updateStep(currentStep, updatedStep)}
      />
    </div>
  );
};
```

## ⏰ CRONOGRAMA ESTIMADO

| Fase | Duração | Descrição |
|------|---------|-----------|
| 1 | 2-3h | Análise e mapeamento |
| 2 | 4-5h | Expansão de schemas |
| 3 | 6-8h | Migração de componentes |
| 4 | 3-4h | Integração completa |
| 5 | 2-3h | Teste e refinamento |
| **Total** | **17-23h** | **Migração completa** |

## 🎯 PRÓXIMOS PASSOS IMEDIATOS

### PASSO 1 - ANÁLISE (AGORA)
1. Extrair todos os tipos de bloco do CaktoQuizAdvancedEditorFixed
2. Mapear propriedades de cada componente
3. Documentar fluxo atual das etapas

### PASSO 2 - EXPANSÃO SCHEMAS (PRÓXIMO)
1. Expandir blockDefinitions.ts com blocos de quiz
2. Criar schemas para questões dinâmicas
3. Definir tipos para cada etapa do funil

### PASSO 3 - COMPONENTES CRÍTICOS
1. QuizIntroBlock schema-driven
2. QuizQuestionBlock com opções dinâmicas
3. ResultPageBlock configurável

## 🚨 DECISÕES IMPORTANTES

1. **Manter compatibilidade** com dados existentes?
2. **Migração gradual** ou substituição completa?
3. **Preservar** funcionalidades específicas do CaktoQuiz?
4. **Priorizar** quais etapas primeiro?

## ✅ BENEFÍCIOS DA MIGRAÇÃO

1. **Manutenibilidade** - Código unificado e schema-driven
2. **Escalabilidade** - Fácil adição de novos tipos de bloco
3. **Consistência** - UI/UX padronizada em todo o sistema
4. **Performance** - Backend integrado com auto-save e versionamento
5. **Flexibilidade** - Editor visual para todas as etapas

---

**QUER COMEÇAR PELA FASE 1 (ANÁLISE) AGORA?**
