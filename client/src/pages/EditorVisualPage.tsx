
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const EditorVisualPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Visual Editor</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Visual editor functionality coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditorVisualPage;
