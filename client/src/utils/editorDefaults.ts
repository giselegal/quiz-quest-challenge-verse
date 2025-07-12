
import { EditableContent, BlockType } from '@/types/editor';

export const getDefaultContentForType = (type: BlockType): EditableContent => {
  switch (type) {
    case 'header':
      return {
        title: 'Título do Cabeçalho',
        subtitle: 'Subtítulo opcional'
      };
    case 'text':
      return {
        text: 'Digite seu texto aqui...'
      };
    case 'image':
      return {
        imageUrl: 'https://placehold.co/600x400?text=Imagem',
        caption: 'Legenda da imagem'
      };
    case 'button':
      return {
        buttonText: 'Clique aqui',
        backgroundColor: '#B89B7A',
        textColor: '#FFFFFF'
      };
    case 'headline':
      return {
        title: 'Título Principal'
      };
    case 'benefits':
      return {
        title: 'Benefícios',
        items: ['Benefício 1', 'Benefício 2', 'Benefício 3']
      };
    case 'testimonials':
      return {
        title: 'Depoimentos',
        testimonialsImage: 'https://placehold.co/300x300?text=Depoimento'
      };
    case 'pricing':
      return {
        title: 'Preço Especial',
        price: 'R$ 97,00',
        buttonText: 'Adquirir Agora'
      };
    case 'guarantee':
      return {
        title: 'Garantia',
        text: 'Satisfação garantida ou seu dinheiro de volta'
      };
    case 'cta':
      return {
        title: 'Não perca essa oportunidade!',
        buttonText: 'Comprar Agora'
      };
    default:
      return {
        title: 'Novo Componente'
      };
  }
};
