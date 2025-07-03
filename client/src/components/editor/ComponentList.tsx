import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  Type, Image as ImageIcon, MousePointer, Layout, 
  Video, Star, DollarSign, Clock, Shield, Gift, 
  HelpCircle, Users, BarChart3, Mail, Phone, MapPin
} from 'lucide-react';
import { ComponentInstance, EditorComponent } from '@/interfaces/editor';
import styles from '@/styles/editor.module.css';

// Definição dos componentes disponíveis
const COMPONENT_CATEGORIES = {
  basic: {
    title: '📝 BÁSICOS',
    color: 'blue',
    components: [
      {
        id: 'title',
        name: 'Título',
        icon: Type,
        description: 'Título principal da página',
        category: 'content',
        defaultProps: {
          text: 'Título Principal',
          level: 1,
          alignment: 'center',
          color: '#432818',
          fontSize: '2rem',
          fontWeight: 'bold',
        },
      },
      {
        id: 'subtitle',
        name: 'Subtítulo',
        icon: Type,
        description: 'Texto secundário',
        category: 'content',
        defaultProps: {
          text: 'Subtítulo',
          level: 2,
          alignment: 'center',
          color: '#6b4f43',
          fontSize: '1.5rem',
          fontWeight: 'semibold',
        },
      },
      {
        id: 'paragraph',
        name: 'Parágrafo',
        icon: Type,
        description: 'Texto normal',
        category: 'content',
        defaultProps: {
          text: 'Este é um parágrafo de exemplo. Você pode editar este texto para incluir qualquer conteúdo que desejar.',
          alignment: 'left',
          color: '#432818',
          fontSize: '1rem',
          lineHeight: '1.6',
        },
      },
      {
        id: 'image',
        name: 'Imagem',
        icon: ImageIcon,
        description: 'Imagem responsiva',
        category: 'media',
        defaultProps: {
          src: 'https://via.placeholder.com/400x300',
          alt: 'Imagem de exemplo',
          width: '100%',
          height: 'auto',
          borderRadius: '8px',
          alignment: 'center',
        },
      },
      {
        id: 'button',
        name: 'Botão',
        icon: MousePointer,
        description: 'Botão de ação',
        category: 'form',
        defaultProps: {
          text: 'Clique aqui',
          type: 'primary',
          size: 'medium',
          width: 'auto',
          alignment: 'center',
          action: 'next',
          backgroundColor: '#b89b7a',
          color: '#ffffff',
        },
      },
      {
        id: 'spacer',
        name: 'Espaçador',
        icon: Layout,
        description: 'Espaçamento vertical',
        category: 'layout',
        defaultProps: {
          height: '2rem',
          backgroundColor: 'transparent',
        },
      },
    ],
  },
  interactive: {
    title: '🎯 INTERATIVOS',
    color: 'green',
    components: [
      {
        id: 'progress',
        name: 'Barra de Progresso',
        icon: BarChart3,
        description: 'Indicador de progresso',
        category: 'layout',
        defaultProps: {
          value: 50,
          max: 100,
          showPercentage: true,
          color: '#b89b7a',
          backgroundColor: '#e5e7eb',
          height: '8px',
        },
      },
      {
        id: 'input',
        name: 'Campo de Entrada',
        icon: Mail,
        description: 'Campo de texto',
        category: 'form',
        defaultProps: {
          label: 'Seu nome',
          placeholder: 'Digite seu nome',
          type: 'text',
          required: true,
          width: '100%',
        },
      },
      {
        id: 'email',
        name: 'Campo de Email',
        icon: Mail,
        description: 'Campo específico para email',
        category: 'form',
        defaultProps: {
          label: 'Seu email',
          placeholder: 'seu@email.com',
          type: 'email',
          required: true,
          width: '100%',
        },
      },
      {
        id: 'phone',
        name: 'Campo de Telefone',
        icon: Phone,
        description: 'Campo para número de telefone',
        category: 'form',
        defaultProps: {
          label: 'Seu telefone',
          placeholder: '(11) 99999-9999',
          type: 'tel',
          required: false,
          width: '100%',
        },
      },
      {
        id: 'quiz-options',
        name: 'Opções do Quiz',
        icon: Layout,
        description: 'Lista de opções para escolha',
        category: 'form',
        defaultProps: {
          question: 'Qual das opções abaixo mais combina com você?',
          options: [
            { id: '1', text: 'Opção 1', value: 'opcao1' },
            { id: '2', text: 'Opção 2', value: 'opcao2' },
            { id: '3', text: 'Opção 3', value: 'opcao3' },
          ],
          multiSelect: false,
          hasImages: false,
          maxSelections: 1,
        },
      },
    ],
  },
  sales: {
    title: '💰 VENDAS',
    color: 'orange',
    components: [
      {
        id: 'video',
        name: 'Vídeo',
        icon: Video,
        description: 'Player de vídeo',
        category: 'media',
        defaultProps: {
          src: '',
          poster: '',
          autoplay: false,
          controls: true,
          width: '100%',
          aspectRatio: '16/9',
        },
      },
      {
        id: 'testimonial',
        name: 'Depoimento',
        icon: Star,
        description: 'Depoimento de cliente',
        category: 'content',
        defaultProps: {
          text: 'Este produto mudou minha vida! Recomendo para todos.',
          author: 'Maria Silva',
          role: 'Cliente satisfeita',
          avatar: 'https://via.placeholder.com/64x64',
          rating: 5,
        },
      },
      {
        id: 'price',
        name: 'Preço',
        icon: DollarSign,
        description: 'Exibição de preço',
        category: 'content',
        defaultProps: {
          price: '97',
          originalPrice: '197',
          currency: 'R$',
          installments: '12x de R$ 9,70',
          discount: '50% OFF',
          alignment: 'center',
        },
      },
      {
        id: 'countdown',
        name: 'Countdown',
        icon: Clock,
        description: 'Timer de urgência',
        category: 'content',
        defaultProps: {
          title: 'Oferta por tempo limitado!',
          endTime: Date.now() + (24 * 60 * 60 * 1000), // 24 horas
          showDays: true,
          showHours: true,
          showMinutes: true,
          showSeconds: true,
        },
      },
      {
        id: 'guarantee',
        name: 'Garantia',
        icon: Shield,
        description: 'Selo de garantia',
        category: 'content',
        defaultProps: {
          title: 'Garantia de 30 dias',
          description: 'Se não ficar satisfeito, devolvemos 100% do seu dinheiro.',
          icon: 'shield',
          color: '#059669',
        },
      },
      {
        id: 'bonus',
        name: 'Bônus',
        icon: Gift,
        description: 'Lista de bônus',
        category: 'content',
        defaultProps: {
          title: 'Bônus Exclusivos',
          items: [
            { name: 'E-book Gratuito', value: 'R$ 47' },
            { name: 'Consultoria Grátis', value: 'R$ 197' },
            { name: 'Acesso VIP', value: 'R$ 97' },
          ],
        },
      },
      {
        id: 'faq',
        name: 'FAQ',
        icon: HelpCircle,
        description: 'Perguntas frequentes',
        category: 'content',
        defaultProps: {
          title: 'Perguntas Frequentes',
          items: [
            {
              question: 'Como funciona o produto?',
              answer: 'O produto funciona de forma simples e intuitiva...',
            },
            {
              question: 'Qual a garantia?',
              answer: 'Oferecemos 30 dias de garantia incondicional.',
            },
          ],
        },
      },
      {
        id: 'social-proof',
        name: 'Prova Social',
        icon: Users,
        description: 'Contador de vendas',
        category: 'content',
        defaultProps: {
          customerCount: '5.000',
          rating: '4.9',
          reviewCount: '1.247',
          text: 'Mais de {customerCount} clientes satisfeitos',
        },
      },
    ],
  },
};

interface ComponentListProps {
  onComponentSelect: (component: ComponentInstance | null) => void;
  selectedComponent: ComponentInstance | null;
}

const ComponentList: React.FC<ComponentListProps> = ({
  onComponentSelect,
  selectedComponent,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleComponentDragStart = (e: React.DragEvent, component: EditorComponent) => {
    e.dataTransfer.setData('component', JSON.stringify(component));
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleComponentClick = (component: EditorComponent) => {
    // Create a new component instance
    const newComponent: ComponentInstance = {
      id: `${component.id}_${Date.now()}`,
      componentId: component.id,
      props: { ...component.defaultProps },
      order: 0,
    };
    
    onComponentSelect(newComponent);
  };

  const filteredCategories = Object.entries(COMPONENT_CATEGORIES).map(([key, category]) => ({
    key,
    ...category,
    components: category.components.filter(component =>
      component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      component.description.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter(category => category.components.length > 0);

  return (
    <div className={styles.componentList}>
      <div className="p-4 border-b">
        <input
          type="text"
          placeholder="Buscar componentes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {filteredCategories.map((category) => (
            <div key={category.key} className={styles.componentCategory}>
              <div className={styles.categoryHeader}>
                <h3 className={`${styles.categoryTitle} text-${category.color}-700`}>
                  {category.title}
                </h3>
                <Badge 
                  variant="secondary" 
                  className={`bg-${category.color}-100 text-${category.color}-800`}
                >
                  {category.components.length}
                </Badge>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {category.components.map((component) => {
                  const Icon = component.icon;
                  const isSelected = selectedComponent?.componentId === component.id;

                  return (
                    <div
                      key={component.id}
                      className={`${styles.componentItem} ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
                      draggable
                      onDragStart={(e) => handleComponentDragStart(e, component)}
                      onClick={() => handleComponentClick(component)}
                    >
                      <Icon className={styles.componentIcon} />
                      <div className={styles.componentInfo}>
                        <h4 className={styles.componentName}>
                          {component.name}
                        </h4>
                        <p className={styles.componentDescription}>
                          {component.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {filteredCategories.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Layout className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhum componente encontrado</p>
              <p className="text-sm">Tente buscar por outros termos</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ComponentList;
