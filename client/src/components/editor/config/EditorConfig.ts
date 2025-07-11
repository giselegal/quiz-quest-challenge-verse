/**
 * Editor Configuration - ES7 Pattern
 * Configuração central do editor visual
 */

export const EDITOR_CONFIG = {
  // Configurações básicas
  name: 'Quiz Visual Editor',
  version: '2.0.0',
  
  // Layout padrão
  layout: {
    sidebar: {
      width: '300px',
      position: 'left' as const,
      collapsible: true
    },
    canvas: {
      maxWidth: '1200px',
      padding: '20px',
      background: '#f8f9fa'
    },
    properties: {
      width: '320px',
      position: 'right' as const,
      collapsible: true
    }
  },

  // Configurações de snap e grid
  snap: {
    enabled: true,
    gridSize: 8,
    snapToGrid: true,
    snapToElements: true
  },

  // Undo/Redo
  history: {
    maxSteps: 50,
    enabled: true
  },

  // Auto-save
  autoSave: {
    enabled: true,
    interval: 30000, // 30 segundos
    storageKey: 'quiz-editor-autosave'
  }
};

export default EDITOR_CONFIG;
