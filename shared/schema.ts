import { pgTable, text, serial, integer, boolean, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const utmAnalytics = pgTable("utm_analytics", {
  id: uuid("id").defaultRandom().primaryKey(),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  utmContent: text("utm_content"),
  utmTerm: text("utm_term"),
  participantId: uuid("participant_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const quizParticipants = pgTable("quiz_participants", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name"),
  email: text("email"),
  quizId: uuid("quiz_id"),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertUtmAnalyticsSchema = createInsertSchema(utmAnalytics).pick({
  utmSource: true,
  utmMedium: true,
  utmCampaign: true,
  utmContent: true,
  utmTerm: true,
  participantId: true,
});

export const insertQuizParticipantSchema = createInsertSchema(quizParticipants).pick({
  name: true,
  email: true,
  quizId: true,
  utmSource: true,
  utmMedium: true,
  utmCampaign: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertUtmAnalytics = z.infer<typeof insertUtmAnalyticsSchema>;
export type UtmAnalytics = typeof utmAnalytics.$inferSelect;
export type InsertQuizParticipant = z.infer<typeof insertQuizParticipantSchema>;
export type QuizParticipant = typeof quizParticipants.$inferSelect;
