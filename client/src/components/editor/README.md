# Editor Visual ES7 - Estrutura Reorganizada

## 📁 Estrutura do Projeto

```
/client/src/components/editor/
├── config/
│   └── EditorConfig.ts          # Configurações centrais do editor
├── types/
│   └── EditorTypes.ts           # Tipos TypeScript centralizados  
├── hooks/
│   └── useEditor.ts             # Hook principal para estado do editor
├── components/
│   ├── VisualEditor.tsx         # Componente principal do editor
│   ├── EditorSidebar.tsx        # Barra lateral com componentes
│   ├── EditorCanvas.tsx         # Canvas central de edição
│   ├── EditorProperties.tsx     # Painel de propriedades
│   ├── EditorToolbar.tsx        # Barra de ferramentas superior
│   └── BlockRenderer.tsx        # Renderizador de blocos
├── index.ts                     # Exportações centralizadas
└── README.md                    # Esta documentação
```

## 🎯 Padrões ES7 Implementados

### 1. **Componentes Funcionais com Hooks**
```tsx
// ✅ Padrão ES7
const MyComponent: React.FC<Props> = ({ prop1, prop2 }) => {
  const [state, setState] = useState();
  // ...
  return <div>...</div>;
};

// ❌ Evitar componentes de classe
class MyComponent extends React.Component {
  // ...
}
```

### 2. **Destructuring e Spread Operator**
```tsx
// ✅ Props destructuring
const Component: React.FC<Props> = ({ 
  title, 
  subtitle, 
  ...otherProps 
}) => {
  // ✅ State spreading
  const handleUpdate = (updates) => {
    setState(prev => ({ ...prev, ...updates }));
  };
};
```

### 3. **Async/Await**
```tsx
// ✅ Async/await ao invés de promises
const save = useCallback(async () => {
  try {
    await saveData();
  } catch (error) {
    setError('Erro ao salvar');
  }
}, []);
```

### 4. **Template Literals**
```tsx
// ✅ Template literals
const className = `editor-block ${isSelected ? 'selected' : ''}`;

// ❌ Concatenação de strings
const className = 'editor-block ' + (isSelected ? 'selected' : '');
```

### 5. **Optional Chaining**
```tsx
// ✅ Optional chaining
const createdAt = block.metadata?.createdAt;

// ❌ Verificação manual
const createdAt = block.metadata && block.metadata.createdAt;
```

## 🧩 Componentes Principais

### **VisualEditor** 
Componente principal que orquestra todo o editor.

```tsx
import { VisualEditor } from '@/components/editor';

<VisualEditor
  onSave={(blocks) => console.log(blocks)}
  initialBlocks={[]}
/>
```

### **useEditor Hook**
Hook para gerenciar estado do editor com actions Redux-like.

```tsx
import { useEditor } from '@/components/editor';

const editor = useEditor();

// Adicionar bloco
editor.addBlock('quiz-question', { question: 'Nova pergunta' });

// Atualizar bloco
editor.updateBlock('block-id', { title: 'Novo título' });

// Estado
console.log(editor.blocks, editor.selectedBlock, editor.isDirty);
```

## 🎨 Sistema de Tipos

### **EditorBlock**
```tsx
interface EditorBlock {
  id: string;
  type: BlockType;
  content: BlockContent;
  order: number;
  metadata?: {
    createdAt: Date;
    updatedAt: Date;
    version: string;
  };
}
```

### **BlockContent**
Conteúdo flexível para todos os tipos de bloco:
```tsx
interface BlockContent {
  // Comum
  title?: string;
  text?: string;
  
  // Quiz específico
  question?: string;
  options?: QuestionOption[];
  multipleSelection?: boolean;
  
  // Header
  logoUrl?: string;
  progressPercent?: number;
  
  // Estilo
  backgroundColor?: string;
  textColor?: string;
  
  // Dinâmico
  [key: string]: any;
}
```

## 🔧 Configuração

### **EditorConfig**
Configurações centralizadas em `config/EditorConfig.ts`:

```tsx
export const EDITOR_CONFIG = {
  layout: {
    sidebar: { width: '300px' },
    canvas: { maxWidth: '1200px' },
    properties: { width: '320px' }
  },
  autoSave: {
    enabled: true,
    interval: 30000
  }
};
```

## 🚀 Como Usar

### **1. Importar e Usar**
```tsx
import { VisualEditor } from '@/components/editor';

const MyPage = () => (
  <VisualEditor
    onSave={(blocks) => saveToDB(blocks)}
    initialBlocks={loadedBlocks}
  />
);
```

### **2. Adicionar Novos Tipos de Bloco**

1. **Adicione o tipo em `EditorTypes.ts`:**
```tsx
export type BlockType = 
  | 'quiz-question'
  | 'my-new-block'  // ← Novo tipo
  | ...
```

2. **Implemente o renderizador em `BlockRenderer.tsx`:**
```tsx
case 'my-new-block':
  return <MyNewBlockComponent {...props} />;
```

3. **Adicione à sidebar em `EditorSidebar.tsx`:**
```tsx
{
  type: 'my-new-block',
  name: 'Meu Novo Bloco',
  description: 'Descrição do bloco',
  icon: '🆕',
  category: 'content'
}
```

### **3. Configurar Propriedades**
Implemente em `EditorProperties.tsx`:
```tsx
case 'my-new-block':
  return (
    <div>
      <input 
        value={block.content.myProperty || ''}
        onChange={(e) => onUpdate({ myProperty: e.target.value })}
      />
    </div>
  );
```

## 📱 Responsividade

O editor é totalmente responsivo:
- **Mobile**: Sidebar colapsível, canvas adaptável
- **Tablet**: Layout otimizado para touch
- **Desktop**: Experiência completa com todos os painéis

## 🔄 Estado e Auto-save

- **Auto-save**: Salva automaticamente no localStorage a cada 30s
- **Dirty state**: Indica quando há mudanças não salvas
- **History**: Sistema de undo/redo (em desenvolvimento)

## 🧪 Testes

```bash
# Testar novo editor
npm run test editor

# Lint ES7 compliance
npm run lint:es7
```

## 📈 Performance

- **React.memo**: Componentes otimizados
- **useCallback**: Callbacks memoizados
- **Lazy loading**: Componentes carregados sob demanda
- **Virtual scrolling**: Para listas grandes

## 🎯 Próximos Passos

- [ ] Drag & Drop para reordenar blocos
- [ ] Sistema de undo/redo completo  
- [ ] Templates predefinidos
- [ ] Export/Import JSON
- [ ] Colaboração em tempo real
- [ ] Plugins system

---

**Desenvolvido com ES7+ e React Hooks** 🚀
