import React, { Suspense, lazy } from "react";
import { Router, Route, Switch } from "wouter";
import { QuizProvider } from "./context/QuizContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

// Loading component for Suspense
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-white">
    <LoadingSpinner size="lg" />
  </div>
);

// Lazy loaded pages
const LandingPage = lazy(() => import("./pages/LandingPage"));
const QuizPage = lazy(() => import("./components/QuizPage"));
const TestResultPage = lazy(() => import("./pages/TestResultPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

const App = () => {
  return (
    <QuizProvider>
      <TooltipProvider>
        <Router>
          <Suspense fallback={<LoadingFallback />}>
            <Switch>
              {/* Main routes */}
              <Route path="/" component={LandingPage} />
              <Route path="/quiz" component={QuizPage} />
              <Route path="/test-resultado" component={TestResultPage} />
              
              {/* 404 - Fallback for not found routes */}
              <Route path="*" component={NotFoundPage} />
            </Switch>
          </Suspense>
        </Router>
        <Toaster />
      </TooltipProvider>
    </QuizProvider>
  );
};

export default App;
