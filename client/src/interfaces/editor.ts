import { LucideIcon } from "lucide-react";
import { SimpleComponent } from "./quiz";

export interface ComponentType {
  type: SimpleComponent["type"];
  name: string;
  icon: LucideIcon;
  description: string;
}

export interface ComponentCategory {
  title: string;
  color: string;
  components: ComponentType[];
}

export interface Version {
  id: string;
  timestamp: number;
  version: number;
  description: string;
  isAutoSave: boolean;
  changes: VersionChange[];
}

export interface VersionChange {
  type: 'add' | 'remove' | 'edit';
  component?: string;
  page?: string;
  description: string;
}