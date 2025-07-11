// @ts-nocheck
import type { Express } from "express";
import { createServer, type Server } from "http";
import crypto from "crypto";
import path from "path";
import { storage } from "./storage";
import { getFacebookCAPI } from "./services/facebookCAPI";
import { generateQuizHtml } from "./quizTemplate";
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

// Function to generate quiz HTML
function generateQuizHtml(funnel: any, quizConfig: any) {
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${quizConfig.intro?.title || funnel.name}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: linear-gradient(135deg, #b89b7a 0%, #d4c4a0 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        
        .quiz-container {
          background: white;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          padding: 40px;
          max-width: 600px;
          width: 100%;
          text-align: center;
        }
        
        .quiz-intro {
          margin-bottom: 30px;
        }
        
        .quiz-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #432818;
          margin-bottom: 10px;
          font-family: 'Playfair Display', serif;
        }
        
        .quiz-subtitle {
          font-size: 1.25rem;
          color: #b89b7a;
          margin-bottom: 15px;
        }
        
        .quiz-description {
          font-size: 1.1rem;
          color: #6b4f43;
          line-height: 1.6;
          margin-bottom: 30px;
        }
        
        .quiz-question {
          display: none;
          margin-bottom: 30px;
        }
        
        .quiz-question.active {
          display: block;
        }
        
        .question-text {
          font-size: 1.5rem;
          font-weight: 600;
          color: #432818;
          margin-bottom: 25px;
        }
        
        .quiz-options {
          display: grid;
          gap: 15px;
          margin-bottom: 30px;
        }
        
        .quiz-option {
          background: #f8f9fa;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          padding: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1.1rem;
          color: #432818;
        }
        
        .quiz-option:hover {
          border-color: #b89b7a;
          background: #fefefe;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(184, 155, 122, 0.15);
        }
        
        .quiz-option.selected {
          border-color: #b89b7a;
          background: #b89b7a;
          color: white;
        }
        
        .quiz-btn {
          background: #b89b7a;
          color: white;
          border: none;
          padding: 15px 40px;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin: 10px;
        }
        
        .quiz-btn:hover {
          background: #a0855e;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(184, 155, 122, 0.3);
        }
        
        .quiz-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        
        .quiz-result {
          display: none;
          text-align: center;
        }
        
        .quiz-result.active {
          display: block;
        }
        
        .result-image {
          width: 300px;
          height: 200px;
          border-radius: 12px;
          margin: 20px auto;
          display: block;
        }
        
        .result-title {
          font-size: 2rem;
          font-weight: 700;
          color: #432818;
          margin-bottom: 15px;
        }
        
        .result-description {
          font-size: 1.1rem;
          color: #6b4f43;
          line-height: 1.6;
          margin-bottom: 30px;
        }
        
        .progress-bar {
          width: 100%;
          height: 8px;
          background: #e5e7eb;
          border-radius: 4px;
          margin-bottom: 30px;
          overflow: hidden;
        }
        
        .progress-fill {
          height: 100%;
          background: #b89b7a;
          border-radius: 4px;
          transition: width 0.3s ease;
          width: 0%;
        }
        
        @media (max-width: 768px) {
          .quiz-container {
            padding: 30px 20px;
          }
          
          .quiz-title {
            font-size: 2rem;
          }
          
          .question-text {
            font-size: 1.25rem;
          }
        }
      </style>
    </head>
    <body>
      <div class="quiz-container">
        <!-- Intro Screen -->
        <div id="quiz-intro" class="quiz-intro">
          <h1 class="quiz-title">${quizConfig.intro?.title || 'Quiz'}</h1>
          <h2 class="quiz-subtitle">${quizConfig.intro?.subtitle || ''}</h2>
          <p class="quiz-description">${quizConfig.intro?.description || ''}</p>
          <button class="quiz-btn" onclick="startQuiz()">${quizConfig.intro?.buttonText || 'Começar'}</button>
        </div>
        
        <!-- Progress Bar -->
        <div id="progress-container" style="display: none;">
          <div class="progress-bar">
            <div class="progress-fill" id="progress-fill"></div>
          </div>
        </div>
        
        <!-- Questions -->
        ${quizConfig.questions?.map((question: any, index: number) => `
          <div id="question-${index}" class="quiz-question">
            <h3 class="question-text">${question.text}</h3>
            <div class="quiz-options">
              ${question.options?.map((option: any) => `
                <div class="quiz-option" onclick="selectOption(${index}, '${option.id}', ${JSON.stringify(option.points || {}).replace(/"/g, '&quot;')})">
                  ${option.text}
                </div>
              `).join('') || ''}
            </div>
            <button class="quiz-btn" onclick="nextQuestion()" id="next-btn-${index}" disabled>Próxima</button>
          </div>
        `).join('') || ''}
        
        <!-- Results -->
        ${quizConfig.results?.map((result: any) => `
          <div id="result-${result.id}" class="quiz-result">
            <h2 class="result-title">${result.title}</h2>
            ${result.imageUrl ? `<img src="${result.imageUrl}" alt="${result.title}" class="result-image">` : ''}
            <p class="result-description">${result.description}</p>
            <button class="quiz-btn" onclick="restartQuiz()">Fazer Novamente</button>
          </div>
        `).join('') || ''}
      </div>
      
      <script>
        const quizData = ${JSON.stringify(quizConfig)};
        let currentQuestion = 0;
        let answers = {};
        let scores = {};
        
        // Initialize scores
        if (quizData.results) {
          quizData.results.forEach(result => {
            scores[result.id] = 0;
          });
        }
        
        function startQuiz() {
          document.getElementById('quiz-intro').style.display = 'none';
          document.getElementById('progress-container').style.display = 'block';
          showQuestion(0);
          updateProgress();
        }
        
        function showQuestion(index) {
          // Hide all questions
          document.querySelectorAll('.quiz-question').forEach(q => q.classList.remove('active'));
          
          // Show current question
          const question = document.getElementById(\`question-\${index}\`);
          if (question) {
            question.classList.add('active');
          }
        }
        
        function selectOption(questionIndex, optionId, points) {
          // Remove previous selection
          const questionEl = document.getElementById(\`question-\${questionIndex}\`);
          questionEl.querySelectorAll('.quiz-option').forEach(opt => opt.classList.remove('selected'));
          
          // Add selection to clicked option
          event.target.classList.add('selected');
          
          // Store answer
          answers[questionIndex] = optionId;
          
          // Add points to scores
          Object.keys(points || {}).forEach(key => {
            if (scores[key] !== undefined) {
              scores[key] += points[key];
            }
          });
          
          // Enable next button
          document.getElementById(\`next-btn-\${questionIndex}\`).disabled = false;
        }
        
        function nextQuestion() {
          currentQuestion++;
          if (currentQuestion < quizData.questions.length) {
            showQuestion(currentQuestion);
            updateProgress();
          } else {
            showResult();
          }
        }
        
        function updateProgress() {
          const progress = ((currentQuestion + 1) / quizData.questions.length) * 100;
          document.getElementById('progress-fill').style.width = \`\${progress}%\`;
        }
        
        function showResult() {
          // Hide all questions and progress
          document.querySelectorAll('.quiz-question').forEach(q => q.style.display = 'none');
          document.getElementById('progress-container').style.display = 'none';
          
          // Find result with highest score
          let maxScore = -1;
          let resultId = null;
          
          Object.keys(scores).forEach(key => {
            if (scores[key] > maxScore) {
              maxScore = scores[key];
              resultId = key;
            }
          });
          
          // Show result
          if (resultId) {
            document.getElementById(\`result-\${resultId}\`).classList.add('active');
          }
          
          // Send result to backend (optional)
          sendResult(resultId, scores, answers);
        }
        
        function restartQuiz() {
          currentQuestion = 0;
          answers = {};
          scores = {};
          
          // Reset scores
          if (quizData.results) {
            quizData.results.forEach(result => {
              scores[result.id] = 0;
            });
          }
          
          // Hide results
          document.querySelectorAll('.quiz-result').forEach(r => r.classList.remove('active'));
          
          // Reset selections
          document.querySelectorAll('.quiz-option').forEach(opt => opt.classList.remove('selected'));
          document.querySelectorAll('[id^="next-btn-"]').forEach(btn => btn.disabled = true);
          
          // Show intro
          document.getElementById('quiz-intro').style.display = 'block';
          document.getElementById('progress-container').style.display = 'none';
        }
        
        function sendResult(resultId, scores, answers) {
          // Optional: Send result to analytics endpoint
          fetch('/api/quiz-participants', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: 'Usuário Anônimo',
              email: '',
              quizId: '${funnel.id}',
              utmSource: new URLSearchParams(window.location.search).get('utm_source'),
              utmMedium: new URLSearchParams(window.location.search).get('utm_medium'),
              utmCampaign: new URLSearchParams(window.location.search).get('utm_campaign')
            })
          }).catch(console.error);
          
          fetch('/api/quiz-results', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              participantId: 'anonymous_' + Date.now(),
              quizId: '${funnel.id}',
              responses: JSON.stringify(answers),
              scores: JSON.stringify(scores),
              predominantStyle: resultId
            })
          }).catch(console.error);
        }
      </script>
    </body>
    </html>
  `;
}

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

  // Rota de publicação do funil de teste
  app.post("/api/funnels/:id/publish", async (req, res) => {
    try {
      const { id } = req.params;
      const funnel = await storage.getFunnelById(id);
      
      if (!funnel) {
        return res.status(404).json({ success: false, error: "Funil não encontrado" });
      }

      // Marcar funil como publicado usando update simples
      const updatedFunnel = await storage.updateFunnel(id, { 
        isPublished: 1 as any  // SQLite armazena boolean como integer
      });
      
      res.json({ 
        success: true, 
        data: updatedFunnel,
        publishUrl: `/teste-funil?id=${id}`
      });
    } catch (error) {
      console.error("Error publishing funnel:", error);
      res.status(500).json({ success: false, error: "Failed to publish funnel" });
    }
  });

  // Rota para exibir funil publicado
  app.get("/teste-funil", async (req, res) => {
    try {
      const { id } = req.query;
      
      if (!id || typeof id !== 'string') {
        return res.status(400).json({ success: false, error: "ID do funil é obrigatório" });
      }

      const funnel = await storage.getFunnelById(id);
      
      if (!funnel) {
        return res.status(404).json({ success: false, error: "Funil não encontrado" });
      }

      // Parse do quiz configuration do settings
      let quizConfig;
      try {
        const settings = JSON.parse(funnel.settings || '{}');
        quizConfig = settings.quiz_config;
      } catch (error) {
        console.error("Error parsing funnel settings:", error);
        return res.status(400).json({ success: false, error: "Configuração do funil inválida" });
      }

      if (!quizConfig) {
        return res.status(400).json({ success: false, error: "Quiz não configurado neste funil" });
      }

      // Gerar HTML do quiz usando template
      const htmlContent = generateQuizHtml(funnel, quizConfig);
      
      res.setHeader('Content-Type', 'text/html');
      res.send(htmlContent);
    } catch (error) {
      console.error("Error serving funnel:", error);
      res.status(500).json({ success: false, error: "Failed to serve funnel" });
    }
  });

  // Rota de conveniência para acessar o funil publicado mais facilmente
  app.get("/quiz-estilo", async (req, res) => {
    // Redirecionar para o funil de teste com ID específico
    const funnelId = "funnel_1752011415947_x7ganjisu";
    res.redirect(`/teste-funil?id=${funnelId}`);
  });

  // Rota para validar regras de pontuação do quiz
  app.post("/api/quiz/validate-scoring", async (req, res) => {
    try {
      const { quizConfig } = req.body;
      
      if (!quizConfig || !quizConfig.questions || !quizConfig.results) {
        return res.status(400).json({ 
          success: false, 
          error: "Configuração de quiz inválida" 
        });
      }

      const issues: string[] = [];
      const resultIds = quizConfig.results.map((r: any) => r.id);
      
      // Validar se todas as pontuações referenciam resultados existentes
      quizConfig.questions.forEach((question: any, qIndex: number) => {
        if (!question.options || question.options.length === 0) {
          issues.push(`Questão ${qIndex + 1}: Sem opções de resposta`);
          return;
        }

        question.options.forEach((option: any, oIndex: number) => {
          if (!option.points) {
            issues.push(`Q${qIndex + 1}, Opção ${oIndex + 1}: Sem pontuações definidas`);
            return;
          }

          Object.keys(option.points).forEach(pointKey => {
            if (!resultIds.includes(pointKey)) {
              issues.push(`Q${qIndex + 1}, Opção ${oIndex + 1}: Pontuação para "${pointKey}" não tem resultado correspondente`);
            }
          });

          // Verificar se há pontuação para todos os resultados
          resultIds.forEach(resultId => {
            if (!(resultId in option.points)) {
              issues.push(`Q${qIndex + 1}, Opção ${oIndex + 1}: Faltando pontuação para "${resultId}"`);
            }
          });
        });
      });

      // Verificar se há pelo menos uma questão
      if (quizConfig.questions.length === 0) {
        issues.push("Quiz deve ter pelo menos uma questão");
      }

      // Verificar se há pelo menos dois resultados
      if (quizConfig.results.length < 2) {
        issues.push("Quiz deve ter pelo menos dois resultados possíveis");
      }

      res.json({
        success: true,
        isValid: issues.length === 0,
        issues: issues,
        summary: {
          questionsCount: quizConfig.questions.length,
          resultsCount: quizConfig.results.length,
          totalOptions: quizConfig.questions.reduce((sum: number, q: any) => sum + (q.options?.length || 0), 0)
        }
      });
    } catch (error) {
      console.error("Error validating quiz scoring:", error);
      res.status(500).json({ success: false, error: "Failed to validate quiz scoring" });
    }
  });

  // Rota para simular resultado do quiz (para teste das regras)
  app.post("/api/quiz/simulate-result", async (req, res) => {
    try {
      const { quizConfig, answers } = req.body;
      
      if (!quizConfig || !answers) {
        return res.status(400).json({ 
          success: false, 
          error: "Quiz config and answers are required" 
        });
      }

      const scores: Record<string, number> = {};
      
      // Inicializar pontuações
      quizConfig.results.forEach((result: any) => {
        scores[result.id] = 0;
      });

      // Calcular pontuações baseado nas respostas
      Object.entries(answers).forEach(([questionIndex, optionId]) => {
        const qIndex = parseInt(questionIndex);
        const question = quizConfig.questions[qIndex];
        
        if (question && question.options) {
          const selectedOption = question.options.find((opt: any) => opt.id === optionId);
          
          if (selectedOption && selectedOption.points) {
            Object.entries(selectedOption.points).forEach(([resultId, points]) => {
              if (scores[resultId] !== undefined) {
                scores[resultId] += Number(points);
              }
            });
          }
        }
      });

      // Encontrar resultado com maior pontuação
      let maxScore = -1;
      let predominantResult = null;
      
      Object.entries(scores).forEach(([resultId, score]) => {
        if (score > maxScore) {
          maxScore = score;
          predominantResult = resultId;
        }
      });

      const resultData = quizConfig.results.find((r: any) => r.id === predominantResult);

      res.json({
        success: true,
        scores: scores,
        predominantResult: predominantResult,
        resultData: resultData,
        totalScore: Object.values(scores).reduce((sum: number, score: number) => sum + score, 0)
      });
    } catch (error) {
      console.error("Error simulating quiz result:", error);
      res.status(500).json({ success: false, error: "Failed to simulate quiz result" });
    }
  });

  // Schema-driven funnel editor API routes
  // GET all funnels
  app.get("/api/schema-driven/funnels", async (req, res) => {
    try {
      const funnels = await storage.getAllFunnels();
      res.json({ success: true, data: funnels });
    } catch (error) {
      console.error("Error fetching funnels:", error);
      res.status(500).json({ success: false, error: "Failed to fetch funnels" });
    }
  });

  // GET single funnel
  app.get("/api/schema-driven/funnels/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const funnel = await storage.getFunnelById(id);
      
      if (!funnel) {
        return res.status(404).json({ success: false, error: "Funnel not found" });
      }
      
      res.json({ success: true, data: funnel });
    } catch (error) {
      console.error("Error fetching funnel:", error);
      res.status(500).json({ success: false, error: "Failed to fetch funnel" });
    }
  });

  // POST create new funnel
  app.post("/api/schema-driven/funnels", async (req, res) => {
    try {
      const validatedData = insertFunnelSchema.parse(req.body);
      const funnel = await storage.createFunnel(validatedData);
      res.status(201).json({ success: true, data: funnel });
    } catch (error) {
      console.error("Error creating funnel:", error);
      res.status(500).json({ success: false, error: "Failed to create funnel" });
    }
  });

  // PUT update funnel
  app.put("/api/schema-driven/funnels/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      
      // Verificar se o funil existe
      const existingFunnel = await storage.getFunnelById(id);
      if (!existingFunnel) {
        return res.status(404).json({ success: false, error: "Funnel not found" });
      }
      
      // Atualizar o funil
      const updatedFunnel = await storage.updateFunnel(id, updates);
      res.json({ success: true, data: updatedFunnel });
    } catch (error) {
      console.error("Error updating funnel:", error);
      res.status(500).json({ success: false, error: "Failed to update funnel" });
    }
  });

  // DELETE funnel
  app.delete("/api/schema-driven/funnels/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteFunnel(id);
      res.json({ success: true, message: "Funnel deleted successfully" });
    } catch (error) {
      console.error("Error deleting funnel:", error);
      res.status(500).json({ success: false, error: "Failed to delete funnel" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
