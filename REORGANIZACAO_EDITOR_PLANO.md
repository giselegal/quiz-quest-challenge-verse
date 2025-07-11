# 🗂️ REORGANIZAÇÃO ESTRUTURAL DO /editor

## 📋 Análise da Situação Atual

### ❌ Problemas Identificados:
1. **Arquivos duplicados:** Múltiplos editores (ModernQuizEditor, ModularQuizEditor, SchemaDrivenEditor...)
2. **Estrutura confusa:** Muitos componentes similares sem organização clara
3. **Responsabilidades misturadas:** Layout, propriedades, blocos tudo misturado

### ✅ Plano de Reorganização:

## 📁 Nova Estrutura Proposta

```
/client/src/components/editor/
├── core/                    # Core do editor
│   ├── EditorMain.tsx      # Componente principal unificado
│   ├── EditorContext.tsx   # Context para estado global
│   └── EditorTypes.ts      # Tipos TypeScript centralizados
├── ui/                     # Interface do usuário
│   ├── Layout.tsx          # Layout principal
│   ├── Toolbar.tsx         # Barra de ferramentas
│   ├── Sidebar.tsx         # Barra lateral
│   ├── Canvas.tsx          # Área de edição
│   └── PropertyPanel.tsx   # Painel de propriedades
├── blocks/                 # Blocos de conteúdo (manter existente)
│   ├── quiz/
│   ├── content/
│   └── ...
└── utils/                  # Utilitários
    ├── blockRegistry.ts    # Registro de blocos
    ├── editorHelpers.ts    # Funções auxiliares
    └── validation.ts       # Validação
```

## 🎯 Estratégia de Reorganização

### Etapa 1: Consolidar Editores
- Manter apenas 1 editor principal
- Remover duplicatas
- Centralizar funcionalidades

### Etapa 2: Organizar por Responsabilidade
- `core/` - Lógica principal
- `ui/` - Componentes de interface
- `blocks/` - Blocos de conteúdo
- `utils/` - Funções auxiliares

### Etapa 3: Limpeza
- Remover arquivos obsoletos
- Atualizar imports
- Documentar estrutura

---
**Status:** Pronto para iniciar reorganização
