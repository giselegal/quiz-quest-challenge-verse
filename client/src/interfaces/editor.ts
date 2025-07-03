import { LucideIcon } from "lucide-react";

export interface ComponentType {
  type: string;
  name: string;
  icon: LucideIcon;
  description: string;
}

export interface ComponentCategory {
  title: string;
  color: string;
  components: ComponentType[];
}

export interface EditableElement {
  id: string;
  type: string;
  label: string;
  parentId?: string;
}

export interface EditorState {
  selectedStage: string | null;
  selectedElement: string | null;
  isEditMode: boolean;
  devicePreview: 'desktop' | 'tablet' | 'mobile';
}

export interface StageData {
  id: string;
  name: string;
  type: 'intro' | 'question' | 'strategic' | 'transition' | 'result' | 'offer';
  route: string;
  description: string;
  color: string;
  icon: string;
}