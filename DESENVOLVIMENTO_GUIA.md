# 🚀 Guia de Desenvolvimento - Quiz Quest Challenge Verse

## ✅ **Problema Resolvido!**

O aviso `⚠️ DATABASE_URL não definida - funcionalidade limitada` foi **resolvido**!

## 🛠️ **Como Iniciar o Desenvolvimento**

### **Opção 1: Desenvolvimento Local (Recomendado)**
```bash
# Terminal 1: Backend (SQLite)
npm run dev:sqlite

# Terminal 2: Frontend
npm run dev:local
```

**URLs:**
- Frontend: `http://localhost:8081`
- Backend API: `http://localhost:5000`
- Editor: `http://localhost:8081/editor`

### **Opção 2: Com Supabase (Produção)**
1. Configure a senha do Supabase no `.env`:
```bash
DATABASE_URL="postgresql://postgres:[SUA_SENHA]@db.txqljpitotmcxntprxiu.supabase.co:5432/postgres"
```

2. Execute:
```bash
npm run dev:supabase  # Backend com PostgreSQL
npm run dev:local     # Frontend
```

## 📁 **Arquivos de Configuração**

### **`.env` - Configuração Principal**
```env
DATABASE_URL="postgresql://postgres:[YOUR_PASSWORD]@db.txqljpitotmcxntprxiu.supabase.co:5432/postgres"
SUPABASE_URL="https://txqljpitotmcxntprxiu.supabase.co"
SESSION_SECRET="quiz_quest_secret_dev_2025"
```

### **`.env.local` - Desenvolvimento Local**
```env
DATABASE_URL="file:./dev.db"
SESSION_SECRET="quiz_quest_local_dev_2025"
```

## 🎯 **Scripts Disponíveis**

| Script | Descrição |
|--------|-----------|
| `npm run dev:sqlite` | Backend com SQLite (desenvolvimento) |
| `npm run dev:supabase` | Backend com Supabase (produção) |
| `npm run dev:local` | Frontend com configuração simples |
| `npm run dev:clean` | Frontend com cache limpo |
| `npm run lovable:dev` | Frontend com integração Lovable |

## 🔧 **Configuração do Banco**

O sistema agora funciona com **dois tipos** de banco:

### **SQLite (Desenvolvimento)**
- ✅ **Automático** - não precisa configurar nada
- ✅ **Local** - arquivo `./dev.db` criado automaticamente
- ✅ **Rápido** - ideal para desenvolvimento
- ⚠️ **Limitado** - algumas funcionalidades podem não estar disponíveis

### **PostgreSQL/Supabase (Produção)**
- ✅ **Completo** - todas as funcionalidades
- ✅ **Cloud** - sincronizado na nuvem
- ⚠️ **Requer configuração** - precisa da senha do Supabase

## 🔍 **Diagnóstico**

### **✅ Funcionando Corretamente**
Você deve ver no console:
```
✅ SQLite conectado com sucesso!
9:18:29 PM [express] serving on port 5000
```

### **❌ Problemas Comuns**

**1. Erro de dependências `@/`:**
- **Solução**: Use `npm run dev:local` para o frontend

**2. "DATABASE_URL não definida":**
- **Solução**: Use `npm run dev:sqlite` para SQLite local

**3. Erro de conexão PostgreSQL:**
- **Solução**: Verifique a senha no `.env` ou use SQLite

## 🎨 **Acessando o Editor**

1. Inicie o desenvolvimento: `npm run dev:sqlite` + `npm run dev:local`
2. Acesse: `http://localhost:8081/editor`
3. A aba "Blocos" está totalmente funcional!

## 💡 **Dicas Importantes**

- **Para desenvolvimento diário**: Use SQLite (mais rápido)
- **Para funcionalidades completas**: Configure Supabase
- **Para Lovable**: Use `npm run lovable:dev` no frontend
- **Frontend e Backend**: Rodem em portas separadas (8081 e 5000)

---

**🎉 Agora você pode desenvolver sem problemas de configuração!**
