// MCP Integration Example Component
// This demonstrates how to use the MCP Protocol in a React component

import React, { useState, useEffect } from 'react';
import { useFunnelService, useQuizService, useAnalyticsService, MCPStatus } from '../contexts/MCPContext';
import { Funnel, Quiz, CreateFunnelData, CreateQuizData } from '../services/mcp-services';

// Funnel Management Component
export const FunnelManager: React.FC = () => {
  const { funnelService, isReady, error } = useFunnelService();
  const [funnels, setFunnels] = useState<Funnel[]>([]);
  const [selectedFunnel, setSelectedFunnel] = useState<Funnel | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateFunnelData>({
    name: '',
    description: '',
    user_id: 'current-user-id' // This would come from auth context
  });

  // Load funnels on component mount
  useEffect(() => {
    if (isReady) {
      loadFunnels();
    }
  }, [isReady]);

  const loadFunnels = async () => {
    if (!funnelService) return;
    
    setLoading(true);
    try {
      const response = await funnelService.getFunnelsByUser('current-user-id', {
        limit: 20
      });
      
      if (response.success && response.data) {
        setFunnels(response.data);
      } else {
        console.error('Failed to load funnels:', response.error);
      }
    } catch (err) {
      console.error('Error loading funnels:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateFunnel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!funnelService) return;

    setLoading(true);
    try {
      const response = await funnelService.createFunnel(formData);
      
      if (response.success && response.data) {
        setFunnels([response.data, ...funnels]);
        setFormData({ name: '', description: '', user_id: 'current-user-id' });
        alert('Funil criado com sucesso!');
      } else {
        alert(`Erro ao criar funil: ${response.error?.message}`);
      }
    } catch (err) {
      alert(`Erro inesperado: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handlePublishFunnel = async (funnelId: string) => {
    if (!funnelService) return;

    try {
      const response = await funnelService.publishFunnel(funnelId);
      
      if (response.success && response.data) {
        setFunnels(funnels.map(f => 
          f.id === funnelId ? response.data! : f
        ));
        alert('Funil publicado com sucesso!');
      } else {
        alert(`Erro ao publicar funil: ${response.error?.message}`);
      }
    } catch (err) {
      alert(`Erro inesperado: ${err.message}`);
    }
  };

  const handleDuplicateFunnel = async (funnelId: string) => {
    if (!funnelService) return;

    try {
      const response = await funnelService.duplicateFunnel(funnelId);
      
      if (response.success && response.data) {
        setFunnels([response.data, ...funnels]);
        alert('Funil duplicado com sucesso!');
      } else {
        alert(`Erro ao duplicar funil: ${response.error?.message}`);
      }
    } catch (err) {
      alert(`Erro inesperado: ${err.message}`);
    }
  };

  const handleDeleteFunnel = async (funnelId: string) => {
    if (!funnelService || !confirm('Tem certeza que deseja excluir este funil?')) return;

    try {
      const response = await funnelService.deleteFunnel(funnelId);
      
      if (response.success) {
        setFunnels(funnels.filter(f => f.id !== funnelId));
        if (selectedFunnel?.id === funnelId) {
          setSelectedFunnel(null);
        }
        alert('Funil excluído com sucesso!');
      } else {
        alert(`Erro ao excluir funil: ${response.error?.message}`);
      }
    } catch (err) {
      alert(`Erro inesperado: ${err.message}`);
    }
  };

  if (!isReady) {
    return (
      <div className="p-6">
        <MCPStatus showDetails />
        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded">
            <p className="text-red-600">Erro: {error}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Gerenciador de Funis</h1>
        <MCPStatus showDetails />
      </div>

      {/* Create Funnel Form */}
      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold mb-4">Criar Novo Funil</h2>
        <form onSubmit={handleCreateFunnel} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome do Funil
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Digite o nome do funil..."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição (opcional)
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
              placeholder="Descrição do funil..."
              rows={3}
            />
          </div>
          <button
            type="submit"
            disabled={loading || !formData.name.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Criando...' : 'Criar Funil'}
          </button>
        </form>
      </div>

      {/* Funnels List */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Meus Funis ({funnels.length})</h2>
        </div>
        
        {loading ? (
          <div className="p-6 text-center">Carregando...</div>
        ) : funnels.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            Nenhum funil encontrado. Crie seu primeiro funil acima!
          </div>
        ) : (
          <div className="divide-y">
            {funnels.map((funnel) => (
              <div key={funnel.id} className="p-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-gray-900">{funnel.name}</h3>
                    {funnel.description && (
                      <p className="text-sm text-gray-600 mt-1">{funnel.description}</p>
                    )}
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span className={`px-2 py-1 rounded text-xs ${
                        funnel.status === 'published' 
                          ? 'bg-green-100 text-green-800' 
                          : funnel.status === 'draft'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {funnel.status}
                      </span>
                      <span>Versão {funnel.version}</span>
                      <span>{funnel.pages.length} páginas</span>
                      <span>Atualizado: {new Date(funnel.updated_at).toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedFunnel(funnel)}
                      className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded hover:bg-blue-200"
                    >
                      Ver Detalhes
                    </button>
                    
                    {funnel.status === 'draft' && (
                      <button
                        onClick={() => handlePublishFunnel(funnel.id)}
                        className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded hover:bg-green-200"
                      >
                        Publicar
                      </button>
                    )}
                    
                    <button
                      onClick={() => handleDuplicateFunnel(funnel.id)}
                      className="px-3 py-1 text-sm bg-gray-100 text-gray-800 rounded hover:bg-gray-200"
                    >
                      Duplicar
                    </button>
                    
                    <button
                      onClick={() => handleDeleteFunnel(funnel.id)}
                      className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Funnel Details Modal */}
      {selectedFunnel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">{selectedFunnel.name}</h2>
                <button
                  onClick={() => setSelectedFunnel(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Informações Gerais</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Status:</span>
                    <span className="ml-2 font-medium">{selectedFunnel.status}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Versão:</span>
                    <span className="ml-2 font-medium">{selectedFunnel.version}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Publicado:</span>
                    <span className="ml-2 font-medium">{selectedFunnel.is_published ? 'Sim' : 'Não'}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Páginas:</span>
                    <span className="ml-2 font-medium">{selectedFunnel.pages.length}</span>
                  </div>
                </div>
              </div>

              {selectedFunnel.description && (
                <div>
                  <h3 className="font-semibold mb-2">Descrição</h3>
                  <p className="text-gray-700 text-sm">{selectedFunnel.description}</p>
                </div>
              )}

              <div>
                <h3 className="font-semibold mb-2">Configurações do Tema</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600">Cor Primária:</span>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded border" 
                        style={{ backgroundColor: selectedFunnel.settings.theme.primaryColor }}
                      />
                      <span className="font-mono text-xs">{selectedFunnel.settings.theme.primaryColor}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Cor Secundária:</span>
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-4 h-4 rounded border" 
                        style={{ backgroundColor: selectedFunnel.settings.theme.secondaryColor }}
                      />
                      <span className="font-mono text-xs">{selectedFunnel.settings.theme.secondaryColor}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-gray-600">Fonte:</span>
                    <span className="ml-2 font-medium">{selectedFunnel.settings.theme.fontFamily}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Barra de Progresso:</span>
                    <span className="ml-2 font-medium">{selectedFunnel.settings.showProgressBar ? 'Sim' : 'Não'}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Timestamps</h3>
                <div className="text-sm text-gray-600">
                  <div>Criado: {new Date(selectedFunnel.created_at).toLocaleString()}</div>
                  <div>Atualizado: {new Date(selectedFunnel.updated_at).toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Analytics Dashboard Component
export const AnalyticsDashboard: React.FC = () => {
  const { analyticsService, isReady } = useAnalyticsService();
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isReady) {
      loadRecentEvents();
    }
  }, [isReady]);

  const loadRecentEvents = async () => {
    if (!analyticsService) return;
    
    setLoading(true);
    try {
      const response = await analyticsService.getEventsByUser('current-user-id', {
        limit: 50
      });
      
      if (response.success && response.data) {
        setEvents(response.data);
      }
    } catch (err) {
      console.error('Error loading events:', err);
    } finally {
      setLoading(false);
    }
  };

  const trackTestEvent = async () => {
    if (!analyticsService) return;

    try {
      const response = await analyticsService.trackEvent({
        event_type: 'test_event',
        user_id: 'current-user-id',
        session_id: 'current-session-id',
        properties: {
          component: 'AnalyticsDashboard',
          timestamp: new Date().toISOString(),
          test: true
        },
        utm_source: 'direct',
        utm_medium: 'webapp'
      });

      if (response.success) {
        alert('Evento de teste criado!');
        loadRecentEvents(); // Reload events
      } else {
        alert(`Erro ao criar evento: ${response.error?.message}`);
      }
    } catch (err) {
      alert(`Erro inesperado: ${err.message}`);
    }
  };

  if (!isReady) {
    return (
      <div className="p-6">
        <MCPStatus showDetails />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard de Analytics</h1>
        <MCPStatus showDetails />
      </div>

      <div className="bg-white p-6 rounded-lg shadow mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Eventos Recentes</h2>
          <button
            onClick={trackTestEvent}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Criar Evento de Teste
          </button>
        </div>

        {loading ? (
          <div className="text-center py-8">Carregando eventos...</div>
        ) : events.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Nenhum evento encontrado. Clique em "Criar Evento de Teste" para começar.
          </div>
        ) : (
          <div className="space-y-3">
            {events.slice(0, 10).map((event, index) => (
              <div key={index} className="p-3 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium text-blue-600">{event.event_type}</span>
                    {event.utm_source && (
                      <span className="ml-2 text-sm text-gray-500">
                        via {event.utm_source}
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(event.timestamp).toLocaleString()}
                  </span>
                </div>
                {event.properties && Object.keys(event.properties).length > 0 && (
                  <div className="mt-2 text-sm text-gray-600">
                    <details>
                      <summary className="cursor-pointer hover:text-gray-800">
                        Ver propriedades ({Object.keys(event.properties).length})
                      </summary>
                      <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-x-auto">
                        {JSON.stringify(event.properties, null, 2)}
                      </pre>
                    </details>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Complete MCP Demo App
export const MCPDemoApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'funnels' | 'analytics'>('funnels');

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold text-gray-900">MCP Demo App</h1>
            <div className="flex space-x-4">
              <button
                onClick={() => setActiveTab('funnels')}
                className={`px-4 py-2 rounded ${
                  activeTab === 'funnels'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Funis
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-4 py-2 rounded ${
                  activeTab === 'analytics'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Analytics
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {activeTab === 'funnels' && <FunnelManager />}
        {activeTab === 'analytics' && <AnalyticsDashboard />}
      </main>
    </div>
  );
};

export default MCPDemoApp;