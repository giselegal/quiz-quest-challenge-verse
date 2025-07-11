
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SimpleDragDropEditor: React.FC = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Simple Drag & Drop Editor</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Editor functionality coming soon...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SimpleDragDropEditor;
