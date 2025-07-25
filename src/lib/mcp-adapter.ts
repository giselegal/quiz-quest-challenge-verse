// MCP Adapter Implementation Example
// This file demonstrates how to implement the MCP Protocol

import { createClient, SupabaseClient } from '@supabase/supabase-js';
import Database from 'better-sqlite3';

// Core MCP Types
export interface MCPResponse<T> {
  success: boolean;
  data?: T;
  error?: MCPError;
  metadata: {
    timestamp: string;
    provider: DatabaseProvider;
    execution_time: number;
    query_count: number;
  };
}

export interface MCPError {
  code: string;
  message: string;
  details?: any;
  stack?: string;
  retry_after?: number;
}

export type DatabaseProvider = 'supabase' | 'sqlite' | 'better-sqlite3';

export interface MCPQuery {
  where?: WhereClause[];
  orderBy?: { field: string; direction: 'asc' | 'desc' }[];
  limit?: number;
  offset?: number;
  include?: string[];
}

export interface WhereClause {
  field: string;
  operator: 'eq' | 'neq' | 'gt' | 'gte' | 'lt' | 'lte' | 'in' | 'like';
  value: any;
  logical?: 'and' | 'or';
}

// Provider Interface
export interface MCPProvider {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  healthCheck(): Promise<boolean>;
  
  create<T>(table: string, data: T): Promise<MCPResponse<T>>;
  read<T>(table: string, query: MCPQuery): Promise<MCPResponse<T[]>>;
  update<T>(table: string, id: string, data: Partial<T>): Promise<MCPResponse<T>>;
  delete(table: string, id: string): Promise<MCPResponse<boolean>>;
  
  query<T>(sql: string, params?: any[]): Promise<MCPResponse<T[]>>;
  count(table: string, query?: MCPQuery): Promise<MCPResponse<number>>;
}

// Supabase Provider Implementation
export class SupabaseProvider implements MCPProvider {
  private client: SupabaseClient;
  private connected = false;

  constructor(private config: { url: string; key: string }) {
    this.client = createClient(config.url, config.key);
  }

  async connect(): Promise<void> {
    try {
      const { data, error } = await this.client.from('funnels').select('count').limit(1);
      if (error) throw error;
      this.connected = true;
    } catch (error) {
      throw new Error(`Failed to connect to Supabase: ${error.message}`);
    }
  }

  async disconnect(): Promise<void> {
    this.connected = false;
  }

  async healthCheck(): Promise<boolean> {
    try {
      const { error } = await this.client.from('funnels').select('count').limit(1);
      return !error;
    } catch {
      return false;
    }
  }

  async create<T>(table: string, data: T): Promise<MCPResponse<T>> {
    const startTime = Date.now();
    
    try {
      const { data: result, error } = await this.client
        .from(table)
        .insert(data)
        .select()
        .single();

      if (error) {
        return {
          success: false,
          error: {
            code: 'SUPABASE_CREATE_ERROR',
            message: error.message,
            details: error
          },
          metadata: {
            timestamp: new Date().toISOString(),
            provider: 'supabase',
            execution_time: Date.now() - startTime,
            query_count: 1
          }
        };
      }

      return {
        success: true,
        data: result,
        metadata: {
          timestamp: new Date().toISOString(),
          provider: 'supabase',
          execution_time: Date.now() - startTime,
          query_count: 1
        }
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'SUPABASE_UNEXPECTED_ERROR',
          message: error.message,
          stack: error.stack
        },
        metadata: {
          timestamp: new Date().toISOString(),
          provider: 'supabase',
          execution_time: Date.now() - startTime,
          query_count: 1
        }
      };
    }
  }

  async read<T>(table: string, query: MCPQuery): Promise<MCPResponse<T[]>> {
    const startTime = Date.now();
    
    try {
      let supabaseQuery = this.client.from(table).select('*');
      
      // Apply WHERE clauses
      if (query.where) {
        for (const where of query.where) {
          supabaseQuery = this.applyWhereClause(supabaseQuery, where);
        }
      }
      
      // Apply ORDER BY
      if (query.orderBy) {
        for (const order of query.orderBy) {
          supabaseQuery = supabaseQuery.order(order.field, { ascending: order.direction === 'asc' });
        }
      }
      
      // Apply LIMIT and OFFSET
      if (query.limit) {
        supabaseQuery = supabaseQuery.limit(query.limit);
      }
      if (query.offset) {
        supabaseQuery = supabaseQuery.range(query.offset, (query.offset + (query.limit || 100)) - 1);
      }

      const { data, error } = await supabaseQuery;

      if (error) {
        return {
          success: false,
          error: {
            code: 'SUPABASE_READ_ERROR',
            message: error.message,
            details: error
          },
          metadata: {
            timestamp: new Date().toISOString(),
            provider: 'supabase',
            execution_time: Date.now() - startTime,
            query_count: 1
          }
        };
      }

      return {
        success: true,
        data: data || [],
        metadata: {
          timestamp: new Date().toISOString(),
          provider: 'supabase',
          execution_time: Date.now() - startTime,
          query_count: 1
        }
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'SUPABASE_UNEXPECTED_ERROR',
          message: error.message,
          stack: error.stack
        },
        metadata: {
          timestamp: new Date().toISOString(),
          provider: 'supabase',
          execution_time: Date.now() - startTime,
          query_count: 1
        }
      };
    }
  }

  async update<T>(table: string, id: string, data: Partial<T>): Promise<MCPResponse<T>> {
    const startTime = Date.now();
    
    try {
      const { data: result, error } = await this.client
        .from(table)
        .update(data)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        return {
          success: false,
          error: {
            code: 'SUPABASE_UPDATE_ERROR',
            message: error.message,
            details: error
          },
          metadata: {
            timestamp: new Date().toISOString(),
            provider: 'supabase',
            execution_time: Date.now() - startTime,
            query_count: 1
          }
        };
      }

      return {
        success: true,
        data: result,
        metadata: {
          timestamp: new Date().toISOString(),
          provider: 'supabase',
          execution_time: Date.now() - startTime,
          query_count: 1
        }
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'SUPABASE_UNEXPECTED_ERROR',
          message: error.message,
          stack: error.stack
        },
        metadata: {
          timestamp: new Date().toISOString(),
          provider: 'supabase',
          execution_time: Date.now() - startTime,
          query_count: 1
        }
      };
    }
  }

  async delete(table: string, id: string): Promise<MCPResponse<boolean>> {
    const startTime = Date.now();
    
    try {
      const { error } = await this.client
        .from(table)
        .delete()
        .eq('id', id);

      if (error) {
        return {
          success: false,
          error: {
            code: 'SUPABASE_DELETE_ERROR',
            message: error.message,
            details: error
          },
          metadata: {
            timestamp: new Date().toISOString(),
            provider: 'supabase',
            execution_time: Date.now() - startTime,
            query_count: 1
          }
        };
      }

      return {
        success: true,
        data: true,
        metadata: {
          timestamp: new Date().toISOString(),
          provider: 'supabase',
          execution_time: Date.now() - startTime,
          query_count: 1
        }
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'SUPABASE_UNEXPECTED_ERROR',
          message: error.message,
          stack: error.stack
        },
        metadata: {
          timestamp: new Date().toISOString(),
          provider: 'supabase',
          execution_time: Date.now() - startTime,
          query_count: 1
        }
      };
    }
  }

  async query<T>(sql: string, params?: any[]): Promise<MCPResponse<T[]>> {
    const startTime = Date.now();
    
    try {
      const { data, error } = await this.client.rpc('execute_sql', { 
        sql_query: sql, 
        query_params: params || [] 
      });

      if (error) {
        return {
          success: false,
          error: {
            code: 'SUPABASE_QUERY_ERROR',
            message: error.message,
            details: error
          },
          metadata: {
            timestamp: new Date().toISOString(),
            provider: 'supabase',
            execution_time: Date.now() - startTime,
            query_count: 1
          }
        };
      }

      return {
        success: true,
        data: data || [],
        metadata: {
          timestamp: new Date().toISOString(),
          provider: 'supabase',
          execution_time: Date.now() - startTime,
          query_count: 1
        }
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'SUPABASE_UNEXPECTED_ERROR',
          message: error.message,
          stack: error.stack
        },
        metadata: {
          timestamp: new Date().toISOString(),
          provider: 'supabase',
          execution_time: Date.now() - startTime,
          query_count: 1
        }
      };
    }
  }

  async count(table: string, query?: MCPQuery): Promise<MCPResponse<number>> {
    const startTime = Date.now();
    
    try {
      let supabaseQuery = this.client.from(table).select('*', { count: 'exact', head: true });
      
      if (query?.where) {
        for (const where of query.where) {
          supabaseQuery = this.applyWhereClause(supabaseQuery, where);
        }
      }

      const { count, error } = await supabaseQuery;

      if (error) {
        return {
          success: false,
          error: {
            code: 'SUPABASE_COUNT_ERROR',
            message: error.message,
            details: error
          },
          metadata: {
            timestamp: new Date().toISOString(),
            provider: 'supabase',
            execution_time: Date.now() - startTime,
            query_count: 1
          }
        };
      }

      return {
        success: true,
        data: count || 0,
        metadata: {
          timestamp: new Date().toISOString(),
          provider: 'supabase',
          execution_time: Date.now() - startTime,
          query_count: 1
        }
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'SUPABASE_UNEXPECTED_ERROR',
          message: error.message,
          stack: error.stack
        },
        metadata: {
          timestamp: new Date().toISOString(),
          provider: 'supabase',
          execution_time: Date.now() - startTime,
          query_count: 1
        }
      };
    }
  }

  private applyWhereClause(query: any, where: WhereClause): any {
    switch (where.operator) {
      case 'eq':
        return query.eq(where.field, where.value);
      case 'neq':
        return query.neq(where.field, where.value);
      case 'gt':
        return query.gt(where.field, where.value);
      case 'gte':
        return query.gte(where.field, where.value);
      case 'lt':
        return query.lt(where.field, where.value);
      case 'lte':
        return query.lte(where.field, where.value);
      case 'in':
        return query.in(where.field, where.value);
      case 'like':
        return query.like(where.field, where.value);
      default:
        return query;
    }
  }
}

// SQLite Provider Implementation
export class SQLiteProvider implements MCPProvider {
  private db: Database.Database | null = null;

  constructor(private config: { path: string; mode?: string }) {}

  async connect(): Promise<void> {
    try {
      this.db = new Database(this.config.path);
      if (this.config.mode === 'WAL') {
        this.db.pragma('journal_mode = WAL');
      }
    } catch (error) {
      throw new Error(`Failed to connect to SQLite: ${error.message}`);
    }
  }

  async disconnect(): Promise<void> {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      if (!this.db) return false;
      this.db.prepare('SELECT 1').get();
      return true;
    } catch {
      return false;
    }
  }

  async create<T>(table: string, data: T): Promise<MCPResponse<T>> {
    const startTime = Date.now();
    
    try {
      if (!this.db) throw new Error('Database not connected');

      const keys = Object.keys(data as any);
      const values = Object.values(data as any);
      const placeholders = keys.map(() => '?').join(', ');

      const sql = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${placeholders})`;
      const stmt = this.db.prepare(sql);
      const result = stmt.run(...values);

      return {
        success: true,
        data: { ...data, id: result.lastInsertRowid } as T,
        metadata: {
          timestamp: new Date().toISOString(),
          provider: 'sqlite',
          execution_time: Date.now() - startTime,
          query_count: 1
        }
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'SQLITE_CREATE_ERROR',
          message: error.message,
          stack: error.stack
        },
        metadata: {
          timestamp: new Date().toISOString(),
          provider: 'sqlite',
          execution_time: Date.now() - startTime,
          query_count: 1
        }
      };
    }
  }

  async read<T>(table: string, query: MCPQuery): Promise<MCPResponse<T[]>> {
    const startTime = Date.now();
    
    try {
      if (!this.db) throw new Error('Database not connected');

      let sql = `SELECT * FROM ${table}`;
      const params: any[] = [];

      // Build WHERE clause
      if (query.where && query.where.length > 0) {
        const whereClauses = query.where.map(where => {
          params.push(where.value);
          return `${where.field} ${this.mapOperator(where.operator)} ?`;
        });
        sql += ` WHERE ${whereClauses.join(' AND ')}`;
      }

      // Build ORDER BY clause
      if (query.orderBy && query.orderBy.length > 0) {
        const orderClauses = query.orderBy.map(order => 
          `${order.field} ${order.direction.toUpperCase()}`
        );
        sql += ` ORDER BY ${orderClauses.join(', ')}`;
      }

      // Add LIMIT and OFFSET
      if (query.limit) {
        sql += ` LIMIT ${query.limit}`;
      }
      if (query.offset) {
        sql += ` OFFSET ${query.offset}`;
      }

      const stmt = this.db.prepare(sql);
      const data = stmt.all(...params) as T[];

      return {
        success: true,
        data,
        metadata: {
          timestamp: new Date().toISOString(),
          provider: 'sqlite',
          execution_time: Date.now() - startTime,
          query_count: 1
        }
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'SQLITE_READ_ERROR',
          message: error.message,
          stack: error.stack
        },
        metadata: {
          timestamp: new Date().toISOString(),
          provider: 'sqlite',
          execution_time: Date.now() - startTime,
          query_count: 1
        }
      };
    }
  }

  async update<T>(table: string, id: string, data: Partial<T>): Promise<MCPResponse<T>> {
    const startTime = Date.now();
    
    try {
      if (!this.db) throw new Error('Database not connected');

      const keys = Object.keys(data as any);
      const values = Object.values(data as any);
      const setClauses = keys.map(key => `${key} = ?`).join(', ');

      const sql = `UPDATE ${table} SET ${setClauses} WHERE id = ?`;
      const stmt = this.db.prepare(sql);
      const result = stmt.run(...values, id);

      if (result.changes === 0) {
        return {
          success: false,
          error: {
            code: 'SQLITE_NOT_FOUND',
            message: `No record found with id: ${id}`
          },
          metadata: {
            timestamp: new Date().toISOString(),
            provider: 'sqlite',
            execution_time: Date.now() - startTime,
            query_count: 1
          }
        };
      }

      // Get updated record
      const getStmt = this.db.prepare(`SELECT * FROM ${table} WHERE id = ?`);
      const updatedRecord = getStmt.get(id) as T;

      return {
        success: true,
        data: updatedRecord,
        metadata: {
          timestamp: new Date().toISOString(),
          provider: 'sqlite',
          execution_time: Date.now() - startTime,
          query_count: 2
        }
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'SQLITE_UPDATE_ERROR',
          message: error.message,
          stack: error.stack
        },
        metadata: {
          timestamp: new Date().toISOString(),
          provider: 'sqlite',
          execution_time: Date.now() - startTime,
          query_count: 1
        }
      };
    }
  }

  async delete(table: string, id: string): Promise<MCPResponse<boolean>> {
    const startTime = Date.now();
    
    try {
      if (!this.db) throw new Error('Database not connected');

      const sql = `DELETE FROM ${table} WHERE id = ?`;
      const stmt = this.db.prepare(sql);
      const result = stmt.run(id);

      return {
        success: true,
        data: result.changes > 0,
        metadata: {
          timestamp: new Date().toISOString(),
          provider: 'sqlite',
          execution_time: Date.now() - startTime,
          query_count: 1
        }
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'SQLITE_DELETE_ERROR',
          message: error.message,
          stack: error.stack
        },
        metadata: {
          timestamp: new Date().toISOString(),
          provider: 'sqlite',
          execution_time: Date.now() - startTime,
          query_count: 1
        }
      };
    }
  }

  async query<T>(sql: string, params?: any[]): Promise<MCPResponse<T[]>> {
    const startTime = Date.now();
    
    try {
      if (!this.db) throw new Error('Database not connected');

      const stmt = this.db.prepare(sql);
      const data = stmt.all(...(params || [])) as T[];

      return {
        success: true,
        data,
        metadata: {
          timestamp: new Date().toISOString(),
          provider: 'sqlite',
          execution_time: Date.now() - startTime,
          query_count: 1
        }
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'SQLITE_QUERY_ERROR',
          message: error.message,
          stack: error.stack
        },
        metadata: {
          timestamp: new Date().toISOString(),
          provider: 'sqlite',
          execution_time: Date.now() - startTime,
          query_count: 1
        }
      };
    }
  }

  async count(table: string, query?: MCPQuery): Promise<MCPResponse<number>> {
    const startTime = Date.now();
    
    try {
      if (!this.db) throw new Error('Database not connected');

      let sql = `SELECT COUNT(*) as count FROM ${table}`;
      const params: any[] = [];

      if (query?.where && query.where.length > 0) {
        const whereClauses = query.where.map(where => {
          params.push(where.value);
          return `${where.field} ${this.mapOperator(where.operator)} ?`;
        });
        sql += ` WHERE ${whereClauses.join(' AND ')}`;
      }

      const stmt = this.db.prepare(sql);
      const result = stmt.get(...params) as { count: number };

      return {
        success: true,
        data: result.count,
        metadata: {
          timestamp: new Date().toISOString(),
          provider: 'sqlite',
          execution_time: Date.now() - startTime,
          query_count: 1
        }
      };
    } catch (error) {
      return {
        success: false,
        error: {
          code: 'SQLITE_COUNT_ERROR',
          message: error.message,
          stack: error.stack
        },
        metadata: {
          timestamp: new Date().toISOString(),
          provider: 'sqlite',
          execution_time: Date.now() - startTime,
          query_count: 1
        }
      };
    }
  }

  private mapOperator(operator: string): string {
    switch (operator) {
      case 'eq': return '=';
      case 'neq': return '!=';
      case 'gt': return '>';
      case 'gte': return '>=';
      case 'lt': return '<';
      case 'lte': return '<=';
      case 'like': return 'LIKE';
      case 'in': return 'IN';
      default: return '=';
    }
  }
}

// MCP Adapter - Main orchestrator
export class MCPAdapter {
  private primary: MCPProvider;
  private fallback?: MCPProvider;
  private logger?: any;

  constructor(config: {
    primary: MCPProvider;
    fallback?: MCPProvider;
    logger?: any;
  }) {
    this.primary = config.primary;
    this.fallback = config.fallback;
    this.logger = config.logger;
  }

  async initialize(): Promise<void> {
    try {
      await this.primary.connect();
      if (this.fallback) {
        await this.fallback.connect();
      }
    } catch (error) {
      this.logger?.error('Failed to initialize MCP Adapter', error);
      throw error;
    }
  }

  async create<T>(table: string, data: T): Promise<MCPResponse<T>> {
    try {
      const result = await this.primary.create(table, data);
      
      if (!result.success && this.fallback) {
        this.logger?.warn('Primary provider failed, trying fallback', result.error);
        return await this.fallback.create(table, data);
      }
      
      return result;
    } catch (error) {
      this.logger?.error('MCP create operation failed', error);
      throw error;
    }
  }

  async read<T>(table: string, query: MCPQuery): Promise<MCPResponse<T[]>> {
    try {
      const result = await this.primary.read<T>(table, query);
      
      if (!result.success && this.fallback) {
        this.logger?.warn('Primary provider failed, trying fallback', result.error);
        return await this.fallback.read<T>(table, query);
      }
      
      return result;
    } catch (error) {
      this.logger?.error('MCP read operation failed', error);
      throw error;
    }
  }

  async update<T>(table: string, id: string, data: Partial<T>): Promise<MCPResponse<T>> {
    try {
      const result = await this.primary.update(table, id, data);
      
      if (!result.success && this.fallback) {
        this.logger?.warn('Primary provider failed, trying fallback', result.error);
        return await this.fallback.update(table, id, data);
      }
      
      return result;
    } catch (error) {
      this.logger?.error('MCP update operation failed', error);
      throw error;
    }
  }

  async delete(table: string, id: string): Promise<MCPResponse<boolean>> {
    try {
      const result = await this.primary.delete(table, id);
      
      if (!result.success && this.fallback) {
        this.logger?.warn('Primary provider failed, trying fallback', result.error);
        return await this.fallback.delete(table, id);
      }
      
      return result;
    } catch (error) {
      this.logger?.error('MCP delete operation failed', error);
      throw error;
    }
  }

  async healthCheck(): Promise<boolean> {
    try {
      const primaryHealth = await this.primary.healthCheck();
      
      if (!primaryHealth && this.fallback) {
        return await this.fallback.healthCheck();
      }
      
      return primaryHealth;
    } catch (error) {
      this.logger?.error('MCP health check failed', error);
      return false;
    }
  }
}

export default MCPAdapter;