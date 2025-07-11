
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

export interface SimpleComponent {
  id: string;
  type: string;
  data?: any;
  style?: any;
  position?: number;
}

export interface QuizFunnel {
  id: string;
  name: string;
  description?: string;
  pages: SimplePage[];
  config?: QuizConfig;
  createdAt: Date | string;
  updatedAt: Date | string;
  isPublished?: boolean;
  version?: number;
}

export interface QuizConfig {
  id?: string;
  name?: string;
  theme?: any;
  settings?: any;
  branding?: any;
  domain?: string;
  seo?: {
    title?: string;
    description?: string;
    keywords?: string[] | string;
  };
  pixel?: {
    facebookPixelId?: string;
    googleAnalyticsId?: string;
  };
  utm?: {
    source?: string;
    medium?: string;
    campaign?: string;
    content?: string;
    term?: string;
  };
  scoring?: {
    normalQuestionPoints?: number;
    strategicQuestionPoints?: number;
    autoAdvanceNormal?: boolean;
    autoAdvanceStrategic?: boolean;
    normalSelectionLimit?: number;
    strategicSelectionLimit?: number;
  };
  results?: {
    showUserName?: boolean;
    showPrimaryStyle?: boolean;
    showSecondaryStyles?: boolean;
    showPercentages?: boolean;
    showStyleImages?: boolean;
    showStyleGuides?: boolean;
  };
  analytics?: {
    googleAnalyticsId?: string;
    facebookPixelId?: string;
    zapierWebhook?: string;
  };
  integrations?: {
    email?: any;
    crm?: any;
    webhooks?: any[];
  };
}

export interface SimplePage {
  id: string;
  title: string;
  type: string;
  components: SimpleComponent[];
  progress?: number;
  showHeader?: boolean;
  showProgress?: boolean;
}

export interface Version {
  id: string;
  version: number;
  createdAt: string;
  changes: string[];
  data: any;
}
