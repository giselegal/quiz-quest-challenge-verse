
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/context/AuthContext';
import { QuizProvider } from '@/context/QuizContext';
import QuizPage from '@/components/QuizPage';
import ResultPage from '@/pages/ResultPage';
import LoadingAccessPage from '@/pages/LoadingAccessPage';
import { SupabaseConnectionTest } from '@/components/SupabaseConnectionTest';

function App() {
  return (
    <AuthProvider>
      <QuizProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<QuizPage />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="/loading" element={<LoadingAccessPage />} />
            <Route path="/test" element={<SupabaseConnectionTest />} />
          </Routes>
          <Toaster />
        </div>
      </QuizProvider>
    </AuthProvider>
  );
}

export default App;
