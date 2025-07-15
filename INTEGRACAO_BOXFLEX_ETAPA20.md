/**
 * INTEGRAÇÃO DOS COMPONENTES BOXFLEX NA ETAPA 20
 * 
 * Este arquivo demonstra como integrar os componentes BoxFlex
 * criados no sistema UniversalBlockRenderer existente.
 */

import React from 'react';
import {
  HeaderBoxFlexInline,
  ResultMainBoxFlexInline,
  SecondaryStylesBoxFlexInline,
  BeforeAfterBoxFlexInline,
  CTAGreenBoxFlexInline,
  ValueStackBoxFlexInline
} from './inline/BoxFlexInlineComponents';

// ===== INTEGRAÇÃO NO UNIVERSALBLOCKRENDERER =====

// Adicionar estes casos no switch do UniversalBlockRenderer.tsx:

const newComponentMap = {
  // === ETAPA 20 - COMPONENTES BOXFLEX HORIZONTAL ===
  'header-boxflex-inline': () => <HeaderBoxFlexInline {...commonProps} />,
  'result-main-boxflex-inline': () => <ResultMainBoxFlexInline {...commonProps} />,
  'secondary-styles-boxflex-inline': () => <SecondaryStylesBoxFlexInline {...commonProps} />,
  'before-after-boxflex-inline': () => <BeforeAfterBoxFlexInline {...commonProps} />,
  'cta-green-boxflex-inline': () => <CTAGreenBoxFlexInline {...commonProps} />,
  'value-stack-boxflex-inline': () => <ValueStackBoxFlexInline {...commonProps} />,
  
  // === MAPEAMENTOS ALTERNATIVOS ===
  'etapa20-header': () => <HeaderBoxFlexInline {...commonProps} />,
  'etapa20-resultado-principal': () => <ResultMainBoxFlexInline {...commonProps} />,
  'etapa20-estilos-secundarios': () => <SecondaryStylesBoxFlexInline {...commonProps} />,
  'etapa20-antes-depois': () => <BeforeAfterBoxFlexInline {...commonProps} />,
  'etapa20-cta-verde': () => <CTAGreenBoxFlexInline {...commonProps} />,
  'etapa20-value-stack': () => <ValueStackBoxFlexInline {...commonProps} />,
};

// ===== CONFIGURAÇÃO NO BLOCKDEFINITIONS =====

export const etapa20BlockDefinitions = [
  {
    id: 'header-boxflex-inline',
    name: 'Header BoxFlex',
    category: 'Resultado',
    icon: '📄',
    description: 'Cabeçalho com logo, nome do funil e status',
    properties: [
      { key: 'logo', label: 'URL do Logo', type: 'text', defaultValue: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp' },
      { key: 'funnelName', label: 'Nome do Funil', type: 'text', defaultValue: 'Quiz Gisele' },
      { key: 'isPublished', label: 'Publicado', type: 'boolean', defaultValue: false }
    ]
  },
  {
    id: 'result-main-boxflex-inline',
    name: 'Resultado Principal',
    category: 'Resultado',
    icon: '🎯',
    description: 'Card principal com estilo, porcentagem e descrição',
    properties: [
      { key: 'styleName', label: 'Nome do Estilo', type: 'text', defaultValue: 'Natural' },
      { key: 'stylePercentage', label: 'Porcentagem', type: 'text', defaultValue: '85' },
      { key: 'description', label: 'Descrição', type: 'textarea', defaultValue: 'Você é autêntica e natural' },
      { key: 'image', label: 'URL da Imagem', type: 'text', defaultValue: 'https://dummyimage.com/120x120/aaa/fff.png&text=Estilo' }
    ]
  },
  {
    id: 'secondary-styles-boxflex-inline',
    name: 'Estilos Secundários',
    category: 'Resultado',
    icon: '📊',
    description: 'Lista horizontal dos estilos secundários',
    properties: [
      { 
        key: 'secondaryStyles', 
        label: 'Estilos Secundários', 
        type: 'array', 
        defaultValue: [
          { category: 'Moderno', percentage: 10 },
          { category: 'Romântico', percentage: 5 }
        ]
      }
    ]
  },
  {
    id: 'before-after-boxflex-inline',
    name: 'Antes e Depois',
    category: 'Resultado',
    icon: '⬇️',
    description: 'Seção de transformação antes/depois',
    properties: [
      { key: 'before', label: 'Texto Antes', type: 'text', defaultValue: 'Antes: insegurança' },
      { key: 'after', label: 'Texto Depois', type: 'text', defaultValue: 'Depois: confiança' },
      { key: 'beforeImg', label: 'Imagem Antes', type: 'text', defaultValue: 'https://dummyimage.com/80x80/eee/333.png&text=Antes' },
      { key: 'afterImg', label: 'Imagem Depois', type: 'text', defaultValue: 'https://dummyimage.com/80x80/eee/333.png&text=Depois' }
    ]
  },
  {
    id: 'cta-green-boxflex-inline',
    name: 'CTA Verde',
    category: 'Resultado',
    icon: '🛒',
    description: 'Call-to-action verde com botão de compra',
    properties: [
      { key: 'ctaText', label: 'Texto do CTA', type: 'text', defaultValue: 'Quero meu guia agora!' }
    ]
  },
  {
    id: 'value-stack-boxflex-inline',
    name: 'Value Stack',
    category: 'Resultado',
    icon: '💰',
    description: 'Pilha de valor com preços e oferta',
    properties: [
      { 
        key: 'stackList', 
        label: 'Lista de Itens', 
        type: 'array', 
        defaultValue: [
          'Guia principal - R$67',
          'Peças-chave - R$79',
          'Visagismo facial - R$29'
        ]
      },
      { key: 'totalValue', label: 'Valor Total', type: 'text', defaultValue: 'R$175,00' },
      { key: 'offerValue', label: 'Valor da Oferta', type: 'text', defaultValue: 'R$39,00' }
    ]
  }
];

// ===== COMO USAR NO EDITOR =====

/*
1. ADICIONAR AO UNIVERSALBLOCKRENDERER:
   - Copie o conteúdo de newComponentMap para o componentMap existente

2. ADICIONAR AO BLOCKDEFINITIONS:
   - Adicione etapa20BlockDefinitions ao array principal

3. USAR NO EDITOR:
   - Os componentes aparecerão na categoria "Resultado"
   - Cada componente pode ser arrastado individualmente
   - Todos são editáveis inline via painel de propriedades

4. VANTAGENS DESTA ABORDAGEM:
   ✅ Componentes 100% horizontais e responsivos
   ✅ Edição inline intuitiva
   ✅ Reutilizáveis e modulares
   ✅ Integração perfeita com sistema existente
   ✅ TypeScript completamente tipado
   ✅ Performance otimizada com React.memo potencial

5. RESULTADO NO EDITOR:
   - Categoria "Resultado" com 6 componentes específicos
   - Layout horizontal flexível em todas as telas
   - Edição em tempo real sem modal
   - Preview fiel ao funil real
*/
