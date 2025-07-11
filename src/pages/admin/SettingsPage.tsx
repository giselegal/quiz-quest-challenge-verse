import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AdminLayout } from '@/components/admin/AdminLayout';

const SettingsPage: React.FC = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Configurações</h1>
          <p className="text-gray-600">Gerencie configurações do sistema</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Configurações Gerais</CardTitle>
            <CardDescription>
              Configurações básicas do sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              As configurações serão implementadas aqui.
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default SettingsPage;