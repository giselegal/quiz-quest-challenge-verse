/**
 * 🎯 DEMONSTRAÇÃO DO UNIVERSAL STEP EDITOR PRO
 * 
 * Este é um exemplo de como usar o editor híbrido definitivo que combina:
 * ✅ Arquitetura robusta do EditorPro
 * ✅ Painéis de propriedades detalhados do UniversalStepEditor
 * ✅ UX responsivo e modular
 */

import React from 'react';
import UniversalStepEditorPro from '@/components/editor/universal/UniversalStepEditorPro';
import { EditorProvider } from '@/components/editor/EditorProvider';

const UniversalStepEditorProDemo: React.FC = () => {
    const handleStepChange = (stepId: string) => {
        console.log('Step changed to:', stepId);
    };

    return (
        <EditorProvider>
            <div className="w-full h-screen overflow-hidden bg-gray-900">
                <UniversalStepEditorPro
                    onStepChange={handleStepChange}
                    showNavigation={true}
                />
            </div>
        </EditorProvider>
    );
};

export default UniversalStepEditorProDemo;