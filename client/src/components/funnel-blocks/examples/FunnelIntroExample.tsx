import React from 'react';
import FunnelIntroStep from '../steps/FunnelIntroStep';
import { FunnelConfigProvider } from '../editor/FunnelConfigProvider';

/**
 * Exemplo de uso do componente FunnelIntroStep
 * 
 * Este exemplo demonstra como usar o componente em um aplicativo real.
 */
const FunnelIntroExample: React.FC = () => {
  const handleNext = () => {
    console.log('Próxima etapa');
    // Aqui você implementaria a lógica para ir para a próxima etapa
  };

  // Exemplo de dados para o componente
  const exampleData = {
    title: "Descubra seu Estilo Pessoal",
    subtitle: "Responda algumas perguntas simples e receba uma análise personalizada do seu estilo único",
    buttonText: "Iniciar meu Quiz",
    backgroundImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200",
    logoUrl: "https://placehold.co/200x80/white/black?text=Brand",
    showProgressBar: true
  };

  return (
    <FunnelConfigProvider>
      <div className="w-full h-screen">
        <FunnelIntroStep
          id="intro-example"
          stepNumber={1}
          totalSteps={21}
          stepType="intro"
          onNext={handleNext}
          data={exampleData}
        />
      </div>
    </FunnelConfigProvider>
  );
};

export default FunnelIntroExample;
