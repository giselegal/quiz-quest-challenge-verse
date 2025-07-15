import { pgTable, text, serial, integer, boolean, timestamp, uuid, jsonb } from "drizzle-orm/pg-core";
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

export const funnels = pgTable("funnels", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  userId: integer("user_id").references(() => users.id),
  isPublished: boolean("is_published").default(false),
  version: integer("version").default(1),
  settings: jsonb("settings"), // themes, A/B testing config, etc.
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const funnelPages = pgTable("funnel_pages", {
  id: uuid("id").defaultRandom().primaryKey(),
  funnelId: uuid("funnel_id").notNull().references(() => funnels.id, { onDelete: "cascade" }),
  pageType: text("page_type").notNull(), // 'intro', 'question', 'main-transition', etc.
  pageOrder: integer("page_order").notNull(),
  title: text("title"),
  blocks: jsonb("blocks").notNull(), // array of block configurations
  metadata: jsonb("metadata"), // page-specific settings
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const funnelVersions = pgTable("funnel_versions", {
  id: uuid("id").defaultRandom().primaryKey(),
  funnelId: uuid("funnel_id").notNull().references(() => funnels.id, { onDelete: "cascade" }),
  version: integer("version").notNull(),
  funnelData: jsonb("funnel_data").notNull(), // complete funnel snapshot
  createdAt: timestamp("created_at").defaultNow(),
  createdBy: integer("created_by").references(() => users.id),
});

// Tracking de eventos e conversões
export const conversionEvents = pgTable("conversion_events", {
  id: uuid("id").defaultRandom().primaryKey(),
  eventType: text("event_type").notNull(), // 'lead', 'purchase', 'page_view', 'quiz_complete'
  eventSource: text("event_source").notNull(), // 'quiz', 'hotmart', 'manual'
  participantId: uuid("participant_id"),
  userEmail: text("user_email"),
  userName: text("user_name"),
  eventValue: integer("event_value"), // valor em centavos
  currency: text("currency").default("BRL"),
  transactionId: text("transaction_id"),
  productName: text("product_name"),
  utmSource: text("utm_source"),
  utmMedium: text("utm_medium"),
  utmCampaign: text("utm_campaign"),
  utmContent: text("utm_content"),
  utmTerm: text("utm_term"),
  fbclid: text("fbclid"),
  facebookEventId: text("facebook_event_id"), // Para tracking CAPI
  metadata: jsonb("metadata"), // dados extras específicos do evento
  createdAt: timestamp("created_at").defaultNow(),
});

// Resultados detalhados do quiz
export const quizResults = pgTable("quiz_results", {
  id: uuid("id").defaultRandom().primaryKey(),
  participantId: uuid("participant_id").references(() => quizParticipants.id),
  quizType: text("quiz_type").default("style-discovery"),
  primaryStyle: text("primary_style"), // categoria do estilo dominante
  stylePercentage: integer("style_percentage"), // pontuação do estilo
  allStyles: jsonb("all_styles"), // todos os estilos e pontuações
  answers: jsonb("answers"), // respostas do quiz
  utmData: jsonb("utm_data"), // dados UTM no momento do quiz
  browserData: jsonb("browser_data"), // IP, user agent, etc.
  createdAt: timestamp("created_at").defaultNow(),
});

// Compras do Hotmart
export const hotmartPurchases = pgTable("hotmart_purchases", {
  id: uuid("id").defaultRandom().primaryKey(),
  transactionId: text("transaction_id").notNull().unique(),
  status: text("status").notNull(), // 'complete', 'approved', 'cancelled', 'refunded'
  buyerEmail: text("buyer_email").notNull(),
  buyerName: text("buyer_name").notNull(),
  productId: text("product_id").notNull(),
  productName: text("product_name").notNull(),
  price: integer("price").notNull(), // em centavos
  currency: text("currency").default("BRL"),
  commissionValue: integer("commission_value"),
  affiliateEmail: text("affiliate_email"),
  webhookEventId: text("webhook_event_id"),
  rawWebhookData: jsonb("raw_webhook_data"),
  facebookEventSent: boolean("facebook_event_sent").default(false),
  conversionEventId: uuid("conversion_event_id").references(() => conversionEvents.id),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
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

export const insertFunnelSchema = createInsertSchema(funnels).pick({
  name: true,
  description: true,
  userId: true,
  settings: true,
});

export const insertFunnelPageSchema = createInsertSchema(funnelPages).pick({
  funnelId: true,
  pageType: true,
  pageOrder: true,
  title: true,
  blocks: true,
  metadata: true,
});

export const insertFunnelVersionSchema = createInsertSchema(funnelVersions).pick({
  funnelId: true,
  version: true,
  funnelData: true,
  createdBy: true,
});

export const insertConversionEventSchema = createInsertSchema(conversionEvents).pick({
  eventType: true,
  eventSource: true,
  participantId: true,
  userEmail: true,
  userName: true,
  eventValue: true,
  currency: true,
  transactionId: true,
  productName: true,
  utmSource: true,
  utmMedium: true,
  utmCampaign: true,
  utmContent: true,
  utmTerm: true,
  fbclid: true,
  facebookEventId: true,
  metadata: true,
});

export const insertQuizResultSchema = createInsertSchema(quizResults).pick({
  participantId: true,
  quizType: true,
  primaryStyle: true,
  stylePercentage: true,
  allStyles: true,
  answers: true,
  utmData: true,
  browserData: true,
});

export const insertHotmartPurchaseSchema = createInsertSchema(hotmartPurchases).pick({
  transactionId: true,
  status: true,
  buyerEmail: true,
  buyerName: true,
  productId: true,
  productName: true,
  price: true,
  currency: true,
  commissionValue: true,
  affiliateEmail: true,
  webhookEventId: true,
  rawWebhookData: true,
  facebookEventSent: true,
  conversionEventId: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertUtmAnalytics = z.infer<typeof insertUtmAnalyticsSchema>;
export type UtmAnalytics = typeof utmAnalytics.$inferSelect;
export type InsertQuizParticipant = z.infer<typeof insertQuizParticipantSchema>;
export type QuizParticipant = typeof quizParticipants.$inferSelect;

export type InsertFunnel = z.infer<typeof insertFunnelSchema>;
export type Funnel = typeof funnels.$inferSelect;
export type InsertFunnelPage = z.infer<typeof insertFunnelPageSchema>;
export type FunnelPage = typeof funnelPages.$inferSelect;
export type InsertFunnelVersion = z.infer<typeof insertFunnelVersionSchema>;
export type FunnelVersion = typeof funnelVersions.$inferSelect;
export type InsertConversionEvent = z.infer<typeof insertConversionEventSchema>;
export type ConversionEvent = typeof conversionEvents.$inferSelect;
export type InsertQuizResult = z.infer<typeof insertQuizResultSchema>;
export type QuizResult = typeof quizResults.$inferSelect;
export type InsertHotmartPurchase = z.infer<typeof insertHotmartPurchaseSchema>;
export type HotmartPurchase = typeof hotmartPurchases.$inferSelect;
