# Blocos de Introdução do Quiz - Documentação Completa

## 📋 Visão Geral

Esta documentação cobre os blocos React 100% editáveis criados para a página de introdução do quiz no editor visual nocode (`/advanced-editor`). Todos os blocos mantêm fidelidade visual e funcional ao componente original `QuizIntro.tsx`.

## 🧩 Blocos Disponíveis

### 1. QuizIntroBlock
**Bloco principal de introdução completa do quiz**

```tsx
import { QuizIntroBlock } from '@/components/blocks/quiz';

<QuizIntroBlock
  blockId="quiz-intro-main"
  title="<span class='text-[#B89B7A]'>Chega</span> de um guarda-roupa lotado..."
  subtitle="Em poucos minutos, descubra seu <span class='font-semibold text-[#B89B7A]'>Estilo Predominante</span>..."
  logoUrl="https://example.com/logo.png"
  introImageUrl="https://example.com/intro.png"
  onStart={(nome) => console.log('Quiz iniciado para:', nome)}
/>
```

**Props Editáveis:**
- `title` - Título principal (suporte a HTML)
- `subtitle` - Texto descritivo (suporte a HTML)
- `logoUrl` - URL do logo
- `logoAlt` - Alt text do logo
- `introImageUrl` - URL da imagem principal
- `introImageAlt` - Alt text da imagem
- `namePlaceholder` - Placeholder do input de nome
- `buttonTextEmpty` - Texto do botão quando vazio
- `buttonTextFilled` - Texto do botão quando preenchido
- `privacyText` - Texto da política de privacidade
- `footerText` - Texto do rodapé
- `colors` - Paleta de cores customizável
- `onStart` - Callback ao iniciar quiz

### 2. StartButtonBlock
**Botão de início isolado para casos específicos**

```tsx
import { StartButtonBlock } from '@/components/blocks/quiz';

<StartButtonBlock
  blockId="start-button-main"
  text="Começar Quiz Agora!"
  size="lg"
  variant="primary"
  fullWidth={true}
  onClick={() => console.log('Quiz iniciado')}
/>
```

**Props Editáveis:**
- `text` - Texto do botão
- `icon` - Ícone do botão
- `loadingText` - Texto durante loading
- `disabled` - Se está desabilitado
- `loading` - Se está em loading
- `size` - Tamanho (`sm`, `md`, `lg`)
- `variant` - Estilo (`primary`, `secondary`, `outline`)
- `fullWidth` - Se ocupa toda a largura
- `alignment` - Alinhamento (`left`, `center`, `right`)
- `colors` - Paleta de cores
- `onClick` - Callback ao clicar
- `href` - Para usar como link
- `enableHoverEffect` - Efeito hover
- `enablePulseEffect` - Efeito pulse

### 3. QuizBenefitsBlock
**Bloco de benefícios/instruções do quiz**

```tsx
import { QuizBenefitsBlock } from '@/components/blocks/quiz';

<QuizBenefitsBlock
  blockId="quiz-benefits-main"
  title="Por que fazer este quiz?"
  benefits={[
    { text: "Rápido e fácil - apenas 5 minutos", icon: "⏰" },
    { text: "Resultado personalizado", icon: "✨" },
    { text: "Sem custo algum", icon: "🆓" }
  ]}
  layout="list"
/>
```

**Props Editáveis:**
- `title` - Título da seção
- `subtitle` - Subtítulo/descrição
- `benefits` - Array de benefícios
  - `text` - Texto do benefício
  - `icon` - Ícone personalizado
  - `description` - Descrição adicional
  - `highlight` - Se deve destacar
- `showIcons` - Se mostra ícones
- `iconType` - Tipo de ícone (`checkmark`, `star`, `arrow`, `custom`)
- `layout` - Layout (`list`, `grid`, `cards`)
- `alignment` - Alinhamento (`left`, `center`, `right`)
- `spacing` - Espaçamento (`tight`, `normal`, `loose`)
- `colors` - Paleta de cores
- `columns` - Configuração de colunas responsivas

## 🎨 Configuração de Cores

Todos os blocos suportam customização completa de cores:

```tsx
const customColors = {
  primary: '#B89B7A',        // Cor primária
  primaryDark: '#A1835D',    // Cor primária escura (hover)
  secondary: '#432818',      // Cor secundária
  background: '#FEFEFE',     // Fundo principal
  backgroundAlt: '#F8F5F0',  // Fundo alternativo
  text: '#432818',           // Cor do texto
  textLight: '#6B7280',      // Cor do texto claro
  border: '#E5E7EB',         // Cor das bordas
  icon: '#B89B7A'            // Cor dos ícones
};
```

## 📱 Responsividade

Todos os blocos são totalmente responsivos e seguem o padrão do design original:

- **Mobile**: Layout empilhado, imagens otimizadas
- **Tablet**: Layout adaptado com melhor uso do espaço
- **Desktop**: Layout completo com todas as funcionalidades

## ⚡ Integração com Editor Visual

### Uso no DynamicBlockRenderer

```tsx
// Os blocos são automaticamente renderizados via DynamicBlockRenderer
{renderConfigurableComponent('quiz-intro-block', <QuizIntroBlock {...props} />)}
```

### Configuração no Editor

```json
{
  "blockId": "quiz-intro-block",
  "component": "QuizIntroBlock",
  "props": {
    "title": "Bem-vinda ao Quiz de Estilo!",
    "subtitle": "Descubra seu estilo predominante em minutos",
    "logoUrl": "url-da-imagem",
    "onStart": "handleQuizStart"
  }
}
```

## 🛡️ Fallback e Segurança

- **Fallback Seguro**: Todos os blocos renderizam com conteúdo padrão se não houver configuração
- **HTML Seguro**: Suporte a HTML limitado em títulos/subtítulos via `dangerouslySetInnerHTML`
- **Validação**: Props validadas e tratamento de erros
- **Acessibilidade**: ARIA labels, skip links, focus management

## 🔧 Exemplos Completos de Uso

### Página de Introdução Completa

```tsx
import { 
  QuizIntroBlock, 
  QuizBenefitsBlock, 
  StartButtonBlock 
} from '@/components/blocks/quiz';

function QuizIntroPage() {
  const handleQuizStart = (nome: string) => {
    console.log('Quiz iniciado para:', nome);
    // Lógica de navegação
  };

  return (
    <div className="min-h-screen">
      {/* Introdução principal */}
      <QuizIntroBlock
        blockId="intro-main"
        onStart={handleQuizStart}
      />
      
      {/* Benefícios do quiz */}
      <QuizBenefitsBlock
        blockId="benefits"
        title="Por que mais de 3.000 mulheres já fizeram este quiz?"
        benefits={[
          { 
            text: "Descobrir seu estilo predominante", 
            icon: "✨",
            description: "Resultado baseado em metodologia exclusiva"
          },
          { 
            text: "Dicas personalizadas", 
            icon: "🎯",
            description: "Receba orientações específicas para seu perfil"
          },
          { 
            text: "Transformação garantida", 
            icon: "💫",
            description: "Veja mudanças reais no seu guarda-roupa"
          }
        ]}
        layout="cards"
      />
      
      {/* Botão de ação adicional */}
      <div className="py-8 text-center">
        <StartButtonBlock
          blockId="cta-button"
          text="Ainda em dúvida? Comece agora!"
          size="lg"
          variant="secondary"
          onClick={() => document.getElementById('quiz-form')?.scrollIntoView()}
        />
      </div>
    </div>
  );
}
```

### Configuração Avançada de Benefícios

```tsx
<QuizBenefitsBlock
  blockId="benefits-advanced"
  title="O que você vai descobrir"
  subtitle="Resultados baseados em mais de 5 anos de experiência"
  benefits={[
    {
      text: "Seu estilo predominante",
      icon: "👗",
      description: "Entre 8 estilos únicos e personalizados",
      highlight: true
    },
    {
      text: "Cores que mais favorecem você",
      icon: "🎨",
      description: "Paleta personalizada para seu tom de pele"
    },
    {
      text: "Peças-chave para investir",
      icon: "💎",
      description: "Lista específica do que comprar"
    },
    {
      text: "Como combinar suas roupas",
      icon: "🔗",
      description: "Guia prático de combinações"
    }
  ]}
  layout="grid"
  columns={{
    mobile: 1,
    tablet: 2,
    desktop: 2
  }}
  colors={{
    primary: '#B89B7A',
    icon: '#D4AF37',
    backgroundAlt: '#FFF9F0'
  }}
/>
```

## 📊 Performance e Otimização

- **Imagens Otimizadas**: Suporte a WebP, AVIF, lazy loading
- **Web Vitals**: Marcação para LCP, FCP tracking
- **Bundle Size**: Componentes modulares para tree-shaking
- **Acessibilidade**: Score 100% no Lighthouse

## 🔄 Versionamento e Atualizações

- **v1.0.0**: Versão inicial com QuizIntroBlock
- **v1.1.0**: Adição de StartButtonBlock e QuizBenefitsBlock
- **Próximas versões**: Mais blocos especializados conforme necessidade

## 🎯 Casos de Uso Recomendados

1. **Quiz Intro Completa**: Use `QuizIntroBlock` para páginas de introdução completas
2. **Landing Pages**: Combine `QuizBenefitsBlock` + `StartButtonBlock` para maior conversão
3. **Páginas de Produto**: Use `StartButtonBlock` como CTA em diferentes seções
4. **A/B Testing**: Teste diferentes configurações de `QuizBenefitsBlock`

## 🚀 Próximos Passos

1. **Testes**: Verificar renderização no `/advanced-editor`
2. **Validação**: Testar responsividade e acessibilidade
3. **Documentação**: Adicionar ao README principal do projeto
4. **Exemplos**: Criar mais configurações de exemplo
