import React from 'react';
import { useLocation } from 'wouter';
import { useFunnels } from '@/context/FunnelsContext';

/**
 * 🔀 FunnelSelector
 * - Mostra o funnelId atual
 * - Permite digitar/selecionar outro ID
 * - Sincroniza URL (?funnel=), localStorage e FunnelsContext
 * - Mantém lista de recentes em localStorage (recent:funnelIds)
 */
export const FunnelSelector: React.FC<{ className?: string }> = ({ className }) => {
    const { currentFunnelId, setCurrentFunnelId } = useFunnels();
    const [location, setLocation] = useLocation();
    const [value, setValue] = React.useState<string>(currentFunnelId || '');
    const [recents, setRecents] = React.useState<string[]>(() => {
        try {
            const raw = localStorage.getItem('recent:funnelIds');
            const list = raw ? JSON.parse(raw) : [];
            return Array.isArray(list) ? list.slice(0, 10) : [];
        } catch { return []; }
    });

    React.useEffect(() => { setValue(currentFunnelId || ''); }, [currentFunnelId]);

    const persistRecents = (id: string) => {
        const next = [id, ...recents.filter(x => x !== id)].slice(0, 10);
        setRecents(next);
        try { localStorage.setItem('recent:funnelIds', JSON.stringify(next)); } catch { }
    };

    const apply = (id: string) => {
        // 1) Contexto
        setCurrentFunnelId(id);
        // 2) localStorage
        try { localStorage.setItem('editor:funnelId', id); } catch { }
        persistRecents(id);
        // 3) URL (preservando demais parâmetros)
        try {
            const [pathname, search = ''] = location.split('?');
            const params = new URLSearchParams(search);
            params.set('funnel', id);
            setLocation(`${pathname}?${params.toString()}`);
        } catch {
            setLocation(`/editor?funnel=${encodeURIComponent(id)}`);
        }
        // 4) Evento global opcional
        try { window.dispatchEvent(new CustomEvent('funnel:changed', { detail: { funnelId: id } })); } catch { }
    };

    return (
        <div className={className} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span style={{ fontSize: 12, opacity: 0.8 }}>Funil:</span>
            <input
                value={value}
                onChange={e => setValue(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && value.trim()) apply(value.trim()); }}
                placeholder="ex: quiz-estilo-completo"
                style={{
                    border: '1px solid rgba(0,0,0,0.2)',
                    borderRadius: 6,
                    padding: '6px 8px',
                    fontSize: 12,
                    width: 240,
                    background: 'rgba(255,255,255,0.9)'
                }}
                aria-label="ID do Funil"
            />
            <button
                onClick={() => value.trim() && apply(value.trim())}
                style={{
                    fontSize: 12,
                    padding: '6px 10px',
                    borderRadius: 6,
                    border: '1px solid rgba(0,0,0,0.2)',
                    background: '#FAF9F7'
                }}
                aria-label="Aplicar funil"
            >Aplicar</button>
            {recents.length > 0 && (
                <select
                    value=""
                    onChange={e => e.target.value && apply(e.target.value)}
                    style={{ fontSize: 12, padding: '6px 8px', borderRadius: 6, border: '1px solid rgba(0,0,0,0.2)', background: 'rgba(255,255,255,0.9)' }}
                    aria-label="Funis recentes"
                >
                    <option value="" disabled>Recentes</option>
                    {recents.map(id => (
                        <option key={id} value={id}>{id}</option>
                    ))}
                </select>
            )}
        </div>
    );
};

export default FunnelSelector;
