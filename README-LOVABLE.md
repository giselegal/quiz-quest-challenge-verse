# 🎨 Configuração do Lovable - Quiz Quest Challenge Verse

## 📋 Visão Geral

Este projeto está configurado para usar o **Lovable** como editor visual de componentes. O Lovable permite editar componentes React de forma visual, sem necessidade de código.

## 🚀 Quick Start

### 1. Configuração Inicial

```bash
# Execute o script de configuração
./setup-lovable.sh

# Ou instale manualmente
npm install
npm run db:push
```

### 2. Iniciando o Desenvolvimento

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Acessar editor Lovable
# Opção 1: http://localhost:8080?lovable=true
# Opção 2: http://localhost:8080/admin
```

## 🧩 Componentes Lovable Disponíveis

### Quiz Components
- **QuizCover** - Capa do quiz com logo e call-to-action
- **QuizQuestion** - Pergunta individual com opções personalizáveis  
- **QuizLogic** - Lógica completa do quiz com fluxo
- **ResultPageEditor** - Página de resultado com oferta

### Localização dos Arquivos
```
client/src/components/lovable/
├── QuizCover.lovable.tsx
├── QuizQuestion.lovable.tsx
├── QuizLogic.lovable.tsx
└── ResultPageEditor.lovable.tsx
```

## ⚙️ Configuração

### Arquivos de Configuração
- `client/lovable.ts` - Core do sistema Lovable
- `client/lovable.config.json` - Configuração do projeto
- `.env.development` - Variáveis de ambiente

### Variáveis de Ambiente Importantes
```env
VITE_LOVABLE_ENABLED=true
VITE_LOVABLE_PROJECT_ID=quiz-sell-genius
VITE_LOVABLE_EDITOR_MODE=true
```

## 🎯 Como Usar o Editor

### 1. Modo Desenvolvimento
- Acesse `http://localhost:8080?lovable=true`
- Os componentes ficam editáveis visualmente
- Mudanças são salvas automaticamente

### 2. Modo Produção
- Remove parâmetros de editor
- Componentes funcionam normalmente
- Performance otimizada

## 🔧 Customização

### Criando Novos Componentes Lovable

```typescript
import { defineLovable } from "../../../lovable";

export default defineLovable({
  name: "MeuComponente",
  displayName: "Meu Componente",
  description: "Descrição do componente",
  category: "Custom",
  
  defaultProps: {
    titulo: "Título Padrão",
    cor: "#FF0000"
  },
  
  propsSchema: {
    titulo: {
      type: "string",
      displayName: "Título",
      description: "Título do componente"
    },
    cor: {
      type: "color",
      displayName: "Cor",
      description: "Cor principal"
    }
  },
  
  render: ({ titulo, cor }) => (
    <div style={{ color: cor }}>
      <h1>{titulo}</h1>
    </div>
  )
});
```

### Tipos de Props Suportados
- `string` - Texto
- `number` - Número
- `boolean` - Verdadeiro/Falso
- `color` - Seletor de cor
- `image` - Upload de imagem
- `array` - Lista de itens
- `object` - Objeto aninhado

## 🌐 Deploy

### Variáveis de Ambiente para Produção
```env
NODE_ENV=production
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.inabgbgrgzfxgkbdaush.supabase.co:5432/postgres
SUPABASE_URL=https://inabgbgrgzfxgkbdaush.supabase.co
SUPABASE_ANON_KEY=[SUA_CHAVE]
SESSION_SECRET=quiz_quest_secret_prod_2025
```

### Plataformas Suportadas
- **Vercel** ✅
- **Netlify** ✅  
- **Lovable Cloud** ✅
- **Heroku** ✅

## 📚 Estrutura do Projeto

```
quiz-quest-challenge-verse/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── lovable/          # Componentes editáveis
│   │   │   └── LovableClientProvider.tsx
│   │   └── plugins/
│   │       └── lovable-component-tagger.ts
│   ├── lovable.ts                # Core Lovable
│   └── lovable.config.json       # Configuração
├── setup-lovable.sh              # Script de setup
└── CONFIGURACAO_LOVABLE.md       # Guia de deploy
```

## 🎨 Interface do Editor

### Painel de Propriedades
- Controles visuais para cada prop
- Preview em tempo real
- Validação automática

### Seletor de Componentes
- Lista todos os componentes disponíveis
- Agrupados por categoria
- Busca por nome

### Preview
- Visualização em tempo real
- Responsivo (mobile/tablet/desktop)
- Modo de edição destacado

## 🐛 Troubleshooting

### Problemas Comuns

**Editor não aparece:**
```bash
# Verificar se está no modo correto
http://localhost:8080?lovable=true

# Verificar console do navegador
# Deve mostrar: "Lovable Editor Loaded"
```

**Componente não editable:**
```typescript
// Verificar se usa defineLovable
import { defineLovable } from "../../../lovable";

// Verificar se tem propsSchema
propsSchema: {
  // propriedades aqui
}
```

**Erro de build:**
```bash
# Limpar cache
rm -rf node_modules dist
npm install
npm run build
```

### Logs Úteis
```bash
# Ver logs do Vite
npm run dev -- --debug

# Ver logs do plugin Lovable
console.log no browser dev tools
```

## 🤝 Contribuição

1. Crie novos componentes em `client/src/components/lovable/`
2. Use a convenção `NomeComponente.lovable.tsx`
3. Adicione ao `lovable.config.json`
4. Teste no editor antes do commit

## 📞 Suporte

- **Documentação:** [docs.lovable.dev](https://docs.lovable.dev)
- **GitHub:** [github.com/lovable-dev](https://github.com/lovable-dev)
- **Discord:** [discord.gg/lovable](https://discord.gg/lovable)

---

✨ **Pronto para criar experiências incríveis com Lovable!** ✨
