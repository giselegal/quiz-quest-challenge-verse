// Interfaces compartilhadas entre Template Gallery e Template Marketplace
export interface Template {
    id: string;
    name: string;
    description: string;
    category: 'quiz' | 'landing' | 'lead-gen' | 'survey' | 'product' | 'educational';
    thumbnail: string;
    tags: string[];
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    estimatedTime: number; // minutes
    rating: number; // 1-5 stars
    downloads: number;
    author: string;
    premium: boolean;
    structure: TemplateFunnel;
    preview?: string;
}

export interface TemplateFunnel {
    name: string;
    description: string;
    stages: TemplateStage[];
    settings: TemplateSettings;
}

export interface TemplateStage {
    name: string;
    blocks: TemplateBlock[];
    order: number;
}

export interface TemplateBlock {
    id: string;
    type: string;
    content: any;
    properties: any;
    style?: any;
    config?: any;
    order: number;
}

export interface TemplateSettings {
    theme: {
        primaryColor: string;
        secondaryColor: string;
        backgroundColor: string;
        textColor: string;
        fontFamily: string;
    } | string; // Allow string for theme name
    navigation: {
        showProgress: boolean;
        showStepNumbers: boolean;
        allowBackward: boolean;
    };
    metadata: {
        title: string;
        description: string;
        keywords: string[];
        language: string;
    };
}

export interface MarketplaceStats {
    totalTemplates: number;
    totalDownloads: number;
    averageRating: number;
    topCategories: Array<{ category: string; count: number; growth: number }>;
    featuredTemplates: Template[];
    recentActivity: Array<{
        id: string;
        type: 'download' | 'rating' | 'new_template';
        template: string;
        user: string;
        timestamp: Date;
    }>;
}