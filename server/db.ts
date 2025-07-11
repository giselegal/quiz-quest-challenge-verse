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

// Use Supabase as primary database for consistency
if (process.env.DATABASE_URL?.startsWith('postgres')) {
  console.log("🔧 Usando PostgreSQL/Neon (Supabase)");
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = drizzlePg({ client: pool, schema });
  console.log("✅ PostgreSQL/Neon conectado");
} else {
  console.warn("⚠️ DATABASE_URL não definida - funcionalidade limitada");
  console.log("💡 Para funcionalidade completa, configure DATABASE_URL com Supabase");
}

export { pool, db };
