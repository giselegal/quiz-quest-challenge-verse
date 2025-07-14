/**
 * PÁGINA DE TESTE: Canvas Configuration Testing
 * 
 * Página dedicada para testar e validar as configurações do canvas das etapas 20 e 21
 */

import React from 'react';
import CanvasConfigurationTester from '@/components/testing/CanvasConfigurationTester';

const CanvasConfigurationTestPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <CanvasConfigurationTester />
    </div>
  );
};

export default CanvasConfigurationTestPage;
