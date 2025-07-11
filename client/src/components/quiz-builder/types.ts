// Type definitions for the quiz builder system
// This provides better type safety and reduces TypeScript errors

export interface QuizBuilderData {
  title?: string;
  subtitle?: string;
  text?: string;
  imageUrl?: string;
  alt?: string;
  question?: string;
  options?: string[];
  multiSelect?: number;
  displayType?: 'text' | 'image' | 'both';
  layout?: {
    columns?: number;
    direction?: 'vertical' | 'horizontal';
  };
  imageSize?: 'small' | 'medium' | 'large';
  selectionIndicator?: 'border' | 'background' | 'both';
  stageTitle?: string;
  stageNumber?: number;
  totalStages?: number;
  buttonText?: string;
  backgroundColor?: string;
  textColor?: string;
  backgroundColorQuestion?: string;
  textColorQuestion?: string;
  optionImages?: string[];
  resultTitle?: string;
  resultDescription?: string;
  offerImageUrl?: string;
  authorImageUrl?: string;
  callToActionText?: string;
  caption?: string;
  minSelections?: number;
  maxSelections?: number;
  primaryStyleTitle?: string;
  showPercentages?: boolean;
}

export interface QuizBuilderStyle {
  backgroundColor?: string;
  textColor?: string;
  borderRadius?: string | number;
  paddingY?: string | number;
  paddingX?: string | number;
}

// Utility type to ensure data is never undefined
export type SafeQuizBuilderData = Required<QuizBuilderData> & {
  [K in keyof QuizBuilderData]: NonNullable<QuizBuilderData[K]>;
};

// Helper function to provide safe default data
export function getSafeData(data?: QuizBuilderData): SafeQuizBuilderData {
  return {
    title: data?.title || '',
    subtitle: data?.subtitle || '',
    text: data?.text || '',
    imageUrl: data?.imageUrl || '',
    alt: data?.alt || '',
    question: data?.question || '',
    options: data?.options || [],
    multiSelect: data?.multiSelect || 1,
    displayType: data?.displayType || 'text',
    layout: data?.layout || { columns: 2, direction: 'vertical' },
    imageSize: data?.imageSize || 'medium',
    selectionIndicator: data?.selectionIndicator || 'border',
    stageTitle: data?.stageTitle || '',
    stageNumber: data?.stageNumber || 1,
    totalStages: data?.totalStages || 7,
    buttonText: data?.buttonText || '',
    backgroundColor: data?.backgroundColor || '#FFFAF0',
    textColor: data?.textColor || '#432818',
    backgroundColorQuestion: data?.backgroundColorQuestion || '#FFFAF0',
    textColorQuestion: data?.textColorQuestion || '#432818',
    optionImages: data?.optionImages || [],
    resultTitle: data?.resultTitle || '',
    resultDescription: data?.resultDescription || '',
    offerImageUrl: data?.offerImageUrl || '',
    authorImageUrl: data?.authorImageUrl || '',
    callToActionText: data?.callToActionText || '',
    caption: data?.caption || '',
    minSelections: data?.minSelections || 0,
    maxSelections: data?.maxSelections || 0,
    primaryStyleTitle: data?.primaryStyleTitle || '',
    showPercentages: data?.showPercentages || false,
  };
}