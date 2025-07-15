# 🔍 Guia Prático: Comparação Site Produção vs Editor

## 📋 VERIFICAÇÃO RÁPIDA - Execute Agora

### **1. Abra Ambos os Ambientes:**
- **Site Produção**: https://giselegalvao.com.br/quiz/
- **Editor Local**: http://localhost:3000/admin/schema-driven-editor

### **2. Comparação por Etapas:**

#### **🎯 ETAPA 1 - Introdução**
**Produção vs Editor Etapa 1:**
- ✅ Título principal
- ✅ Imagem de abertura  
- ✅ Campo de nome
- ✅ Botão CTA

#### **🎯 ETAPAS 2-11 - Questões Principais**
**Verificar em cada questão:**
- ✅ Pergunta idêntica
- ✅ 8 opções com imagens
- ✅ Seleção múltipla (máx 3)
- ✅ Botão "Continuar"

#### **🎯 ETAPA 12 - Transição**
**Verificar:**
- ✅ Mensagem de transição
- ✅ Texto sobre questões estratégicas

#### **🎯 ETAPAS 13-18 - Questões Estratégicas**
**Verificar em cada questão:**
- ✅ Pergunta estratégica
- ✅ Opções apenas texto
- ✅ Seleção única

#### **🎯 ETAPA 20 - Resultado**
**Verificar:**
- ✅ Estilo predominante
- ✅ Descrição do estilo
- ✅ Imagem do estilo
- ✅ CTA para oferta

#### **🎯 ETAPA 21 - Oferta**
**Verificar valores exatos:**
- ✅ R$ 39,90 (preço atual)
- ✅ R$ 175,00 (preço original)
- ✅ 77% OFF
- ✅ 4x R$ 8,83
- ✅ "QUERO DESCOBRIR MEU ESTILO AGORA"

## ⚠️ POSSÍVEIS DIFERENÇAS A PROCURAR

### **Textos que podem estar diferentes:**
1. **Títulos das questões**
2. **Textos das opções**
3. **Mensagens de transição**
4. **Descrições dos resultados**
5. **Valores da oferta**

### **Elementos visuais:**
1. **URLs das imagens**
2. **Cores dos botões**
3. **Layout responsivo**
4. **Tipografia**

### **Funcionalidades:**
1. **Auto-avanço das questões**
2. **Validação de seleções**
3. **Cálculo de resultados**
4. **Progresso visual**

## 🛠️ COMO CORRIGIR DIFERENÇAS

### **Se encontrar texto diferente:**
```bash
# Exemplo: Corrigir título de questão
replace_string_in_file(
  filePath="/workspaces/quiz-quest-challenge-verse/client/src/components/visual-editor/realQuizData.ts",
  oldString="question: \"Texto atual\"",
  newString="question: \"Texto correto da produção\""
)
```

### **Se encontrar imagem diferente:**
```bash
# Exemplo: Corrigir URL de imagem
replace_string_in_file(
  filePath="/workspaces/quiz-quest-challenge-verse/client/src/services/schemaDrivenFunnelService.ts",
  oldString="imageUrl: \"URL_ATUAL\"",
  newString="imageUrl: \"URL_CORRETA_DA_PRODUCAO\""
)
```

### **Se encontrar valor diferente:**
```bash
# Exemplo: Corrigir preço da oferta
replace_string_in_file(
  filePath="/workspaces/quiz-quest-challenge-verse/client/src/services/schemaDrivenFunnelService.ts",
  oldString="fullPrice: 'R$ 39,90'",
  newString="fullPrice: 'R$ PRECO_CORRETO'"
)
```

## 🏗️ ESPECIFICAÇÕES TÉCNICAS DOS COMPONENTES

### **1. Layout Flexbox Responsivo**
**Todos os componentes devem seguir esta estrutura:**

#### **Container Principal (Canvas)**
```css
.flex.flex-row.flex-wrap {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
```

**Comportamento esperado:**
- ✅ **Telas grandes**: Componentes lado a lado (até 2 colunas máximo)
- ✅ **Telas pequenas**: Componentes empilhados verticalmente
- ✅ **Quebra automática**: `flex-wrap` move itens para próxima linha quando necessário

#### **Itens do Canvas (Componentes Inline)**
```css
.canvas-item {
  max-width: 100%;
  flex-basis: 100%;
  min-height: 1.25rem;
  position: relative;
  align-self: auto;
  margin-right: auto;
}
```

**Verificações obrigatórias:**
- ✅ `max-w-full`: Nunca excede largura do container
- ✅ `flex-basis: 100%`: Ocupa largura total disponível
- ✅ `min-h-[1.25rem]`: Altura mínima para elementos vazios
- ✅ Empilhamento vertical automático em mobile

### **2. Breakpoints Responsivos (Tailwind)**

#### **Mobile First (padrão)**
```css
/* Aplicado sempre (mobile-first) */
.flex-col        /* Layout vertical */
.hidden          /* Elementos ocultos */
.w-full          /* Largura total */
```

#### **Medium Screens (md: ≥768px)**
```css
.md:flex-row           /* Layout horizontal */
.md:max-w-[13rem]      /* Largura máxima sidebars */
.md:block              /* Mostrar elementos */
.md:hidden             /* Ocultar versão mobile */
```

#### **Large Screens (lg: ≥1024px)**
```css
.lg:max-w-[9.5rem]     /* Largura otimizada para desktop */
.lg:flex               /* Layout flex em desktop */
```

### **3. Sistema de Larguras Customizáveis**

#### **CSS Custom Properties**
```css
:root {
  --global-width: 38rem; /* 608px - largura máxima do conteúdo */
}

.customizable-width {
  max-width: var(--global-width);
}
```

**Verificar:**
- ✅ Conteúdo nunca excede 608px em telas grandes
- ✅ Largura se adapta em telas menores
- ✅ Proporções mantidas em todos os dispositivos

### **4. Verificações Específicas por Componente**

#### **🎯 Componentes de Questão (QuizQuestionBlock)**
```css
/* Estrutura esperada */
.question-container {
  display: flex;
  flex-direction: column;
  max-width: 100%;
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1rem;
  max-width: 100%;
}

/* Mobile */
@media (max-width: 767px) {
  .options-grid {
    grid-template-columns: 1fr; /* Uma coluna */
  }
}

/* Tablet/Desktop */
@media (min-width: 768px) {
  .options-grid {
    grid-template-columns: repeat(2, 1fr); /* Máximo 2 colunas */
  }
}
```

**Checklist de verificação:**
- ✅ Mobile: 1 coluna de opções
- ✅ Tablet/Desktop: Máximo 2 colunas
- ✅ Gap consistente entre itens (1rem)
- ✅ Imagens proporcionais
- ✅ Texto legível em todos os tamanhos

#### **🎯 Componentes de Resultado (ResultPageBlock)**
```css
.result-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 100%;
  padding: 1.5rem;
}

.result-card {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
}

/* Layout responsivo do resultado */
@media (min-width: 768px) {
  .result-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
    align-items: start;
  }
}
```

#### **🎯 Componentes de Oferta (QuizOfferPageBlock)**
```css
.offer-container {
  max-width: 100%;
  margin: 0 auto;
}

.pricing-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@media (min-width: 768px) {
  .pricing-grid {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.cta-button {
  width: 100%;
  min-height: 3rem;
  font-size: 1.125rem;
  font-weight: 600;
}
```

### **5. Validação de Responsividade - Checklist Técnico**

#### **✅ Container Principal**
- [ ] `display: flex` aplicado
- [ ] `flex-direction: row` em desktop
- [ ] `flex-wrap: wrap` para quebra automática
- [ ] Largura máxima respeitada (`--global-width`)

#### **✅ Componentes Individuais**
- [ ] `max-width: 100%` em todos os itens
- [ ] `flex-basis: 100%` para ocupar linha completa
- [ ] `min-height` definida para evitar colapso
- [ ] Margins e paddings em unidades relativas (rem)

#### **✅ Grid de Opções**
- [ ] 1 coluna em mobile (≤767px)
- [ ] Máximo 2 colunas em tablet/desktop (≥768px)
- [ ] `gap` consistente entre itens
- [ ] `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`

#### **✅ Breakpoints**
- [ ] Mobile-first approach implementado
- [ ] `md:` classes aplicadas para ≥768px
- [ ] `lg:` classes aplicadas para ≥1024px
- [ ] Elementos mostrados/ocultos corretamente

#### **✅ Imagens**
- [ ] `object-cover` para manter proporção
- [ ] `w-full h-auto` para responsividade
- [ ] `max-width: 100%` para evitar overflow
- [ ] Lazy loading implementado quando possível

#### **✅ Tipografia**
- [ ] Font-sizes em unidades relativas (`text-lg`, `text-xl`)
- [ ] Line-height adequado para legibilidade
- [ ] Contrast ratio mínimo 4.5:1
- [ ] Texto não quebra de forma inadequada

#### **✅ Botões e Interação**
- [ ] `min-height: 44px` para touch targets
- [ ] `width: 100%` em mobile
- [ ] Estados de hover/focus definidos
- [ ] Disabled state visualmente claro

### **6. Ferramentas de Teste Recomendadas**

#### **DevTools - Responsive Design Mode**
```
Larguras de teste:
- 320px (iPhone SE)
- 375px (iPhone 12)
- 768px (iPad)
- 1024px (iPad Pro)
- 1440px (Desktop)
```

#### **Chrome DevTools - Lighthouse**
- [ ] Performance score ≥90
- [ ] Accessibility score ≥95
- [ ] Best Practices score ≥90

#### **Testes de Quebra**
- [ ] Redimensionar janela gradualmente
- [ ] Testar orientação portrait/landscape
- [ ] Zoom in/out (50% - 200%)
- [ ] Navegação por teclado funcional

---

## 📱 TESTE RESPONSIVO

### **Teste nos 3 dispositivos:**
1. **Mobile**: Redimensione o navegador para 375px
2. **Tablet**: Redimensione para 768px  
3. **Desktop**: Mantenha tela completa

### **Verificar em cada dispositivo:**
- ✅ Layout não quebra
- ✅ Textos legíveis
- ✅ Botões clicáveis
- ✅ Imagens proporcionais
- ✅ Navegação funcional

## 🎯 RELATÓRIO FINAL

### **Após a verificação, documente:**

#### **✅ Elementos Alinhados:**
- [ ] Textos idênticos
- [ ] Imagens corretas
- [ ] Valores exatos
- [ ] Layout responsivo
- [ ] Funcionalidades

#### **⚠️ Diferenças Encontradas:**
- [ ] Diferença 1: _______________
- [ ] Diferença 2: _______________
- [ ] Diferença 3: _______________

#### **🔧 Correções Necessárias:**
- [ ] Correção 1: _______________
- [ ] Correção 2: _______________
- [ ] Correção 3: _______________

## 🚀 PRÓXIMO PASSO

**Execute a verificação agora** e relate qualquer diferença encontrada para que possamos implementar as correções necessárias no editor.

---

**⏰ Tempo estimado**: 15-20 minutos para verificação completa
**🎯 Objetivo**: 100% de alinhamento entre produção e editor
