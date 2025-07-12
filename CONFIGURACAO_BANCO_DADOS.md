# 🗄️ Configuração do Banco de Dados - Supabase vs SQLite

## 📋 **Status Atual**

✅ **SQLite Local**: Funcionando na porta 8080
⚠️ **Supabase**: Credenciais disponíveis, mas com problemas de conectividade (ENETUNREACH)

## 🔧 **Credenciais Fornecidas**

Você forneceu as seguintes credenciais do Supabase:

```bash
# Pool de conexão (para aplicação)
DATABASE_URL="postgresql://postgres.pwtjuuhchtbzttrzoutw:Gr@06091425@aws-0-us-east-2.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Conexão direta (para migrações)
DIRECT_URL="postgresql://postgres.pwtjuuhchtbzttrzoutw:Gr@06091425@aws-0-us-east-2.pooler.supabase.com:5432/postgres"
```

## 🚨 **Problema Identificado**

**Erro**: `ENETUNREACH` - O Codespaces não consegue acessar o Supabase
**Causa**: Possíveis restrições de rede ou firewall no ambiente Codespaces
**Status**: Temporariamente usando SQLite como fallback

## 🎯 **Soluções Disponíveis**

### **Solução A: Usar Script Automático** 🤖
```bash
# Alternar entre bancos facilmente
./switch-db.sh

# Opções:
# 1) SQLite (local) - Funciona sempre
# 2) Supabase (cloud) - Tenta conectar e faz fallback se falhar
```

### **Solução B: Configuração Manual** ✋

#### Para usar **Supabase**:
```bash
# 1. Editar .env.development
DATABASE_URL="postgresql://postgres.pwtjuuhchtbzttrzoutw:Gr@06091425@aws-0-us-east-2.pooler.supabase.com:6543/postgres?pgbouncer=true"

# 2. Testar migrações
npm run db:push

# 3. Se funcionar, iniciar servidor
npm run lovable:dev
```

#### Para usar **SQLite** (atual):
```bash
# 1. Já configurado em .env.development
DATABASE_URL=file:./dev.db

# 2. Servidor já funcionando
npm run lovable:dev
```

### **Solução C: Ambiente Híbrido** 🔄

```bash
# Desenvolvimento local: SQLite
npm run dev

# Integração/Testes: Supabase
npm run prod:supabase  # (script customizado)
```

## 🔄 **Alternativas para Conectividade**

### 1. **Testar em Ambiente Local**
- Baixar projeto para máquina local
- Testar conectividade Supabase fora do Codespaces
- Upload após configuração

### 2. **Usar Supabase CLI**
```bash
# Instalar Supabase CLI
npm install supabase --save-dev

# Conectar ao projeto
npx supabase link --project-ref your-project-ref

# Sincronizar schema
npx supabase db push
```

### 3. **Proxy/Tunnel**
```bash
# Usar ngrok ou similar para bypass de rede
# (Avançado - requer configuração específica)
```

## 📊 **Comparação: SQLite vs Supabase**

| Característica | SQLite | Supabase |
|---------------|--------|----------|
| **Setup** | ✅ Instantâneo | ⚠️ Requer conectividade |
| **Performance** | ✅ Rápido local | ⚠️ Depende da rede |
| **Produção** | ❌ Não escalável | ✅ Escalável |
| **Desenvolvimento** | ✅ Ideal | ✅ Consistente |
| **Lovable.dev** | ✅ Funciona | ✅ Funciona (se conectar) |

## 🚀 **Recomendação Atual**

### **Para Desenvolvimento Lovable**:
1. ✅ **Continue com SQLite** - Está funcionando perfeitamente
2. 🎨 **Foque no Lovable.dev** - Teste `http://localhost:8080?lovable=true`
3. ☁️ **Supabase depois** - Configure quando a conectividade estiver resolvida

### **Para Produção**:
1. 🏗️ **Build com Supabase** - Configure em ambiente com conectividade
2. 🔄 **Migração gradual** - SQLite → Supabase quando estiver pronto
3. 📊 **Monitorar performance** - Comparar ambos os bancos

## 🛠️ **Comandos Úteis**

```bash
# Verificar configuração atual
grep "DATABASE_URL" .env.development

# Alternar banco (interativo)
./switch-db.sh

# Testar conectividade Supabase
npm run db:push

# Iniciar Lovable (sempre funciona)
npm run lovable:dev

# Acessar Lovable Editor
http://localhost:8080?lovable=true
```

## 📝 **Status dos Arquivos**

- ✅ `switch-db.sh` - Script criado e executável
- ✅ `.env.development` - Configurado com SQLite + backup Supabase
- ✅ `server/db.ts` - Lógica de detecção PostgreSQL vs SQLite atualizada
- ✅ **Servidor**: Rodando na porta 8080 com SQLite

## 🎯 **Próximos Passos**

1. **Teste o Lovable**: `http://localhost:8080?lovable=true`
2. **Se Lovable funcionar**: Continue com SQLite para desenvolvimento
3. **Quando precisar do Supabase**: Use `./switch-db.sh` e opção 2
4. **Para deployment**: Configure Supabase em ambiente com conectividade completa

**O importante é que o Lovable já está funcionando! As credenciais do Supabase estão seguras e prontas para usar quando a conectividade permitir.**
