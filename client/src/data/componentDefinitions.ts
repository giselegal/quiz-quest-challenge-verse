import {
  Type,
  Image as ImageIcon,
  MousePointer,
  Layout,
  Video,
  Star,
  DollarSign,
  Clock,
  Shield,
  Gift,
  HelpCircle,
  Users,
} from "lucide-react";
import { ComponentType, ComponentCategory } from "@/interfaces/editor";

export const COMPONENT_CATEGORIES: {
  [key: string]: ComponentCategory;
} = {
  basic: {
    title: "📝 BÁSICOS",
    color: "blue",
    components: [
      {
        type: "logo",
        name: "Logo",
        icon: ImageIcon,
        description: "Logo da marca",
      },
      {
        type: "title",
        name: "Título",
        icon: Type,
        description: "Título principal",
      },
      {
        type: "subtitle",
        name: "Subtítulo",
        icon: Type,
        description: "Texto secundário",
      },
      {
        type: "text",
        name: "Texto",
        icon: Type,
        description: "Parágrafo normal",
      },
      {
        type: "image",
        name: "Imagem",
        icon: ImageIcon,
        description: "Imagem responsiva",
      },
      {
        type: "button",
        name: "Botão",
        icon: MousePointer,
        description: "Botão de ação",
      },
      {
        type: "spacer",
        name: "Espaço",
        icon: Layout,
        description: "Espaçamento vertical",
      },
    ],
  },
  interactive: {
    title: "🔘 INTERATIVOS",
    color: "green",
    components: [
      {
        type: "progress",
        name: "Progresso",
        icon: Layout,
        description: "Barra de progresso",
      },
      {
        type: "input",
        name: "Campo",
        icon: Type,
        description: "Campo de entrada",
      },
      {
        type: "options",
        name: "Opções",
        icon: Layout,
        description: "Lista de opções",
      },
    ],
  },
  sales: {
    title: "💰 VENDAS",
    color: "orange",
    components: [
      {
        type: "video",
        name: "Vídeo",
        icon: Video,
        description: "Player de vídeo",
      },
      {
        type: "testimonial",
        name: "Depoimento",
        icon: Star,
        description: "Depoimento de cliente",
      },
      {
        type: "price",
        name: "Preço",
        icon: DollarSign,
        description: "Exibição de preço",
      },
      {
        type: "countdown",
        name: "Countdown",
        icon: Clock,
        description: "Timer de urgência",
      },
      {
        type: "guarantee",
        name: "Garantia",
        icon: Shield,
        description: "Selo de garantia",
      },
      {
        type: "bonus",
        name: "Bônus",
        icon: Gift,
        description: "Lista de bônus",
      },
      {
        type: "faq",
        name: "FAQ",
        icon: HelpCircle,
        description: "Perguntas frequentes",
      },
      {
        type: "social-proof",
        name: "Prova Social",
        icon: Users,
        description: "Contador de vendas",
      },
    ],
  },
};

export const ALL_COMPONENTS: ComponentType[] = Object.values(
  COMPONENT_CATEGORIES
).flatMap((category) => category.components);