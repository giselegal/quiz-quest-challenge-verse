import { 
  users, 
  utmAnalytics, 
  funnels,
  funnelPages,
  funnelVersions,
  type User, 
  type InsertUser,
  type UtmAnalytics,
  type InsertUtmAnalytics,
  type Funnel,
  type InsertFunnel,
  type FunnelPage,
  type InsertFunnelPage,
  type FunnelVersion,
  type InsertFunnelVersion
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";
import { db } from "./db";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createUtmAnalytics(utmData: InsertUtmAnalytics): Promise<UtmAnalytics>;
  getUtmAnalytics(): Promise<UtmAnalytics[]>;
  
  // Funnel operations (ESSENCIAL PARA EDITOR)
  createFunnel(funnel: InsertFunnel): Promise<Funnel>;
  getFunnelsByUserId(userId: number): Promise<Funnel[]>;
  getFunnelById(id: string): Promise<Funnel | undefined>;
  updateFunnel(id: string, updates: Partial<InsertFunnel>): Promise<Funnel | undefined>;
  deleteFunnel(id: string): Promise<boolean>;
  
  // Funnel pages operations (ESSENCIAL PARA EDITOR)
  createFunnelPage(page: InsertFunnelPage): Promise<FunnelPage>;
  getFunnelPages(funnelId: string): Promise<FunnelPage[]>;
  updateFunnelPage(id: string, updates: Partial<InsertFunnelPage>): Promise<FunnelPage | undefined>;
  deleteFunnelPage(id: string): Promise<boolean>;
  
  // Funnel versions operations (ESSENCIAL PARA EDITOR)
  createFunnelVersion(version: InsertFunnelVersion): Promise<FunnelVersion>;
  getFunnelVersions(funnelId: string): Promise<FunnelVersion[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }

  async createUtmAnalytics(utmData: InsertUtmAnalytics): Promise<UtmAnalytics> {
    const result = await db.insert(utmAnalytics).values(utmData).returning();
    return result[0];
  }

  async getUtmAnalytics(): Promise<UtmAnalytics[]> {
    return await db.select().from(utmAnalytics).orderBy(desc(utmAnalytics.createdAt));
  }

  // Funnel operations (ESSENCIAL PARA EDITOR)
  async createFunnel(funnel: InsertFunnel): Promise<Funnel> {
    const result = await db.insert(funnels).values(funnel).returning();
    return result[0];
  }

  async getFunnelsByUserId(userId: number): Promise<Funnel[]> {
    return await db.select().from(funnels).where(eq(funnels.userId, userId));
  }

  async getFunnelById(id: string): Promise<Funnel | undefined> {
    const result = await db.select().from(funnels).where(eq(funnels.id, id));
    return result[0];
  }

  async updateFunnel(id: string, updates: Partial<InsertFunnel>): Promise<Funnel | undefined> {
    const result = await db.update(funnels)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(funnels.id, id))
      .returning();
    return result[0];
  }

  async deleteFunnel(id: string): Promise<boolean> {
    const result = await db.delete(funnels).where(eq(funnels.id, id)).returning();
    return result.length > 0;
  }

  // Funnel pages operations (ESSENCIAL PARA EDITOR)
  async createFunnelPage(page: InsertFunnelPage): Promise<FunnelPage> {
    const result = await db.insert(funnelPages).values(page).returning();
    return result[0];
  }

  async getFunnelPages(funnelId: string): Promise<FunnelPage[]> {
    return await db.select().from(funnelPages)
      .where(eq(funnelPages.funnelId, funnelId))
      .orderBy(funnelPages.pageOrder);
  }

  async updateFunnelPage(id: string, updates: Partial<InsertFunnelPage>): Promise<FunnelPage | undefined> {
    const result = await db.update(funnelPages)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(funnelPages.id, id))
      .returning();
    return result[0];
  }

  async deleteFunnelPage(id: string): Promise<boolean> {
    const result = await db.delete(funnelPages).where(eq(funnelPages.id, id)).returning();
    return result.length > 0;
  }

  // Funnel versions operations (ESSENCIAL PARA EDITOR)
  async createFunnelVersion(version: InsertFunnelVersion): Promise<FunnelVersion> {
    const result = await db.insert(funnelVersions).values(version).returning();
    return result[0];
  }

  async getFunnelVersions(funnelId: string): Promise<FunnelVersion[]> {
    return await db.select().from(funnelVersions)
      .where(eq(funnelVersions.funnelId, funnelId))
      .orderBy(desc(funnelVersions.version));
  }
}

// Use database storage 
export const storage = new DatabaseStorage();
