// Compatibilidade para arquivos que ainda usam templateService legacy
export interface UITemplate {
    id: string;
    name: string;
    description: string;
    tags: string[];
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    category: string;
    thumbnail?: string;
    preview?: string;
    blocks?: any[];
}

// Mock básico para compatibilidade
export const templateService = {
    async getTemplates(): Promise<UITemplate[]> {
        return [];
    },

    async incrementUsage(id: string): Promise<void> {
        console.log('Template usage incremented:', id);
    }
};

export const supabaseTemplateService = templateService;

// Re-export para compatibilidade
export default templateService;