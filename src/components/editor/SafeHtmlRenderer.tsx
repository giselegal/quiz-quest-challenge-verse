import React from 'react';

/**
 * 🎯 SAFE HTML RENDERER - Componente Centralizado
 * 
 * Componente responsável por decidir INTELIGENTEMENTE como renderizar texto:
 * - Se contém HTML → Renderiza com dangerouslySetInnerHTML
 * - Se contém formatação markdown → Processa formatação
 * - Se é texto puro → Renderiza como texto
 * 
 * CENTRALIZA toda a lógica de detecção e renderização de HTML/formatação
 * ELIMINA duplicação de código em múltiplos componentes
 * GARANTE consistência na renderização em todo o projeto
 */

interface SafeHtmlRendererProps {
    /** Conteúdo a ser renderizado */
    content: string | undefined | null;
    /** Classes CSS para o container */
    className?: string;
    /** Estilos inline para o container */
    style?: React.CSSProperties;
    /** Cor do texto (aplicada quando não há HTML) */
    textColor?: string;
    /** Fallback quando content está vazio */
    fallback?: string;
    /** Se deve processar formatação markdown simples (**negrito**) */
    enableMarkdown?: boolean;
    /** Se deve processar marcações de cor [cor]**texto**[/cor] */
    enableColorMarkings?: boolean;
    /** Debug: logs detalhados (apenas em desenvolvimento) */
    debug?: boolean;
    /** ID do bloco para debug */
    blockId?: string;
}

/**
 * 🔍 Detecta se o conteúdo contém HTML válido
 */
const detectHtmlContent = (content: string): boolean => {
    if (!content || typeof content !== 'string') return false;

    // Detecção mais rigorosa de HTML
    const htmlPattern = /<\s*[a-zA-Z][a-zA-Z0-9]*[^>]*>/;
    const hasValidHtmlTags = htmlPattern.test(content);

    // Tags HTML comuns que indicam intenção de renderização HTML
    const commonHtmlTags = ['<span', '<div', '<p', '<strong', '<b', '<em', '<i', '<br', '<a'];
    const hasCommonTags = commonHtmlTags.some(tag => content.includes(tag));

    return hasValidHtmlTags || hasCommonTags;
};

/**
 * 🎨 Detecta se o conteúdo contém marcações de cor customizadas
 * Formato: [cor]**texto**[/cor] ou [#hex]**texto**[/#hex]
 */
const detectColorMarkings = (content: string): boolean => {
    if (!content || typeof content !== 'string') return false;

    const colorPattern = /\[([\w#]+)\]\*\*(.*?)\*\*\[\/[\w#]+\]/;
    return colorPattern.test(content);
};

/**
 * 📝 Detecta se o conteúdo contém formatação markdown simples
 * Formato: **negrito**, *itálico*, etc.
 */
const detectMarkdownFormatting = (content: string): boolean => {
    if (!content || typeof content !== 'string') return false;

    const markdownPatterns = [
        /\*\*(.*?)\*\*/, // **negrito**
        /\*(.*?)\*/,     // *itálico*
        /__(.*?)__/,     // __sublinhado__
    ];

    return markdownPatterns.some(pattern => pattern.test(content));
};

/**
 * 🎨 Processa marcações de cor customizadas
 * [cor]**texto**[/cor] → <span style="color: cor"><strong>texto</strong></span>
 */
const parseColorMarkings = (content: string, defaultColor?: string): React.ReactNode[] => {
    const colorPattern = /\[([\w#]+)\]\*\*(.*?)\*\*\[\/[\w#]+\]/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;
    let keyIndex = 0;

    while ((match = colorPattern.exec(content)) !== null) {
        // Texto antes da marcação
        if (match.index > lastIndex) {
            const beforeText = content.slice(lastIndex, match.index);
            if (beforeText) {
                parts.push(
                    <span key={`before-${keyIndex}`} style={{ color: defaultColor }}>
                        {beforeText}
                    </span>
                );
            }
        }

        // Texto com cor
        const [, color, text] = match;
        const resolvedColor = color.startsWith('#') ? color : color;
        parts.push(
            <span key={`colored-${keyIndex++}`} style={{ color: resolvedColor }}>
                <strong>{text}</strong>
            </span>
        );

        lastIndex = match.index + match[0].length;
    }

    // Texto restante
    if (lastIndex < content.length) {
        const remainingText = content.slice(lastIndex);
        if (remainingText) {
            parts.push(
                <span key={`remaining-${keyIndex}`} style={{ color: defaultColor }}>
                    {remainingText}
                </span>
            );
        }
    }

    return parts;
};

/**
 * 📝 Processa formatação markdown simples
 * **negrito** → <strong>negrito</strong>
 * *itálico* → <em>itálico</em>
 */
const parseMarkdownFormatting = (content: string): React.ReactNode => {
    if (!content) return content;

    // Processar **negrito**
    const boldPattern = /\*\*(.*?)\*\*/g;
    const parts: React.ReactNode[] = [];
    let lastIndex = 0;
    let match;
    let keyIndex = 0;

    while ((match = boldPattern.exec(content)) !== null) {
        // Texto antes do negrito
        if (match.index > lastIndex) {
            const beforeText = content.slice(lastIndex, match.index);
            if (beforeText) {
                parts.push(beforeText);
            }
        }

        // Texto em negrito
        const [, boldText] = match;
        parts.push(<strong key={`bold-${keyIndex++}`}>{boldText}</strong>);

        lastIndex = match.index + match[0].length;
    }

    // Texto restante
    if (lastIndex < content.length) {
        const remainingText = content.slice(lastIndex);
        if (remainingText) {
            parts.push(remainingText);
        }
    }

    return parts.length === 0 ? content : parts;
};

/**
 * 🎯 COMPONENTE PRINCIPAL - SafeHtmlRenderer
 */
export const SafeHtmlRenderer: React.FC<SafeHtmlRendererProps> = ({
    content,
    className = '',
    style = {},
    textColor,
    fallback = 'Texto exemplo',
    enableMarkdown = true,
    enableColorMarkings = true,
    debug = false,
    blockId,
}) => {
    // Normalizar conteúdo
    const normalizedContent = React.useMemo(() => {
        if (!content) return fallback;
        if (typeof content === 'string') return content;
        if (typeof content === 'object') {
            // @ts-ignore - Lidar com objetos que podem ter .text ou .content
            return content.text || content.content || String(content);
        }
        return String(content);
    }, [content, fallback]);

    // Detectar tipos de conteúdo
    const isHtml = React.useMemo(() => detectHtmlContent(normalizedContent), [normalizedContent]);
    const hasColorMarkings = React.useMemo(() =>
        enableColorMarkings && detectColorMarkings(normalizedContent),
        [normalizedContent, enableColorMarkings]
    );
    const hasMarkdown = React.useMemo(() =>
        enableMarkdown && detectMarkdownFormatting(normalizedContent),
        [normalizedContent, enableMarkdown]
    );

    // Debug logging (apenas em desenvolvimento)
    React.useEffect(() => {
        if (debug && process.env.NODE_ENV === 'development') {
            const debugKey = `${blockId || 'unknown'}|${normalizedContent.length}|${isHtml ? 1 : 0}`;

            // @ts-ignore - Debug global
            if (typeof window !== 'undefined') {
                const g = window as any;
                g.__SAFE_HTML_DEBUG_LOGS = g.__SAFE_HTML_DEBUG_LOGS || new Set();

                if (!g.__SAFE_HTML_DEBUG_LOGS.has(debugKey)) {
                    g.__SAFE_HTML_DEBUG_LOGS.add(debugKey);
                    console.log('🎯 SafeHtmlRenderer Debug:', {
                        blockId,
                        contentLength: normalizedContent.length,
                        isHtml,
                        hasColorMarkings,
                        hasMarkdown,
                        renderMode: isHtml ? 'HTML' : hasColorMarkings ? 'COLOR_MARKINGS' : hasMarkdown ? 'MARKDOWN' : 'PLAIN_TEXT',
                        contentPreview: normalizedContent.substring(0, 100) + (normalizedContent.length > 100 ? '...' : ''),
                    });
                }
            }
        }
    }, [debug, blockId, normalizedContent, isHtml, hasColorMarkings, hasMarkdown]);

    // Renderização baseada no tipo de conteúdo detectado
    if (isHtml) {
        // 🎯 MODO HTML: Renderizar como HTML com dangerouslySetInnerHTML
        return (
            <div
                className={className}
                style={style}
                dangerouslySetInnerHTML={{ __html: normalizedContent }}
            />
        );
    }

    if (hasColorMarkings) {
        // 🎯 MODO COLOR MARKINGS: Processar marcações de cor customizadas
        const colorParts = parseColorMarkings(normalizedContent, textColor);
        return (
            <div className={className} style={style}>
                {colorParts}
            </div>
        );
    }

    if (hasMarkdown) {
        // 🎯 MODO MARKDOWN: Processar formatação markdown simples
        const markdownParts = parseMarkdownFormatting(normalizedContent);
        return (
            <div className={className} style={{ ...style, color: textColor }}>
                {markdownParts}
            </div>
        );
    }

    // 🎯 MODO TEXTO PURO: Renderizar como texto simples
    return (
        <div className={className} style={{ ...style, color: textColor }}>
            {normalizedContent}
        </div>
    );
};

/**
 * 🔧 HOOK PARA FACILITAR O USO
 * 
 * Hook que retorna informações sobre o tipo de conteúdo
 * Útil para componentes que precisam saber como o conteúdo será renderizado
 */
export const useContentType = (content: string | undefined | null) => {
    return React.useMemo(() => {
        if (!content) return { type: 'empty', isHtml: false, hasMarkdown: false, hasColorMarkings: false };

        const normalizedContent = typeof content === 'string' ? content : String(content);
        const isHtml = detectHtmlContent(normalizedContent);
        const hasColorMarkings = detectColorMarkings(normalizedContent);
        const hasMarkdown = detectMarkdownFormatting(normalizedContent);

        const type = isHtml ? 'html' : hasColorMarkings ? 'color-markings' : hasMarkdown ? 'markdown' : 'plain-text';

        return {
            type,
            isHtml,
            hasMarkdown,
            hasColorMarkings,
            normalizedContent,
        };
    }, [content]);
};

/**
 * 🎯 COMPONENTE WRAPPER PARA COMPATIBILIDADE
 * 
 * Wrapper que mantém a API similar ao TextInlineBlock mas usa SafeHtmlRenderer internamente
 */
interface SafeTextRendererProps {
    content: string | undefined | null;
    className?: string;
    style?: React.CSSProperties;
    color?: string;
    enableFormatting?: boolean;
    debug?: boolean;
    blockId?: string;
}

export const SafeTextRenderer: React.FC<SafeTextRendererProps> = ({
    content,
    className = '',
    style = {},
    color,
    enableFormatting = true,
    debug = false,
    blockId,
}) => {
    return (
        <SafeHtmlRenderer
            content={content}
            className={className}
            style={style}
            textColor={color}
            enableMarkdown={enableFormatting}
            enableColorMarkings={enableFormatting}
            debug={debug}
            blockId={blockId}
        />
    );
};

export default SafeHtmlRenderer;