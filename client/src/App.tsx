
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/context/AuthContext';
import { QuizProvider } from '@/context/QuizContext';
import { SupabaseConnectionTest } from '@/components/SupabaseConnectionTest';

// Import pages
import QuizPage from '@/components/QuizPage';
import QuizResult from '@/pages/QuizResultPage';
import LoadingAccessPage from '@/pages/LoadingAccessPage';

function App() {
  return (
    <AuthProvider>
      <QuizProvider>
        <Router>
          <div className="min-h-screen bg-background">
            {/* Connection Test - Temporary */}
            <div className="fixed top-4 right-4 z-50 max-w-sm">
              <SupabaseConnectionTest />
            </div>
            
            <Routes>
              <Route path="/" element={<QuizPage />} />
              <Route path="/resultado" element={<QuizResult />} />
              <Route path="/loading/:route" element={<LoadingAccessPage />} />
              <Route path="*" element={<QuizPage />} />
            </Routes>
            
            <Toaster />
          </div>
        </Router>
      </QuizProvider>
    </AuthProvider>
  );
}

export default App;
