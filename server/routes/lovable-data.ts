// routes/lovable-data.ts - Endpoints de dados para Lovable.dev
import { Router } from "express";
import { db } from "../db";
import { funnels, quizParticipants, utmAnalytics } from "@shared/schema";
import { eq, desc } from "drizzle-orm";

const router = Router();

// GET /api/lovable/data - Todos os dados necessários para o Lovable
router.get("/data", async (req, res) => {
  try {
    // Dados do usuário atual (mockado para desenvolvimento)
    const user = {
      id: "dev-user-1",
      name: "Usuário Desenvolvimento",
      email: "dev@quiz-quest.com"
    };

    // Quiz atual (dados de exemplo)
    const quiz = {
      id: "quiz-1",
      title: "Descubra seu Estilo Pessoal",
      description: "Quiz interativo para descobrir seu estilo único",
      questions: [
        {
          id: "q1",
          type: "multiple",
          question: "Qual é seu estilo preferido?",
          options: ["Clássico", "Moderno", "Boho", "Minimalista"]
        },
        {
          id: "q2", 
          type: "single",
          question: "Que cores você prefere?",
          options: ["Neutras", "Vibrantes", "Pastéis", "Escuras"]
        }
      ],
      results: [
        {
          id: "classic",
          title: "Estilo Clássico",
          description: "Você tem um gosto refinado e atemporal"
        },
        {
          id: "modern",
          title: "Estilo Moderno", 
          description: "Você gosta de tendências atuais e inovação"
        }
      ]
    };

    // Configurações globais
    const settings = {
      theme: {
        primaryColor: "#B89B7A",
        secondaryColor: "#432818",
        backgroundColor: "#FAF9F7",
        fontFamily: "Inter, sans-serif"
      },
      branding: {
        logo: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744921536/Sem_nome_1080_x_1000_px_z0chuv.webp",
        brandName: "Gisele Galvão",
        tagline: "Descubra seu estilo único"
      },
      integrations: {
        facebookPixel: process.env.VITE_FACEBOOK_PIXEL_ID,
        googleAnalytics: process.env.VITE_GOOGLE_ANALYTICS_ID,
        hotmart: true,
        webhook: true
      }
    };

    // Dados de analytics (UTM da sessão atual)
    const analytics = {
      utmSource: req.query.utm_source as string,
      utmMedium: req.query.utm_medium as string,
      utmCampaign: req.query.utm_campaign as string,
      participantId: req.query.participant_id as string || `participant-${Date.now()}`
    };

    // Funil atual (dados do banco se disponível, senão mock)
    let funnel;
    try {
      if (db) {
        const funnelData = await db.select().from(funnels).orderBy(desc(funnels.createdAt)).limit(1);
        funnel = funnelData[0] || null;
      }
    } catch (error: any) {
      console.log("Usando dados de funil mockados:", error?.message || "Erro desconhecido");
    }

    if (!funnel) {
      funnel = {
        id: "funnel-1",
        name: "Quiz de Estilo Pessoal",
        pages: [
          { id: "cover", type: "intro", title: "Capa do Quiz" },
          { id: "questions", type: "questions", title: "Perguntas" },
          { id: "results", type: "results", title: "Resultados" }
        ],
        settings: {
          enableAnalytics: true,
          enableWebhooks: true,
          enablePixelTracking: true
        }
      };
    }

    res.json({
      user,
      quiz,
      analytics,
      settings,
      funnel,
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development"
    });

  } catch (error: any) {
    console.error("Erro ao buscar dados para Lovable:", error);
    res.status(500).json({ 
      error: "Erro interno do servidor",
      message: error?.message || "Erro desconhecido"
    });
  }
});

// GET /api/lovable/user - Dados do usuário
router.get("/user", async (req, res) => {
  res.json({
    id: "dev-user-1",
    name: "Usuário Desenvolvimento",
    email: "dev@quiz-quest.com",
    role: "admin"
  });
});

// GET /api/lovable/quiz - Dados do quiz atual
router.get("/quiz", async (req, res) => {
  res.json({
    id: "quiz-1",
    title: "Descubra seu Estilo Pessoal",
    description: "Quiz interativo para descobrir seu estilo único",
    totalQuestions: 8,
    estimatedTime: "3-5 minutos",
    categories: ["Estilo", "Personalidade", "Moda"],
    status: "published"
  });
});

// GET /api/lovable/settings - Configurações globais
router.get("/settings", async (req, res) => {
  res.json({
    theme: {
      primaryColor: "#B89B7A",
      secondaryColor: "#432818", 
      backgroundColor: "#FAF9F7",
      textColor: "#1a1a1a",
      fontFamily: "Inter, sans-serif"
    },
    branding: {
      logo: "https://res.cloudinary.com/dqljyf76t/image/upload/v1744921536/Sem_nome_1080_x_1000_px_z0chuv.webp",
      brandName: "Gisele Galvão",
      tagline: "Descubra seu estilo único",
      website: "https://giselegalvao.com"
    },
    features: {
      analytics: true,
      webhooks: true,
      pixelTracking: true,
      abTesting: false
    }
  });
});

// POST /api/lovable/analytics - Salvar dados de analytics
router.post("/analytics", async (req, res) => {
  try {
    const { utmSource, utmMedium, utmCampaign, participantId, event } = req.body;

    if (db) {
      await db.insert(utmAnalytics).values({
        utmSource,
        utmMedium,
        utmCampaign,
        participantId
      });
    }

    console.log("📊 Analytics salvo:", { utmSource, utmMedium, utmCampaign, participantId, event });

    res.json({ success: true, message: "Analytics salvo com sucesso" });
  } catch (error) {
    console.error("Erro ao salvar analytics:", error);
    res.status(500).json({ error: "Erro ao salvar analytics" });
  }
});

export default router;
