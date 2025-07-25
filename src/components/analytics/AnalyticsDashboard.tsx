import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BarChart3, Users, MousePointer, Smartphone, Monitor, Tablet, Trash2 } from 'lucide-react';
import { analyticsService } from '../../services/analyticsService';

/**
 * Basic Analytics Dashboard Component
 * Shows key metrics about editor usage and quiz performance
 */

interface AnalyticsDashboardProps {
  className?: string;
}

const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({ className = '' }) => {
  const [analytics, setAnalytics] = useState({
    totalEvents: 0,
    totalQuizSessions: 0,
    totalEditorActions: 0,
    topEvents: [] as Array<{ event: string; count: number }>,
    deviceBreakdown: {} as Record<string, number>
  });

  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const data = analyticsService.getAnalyticsSummary();
    setAnalytics(data);
  }, [refreshKey]);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  const handleClearData = () => {
    if (confirm('Tem certeza que deseja limpar todos os dados de analytics? Esta ação não pode ser desfeita.')) {
      analyticsService.clearAnalytics();
      handleRefresh();
    }
  };

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'mobile': return <Smartphone className="w-4 h-4" />;
      case 'tablet': return <Tablet className="w-4 h-4" />;
      case 'desktop': return <Monitor className="w-4 h-4" />;
      default: return <Monitor className="w-4 h-4" />;
    }
  };

  const totalInteractions = analytics.totalEvents + analytics.totalQuizSessions + analytics.totalEditorActions;

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
          <p className="text-gray-600">Métricas de uso do editor e quizzes</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleRefresh} variant="outline" size="sm">
            <BarChart3 className="w-4 h-4 mr-2" />
            Atualizar
          </Button>
          <Button onClick={handleClearData} variant="outline" size="sm" className="text-red-600 hover:text-red-700">
            <Trash2 className="w-4 h-4 mr-2" />
            Limpar Dados
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Interações</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalInteractions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Eventos, sessões e ações do editor
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Eventos Gerais</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalEvents.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Cliques, navegação e interações
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sessões de Quiz</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalQuizSessions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Quizzes iniciados e completados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ações do Editor</CardTitle>
            <MousePointer className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analytics.totalEditorActions.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Criação, edição e salvamento
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Events */}
        <Card>
          <CardHeader>
            <CardTitle>Eventos Mais Frequentes</CardTitle>
            <CardDescription>
              Ações mais realizadas pelos usuários
            </CardDescription>
          </CardHeader>
          <CardContent>
            {analytics.topEvents.length > 0 ? (
              <div className="space-y-3">
                {analytics.topEvents.map((item, index) => (
                  <div key={item.event} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">{index + 1}</Badge>
                      <span className="text-sm font-medium">{item.event.replace(/_/g, ' ')}</span>
                    </div>
                    <Badge variant="secondary">{item.count}</Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-8">
                Nenhum evento registrado ainda.
                <br />
                Use o editor para gerar dados de analytics.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Device Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Uso por Dispositivo</CardTitle>
            <CardDescription>
              Distribuição de dispositivos utilizados
            </CardDescription>
          </CardHeader>
          <CardContent>
            {Object.keys(analytics.deviceBreakdown).length > 0 ? (
              <div className="space-y-3">
                {Object.entries(analytics.deviceBreakdown)
                  .sort(([,a], [,b]) => b - a)
                  .map(([device, count]) => (
                    <div key={device} className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {getDeviceIcon(device)}
                        <span className="text-sm font-medium capitalize">
                          {device === 'desktop' ? 'Desktop' : 
                           device === 'mobile' ? 'Mobile' : 
                           device === 'tablet' ? 'Tablet' : device}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{
                              width: `${(count / Math.max(...Object.values(analytics.deviceBreakdown))) * 100}%`
                            }}
                          />
                        </div>
                        <Badge variant="secondary">{count}</Badge>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500 text-center py-8">
                Nenhum dado de dispositivo disponível.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
          <CardDescription>
            Gerencie e analise seus dados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button 
              onClick={() => analyticsService.trackEvent('analytics_dashboard_viewed')}
              variant="outline" 
              size="sm"
            >
              Testar Evento
            </Button>
            <Button 
              onClick={() => {
                const summary = analyticsService.getAnalyticsSummary();
                console.log('📊 Analytics Summary:', summary);
                alert('Dados exportados para o console do navegador (F12)');
              }}
              variant="outline" 
              size="sm"
            >
              Exportar Dados
            </Button>
            <Button 
              onClick={() => {
                analyticsService.setEnabled(true);
                alert('Analytics ativado!');
              }}
              variant="outline" 
              size="sm"
            >
              Ativar Tracking
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data Notice */}
      <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
        <strong>Nota sobre os dados:</strong> Esta é uma implementação básica de analytics que armazena dados localmente. 
        Em produção, os dados seriam enviados para o Supabase ou serviço de analytics dedicado. 
        Os dados são mantidos no navegador e podem ser perdidos ao limpar o cache.
      </div>
    </div>
  );
};

export default AnalyticsDashboard;