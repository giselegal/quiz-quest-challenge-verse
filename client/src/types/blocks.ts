// Tipos base para o sistema de blocos schema-driven

export interface BlockData {
  id: string;
  type: string;
  properties: Record<string, any>;
}

export interface BlockComponentProps {
  block: BlockData;
  isSelected?: boolean;
  isEditing?: boolean;
  onClick?: () => void;
  onPropertyChange?: (key: string, value: any) => void;
  className?: string;
}

// Re-export tipos existentes para compatibilidade
export type { BlockData as Block } from '@/services/funnelService';
