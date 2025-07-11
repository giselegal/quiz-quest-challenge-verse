/**
 * Tipos TypeScript centralizados para o Editor
 * Organização limpa de todas as interfaces
 */

export interface EditorBlock {
  id: string;
  type: string;
  content: Record<string, any>;
  position?: {
    x: number;
    y: number;
  };
  styles?: Record<string, any>;
  metadata?: {
    createdAt: Date;
    updatedAt: Date;
  };
}

export interface EditorPage {
  id: string;
  title: string;
  blocks: EditorBlock[];
  settings?: {
    backgroundColor?: string;
    showHeader?: boolean;
    showProgress?: boolean;
  };
}

export interface EditorProject {
  id: string;
  name: string;
  pages: EditorPage[];
  settings: {
    theme?: string;
    responsive?: boolean;
  };
}

export interface EditorState {
  currentProject: EditorProject | null;
  currentPageId: string | null;
  selectedBlockId: string | null;
  isEditing: boolean;
  isDirty: boolean;
}

export interface BlockDefinition {
  type: string;
  name: string;
  icon: string;
  category: 'quiz' | 'content' | 'media' | 'layout';
  description: string;
  defaultContent: Record<string, any>;
}

export interface EditorAction {
  type: string;
  payload?: any;
}

export interface EditorContextValue {
  state: EditorState;
  dispatch: (action: EditorAction) => void;
  // Actions
  addBlock: (type: string, content?: Record<string, any>) => void;
  updateBlock: (id: string, updates: Partial<EditorBlock>) => void;
  deleteBlock: (id: string) => void;
  selectBlock: (id: string) => void;
  deselectBlock: () => void;
  // Pages
  addPage: () => void;
  deletePage: (id: string) => void;
  switchPage: (id: string) => void;
  // Project
  saveProject: () => Promise<void>;
  loadProject: (id: string) => Promise<void>;
  exportProject: () => string;
}
