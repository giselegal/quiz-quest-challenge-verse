import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, BarChart3, Users, TrendingUp, Clock } from 'lucide-react';

const FunnelMonitoringDashboard: React.FC = () => {
  const [funnels, setFunnels] = useState([]);
  const [metrics, setMetrics] = useState({
    totalViews: 0,
    conversions: 0,
    conversionRate: 0,
    averageTime: 0
  });

  useEffect(() => {
    // Load funnel data and metrics
    loadFunnelData();
  }, []);

  const loadFunnelData = () => {
    // Implementation for loading funnel data
    setMetrics({
      totalViews: 1250,
      conversions: 89,
      conversionRate: 7.12,
      averageTime: 245
    });
  };

  return (
    <div className="funnel-monitoring-dashboard p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#432818]" style={{ fontFamily: 'Playfair Display, serif' }}>
            Monitoramento de Funis
          </h1>
          <p className="text-[#8F7A6A] mt-2">
            Acompanhe o desempenho dos seus funis em tempo real
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Criar Funil
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#8F7A6A]">
              Total de Visualizações
            </CardTitle>
            <Users className="h-4 w-4 text-[#B89B7A]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#432818]">{metrics.totalViews}</div>
            <p className="text-xs text-[#8F7A6A]">
              +12% desde ontem
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#8F7A6A]">
              Conversões
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-[#B89B7A]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#432818]">{metrics.conversions}</div>
            <p className="text-xs text-[#8F7A6A]">
              +8% desde ontem
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#8F7A6A]">
              Taxa de Conversão
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-[#B89B7A]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#432818]">{metrics.conversionRate}%</div>
            <p className="text-xs text-[#8F7A6A]">
              +2.1% desde ontem
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#8F7A6A]">
              Tempo Médio
            </CardTitle>
            <Clock className="h-4 w-4 text-[#B89B7A]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#432818]">{Math.floor(metrics.averageTime / 60)}:{(metrics.averageTime % 60).toString().padStart(2, '0')}</div>
            <p className="text-xs text-[#8F7A6A]">
              -0:15 desde ontem
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-[#432818]">Funis Ativos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-[#D4C4A0] rounded-lg">
              <div>
                <h3 className="font-semibold text-[#432818]">Quiz de Estilo Predominante</h3>
                <p className="text-sm text-[#8F7A6A]">Descoberta de estilo pessoal</p>
                <div className="flex gap-4 mt-2 text-xs text-[#8F7A6A]">
                  <span>Visualizações: 850</span>
                  <span>Conversões: 67</span>
                  <span>Taxa: 7.9%</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Ativo</span>
                <Button variant="outline" size="sm">
                  Ver Detalhes
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 border border-[#D4C4A0] rounded-lg">
              <div>
                <h3 className="font-semibold text-[#432818]">Quiz de Personalidade Fashion</h3>
                <p className="text-sm text-[#8F7A6A]">Identificação de preferências</p>
                <div className="flex gap-4 mt-2 text-xs text-[#8F7A6A]">
                  <span>Visualizações: 400</span>
                  <span>Conversões: 22</span>
                  <span>Taxa: 5.5%</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Teste</span>
                <Button variant="outline" size="sm">
                  Ver Detalhes
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FunnelMonitoringDashboard;
