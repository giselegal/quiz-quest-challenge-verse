# 📊 GUIA: COMO ACESSAR DADOS DOS USUÁRIOS E ANALYTICS

## 🔍 **ENDPOINTS DISPONÍVEIS PARA DADOS DOS USUÁRIOS**

### 1. **RESPOSTAS DO QUIZ**
```bash
# Todos os resultados dos quizzes
GET /api/quiz-results
# Retorna: participantId, respostas, pontuações, estilo predominante

# Resultados por participante específico  
GET /api/quiz-results/participant/:participantId
```

### 2. **DADOS DOS PARTICIPANTES**
```bash
# Todos os participantes
GET /api/quiz-participants  
# Retorna: nome, email, UTM data, timestamp

# Participante específico
GET /api/quiz-participants/:id
```

### 3. **EVENTOS DE CONVERSÃO** 
```bash
# Todos os eventos (leads, compras, cliques)
GET /api/conversion-events
# Retorna: evento, email, valor, UTM, timestamp

# Eventos por email específico
GET /api/conversion-events/email/:email
# Jornada completa do usuário
```

### 4. **COMPRAS CONFIRMADAS**
```bash
# Todas as vendas do Hotmart
GET /api/hotmart-purchases
# Retorna: transactionId, email, valor, produto, status

# Compra específica
GET /api/hotmart-purchases/:transactionId
```

### 5. **ANALYTICS UTM**
```bash
# Todas as origens de tráfego
GET /api/utm-analytics
# Retorna: source, medium, campaign, participantId
```

---

## 📈 **DASHBOARD DE ANALYTICS PRONTO**

### **Componentes Implementados:**
- ✅ `FunnelTab.tsx` - Funil de conversão visual
- ✅ `AdvancedFunnel.tsx` - Analytics detalhado  
- ✅ `CreativeAnalyticsDashboard.tsx` - Performance de criativos
- ✅ `FunnelMonitoringDashboard.tsx` - Monitoramento de funis

### **Como Acessar:**
```typescript
// Exemplo de uso do dashboard
import { CreativeAnalyticsDashboard } from '@/components/analytics/CreativeAnalyticsDashboard';

function AnalyticsPage() {
  return <CreativeAnalyticsDashboard />;
}
```

---

## 🔄 **FLUXO COMPLETO: EDITOR → PRODUÇÃO**

### **1. Editor Visual**
```
Editor salva alterações → PostgreSQL (funnelPages.blocks)
                      ↓
              Cria nova versão (funnelVersions)
                      ↓  
            Define isPublished = true
```

### **2. Sistema de Publicação**
```typescript
// API que serve os dados para produção
GET /api/page-config/:pageId → {
  blocks: [...], // Configurações do editor
  styles: {...}, // Estilos aplicados
  metadata: {...} // SEO e configurações
}
```

### **3. Funil em Produção**
```
Usuário acessa funil → Carrega config via API → Renderiza com dados do editor
                                             ↓
                            Tracking de interações (conversion-events)
                                             ↓
                              Salva respostas (quiz-results)
                                             ↓
                            Webhook Hotmart confirma venda (hotmart-purchases)
```

---

## 💡 **EXEMPLOS PRÁTICOS**

### **Ver Todas as Respostas:**
```bash
curl http://localhost:3000/api/quiz-results
```

### **Analytics de Conversão:**
```bash
curl http://localhost:3000/api/conversion-events
```

### **Jornada de um Usuário:**
```bash
curl http://localhost:3000/api/conversion-events/email/usuario@example.com
```

### **Vendas do Mês:**
```bash
curl http://localhost:3000/api/hotmart-purchases
```

---

## 🎯 **CONCLUSÃO**

✅ **Editor**: Funcional e conectado ao banco  
✅ **Publicação**: Sistema de versões e deploy automático  
✅ **Analytics**: APIs completas para todos os dados  
✅ **Dashboard**: Componentes prontos para visualização  

**👉 Os dados dos usuários estão totalmente acessíveis via APIs REST e o sistema de publicação está operacional!**
