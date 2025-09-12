// Interfaces para Page Config - Separadas para evitar imports circulares

export interface PageStyles {
    backgroundColor?: string;
    textColor?: string;
    fontFamily?: string;
    customCSS?: string;
}

export interface PageMetadata {
    title?: string;
    description?: string;
    keywords?: string[];
    ogImage?: string;
}

export interface ConfigBlock {
    id: string;
    type: string;
    order: number;
    content: any;
    settings: Record<string, any>;
    styles: Record<string, any>;
    componentType?: string;
    props?: Record<string, any>;
}

export interface PageConfig {
    pageId: string;
    pageName: string;
    blocks: ConfigBlock[];
    styles?: PageStyles;
    metadata?: PageMetadata;
    settings?: Record<string, any>; // Para compatibilidade
    isActive?: boolean;
    customCode?: string;
}