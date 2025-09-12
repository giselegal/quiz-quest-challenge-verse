import React from 'react';
import { NewUnifiedEditor } from '@/components/editor/NewUnifiedEditor';
import { EditorProvider } from '@/components/editor/EditorProvider';

interface MainEditorIntegratorProps {
    className?: string;
    funnelId?: string;
    initialConfig?: any;
}

/**
 * MainEditorIntegrator - Conecta o novo editor unificado
 * com toda a infraestrutura existente de contextos e providers
 */
const MainEditorIntegrator: React.FC<MainEditorIntegratorProps> = ({
    className = '',
    funnelId,
    initialConfig
}) => {
    return (
        <div className={`main-editor-integrator ${className}`}>
            <EditorProvider>
                <NewUnifiedEditor />
            </EditorProvider>
        </div>
    );
};

export default MainEditorIntegrator;