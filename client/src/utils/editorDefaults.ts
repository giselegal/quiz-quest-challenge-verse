
import { EditableContent, BlockType } from '@/types/editor';

export const getDefaultContentForType = (type: BlockType): EditableContent => {
  switch (type) {
    case 'header':
      return {
        title: 'Novo Cabeçalho',
        subtitle: 'Subtítulo opcional'
      };
    
    case 'text':
      return {
        text: 'Digite aqui seu texto...'
      };
    
    case 'button':
      return {
        buttonText: 'Clique aqui',
        backgroundColor: '#2563eb',
        textColor: '#ffffff'
      };
    
    case 'image':
      return {
        imageUrl: '',
        caption: 'Adicionar imagem'
      };
    
    case 'spacer':
      return {
        height: 40
      };
    
    default:
      return {};
  }
};
