# Biblioteca de Componentes de Funil Reutilizáveis

Esta é uma biblioteca completa de componentes React altamente configuráveis e reutilizáveis para construção de funis de vendas, quiz interativos e páginas de conversão.

## 🎯 Objetivo

Transformar qualquer fluxo de funil em componentes isolados, permitindo a montagem de funis futuros apenas compondo, configurando e ordenando esses blocos.

## 📦 Componentes Disponíveis

### 1. IntroPage
Página de introdução configurável com logo, título, subtítulo, imagem, campo de nome e botão de ação.

```tsx
<IntroPage
  title="Descubra Seu Estilo Único"
  subtitle="Um quiz personalizado para transformar seu guarda-roupa"
  logoUrl="https://example.com/logo.png"
  imageUrl="https://example.com/intro.jpg"
  showNameInput={true}
  buttonText="Começar Quiz"
  progressConfig={{
    showProgress: true,
    progressValue: 10,
    currentStep: 1,
    totalSteps: 10
  }}
  onSubmit={(data) => console.log('Nome:', data.name)}
/>
```

### 2. QuizQuestion
Componente de pergunta de quiz com múltiplas opções, validação e auto-advance.

```tsx
<QuizQuestion
  question="Qual é o seu estilo favorito?"
  description="Escolha a opção que mais combina com você"
  questionNumber={1}
  totalQuestions={10}
  options={[
    { id: '1', text: 'Clássico e elegante', value: 'classic' },
    { id: '2', text: 'Moderno e minimalista', value: 'modern' },
    { id: '3', text: 'Boho e descontraído', value: 'boho' },
    { id: '4', text: 'Dramático e ousado', value: 'dramatic' }
  ]}
  multipleSelection={false}
  autoAdvance={true}
  autoAdvanceDelay={1500}
  optionStyle="card"
  showLetters={true}
  progressConfig={{
    showProgress: true,
    progressValue: 25,
    currentStep: 1,
    totalQuestions: 10
  }}
  onAnswer={(answers) => handleQuizAnswer(answers)}
/>
```

### 3. LoadingTransition
Tela de carregamento com diferentes animações e transição automática.

```tsx
<LoadingTransition
  message="Analisando suas respostas..."
  submessage="Criando seu perfil personalizado"
  loadingTexts={[
    "Processando suas preferências...",
    "Identificando seu estilo único...",
    "Preparando recomendações..."
  ]}
  animationType="elegant"
  duration={4000}
  showProgress={true}
  onComplete={() => navigateToResults()}
  onProgress={(progress) => console.log(`${progress}%`)}
/>
```

### 4. StyleResultDisplay
Exibição do resultado do quiz com imagem, descrição e características do estilo.

```tsx
<StyleResultDisplay
  styleName="Elegante Clássica"
  styleImage="https://example.com/style-classic.jpg"
  styleDescription="Seu estilo combina elegância atemporal com sofisticação refinada. Você aprecia peças bem estruturadas, cores neutras e acessórios discretos que demonstram qualidade e bom gosto."
  percentMatch={92}
  characteristics={[
    'Sofisticada',
    'Atemporal',
    'Refinada',
    'Minimalista',
    'Elegante'
  ]}
  styleKeywords={[
    'blazers',
    'neutros',
    'estruturado',
    'qualidade',
    'atemporal'
  ]}
  showPercentage={true}
  showCharacteristics={true}
  onContinue={() => showOffer()}
/>
```

### 5. SalesOffer
Componente de oferta de vendas com preços, recursos e urgência.

```tsx
<SalesOffer
  title="Transforme Seu Guarda-Roupa Hoje!"
  subtitle="Consultoria Personalizada de Estilo"
  description="Baseado no seu resultado, criamos um programa exclusivo"
  priceConfig={{
    originalPrice: 'R$ 297,00',
    currentPrice: 'R$ 97,00',
    discount: '67% OFF',
    currency: 'BRL',
    installments: {
      quantity: 12,
      value: 'R$ 9,70'
    }
  }}
  features={[
    { title: 'Análise completa do seu estilo', isIncluded: true },
    { title: 'Guia de compras personalizado', isIncluded: true },
    { title: 'Combinações para 30 dias', isIncluded: true },
    { title: 'Suporte por WhatsApp', isIncluded: true },
    { title: 'Garantia de 30 dias', isIncluded: true }
  ]}
  urgencyText="Oferta válida apenas hoje!"
  buttonText="Quero Transformar Meu Estilo Agora"
  buttonSubtext="Pagamento 100% seguro"
  onPurchase={() => processPayment()}
/>
```

### 6. TestimonialsGrid
Grade de depoimentos com fotos, avaliações e informações dos clientes.

```tsx
<TestimonialsGrid
  title="O que nossas clientes estão dizendo"
  subtitle="Mais de 10.000 mulheres já transformaram seu estilo"
  testimonials={[
    {
      id: '1',
      author: 'Maria Silva',
      role: 'Empresária',
      text: 'Transformou completamente meu guarda-roupa! Agora me sinto muito mais confiante e elegante.',
      rating: 5,
      avatar: 'https://example.com/avatar1.jpg',
      location: 'São Paulo, SP'
    },
    {
      id: '2',
      author: 'Ana Santos',
      role: 'Advogada',
      text: 'O quiz foi certeiro! As recomendações são perfeitas para meu estilo de vida.',
      rating: 5,
      avatar: 'https://example.com/avatar2.jpg',
      location: 'Rio de Janeiro, RJ'
    }
  ]}
  layout="grid"
  columns={2}
  showRatings={true}
  showAvatars={true}
  cardStyle="elegant"
/>
```

### 7. GuaranteeSection
Seção de garantia com selo, recursos e elementos de confiança.

```tsx
<GuaranteeSection
  title="Garantia de Satisfação Total"
  period="30 dias"
  description="Se você não ficar 100% satisfeita com sua consultoria de estilo, devolvemos todo seu dinheiro. Sem perguntas, sem complicações."
  features={[
    { title: 'Reembolso integral em até 30 dias', isIncluded: true },
    { title: 'Sem perguntas ou complicações', isIncluded: true },
    { title: 'Processamento em até 5 dias úteis', isIncluded: true }
  ]}
  sealStyle="shield"
  layout="horizontal"
  showIcon={true}
  iconStyle="shield"
/>
```

### 8. FAQSection
Seção de perguntas frequentes com funcionalidade de acordeão.

```tsx
<FAQSection
  title="Perguntas Frequentes"
  subtitle="Tire suas dúvidas sobre nossa consultoria"
  faqs={[
    {
      id: '1',
      question: 'Como funciona a consultoria de estilo?',
      answer: 'Nossa consultoria é 100% personalizada baseada no resultado do seu quiz. Você recebe um guia completo com análise do seu estilo, paleta de cores ideal, sugestões de peças e combinações prontas.'
    },
    {
      id: '2',
      question: 'Quanto tempo leva para receber o material?',
      answer: 'Após a confirmação do pagamento, você recebe todo o material em até 24 horas por email. O acesso é vitalício e você pode consultar quando quiser.'
    }
  ]}
  allowMultipleOpen={false}
  openFirst={true}
  cardStyle="bordered"
  iconStyle="chevron"
/>
```

### 9. SocialProof
Componente de prova social com estatísticas e credenciais.

```tsx
<SocialProof
  title="Mais de 10.000 mulheres já transformaram seu estilo"
  stats={[
    { number: '10.000+', label: 'Mulheres Atendidas' },
    { number: '4.9★', label: 'Avaliação Média' },
    { number: '99%', label: 'Satisfação' },
    { number: '30 dias', label: 'Garantia' }
  ]}
  layout="horizontal"
  showReviews={true}
  averageRating={4.9}
  totalReviews={1250}
  reviewPlatforms={['Google', 'Facebook', 'Trustpilot']}
  backgroundColor="#f8fafc"
  accentColor="#B89B7A"
/>
```

## 🎨 Customização e Temas

Todos os componentes seguem um sistema de design consistente e podem ser customizados através de:

### Props de Estilo
- `className`: Classes CSS customizadas
- `style`: Estilos inline
- `deviceView`: 'mobile' | 'tablet' | 'desktop'

### Cores Padrão
```typescript
const defaultTheme = {
  primaryColor: '#B89B7A',    // Cor principal (dourado suave)
  secondaryColor: '#432818',  // Cor secundária (marrom escuro)
  accentColor: '#D4B896',     // Cor de destaque (dourado claro)
  successColor: '#16a34a',    // Verde para sucesso
  errorColor: '#dc2626',      // Vermelho para erro
  warningColor: '#ea580c'     // Laranja para aviso
};
```

## 📱 Responsividade

Todos os componentes são totalmente responsivos e se adaptam automaticamente a:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: > 1024px

## 🔧 Utilitários Inclusos

```typescript
import { funnelHelpers } from '@/components/funnel-blocks';

// Calcular progresso
const progress = funnelHelpers.calculateProgress(3, 10); // 30%

// Calcular desconto
const discount = funnelHelpers.formatDiscount('R$ 297,00', 'R$ 97,00'); // 67%

// Validar email
const isValidEmail = funnelHelpers.validateEmail('user@example.com'); // true

// Validar telefone brasileiro
const isValidPhone = funnelHelpers.validatePhone('(11) 99999-9999'); // true

// Gerar ID único
const uniqueId = funnelHelpers.generateId(); // 'funnel-1640995200000-abc123def'
```

## 🚀 Como Usar no Editor Avançado

Para integrar com o editor visual, cada componente pode ser mapeado para os tipos de bloco:

```typescript
// Exemplo de mapeamento no editor
const renderBlock = (block: BlockData) => {
  switch (block.type) {
    case 'intro':
      return (
        <IntroPage
          title={block.settings.title}
          subtitle={block.settings.subtitle}
          logoUrl={block.settings.logoUrl}
          buttonText={block.settings.buttonText}
          onSubmit={(data) => handleBlockInteraction(block.id, data)}
        />
      );
    
    case 'question-multiple':
      return (
        <QuizQuestion
          question={block.settings.question}
          options={block.settings.options}
          progressConfig={getProgressConfig(block)}
          onAnswer={(answers) => handleQuizAnswer(block.id, answers)}
        />
      );
    
    case 'sales-offer':
      return (
        <SalesOffer
          title={block.settings.title}
          priceConfig={block.settings.priceConfig}
          features={block.settings.features}
          onPurchase={() => handlePurchase(block.id)}
        />
      );
    
    // ... outros casos
  }
};
```

## 📋 Checklist de Implementação

- [x] IntroPage - Página de introdução configurável
- [x] QuizQuestion - Perguntas com múltiplas opções
- [x] LoadingTransition - Telas de carregamento animadas
- [x] StyleResultDisplay - Exibição de resultados do quiz
- [x] SalesOffer - Ofertas de vendas com preços
- [x] TestimonialsGrid - Grade de depoimentos
- [x] GuaranteeSection - Seções de garantia
- [x] FAQSection - Perguntas frequentes
- [x] SocialProof - Prova social e estatísticas
- [ ] BonusSection - Seções de bônus
- [ ] VideoSection - Incorporação de vídeos
- [ ] CountdownTimer - Timers de urgência
- [ ] StrategicQuestion - Perguntas estratégicas
- [ ] BeforeAfter - Comparações antes/depois
- [ ] MentorSection - Apresentação de mentores
- [ ] PriceComparison - Comparação de preços
- [ ] FeatureHighlight - Destaque de recursos

## 🎯 Benefícios

1. **Reutilização Total**: Cada componente pode ser usado em qualquer funil futuro
2. **Configuração Flexível**: Props permitem customização completa sem alterar código
3. **Responsividade Nativa**: Todos os componentes se adaptam automaticamente
4. **Tipagem TypeScript**: IntelliSense completo e detecção de erros
5. **Documentação Rica**: Exemplos e props documentadas
6. **Performance Otimizada**: Componentes otimizados para carregamento rápido
7. **Acessibilidade**: Seguem padrões de acessibilidade web
8. **Manutenibilidade**: Código limpo e bem estruturado

Esta biblioteca permite criar qualquer tipo de funil apenas combinando e configurando os componentes, sem necessidade de desenvolvimento adicional.
