
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import FacebookPixelCard from '@/components/analytics/integrations/FacebookPixelCard';
import { GoogleAnalyticsCard } from '@/components/analytics/integrations/GoogleAnalyticsCard';
import { WebhookCard } from '@/components/analytics/integrations/WebhookCard';
import { ZapierCard } from '@/components/analytics/integrations/ZapierCard';

export const IntegrationTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#432818]">Integrações</h2>
        <Badge variant="secondary" className="bg-[#B89B7A]/10 text-[#432818]">
          4 Disponíveis
        </Badge>
      </div>

      <Tabs defaultValue="social" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="automation">Automação</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
        </TabsList>

        <TabsContent value="social" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-[#432818]">Redes Sociais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FacebookPixelCard />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-[#432818]">Analytics & Tracking</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <GoogleAnalyticsCard />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-[#432818]">Automação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <ZapierCard />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-[#432818]">Webhooks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <WebhookCard />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
