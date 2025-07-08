# 🚀 TUTORIAL COMPLETO: COMO USAR AS APIs REST

## 📋 **RESUMO EXECUTIVO**

**✅ SITUAÇÃO ATUAL:**
- ✅ Servidor funcionando na porta 5000
- ✅ APIs implementadas e estrutura pronta
- ⚠️ Banco de dados precisa ser configurado
- ✅ Scripts de teste criados

---

## 🔧 **CONFIGURAÇÃO RÁPIDA**

### **OPÇÃO 1: Usar com SQLite (Desenvolvimento)**

1. **Ajustar configuração do banco:**
```bash
# Editar .env para usar SQLite
echo 'DATABASE_URL="file:./dev.db"' > .env
```

2. **Ajustar drizzle.config.ts:**
```typescript
export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "sqlite",  // ← Mudar de "postgresql" para "sqlite"
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
```

3. **Criar tabelas:**
```bash
npm run db:push
```

### **OPÇÃO 2: Usar com PostgreSQL (Produção)**

1. **Configurar variável de ambiente:**
```bash
export DATABASE_URL="postgresql://user:password@localhost:5432/quiz_db"
```

2. **Aplicar migrações:**
```bash
npm run db:push
```

---

## 🎯 **COMO TESTAR AS APIs AGORA**

### **Método 1: Navegador (Mais Simples)**
```
http://localhost:5000/api/quiz-results
http://localhost:5000/api/conversion-events
http://localhost:5000/api/hotmart-purchases
http://localhost:5000/api/utm-analytics
```

### **Método 2: CURL (Terminal)**
```bash
# Testar endpoint
curl http://localhost:5000/api/quiz-results

# Com cabeçalhos detalhados
curl -v http://localhost:5000/api/quiz-results

# Criar um participante de teste
curl -X POST http://localhost:5000/api/quiz-participants \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Usuário Teste",
    "email": "teste@example.com",
    "quizId": "quiz-123",
    "utmSource": "facebook"
  }'
```

### **Método 3: JavaScript/Node.js**
```bash
# Usar o script que criamos
node test_apis.js

# Ou criar script personalizado
node -e "
fetch('http://localhost:5000/api/quiz-results')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)
"
```

### **Método 4: Dashboard Visual**
```bash
# Abrir o dashboard HTML no navegador
open dashboard_analytics.html
# ou
firefox dashboard_analytics.html
```

---

## 📊 **ESTRUTURA DAS RESPOSTAS**

### **Formato Padrão:**
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-123",
      "campo1": "valor1",
      "campo2": "valor2",
      "createdAt": "2025-01-14T10:30:00Z"
    }
  ]
}
```

### **Em caso de erro:**
```json
{
  "success": false,
  "error": "Mensagem de erro específica"
}
```

---

## 💡 **ENDPOINTS DISPONÍVEIS**

| Endpoint | Método | Descrição | Exemplo de Uso |
|----------|--------|-----------|----------------|
| `/api/quiz-results` | GET | Resultados dos quizzes | Analytics de performance |
| `/api/conversion-events` | GET | Eventos de conversão | Funil de vendas |
| `/api/hotmart-purchases` | GET | Vendas confirmadas | Receita e comissões |
| `/api/utm-analytics` | GET | Dados de tráfego | Origem dos usuários |
| `/api/quiz-participants` | GET | Lista de participantes | Banco de leads |
| `/api/conversion-events/email/:email` | GET | Jornada do usuário | Análise individual |

---

## 🛠️ **EXEMPLOS PRÁTICOS**

### **1. Buscar todos os resultados de quiz:**
```javascript
fetch('http://localhost:5000/api/quiz-results')
  .then(response => response.json())
  .then(data => {
    console.log('Total de quizzes:', data.data.length);
    data.data.forEach(quiz => {
      console.log(`Participante: ${quiz.participantId}, Estilo: ${quiz.predominantStyle}`);
    });
  });
```

### **2. Analisar funil de conversão:**
```javascript
fetch('http://localhost:5000/api/conversion-events')
  .then(response => response.json())
  .then(data => {
    const events = data.data;
    const leads = events.filter(e => e.eventType === 'lead').length;
    const sales = events.filter(e => e.eventType === 'purchase').length;
    const conversion = sales / leads * 100;
    
    console.log(`Taxa de conversão: ${conversion.toFixed(2)}%`);
  });
```

### **3. Jornada completa de um usuário:**
```javascript
const email = 'user@example.com';
fetch(`http://localhost:5000/api/conversion-events/email/${email}`)
  .then(response => response.json())
  .then(data => {
    console.log(`Jornada do usuário ${email}:`);
    data.data.forEach((event, index) => {
      console.log(`${index + 1}. ${event.eventType} - ${event.createdAt}`);
    });
  });
```

---

## 🚨 **TROUBLESHOOTING**

### **Problema: "Failed to fetch"**
**Solução:**
1. Verificar se servidor está rodando: `npm run dev`
2. Confirmar porta: `netstat -tlnp | grep 5000`
3. Testar diretamente: `curl http://localhost:5000/api/quiz-results`

### **Problema: "Database error"**
**Solução:**
1. Configurar banco corretamente (SQLite ou PostgreSQL)
2. Executar migrações: `npm run db:push`
3. Verificar variáveis de ambiente

### **Problema: "CORS error"**
**Solução:**
- As APIs já têm CORS configurado
- Usar o mesmo domínio/porta do servidor

---

## 🎯 **RESULTADO FINAL**

**Depois de seguir este tutorial você terá:**

✅ **Servidor funcionando** com todas as APIs  
✅ **Banco de dados configurado** com tabelas criadas  
✅ **Scripts de teste** para validar funcionamento  
✅ **Dashboard visual** para monitorar dados  
✅ **Exemplos práticos** de como usar cada endpoint  

**👉 Agora você pode acessar TODOS os dados dos usuários através das APIs REST!**

---

## 📞 **SUPORTE ADICIONAL**

Se tiver dúvidas:
1. Execute `node test_apis.js` para diagnóstico completo
2. Verifique os logs do servidor no terminal
3. Use `curl -v` para debug detalhado
4. Abra `dashboard_analytics.html` para interface visual
