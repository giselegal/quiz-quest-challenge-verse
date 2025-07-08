import type { Express } from "express";
import { createServer, type Server } from "http";
import crypto from "crypto";
import path from "path";
import { storage } from "./storage";
import { getFacebookCAPI } from "./services/facebookCAPI";
import { 
  insertUtmAnalyticsSchema, 
  insertQuizParticipantSchema,
  insertFunnelSchema,
  insertFunnelPageSchema,
  insertFunnelVersionSchema,
  insertConversionEventSchema,
  insertQuizResultSchema,
  insertHotmartPurchaseSchema
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Dashboard Analytics Route
  app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(process.cwd(), 'dashboard_analytics.html'));
  });

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

  app.get("/api/quiz-participants", async (req, res) => {
    try {
      const participants = await storage.getQuizParticipants();
      res.json({ success: true, data: participants });
    } catch (error) {
      console.error("Error fetching quiz participants:", error);
      res.status(500).json({ success: false, error: "Failed to fetch participants" });
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

  // Page Configs API Routes (para suporte ao editor schema-driven)
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

  // Hotmart Webhook Route (ÚNICO ENDPOINT CONSOLIDADO)
  app.post("/api/webhooks/hotmart", async (req, res) => {
    try {
      console.log("Hotmart webhook received:", {
        headers: req.headers,
        body: req.body
      });
      
      // Tentar diferentes headers de assinatura (Hotmart pode usar variações)
      const signature = (req.headers["x-hotmart-signature"] || 
                        req.headers["x-hotmart-hottok"] || 
                        req.headers["x-signature"]) as string;
      
      if (!signature) {
        console.error("Missing webhook signature in headers:", Object.keys(req.headers));
        return res.status(401).json({ success: false, error: "Missing signature" });
      }

      // Validar a assinatura do webhook
      const payload = JSON.stringify(req.body);
      const isValid = validateHotmartSignature(payload, signature);

      if (!isValid) {
        console.error("Invalid webhook signature:", { signature, payload: payload.substring(0, 100) });
        return res.status(401).json({ success: false, error: "Invalid signature" });
      }

      console.log("Webhook signature validated successfully");
      
      // Processar diferentes tipos de evento
      const webhookData = req.body;
      
      if (webhookData.event === "PURCHASE_COMPLETE") {
        await handlePurchaseComplete(webhookData);
      } else if (webhookData.event === "PURCHASE_APPROVED") {
        await handlePurchaseApproved(webhookData);
      } else {
        console.log("Unhandled webhook event type:", webhookData.event);
      }
      
      res.json({ 
        success: true, 
        message: "Webhook processed successfully",
        eventType: webhookData.event,
        timestamp: new Date().toISOString()
      });
    } catch (error) {
      console.error("Error processing Hotmart webhook:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to process webhook",
        details: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Função para validar assinatura do Hotmart
  const validateHotmartSignature = (payload: string, signature: string | undefined): boolean => {
    try {
      if (!signature || !process.env.HOTMART_WEBHOOK_SECRET) {
        console.warn("Missing signature or webhook secret");
        return false;
      }
      
      const hmac = crypto.createHmac("sha256", process.env.HOTMART_WEBHOOK_SECRET);
      const computedSignature = hmac.update(payload).digest("hex");
      
      return crypto.timingSafeEqual(
        Buffer.from(signature, "hex"),
        Buffer.from(computedSignature, "hex")
      );
    } catch (error) {
      console.error("Error validating signature:", error);
      return false;
    }
  };

  // Função para processar compra completa
  const handlePurchaseComplete = async (webhookData: any) => {
    try {
      console.log("Processing purchase complete:", webhookData);
      
      const buyerData = webhookData.data.buyer;
      const purchaseData = webhookData.data.purchase;
      
      // Verificar se a compra já foi processada para evitar duplicação
      const existingPurchase = await storage.getHotmartPurchaseByTransaction(purchaseData.transaction);
      
      if (existingPurchase) {
        console.log("Purchase already processed, skipping:", purchaseData.transaction);
        return;
      }
      
      // 1. Salvar compra no banco de dados
      const savedPurchase = await storage.createHotmartPurchase({
        transactionId: purchaseData.transaction,
        status: "complete",
        buyerEmail: buyerData.email,
        buyerName: buyerData.name,
        productId: purchaseData.product.id.toString(),
        productName: purchaseData.product.name,
        price: purchaseData.price.value, // já vem em centavos
        currency: purchaseData.price.currency_value || "BRL",
        commissionValue: purchaseData.commission?.value,
        affiliateEmail: purchaseData.affiliate?.email,
        webhookEventId: webhookData.id,
        rawWebhookData: webhookData,
        facebookEventSent: false,
      });
      
      // 2. Criar evento de conversão ÚNICO
      const conversionEvent = await storage.createConversionEvent({
        eventType: "purchase",
        eventSource: "hotmart",
        userEmail: buyerData.email,
        userName: buyerData.name,
        eventValue: purchaseData.price.value,
        currency: purchaseData.price.currency_value || "BRL",
        transactionId: purchaseData.transaction,
        productName: purchaseData.product.name,
        metadata: {
          hotmart_product_id: purchaseData.product.id,
          affiliate_email: purchaseData.affiliate?.email,
          commission_value: purchaseData.commission?.value,
          purchase_id: savedPurchase.id,
          webhook_event_id: webhookData.id,
        },
      });
      
      // 3. Disparar evento para Facebook CAPI com deduplicação
      let facebookEventId = null;
      let facebookSuccess = false;
      
      try {
        const facebookCAPI = getFacebookCAPI();
        facebookEventId = `hotmart_purchase_${purchaseData.transaction}_${Date.now()}`;
        
        await facebookCAPI.trackPurchase({
          email: buyerData.email,
          name: buyerData.name,
          value: purchaseData.price.value / 100, // Converter centavos para reais
          currency: purchaseData.price.currency_value || 'BRL',
          transactionId: purchaseData.transaction,
          productName: purchaseData.product.name,
        });
        
        facebookSuccess = true;
        console.log("Purchase event sent to Facebook CAPI with ID:", facebookEventId);
      } catch (error) {
        console.error("Error sending purchase to Facebook CAPI:", error);
        facebookEventId = `failed_${Date.now()}`;
      }
      
      // 4. Atualizar status da compra
      await storage.updateHotmartPurchase(purchaseData.transaction, {
        facebookEventSent: facebookSuccess,
        conversionEventId: conversionEvent.id,
      });
      
      // 5. Registrar resultado do envio para Facebook (apenas se enviou)
      if (facebookSuccess) {
        await storage.createConversionEvent({
          eventType: "facebook_purchase",
          eventSource: "facebook_capi",
          userEmail: buyerData.email,
          userName: buyerData.name,
          eventValue: purchaseData.price.value,
          currency: purchaseData.price.currency_value || "BRL",
          transactionId: purchaseData.transaction,
          productName: purchaseData.product.name,
          facebookEventId: facebookEventId,
          metadata: {
            original_event_id: conversionEvent.id,
            hotmart_transaction: purchaseData.transaction,
            purchase_id: savedPurchase.id,
            capi_response: "sent",
          },
        });
      }
    } catch (error) {
      console.error("Error handling purchase complete:", error);
    }
  };

  // Função para processar compra aprovada
  const handlePurchaseApproved = async (webhookData: any) => {
    try {
      console.log("Processing purchase approved:", webhookData);
      
      const buyerData = webhookData.data.buyer;
      const purchaseData = webhookData.data.purchase;
      
      // Verificar se a compra já foi processada para evitar duplicação
      const existingPurchase = await storage.getHotmartPurchaseByTransaction(purchaseData.transaction);
      
      if (existingPurchase) {
        console.log("Purchase already exists, updating status to approved");
        
        // Atualizar status para aprovado
        await storage.updateHotmartPurchase(purchaseData.transaction, {
          status: "approved",
        });
        
        // Criar apenas evento de status update se necessário
        await storage.createConversionEvent({
          eventType: "purchase_approved",
          eventSource: "hotmart",
          userEmail: buyerData.email,
          userName: buyerData.name,
          eventValue: purchaseData.price.value,
          currency: purchaseData.price.currency_value || "BRL",
          transactionId: purchaseData.transaction,
          productName: purchaseData.product.name,
          metadata: {
            original_purchase_id: existingPurchase.id,
            status_change: "complete_to_approved",
            webhook_event_id: webhookData.id,
          },
        });
        
        console.log("Purchase status updated to approved");
      } else {
        console.log("Purchase not found for APPROVED event, creating new purchase record");
        
        // Se não existe, criar novo registro (caso raro)
        await handlePurchaseComplete(webhookData);
      }
    } catch (error) {
      console.error("Error handling purchase approved:", error);
    }
  };

  // Quiz Results and Lead Tracking
  app.post("/api/quiz-results", async (req, res) => {
    try {
      const { userData, quizResult, utmData, browserData } = req.body;
      
      console.log("Quiz result received:", { userData, quizResult });
      
      // Validar dados obrigatórios
      if (!userData?.email || !quizResult) {
        return res.status(400).json({ 
          success: false, 
          error: "Missing required data: userData.email and quizResult" 
        });
      }
      
      // 1. Verificar se participante já existe ou criar novo
      let participant;
      const participantData = {
        name: userData.name,
        email: userData.email,
        quizId: crypto.randomUUID(),
        utmSource: utmData?.source,
        utmMedium: utmData?.medium,
        utmCampaign: utmData?.campaign,
      };
      
      try {
        participant = await storage.createQuizParticipant(participantData);
        console.log("New participant created:", participant.id);
      } catch (error) {
        console.log("Error creating participant, might already exist:", error);
        // Em caso de erro (possivelmente email duplicado), continuar sem participante
        // ou implementar busca por email se necessário
      }
      
      // 2. Salvar resultado detalhado do quiz
      const savedQuizResult = await storage.createQuizResult({
        participantId: participant?.id || null,
        quizType: "style-discovery",
        primaryStyle: quizResult?.primaryStyle?.category,
        stylePercentage: quizResult?.primaryStyle?.percentage,
        allStyles: quizResult?.allStyles,
        answers: quizResult?.answers,
        utmData: utmData,
        browserData: browserData,
      });
      
      // 3. Criar evento de conversão (Lead) - ÚNICO por resultado
      const eventId = `quiz_lead_${Date.now()}_${crypto.randomUUID()}`;
      const conversionEvent = await storage.createConversionEvent({
        eventType: "lead",
        eventSource: "quiz",
        participantId: participant?.id || null,
        userEmail: userData.email,
        userName: userData.name,
        utmSource: utmData?.source,
        utmMedium: utmData?.medium,
        utmCampaign: utmData?.campaign,
        utmContent: utmData?.content,
        utmTerm: utmData?.term,
        fbclid: utmData?.fbclid,
        metadata: {
          quiz_type: "style-discovery",
          primary_style: quizResult?.primaryStyle?.category,
          style_percentage: quizResult?.primaryStyle?.percentage,
          quiz_result_id: savedQuizResult.id,
          internal_event_id: eventId,
        },
      });
      
      // 4. Disparar evento Lead para Facebook CAPI com deduplicação
      let facebookEventId = null;
      let facebookSuccess = false;
      
      try {
        const facebookCAPI = getFacebookCAPI();
        facebookEventId = `quiz_lead_${savedQuizResult.id}_${Date.now()}`;
        
        await facebookCAPI.trackLead({
          email: userData.email,
          name: userData.name,
          ipAddress: browserData?.ipAddress,
          userAgent: browserData?.userAgent,
          fbp: browserData?.fbp,
          fbc: browserData?.fbc || utmData?.fbclid,
        }, {
          source_url: browserData?.url || 'https://giselegalvao.com.br/quiz',
          dominant_style: quizResult?.primaryStyle?.category,
          quiz_score: quizResult?.primaryStyle?.percentage,
          utm_source: utmData?.source,
          utm_medium: utmData?.medium,
          utm_campaign: utmData?.campaign,
          event_id: facebookEventId,
          internal_conversion_id: conversionEvent.id,
        });
        
        facebookSuccess = true;
        console.log("Quiz lead event sent to Facebook CAPI with ID:", facebookEventId);
      } catch (error) {
        console.error("Error sending to Facebook CAPI:", error);
        facebookEventId = `failed_${Date.now()}`;
      }
      
      // 5. Registrar resultado do envio para Facebook (apenas se enviou)
      if (facebookSuccess) {
        await storage.createConversionEvent({
          eventType: "facebook_lead",
          eventSource: "facebook_capi",
          participantId: participant?.id || null,
          userEmail: userData.email,
          userName: userData.name,
          facebookEventId: facebookEventId,
          metadata: {
            original_event_id: conversionEvent.id,
            quiz_result_id: savedQuizResult.id,
            capi_response: "sent",
            internal_event_id: eventId,
          },
        });
      }
      
      res.json({ 
        success: true, 
        message: "Quiz result processed successfully",
        result: savedQuizResult,
        eventId: conversionEvent.id,
        facebookEventId: facebookEventId,
      });
    } catch (error) {
      console.error("Error processing quiz result:", error);
      res.status(500).json({ 
        success: false, 
        error: "Failed to process quiz result",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });

  // Analytics and Tracking API Routes
  app.get("/api/conversion-events", async (req, res) => {
    try {
      const events = await storage.getConversionEvents();
      res.json({ success: true, data: events });
    } catch (error) {
      console.error("Error fetching conversion events:", error);
      res.status(500).json({ success: false, error: "Failed to fetch conversion events" });
    }
  });

  app.get("/api/conversion-events/email/:email", async (req, res) => {
    try {
      const { email } = req.params;
      const events = await storage.getConversionEventsByEmail(email);
      res.json({ success: true, data: events });
    } catch (error) {
      console.error("Error fetching conversion events by email:", error);
      res.status(500).json({ success: false, error: "Failed to fetch conversion events" });
    }
  });

  app.get("/api/quiz-results", async (req, res) => {
    try {
      const results = await storage.getQuizResults();
      res.json({ success: true, data: results });
    } catch (error) {
      console.error("Error fetching quiz results:", error);
      res.status(500).json({ success: false, error: "Failed to fetch quiz results" });
    }
  });

  app.get("/api/hotmart-purchases", async (req, res) => {
    try {
      const purchases = await storage.getHotmartPurchases();
      res.json({ success: true, data: purchases });
    } catch (error) {
      console.error("Error fetching Hotmart purchases:", error);
      res.status(500).json({ success: false, error: "Failed to fetch purchases" });
    }
  });

  app.get("/api/hotmart-purchases/:transactionId", async (req, res) => {
    try {
      const { transactionId } = req.params;
      const purchase = await storage.getHotmartPurchaseByTransaction(transactionId);
      
      if (!purchase) {
        return res.status(404).json({ success: false, error: "Purchase not found" });
      }
      
      res.json({ success: true, data: purchase });
    } catch (error) {
      console.error("Error fetching Hotmart purchase:", error);
      res.status(500).json({ success: false, error: "Failed to fetch purchase" });
    }
  });

  // Analytics Dashboard Endpoint
  app.get("/api/analytics/dashboard", async (req, res) => {
    try {
      const [
        conversionEvents,
        quizResults,
        hotmartPurchases,
        utmAnalytics
      ] = await Promise.all([
        storage.getConversionEvents(),
        storage.getQuizResults(),
        storage.getHotmartPurchases(),
        storage.getUtmAnalytics()
      ]);

      // Métricas consolidadas
      const metrics = {
        totalLeads: conversionEvents.filter(e => e.eventType === "lead").length,
        totalPurchases: conversionEvents.filter(e => e.eventType === "purchase").length,
        totalQuizCompletions: quizResults.length,
        totalRevenue: hotmartPurchases.reduce((sum, p) => sum + (p.price || 0), 0) / 100, // converter centavos para reais
        conversionRate: 0,
        topUtmSources: {} as Record<string, number>,
        recentEvents: conversionEvents.slice(0, 10),
      };

      // Calcular taxa de conversão
      if (metrics.totalLeads > 0) {
        metrics.conversionRate = (metrics.totalPurchases / metrics.totalLeads) * 100;
      }

      // Top UTM sources
      utmAnalytics.forEach(utm => {
        if (utm.utmSource) {
          metrics.topUtmSources[utm.utmSource] = (metrics.topUtmSources[utm.utmSource] || 0) + 1;
        }
      });

      res.json({ 
        success: true, 
        data: {
          metrics,
          charts: {
            conversionEvents: conversionEvents.slice(0, 30),
            revenueByDay: hotmartPurchases.slice(0, 30),
            quizResultsByStyle: quizResults.slice(0, 100),
          }
        }
      });
    } catch (error) {
      console.error("Error fetching analytics dashboard:", error);
      res.status(500).json({ success: false, error: "Failed to fetch analytics" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
