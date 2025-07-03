import { 
  users, 
  utmAnalytics, 
  quizParticipants,
  type User, 
  type InsertUser,
  type UtmAnalytics,
  type InsertUtmAnalytics,
  type QuizParticipant,
  type InsertQuizParticipant
} from "@shared/schema";
import { eq } from "drizzle-orm";
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
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private utmAnalytics: Map<string, UtmAnalytics>;
  private quizParticipants: Map<string, QuizParticipant>;
  currentId: number;

  constructor() {
    this.users = new Map();
    this.utmAnalytics = new Map();
    this.quizParticipants = new Map();
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
}

// Use database storage in production, memory storage for development
export const storage = process.env.NODE_ENV === 'production' ? new DatabaseStorage() : new MemStorage();
