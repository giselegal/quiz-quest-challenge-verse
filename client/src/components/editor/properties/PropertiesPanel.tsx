
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Block } from '@/types/editor';

interface PropertiesPanelProps {
  selectedBlock: Block | null;
  onUpdate: (content: any) => void;
}

export const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedBlock,
  onUpdate
}) => {
  if (!selectedBlock) {
    return (
      <Card className="w-80">
        <CardHeader>
          <CardTitle>Properties</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Select a block to edit its properties</p>
        </CardContent>
      </Card>
    );
  }

  const handleContentUpdate = (updates: any) => {
    onUpdate({
      ...selectedBlock.content,
      ...updates
    });
  };

  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Edit {selectedBlock.type}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {selectedBlock.type === 'headline' && (
          <>
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={selectedBlock.content.title || ''}
                onChange={(e) => handleContentUpdate({ title: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                value={selectedBlock.content.subtitle || ''}
                onChange={(e) => handleContentUpdate({ subtitle: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="alignment">Alignment</Label>
              <Select
                value={selectedBlock.content.alignment || 'left'}
                onValueChange={(value) => handleContentUpdate({ alignment: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        {selectedBlock.type === 'text' && (
          <div>
            <Label htmlFor="text">Text Content</Label>
            <textarea
              id="text"
              className="w-full mt-1 px-3 py-2 border rounded-md"
              value={selectedBlock.content.text || ''}
              onChange={(e) => handleContentUpdate({ text: e.target.value })}
              rows={4}
            />
          </div>
        )}

        {selectedBlock.type === 'cta' && (
          <>
            <div>
              <Label htmlFor="buttonText">Button Text</Label>
              <Input
                id="buttonText"
                value={selectedBlock.content.buttonText || ''}
                onChange={(e) => handleContentUpdate({ buttonText: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="ctaUrl">Button URL</Label>
              <Input
                id="ctaUrl"
                value={selectedBlock.content.ctaUrl || ''}
                onChange={(e) => handleContentUpdate({ ctaUrl: e.target.value })}
              />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
