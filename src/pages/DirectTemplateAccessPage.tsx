/**
 * 🎯 DIRECT TEMPLATE ACCESS PAGE
 * 
 * Immediate solution for quiz21StepsComplete template access.
 * Simple, direct, no complex services - just works!
 */

import React from 'react';
import DirectTemplateEditor from '@/components/DirectTemplateEditor';

const DirectTemplateAccessPage: React.FC = () => {
    const handleTemplateReady = (templateData: Record<string, any>) => {
        console.log('✅ [DIRECT_ACCESS] Template ready for editing:', Object.keys(templateData).length, 'steps');
    };

    const handleError = (error: string) => {
        console.error('❌ [DIRECT_ACCESS] Error loading template:', error);
    };

    return (
        <div>
            <DirectTemplateEditor
                templateId="quiz21StepsComplete"
                onReady={handleTemplateReady}
                onError={handleError}
            />
        </div>
    );
};

export default DirectTemplateAccessPage;