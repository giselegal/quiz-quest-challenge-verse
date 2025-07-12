# 🔗 Links e URLs do Projeto Quiz Quest Challenge Verse

## 🌐 **URLs Principais**

### 🎨 **Lovable.dev (Editor Visual)**
- **Projeto**: https://lovable.dev/projects/65efd17d-5178-405d-9721-909c97470c6d
- **ID**: `65efd17d-5178-405d-9721-909c97470c6d`
- **Status**: Configurado e integrado ao projeto local

### 🔗 **Replit (Desenvolvimento)**
- **Projeto**: https://replit.com/@giselegal/quiz-quest-challenge-verse
- **Ambiente**: Desenvolvimento colaborativo
- **Status**: Configurado com integração Lovable

### 🖥️ **Local Development**
- **Servidor**: http://localhost:8080
- **Editor Lovable**: http://localhost:8080?lovable=true
- **Admin Panel**: http://localhost:8080/admin
- **API**: http://localhost:8080/api

## 🛠️ **Configurações Atualizadas**

### ✅ **Arquivos Modificados:**

1. **`.lovable.json`** - Configuração principal
   ```json
   "projectId": "65efd17d-5178-405d-9721-909c97470c6d"
   "projectUrl": "https://lovable.dev/projects/65efd17d-5178-405d-9721-909c97470c6d"
   ```

2. **`client/lovable.config.json`** - Configuração do cliente
   ```json
   "projectId": "65efd17d-5178-405d-9721-909c97470c6d"
   "projectUrl": "https://lovable.dev/projects/65efd17d-5178-405d-9721-909c97470c6d"
   ```

3. **`.env.development`** - Variáveis de ambiente
   ```bash
   VITE_LOVABLE_PROJECT_ID=65efd17d-5178-405d-9721-909c97470c6d
   VITE_LOVABLE_PROJECT_URL=https://lovable.dev/projects/65efd17d-5178-405d-9721-909c97470c6d
   ```

4. **`client/lovable.tsx`** - Provider React
   ```typescript
   projectId: '65efd17d-5178-405d-9721-909c97470c6d'
   projectUrl: 'https://lovable.dev/projects/65efd17d-5178-405d-9721-909c97470c6d'
   ```

5. **`switch-db.sh`** - Script de configuração
   ```bash
   # Agora mostra URLs do Lovable e Replit
   ```

## 🚀 **Como Usar**

### **1. Desenvolvimento Local**
```bash
# Iniciar servidor com Lovable
npm run lovable:dev

# Acessar editor visual
http://localhost:8080?lovable=true
```

### **2. Lovable.dev Online**
```bash
# Abrir projeto no Lovable
https://lovable.dev/projects/65efd17d-5178-405d-9721-909c97470c6d

# Sincronizar mudanças locais
npm run lovable:build
npm run lovable:deploy
```

### **3. Replit Development**
```bash
# Abrir projeto no Replit
https://replit.com/@giselegal/quiz-quest-challenge-verse

# Executar com Lovable no Replit
npm run lovable:dev
```

## 🔄 **Sincronização de Ambientes**

### **Local ↔ Lovable.dev**
- Mudanças locais: `npm run lovable:build` → Upload para Lovable
- Mudanças no Lovable: Download automático ou manual sync

### **Local ↔ Replit**
- Git sync automático
- Mudanças refletidas em tempo real

### **Replit ↔ Lovable.dev**
- Conexão direta via projeto ID
- Configurações sincronizadas

## 📊 **Status de Integração**

| Ambiente | Status | URL | Lovable ID |
|----------|--------|-----|------------|
| **Local** | ✅ Ativo | localhost:8080 | Configurado |
| **Lovable.dev** | ✅ Conectado | lovable.dev/projects/65efd17d... | 65efd17d-5178-405d-9721-909c97470c6d |
| **Replit** | ✅ Disponível | replit.com/@giselegal/quiz... | Sincronizado |

## 🎯 **Próximos Passos**

### **1. Testar Integração Lovable**
```bash
# Local
http://localhost:8080?lovable=true

# Online
https://lovable.dev/projects/65efd17d-5178-405d-9721-909c97470c6d
```

### **2. Verificar Sincronização**
- Fazer mudança local → verificar se aparece no Lovable.dev
- Fazer mudança no Lovable.dev → verificar se sincroniza local

### **3. Deploy/Produção**
- Configurar deploy do Lovable.dev
- Conectar com Supabase quando conectividade permitir
- Configurar domínio customizado se necessário

## 🔧 **Comandos Úteis**

```bash
# Ver configuração atual
./switch-db.sh

# Testar Lovable local
npm run lovable:dev
curl http://localhost:8080?lovable=true

# Build para Lovable.dev
npm run lovable:build

# Deploy para Lovable.dev
npm run lovable:deploy

# Verificar URLs configuradas
grep -r "65efd17d-5178-405d-9721-909c97470c6d" .
```

## 📝 **Notas Importantes**

- ✅ **Project ID atualizado** em todos os arquivos
- ✅ **URLs configuradas** para sincronização
- ✅ **Ambiente local funcionando** na porta 8080
- ✅ **Integração Replit** mantida
- ✅ **Credenciais Supabase** preservadas para uso futuro

**Agora você tem acesso completo ao projeto tanto localmente quanto no Lovable.dev!**
