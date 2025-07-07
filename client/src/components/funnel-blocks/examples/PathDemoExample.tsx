import React from 'react';
import { FunnelConfigProvider } from '../editor/FunnelConfigProvider';
import FunnelIntroStep from '../steps/FunnelIntroStep';

/**
 * Exemplo para demonstrar o uso correto de caminhos no projeto
 */
const PathDemoExample: React.FC = () => {
  // Dados de exemplo
  const exampleData = {
    title: "Demonstração de Caminhos Corretos",
    subtitle: "Este exemplo mostra como usar os caminhos relativos corretamente",
    buttonText: "Entendi!",
    logoUrl: "/logo.png",
    showProgressBar: true
  };

  // Função de exemplo para navegação
  const handleNext = () => {
    console.log('Navegação funcionando corretamente!');
  };

  return (
    <div className="example-container">
      <div className="path-info">
        <h2>Caminhos Corretos no Projeto</h2>
        <ul>
          <li>
            <code className="correct">import FunnelIntroStep from '../steps/FunnelIntroStep'</code>
            <span className="badge success">✅ Correto</span>
          </li>
          <li>
            <code className="incorrect">import FunnelIntroStep from '/client/src/components/funnel-blocks/steps/FunnelIntroStep'</code>
            <span className="badge error">❌ Incorreto</span>
          </li>
        </ul>
      </div>
      
      <div className="preview-container">
        <h3>Componente de Exemplo</h3>
        <FunnelConfigProvider>
          <FunnelIntroStep
            id="path-demo"
            stepNumber={1}
            totalSteps={21}
            stepType="intro"
            onNext={handleNext}
            data={exampleData}
          />
        </FunnelConfigProvider>
      </div>
    </div>
  );
};

export default PathDemoExample;
