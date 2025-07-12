# 🚀 Configuração para Deploy no Lovable

## Credenciais Atualizadas do Supabase

**URL do Projeto:** `https://inabgbgrgzfxgkbdaush.supabase.co`
**API Key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImluYWJnYmdyZ3pmeGdrYmRhdXNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyNjM1MTcsImV4cCI6MjA2NzgzOTUxN30.RftMKxnqV09nWIVAbJIWMTS-JxiVDOhPZneAXuocGfU`

## ⚙️ Variáveis de Ambiente para o Lovable

Configure as seguintes variáveis no painel de Environment Variables do Lovable:

### 🔑 Variáveis Obrigatórias

```env
NODE_ENV=production
DATABASE_URL=postgresql://postgres:[SUA_SENHA_SUPABASE]@db.inabgbgrgzfxgkbdaush.supabase.co:5432/postgres
SUPABASE_URL=https://inabgbgrgzfxgkbdaush.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImluYWJnYmdyZ3pmeGdrYmRhdXNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIyNjM1MTcsImV4cCI6MjA2NzgzOTUxN30.RftMKxnqV09nWIVAbJIWMTS-JxiVDOhPZneAXuocGfU
SESSION_SECRET=quiz_quest_secret_prod_2025
```

### 📝 Como obter a senha do Supabase

1. Acesse: https://supabase.com/dashboard/project/inabgbgrgzfxgkbdaush
2. Vá em **Settings** → **Database** 
3. Copie a **Database Password** 
4. Substitua `[SUA_SENHA_SUPABASE]` na DATABASE_URL

### 🎯 Variáveis Opcionais

```env
PORT=5000
VITE_FACEBOOK_PIXEL_ID=1311550759901086
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
VITE_BASE_URL=https://seu-dominio-lovable.com
VITE_API_URL=https://seu-dominio-lovable.com/api
```

## 🗄️ Configuração do Banco de Dados

### Criar Tabelas (Primeira vez)

Se for o primeiro deploy, execute as migrações:

```bash
npm run db:push
```

### Schema Usado

O projeto usa **PostgreSQL** com Drizzle ORM:
- **Desenvolvimento:** SQLite local (dev.db)
- **Produção:** PostgreSQL/Supabase

## ✅ Checklist de Deploy

- [ ] Configurar DATABASE_URL com senha real
- [ ] Configurar SUPABASE_URL e SUPABASE_ANON_KEY  
- [ ] Definir NODE_ENV=production
- [ ] Executar migrações (se necessário)
- [ ] Testar conexão do banco

## 🔧 Troubleshooting

**Erro: "DATABASE_URL não definida"**
- ✅ Verificar se DATABASE_URL está configurada
- ✅ Confirmar se a senha está correta
- ✅ Testar conexão com o Supabase

**Erro de CSS/Build**
- ✅ Já corrigido - cores dinâmicas substituídas por classes estáticas

## 📋 URLs Finais

- **Supabase Dashboard:** https://supabase.com/dashboard/project/inabgbgrgzfxgkbdaush
- **Aplicação Lovable:** [Será gerada após deploy]

---

## 🎉 Status

✅ **Configuração atualizada com novo Supabase**
✅ **Problemas de CSS corrigidos** 
✅ **Pronto para deploy no Lovable**

Agora o projeto deve funcionar perfeitamente no Lovable! 🚀
