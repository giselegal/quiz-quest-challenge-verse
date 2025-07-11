
import React, { useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';
import { ComponentsSidebar } from '../sidebar/ComponentsSidebar';
import { EditPreview } from '../preview/EditPreview';
import { PropertiesPanel } from '../properties/PropertiesPanel';
import { cn } from '@/lib/utils';
import { useEditor } from '@/hooks/useEditor';
import { EditableContent } from '@/types/editor';

interface EditorWorkspaceProps {
  className?: string;
}

export function EditorWorkspace({ className }: EditorWorkspaceProps) {
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);
  const { config, addBlock, updateBlock, deleteBlock } = useEditor();

  const handleUpdateBlock = (content: EditableContent) => {
    if (selectedComponentId) {
      updateBlock(selectedComponentId, content);
    }
  };

  const handleDeleteBlock = () => {
    if (selectedComponentId) {
      deleteBlock(selectedComponentId);
      setSelectedComponentId(null);
    }
  };

  return (
    <div className={cn("h-screen flex flex-col bg-[#FAF9F7]", className)}>
      <ResizablePanelGroup direction="horizontal">
        {/* Components Sidebar */}
        <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
          <ComponentsSidebar 
            onComponentSelect={(type) => {
              const id = addBlock(type);
              setSelectedComponentId(id);
            }} 
          />
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Preview Area */}
        <ResizablePanel defaultSize={55}>
          <EditPreview 
            isPreviewing={isPreviewing}
            onPreviewToggle={() => setIsPreviewing(!isPreviewing)}
            onSelectComponent={setSelectedComponentId}
            selectedComponentId={selectedComponentId}
          />
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Properties Panel */}
        <ResizablePanel defaultSize={25}>
          <PropertiesPanel
            selectedBlockId={selectedComponentId}
            onClose={() => setSelectedComponentId(null)}
            blocks={config.blocks}
            onUpdate={handleUpdateBlock}
            onDelete={handleDeleteBlock}
          />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
