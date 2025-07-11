
import React, { useState } from 'react';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Block, BlockType } from '@/types/editor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PageEditor: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);

  const addBlock = (type: BlockType) => {
    const newBlock: Block = {
      id: `block-${Date.now()}`,
      type,
      content: {},
      order: blocks.length,
      visible: true // Add missing visible property
    };
    setBlocks([...blocks, newBlock]);
  };

  const updateBlock = (blockId: string, updates: Partial<Block>) => {
    setBlocks(blocks.map(block => 
      block.id === blockId ? { ...block, ...updates } : block
    ));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    // Handle drag end logic here
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-80 border-r bg-gray-50 p-4">
        <Card>
          <CardHeader>
            <CardTitle>Add Blocks</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button onClick={() => addBlock('header')} className="w-full">
              Header
            </Button>
            <Button onClick={() => addBlock('headline')} className="w-full">
              Headline
            </Button>
            <Button onClick={() => addBlock('text')} className="w-full">
              Text
            </Button>
            <Button onClick={() => addBlock('image')} className="w-full">
              Image
            </Button>
            <Button onClick={() => addBlock('cta')} className="w-full">
              Call to Action
            </Button>
            <Button onClick={() => addBlock('pricing')} className="w-full">
              Pricing
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Main Canvas */}
      <div className="flex-1 p-4 overflow-auto">
        <DndContext onDragEnd={handleDragEnd}>
          <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-4">
              {blocks.map((block) => (
                <Card 
                  key={block.id} 
                  className={`cursor-pointer ${selectedBlock?.id === block.id ? 'ring-2 ring-blue-500' : ''}`}
                  onClick={() => setSelectedBlock(block)}
                >
                  <CardContent className="p-4">
                    <div className="text-sm text-gray-500 mb-2">{block.type}</div>
                    <div>
                      {block.type === 'header' && (
                        <h1 className="text-2xl font-bold">{block.content.title || 'Header Title'}</h1>
                      )}
                      {block.type === 'headline' && (
                        <h2 className="text-xl font-bold">{block.content.title || 'Headline'}</h2>
                      )}
                      {block.type === 'text' && (
                        <p>{block.content.text || 'Text content goes here...'}</p>
                      )}
                      {block.type === 'image' && (
                        <div className="bg-gray-200 h-32 rounded flex items-center justify-center">
                          {block.content.imageUrl ? (
                            <img src={block.content.imageUrl} alt={block.content.imageAlt} className="max-h-full" />
                          ) : (
                            <span className="text-gray-500">Image placeholder</span>
                          )}
                        </div>
                      )}
                      {block.type === 'cta' && (
                        <Button>{block.content.ctaText || 'Call to Action'}</Button>
                      )}
                      {block.type === 'pricing' && (
                        <div className="text-center">
                          <div className="text-2xl font-bold">{block.content.salePrice || '$99'}</div>
                          <div className="text-sm line-through text-gray-500">{block.content.regularPrice || '$199'}</div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>

      {/* Properties Panel */}
      <div className="w-80 border-l bg-gray-50 p-4">
        {selectedBlock ? (
          <Card>
            <CardHeader>
              <CardTitle>Edit {selectedBlock.type}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {(selectedBlock.type === 'header' || selectedBlock.type === 'headline') && (
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <input 
                    type="text" 
                    value={selectedBlock.content.title || ''} 
                    onChange={(e) => updateBlock(selectedBlock.id, { 
                      content: { ...selectedBlock.content, title: e.target.value }
                    })}
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                  />
                </div>
              )}
              {/* Add more property editors as needed */}
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-4">
              <p className="text-gray-500">Select a block to edit its properties</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PageEditor;
