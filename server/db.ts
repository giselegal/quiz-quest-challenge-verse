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
let dbType: 'postgres' | 'sqlite' = 'sqlite';

// Try PostgreSQL/Supabase first
if (process.env.DATABASE_URL?.startsWith('postgres')) {
  try {
    console.log("🔧 Tentando conectar com PostgreSQL/Supabase...");
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
    db = drizzlePg({ client: pool, schema });
    dbType = 'postgres';
    console.log("✅ PostgreSQL/Supabase conectado com sucesso!");
  } catch (error) {
    console.warn("⚠️ Falha na conexão PostgreSQL:", error);
    console.log("🔄 Usando SQLite como fallback...");
    pool = null;
    db = null;
  }
}

// Fallback to SQLite if PostgreSQL failed or not configured
if (!db) {
  try {
    const dbPath = "./dev.db";
    console.log("🗃️  Usando SQLite local:", dbPath);
    const sqlite = new Database(dbPath);
    db = drizzleSqlite({ client: sqlite, schema: schemaSqlite });
    dbType = 'sqlite';
    console.log("✅ SQLite conectado com sucesso!");
  } catch (error) {
    console.error("❌ Falha ao conectar com SQLite:", error);
    throw new Error("Não foi possível conectar com nenhum banco de dados");
  }
}

if (dbType === 'sqlite') {
  console.log("💡 Para funcionalidade completa, configure DATABASE_URL com Supabase");
  console.log("🔗 Exemplo: DATABASE_URL='postgresql://user:pass@host:5432/db'");
}

export { pool, db, dbType };
