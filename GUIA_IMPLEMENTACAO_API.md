# Guia de Implementação: Salvamento por API

Este guia mostra como implementar o salvamento por API no sistema de quiz, incluindo funcionalidades offline e sincronização.

## 📋 Estrutura Implementada

### 1. Serviço de API (`quizApiService.ts`)
- ✅ **Criado**: `/client/src/services/quizApiService.ts`
- **Funcionalidades**:
  - Salvamento e carregamento de quizzes
  - Auto-save com debounce
  - Backup local para modo offline
  - Sincronização de mudanças offline
  - Gerenciamento de tokens de autenticação

### 2. Hook de Gerenciamento (`useQuizEditor.ts`)
- ✅ **Criado**: `/client/src/hooks/useQuizEditor.ts`
- **Funcionalidades**:
  - Estado unificado do editor
  - Auto-save automático
  - Detecção de conectividade
  - Sincronização offline/online
  - Controle de mudanças não salvas

### 3. Página do Editor Atualizada
- ✅ **Criado**: `/client/src/pages/VisualEditorPageWithAPI.tsx`
- **Funcionalidades**:
  - Interface visual de status
  - Indicadores de conectividade
  - Botões de salvamento e sincronização
  - Alertas para mudanças não salvas

## 🚀 Como Usar

### 1. Configurar Variáveis de Ambiente

```bash
# .env
REACT_APP_API_URL=http://localhost:3001/api
```

### 2. Usar o Novo Editor

```tsx
import { useQuizEditor } from '@/hooks/useQuizEditor';

const MyEditor = () => {
  const {
    questions,
    loading,
    saving,
    hasUnsavedChanges,
    isOnline,
    saveQuiz,
    updateQuestions
  } = useQuizEditor({
    quizId: 'optional-quiz-id',
    autoSave: true,
    autoSaveDelay: 3000,
    enableOfflineMode: true
  });

  return (
    <div>
      {/* Seu editor aqui */}
    </div>
  );
};
```

### 3. Status de Conectividade

O sistema automaticamente:
- ✅ Detecta quando está online/offline
- ✅ Salva localmente quando offline
- ✅ Sincroniza quando volta a ficar online
- ✅ Mostra indicadores visuais de status

## 🔧 API Backend Requerida

### Endpoints Necessários:

#### 1. **GET** `/api/quizzes` - Listar quizzes
```json
{
  "success": true,
  "data": [
    {
      "id": "quiz-123",
      "title": "Meu Quiz",
      "description": "Descrição",
      "questions": [...],
      "createdAt": "2025-01-15T10:00:00Z",
      "updatedAt": "2025-01-15T11:00:00Z",
      "version": 2
    }
  ]
}
```

#### 2. **GET** `/api/quizzes/:id` - Buscar quiz específico
```json
{
  "success": true,
  "data": {
    "id": "quiz-123",
    "title": "Meu Quiz",
    "questions": [...],
    "metadata": {...}
  }
}
```

#### 3. **POST** `/api/quizzes` - Criar novo quiz
```json
{
  "title": "Novo Quiz",
  "description": "Descrição opcional",
  "questions": [...],
  "userId": "user-123",
  "isPublished": false
}
```

#### 4. **PUT** `/api/quizzes/:id` - Atualizar quiz
```json
{
  "title": "Quiz Atualizado",
  "questions": [...],
  "metadata": {
    "version": 3,
    "updatedAt": "2025-01-15T12:00:00Z"
  }
}
```

#### 5. **DELETE** `/api/quizzes/:id` - Deletar quiz

### Headers Necessários:
```
Authorization: Bearer <jwt-token>
Content-Type: application/json
```

## 📱 Funcionalidades Offline

### Auto-backup Local
```typescript
// Automático quando offline
localStorage.setItem('quiz_backup_123', JSON.stringify({
  ...quizData,
  backupTimestamp: new Date().toISOString()
}));
```

### Sincronização
```typescript
// Quando volta online
const result = await quizApi.syncOfflineChanges();
// Resultado: { synced: 2, failed: 0 }
```

## 🎨 Interface Visual

### Indicadores de Status
- 🟢 **Online + Salvo**: `<Wifi /> Online` + `<Cloud /> Salvo 14:30`
- 🟡 **Online + Não Salvo**: `<Wifi /> Online` + `<CloudOff /> Não salvo`
- 🔴 **Offline**: `<WifiOff /> Offline` + Badge "Precisa sincronizar"

### Botões Inteligentes
```tsx
<Button 
  className={hasUnsavedChanges ? 'bg-orange-500' : 'bg-green-500'}
  disabled={!canSave}
>
  {hasUnsavedChanges ? 'Salvar Agora' : 'Salvar Quiz'}
</Button>
```

## 🔐 Autenticação

### Token JWT
```typescript
// Automaticamente incluído nas requisições
const token = localStorage.getItem('auth_token');
headers: {
  'Authorization': `Bearer ${token}`
}
```

### Renovação de Token
```typescript
// Implementar interceptor para renovar tokens expirados
if (response.status === 401) {
  // Redirecionar para login ou renovar token
}
```

## 📊 Monitoramento

### Eventos Customizados
```typescript
// Auto-save concluído
window.addEventListener('quiz-auto-saved', (event) => {
  console.log('Quiz salvo:', event.detail);
});

// Dados atualizados
window.addEventListener('quiz-data-updated', () => {
  // Atualizar UI se necessário
});
```

### Logs e Debug
```typescript
console.log('Quiz auto-salvo:', result.data?.id);
console.log('Sincronização:', { synced: 2, failed: 0 });
```

## 🚨 Tratamento de Erros

### Falhas de Rede
- ✅ Fallback para localStorage
- ✅ Retry automático
- ✅ Notificações ao usuário

### Conflitos de Versão
- ✅ Detecção de versão
- ✅ Resolução de conflitos
- ✅ Backup de segurança

## 📈 Performance

### Debounce no Auto-save
- ⚡ 3 segundos de delay padrão
- ⚡ Evita requests excessivos
- ⚡ Cancelação de timeouts anteriores

### Compressão de Dados
```typescript
// Opcional: comprimir JSON antes de enviar
const compressed = LZString.compress(JSON.stringify(quizData));
```

## 🧪 Testando a Implementação

### 1. Teste Offline
1. Desabilitar rede no DevTools
2. Fazer mudanças no editor
3. Verificar se salva localmente
4. Habilitar rede
5. Verificar sincronização automática

### 2. Teste Auto-save
1. Fazer mudança no editor
2. Aguardar 3 segundos
3. Verificar indicador "Salvando..."
4. Verificar mudança para "Salvo"

### 3. Teste Conflitos
1. Abrir mesmo quiz em duas abas
2. Fazer mudanças diferentes
3. Verificar resolução de conflitos

## 🔄 Migração do Sistema Atual

### Passo 1: Backup
```bash
# Backup do localStorage atual
JSON.stringify(localStorage.getItem('quiz_editor_questions'))
```

### Passo 2: Substituir Página
```tsx
// Trocar VisualEditorPage por VisualEditorPageWithAPI
import VisualEditorPageWithAPI from '@/pages/VisualEditorPageWithAPI';
```

### Passo 3: Configurar API
- Implementar endpoints backend
- Configurar autenticação
- Testar conectividade

### Passo 4: Deploy Gradual
- Feature flag para novo sistema
- Migração gradual dos usuários
- Monitoramento de erros

## 📚 Próximos Passos

1. **✅ Implementar backend** (Express.js + Prisma/MongoDB)
2. **✅ Configurar autenticação** (JWT + refresh tokens)
3. **✅ Adicionar testes** (Jest + React Testing Library)
4. **✅ Implementar analytics** (tracking de uso)
5. **✅ Adicionar webhooks** (notificações em tempo real)
6. **✅ Cache inteligente** (React Query/SWR)

## 🛠️ Ferramentas Úteis

### React Query (Recomendado)
```typescript
import { useQuery, useMutation } from 'react-query';

const useQuizQuery = (quizId: string) => {
  return useQuery(['quiz', quizId], () => 
    quizApi.loadQuiz(quizId)
  );
};
```

### Zustand para Estado Global
```typescript
import { create } from 'zustand';

const useQuizStore = create((set) => ({
  quizzes: [],
  currentQuiz: null,
  updateQuiz: (quiz) => set({ currentQuiz: quiz })
}));
```

---

**🎉 Com esta implementação, o sistema terá:**
- ✅ Salvamento automático na nuvem
- ✅ Funcionamento offline completo
- ✅ Sincronização inteligente
- ✅ Interface visual de status
- ✅ Tratamento robusto de erros
- ✅ Performance otimizada
