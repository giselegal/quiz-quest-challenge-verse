
export interface QuizIntroBlockProps {
  blockId?: string;
  data?: {
    title?: string;
    subtitle?: string;
    description?: string;
    buttonText?: string;
    titleColor?: string;
    subtitleColor?: string;
    descriptionColor?: string;
    buttonColor?: string;
    buttonTextColor?: string;
    imageUrl?: string;
    imageAlt?: string;
  };
  onUpdate?: (data: any) => void;
  className?: string;
  isEditing?: boolean;
}
