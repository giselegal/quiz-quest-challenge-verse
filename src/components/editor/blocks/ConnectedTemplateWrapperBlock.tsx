import ConnectedTemplateWrapper from '@/components/quiz/ConnectedTemplateWrapper';
import type { BlockData } from '@/types/blocks';
import { cn } from '@/lib/utils';
import React from 'react';

interface ConnectedTemplateWrapperBlockProps {
  block?: {
    id: string;
    type: string;
    properties?: {
      stepNumber?: number;
      stepType?: string;
      sessionId?: string;
      className?: string;
      backgroundColor?: string;
      padding?: string;
      children?: any[];
      // Configurações JSON exportáveis
      wrapperConfig?: {
        stepNumber: number;
        stepType: 'intro' | 'question' | 'result';
        sessionId: string;
        enableHooks: boolean;
        trackingEnabled: boolean;
        validationEnabled: boolean;
      };
    };
    content?: any;
  };
  children?: React.ReactNode;
  onPropertyChange?: (key: string, value: any) => void;
}

/**
 * 🎯 CONNECTED TEMPLATE WRAPPER BLOCK
 * ✅ Componente avançado com hooks integrados
 * ✅ Configuração JSON exportável
 * ✅ Compatível com editor de blocos
 */
const ConnectedTemplateWrapperBlock: React.FC<ConnectedTemplateWrapperBlockProps> = ({
  block,
  children,
  onPropertyChange: _onPropertyChange,
}) => {
  const properties = block?.properties || {};
  const {
    stepNumber = 1,
    stepType = 'question',
    sessionId = 'default-session',
    className = '',
    backgroundColor = 'transparent',
    padding = 'p-0',
    wrapperConfig,
  } = properties;

  // Fonte de verdade para filhos: suporta tanto React children quanto children declarados nas propriedades do bloco
  const childrenList = (block as any)?.children || (properties as any)?.children || [];

  // Se tem configuração JSON, usar ela
  const config = wrapperConfig || {
    stepNumber,
    stepType,
    sessionId,
    enableHooks: true,
    trackingEnabled: true,
    validationEnabled: true,
  };

  // Removed unused handlePropertyUpdate function

  return (
    <div
      className={cn('connected-template-wrapper-block', className, padding)}
      style={{ backgroundColor }}
    >
      {config.enableHooks ? (
        <ConnectedTemplateWrapper
          stepNumber={config.stepNumber}
          stepType={config.stepType as any}
          sessionId={config.sessionId}
        >
          {/* Renderizar filhos declarados via template (properties.children) */}
          {Array.isArray(childrenList) && childrenList.length > 0
            ? childrenList.map((child: any, index: number) => {
              // Renderização simples sem dependência circular
              if (!child || !child.type) return null;

              const childBlock: BlockData = {
                id: child.id || `${block?.id}-child-${index}`,
                type: child.type,
                properties: child.properties || {},
                content: child.content || {},
                order: index,
              };

              return (
                <div key={childBlock.id} className="template-child">
                  {child.content || child.properties?.content || `[${child.type}]`}
                </div>
              );
            })
            : // Ou, se nenhum filho foi declarado nas propriedades, renderiza os filhos React passados
            children}
        </ConnectedTemplateWrapper>
      ) : (
        // Fallback sem hooks para casos especiais
        <div className="template-wrapper-fallback">
          {Array.isArray(childrenList) && childrenList.length > 0
            ? childrenList.map((child: any, index: number) => {
              // Renderização simples sem dependência circular
              if (!child || !child.type) return null;

              const childBlock: BlockData = {
                id: child.id || `${block?.id}-child-${index}`,
                type: child.type,
                properties: child.properties || {},
                content: child.content || {},
                order: index,
              };

              return (
                <div key={childBlock.id} className="template-child">
                  {child.content || child.properties?.content || `[${child.type}]`}
                </div>
              );
            })
            : children}
        </div>
      )}
    </div>
  );
};

export default ConnectedTemplateWrapperBlock;

// ✅ CONFIGURAÇÃO JSON EXPORTÁVEL
export const getConnectedTemplateWrapperConfig = (stepNumber: number, stepType = 'question') => ({
  id: `connected-wrapper-step-${stepNumber}`,
  type: 'connected-template-wrapper',
  properties: {
    wrapperConfig: {
      stepNumber,
      stepType,
      sessionId: `quiz-session-${Date.now()}`,
      enableHooks: true,
      trackingEnabled: true,
      validationEnabled: true,
    },
    className: 'min-h-screen',
    backgroundColor: 'transparent',
    padding: 'p-0',
  },
});
