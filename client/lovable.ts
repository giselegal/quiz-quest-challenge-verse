// Mock lovable module to resolve TypeScript errors
// This is a temporary solution for auto-generated lovable components

export interface LovableComponentConfig {
  name: string;
  displayName: string;
  description: string;
  category: string;
  defaultProps: Record<string, any>;
  propsSchema?: Record<string, any>;
  render?: (props: any) => React.ReactElement;
  component: React.ComponentType<any>;
}

export function defineLovable(config: LovableComponentConfig): React.ComponentType<any> {
  // Return the component function directly
  return config.component;
}