import { HistoryEntry } from '@/hooks/useEditorHistory';

export interface EditorAction {
  type: 'add' | 'remove' | 'edit' | 'move' | 'reorder';
  target: 'block' | 'step' | 'quiz';
  description: string;
  metadata?: {
    blockId?: string;
    stepId?: string;
    fromIndex?: number;
    toIndex?: number;
    property?: string;
    oldValue?: any;
    newValue?: any;
  };
}

// Fábrica de ações para blocos
export const createBlockActions = (
  addHistoryEntry: (action: string, description: string, newData: any, metadata?: HistoryEntry['metadata']) => void
) => {
  return {
    // Adicionar bloco
    addBlock: (stepId: string, blockData: any, newQuizData: any) => {
      addHistoryEntry(
        'add-block',
        `Adicionado bloco ${blockData.type}`,
        newQuizData,
        {
          stepId,
          blockId: blockData.id,
          actionType: 'add'
        }
      );
    },

    // Remover bloco
    removeBlock: (stepId: string, blockId: string, blockType: string, newQuizData: any) => {
      addHistoryEntry(
        'remove-block',
        `Removido bloco ${blockType}`,
        newQuizData,
        {
          stepId,
          blockId,
          actionType: 'remove'
        }
      );
    },

    // Editar bloco
    editBlock: (stepId: string, blockId: string, property: string, oldValue: any, newValue: any, newQuizData: any) => {
      const description = property === 'content' 
        ? `Editado conteúdo do bloco`
        : `Editado ${property} do bloco`;
      
      addHistoryEntry(
        'edit-block',
        description,
        newQuizData,
        {
          stepId,
          blockId,
          actionType: 'edit'
        }
      );
    },

    // Mover bloco
    moveBlock: (fromStepId: string, toStepId: string, blockId: string, newQuizData: any) => {
      addHistoryEntry(
        'move-block',
        `Movido bloco entre etapas`,
        newQuizData,
        {
          stepId: toStepId,
          blockId,
          actionType: 'move'
        }
      );
    },

    // Reordenar blocos
    reorderBlocks: (stepId: string, fromIndex: number, toIndex: number, newQuizData: any) => {
      addHistoryEntry(
        'reorder-blocks',
        `Reordenados blocos na etapa`,
        newQuizData,
        {
          stepId,
          actionType: 'reorder'
        }
      );
    },

    // Duplicar bloco
    duplicateBlock: (stepId: string, originalBlockId: string, newBlockId: string, newQuizData: any) => {
      addHistoryEntry(
        'duplicate-block',
        `Duplicado bloco`,
        newQuizData,
        {
          stepId,
          blockId: newBlockId,
          actionType: 'add'
        }
      );
    }
  };
};

// Fábrica de ações para etapas
export const createStepActions = (
  addHistoryEntry: (action: string, description: string, newData: any, metadata?: HistoryEntry['metadata']) => void
) => {
  return {
    // Adicionar etapa
    addStep: (stepData: any, newQuizData: any) => {
      addHistoryEntry(
        'add-step',
        `Adicionada etapa ${stepData.name}`,
        newQuizData,
        {
          stepId: stepData.id,
          actionType: 'add'
        }
      );
    },

    // Remover etapa
    removeStep: (stepId: string, stepName: string, newQuizData: any) => {
      addHistoryEntry(
        'remove-step',
        `Removida etapa ${stepName}`,
        newQuizData,
        {
          stepId,
          actionType: 'remove'
        }
      );
    },

    // Editar etapa
    editStep: (stepId: string, property: string, oldValue: any, newValue: any, newQuizData: any) => {
      const description = property === 'name' 
        ? `Renomeada etapa para "${newValue}"`
        : `Editado ${property} da etapa`;
      
      addHistoryEntry(
        'edit-step',
        description,
        newQuizData,
        {
          stepId,
          actionType: 'edit'
        }
      );
    },

    // Reordenar etapas
    reorderSteps: (fromIndex: number, toIndex: number, newQuizData: any) => {
      addHistoryEntry(
        'reorder-steps',
        `Reordenadas etapas`,
        newQuizData,
        {
          actionType: 'reorder'
        }
      );
    }
  };
};

// Fábrica de ações para quiz
export const createQuizActions = (
  addHistoryEntry: (action: string, description: string, newData: any, metadata?: HistoryEntry['metadata']) => void
) => {
  return {
    // Editar propriedades do quiz
    editQuiz: (property: string, oldValue: any, newValue: any, newQuizData: any) => {
      const description = property === 'title' 
        ? `Título alterado para "${newValue}"`
        : `Editado ${property} do quiz`;
      
      addHistoryEntry(
        'edit-quiz',
        description,
        newQuizData,
        {
          actionType: 'edit'
        }
      );
    },

    // Importar configurações
    importSettings: (settingsData: any, newQuizData: any) => {
      addHistoryEntry(
        'import-settings',
        'Importadas configurações',
        newQuizData,
        {
          actionType: 'edit'
        }
      );
    },

    // Reset completo
    resetQuiz: (newQuizData: any) => {
      addHistoryEntry(
        'reset-quiz',
        'Quiz resetado',
        newQuizData,
        {
          actionType: 'remove'
        }
      );
    },

    // Importar template
    importTemplate: (_templateId: string, templateName: string, _oldQuizData: any, newQuizData: any) => {
      addHistoryEntry(
        'import-template',
        `Aplicado template "${templateName}"`,
        newQuizData,
        {
          actionType: 'edit'
        }
      );
    }
  };
};

// Utilitário para criar snapshots automáticos
export const createAutoSnapshot = (
  addHistoryEntry: (action: string, description: string, newData: any, metadata?: HistoryEntry['metadata']) => void,
  intervalMs: number = 300000 // 5 minutos por padrão
) => {
  let lastSnapshot = Date.now();

  return (currentData: any, description?: string) => {
    const now = Date.now();
    if (now - lastSnapshot >= intervalMs) {
      addHistoryEntry(
        'auto-snapshot',
        description || `Snapshot automático ${new Date(now).toLocaleTimeString('pt-BR')}`,
        currentData,
        {
          actionType: 'edit'
        }
      );
      lastSnapshot = now;
    }
  };
};

// Utilitário para batch de operações
export const createBatchOperation = (
  addHistoryEntry: (action: string, description: string, newData: any, metadata?: HistoryEntry['metadata']) => void
) => {
  return {
    executeBatch: (operations: EditorAction[], finalData: any, description: string) => {
      const metadata = {
        actionType: 'edit' as const,
        batchOperations: operations.length
      };

      addHistoryEntry(
        'batch-operation',
        description,
        finalData,
        metadata
      );
    }
  };
};