export type CategoryType = 'All' | 'Convert' | 'Edit' | 'Security' | 'Optimize' | 'View & Extract';

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: CategoryType;
  emoji: string;
  popular?: boolean;
  acceptedFileTypes?: string;
  actionPlaceholder?: string;
  actionType?: 'convert' | 'merge' | 'split' | 'protect' | 'unlock' | 'compress' | 'edit' | 'extract' | 'ocr' | 'sign' | 'rotate';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface FeatureItem {
  icon: string;
  title: string;
  description: string;
}

export interface StepItem {
  step: number;
  title: string;
  description: string;
  iconName: string;
}

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  previewUrl?: string;
  pageCount?: number;
}
