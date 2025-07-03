// DEPRECATED: This file is being removed as part of migration from Supabase to PostgreSQL
// All database operations are now handled by the server using Drizzle ORM
// Placeholder to prevent import errors during migration

export const supabase = {
  // Placeholder - all database operations moved to server
  from: () => ({
    select: () => Promise.resolve({ data: [], error: null }),
    insert: () => Promise.resolve({ data: [], error: null }),
    update: () => Promise.resolve({ data: [], error: null }),
    delete: () => Promise.resolve({ data: [], error: null }),
  })
};