import React from "react";
import { useLocation } from "wouter";

/**
 * Landing page for the quiz application
 */
const LandingPage: React.FC = () => {
  const [, setLocation] = useLocation();

  // Redirect to quiz page
  React.useEffect(() => {
    setLocation("/quiz");
  }, [setLocation]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-4 border-[#B89B7A] border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gray-600 text-sm">Redirecionando para o quiz...</p>
      </div>
    </div>
  );
};

export default LandingPage;