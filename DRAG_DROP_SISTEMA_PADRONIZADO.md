# Sistema Drag & Drop Padronizado com @dnd-kit

Este documento descreve a implementação padronizada do sistema de drag & drop usando @dnd-kit para garantir consistência, performance e acessibilidade em todo o projeto.

## 📋 Arquitetura

### Core Components

- **StandardDndKit.tsx** - Contexto e configurações centralizadas
- **hooks.ts** - Hooks padronizados para funcionalidades comuns  
- **CustomDragOverlay.tsx** - Overlay customizado para drag
- **DropZoneIndicator.tsx** - Indicadores visuais de drop zones

## 🚀 Uso Básico

### 1. Provider Global (Opcional)

```tsx
import { DndKitProvider } from '@/components/drag-drop/StandardDndKit';

function App() {
  return (
    <DndKitProvider 
      config={{
        activationDistance: 8,
        sortingStrategy: 'vertical',
        direction: 'vertical'
      }}
    >
      <YourApp />
    </DndKitProvider>
  );
}
```

### 2. Contexto Padronizado

```tsx
import { StandardDndContext } from '@/components/drag-drop/StandardDndKit';

function MyDragDropList({ items, onReorder }) {
  const handleDragEnd = (event) => {
    // Lógica de reordenação
  };

  return (
    <StandardDndContext
      items={items}
      onDragEnd={handleDragEnd}
      config={{
        sortingStrategy: 'vertical',
        direction: 'vertical',
        activationDistance: 8
      }}
      renderOverlay={(activeId, activeItem) => (
        <div>Movendo: {activeItem?.name}</div>
      )}
    >
      {items.map(item => (
        <SortableItem key={item.id} item={item} />
      ))}
    </StandardDndContext>
  );
}
```

### 3. Hook Padronizado para Sortable

```tsx
import { useStandardSortable } from '@/components/drag-drop/hooks';

function SortableItem({ item }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    style,
    isDragging,
    isOver,
    canDrop
  } = useStandardSortable(item.id);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={isDragging ? 'opacity-50' : ''}
      {...attributes}
      {...listeners}
    >
      {item.content}
    </div>
  );
}
```

## ⚙️ Configurações

### Opções de Configuração

```typescript
interface DndKitConfig {
  // Sensores
  activationDistance?: number;      // Default: 8
  activationDelay?: number;         // Default: 150
  activationTolerance?: number;     // Default: 5
  
  // Estratégias
  sortingStrategy?: 'vertical' | 'horizontal' | 'grid';  // Default: 'vertical'
  collisionDetection?: 'center' | 'corners' | 'intersection';  // Default: 'center'
  
  // Direções
  direction?: 'vertical' | 'horizontal' | 'both';  // Default: 'vertical'
  
  // Modifiers
  restrictToParent?: boolean;       // Default: true
  restrictToWindow?: boolean;       // Default: true
  
  // Acessibilidade
  announcements?: Partial<Announcements>;
}
```

### Presets Disponíveis

```tsx
import { useDragDropPresets } from '@/components/drag-drop/useDragDropSensors';

function MyComponent() {
  const { mobileConfig, desktopConfig, accessibilityConfig } = useDragDropPresets();
  
  // Use o preset apropriado
  const config = isMobile ? mobileConfig : desktopConfig;
}
```

## 🎯 Hooks Utilitários

### 1. useStandardSortable

Hook principal para componentes arrastáveis:

```tsx
const {
  attributes,      // Atributos para drag handle
  listeners,       // Event listeners para drag
  setNodeRef,      // Ref para o elemento
  style,           // Estilos de transformação
  isDragging,      // Estado de arraste
  isOver,          // Está sobre uma drop zone
  canDrop,         // Pode ser solto aqui
  config           // Configuração ativa
} = useStandardSortable(id, disabled);
```

### 2. useSortableArray

Hook para gerenciar arrays com drag & drop:

```tsx
const {
  items,           // Array atual
  moveItem,        // Mover item
  addItem,         // Adicionar item
  removeItem,      // Remover item
  updateItem,      // Atualizar item
  reorderItems     // Reordenar array completo
} = useSortableArray(initialItems);
```

### 3. useDragTransforms

Hook para transformações visuais:

```tsx
const {
  getDragStyle,           // Estilo durante drag
  getDropIndicatorStyle   // Estilo de drop indicator
} = useDragTransforms();

const dragStyle = getDragStyle(transform, transition, isDragging);
```

### 4. useDragAccessibility

Hook para acessibilidade:

```tsx
const {
  announceToScreenReader,  // Anunciar para screen readers
  getDragAttributes,       // Atributos de acessibilidade
  getKeyboardInstructions  // Instruções de teclado
} = useDragAccessibility();
```

## 📱 Responsividade e Mobile

### Touch Support

O sistema inclui suporte otimizado para touch:

```tsx
<StandardDndContext
  config={{
    activationDelay: 250,    // Delay maior para evitar conflito com scroll
    activationTolerance: 8   // Tolerância maior para touch
  }}
>
```

### Presets Mobile

```tsx
const { mobileConfig } = useDragDropPresets();
// activationDistance: 10, activationDelay: 300, activationTolerance: 8
```

## ♿ Acessibilidade

### Navegação por Teclado

- **Setas**: Navegar entre itens
- **Enter**: Ativar modo de arraste
- **Setas**: Mover item durante arraste
- **Enter**: Soltar item
- **Escape**: Cancelar arraste

### Screen Reader Support

```tsx
<StandardDndContext
  config={{
    announcements: {
      onDragStart: ({ active }) => `Iniciando movimento do item ${active.id}`,
      onDragEnd: ({ active, over }) => 
        over ? `Item ${active.id} foi movido para ${over.id}` : 'Movimento cancelado'
    }
  }}
>
```

## 🎨 Customização Visual

### Overlay Customizado

```tsx
<StandardDndContext
  renderOverlay={(activeId, activeItem) => (
    <div className="custom-drag-overlay">
      <h3>{activeItem?.title}</h3>
      <p>Movendo...</p>
    </div>
  )}
>
```

### Estilos de Drag

```tsx
const { getDragStyle } = useDragTransforms();

const style = getDragStyle(transform, transition, isDragging);
// Adiciona: opacity, boxShadow, transform com rotação e escala
```

### Drop Indicators

```tsx
import { DropZoneIndicator } from '@/components/drag-drop/DropZoneIndicator';

<DropZoneIndicator isOver={isOver} canDrop={canDrop}>
  <YourComponent />
</DropZoneIndicator>
```

## 🔧 Migração de Código Existente

### Antes (Manual @dnd-kit)

```tsx
import { DndContext, useSortable, closestCenter } from '@dnd-kit/core';

function MyComponent() {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter}>
      {/* Componentes */}
    </DndContext>
  );
}
```

### Depois (Padronizado)

```tsx
import { StandardDndContext } from '@/components/drag-drop/StandardDndKit';

function MyComponent() {
  return (
    <StandardDndContext
      items={items}
      onDragEnd={handleDragEnd}
      config={{ activationDistance: 8 }}
    >
      {/* Componentes */}
    </StandardDndContext>
  );
}
```

## 📊 Performance

### Otimizações Incluídas

- **React.memo** em componentes visuais
- **useCallback** para handlers
- **useMemo** para configurações
- **Sensores otimizados** para cada dispositivo
- **Throttling** automático em eventos

### Métricas de Performance

Com a padronização:
- ⬆️ **Score médio**: 51.1/100 → 75+/100 (esperado)
- ⬆️ **Sensores**: Configuração consistente
- ⬆️ **Acessibilidade**: Suporte completo
- ⬆️ **Mobile**: Touch otimizado

## 🧪 Testes

### Casos de Teste Recomendados

1. **Funcionalidade Básica**
   - Arrastar e soltar itens
   - Reordenação correta
   - Cancelamento de drag

2. **Mobile/Touch**
   - Scroll vs drag
   - Gestos touch
   - Performance em mobile

3. **Acessibilidade**
   - Navegação por teclado
   - Screen reader
   - Focus management

4. **Edge Cases**
   - Lista vazia
   - Item único
   - Drag rápido/múltiplo

## 🔄 Roadmap

### Próximas Melhorias

- [ ] Auto-scroll durante drag
- [ ] Drag entre listas diferentes
- [ ] Animações de transição
- [ ] Gestos avançados (pinch, rotate)
- [ ] Persistência de estado
- [ ] Undo/Redo para operações

### Compatibilidade

- ✅ @dnd-kit/core: ^6.3.1
- ✅ @dnd-kit/sortable: ^10.0.0
- ✅ @dnd-kit/utilities: ^3.2.2
- ✅ @dnd-kit/modifiers: ^9.0.0
- ✅ React: 18+
- ✅ TypeScript: 4.8+
