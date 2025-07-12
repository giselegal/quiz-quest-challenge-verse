// Window extensions for custom error monitoring
declare global {
  interface Window {
    customErrorLogger?: (type: string, data: any) => void;
  }
}

export {};