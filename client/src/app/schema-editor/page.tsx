'use client';

import React, { useState } from 'react';
import SchemaDrivenEditorLayout from '@/components/editor/SchemaDrivenEditorLayout';
import { BlockData } from '@/components/editor/blocks';

const SchemaDrivenEditorPage: React.FC = () => {
  const [blocks, setBlocks] = useState<BlockData[]>([]);
  const [funnelConfig, setFunnelConfig] = useState({
    name: 'Meu Funil Incrível',
    description: 'Editor visual schema-driven em ação',
    isPublished: false,
    theme: 'caktoquiz'
  });

  const handleBlocksChange = (newBlocks: BlockData[]) => {
    setBlocks(newBlocks);
    console.log('Blocos atualizados:', newBlocks);
  };

  const handleFunnelConfigChange = (config: any) => {
    setFunnelConfig(prev => ({ ...prev, ...config }));
    console.log('Config atualizada:', config);
  };

  return (
    <SchemaDrivenEditorLayout
      initialBlocks={blocks}
      onBlocksChange={handleBlocksChange}
      funnelConfig={funnelConfig}
      onFunnelConfigChange={handleFunnelConfigChange}
    />
  );
};

export default SchemaDrivenEditorPage;
