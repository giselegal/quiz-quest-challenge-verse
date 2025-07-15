# Componente Options Grid - Manual de Uso

## Visão Geral

O componente `OptionsGridBlock` foi completamente refatorado para seguir o padrão visual moderno e implementar funcionalidades avançadas de seleção. Ele é totalmente **schema-driven**, **modular**, **responsivo** e **editável via painel de propriedades**.

## Características Principais

### 1. Funcionalidade de Seleção
- ✅ **Seleção única** ou **múltipla** configurável
- ✅ **Indicador visual** de seleção com ícone de check
- ✅ **Validação** de seleções (mínimo/máximo)
- ✅ **Mensagens de erro** personalizáveis
- ✅ **Estado persistente** da seleção

### 2. Design Moderno
- ✅ **Cards com bordas arredondadas** e sombras
- ✅ **Animações suaves** (hover, seleção, transições)
- ✅ **Efeitos visuais** (scale, pulse, overlay)
- ✅ **Paleta de cores consistente** com o tema
- ✅ **Tipografia hierárquica** e legível

### 3. Responsividade
- ✅ **Grid adaptativo** (1-4 colunas)
- ✅ **Breakpoints** para mobile, tablet e desktop
- ✅ **Imagens flexíveis** com tamanhos adaptativos
- ✅ **Espaçamento responsivo** 

### 4. Funcionalidades Avançadas
- ✅ **Renderização HTML** segura nas opções
- ✅ **Fallback de imagens** com placeholders
- ✅ **Modo de edição** com feedback visual
- ✅ **Propriedades editáveis** via painel
- ✅ **Suporte a categorias** e metadados

## Propriedades Configuráveis

### Propriedades Básicas
- `title`: Título da seção de opções
- `options`: Array de opções com id, text, value, imageUrl, category
- `columns`: Número de colunas (1-4)
- `showImages`: Mostrar/ocultar imagens
- `imageSize`: Tamanho das imagens (small, medium, large)

### Propriedades de Seleção
- `multipleSelection`: Permitir seleção múltipla
- `maxSelections`: Número máximo de seleções
- `minSelections`: Número mínimo de seleções
- `validationMessage`: Mensagem de validação personalizada
- `selectedOptions`: Array das opções selecionadas

### Propriedades de Layout
- `gridGap`: Espaçamento entre as opções (px)

## Estrutura de Dados

### Opção Individual
```typescript
{
  id: string;           // Identificador único
  text: string;         // Texto da opção (HTML permitido)
  value: string;        // Valor para processamento
  imageUrl?: string;    // URL da imagem
  category?: string;    // Categoria da opção
}
```

### Exemplo de Configuração
```typescript
{
  title: "Qual é o seu estilo preferido?",
  options: [
    {
      id: "classico",
      text: "<strong>Clássico</strong><br/>Elegante e atemporal",
      value: "classico",
      imageUrl: "https://example.com/classico.jpg",
      category: "estilo"
    },
    {
      id: "moderno",
      text: "<strong>Moderno</strong><br/>Contemporâneo e inovador",
      value: "moderno",
      imageUrl: "https://example.com/moderno.jpg",
      category: "estilo"
    }
  ],
  columns: 2,
  showImages: true,
  imageSize: "large",
  multipleSelection: false,
  maxSelections: 1,
  minSelections: 1,
  validationMessage: "Selecione seu estilo preferido",
  gridGap: 16
}
```

## Estados Visuais

### 1. Estado Normal
- Border cinza clara
- Fundo branco
- Sombra sutil

### 2. Estado Hover
- Border cinza mais escura
- Fundo levemente acinzentado
- Sombra mais pronunciada
- Escala ligeiramente aumentada

### 3. Estado Selecionado
- Border azul
- Fundo azul claro
- Sombra azul
- Ícone de check no canto superior direito
- Overlay azul transparente na imagem
- Texto azul escuro

### 4. Estado de Edição
- Cursor padrão
- Feedback visual de quantas opções estão selecionadas
- Indicadores de configuração de seleção

## Responsividade

### Breakpoints
- **Mobile** (< 768px): 1 coluna
- **Tablet** (768px - 1024px): 2 colunas
- **Desktop** (> 1024px): Conforme configuração (1-4 colunas)

### Adaptações
- **Imagens**: Tamanhos adaptativos para cada breakpoint
- **Texto**: Tamanhos de fonte responsivos
- **Espaçamento**: Padding e margins ajustáveis
- **Grid**: Configuração flexível de colunas

## Integração com Editor

### Painel de Propriedades
O componente se integra perfeitamente com o painel de propriedades do editor, permitindo:
- Edição visual das opções
- Configuração de comportamento de seleção
- Ajuste de layout e espaçamento
- Gerenciamento de imagens

### Validação
- Validação automática de seleções
- Mensagens de erro personalizáveis
- Feedback visual em tempo real

## Casos de Uso

### 1. Quiz de Personalidade
```typescript
{
  title: "Como você prefere passar seu tempo livre?",
  multipleSelection: false,
  minSelections: 1,
  maxSelections: 1,
  options: [
    { id: "lendo", text: "Lendo um livro", value: "introvertido" },
    { id: "festa", text: "Em uma festa", value: "extrovertido" }
  ]
}
```

### 2. Pesquisa de Satisfação
```typescript
{
  title: "Quais recursos você mais usa? (Selecione até 3)",
  multipleSelection: true,
  minSelections: 1,
  maxSelections: 3,
  options: [
    { id: "email", text: "Email Marketing", value: "email" },
    { id: "analytics", text: "Analytics", value: "analytics" },
    { id: "crm", text: "CRM", value: "crm" }
  ]
}
```

### 3. Seleção de Produtos
```typescript
{
  title: "Escolha seus produtos favoritos:",
  showImages: true,
  imageSize: "large",
  columns: 3,
  options: [
    {
      id: "produto1",
      text: "Produto Premium",
      value: "premium",
      imageUrl: "https://example.com/premium.jpg"
    }
  ]
}
```

## Boas Práticas

1. **Textos Claros**: Use textos descritivos e concisos
2. **Imagens Consistentes**: Mantenha proporções e qualidade similares
3. **Limite de Opções**: Não exceda 8 opções por grid
4. **Validação Clara**: Forneça mensagens de erro específicas
5. **Teste Responsivo**: Verifique em diferentes tamanhos de tela

## Extensibilidade

O componente foi projetado para ser facilmente extensível:
- Novos tipos de validação
- Diferentes layouts de grid
- Temas personalizados
- Integrações com APIs

## Suporte Técnico

Para questões técnicas ou sugestões de melhorias, consulte:
- Documentação do editor
- Código fonte em `/client/src/components/editor/blocks/OptionsGridBlock.tsx`
- Schema em `/client/src/config/blockDefinitions.ts`
