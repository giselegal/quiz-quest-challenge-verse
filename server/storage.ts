import { 
  users, 
  utmAnalytics, 
  quizParticipants,
  funnels,
  funnelPages,
  funnelVersions,
  conversionEvents,
  quizResults,
  hotmartPurchases,
  type User, 
  type InsertUser,
  type UtmAnalytics,
  type InsertUtmAnalytics,
  type QuizParticipant,
  type InsertQuizParticipant,
  type Funnel,
  type InsertFunnel,
  type FunnelPage,
  type InsertFunnelPage,
  type FunnelVersion,
  type InsertFunnelVersion,
  type ConversionEvent,
  type InsertConversionEvent,
  type QuizResult,
  type InsertQuizResult,
  type HotmartPurchase,
  type InsertHotmartPurchase
} from "@shared/schema_sqlite";
import { eq, desc } from "drizzle-orm";
import { db } from "./db";
import crypto from "crypto";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createUtmAnalytics(utmData: InsertUtmAnalytics): Promise<UtmAnalytics>;
  createQuizParticipant(participant: InsertQuizParticipant): Promise<QuizParticipant>;
  getQuizParticipants(): Promise<QuizParticipant[]>;
  getUtmAnalytics(): Promise<UtmAnalytics[]>;
  
  // Funnel operations
  createFunnel(funnel: InsertFunnel): Promise<Funnel>;
  getFunnelsByUserId(userId: number): Promise<Funnel[]>;
  getFunnelById(id: string): Promise<Funnel | undefined>;
  updateFunnel(id: string, updates: Partial<InsertFunnel>): Promise<Funnel | undefined>;
  deleteFunnel(id: string): Promise<boolean>;
  
  // Funnel pages operations
  createFunnelPage(page: InsertFunnelPage): Promise<FunnelPage>;
  getFunnelPages(funnelId: string): Promise<FunnelPage[]>;
  updateFunnelPage(id: string, updates: Partial<InsertFunnelPage>): Promise<FunnelPage | undefined>;
  deleteFunnelPage(id: string): Promise<boolean>;
  
  // Funnel versions operations
  createFunnelVersion(version: InsertFunnelVersion): Promise<FunnelVersion>;
  getFunnelVersions(funnelId: string): Promise<FunnelVersion[]>;
  
  // Conversion Events operations
  createConversionEvent(event: InsertConversionEvent): Promise<ConversionEvent>;
  getConversionEvents(): Promise<ConversionEvent[]>;
  getConversionEventsByEmail(email: string): Promise<ConversionEvent[]>;
  
  // Quiz Results operations
  createQuizResult(result: InsertQuizResult): Promise<QuizResult>;
  getQuizResultsByParticipant(participantId: string): Promise<QuizResult[]>;
  getQuizResults(): Promise<QuizResult[]>;
  
  // Hotmart Purchases operations
  createHotmartPurchase(purchase: InsertHotmartPurchase): Promise<HotmartPurchase>;
  getHotmartPurchaseByTransaction(transactionId: string): Promise<HotmartPurchase | undefined>;
  updateHotmartPurchase(transactionId: string, updates: Partial<InsertHotmartPurchase>): Promise<HotmartPurchase | undefined>;
  getHotmartPurchases(): Promise<HotmartPurchase[]>;
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

  async createQuizParticipant(participant: InsertQuizParticipant): Promise<QuizParticipant> {
    const result = await db.insert(quizParticipants).values(participant).returning();
    return result[0];
  }

  async getQuizParticipants(): Promise<QuizParticipant[]> {
    return await db.select().from(quizParticipants).orderBy(desc(quizParticipants.createdAt));
  }

  async getUtmAnalytics(): Promise<UtmAnalytics[]> {
    return await db.select().from(utmAnalytics).orderBy(desc(utmAnalytics.createdAt));
  }

  // Funnel operations
  async createFunnel(funnel: InsertFunnel): Promise<Funnel> {
    const id = `funnel_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const now = new Date().toISOString();
    const funnelWithId = {
      ...funnel,
      id,
      createdAt: now,
      updatedAt: now
    };
    const result = await db.insert(funnels).values(funnelWithId).returning();
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
      .set({ ...updates, updatedAt: new Date().toISOString() })
      .where(eq(funnels.id, id))
      .returning();
    return result[0];
  }

  async deleteFunnel(id: string): Promise<boolean> {
    const result = await db.delete(funnels).where(eq(funnels.id, id)).returning();
    return result.length > 0;
  }

  // Funnel pages operations
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

  // Funnel versions operations
  async createFunnelVersion(version: InsertFunnelVersion): Promise<FunnelVersion> {
    const result = await db.insert(funnelVersions).values(version).returning();
    return result[0];
  }

  async getFunnelVersions(funnelId: string): Promise<FunnelVersion[]> {
    return await db.select().from(funnelVersions)
      .where(eq(funnelVersions.funnelId, funnelId))
      .orderBy(desc(funnelVersions.version));
  }

  // Conversion Events operations
  async createConversionEvent(event: InsertConversionEvent): Promise<ConversionEvent> {
    const result = await db.insert(conversionEvents).values(event).returning();
    return result[0];
  }

  async getConversionEvents(): Promise<ConversionEvent[]> {
    return await db.select().from(conversionEvents)
      .orderBy(desc(conversionEvents.createdAt));
  }

  async getConversionEventsByEmail(email: string): Promise<ConversionEvent[]> {
    return await db.select().from(conversionEvents)
      .where(eq(conversionEvents.userEmail, email))
      .orderBy(desc(conversionEvents.createdAt));
  }

  // Quiz Results operations
  async createQuizResult(result: InsertQuizResult): Promise<QuizResult> {
    const insertResult = await db.insert(quizResults).values(result).returning();
    return insertResult[0];
  }

  async getQuizResultsByParticipant(participantId: string): Promise<QuizResult[]> {
    return await db.select().from(quizResults)
      .where(eq(quizResults.participantId, participantId))
      .orderBy(desc(quizResults.createdAt));
  }

  async getQuizResults(): Promise<QuizResult[]> {
    return await db.select().from(quizResults)
      .orderBy(desc(quizResults.createdAt));
  }

  // Hotmart Purchases operations
  async createHotmartPurchase(purchase: InsertHotmartPurchase): Promise<HotmartPurchase> {
    const result = await db.insert(hotmartPurchases).values(purchase).returning();
    return result[0];
  }

  async getHotmartPurchaseByTransaction(transactionId: string): Promise<HotmartPurchase | undefined> {
    const result = await db.select().from(hotmartPurchases)
      .where(eq(hotmartPurchases.transactionId, transactionId));
    return result[0];
  }

  async updateHotmartPurchase(transactionId: string, updates: Partial<InsertHotmartPurchase>): Promise<HotmartPurchase | undefined> {
    const result = await db.update(hotmartPurchases)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(hotmartPurchases.transactionId, transactionId))
      .returning();
    return result[0];
  }

  async getHotmartPurchases(): Promise<HotmartPurchase[]> {
    return await db.select().from(hotmartPurchases)
      .orderBy(desc(hotmartPurchases.createdAt));
  }
}

// Use database storage 
export const storage = new DatabaseStorage();
