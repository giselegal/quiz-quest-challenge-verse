// Configuração raiz para Lovable.dev
export default {
  projectId: "quiz-sell-genius",
  name: "Quiz Quest Challenge Verse",
  description: "Sistema de quiz interativo com editor Lovable integrado",
  version: "1.0.0",
  
  // Configurações essenciais para Lovable.dev
  framework: "react-typescript",
  buildTool: "vite",
  
  // Estrutura do projeto
  rootDir: ".",
  srcDir: "client/src",
  publicDir: "client/public",
  
  // Componentes Lovable
  components: {
    dir: "client/src/components/lovable",
    pattern: "**/*.lovable.{ts,tsx,js,jsx}"
  },
  
  // Configurações do editor
  editor: {
    enabled: true,
    port: 8080,
    routes: [
      "/",
      "/admin", 
      "/dashboard",
      "/resultado/*"
    ]
  },
  
  // Build settings
  build: {
    outDir: "dist",
    assetsDir: "assets"
  },
  
  // Configurações específicas para deployment
  deploy: {
    platform: "lovable",
    autoPublish: false
  },
  
  // Metadados para Lovable.dev
  metadata: {
    category: "quiz-builder",
    tags: ["quiz", "forms", "funnel", "conversion"],
    language: "pt-BR"
  }
};
