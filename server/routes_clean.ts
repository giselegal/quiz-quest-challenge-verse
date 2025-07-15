import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage_clean";
import { 
  insertUtmAnalyticsSchema, 
  insertFunnelSchema,
  insertFunnelPageSchema,
  insertFunnelVersionSchema
} from "../shared/schema_clean";

export async function registerRoutes(app: Express): Promise<Server> {
  // UTM Analytics API Routes (básico para tracking)
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

  // Funnel API Routes (ESSENCIAL PARA EDITOR)
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

  // Funnel Pages API Routes (ESSENCIAL PARA EDITOR)
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

  // Funnel Versions API Routes (ESSENCIAL PARA EDITOR)
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

  // Page Configs API Routes (ESSENCIAL PARA EDITOR SCHEMA-DRIVEN)
  app.get("/api/page-configs/:pageId", async (req, res) => {
    try {
      const { pageId } = req.params;
      
      // Mock das configurações de página para o editor schema-driven
      if (pageId === 'funnel-quiz') {
        const pageConfig = {
          pageId: 'funnel-quiz',
          title: 'Quiz Descubra Seu Estilo - 21 Etapas',
          description: 'Funil completo com 21 etapas reais migradas',
          layout: 'single-column',
          backgroundColor: '#ffffff',
          blocks: [
            // Etapa 1: Quiz Introdução
            {
              id: 'etapa-1-intro',
              type: 'quiz-intro-etapa-1',
              order: 1,
              settings: {
                title: 'Chega de um guarda-roupa lotado e da sensação de que nada combina com você.',
                subtitle: 'Em poucos minutos, descubra seu Estilo Predominante — e aprenda a montar looks que realmente refletem sua essência, com praticidade e confiança.',
                logoUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp',
                imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1746838118/20250509_2137_Desordem_e_Reflex%C3%A3o_simple_compose_01jtvszf8sfaytz493z9f16rf2_z1c2up.webp'
              }
            },
            // Etapas 2-11: Questões principais
            {
              id: 'etapa-2-questao-1',
              type: 'quiz-questao-principal',
              order: 2,
              settings: {
                question: 'Qual o seu tipo de roupa favorita?',
                progressLabel: 'Questão 1 de 10',
                progressValue: 10,
                options: [
                  {
                    id: 'q1-a',
                    text: 'Peças básicas e clássicas',
                    imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/1_rnqyul.webp',
                    value: 'classico'
                  },
                  {
                    id: 'q1-b',
                    text: 'Roupas confortáveis e casuais',
                    imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/2_pu2naf.webp',
                    value: 'casual'
                  },
                  {
                    id: 'q1-c',
                    text: 'Looks elegantes e sofisticados',
                    imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/3_ywg9mn.webp',
                    value: 'elegante'
                  }
                ]
              }
            },
            // Etapa 12: Transição Principal
            {
              id: 'etapa-12-transicao',
              type: 'quiz-transicao-principal',
              order: 12,
              settings: {
                title: 'Ótimo! Agora vamos conhecer você melhor',
                message: 'As próximas perguntas vão nos ajudar a personalizar ainda mais seu resultado.',
                progressValue: 60
              }
            },
            // Etapas 13-18: Questões estratégicas
            {
              id: 'etapa-13-estrategica-1',
              type: 'quiz-questao-estrategica',
              order: 13,
              settings: {
                question: 'Qual é sua faixa etária?',
                progressLabel: 'Questão estratégica 1 de 6',
                progressValue: 65,
                options: [
                  { id: 'age-1', text: '18-25 anos', value: '18-25' },
                  { id: 'age-2', text: '26-35 anos', value: '26-35' },
                  { id: 'age-3', text: '36-45 anos', value: '36-45' },
                  { id: 'age-4', text: '46+ anos', value: '46+' }
                ]
              }
            },
            // Etapa 19: Transição Final
            {
              id: 'etapa-19-transicao-final',
              type: 'quiz-transicao-final',
              order: 19,
              settings: {
                title: 'Preparando seu resultado personalizado...',
                message: 'Estamos analisando suas respostas e criando um guia exclusivo para você.',
                progressValue: 95
              }
            },
            // Etapa 20: Resultado Completo
            {
              id: 'etapa-20-resultado',
              type: 'quiz-resultado-completo',
              order: 20,
              settings: {
                userName: 'Seu Nome',
                styleName: 'Estilo Elegante',
                styleImage: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/14_l2nprc.webp',
                compatibility: 92
              }
            },
            // Etapa 21: Oferta Especial
            {
              id: 'etapa-21-oferta',
              type: 'quiz-oferta-especial',
              order: 21,
              settings: {
                title: 'Descubra Seu Estilo Predominante',
                subtitle: 'Tenha finalmente um guarda-roupa que funciona 100%',
                imageUrl: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1746838118/20250509_2137_Desordem_e_Reflex%C3%A3o_simple_compose_01jtvszf8sfaytz493z9f16rf2_z1c2up.webp',
                pricing: {
                  installments: 'R$ 8,83',
                  fullPrice: 'R$ 39,90',
                  savings: '77% OFF - Economia de R$ 135,10'
                }
              }
            }
          ]
        };
        
        res.json({ success: true, data: pageConfig });
      } else {
        res.status(404).json({ success: false, error: "Page config not found" });
      }
    } catch (error) {
      console.error("Error fetching page config:", error);
      res.status(500).json({ success: false, error: "Failed to fetch page config" });
    }
  });

  app.put("/api/page-configs/:pageId", async (req, res) => {
    try {
      // Mock de atualização para desenvolvimento
      res.json({ success: true, message: "Page config updated successfully" });
    } catch (error) {
      console.error("Error updating page config:", error);
      res.status(500).json({ success: false, error: "Failed to update page config" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
