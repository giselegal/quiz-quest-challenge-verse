import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUtmAnalyticsSchema, insertQuizParticipantSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // UTM Analytics API Routes
  app.post("/api/utm-analytics", async (req, res) => {
    try {
      const validatedData = insertUtmAnalyticsSchema.parse(req.body);
      const utmAnalytics = await storage.createUtmAnalytics(validatedData);
      res.json({ success: true, data: utmAnalytics });
    } catch (error) {
      console.error("Error saving UTM analytics:", error);
      res.status(400).json({ success: false, error: "Invalid UTM data" });
    }
  });

  app.get("/api/utm-analytics", async (req, res) => {
    try {
      const analytics = await storage.getUtmAnalytics();
      res.json({ success: true, data: analytics });
    } catch (error) {
      console.error("Error fetching UTM analytics:", error);
      res.status(500).json({ success: false, error: "Failed to fetch analytics" });
    }
  });

  // Quiz Participants API Routes
  app.post("/api/quiz-participants", async (req, res) => {
    try {
      const validatedData = insertQuizParticipantSchema.parse(req.body);
      const participant = await storage.createQuizParticipant(validatedData);
      res.json({ success: true, data: participant });
    } catch (error) {
      console.error("Error creating quiz participant:", error);
      res.status(400).json({ success: false, error: "Invalid participant data" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
