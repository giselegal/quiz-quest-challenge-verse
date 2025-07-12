
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ABTestPage: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#432818]">A/B Testing</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>A/B Test Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            A/B testing interface will be implemented here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ABTestPage;
