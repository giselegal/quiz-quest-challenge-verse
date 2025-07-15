# 🔧 GUIA DE CONVERSÃO PARA PADRÃO INLINE

## 📋 **CHECKLIST DE CONVERSÃO**

### **✅ Passo a Passo para Converter Componentes**

#### **1. Estrutura Base**
```tsx
// ANTES (componente tradicional):
const MeuComponente = ({ title, onPropertyChange }) => {
  return (
    <div className="p-4 border rounded">
      <h3>{title}</h3>
      {/* conteúdo */}
    </div>
  );
};

// DEPOIS (padrão Inline):
import InlineBaseWrapper from './base/InlineBaseWrapper';
import InlineEditableText from './base/InlineEditableText';

const MeuComponenteInline: React.FC<BlockComponentProps> = ({ 
  block, isSelected, onPropertyChange, className 
}) => {
  const { title, useUsername, trackingEnabled } = block.properties;
  
  return (
    <InlineBaseWrapper
      block={block}
      isSelected={isSelected}
      onPropertyChange={onPropertyChange}
      className={className}
      minHeight="4rem"
      editLabel="Editar Meu Componente"
    >
      {/* Conteúdo horizontal aqui */}
    </InlineBaseWrapper>
  );
};
```

#### **2. Converter Layout Vertical → Horizontal**
```tsx
// ANTES (vertical stack):
<div className="flex flex-col space-y-4">
  <h3>{title}</h3>
  <p>{description}</p>
  <button>{buttonText}</button>
</div>

// DEPOIS (horizontal flow):
<div className="flex items-center gap-4 w-full">
  <div className="flex-1">
    <InlineEditableText value={title} onChange={...} />
    <InlineEditableText value={description} onChange={...} />
  </div>
  <div className="flex-shrink-0">
    <button>{buttonText}</button>
  </div>
</div>
```

#### **3. Adicionar Funcionalidades Inline**
```tsx
// Adicionar estas propriedades ao block.properties:
const {
  // Propriedades originais
  title = 'Título padrão',
  
  // Novas funcionalidades inline
  useUsername = false,
  usernamePattern = 'Olá {{username}}!',
  trackingEnabled = false,
  animation = 'fadeIn',
  fontSize = 'base',
  fontWeight = 'normal',
  textAlign = 'left'
} = block.properties;

// Aplicar personalização
const personalizedTitle = getPersonalizedText(
  title, usernamePattern, username, useUsername
);

// Adicionar tracking
useEffect(() => {
  if (trackingEnabled) {
    trackComponentView(block.id, 'meu-componente-inline');
  }
}, [trackingEnabled]);
```

#### **4. Atualizar blockDefinitions.ts**
```tsx
{
  type: 'meu-componente-inline',
  name: 'Meu Componente (Inline)',
  description: 'Descrição com funcionalidades inline modernas',
  icon: 'IconeApropriado',
  category: 'Inline',
  propertiesSchema: [
    // Propriedades originais
    {
      key: 'title',
      label: 'Título',
      type: 'text-input',
      defaultValue: 'Título padrão'
    },
    
    // Novas propriedades padrão inline
    {
      key: 'useUsername',
      label: 'Usar Nome do Usuário',
      type: 'boolean-switch',
      defaultValue: false
    },
    {
      key: 'usernamePattern',
      label: 'Padrão de Personalização',
      type: 'text-input',
      placeholder: 'Olá {{username}}!',
      defaultValue: 'Olá {{username}}!'
    },
    {
      key: 'trackingEnabled',
      label: 'Habilitar Analytics',
      type: 'boolean-switch',
      defaultValue: false
    },
    {
      key: 'animation',
      label: 'Animação',
      type: 'select',
      options: [
        { label: 'Fade In', value: 'fadeIn' },
        { label: 'Slide da Esquerda', value: 'slideInFromLeft' },
        { label: 'Slide da Direita', value: 'slideInFromRight' },
        { label: 'Scale In', value: 'scaleIn' },
      ],
      defaultValue: 'fadeIn',
    }
  ]
}
```

---

## 🎯 **EXEMPLOS DE CONVERSÃO POR TIPO**

### **📝 Componentes de Texto**
```tsx
// FAQ Section → FAQ Horizontal
// ANTES: accordion vertical
<div className="space-y-4">
  {faqs.map(faq => (
    <div key={faq.id} className="border rounded p-4">
      <h4>{faq.question}</h4>
      <p>{faq.answer}</p>
    </div>
  ))}
</div>

// DEPOIS: tabs horizontais ou carousel
<div className="flex items-center gap-4">
  <div className="flex gap-2">
    {faqs.map((faq, index) => (
      <button 
        key={index}
        onClick={() => setActiveTab(index)}
        className={activeTab === index ? 'active' : ''}
      >
        FAQ {index + 1}
      </button>
    ))}
  </div>
  <div className="flex-1">
    <h4>{faqs[activeTab].question}</h4>
    <p>{faqs[activeTab].answer}</p>
  </div>
</div>
```

### **🛍️ Componentes de Vendas**
```tsx
// Product Offer → Product Inline
// ANTES: card vertical
<div className="bg-white p-6 rounded-lg shadow">
  <img src={image} className="w-full h-48 object-cover" />
  <h3>{title}</h3>
  <p>{description}</p>
  <div className="text-2xl font-bold">{price}</div>
  <button>Comprar</button>
</div>

// DEPOIS: layout horizontal compacto
<div className="flex items-center gap-4 bg-white p-4 rounded-lg">
  <img src={image} className="w-16 h-16 object-cover rounded" />
  <div className="flex-1">
    <h3>{title}</h3>
    <p className="text-sm text-gray-600">{description}</p>
  </div>
  <div className="text-right">
    <div className="text-xl font-bold">{price}</div>
    <button className="mt-2">Comprar</button>
  </div>
</div>
```

### **📊 Componentes de Dados**
```tsx
// Chart Section → Chart Inline
// ANTES: gráfico em bloco separado
<div className="bg-white p-6">
  <h3>Estatísticas</h3>
  <div className="h-64">
    <Chart data={data} />
  </div>
</div>

// DEPOIS: mini-chart horizontal
<div className="flex items-center gap-4">
  <div className="flex-1">
    <h3>Estatísticas</h3>
    <div className="text-2xl font-bold">{mainMetric}</div>
  </div>
  <div className="w-24 h-12">
    <MiniChart data={data} />
  </div>
</div>
```

---

## 📱 **RESPONSIVIDADE MÓVEL**

### **✅ Padrões Mobile-First:**
```tsx
// Layout que funciona em mobile e desktop:
<div className={cn(
  "w-full flex items-center gap-4",
  // Mobile: stack vertical
  "flex-col space-y-3 md:space-y-0",
  // Desktop: horizontal
  "md:flex-row md:space-x-4"
)}>
  <div className="w-full md:flex-1">
    {/* Conteúdo principal */}
  </div>
  <div className="w-full md:w-auto">
    {/* Ações/controles */}
  </div>
</div>

// Texto responsivo:
className={cn(
  "text-center md:text-left",
  "text-sm md:text-base"
)}

// Espaçamento responsivo:
className="space-y-2 md:space-y-0 md:space-x-4"
```

---

## 🎨 **GUIA DE DESIGN**

### **🎯 Princípios Visuais:**
1. **Altura Mínima**: `min-h-[4rem]` para componentes de conteúdo
2. **Padding Padrão**: `p-4 md:p-6` responsivo
3. **Gaps**: `gap-4` entre elementos
4. **Bordas**: `border border-gray-200` para containers
5. **Sombras**: `shadow-sm hover:shadow-md` para interatividade
6. **Cores**: Usar theme system do `inlineComponentUtils`

### **🔧 Classes CSS Essenciais:**
```css
/* Container principal */
.inline-component-base {
  @apply w-full flex items-center justify-center;
  @apply min-h-16 p-4;
  @apply transition-all duration-300;
}

/* Conteúdo interno */
.inline-content-wrapper {
  @apply flex items-center gap-4;
  @apply max-w-4xl w-full;
}

/* Responsividade */
.mobile-stack {
  @apply flex-col md:flex-row;
  @apply space-y-3 md:space-y-0 md:space-x-4;
}

/* Estados */
.hover-effects {
  @apply hover:shadow-lg hover:scale-[1.02];
  @apply transition-all duration-300;
}
```

---

## 🚀 **COMPONENTES PRIORITÁRIOS PARA CONVERSÃO**

### **🥇 Alta Prioridade (Vendas):**
1. `ProductOfferBlock` → `ProductOfferInline`
2. `TestimonialsGridBlock` → `TestimonialsCarouselInline` ✅
3. `FAQSectionBlock` → `FAQHorizontalInline`
4. `GuaranteeBlock` → `GuaranteeInline`
5. `BonusSection` → `BonusInline`

### **🥈 Média Prioridade (Conteúdo):**
1. `ArgumentsBlock` → `ArgumentsInline`
2. `ValueStackBlock` → `ValueStackInline`
3. `BeforeAfterBlock` → `BeforeAfterInline`
4. `MentorBlock` → `MentorInline`

### **🥉 Baixa Prioridade (Específicos):**
1. `AudioBlock` → `AudioInline`
2. `VideoPlayerBlock` → `VideoInline`
3. `FormInputBlock` → `FormInline`
4. `ListBlock` → `ListInline`

---

## 💡 **DICAS DE IMPLEMENTAÇÃO**

### **⚡ Performance:**
```tsx
// Lazy loading para componentes pesados
const HeavyComponentInline = React.lazy(() => 
  import('./HeavyComponentInline')
);

// Memoização para evitar re-renders
const MemoizedComponent = React.memo(ComponentInline);

// Debounce para mudanças frequentes
const debouncedOnChange = useMemo(
  () => debounce(onPropertyChange, 300),
  [onPropertyChange]
);
```

### **🎯 Acessibilidade:**
```tsx
// ARIA labels e roles
<div 
  role="region"
  aria-label="Seção de depoimentos"
  tabIndex={isSelected ? 0 : -1}
>
  
// Navegação por teclado
onKeyDown={(e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    handleClick();
  }
}}

// Focus visible
className="focus:outline-none focus:ring-2 focus:ring-blue-500"
```

### **🔧 Debugging:**
```tsx
// Console logs condicionais
useEffect(() => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Component props:', { block, isSelected });
  }
}, [block, isSelected]);

// Error boundaries
<ErrorBoundary fallback={<ComponentErrorFallback />}>
  <ComponentInline {...props} />
</ErrorBoundary>
```

---

## 📊 **MÉTRICAS DE SUCESSO**

### **✅ Critérios de Qualidade:**
- [ ] Layout horizontal responsivo
- [ ] Edição inline funcional
- [ ] Suporte a username
- [ ] Analytics integrado
- [ ] Animações suaves
- [ ] Estados visuais claros
- [ ] Mobile-first design
- [ ] Performance otimizada

### **📈 KPIs para Acompanhar:**
1. **Tempo de Carregamento**: < 100ms
2. **Interações por Componente**: tracking implementado
3. **Taxa de Edição**: usuários editando inline
4. **Satisfação UX**: feedback qualitativo
5. **Performance Mobile**: métricas específicas

---

**🎉 Com este guia, qualquer componente pode ser convertido para o padrão Inline moderno!**
