
import { EditableContent, BlockType } from '@/types/editor';

export const getDefaultContentForType = (type: BlockType): EditableContent => {
  switch (type) {
    case 'headline':
      return {
        title: 'New Headline',
        subtitle: 'Subtitle text'
      };
    case 'text':
      return {
        text: 'Enter your text content here...'
      };
    case 'image':
      return {
        imageUrl: '',
        caption: 'Image caption'
      };
    case 'button':
      return {
        buttonText: 'Click Here',
        backgroundColor: '#B89B7A'
      };
    case 'benefits':
      return {
        title: 'Key Benefits',
        items: ['Benefit 1', 'Benefit 2', 'Benefit 3']
      };
    case 'testimonials':
      return {
        title: 'What Our Clients Say'
      };
    case 'pricing':
      return {
        title: 'Pricing Plans'
      };
    case 'cta':
      return {
        title: 'Ready to Get Started?',
        buttonText: 'Get Started Now'
      };
    default:
      return {};
  }
};
