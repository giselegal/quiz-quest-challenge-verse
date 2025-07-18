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
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";
import { db } from "./db";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createUtmAnalytics(utmData: InsertUtmAnalytics): Promise<UtmAnalytics>;
  createQuizParticipant(participant: InsertQuizParticipant): Promise<QuizParticipant>;
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

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private utmAnalytics: Map<string, UtmAnalytics>;
  private quizParticipants: Map<string, QuizParticipant>;
  private funnels: Map<string, Funnel>;
  private funnelPages: Map<string, FunnelPage>;
  private funnelVersions: Map<string, FunnelVersion>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.utmAnalytics = new Map();
    this.quizParticipants = new Map();
    this.funnels = new Map();
    this.funnelPages = new Map();
    this.funnelVersions = new Map();
    this.currentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createUtmAnalytics(utmData: InsertUtmAnalytics): Promise<UtmAnalytics> {
    const id = crypto.randomUUID();
    const analytics: UtmAnalytics = {
      id,
      utmSource: utmData.utmSource || null,
      utmMedium: utmData.utmMedium || null,
      utmCampaign: utmData.utmCampaign || null,
      utmContent: utmData.utmContent || null,
      utmTerm: utmData.utmTerm || null,
      participantId: utmData.participantId || null,
      createdAt: new Date(),
    };
    this.utmAnalytics.set(id, analytics);
    return analytics;
  }

  async createQuizParticipant(participant: InsertQuizParticipant): Promise<QuizParticipant> {
    const id = crypto.randomUUID();
    const newParticipant: QuizParticipant = {
      id,
      name: participant.name || null,
      email: participant.email || null,
      quizId: participant.quizId || null,
      utmSource: participant.utmSource || null,
      utmMedium: participant.utmMedium || null,
      utmCampaign: participant.utmCampaign || null,
      createdAt: new Date(),
    };
    this.quizParticipants.set(id, newParticipant);
    return newParticipant;
  }

  async getUtmAnalytics(): Promise<UtmAnalytics[]> {
    return Array.from(this.utmAnalytics.values());
  }

  // Funnel operations
  async createFunnel(funnel: InsertFunnel): Promise<Funnel> {
    const id = crypto.randomUUID();
    const newFunnel: Funnel = {
      id,
      name: funnel.name,
      description: funnel.description || null,
      userId: funnel.userId || null,
      isPublished: false,
      version: 1,
      settings: funnel.settings || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.funnels.set(id, newFunnel);
    return newFunnel;
  }

  async getFunnelsByUserId(userId: number): Promise<Funnel[]> {
    return Array.from(this.funnels.values()).filter(
      (funnel) => funnel.userId === userId,
    );
  }

  async getFunnelById(id: string): Promise<Funnel | undefined> {
    return this.funnels.get(id);
  }

  async updateFunnel(id: string, updates: Partial<InsertFunnel>): Promise<Funnel | undefined> {
    const funnel = this.funnels.get(id);
    if (!funnel) return undefined;
    
    const updatedFunnel: Funnel = {
      ...funnel,
      ...updates,
      updatedAt: new Date(),
    };
    this.funnels.set(id, updatedFunnel);
    return updatedFunnel;
  }

  async deleteFunnel(id: string): Promise<boolean> {
    return this.funnels.delete(id);
  }

  // Funnel pages operations
  async createFunnelPage(page: InsertFunnelPage): Promise<FunnelPage> {
    const id = crypto.randomUUID();
    const newPage: FunnelPage = {
      id,
      funnelId: page.funnelId,
      pageType: page.pageType,
      pageOrder: page.pageOrder,
      title: page.title || null,
      blocks: page.blocks,
      metadata: page.metadata || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.funnelPages.set(id, newPage);
    return newPage;
  }

  async getFunnelPages(funnelId: string): Promise<FunnelPage[]> {
    return Array.from(this.funnelPages.values())
      .filter((page) => page.funnelId === funnelId)
      .sort((a, b) => a.pageOrder - b.pageOrder);
  }

  async updateFunnelPage(id: string, updates: Partial<InsertFunnelPage>): Promise<FunnelPage | undefined> {
    const page = this.funnelPages.get(id);
    if (!page) return undefined;
    
    const updatedPage: FunnelPage = {
      ...page,
      ...updates,
      updatedAt: new Date(),
    };
    this.funnelPages.set(id, updatedPage);
    return updatedPage;
  }

  async deleteFunnelPage(id: string): Promise<boolean> {
    return this.funnelPages.delete(id);
  }

  // Funnel versions operations
  async createFunnelVersion(version: InsertFunnelVersion): Promise<FunnelVersion> {
    const id = crypto.randomUUID();
    const newVersion: FunnelVersion = {
      id,
      funnelId: version.funnelId,
      version: version.version,
      funnelData: version.funnelData,
      createdAt: new Date(),
      createdBy: version.createdBy || null,
    };
    this.funnelVersions.set(id, newVersion);
    return newVersion;
  }

  async getFunnelVersions(funnelId: string): Promise<FunnelVersion[]> {
    return Array.from(this.funnelVersions.values()).filter(
      (version) => version.funnelId === funnelId,
    );
  }

  // Conversion Events operations - Mock implementations for MemStorage
  async createConversionEvent(event: InsertConversionEvent): Promise<ConversionEvent> {
    const id = crypto.randomUUID();
    const newEvent: ConversionEvent = {
      id,
      eventType: event.eventType,
      eventSource: event.eventSource,
      participantId: event.participantId || null,
      userEmail: event.userEmail || null,
      userName: event.userName || null,
      eventValue: event.eventValue || null,
      currency: event.currency || "BRL",
      transactionId: event.transactionId || null,
      productName: event.productName || null,
      utmSource: event.utmSource || null,
      utmMedium: event.utmMedium || null,
      utmCampaign: event.utmCampaign || null,
      utmContent: event.utmContent || null,
      utmTerm: event.utmTerm || null,
      fbclid: event.fbclid || null,
      facebookEventId: event.facebookEventId || null,
      metadata: event.metadata || null,
      createdAt: new Date(),
    };
    return newEvent;
  }

  async getConversionEvents(): Promise<ConversionEvent[]> {
    return [];
  }

  async getConversionEventsByEmail(email: string): Promise<ConversionEvent[]> {
    return [];
  }

  // Quiz Results operations - Mock implementations
  async createQuizResult(result: InsertQuizResult): Promise<QuizResult> {
    const id = crypto.randomUUID();
    const newResult: QuizResult = {
      id,
      participantId: result.participantId || null,
      quizType: result.quizType || "style-discovery",
      primaryStyle: result.primaryStyle || null,
      stylePercentage: result.stylePercentage || null,
      allStyles: result.allStyles || null,
      answers: result.answers || null,
      utmData: result.utmData || null,
      browserData: result.browserData || null,
      createdAt: new Date(),
    };
    return newResult;
  }

  async getQuizResultsByParticipant(participantId: string): Promise<QuizResult[]> {
    return [];
  }

  async getQuizResults(): Promise<QuizResult[]> {
    return [];
  }

  // Hotmart Purchases operations - Mock implementations
  async createHotmartPurchase(purchase: InsertHotmartPurchase): Promise<HotmartPurchase> {
    const id = crypto.randomUUID();
    const newPurchase: HotmartPurchase = {
      id,
      transactionId: purchase.transactionId,
      status: purchase.status,
      buyerEmail: purchase.buyerEmail,
      buyerName: purchase.buyerName,
      productId: purchase.productId,
      productName: purchase.productName,
      price: purchase.price,
      currency: purchase.currency || "BRL",
      commissionValue: purchase.commissionValue || null,
      affiliateEmail: purchase.affiliateEmail || null,
      webhookEventId: purchase.webhookEventId || null,
      rawWebhookData: purchase.rawWebhookData || null,
      facebookEventSent: purchase.facebookEventSent || false,
      conversionEventId: purchase.conversionEventId || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return newPurchase;
  }

  async getHotmartPurchaseByTransaction(transactionId: string): Promise<HotmartPurchase | undefined> {
    return undefined;
  }

  async updateHotmartPurchase(transactionId: string, updates: Partial<InsertHotmartPurchase>): Promise<HotmartPurchase | undefined> {
    return undefined;
  }

  async getHotmartPurchases(): Promise<HotmartPurchase[]> {
    return [];
  }
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
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

  async getUtmAnalytics(): Promise<UtmAnalytics[]> {
    return await db.select().from(utmAnalytics);
  }

  // Funnel operations
  async createFunnel(funnel: InsertFunnel): Promise<Funnel> {
    const result = await db.insert(funnels).values(funnel).returning();
    return result[0];
  }

  async getFunnelsByUserId(userId: number): Promise<Funnel[]> {
    return await db.select().from(funnels).where(eq(funnels.userId, userId));
  }

  async getFunnelById(id: string): Promise<Funnel | undefined> {
    const result = await db.select().from(funnels).where(eq(funnels.id, id)).limit(1);
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

// Use database storage in production, memory storage for development
export const storage = process.env.NODE_ENV === 'production' ? new DatabaseStorage() : new MemStorage();
