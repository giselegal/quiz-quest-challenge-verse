import { LucideIcon } from 'lucide-react';
import * as Icons from 'lucide-react';

// Icon mapping utility
const getIconByName = (iconName: string): LucideIcon => {
  const IconComponent = (Icons as any)[iconName];
  return IconComponent || Icons.HelpCircle;
};

export default getIconByName;
export { getIconByName };