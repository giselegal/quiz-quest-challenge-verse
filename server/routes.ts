import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUtmAnalyticsSchema, 
  insertQuizParticipantSchema,
  insertFunnelSchema,
  insertFunnelPageSchema,
  insertFunnelVersionSchema
} from "@shared/schema";

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

  // Funnel API Routes
  app.post("/api/funnels", async (req, res) => {
    try {
      const validatedData = insertFunnelSchema.parse(req.body);
      const funnel = await storage.createFunnel(validatedData);
      res.json({ success: true, data: funnel });
    } catch (error) {
      console.error("Error creating funnel:", error);
      res.status(400).json({ success: false, error: "Invalid funnel data" });
    }
  });

  app.get("/api/funnels/user/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const funnels = await storage.getFunnelsByUserId(userId);
      res.json({ success: true, data: funnels });
    } catch (error) {
      console.error("Error fetching user funnels:", error);
      res.status(500).json({ success: false, error: "Failed to fetch funnels" });
    }
  });

  app.get("/api/funnels/:id", async (req, res) => {
    try {
      const funnel = await storage.getFunnelById(req.params.id);
      if (!funnel) {
        return res.status(404).json({ success: false, error: "Funnel not found" });
      }
      res.json({ success: true, data: funnel });
    } catch (error) {
      console.error("Error fetching funnel:", error);
      res.status(500).json({ success: false, error: "Failed to fetch funnel" });
    }
  });

  app.put("/api/funnels/:id", async (req, res) => {
    try {
      const updates = insertFunnelSchema.partial().parse(req.body);
      const funnel = await storage.updateFunnel(req.params.id, updates);
      if (!funnel) {
        return res.status(404).json({ success: false, error: "Funnel not found" });
      }
      res.json({ success: true, data: funnel });
    } catch (error) {
      console.error("Error updating funnel:", error);
      res.status(400).json({ success: false, error: "Invalid update data" });
    }
  });

  app.delete("/api/funnels/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteFunnel(req.params.id);
      if (!deleted) {
        return res.status(404).json({ success: false, error: "Funnel not found" });
      }
      res.json({ success: true, message: "Funnel deleted successfully" });
    } catch (error) {
      console.error("Error deleting funnel:", error);
      res.status(500).json({ success: false, error: "Failed to delete funnel" });
    }
  });

  // Funnel Pages API Routes
  app.post("/api/funnel-pages", async (req, res) => {
    try {
      const validatedData = insertFunnelPageSchema.parse(req.body);
      const page = await storage.createFunnelPage(validatedData);
      res.json({ success: true, data: page });
    } catch (error) {
      console.error("Error creating funnel page:", error);
      res.status(400).json({ success: false, error: "Invalid page data" });
    }
  });

  app.get("/api/funnel-pages/funnel/:funnelId", async (req, res) => {
    try {
      const pages = await storage.getFunnelPages(req.params.funnelId);
      res.json({ success: true, data: pages });
    } catch (error) {
      console.error("Error fetching funnel pages:", error);
      res.status(500).json({ success: false, error: "Failed to fetch pages" });
    }
  });

  app.put("/api/funnel-pages/:id", async (req, res) => {
    try {
      const updates = insertFunnelPageSchema.partial().parse(req.body);
      const page = await storage.updateFunnelPage(req.params.id, updates);
      if (!page) {
        return res.status(404).json({ success: false, error: "Page not found" });
      }
      res.json({ success: true, data: page });
    } catch (error) {
      console.error("Error updating funnel page:", error);
      res.status(400).json({ success: false, error: "Invalid update data" });
    }
  });

  app.delete("/api/funnel-pages/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteFunnelPage(req.params.id);
      if (!deleted) {
        return res.status(404).json({ success: false, error: "Page not found" });
      }
      res.json({ success: true, message: "Page deleted successfully" });
    } catch (error) {
      console.error("Error deleting funnel page:", error);
      res.status(500).json({ success: false, error: "Failed to delete page" });
    }
  });

  // Funnel Versions API Routes
  app.post("/api/funnel-versions", async (req, res) => {
    try {
      const validatedData = insertFunnelVersionSchema.parse(req.body);
      const version = await storage.createFunnelVersion(validatedData);
      res.json({ success: true, data: version });
    } catch (error) {
      console.error("Error creating funnel version:", error);
      res.status(400).json({ success: false, error: "Invalid version data" });
    }
  });

  app.get("/api/funnel-versions/funnel/:funnelId", async (req, res) => {
    try {
      const versions = await storage.getFunnelVersions(req.params.funnelId);
      res.json({ success: true, data: versions });
    } catch (error) {
      console.error("Error fetching funnel versions:", error);
      res.status(500).json({ success: false, error: "Failed to fetch versions" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
