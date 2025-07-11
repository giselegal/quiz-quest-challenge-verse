
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ABTestsPage: React.FC = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">A/B Tests</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Test Configurations</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">A/B testing functionality coming soon.</p>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default ABTestsPage;
