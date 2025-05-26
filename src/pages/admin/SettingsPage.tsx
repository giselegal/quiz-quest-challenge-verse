"use client";

import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { AppearanceTab } from '@/components/settings/AppearanceTab';
import { AnalyticsTab } from '@/components/settings/AnalyticsTab';
import { MarketingTab } from '@/components/settings/MarketingTab';
import { ApiIntegrationsTab } from '@/components/settings/ApiIntegrationsTab';
import { AdvancedTab } from '@/components/settings/AdvancedTab';
import { FacebookAdsTab } from '@/components/settings/FacebookAdsTab';
import { UtmSettingsTab } from '@/components/settings/UtmSettingsTab';
import { useSearchParams, useRouter } from 'next/navigation';
const SettingsPage = () => {
  const searchParams = useSearchParams();
  const defaultTab = searchParams.get('tab') || 'appearance';
  const [activeTab, setActiveTab] = useState(defaultTab);
  const router = useRouter();
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    router.push(`/admin/settings?tab=${value}`);
  };
  return (
    <AdminLayout>
      <div className="container p-6">
        <h1 className="text-2xl font-semibold mb-6">Configurações</h1>
        
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
          <TabsList className="grid grid-cols-7 gap-1">
            <TabsTrigger value="appearance">Aparência</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="utm">UTM</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
            <TabsTrigger value="facebook-ads">Facebook Ads</TabsTrigger>
            <TabsTrigger value="integrations">API</TabsTrigger>
            <TabsTrigger value="advanced">Avançado</TabsTrigger>
          </TabsList>
          
          <TabsContent value="appearance">
            <AppearanceTab />
          </TabsContent>
          <TabsContent value="analytics">
            <AnalyticsTab />
          <TabsContent value="utm">
            <UtmSettingsTab />
          <TabsContent value="marketing">
            <MarketingTab />
          <TabsContent value="facebook-ads">
            <FacebookAdsTab />
          <TabsContent value="integrations">
            <ApiIntegrationsTab />
          <TabsContent value="advanced">
            <AdvancedTab />
        </Tabs>
      </div>
    </AdminLayout>
  );
};
export default SettingsPage;
