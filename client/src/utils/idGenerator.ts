/**
 * ID Generator Utils
 * Fixes the UUID issue with the database
 */

import { randomUUID } from 'crypto';

// Generate proper UUID for database storage
export const generateUUID = (): string => {
  try {
    return randomUUID();
  } catch (error) {
    // Fallback for environments without crypto.randomUUID
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
};

// Generate timestamped ID for local storage (non-database use)
export const generateTimestampId = (prefix: string = 'item'): string => {
  return `${prefix}-${Date.now()}`;
};

// Check if a string is a valid UUID
export const isValidUUID = (id: string): boolean => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
};

// Convert timestamp ID to UUID (for migration)
export const migrateIdToUUID = (oldId: string): string => {
  if (isValidUUID(oldId)) {
    return oldId;
  }
  
  // Generate new UUID for non-UUID IDs
  const newId = generateUUID();
  console.log(`🔄 Migrating ID: ${oldId} → ${newId}`);
  return newId;
};