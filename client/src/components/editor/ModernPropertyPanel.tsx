
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Block } from '@/types/editor';

interface ModernPropertyPanelProps {
  block: Block | null;
  onUpdate: (updates: Partial<Block>) => void;
}

const ModernPropertyPanel: React.FC<ModernPropertyPanelProps> = ({ block, onUpdate }) => {
  if (!block) {
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

  const handleContentUpdate = (contentUpdates: any) => {
    onUpdate({
      content: {
        ...block.content,
        ...contentUpdates
      }
    });
  };

  return (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Edit {block.type}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {block.type === 'header' && (
          <>
            <div>
              <label className="text-sm font-medium">Title</label>
              <input 
                type="text" 
                value={block.content.title || ''} 
                onChange={(e) => handleContentUpdate({ title: e.target.value })}
                className="w-full mt-1 px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Logo URL</label>
              <input 
                type="text" 
                value={block.content.logoUrl || ''} 
                onChange={(e) => handleContentUpdate({ logoUrl: e.target.value })}
                className="w-full mt-1 px-3 py-2 border rounded-md"
              />
            </div>
          </>
        )}
        
        {block.type === 'quiz-question' && (
          <div>
            <label className="text-sm font-medium">Question</label>
            <textarea 
              value={block.content.question || ''} 
              onChange={(e) => handleContentUpdate({ question: e.target.value })}
              className="w-full mt-1 px-3 py-2 border rounded-md"
              rows={3}
            />
          </div>
        )}

        {block.type === 'text' && (
          <div>
            <label className="text-sm font-medium">Text Content</label>
            <textarea 
              value={block.content.text || ''} 
              onChange={(e) => handleContentUpdate({ text: e.target.value })}
              className="w-full mt-1 px-3 py-2 border rounded-md"
              rows={4}
            />
          </div>
        )}

        {block.type === 'image' && (
          <>
            <div>
              <label className="text-sm font-medium">Image URL</label>
              <input 
                type="text" 
                value={block.content.imageUrl || ''} 
                onChange={(e) => handleContentUpdate({ imageUrl: e.target.value })}
                className="w-full mt-1 px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Alt Text</label>
              <input 
                type="text" 
                value={block.content.imageAlt || ''} 
                onChange={(e) => handleContentUpdate({ imageAlt: e.target.value })}
                className="w-full mt-1 px-3 py-2 border rounded-md"
              />
            </div>
          </>
        )}

        {block.type === 'cta' && (
          <>
            <div>
              <label className="text-sm font-medium">Button Text</label>
              <input 
                type="text" 
                value={block.content.ctaText || ''} 
                onChange={(e) => handleContentUpdate({ ctaText: e.target.value })}
                className="w-full mt-1 px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Button URL</label>
              <input 
                type="text" 
                value={block.content.ctaUrl || ''} 
                onChange={(e) => handleContentUpdate({ ctaUrl: e.target.value })}
                className="w-full mt-1 px-3 py-2 border rounded-md"
              />
            </div>
          </>
        )}

        {block.type === 'pricing' && (
          <>
            <div>
              <label className="text-sm font-medium">Regular Price</label>
              <input 
                type="text" 
                value={block.content.regularPrice || ''} 
                onChange={(e) => handleContentUpdate({ regularPrice: e.target.value })}
                className="w-full mt-1 px-3 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Sale Price</label>
              <input 
                type="text" 
                value={block.content.salePrice || ''} 
                onChange={(e) => handleContentUpdate({ salePrice: e.target.value })}
                className="w-full mt-1 px-3 py-2 border rounded-md"
              />
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ModernPropertyPanel;
