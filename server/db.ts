import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle as drizzlePg } from 'drizzle-orm/neon-serverless';
import { drizzle as drizzleSqlite } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import ws from "ws";
import * as schema from "@shared/schema";
import * as schemaSqlite from "@shared/schema_sqlite";
import { existsSync } from "fs";

neonConfig.webSocketConstructor = ws;

let pool: Pool | null = null;
let db: any = null;

// Verificar se estamos em desenvolvimento e usar SQLite
if (process.env.NODE_ENV === 'development' && !process.env.DATABASE_URL?.startsWith('postgres')) {
  console.log("🔧 Modo desenvolvimento: usando SQLite");
  
  // Criar banco SQLite se não existir
  const dbPath = './dev.db';
  const sqlite = new Database(dbPath);
  
  // Habilitar WAL mode para melhor performance
  sqlite.pragma('journal_mode = WAL');
  
  db = drizzleSqlite(sqlite, { schema: schemaSqlite });
  
  console.log(`✅ SQLite conectado: ${dbPath}`);
  
} else if (process.env.DATABASE_URL) {
  console.log("🔧 Modo produção: usando PostgreSQL/Neon");
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = drizzlePg({ client: pool, schema });
  console.log("✅ PostgreSQL/Neon conectado");
  
} else {
  console.warn("⚠️ DATABASE_URL não definida - usando storage em memória");
}

export { pool, db };
