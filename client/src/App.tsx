
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import LovableClientProvider from '@/components/LovableClientProvider';

// Importação direta (sem lazy loading)
import HomePage from '@/pages/HomePage';
import QuizPage from '@/pages/QuizPage';
import ResultPage from '@/pages/ResultPage';
import EditorPage from '@/pages/EditorPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

function App() {
  return (
    <LovableClientProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Router>
            <div className="min-h-screen bg-background">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/quiz-descubra-seu-estilo" element={<QuizPage />} />
                <Route path="/resultado/:participantId?" element={<ResultPage />} />
                <Route path="/editor/:style?" element={<EditorPage />} />
                <Route path="/editor-visual/:style?" element={<EditorPage />} />
                <Route path="/simple-editor/:style?" element={<EditorPage />} />
              </Routes>
              <Toaster />
            </div>
          </Router>
        </TooltipProvider>
      </QueryClientProvider>
    </LovableClientProvider>
  );
}

export default App;
