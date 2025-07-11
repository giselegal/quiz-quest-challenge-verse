import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from '@/context/AuthContext';

interface AnalyticsEvent {
  event_type: string;
  timestamp: string;
  utm_source?: string;
  utm_campaign?: string;
  [key: string]: any;
}

const RealTimeMetrics: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      setError(null);
      try {
        // Simulação de dados de analytics (substitua pela sua API real)
        const mockAnalytics = [
          { event_type: 'page_view', timestamp: new Date().toISOString(), page: '/home', utm_source: 'facebook', utm_campaign: 'spring_sale' },
          { event_type: 'button_click', timestamp: new Date().toISOString(), button: 'start_quiz', utm_source: 'google', utm_campaign: 'summer_promo' },
          { event_type: 'quiz_completed', timestamp: new Date().toISOString(), utm_source: 'email', utm_campaign: 'newsletter' },
        ];

        setAnalyticsData(mockAnalytics);
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar dados de analytics.');
        toast({
          title: "Erro ao carregar analytics",
          description: "Ocorreu um erro ao buscar os dados de analytics em tempo real.",
          variant: "destructive",
        })
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();

    // Simulação de atualização em tempo real (substitua pelo seu WebSocket ou similar)
    const intervalId = setInterval(() => {
      fetchAnalytics();
    }, 10000);

    return () => clearInterval(intervalId);
  }, [toast, user]);

  const processAnalyticsEvent = (event: any) => {
    // Fixed: Handle possibly undefined properties
    if (event.utm_source !== undefined) {
      // Process utm_source
    }
    if (event.utm_campaign !== undefined) {
      // Process utm_campaign  
    }
    
    // Aqui você pode adicionar lógica para processar cada tipo de evento
    switch (event.event_type) {
      case 'page_view':
        // Lógica para eventos de visualização de página
        break;
      case 'button_click':
        // Lógica para eventos de clique em botão
        break;
      case 'quiz_completed':
        // Lógica para eventos de conclusão de quiz
        break;
      default:
        console.warn('Tipo de evento desconhecido:', event.event_type);
    }
  };

  if (loading) {
    return <CardContent>Carregando dados de analytics...</CardContent>;
  }

  if (error) {
    return <CardContent>Erro: {error}</CardContent>;
  }

  // Preparar dados para o gráfico de barras (exemplo)
  const chartData = analyticsData.map(event => ({
    name: event.event_type,
    value: 1, // Simplificado para fins de demonstração
  }));

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Analytics em Tempo Real</CardTitle>
      </CardHeader>
      <CardContent className="pl-2 flex flex-col">
        {analyticsData.length === 0 ? (
          <p>Nenhum dado de analytics disponível.</p>
        ) : (
          <>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>

            <ul>
              {analyticsData.map((event, index) => (
                <li key={index}>
                  Evento: {event.event_type} - Timestamp: {event.timestamp}
                </li>
              ))}
            </ul>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default RealTimeMetrics;
