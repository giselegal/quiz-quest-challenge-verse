
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import ModernPropertyPanel from '@/components/editor/ModernPropertyPanel';
import { Block } from '@/types/editor';

const ComponentsDemo: React.FC = () => {
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);

  const sampleBlock: Block = {
    id: 'demo-block',
    type: 'headline',
    content: {
      title: 'Demo Title',
      subtitle: 'Demo Subtitle'
    },
    order: 0,
    visible: true,
    properties: {} // Added missing properties
  };

  const handleUpdate = (updates: Partial<Block>) => {
    if (selectedBlock) {
      setSelectedBlock({ ...selectedBlock, ...updates });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Components Demo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={() => setSelectedBlock(sampleBlock)}>
            Select Demo Block
          </Button>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Input Demo</Label>
              <Input placeholder="Type something..." />
            </div>
          </div>
        </CardContent>
      </Card>

      <ModernPropertyPanel 
        block={selectedBlock} 
        onUpdate={handleUpdate} 
      />
    </div>
  );
};

export default ComponentsDemo;
