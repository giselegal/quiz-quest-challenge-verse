# 🚀 GUIA PRÁTICO: COMO USAR AS APIs REST

## 📋 **MÉTODOS PARA ACESSAR AS APIs**

### 1. **🌐 PELO NAVEGADOR (Método Simples)**

Abra o navegador e acesse diretamente:

```
http://localhost:3000/api/quiz-results
http://localhost:3000/api/conversion-events  
http://localhost:3000/api/hotmart-purchases
http://localhost:3000/api/utm-analytics
```

**💡 Dica:** Instale a extensão JSON Formatter para visualizar melhor os dados.

---

### 2. **⚡ USANDO CURL (Terminal)**

```bash
# Ver todos os resultados dos quizzes
curl http://localhost:3000/api/quiz-results

# Ver eventos de conversão
curl http://localhost:3000/api/conversion-events

# Ver compras do Hotmart
curl http://localhost:3000/api/hotmart-purchases

# Ver dados UTM
curl http://localhost:3000/api/utm-analytics

# Buscar eventos de um usuário específico
curl http://localhost:3000/api/conversion-events/email/user@example.com
```

---

### 3. **🛠️ USANDO POSTMAN/INSOMNIA**

1. **Abra o Postman** ou **Insomnia**
2. **Crie uma nova requisição GET**
3. **Cole a URL:** `http://localhost:3000/api/quiz-results`
4. **Clique em Send**

**Endpoints para testar:**
- GET `http://localhost:3000/api/quiz-results`
- GET `http://localhost:3000/api/conversion-events` 
- GET `http://localhost:3000/api/hotmart-purchases`
- GET `http://localhost:3000/api/utm-analytics`

---

### 4. **💻 USANDO JAVASCRIPT/FETCH**

```javascript
// Função para buscar dados dos quizzes
async function getQuizResults() {
  try {
    const response = await fetch('http://localhost:3000/api/quiz-results');
    const data = await response.json();
    console.log('Resultados dos Quizzes:', data);
    return data;
  } catch (error) {
    console.error('Erro ao buscar dados:', error);
  }
}

// Função para buscar eventos de conversão
async function getConversionEvents() {
  try {
    const response = await fetch('http://localhost:3000/api/conversion-events');
    const data = await response.json();
    console.log('Eventos de Conversão:', data);
    return data;
  } catch (error) {
    console.error('Erro ao buscar eventos:', error);
  }
}

// Função para buscar vendas do Hotmart
async function getHotmartPurchases() {
  try {
    const response = await fetch('http://localhost:3000/api/hotmart-purchases');
    const data = await response.json();
    console.log('Compras Hotmart:', data);
    return data;
  } catch (error) {
    console.error('Erro ao buscar compras:', error);
  }
}

// Usar as funções
getQuizResults();
getConversionEvents();
getHotmartPurchases();
```

---

### 5. **🐍 USANDO PYTHON**

```python
import requests
import json

# Configuração base
BASE_URL = "http://localhost:3000/api"

def get_quiz_results():
    """Busca todos os resultados dos quizzes"""
    try:
        response = requests.get(f"{BASE_URL}/quiz-results")
        response.raise_for_status()
        data = response.json()
        print("Resultados dos Quizzes:")
        print(json.dumps(data, indent=2))
        return data
    except requests.exceptions.RequestException as e:
        print(f"Erro ao buscar dados: {e}")

def get_conversion_events():
    """Busca todos os eventos de conversão"""
    try:
        response = requests.get(f"{BASE_URL}/conversion-events")
        response.raise_for_status()
        data = response.json()
        print("Eventos de Conversão:")
        print(json.dumps(data, indent=2))
        return data
    except requests.exceptions.RequestException as e:
        print(f"Erro ao buscar eventos: {e}")

def get_user_journey(email):
    """Busca a jornada completa de um usuário"""
    try:
        response = requests.get(f"{BASE_URL}/conversion-events/email/{email}")
        response.raise_for_status()
        data = response.json()
        print(f"Jornada do usuário {email}:")
        print(json.dumps(data, indent=2))
        return data
    except requests.exceptions.RequestException as e:
        print(f"Erro ao buscar jornada: {e}")

# Executar as funções
if __name__ == "__main__":
    get_quiz_results()
    get_conversion_events()
    get_user_journey("user@example.com")
```

---

### 6. **📊 CRIANDO UM DASHBOARD SIMPLES**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard de Analytics</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .container { max-width: 1200px; margin: 0 auto; }
        .card { border: 1px solid #ddd; padding: 20px; margin: 20px 0; border-radius: 8px; }
        .button { background: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 4px; cursor: pointer; margin: 5px; }
        .data { background: #f8f9fa; padding: 10px; border-radius: 4px; overflow-x: auto; }
        pre { white-space: pre-wrap; }
    </style>
</head>
<body>
    <div class="container">
        <h1>📊 Dashboard de Analytics</h1>
        
        <div class="card">
            <h2>🎯 Controles</h2>
            <button class="button" onclick="loadQuizResults()">Carregar Resultados Quiz</button>
            <button class="button" onclick="loadConversionEvents()">Carregar Eventos</button>
            <button class="button" onclick="loadHotmartPurchases()">Carregar Vendas</button>
            <button class="button" onclick="loadUtmAnalytics()">Carregar UTM</button>
        </div>

        <div class="card">
            <h2>📈 Dados</h2>
            <div id="results" class="data">
                <p>Clique nos botões acima para carregar os dados...</p>
            </div>
        </div>
    </div>

    <script>
        const BASE_URL = 'http://localhost:3000/api';
        const resultsDiv = document.getElementById('results');

        async function loadData(endpoint, title) {
            try {
                resultsDiv.innerHTML = '<p>Carregando...</p>';
                const response = await fetch(`${BASE_URL}${endpoint}`);
                const data = await response.json();
                
                resultsDiv.innerHTML = `
                    <h3>${title}</h3>
                    <p><strong>Total de registros:</strong> ${data.data?.length || 0}</p>
                    <pre>${JSON.stringify(data, null, 2)}</pre>
                `;
            } catch (error) {
                resultsDiv.innerHTML = `<p style="color: red;">Erro: ${error.message}</p>`;
            }
        }

        function loadQuizResults() {
            loadData('/quiz-results', '🎯 Resultados dos Quizzes');
        }

        function loadConversionEvents() {
            loadData('/conversion-events', '📊 Eventos de Conversão');
        }

        function loadHotmartPurchases() {
            loadData('/hotmart-purchases', '💰 Compras Hotmart');
        }

        function loadUtmAnalytics() {
            loadData('/utm-analytics', '📈 Analytics UTM');
        }
    </script>
</body>
</html>
```

---

## 🔧 **EXEMPLOS DE RESPOSTAS DAS APIs**

### **Quiz Results Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "result-123",
      "participantId": "participant-456",
      "quizId": "quiz-789",
      "responses": {
        "q1": ["classico"],
        "q2": ["elegante"],
        "q3": ["sofisticado"]
      },
      "scores": {
        "classico": 85,
        "casual": 45,
        "elegante": 90
      },
      "predominantStyle": "elegante",
      "createdAt": "2025-01-14T10:30:00Z"
    }
  ]
}
```

### **Conversion Events Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": "event-123",
      "eventType": "lead",
      "userEmail": "user@example.com",
      "value": 0,
      "utmSource": "facebook",
      "utmCampaign": "quiz-janeiro",
      "eventData": {
        "quizCompleted": true,
        "stylePredominant": "elegante"
      },
      "createdAt": "2025-01-14T10:35:00Z"
    }
  ]
}
```

---

## 🚀 **TESTANDO AGORA**

### **PASSO 1: Iniciar o Servidor**
```bash
cd /workspaces/quiz-quest-challenge-verse
npm run dev
```
*Aguarde a mensagem: "Server running on port 3000"*

### **PASSO 2: Testar as APIs**

**🌐 Método 1 - Navegador (Mais Fácil):**
```
http://localhost:3000/api/quiz-results
http://localhost:3000/api/conversion-events
http://localhost:3000/api/hotmart-purchases
```

**🔧 Método 2 - Terminal/CURL:**
```bash
curl http://localhost:3000/api/quiz-results
curl http://localhost:3000/api/conversion-events
```

**📊 Método 3 - Dashboard Visual:**
Abra o arquivo: `dashboard_analytics.html` no navegador

**🐍 Método 4 - Python:**
```bash
python test_apis.py
```

**📱 Método 5 - JavaScript:**
```bash
node test_apis.js
```

### **PASSO 3: Verificar Resultados**

**✅ Resposta Esperada:**
```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "participantId": "...",
      "responses": {...},
      "createdAt": "..."
    }
  ]
}
```

**❌ Se der erro de conexão:**
1. Verifique se o servidor está rodando
2. Confirme a porta (pode ser 3000, 5173, etc.)
3. Teste outros endpoints

---

## ⚡ **DICAS IMPORTANTES**

- ✅ **Servidor deve estar rodando** (`npm run dev`)
- ✅ **APIs retornam JSON** com formato padrão `{success: true, data: [...]}`
- ✅ **CORS configurado** para permitir requisições do frontend
- ✅ **Todas as APIs são GET** (apenas leitura para analytics)
- ✅ **Dados reais** do banco PostgreSQL

**👉 Agora você pode acessar TODOS os dados dos usuários facilmente!**
