# Quiz Quest Challenge Verse

## 📋 Sobre o Projeto

Sistema avançado de criação de quizzes interativos e funis de conversão com editor visual responsivo. Desenvolvido com React + TypeScript + Vite, oferece uma experiência completa de criação, edição e publicação de conteúdo.

## 🚀 Tecnologias

- **Frontend**: React 18 + TypeScript + Vite
- **Roteamento**: Wouter (roteamento client-side)
- **Estilização**: Tailwind CSS
- **Drag & Drop**: @dnd-kit
- **Ícones**: Lucide React
- **Persistência**: localStorage (sistema v2.0) + MCP Protocol
- **Design System**: Sistema unificado de componentes responsivos
- **Banco de Dados**: Supabase (PostgreSQL) + SQLite local
- **MCP Protocol**: Model Context Protocol para padronização de dados

## 🏗️ Arquitetura

### Estrutura de Pastas
```
client/
├── src/
│   ├── components/
│   │   ├── editor/              # Editor visual responsivo
│   │   ├── quiz/                # Componentes de quiz
│   │   ├── blocks/              # Blocos modulares do editor
│   │   └── ui/                  # Componentes base da interface
│   ├── pages/                   # Páginas principais
│   ├── hooks/                   # Hooks customizados
│   ├── types/                   # Definições TypeScript
│   └── utils/                   # Utilitários e helpers
```

### Componentes Principais

#### SchemaDrivenEditorResponsive
- **Localização**: `/client/src/components/editor/`
- **Função**: Editor visual principal com suporte completo a mobile/tablet/desktop
- **Recursos**: Drag & drop, sistema de propriedades dinâmicas, preview em tempo real
- **Persistência**: Sistema v2.0 com cross-compatibility

#### Sistema de Blocos
- **Localização**: `/client/src/components/blocks/`
- **Tipos**: Componentes modulares para quiz, resultado, CTA, depoimentos
- **Flexibilidade**: Sistema schema-driven com propriedades dinâmicas

## 🔧 Configuração e Instalação

### Pré-requisitos
- Node.js 18+
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone [repository-url]

# Instale dependências
cd quiz-quest-challenge-verse
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

### Scripts Disponíveis
```bash
npm run dev        # Servidor de desenvolvimento (localhost:8080)
npm run build      # Build para produção
npm run preview    # Preview do build
npm run check      # Verificação de tipos TypeScript

# Scripts MCP
npm run dev:server # Servidor backend (se configurado)
npm run dev:full   # Frontend + Backend simultaneamente
```

### Configuração MCP
```bash
# 1. Configure o ambiente
cp .env.mcp.example .env.local

# 2. Atualize as credenciais do Supabase
# REACT_APP_SUPABASE_URL=sua_url_supabase
# REACT_APP_SUPABASE_ANON_KEY=sua_chave_anonima

# 3. Escolha o provedor primário
# MCP_PRIMARY_DB=supabase (para produção)
# MCP_PRIMARY_DB=sqlite (para desenvolvimento local)

# 4. Configure fallback (opcional)
# MCP_FALLBACK_DB=sqlite
```

## 📱 Funcionalidades

### Editor Visual
- **Responsividade**: Layout adaptativo para mobile, tablet e desktop
- **Drag & Drop**: Arraste componentes para criar layouts
- **Preview em Tempo Real**: Veja mudanças instantaneamente
- **Sistema de Salvamento**: Auto-save + salvamento manual
- **Publicação**: Sistema integrado de publish/unpublish

### Componentes Disponíveis
- **Quiz**: Perguntas múltipla escolha, progressão, validação
- **Resultados**: Exibição personalizada de resultados
- **CTA**: Botões de call-to-action configuráveis
- **Conteúdo**: Textos, imagens, depoimentos, garantias
- **Layout**: Headers, divisores, espaçamentos

### Persistência de Dados
- **localStorage v2.0**: Sistema dual de compatibilidade
- **Cross-editor**: Compatibilidade entre diferentes versões do editor
- **Auto-recovery**: Recuperação automática de dados

## 🌐 Rotas Principais

- `/`: Página inicial
- `/editor`: Editor visual principal (SchemaDrivenEditorResponsive)
- `/teste5`: Editor alternativo para testes
- `/quiz/:id`: Visualização de quiz publicado
- `/mcp-demo`: Demonstração do MCP Protocol (desenvolvimento)

## 🔌 Integração MCP

### Uso Básico em Componentes

```tsx
import { useFunnelService } from '@/contexts/MCPContext';

export const MyComponent = () => {
  const { funnelService, isReady, error } = useFunnelService();
  
  const handleCreateFunnel = async () => {
    if (!isReady) return;
    
    const response = await funnelService.createFunnel({
      name: 'Meu Novo Funil',
      user_id: 'user-123'
    });
    
    if (response.success) {
      console.log('Funil criado:', response.data);
    } else {
      console.error('Erro:', response.error);
    }
  };
  
  return (
    <div>
      {error && <div>Erro: {error}</div>}
      <button onClick={handleCreateFunnel} disabled={!isReady}>
        Criar Funil
      </button>
    </div>
  );
};
```

### Configuração do Provider

```tsx
import { MCPProvider } from '@/contexts/MCPContext';

export const App = () => (
  <MCPProvider>
    <YourAppComponents />
  </MCPProvider>
);
```

## 📊 Sistema de Dados

### MCP Protocol (Model Context Protocol)

O projeto implementa o **MCP Protocol** para padronizar a comunicação entre múltiplos sistemas de banco de dados:

- **📄 Documentação**: [MCP_PROTOCOL.md](./MCP_PROTOCOL.md)
- **🔧 Implementação**: [src/lib/mcp-adapter.ts](./src/lib/mcp-adapter.ts)
- **🎯 Serviços**: [src/services/mcp-services.ts](./src/services/mcp-services.ts)
- **⚛️ React Context**: [src/contexts/MCPContext.tsx](./src/contexts/MCPContext.tsx)

#### Características do MCP:
- **Múltiplos Provedores**: Supabase (produção) + SQLite (desenvolvimento)
- **Sistema de Fallback**: Continuidade operacional automática
- **Interface Unificada**: CRUD padronizado entre sistemas
- **Error Handling**: Tratamento robusto de erros e retry automático
- **Monitoramento**: Logging e métricas de performance integradas

#### Configuração Rápida:
```bash
# Copie o arquivo de configuração
cp .env.mcp.example .env.local

# Configure suas credenciais do Supabase
# MCP_PRIMARY_DB=supabase (produção)
# MCP_PRIMARY_DB=sqlite (desenvolvimento)
```

### Estrutura de Projeto
```typescript
interface Project {
  id: string;
  name: string;
  blocks: Block[];
  settings: ProjectSettings;
  createdAt: string;
  updatedAt: string;
  isPublished: boolean;
}

interface Block {
  id: string;
  type: BlockType;
  content: EditableContent;
  style: BlockStyle;
  position: number;
}
```

### Tipos de Blocos Suportados
- `quiz-question`: Perguntas de quiz
- `headline`, `text`: Conteúdo textual
- `image`: Componentes de imagem
- `pricing`: Preços e ofertas
- `testimonials`: Depoimentos
- `cta-button`: Botões de ação
- `result-*`: Componentes de resultado

## 🔄 Fluxo de Desenvolvimento

### Para Desenvolvedores

1. **Novos Componentes**: Adicione em `/client/src/components/blocks/`
2. **Tipos**: Defina interfaces em `/client/src/types/`
3. **Estilos**: Use Tailwind CSS com sistema de design consistente
4. **Testes**: Teste em mobile/tablet/desktop

### Para Usuários

1. **Criação**: Use o editor visual em `/editor`
2. **Edição**: Arraste componentes, configure propriedades
3. **Preview**: Visualize em diferentes dispositivos
4. **Publicação**: Use sistema Save/Publish integrado

## 🐛 Debugging e Logs

### Console de Debug
- Estados do editor disponíveis no console
- Logs detalhados de persistência
- Informações de performance

### Ferramentas de Desenvolvimento
- React DevTools compatível
- Hot reload para desenvolvimento ágil
- Source maps para debugging

## 📈 Performance

- **Bundle otimizado**: Vite para builds rápidos
- **Lazy loading**: Componentes carregados sob demanda
- **Caching**: Sistema de cache inteligente
- **Responsividade**: Layout otimizado para todos os dispositivos

## 🤝 Contribuição

1. Fork do projeto
2. Crie uma branch para sua feature
3. Commit das mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

**Versão**: 2.0.0  
**Última atualização**: Janeiro 2025  
**Status**: Produção Ready ✅
