
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import FacebookPixelCard from '@/components/analytics/integrations/FacebookPixelCard';
import { GoogleAnalyticsCard } from '@/components/analytics/integrations/GoogleAnalyticsCard';
import ZapierCard from '@/components/analytics/integrations/ZapierCard';
import { ExternalLink, Settings, Zap, BarChart3 } from 'lucide-react';

const IntegrationTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <FacebookPixelCard />
        <GoogleAnalyticsCard />
        <ZapierCard />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Integrações Disponíveis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Mailchimp</h3>
                <Badge variant="secondary">Em breve</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Adicione leads automaticamente às suas listas de email
              </p>
              <Button variant="outline" size="sm" disabled>
                <ExternalLink className="h-4 w-4 mr-2" />
                Configurar
              </Button>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">HubSpot</h3>
                <Badge variant="secondary">Em breve</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Sincronize contatos e atividades com seu CRM
              </p>
              <Button variant="outline" size="sm" disabled>
                <ExternalLink className="h-4 w-4 mr-2" />
                Configurar
              </Button>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Slack</h3>
                <Badge variant="secondary">Em breve</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Receba notificações de novos leads no Slack
              </p>
              <Button variant="outline" size="sm" disabled>
                <ExternalLink className="h-4 w-4 mr-2" />
                Configurar
              </Button>
            </div>

            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold">Webhooks</h3>
                <Badge variant="secondary">Em breve</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Envie dados para qualquer API personalizada
              </p>
              <Button variant="outline" size="sm" disabled>
                <ExternalLink className="h-4 w-4 mr-2" />
                Configurar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IntegrationTab;
