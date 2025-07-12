
import { Block } from './editor';

// Type alias for BlockData - now using Block as the base
export type BlockData = Block;

// Additional block-specific properties
export interface BlockMetadata {
  lastModified?: Date;
  author?: string;
  version?: number;
}

export interface ExtendedBlockData extends Block {
  metadata?: BlockMetadata;
}
