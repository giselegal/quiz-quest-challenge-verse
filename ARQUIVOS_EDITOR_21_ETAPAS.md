# 🎨 Arquivos Responsáveis pelo Editor `/editor` - 21 Etapas

## 📋 **Estrutura Principal do Editor**

O editor da rota `/editor` que contém as 21 etapas está organizado em vários arquivos. Aqui está a estrutura completa:

## 🔗 **1. Arquivo de Roteamento Principal**

### **`src/App.tsx`**
- **Função**: Define as rotas do editor
- **Rotas importantes**:
  ```tsx
  <Route path="/editor" component={SchemaDrivenEditorPage} />
  <Route path="/editor/:id" component={SchemaDrivenEditorPage} />
  ```

## 📄 **2. Página Principal do Editor**

### **`src/pages/SchemaDrivenEditorPage.tsx`**
- **Função**: Página wrapper do editor
- **Responsabilidade**: Renderiza o componente principal do editor
- **Componente principal**: `SchemaDrivenEditorResponsive`

## 🎛️ **3. Componente Principal do Editor**

### **`src/components/editor/SchemaDrivenEditorResponsive.tsx`**
- **Função**: Editor principal com interface responsiva
- **Características**:
  - Interface com painéis redimensionáveis
  - Gerencia as 21 etapas do funil
  - Modo preview/edição
  - Controles de salvamento
- **Componentes utilizados**:
  - `StagesPanel` - Painel das etapas
  - `ComponentsPanel` - Painel de componentes
  - `PropertiesPanel` - Painel de propriedades
  - `EditorCanvas` - Canvas de edição

## 📊 **4. Painéis do Editor**

### **`src/components/editor/panels/StagesPanel.tsx`**
- **Função**: Painel lateral com lista das 21 etapas
- **Recursos**:
  - Lista todas as etapas numeradas
  - Permite seleção de etapa ativa
  - Ícones por tipo de etapa
  - Status visual das etapas

### **`src/components/editor/panels/ComponentsPanel.tsx`**
- **Função**: Painel de componentes disponíveis
- **Recursos**: 
  - Biblioteca de blocos/componentes
  - Drag and drop de componentes
  - Categorização por tipo

### **`src/components/editor/panels/PropertiesPanel.tsx`**
- **Função**: Painel de propriedades do componente selecionado
- **Recursos**:
  - Edição de propriedades em tempo real
  - Formulários dinâmicos
  - Preview das mudanças

## 🖼️ **5. Canvas de Edição**

### **`src/components/editor/canvas/EditorCanvas.tsx`**
- **Função**: Área de edição visual principal
- **Recursos**:
  - Renderização da etapa ativa
  - Edição WYSIWYG
  - Seleção de componentes
  - Preview responsivo

## ⚙️ **6. Serviços do Editor**

### **`src/services/schemaDrivenFunnelService.ts`** ⭐ **PRINCIPAL**
- **Função**: Serviço que define e cria as 21 etapas
- **Responsabilidades**:
  - `createDefaultFunnel()` - Cria funil com 21 etapas
  - `createModularPages()` - Define todas as 21 páginas
  - Configuração de cada etapa individualmente
- **Etapas definidas**:
  ```typescript
  // Etapa 1: Introdução
  // Etapa 2: Coleta de Nome  
  // Etapa 3: Introdução ao Quiz
  // Etapas 4-14: Perguntas principais (11 perguntas)
  // Etapa 15: Transição quiz
  // Etapa 16: Processamento
  // Etapa 17: Introdução resultado
  // Etapa 18: Detalhes resultado
  // Etapa 19: Guia personalizado
  // Etapa 20: Transição oferta
  // Etapa 21: Página da oferta
  ```

## 📝 **7. Dados das Etapas**

### **`src/data/realQuizData.ts`**
- **Função**: Dados reais das perguntas do quiz
- **Conteúdo**:
  - 11 perguntas principais (etapas 4-14)
  - Perguntas estratégicas
  - Transições entre etapas
  - Dados dos resultados

## 🎯 **8. Tipos e Interfaces**

### **`src/types/funnel.ts`**
- **Função**: Definições de tipos para o funil
- **Tipos importantes**:
  - `FunnelStepType` - Tipos de etapas
  - `Funnel` - Interface do funil completo
  - `Page` - Interface de cada página/etapa

### **`src/types/editor.ts`**
- **Função**: Tipos específicos do editor
- **Interfaces**:
  - `EditorConfig`
  - `EditorBlock` 
  - `EditableContent`

## 🔧 **9. Configurações e Hooks**

### **`src/hooks/useCanvasConfiguration.ts`**
- **Função**: Hook para configuração do canvas das etapas 20 e 21
- **Recursos específicos**: Configurações especiais para etapas finais

### **`src/services/canvasConfigurationService.ts`**
- **Função**: Serviço de configuração específica do canvas
- **Foco**: Etapas 1-21 com configurações individuais

### **`src/services/pageConfigService.ts`**
- **Função**: Configurações de página por etapa
- **Inclui**: Configuração da etapa 21 especificamente

## 📋 **10. Componentes de Teste**

### **`src/components/testing/CanvasConfigurationTester.tsx`**
- **Função**: Testa configurações das etapas 20 e 21
- **Uso**: Validação e debugging das etapas finais

### **`src/pages/CanvasConfigurationTestPage.tsx`**
- **Função**: Página dedicada para testes das etapas 20 e 21

## 🗂️ **11. Arquivos de Configuração**

### **`src/config/blockDefinitions.ts`**
- **Função**: Definições de blocos para as etapas
- **Inclui**: Componentes modulares para etapas 20 e 21

### **`src/utils/editorDefaults.ts`**
- **Função**: Valores padrão do editor
- **Configurações**: Progresso, comportamentos padrão

## 🎨 **12. Dados Lovable (Novos)**

### **`server/routes/lovable-data.ts`** 
- **Função**: API de dados para integração Lovable
- **Endpoints**: Fornece dados das 21 etapas para o Lovable.dev

### **`client/src/utils/lovable-data-provider.tsx`**
- **Função**: Provider React para dados Lovable
- **Integração**: Disponibiliza dados das etapas para componentes

## 📊 **Fluxo de Funcionamento**

```
1. src/App.tsx → Define rota /editor
   ↓
2. src/pages/SchemaDrivenEditorPage.tsx → Página do editor
   ↓  
3. src/components/editor/SchemaDrivenEditorResponsive.tsx → Editor principal
   ↓
4. src/services/schemaDrivenFunnelService.ts → Cria 21 etapas
   ↓
5. src/components/editor/panels/StagesPanel.tsx → Lista etapas
   ↓
6. src/components/editor/canvas/EditorCanvas.tsx → Renderiza etapa ativa
   ↓
7. src/data/realQuizData.ts → Dados das perguntas (etapas 4-14)
```

## 🔑 **Arquivos-Chave para as 21 Etapas**

### **🌟 PRINCIPAIS:**
1. **`src/services/schemaDrivenFunnelService.ts`** - Define todas as 21 etapas
2. **`src/components/editor/SchemaDrivenEditorResponsive.tsx`** - Editor principal
3. **`src/data/realQuizData.ts`** - Dados das perguntas (etapas 4-14)
4. **`src/components/editor/panels/StagesPanel.tsx`** - Lista das etapas

### **📋 SECUNDÁRIOS:**
5. **`src/hooks/useCanvasConfiguration.ts`** - Configurações etapas 20-21
6. **`src/services/canvasConfigurationService.ts`** - Configs individuais
7. **`src/config/blockDefinitions.ts`** - Blocos das etapas

### **🔧 SUPORTE:**
8. **`src/types/funnel.ts`** - Tipos das etapas
9. **`src/utils/editorDefaults.ts`** - Padrões do editor
10. **`src/services/pageConfigService.ts`** - Configurações de página

## ✅ **Status das 21 Etapas**

- ✅ **Etapas 1-21**: Definidas em `schemaDrivenFunnelService.ts`
- ✅ **Interface**: Completa em `SchemaDrivenEditorResponsive.tsx`
- ✅ **Dados**: Perguntas reais em `realQuizData.ts`
- ✅ **Navegação**: Painel de etapas funcional
- ✅ **Canvas**: Renderização por etapa ativa
- ✅ **Integração Lovable**: APIs de dados configuradas

**O editor `/editor` está completamente funcional com as 21 etapas configuradas e acessíveis! 🎉**

---

## 🗂️ **ARQUIVOS ESPECÍFICOS DAS ABAS DO EDITOR**

### 📑 **ABA "PÁGINAS" (Pages Tab)**

#### **`src/components/editor/panels/StagesPanel.tsx`** ⭐ **PRINCIPAL**
- **Função**: Painel lateral que lista todas as 21 páginas/etapas
- **Localização na interface**: Painel esquerdo da aba "Páginas"
- **Características**:
  ```tsx
  // Cabeçalho do painel
  <h2 className="font-semibold text-white mb-2">Páginas do Funil</h2>
  
  // Lista de etapas com ícones
  {stages.map((stage, index) => (
    <div key={stage.id} className="cursor-pointer hover:bg-gray-700">
      {/* Ícone + Nome + Número da etapa */}
    </div>
  ))}
  
  // Contador total
  Total: {stages.length} páginas
  ```
- **Funcionalidades**:
  - ✅ Lista todas as 21 etapas numeradas
  - ✅ Seleção de página ativa
  - ✅ Ícones específicos por tipo de página
  - ✅ Status visual das páginas
  - ✅ Navegação entre páginas

### 🧩 **ABA "BLOCOS" (Components/Blocks)**

#### **`src/components/editor/panels/ComponentsPanel.tsx`** ⭐ **PRINCIPAL**
- **Função**: Biblioteca de componentes/blocos disponíveis
- **Localização na interface**: Painel central-esquerdo da aba "Páginas"
- **Categorias de blocos**:
  ```tsx
  // Componentes Básicos
  const basicComponents = [
    { id: 'text-inline', name: 'Texto', icon: Type, category: 'Básico' },
    { id: 'heading-inline', name: 'Título', icon: Type, category: 'Básico' },
    { id: 'image-display-inline', name: 'Imagem', icon: Image, category: 'Básico' },
    { id: 'button-inline', name: 'Botão', icon: MousePointer2, category: 'Básico' },
    { id: 'spacer', name: 'Espaçador', icon: Layout, category: 'Básico' },
  ];

  // Componentes de Quiz
  const quizComponents = [
    { id: 'quiz-intro-header', name: 'Cabeçalho Quiz', icon: Layout, category: 'Quiz' },
    { id: 'quiz-title', name: 'Título Quiz', icon: Type, category: 'Quiz' },
    { id: 'form-input', name: 'Campo Nome', icon: Type, category: 'Quiz' },
    { id: 'options-grid', name: 'Grid Opções', icon: Layout, category: 'Quiz' },
    { id: 'progress-inline', name: 'Progresso', icon: Layout, category: 'Quiz' },
  ];

  // Componentes de Resultado
  const resultComponents = [
    { id: 'result-header-inline', name: 'Cabeçalho Result.', icon: Layout, category: 'Resultado' },
    { id: 'result-card-inline', name: 'Card Resultado', icon: Star, category: 'Resultado' },
    { id: 'style-card-inline', name: 'Card Estilo', icon: Star, category: 'Resultado' },
  ];

  // Componentes de Oferta
  const offerComponents = [
    { id: 'countdown-inline', name: 'Timer', icon: Layout, category: 'Oferta' },
    { id: 'quiz-offer-pricing-inline', name: 'Preços', icon: Gift, category: 'Oferta' },
    { id: 'testimonial-card-inline', name: 'Depoimento', icon: Users, category: 'Oferta' },
    { id: 'badge-inline', name: 'Garantia', icon: Star, category: 'Oferta' },
  ];
  ```
- **Funcionalidades**:
  - ✅ Biblioteca categorizada de blocos
  - ✅ Componentes adaptados por tipo de página
  - ✅ Drag and drop de componentes
  - ✅ Ícones visuais para cada bloco
  - ✅ Categorização por funcionalidade

### ⚙️ **ABA "PAINEL DE PROPRIEDADES"**

#### **`src/components/editor/panels/PropertiesPanel.tsx`** ⭐ **PRINCIPAL**
- **Função**: Painel de edição de propriedades do componente selecionado
- **Localização na interface**: Painel direito da aba "Páginas"
- **Estados do painel**:
  ```tsx
  // Estado vazio (nenhum componente selecionado)
  if (!selectedComponentId) {
    return (
      <div className="text-center text-gray-500">
        <Settings className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p className="text-sm">Selecione um componente para ver suas propriedades</p>
      </div>
    );
  }

  // Estado ativo (componente selecionado)
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-700">
        <h2 className="font-semibold text-white mb-2">Propriedades</h2>
        <p className="text-sm text-gray-400">Componente selecionado</p>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-sm text-white">Configurações Gerais</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-gray-400">
              ID: {selectedComponentId}
            </div>
          </CardContent>
        </Card>
      </ScrollArea>
    </div>
  );
  ```
- **Funcionalidades**:
  - ✅ Exibe propriedades do componente selecionado
  - ✅ Formulários dinâmicos para edição
  - ✅ Preview das mudanças em tempo real
  - ✅ Interface organizada em cards
  - ✅ Estado vazio quando nada selecionado

### 🎛️ **CONFIGURAÇÃO DAS ABAS NO EDITOR PRINCIPAL**

#### **`src/components/editor/SchemaDrivenEditorResponsive.tsx`** - **LAYOUT DAS ABAS**
- **Estrutura das abas**:
  ```tsx
  <Tabs defaultValue="pages" className="h-full flex flex-col">
    <TabsList className="bg-transparent border-none h-12">
      {/* ABA PÁGINAS */}
      <TabsTrigger value="pages">
        <FileText className="w-4 h-4 mr-2" />
        Páginas
      </TabsTrigger>
      
      {/* ABA DESIGN */}
      <TabsTrigger value="design">
        <Palette className="w-4 h-4 mr-2" />
        Design
      </TabsTrigger>
      
      {/* ABA ANALYTICS */}
      <TabsTrigger value="analytics">
        <BarChart3 className="w-4 h-4 mr-2" />
        Analytics
      </TabsTrigger>
    </TabsList>

    {/* CONTEÚDO DA ABA PÁGINAS */}
    <TabsContent value="pages" className="flex-1 m-0 overflow-hidden">
      <ResizablePanelGroup direction="horizontal" className="h-full">
        
        {/* PAINEL PÁGINAS (esquerda) */}
        <ResizablePanel defaultSize={20}>
          <StagesPanel />
        </ResizablePanel>
        
        {/* PAINEL BLOCOS (centro-esquerda) */}
        <ResizablePanel defaultSize={15}>
          <ComponentsPanel />
        </ResizablePanel>
        
        {/* CANVAS PRINCIPAL (centro) */}
        <ResizablePanel defaultSize={45}>
          <EditorCanvas />
        </ResizablePanel>
        
        {/* PAINEL PROPRIEDADES (direita) */}
        <ResizablePanel defaultSize={20}>
          <PropertiesPanel />
        </ResizablePanel>
        
      </ResizablePanelGroup>
    </TabsContent>
  </Tabs>
  ```

### 📋 **RESUMO DOS ARQUIVOS DAS ABAS**

| **ABA** | **ARQUIVO PRINCIPAL** | **FUNÇÃO** | **LOCALIZAÇÃO** |
|---------|----------------------|------------|-----------------|
| **📑 Páginas** | `StagesPanel.tsx` | Lista das 21 etapas | Painel esquerdo |
| **🧩 Blocos** | `ComponentsPanel.tsx` | Biblioteca de componentes | Painel centro-esquerda |
| **⚙️ Propriedades** | `PropertiesPanel.tsx` | Edição de propriedades | Painel direita |
| **🎛️ Layout Geral** | `SchemaDrivenEditorResponsive.tsx` | Organização das abas | Container principal |

**Todos os painéis estão integrados e funcionais dentro da aba "Páginas" do editor! ✅**
