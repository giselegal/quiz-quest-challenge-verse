import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AdminLayout } from '@/components/admin/AdminLayout';

const ABTestsPage: React.FC = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Testes A/B</h1>
          <p className="text-gray-600">Configure e monitore testes A/B</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Testes A/B Ativos</CardTitle>
            <CardDescription>
              Visualize e gerencie seus testes A/B
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">
              Os testes A/B serão listados aqui.
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default ABTestsPage;