import React from 'react';
import { SimpleRevolutionaryEditor } from '@/components/editor/SimpleRevolutionaryEditor';

interface MainEditorIntegratorProps {
    funnelId?: string;
    initialConfig?: any;
}

/**
 * MainEditorIntegrator - Conecta o novo editor revolucionário
 * com toda a infraestrutura existente de contextos e providers
 */
export const MainEditorIntegrator: React.FC<MainEditorIntegratorProps> = () => {
    return (
        <div className="h-screen bg-gray-50">
            <SimpleRevolutionaryEditor />
        </div>
    );
};

export default MainEditorIntegrator;