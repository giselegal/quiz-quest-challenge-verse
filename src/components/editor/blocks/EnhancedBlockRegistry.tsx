// @ts-nocheck
// Stub for build compatibility
import React from 'react';

export const ENHANCED_BLOCK_REGISTRY: Record<string, React.ComponentType<any>> = {};
export const AVAILABLE_COMPONENTS: Array<{type: string; label: string; category: string;}> = [];
export const getEnhancedBlockComponent = (type: string): React.ComponentType<any> | null => null;
export const getRegistryStats = () => ({});
export const normalizeBlockProperties = (props: any) => props;
export default ENHANCED_BLOCK_REGISTRY;
