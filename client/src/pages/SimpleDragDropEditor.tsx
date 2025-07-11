
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const SimpleDragDropEditor: React.FC = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Editor Simples</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Editor drag & drop simples em desenvolvimento.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SimpleDragDropEditor;
