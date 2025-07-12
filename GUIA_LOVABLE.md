# 🎨 Configuração Lovable - Guia Completo

## ✅ Status da Configuração

✅ **Arquivo principal do Lovable criado**: `client/lovable.tsx`  
✅ **Configuração JSON**: `client/lovable.config.json`  
✅ **Plugin Vite integrado**: `vite.config.ts`  
✅ **Provider integrado**: `client/src/main.tsx`  
✅ **Variáveis de ambiente**: `.env.development`  
✅ **Build funcionando**: Sem erros  
✅ **Servidor rodando**: Porta 5000  

---

## 🚀 Como Usar o Lovable

### 1. **Iniciar o Ambiente de Desenvolvimento**

```bash
# Instalar dependências (se necessário)
npm install

# Iniciar servidor
npm run dev
```

### 2. **Acessar o Editor Lovable**

Há três formas de ativar o editor:

**Opção 1 - URL com parâmetro:**
```
http://localhost:8080?lovable=true
```

**Opção 2 - Rota admin:**
```
http://localhost:8080/admin
```

**Opção 3 - Página inicial:**
```
http://localhost:8080/
```

### 3. **Componentes Disponíveis**

Os seguintes componentes já estão configurados para edição:

- **QuizCover** - Capa do quiz
- **QuizQuestion** - Perguntas do quiz  
- **QuizLogic** - Lógica e fluxo do quiz
- **ResultPageEditor** - Página de resultados

### 4. **Estrutura de Arquivos**

```
client/
├── lovable.tsx              # Configuração principal
├── lovable.config.json      # Configurações do projeto
└── src/
    └── components/
        └── lovable/         # Componentes editáveis
            ├── QuizCover.lovable.tsx
            ├── QuizQuestion.lovable.tsx
            ├── QuizLogic.lovable.tsx
            └── ResultPageEditor.lovable.tsx
```

---

## 🔧 Personalização

### Criando Novos Componentes Lovable

```tsx
import { defineLovable } from "../../lovable";

export default defineLovable({
  name: "MeuComponente",
  displayName: "Meu Componente",
  description: "Descrição do componente",
  category: "Categoria",
  
  defaultProps: {
    titulo: "Título padrão",
    cor: "#000000"
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

### Registrando no Lovable Config

Adicione no `client/lovable.config.json`:

```json
{
  "components": [
    {
      "name": "MeuComponente",
      "file": "src/components/lovable/MeuComponente.lovable.tsx",
      "category": "Categoria"
    }
  ]
}
```

---

## 📦 Deploy para Lovable.dev

### 1. **Preparar Variáveis de Ambiente**

Configure no painel do Lovable:

```env
NODE_ENV=production
DATABASE_URL=postgresql://postgres:[SUA_SENHA]@db.inabgbgrgzfxgkbdaush.supabase.co:5432/postgres
SUPABASE_URL=https://inabgbgrgzfxgkbdaush.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImluYWJnYmdyZ3pmeGdrYmRhdXNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyNjM1MTcsImV4cCI6MjA2NzgzOTUxN30.RftMKxnqV09nWIVAbJIWMTS-JxiVDOhPZneAXuocGfU
SESSION_SECRET=quiz_quest_secret_prod_2025
```

### 2. **Executar Migrações (se necessário)**

```bash
npm run db:push
```

### 3. **Deploy**

O projeto está pronto para deploy no Lovable.dev!

---

## 🔍 Debugging

### Verificar se o Lovable está ativo:

```javascript
// No console do navegador
console.log(window.LOVABLE_CONFIG);
console.log(window.LOVABLE_COMPONENTS);
```

### Logs de desenvolvimento:

O Lovable registra automaticamente os componentes quando detecta:
- URL com `?lovable=true`
- Rota `/admin`
- Rota raiz `/`

---

## 📚 Recursos Adicionais

- **Documentação oficial**: [docs.lovable.dev](https://docs.lovable.dev)
- **Suporte**: [support@lovable.dev](mailto:support@lovable.dev)
- **Configuração Supabase**: `CONFIGURACAO_LOVABLE.md`

---

## 🎉 Próximos Passos

1. ✅ **Configuração concluída**
2. 🔄 **Testar editor**: Acesse `http://localhost:8080?lovable=true`
3. 🎨 **Personalizar componentes**
4. 🚀 **Deploy para produção**

**Seu projeto está 100% configurado para o Lovable!** 🎊
