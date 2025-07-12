// Temporary type fixes
declare module '@/components/result/StyleResult' {
  export interface StyleResult {
    category: string;
    score: number;
    percentage: number;
  }
}

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
    uetq?: any[];
  }
}

export {};