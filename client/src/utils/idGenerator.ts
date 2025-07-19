/**
 * ID Generator Utils
 * Fixes the UUID issue with the database
 */

// Generate proper UUID for database storage (browser-compatible)
export const generateUUID = (): string => {
  // Use crypto.randomUUID if available (modern browsers)
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  
  // Fallback UUID v4 generation for older browsers
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
};

// Generate timestamped ID for local storage (non-database use)
export const generateTimestampId = (prefix: string = 'item'): string => {
  return `${prefix}-${Date.now()}`;
};

// Generate simple ID for editor blocks
export const generateId = (): string => {
  return `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
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