
import { Block } from './editor';

// Type alias for BlockData - now using Block as the base
export type BlockData = Block;

// Block component props interface for all block components
export interface BlockComponentProps {
  block: Block;
  isSelected?: boolean;
  isEditing?: boolean;
  onClick?: () => void;
  onPropertyChange?: (key: string, value: any) => void;
  className?: string;
}

// Additional block-specific properties
export interface BlockMetadata {
  lastModified?: Date;
  author?: string;
  version?: number;
}

export interface ExtendedBlockData extends Block {
  metadata?: BlockMetadata;
}
