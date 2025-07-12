
import { useState, useEffect, useCallback } from 'react';
import { Block } from '@/types/editor';
import { schemaDrivenFunnelService } from '@/services/schemaDrivenFunnelService';

interface Funnel {
  id: string;
  name: string;
  pages: Array<{
    id: string;
    name: string;
    blocks: Block[];
  }>;
}

interface Page {
  id: string;
  name: string;
  blocks: Block[];
}

export const useSchemaEditorFixed = (funnelId?: string) => {
  const [funnel, setFunnel] = useState<Funnel | null>(null);
  const [currentPage, setCurrentPage] = useState<Page | null>(null);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPreviewing, setIsPreviewing] = useState(false);

  const loadFunnel = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let funnelData: Funnel;

      if (funnelId) {
        funnelData = await schemaDrivenFunnelService.getFunnel(funnelId);
      } else {
        funnelData = await schemaDrivenFunnelService.createDefaultFunnel();
      }

      setFunnel(funnelData);
      
      if (funnelData.pages && funnelData.pages.length > 0) {
        const firstPage = funnelData.pages[0];
        setCurrentPage(firstPage);
        setBlocks(firstPage.blocks || []);
      } else {
        const defaultPage: Page = {
          id: 'page-1',
          name: 'Página 1',
          blocks: []
        };
        setCurrentPage(defaultPage);
        setBlocks([]);
      }

    } catch (err) {
      console.error('Failed to load funnel:', err);
      setError('Erro ao carregar o funil. Tente recarregar a página.');
    } finally {
      setLoading(false);
    }
  }, [funnelId]);

  useEffect(() => {
    loadFunnel();
  }, [loadFunnel]);

  const actions = {
    isPreviewing,
    
    togglePreview: () => {
      setIsPreviewing(prev => !prev);
    },

    setCurrentPage: (pageId: string) => {
      if (!funnel) return;
      
      const page = funnel.pages.find(p => p.id === pageId);
      if (page) {
        setCurrentPage(page);
        setBlocks(page.blocks || []);
        setSelectedBlock(null);
      }
    },

    selectBlock: (blockId: string | null) => {
      if (!blockId) {
        setSelectedBlock(null);
        return;
      }
      
      const block = blocks.find(b => b.id === blockId);
      setSelectedBlock(block || null);
    },

    addBlock: (type: Block['type']) => {
      const newBlock: Block = {
        id: `block-${Date.now()}`,
        type,
        content: {},
        order: blocks.length,
        visible: true,
        properties: {} // Ensure properties is always defined
      };

      const updatedBlocks = [...blocks, newBlock];
      setBlocks(updatedBlocks);
      setSelectedBlock(newBlock);

      if (currentPage) {
        const updatedPage = { ...currentPage, blocks: updatedBlocks };
        setCurrentPage(updatedPage);
      }
    },

    updateBlock: (blockId: string, updates: any) => {
      const updatedBlocks = blocks.map(block =>
        block.id === blockId ? { 
          ...block, 
          ...updates,
          properties: { ...block.properties, ...(updates.properties || {}) }
        } : block
      );
      
      setBlocks(updatedBlocks);
      
      if (currentPage) {
        const updatedPage = { ...currentPage, blocks: updatedBlocks };
        setCurrentPage(updatedPage);
      }
    },

    deleteBlock: (blockId: string) => {
      const updatedBlocks = blocks.filter(block => block.id !== blockId);
      setBlocks(updatedBlocks);
      
      if (selectedBlock?.id === blockId) {
        setSelectedBlock(null);
      }
      
      if (currentPage) {
        const updatedPage = { ...currentPage, blocks: updatedBlocks };
        setCurrentPage(updatedPage);
      }
    },

    duplicateBlock: (blockId: string) => {
      const blockToDuplicate = blocks.find(b => b.id === blockId);
      if (!blockToDuplicate) return;

      const duplicatedBlock: Block = {
        ...blockToDuplicate,
        id: `block-${Date.now()}`,
        order: blocks.length,
        properties: { ...blockToDuplicate.properties } // Ensure properties is copied
      };

      const updatedBlocks = [...blocks, duplicatedBlock];
      setBlocks(updatedBlocks);
      
      if (currentPage) {
        const updatedPage = { ...currentPage, blocks: updatedBlocks };
        setCurrentPage(updatedPage);
      }
    },

    toggleBlockVisibility: (blockId: string) => {
      const updatedBlocks = blocks.map(block =>
        block.id === blockId ? { ...block, visible: !block.visible } : block
      );
      
      setBlocks(updatedBlocks);
      
      if (currentPage) {
        const updatedPage = { ...currentPage, blocks: updatedBlocks };
        setCurrentPage(updatedPage);
      }
    },

    saveFunnel: async () => {
      if (!funnel || !currentPage) {
        throw new Error('Nenhum funil para salvar');
      }

      try {
        const updatedFunnel = {
          ...funnel,
          pages: funnel.pages.map(page =>
            page.id === currentPage.id ? currentPage : page
          )
        };

        await schemaDrivenFunnelService.saveFunnel(updatedFunnel);
        setFunnel(updatedFunnel);
      } catch (err) {
        console.error('Save failed:', err);
        throw new Error('Erro ao salvar o funil');
      }
    }
  };

  return {
    funnel,
    currentPage,
    blocks,
    selectedBlock,
    loading,
    error,
    actions
  };
};
