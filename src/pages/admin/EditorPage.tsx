
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const EditorPage: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#432818]">Visual Editor</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Page Editor</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Visual page editor will be implemented here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditorPage;
