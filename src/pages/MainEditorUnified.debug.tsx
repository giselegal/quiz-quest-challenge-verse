import React from 'react';
import { useLocation, useParams } from 'wouter';
import { ErrorBoundary } from '../components/editor/ErrorBoundary';
import { useFunnelContext } from '@/hooks/useFunnelLoader';

/**
 * DEBUG VERSION - Versão simplificada para diagnosticar erros
 */
const MainEditorUnifiedDebug: React.FC = () => {
    console.log('🔍 MainEditorUnifiedDebug: Renderizando...');

    // Testar os hooks básicos
    const [location] = useLocation();
    const params = React.useMemo(() => new URLSearchParams(location.split('?')[1] || ''), [location]);
    const routeParams = useParams<{ funnelId?: string }>();

    const templateId = params.get('template');
    const funnelId = routeParams.funnelId || params.get('funnel');

    console.log('🔍 Hooks básicos funcionando:', { location, templateId, funnelId });

    // TESTE: useFunnelContext - pode estar causando o erro
    let funnelContext;
    try {
        funnelContext = useFunnelContext(funnelId || undefined);
        console.log('🔍 useFunnelContext funcionando:', funnelContext);
    } catch (error) {
        console.error('❌ useFunnelContext falhando:', error);
        funnelContext = { error: String(error) };
    }

    return (
        <div className="min-h-screen bg-gray-50 p-4">
            <ErrorBoundary>
                <div className="max-w-4xl mx-auto">
                    <h1 className="text-2xl font-bold mb-4">🔍 Debug Mode - Editor</h1>
                    <div className="bg-white rounded-lg shadow p-6">
                        <p>Se você está vendo esta mensagem, o componente base está funcionando.</p>
                        <p>O erro está em um dos providers ou contextos mais complexos.</p>
                        <div className="mt-4 p-3 bg-blue-50 rounded">
                            <p><strong>Location:</strong> {location}</p>
                            <p><strong>Template ID:</strong> {templateId || 'none'}</p>
                            <p><strong>Funnel ID:</strong> {funnelId || 'none'}</p>
                        </div>
                        <div className="mt-4 p-3 bg-green-50 rounded">
                            <p><strong>Funnel Context:</strong></p>
                            <pre className="text-xs mt-2 overflow-auto">
                                {JSON.stringify(funnelContext, null, 2)}
                            </pre>
                        </div>
                    </div>
                </div>
            </ErrorBoundary>
        </div>
    );
};

export default MainEditorUnifiedDebug;