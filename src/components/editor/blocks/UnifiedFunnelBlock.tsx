import React from 'react';
import FunnelHeroSection from '@/components/funnel/base/FunnelHeroSection';
import FunnelPainSection from '@/components/funnel/base/FunnelPainSection';
import type { BlockComponentProps } from '@/types/blocks';

/**
 * UnifiedFunnelBlock - Wrapper que usa componentes base do funil real
 * 
 * Este componente serve como bridge entre o sistema de blocos do editor
 * e os componentes reais do funil, garantindo 100% de fidelidade visual.
 * 
 * Features:
 * - Usa exatamente os mesmos componentes do funil real
 * - Edição apenas via painel de propriedades (não inline)
 * - Selecionável e movível no canvas
 * - Renderização idêntica ao funil real
 */
interface UnifiedFunnelBlockProps extends BlockComponentProps {
  // Props adicionais podem ser adicionadas aqui se necessário
}

const UnifiedFunnelBlock: React.FC<UnifiedFunnelBlockProps> = ({
  block,
  isSelected = false,
  onClick,
  className = '',
}) => {
  // Validação defensiva
  if (!block || !block.properties) {
    return (
      <div className="p-4 border-2 border-red-300 bg-red-50 rounded-lg">
        <p className="text-red-600 font-medium">Erro: Configuração do bloco inválida</p>
        <p className="text-sm text-red-500 mt-1">
          O componente precisa de um objeto 'block' com 'properties' válidas.
        </p>
      </div>
    );
  }

  // Renderizar o componente correto baseado no tipo
  switch (block.type) {
    case 'FunnelHeroBlock':
      return (
        <FunnelHeroSection
          title={block.properties.title || 'Título do Hero'}
          description={block.properties.description || 'Descrição do hero section'}
          ctaText={block.properties.ctaText || 'Call to Action'}
          {...block.properties}
          isSelected={isSelected}
          onClick={onClick}
          className={className}
        />
      );

    case 'FunnelPainBlock':
      return (
        <FunnelPainSection
          title={block.properties.title || 'Problemas que Resolvemos'}
          painPoints={block.properties.painPoints || []}
          {...block.properties}
          isSelected={isSelected}
          onClick={onClick}
          className={className}
        />
      );

    default:
      return (
        <div className="p-4 border-2 border-yellow-300 bg-yellow-50 rounded-lg">
          <p className="text-yellow-600 font-medium">
            Tipo de bloco não suportado: {block.type}
          </p>
          <p className="text-sm text-yellow-500 mt-1">
            Adicione o suporte para este tipo no UnifiedFunnelBlock.
          </p>
        </div>
      );
  }
};

export default UnifiedFunnelBlock;
