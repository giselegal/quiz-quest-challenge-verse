import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { FunnelAIAgent, type FunnelTemplate } from '@/services/FunnelAIAgent';
import { Bot, Check, Eye, Play, Sparkles, Wand2 } from 'lucide-react';
import React, { useState } from 'react';
import { useLocation } from 'wouter';

// Template da Consultora de Estilo com IA
const STYLE_CONSULTANT_TEMPLATE: FunnelTemplate = {
  meta: {
    name: 'Com que Roupa eu Vou? - Consultora de Estilo IA',
    description:
      'Funil completo para consultoria de estilo personalizada com inteligÃªncia artificial. Gera looks, imagens e ofertas diretas.',
    version: '2.0.0',
    author: 'giselegal',
  },
  design: {
    primaryColor: '#9333EA',
    secondaryColor: '#EC4899',
    accentColor: '#A855F7',
    backgroundColor: 'linear-gradient(to bottom right, #F3E8FF, #FCE7F3)',
    fontFamily: "'Inter', 'Poppins', sans-serif",
    button: {
      background: 'linear-gradient(90deg, #9333EA, #EC4899)',
      textColor: '#fff',
      borderRadius: '12px',
      shadow: '0 8px 20px rgba(147, 51, 234, 0.25)',
    },
    card: {
      background: '#fff',
      borderRadius: '16px',
      shadow: '0 8px 32px rgba(147, 51, 234, 0.12)',
    },
    progressBar: {
      color: '#9333EA',
      background: '#F3E8FF',
      height: '8px',
    },
    animations: {
      formTransition: 'slide-up, fade',
      buttonHover: 'scale-105, glow',
      resultAppear: 'fade-in-up',
    },
  },
  steps: [
    {
      type: 'intro',
      title: 'Com que Roupa eu Vou?',
      description:
        'Sua consultora de estilo pessoal com IA! Descubra o look perfeito para qualquer ocasiÃ£o.',
      imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop',
      cta: 'ComeÃ§ar Consulta de Estilo',
    },
    {
      type: 'form',
      title: 'Conte-me sobre seu compromisso',
      fields: [
        {
          id: 'compromisso',
          type: 'text',
          label: 'Compromisso',
          placeholder: 'Ex: ReuniÃ£o de trabalho, Jantar com amigos, Festa de aniversÃ¡rio',
          required: true,
        },
        {
          id: 'horario',
          type: 'select',
          label: 'HorÃ¡rio',
          options: [
            { value: 'ManhÃ£', label: 'ManhÃ£ (atÃ© 12h)' },
            { value: 'Tarde', label: 'Tarde (12h Ã s 18h)' },
            { value: 'Noite', label: 'Noite (apÃ³s 18h)' },
          ],
          required: true,
        },
        {
          id: 'clima',
          type: 'select',
          label: 'Clima',
          options: [
            { value: 'Sol', label: 'Ensolarado' },
            { value: 'Chuva', label: 'Chuvoso' },
            { value: 'Frio', label: 'Frio' },
            { value: 'Quente', label: 'Quente' },
            { value: 'Nublado', label: 'Nublado' },
          ],
          required: true,
        },
        {
          id: 'estilo',
          type: 'select',
          label: 'Seu Estilo Pessoal',
          options: [
            { value: 'Casual', label: 'Casual' },
            { value: 'Elegante', label: 'Elegante' },
            { value: 'Esportivo', label: 'Esportivo' },
            { value: 'Criativo', label: 'Criativo' },
            { value: 'Boho', label: 'Boho' },
            { value: 'ClÃ¡ssico', label: 'ClÃ¡ssico' },
            { value: 'Moderno', label: 'Moderno' },
          ],
          required: true,
        },
      ],
    },
    {
      type: 'processing',
      title: 'Gerando sua sugestÃ£o personalizada...',
      steps: [
        'Analisando seu estilo pessoal',
        'Considerando clima e ocasiÃ£o',
        'Criando combinaÃ§Ãµes perfeitas',
        'Gerando imagem de inspiraÃ§Ã£o',
        'Buscando referÃªncias visuais',
      ],
    },
    {
      type: 'result',
      title: 'Seu Look Perfeito!',
      sections: [
        {
          type: 'text',
          title: 'SugestÃ£o Personalizada',
          content: '{{generated_text}}',
        },
        {
          type: 'image',
          title: 'Imagem de InspiraÃ§Ã£o',
          content: '{{generated_image}}',
        },
        {
          type: 'gallery',
          title: 'ReferÃªncias de Estilo',
          content: '{{reference_images}}',
        },
      ],
    },
    {
      type: 'offer',
      title: 'Desbloqueie seu Estilo Pessoal!',
      description:
        'Receba um **Guia Exclusivo de Estilo** personalizado para vocÃª, com dicas e truques para montar looks incrÃ­veis em qualquer ocasiÃ£o.',
      offerImage:
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600&h=400&fit=crop',
      benefits: [
        'âœ¨ Guia personalizado do seu estilo',
        'ðŸ‘— 30 combinaÃ§Ãµes exclusivas',
        'ðŸ“± Acesso ao app premium',
        'ðŸ’Ž Consultoria com especialista',
      ],
      cta: {
        text: 'Quero Meu Guia GrÃ¡tis!',
        style: 'primary',
      },
      form: {
        fields: [
          {
            id: 'email',
            type: 'email',
            placeholder: 'Seu melhor e-mail aqui',
            required: true,
          },
        ],
      },
    },
  ],
  logic: {
    selection: {
      form: 'Todos os campos obrigatÃ³rios devem ser preenchidos',
      processing: 'IA processa os dados do formulÃ¡rio',
    },
    calculation: {
      method: 'GeraÃ§Ã£o dinÃ¢mica com API de IA',
      resultado: 'Look personalizado baseado nas preferÃªncias',
    },
    transitions: {
      betweenSteps: 'AnimaÃ§Ãµes suaves slide-up e fade',
    },
  },
  integrations: {
    ai: {
      textGeneration: {
        provider: 'gemini',
        model: 'gemini-2.0-flash',
        prompt:
          "Sugira um look completo (roupas, calÃ§ados, acessÃ³rios e maquiagem/cabelo se relevante) para um compromisso de '{{compromisso}}' que acontecerÃ¡ na '{{horario}}', com o clima '{{clima}}'. Meu estilo pessoal Ã© '{{estilo}}'. Seja conciso, criativo e forneÃ§a uma descriÃ§Ã£o detalhada do look.",
      },
      imageGeneration: {
        provider: 'imagen',
        model: 'imagen-3.0-generate-002',
        prompt:
          'Um look de moda para um compromisso de {{compromisso}} na {{horario}} com clima {{clima}}, no estilo {{estilo}}. Foto de corpo inteiro, alta qualidade, iluminaÃ§Ã£o natural, contexto apropriado.',
      },
    },
    analytics: {
      events: [
        'consultation_started',
        'form_completed',
        'result_generated',
        'offer_viewed',
        'email_captured',
        'guide_downloaded',
      ],
    },
  },
  config: {
    localStorageKeys: [
      'style_consultation_data',
      'generated_look',
      'user_preferences',
      'consultation_id',
    ],
    features: {
      aiGeneration: true,
      imageProcessing: true,
      emailCapture: true,
      socialSharing: true,
      responsive: true,
    },
  },
};

// Template do Quiz de Estilo Pessoal
const STYLE_QUIZ_TEMPLATE: FunnelTemplate = {
  meta: {
    name: 'Quiz Estilo Pessoal - Template Completo',
    description: 'Modelo completo para quiz de estilo pessoal, pronto para sistemas de moda.',
    version: '1.2.3',
    author: 'giselegal',
  },
  design: {
    primaryColor: '#B89B7A',
    secondaryColor: '#1A0F3D',
    accentColor: '#aa6b5d',
    backgroundColor: '#FAF9F7',
    fontFamily: "'Playfair Display', 'Inter', serif",
    button: {
      background: 'linear-gradient(90deg, #B89B7A, #aa6b5d)',
      textColor: '#fff',
      borderRadius: '10px',
      shadow: '0 4px 14px rgba(184, 155, 122, 0.15)',
    },
    card: {
      background: '#fff',
      borderRadius: '16px',
      shadow: '0 4px 20px rgba(184, 155, 122, 0.10)',
    },
    progressBar: {
      color: '#B89B7A',
      background: '#F3E8E6',
      height: '6px',
    },
    animations: {
      questionTransition: 'fade, scale',
      optionSelect: 'glow, scale',
      button: 'hover:scale-105, active:scale-95',
    },
  },
  steps: [
    {
      type: 'intro',
      title: 'Bem-vinda ao Quiz de Estilo',
      descriptionTop: 'Chega de um guarda-roupa lotado e da sensaÃ§Ã£o de que nada combina com VocÃª.',
      imageIntro:
        'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911667/WhatsApp_Image_2025-04-02_at_09.40.53_cv8p5y.jpg',
      descriptionBottom:
        'Em poucos minutos, descubra seu Estilo Predominante â€” e aprenda a montar looks que realmente refletem sua essÃªncia, com praticidade e confianÃ§a.',
    },
    {
      type: 'questions',
      title: 'Perguntas Principais',
      description: 'Selecione 3 opÃ§Ãµes por pergunta para avanÃ§ar.',
      questions: [
        {
          id: '1',
          title: 'QUAL O SEU TIPO DE ROUPA FAVORITA?',
          layout: '2col',
          multiSelect: 3,
          options: [
            {
              id: '1a',
              text: 'Conforto, leveza e praticidade no vestir.',
              imageUrl:
                'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735329/11_hqmr8l.webp',
              styleCategory: 'Natural',
            },
            {
              id: '1b',
              text: 'DiscriÃ§Ã£o, caimento clÃ¡ssico e sobriedade.',
              imageUrl:
                'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/12_edlmwf.webp',
              styleCategory: 'ClÃ¡ssico',
            },
          ],
        },
      ],
    },
    {
      type: 'strategicQuestions',
      title: 'Perguntas EstratÃ©gicas',
      questions: [
        {
          id: 'strategic-1',
          title: 'Como vocÃª se sente em relaÃ§Ã£o ao seu estilo pessoal hoje?',
          imageUrl:
            'https://res.cloudinary.com/dqljyf76t/image/upload/v1746334754/ChatGPT_Image_4_de_mai._de_2025_00_30_44_naqom0.webp',
          layout: '1col',
          options: [
            { id: 'strategic-1-1', text: 'Completamente perdida, nÃ£o sei o que combina comigo' },
            { id: 'strategic-1-2', text: 'Tenho algumas ideias, mas nÃ£o sei como aplicÃ¡-las' },
          ],
        },
      ],
    },
    {
      type: 'result',
      title: 'Resultado',
      description: 'Baseado nas suas respostas, seu estilo predominante Ã©:',
      styles: [
        {
          name: 'Natural',
          image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744735317/2_ziffwx.webp',
          guideImage:
            'https://res.cloudinary.com/dqljyf76t/image/upload/v1745071344/GUIA_NATURAL_fzp6fc.webp',
          description:
            'VocÃª valoriza o conforto e a praticidade, com um visual descontraÃ­do e autÃªntico.',
        },
      ],
      cta: {
        text: 'Ver Guia Completo',
        url: 'https://pay.hotmart.com/W98977034C?checkoutMode=10&bid=1744967466912',
      },
    },
  ],
  logic: {
    selection: {
      normal: 'AvanÃ§a apenas se o mÃ­nimo de seleÃ§Ãµes (multiSelect) for atingido',
      strategic: 'SÃ³ avanÃ§a se selecionar uma opÃ§Ã£o',
    },
    calculation: {
      method: 'Soma ponto por categoria de cada opÃ§Ã£o marcada',
      resultado: 'O estilo com maior pontuaÃ§Ã£o Ã© o predominante',
    },
    transitions: {
      betweenSteps: 'Usa animaÃ§Ã£o fade/scale',
    },
  },
  config: {
    localStorageKeys: ['userName', 'quizAnswers', 'strategicAnswers', 'quizCompletedAt'],
    analyticsEvents: [
      'quiz_started',
      'question_answered',
      'quiz_completed',
      'result_viewed',
      'cta_clicked',
      'conversion',
    ],
    tracking: {
      utmParams: true,
      variant: 'A/B',
      events: 'start, answer, complete, abandon, conversion',
    },
  },
};

interface AgentStep {
  id: string;
  name: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  progress: number;
  duration?: number;
}

const AGENT_STEPS: AgentStep[] = [
  {
    id: 'analyze',
    name: 'Analisando Template',
    description: 'Processando estrutura JSON e validando dados...',
    status: 'pending',
    progress: 0,
  },
  {
    id: 'design',
    name: 'Aplicando Design System',
    description: 'Configurando cores, tipografia e componentes visuais...',
    status: 'pending',
    progress: 0,
  },
  {
    id: 'intro',
    name: 'Criando PÃ¡gina de IntroduÃ§Ã£o',
    description: 'Gerando formulÃ¡rio de entrada com validaÃ§Ã£o...',
    status: 'pending',
    progress: 0,
  },
  {
    id: 'questions',
    name: 'Configurando Perguntas Principais',
    description: 'Criando grids de opÃ§Ãµes com imagens e validaÃ§Ã£o multiselect...',
    status: 'pending',
    progress: 0,
  },
  {
    id: 'transition1',
    name: 'Tela de TransiÃ§Ã£o 1',
    description: 'Implementando animaÃ§Ã£o e loading entre etapas...',
    status: 'pending',
    progress: 0,
  },
  {
    id: 'strategic',
    name: 'Perguntas EstratÃ©gicas',
    description: 'Configurando questÃµes de segmentaÃ§Ã£o e qualificaÃ§Ã£o...',
    status: 'pending',
    progress: 0,
  },
  {
    id: 'transition2',
    name: 'Tela de TransiÃ§Ã£o 2',
    description: 'Preparando cÃ¡lculo de resultados...',
    status: 'pending',
    progress: 0,
  },
  {
    id: 'result',
    name: 'PÃ¡gina de Resultado',
    description: 'Gerando resultados personalizados com CTAs...',
    status: 'pending',
    progress: 0,
  },
  {
    id: 'logic',
    name: 'Sistema de CÃ¡lculo',
    description: 'Implementando lÃ³gica de pontuaÃ§Ã£o por categoria...',
    status: 'pending',
    progress: 0,
  },
  {
    id: 'analytics',
    name: 'Configurando Analytics',
    description: 'Integrando eventos de tracking e conversÃ£o...',
    status: 'pending',
    progress: 0,
  },
  {
    id: 'optimize',
    name: 'OtimizaÃ§Ãµes Finais',
    description: 'Aplicando performance e responsividade...',
    status: 'pending',
    progress: 0,
  },
  {
    id: 'deploy',
    name: 'Publicando Funil',
    description: 'Disponibilizando funil para acesso pÃºblico...',
    status: 'pending',
    progress: 0,
  },
];

const TemplatesIA: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [steps, setSteps] = useState<AgentStep[]>(AGENT_STEPS);
  const [generatedFunnelId, setGeneratedFunnelId] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<'STYLE_QUIZ' | 'STYLE_CONSULTANT'>(
    'STYLE_QUIZ'
  );
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const AVAILABLE_TEMPLATES = {
    STYLE_QUIZ: STYLE_QUIZ_TEMPLATE,
    STYLE_CONSULTANT: STYLE_CONSULTANT_TEMPLATE,
  };

  const getCurrentTemplate = () => AVAILABLE_TEMPLATES[selectedTemplate];

  // ValidaÃ§Ãµes de seleÃ§Ã£o
  const validateSelection = () => {
    if (!selectedTemplate) {
      toast({
        title: 'âš ï¸ Template nÃ£o selecionado',
        description: 'Por favor, selecione um template antes de continuar.',
        variant: 'destructive',
      });
      return false;
    }

    const template = getCurrentTemplate();
    if (!template) {
      toast({
        title: 'âŒ Erro no Template',
        description: 'Template selecionado nÃ£o encontrado. Tente novamente.',
        variant: 'destructive',
      });
      return false;
    }

    return true;
  };

  const updateStepStatus = (stepId: string, status: AgentStep['status'], progress: number) => {
    setSteps(prev => prev.map(step => (step.id === stepId ? { ...step, status, progress } : step)));
  };

  const simulateAgentWork = async () => {
    if (!validateSelection()) return;

    setIsGenerating(true);
    setCurrentStep(0);

    // Reset all steps to pending
    setSteps(prev => prev.map(step => ({ ...step, status: 'pending', progress: 0 })));

    const template = getCurrentTemplate();
    const agent = new FunnelAIAgent((stepId, status, progress) => {
      updateStepStatus(stepId, status, progress);
      const stepIndex = AGENT_STEPS.findIndex(s => s.id === stepId);
      if (stepIndex >= 0) {
        setCurrentStep(stepIndex);
      }
    });

    try {
      const funnelId = await agent.generateFunnel(template);
      setGeneratedFunnelId(funnelId);
      setIsGenerating(false);
      setCurrentStep(-1);

      const templateName = getCurrentTemplate().meta.name;
      toast({
        title: 'âœ… Funil Criado com Sucesso!',
        description: `${templateName} criado dinamicamente com IA. ID: ${funnelId}`,
      });
    } catch (error) {
      console.error('Erro ao gerar funil:', error);
      setIsGenerating(false);
      setCurrentStep(-1);

      toast({
        title: 'âŒ Erro na GeraÃ§Ã£o',
        description: 'Houve um problema ao gerar o funil. Tente novamente.',
        variant: 'destructive',
      });
    }
  };

  const handlePreview = () => {
    if (generatedFunnelId) {
      setLocation(`/quiz/${generatedFunnelId}`);
    }
  };

  const handleEditInEditor = () => {
    if (generatedFunnelId) {
      setLocation(`/editor?template=${generatedFunnelId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div style={{ borderColor: '#E5DDD5' }}>
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 style={{ color: '#1A0F3D' }}>Templates IA</h1>
              <p style={{ color: '#6B4F43' }}>
                CriaÃ§Ã£o dinÃ¢mica de funis com InteligÃªncia Artificial
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Coluna Esquerda - Template Selector */}
          <div className="space-y-6">
            {/* Seletor de Templates */}
            <div className="grid grid-cols-1 gap-4">
              <Card
                className={`cursor-pointer border-2 transition-all ${
                  selectedTemplate === 'STYLE_QUIZ'
                    ? 'border-purple-400 bg-gradient-to-br from-purple-50 to-blue-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
                onClick={() => setSelectedTemplate('STYLE_QUIZ')}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <Sparkles style={{ color: '#B89B7A' }} />
                    <div className="flex-1">
                      <CardTitle style={{ color: '#1A0F3D' }}>Quiz de Estilo Pessoal</CardTitle>
                      <p style={{ color: '#B89B7A' }}>Template Premium - 21 Etapas</p>
                    </div>
                    {selectedTemplate === 'STYLE_QUIZ' && <Check style={{ color: '#B89B7A' }} />}
                  </div>
                </CardHeader>
              </Card>

              <Card
                className={`cursor-pointer border-2 transition-all ${
                  selectedTemplate === 'STYLE_CONSULTANT'
                    ? 'border-purple-400 bg-gradient-to-br from-purple-50 to-pink-50'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
                onClick={() => setSelectedTemplate('STYLE_CONSULTANT')}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <Bot style={{ color: '#B89B7A' }} />
                    <div className="flex-1">
                      <CardTitle style={{ color: '#1A0F3D' }}>Com que Roupa eu Vou?</CardTitle>
                      <p style={{ color: '#B89B7A' }}>Consultora de Estilo IA - Nova!</p>
                    </div>
                    {selectedTemplate === 'STYLE_CONSULTANT' && (
                      <Check style={{ color: '#B89B7A' }} />
                    )}
                  </div>
                </CardHeader>
              </Card>
            </div>

            {/* Preview do Template Selecionado */}
            <Card style={{ borderColor: '#E5DDD5' }}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  {selectedTemplate === 'STYLE_QUIZ' ? (
                    <Sparkles style={{ color: '#B89B7A' }} />
                  ) : (
                    <Bot style={{ color: '#B89B7A' }} />
                  )}
                  <div>
                    <CardTitle style={{ color: '#1A0F3D' }}>
                      {getCurrentTemplate().meta.name}
                    </CardTitle>
                    <p style={{ color: '#B89B7A' }}>{getCurrentTemplate().meta.description}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div style={{ borderColor: '#E5DDD5' }}>
                  {selectedTemplate === 'STYLE_QUIZ' ? (
                    <img
                      src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911667/WhatsApp_Image_2025-04-02_at_09.40.53_cv8p5y.jpg"
                      alt="Preview do Quiz"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop"
                      alt="Preview da Consultoria"
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-white/50 rounded-lg p-3">
                    <div style={{ color: '#6B4F43' }}>Etapas</div>
                    <div style={{ color: '#1A0F3D' }}>
                      {getCurrentTemplate().steps.length} PÃ¡ginas
                    </div>
                  </div>
                  <div className="bg-white/50 rounded-lg p-3">
                    <div style={{ color: '#6B4F43' }}>Tipos</div>
                    <div style={{ color: '#1A0F3D' }}>8 Estilos</div>
                  </div>
                  <div className="bg-white/50 rounded-lg p-3">
                    <div style={{ color: '#6B4F43' }}>Imagens</div>
                    <div style={{ color: '#1A0F3D' }}>40+ Assets</div>
                  </div>
                  <div className="bg-white/50 rounded-lg p-3">
                    <div style={{ color: '#6B4F43' }}>Analytics</div>
                    <div style={{ color: '#1A0F3D' }}>Completo</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" style={{ color: '#6B4F43' }}>
                    <Wand2 className="w-3 h-3 mr-1" />
                    IA Powered
                  </Badge>
                  <Badge variant="secondary" style={{ backgroundColor: '#E5DDD5' }}>
                    Responsivo
                  </Badge>
                  <Badge variant="secondary" style={{ backgroundColor: '#E5DDD5' }}>
                    Analytics
                  </Badge>
                  <Badge variant="secondary" style={{ backgroundColor: '#E5DDD5' }}>
                    ConversÃ£o
                  </Badge>
                </div>

                {!generatedFunnelId && (
                  <Button
                    onClick={simulateAgentWork}
                    disabled={isGenerating}
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
                    size="lg"
                  >
                    {isGenerating ? (
                      <>
                        <Bot className="w-4 h-4 mr-2 animate-spin" />
                        Agente IA Trabalhando...
                      </>
                    ) : (
                      <>
                        <Wand2 className="w-4 h-4 mr-2" />
                        Criar Funil com IA
                      </>
                    )}
                  </Button>
                )}

                {generatedFunnelId && (
                  <div className="space-y-3">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-green-800 font-medium mb-2">
                        <Check className="w-4 h-4" />
                        Funil Criado com Sucesso!
                      </div>
                      <div className="text-green-600 text-sm">
                        ID: <code style={{ backgroundColor: '#E5DDD5' }}>{generatedFunnelId}</code>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        onClick={handlePreview}
                        variant="outline"
                        style={{ backgroundColor: '#FAF9F7' }}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                      <Button
                        onClick={handleEditInEditor}
                        className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Editar
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Coluna Direita - Progresso do Agente */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Bot style={{ color: '#B89B7A' }} />
                    <div>
                      <CardTitle>Agente IA em AÃ§Ã£o</CardTitle>
                      <p style={{ color: '#6B4F43' }}>Processamento automÃ¡tico do template</p>
                    </div>
                  </div>
                  {isGenerating && (
                    <Badge variant="secondary" style={{ backgroundColor: '#E5DDD5' }}>
                      Trabalhando...
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {steps.map((step, index) => (
                    <div key={step.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div
                            className={`
                            w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                            ${
                              step.status === 'completed'
                                ? 'bg-green-100 text-green-700'
                                : step.status === 'processing'
                                  ? 'bg-blue-100 text-blue-700 animate-pulse'
                                  : step.status === 'error'
                                    ? 'bg-red-100 text-red-700'
                                    : 'bg-gray-100 text-gray-500'
                            }
                          `}
                          >
                            {step.status === 'completed' ? (
                              <Check className="w-4 h-4" />
                            ) : step.status === 'processing' ? (
                              <Bot className="w-4 h-4 animate-spin" />
                            ) : (
                              index + 1
                            )}
                          </div>
                          <div>
                            <div style={{ color: '#1A0F3D' }}>{step.name}</div>
                            <div style={{ color: '#8B7355' }}>{step.description}</div>
                          </div>
                        </div>
                        {step.status === 'processing' && (
                          <div style={{ color: '#B89B7A' }}>{step.progress}%</div>
                        )}
                      </div>
                      {step.status === 'processing' && (
                        <Progress value={step.progress} className="h-2" />
                      )}
                    </div>
                  ))}
                </div>

                {isGenerating && currentStep >= 0 && (
                  <div style={{ backgroundColor: '#FAF9F7' }}>
                    <div className="flex items-center gap-2 text-blue-800">
                      <Bot className="w-4 h-4 animate-spin" />
                      <span className="font-medium">Executando: {steps[currentStep]?.name}</span>
                    </div>
                    <div style={{ color: '#B89B7A' }}>{steps[currentStep]?.description}</div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* InformaÃ§Ãµes do Template */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">EspecificaÃ§Ãµes TÃ©cnicas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div style={{ color: '#6B4F43' }}>VersÃ£o Template</div>
                    <div className="font-mono">{getCurrentTemplate().meta.version}</div>
                  </div>
                  <div>
                    <div style={{ color: '#6B4F43' }}>Autor</div>
                    <div className="font-medium">{getCurrentTemplate().meta.author}</div>
                  </div>
                  <div>
                    <div style={{ color: '#6B4F43' }}>Cor PrimÃ¡ria</div>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded border"
                        style={{ backgroundColor: getCurrentTemplate().design.primaryColor }}
                      ></div>
                      <span className="font-mono text-xs">
                        {getCurrentTemplate().design.primaryColor}
                      </span>
                    </div>
                  </div>
                  <div>
                    <div style={{ color: '#6B4F43' }}>Total Etapas</div>
                    <div className="font-bold">{getCurrentTemplate().steps.length}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div style={{ color: '#6B4F43' }}>Funcionalidades IncluÃ­das:</div>
                  <div className="flex flex-wrap gap-1">
                    {selectedTemplate === 'STYLE_QUIZ'
                      ? [
                          'Multiselect',
                          'ValidaÃ§Ã£o',
                          'AnimaÃ§Ãµes',
                          'Analytics',
                          'Responsive',
                          'CÃ¡lculo IA',
                          'CTAs DinÃ¢micos',
                          'Tracking UTM',
                        ]
                      : [
                          'GeraÃ§Ã£o de IA',
                          'Processamento de Imagem',
                          'Captura de Email',
                          'Compartilhamento Social',
                          'FormulÃ¡rios Inteligentes',
                          'CTA Personalizado',
                          'Analytics AvanÃ§ado',
                          'API Integrations',
                        ]}

                    {(selectedTemplate === 'STYLE_QUIZ'
                      ? [
                          'Multiselect',
                          'ValidaÃ§Ã£o',
                          'AnimaÃ§Ãµes',
                          'Analytics',
                          'Responsive',
                          'CÃ¡lculo IA',
                          'CTAs DinÃ¢micos',
                          'Tracking UTM',
                        ]
                      : [
                          'GeraÃ§Ã£o de IA',
                          'Processamento de Imagem',
                          'Captura de Email',
                          'Compartilhamento Social',
                          'FormulÃ¡rios Inteligentes',
                          'CTA Personalizado',
                          'Analytics AvanÃ§ado',
                          'API Integrations',
                        ]
                    ).map(feature => (
                      <Badge key={feature} variant="outline" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer */}
        <div style={{ color: '#8B7355' }}>
          <div className="flex items-center justify-center gap-2 mb-2">
            <Bot className="w-4 h-4" />
            <span className="text-sm">Powered by IA Agent System</span>
          </div>
          <div className="text-xs">
            Â© 2025 Quiz Quest Challenge Verse - Templates dinÃ¢micos com InteligÃªncia Artificial
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplatesIA;

