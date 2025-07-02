# Quiz Sell Genius

## Overview

Quiz Sell Genius is a full-stack web application built for creating and managing interactive style quizzes with integrated sales funnels. The application helps users discover their personal style through an engaging quiz experience and guides them toward purchasing style guides and consultations.

## System Architecture

The application follows a modern full-stack architecture with clear separation between frontend and backend:

- **Frontend**: React SPA (Single Page Application) using Vite as the build tool
- **Backend**: Express.js server with Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **Shared Code**: Common schemas and types shared between frontend and backend
- **Build System**: Vite for frontend bundling and esbuild for backend compilation

## Key Components

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: React Router for client-side navigation
- **UI Library**: Custom components built with Radix UI primitives and styled with Tailwind CSS
- **State Management**: React Context API for authentication and quiz state
- **Forms**: React Hook Form with Zod validation
- **Animations**: Framer Motion for smooth transitions
- **Styling**: Tailwind CSS with custom design tokens and CSS variables

### Backend Architecture
- **Server**: Express.js with TypeScript
- **Database**: PostgreSQL hosted on Neon with connection pooling
- **ORM**: Drizzle for type-safe database operations
- **Storage**: In-memory storage implementation with interface for easy switching to database
- **Session Management**: Express sessions with PostgreSQL store

### UI System
- **Design System**: Shadcn/ui components with "new-york" style
- **Theme**: Custom color palette with neutral base colors
- **Components**: Modular, reusable components with proper TypeScript interfaces
- **Responsive Design**: Mobile-first approach with Tailwind responsive utilities

## Data Flow

1. **Quiz Flow**: Users start with name input → answer style questions → receive personalized results
2. **Authentication**: Simple name-based authentication stored in localStorage and context
3. **Results Calculation**: Client-side scoring algorithm determines primary and secondary styles
4. **Data Persistence**: Quiz responses and results can be stored via the storage interface
5. **Analytics**: Facebook Pixel integration for tracking user interactions and conversions

## External Dependencies

### Core Dependencies
- **React Ecosystem**: React, React Router, React Hook Form, React Query
- **UI Components**: Radix UI primitives for accessible components
- **Database**: Drizzle ORM with Neon PostgreSQL adapter
- **Styling**: Tailwind CSS with PostCSS
- **Forms**: React Hook Form with Hookform Resolvers
- **Validation**: Zod for schema validation
- **Date Handling**: date-fns for date manipulation

### Development Tools
- **Build Tool**: Vite with React plugin
- **TypeScript**: Full TypeScript support across the stack
- **Linting**: ESLint configuration
- **Database Migrations**: Drizzle Kit for schema management

### External Integrations
- **Analytics**: Facebook Pixel for conversion tracking
- **Image Hosting**: Cloudinary for optimized image delivery
- **Payment Processing**: Hotmart integration for product sales
- **Session Storage**: Connect-pg-simple for PostgreSQL session store

## Deployment Strategy

The application is configured for deployment on Replit with the following setup:

- **Development**: `npm run dev` runs both frontend (Vite) and backend (tsx) in development mode
- **Build**: `npm run build` creates optimized production builds for both frontend and backend
- **Production**: `npm start` serves the compiled application
- **Database**: Drizzle migrations with `npm run db:push` for schema updates

The build process:
1. Frontend builds to `dist/public` using Vite
2. Backend compiles to `dist/index.js` using esbuild
3. Static files are served by Express in production
4. Environment variables handle database connections and external service configurations

## Changelog

```
Changelog:
- July 02, 2025. SimpleDragDropEditor Cleanup and Key Issues Fix:
  * ⚠️ IDENTIFIED ISSUE: React keys duplicated in FunnelSteps causing warnings
  * ⚠️ IDENTIFIED ISSUE: TypeScript errors in saveVersion and startAutoSave calls
  * 🔧 IN PROGRESS: Fixing unique ID generation for page templates
  * 🔧 IN PROGRESS: Correcting TypeScript function signatures
  * 🎯 GOAL: Restore fully functional editor without warnings
- July 02, 2025. Quiz Sell Genius - Complete Integration SimpleDragDropEditor → Live Quiz Routes:
  * ✅ IMPLEMENTED ALL 18 REAL QUIZ STEPS from document:
    - 10 questões normais (Q1-Q10): Roupa favorita, Personalidade, Visual, Detalhes, Estampas, Casaco, Calça, Sapatos, Acessórios, Tecidos
    - 7 questões estratégicas (S1-S6 + transições): Como se vê hoje, Desafios ao se vestir, Frequência de indecisão, Interesse em material, Preço R$97, Resultados desejados
    - 2 páginas de transição estratégica conforme documento
  * ✅ SimpleDragDropEditor 100% conectado com rotas funcionais (/quiz, /resultado, /quiz-descubra-seu-estilo)
  * ✅ Hook useQuizConfig implementado carregando configurações do localStorage
  * ✅ Auto-save automático de todas as configurações do editor
  * ✅ QuizIntro.tsx modificado como exemplo prático da integração funcionando
  * ✅ Todas as questões com imagens reais do Cloudinary e pontuação por estilo
  * ✅ Templates organizados por categoria no editor: Básicos, Interativos, Vendas
  * ✅ Sistema de múltipla escolha (até 3 seleções) implementado nas questões normais
  * ✅ Questões estratégicas com categorização para segmentação de leads
- July 02, 2025. Migration from Lovable to Replit completed successfully:
  * Converted ALL routing from React Router to Wouter (QuizPage, ResultPage, NotFoundPage, SimpleEditor)
  * Migrated database from Supabase to PostgreSQL with Drizzle ORM
  * Set up server-side API endpoints for UTM analytics and quiz data
  * Fixed SimpleDragDropEditor null safety issues with optional chaining
  * Core application fully functional: A/B testing, quiz flow, Facebook Pixel tracking, routing, analytics
  * All main business functionality operational and ready for users
- January 01, 2025. Initial setup
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```