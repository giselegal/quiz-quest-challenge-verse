import React from 'react';
import {
  TriangleAlert,
  Book,
  Mic,
  RectangleHorizontal,
  LoaderCircle,
  GalleryHorizontalEnd,
  ChartArea,
  AlignHorizontalDistributeEnd,
  Sparkles,
  Quote,
  TextCursorInput,
  Proportions,
  MessageCircleQuestion,
  ChartNoAxesColumnIncreasing,
  Images,
  List,
  ArrowRightLeft,
  SlidersHorizontal,
  Rows3,
  CircleDollarSign,
  Code,
  Scale,
  Text,
  Heading1,
  Video
} from 'lucide-react';

interface ToolbarButtonProps {
  icon: React.ReactNode;
  label: string;
  isNew?: boolean;
  onClick: () => void;
}

const ToolbarButton: React.FC<ToolbarButtonProps> = ({ icon, label, isNew, onClick }) => (
  <div 
    role="button" 
    tabIndex={0}
    aria-disabled="false"
    className="bg-zinc-950/50 relative hover:z-30 cursor-pointer"
    onClick={onClick}
  >
    <div className="text-zinc-100 cursor-move col-span-4 rounded border hover:border-gray-400 items-center py-2 px-3 gap-2 ease relative flex">
      <div className="relative w-auto">
        {icon}
      </div>
      <div className="text-xs py-1">{label}</div>
      {isNew && (
        <span className="text-[0.6rem] text-white bg-gradient-to-r from-blue-500/90 to-purple-500/90 backdrop-blur-lg rounded-full px-1 py-0.5 absolute -top-1 -right-1">
          Novo!
        </span>
      )}
    </div>
  </div>
);

interface ToolbarSidebarProps {
  onAddComponent: (type: string) => void;
}

const ToolbarSidebar: React.FC<ToolbarSidebarProps> = ({ onAddComponent }) => {
  const toolbarItems = [
    { id: 'alert', icon: <TriangleAlert className="h-4 w-4" />, label: 'Alerta' },
    { id: 'arguments', icon: <Book className="h-4 w-4" />, label: 'Argumentos' },
    { id: 'audio', icon: <Mic className="h-4 w-4" />, label: 'Audio' },
    { id: 'button', icon: <RectangleHorizontal className="h-4 w-4" />, label: 'Botão' },
    { id: 'loading', icon: <LoaderCircle className="h-4 w-4" />, label: 'Carregando' },
    { id: 'carousel', icon: <GalleryHorizontalEnd className="h-4 w-4" />, label: 'Carrosel' },
    { id: 'chart', icon: <ChartArea className="h-4 w-4" />, label: 'Cartesiano' },
    { id: 'compare', icon: <AlignHorizontalDistributeEnd className="h-4 w-4" />, label: 'Comparar', isNew: true },
    { id: 'confetti', icon: <Sparkles className="h-4 w-4" />, label: 'Confetti', isNew: true },
    { id: 'testimonials', icon: <Quote className="h-4 w-4" />, label: 'Depoimentos' },
    { id: 'input', icon: <TextCursorInput className="h-4 w-4" />, label: 'Entrada' },
    { id: 'spacer', icon: <Proportions className="h-4 w-4" />, label: 'Espaçador' },
    { id: 'faq', icon: <MessageCircleQuestion className="h-4 w-4" />, label: 'FAQ', isNew: true },
    { id: 'charts', icon: <ChartNoAxesColumnIncreasing className="h-4 w-4" />, label: 'Gráficos' },
    { id: 'image', icon: <Images className="h-4 w-4" />, label: 'Imagem' },
    { id: 'list', icon: <List className="h-4 w-4" />, label: 'Lista', isNew: true },
    { id: 'marquee', icon: <ArrowRightLeft className="h-4 w-4" />, label: 'Marquise', isNew: true },
    { id: 'level', icon: <SlidersHorizontal className="h-4 w-4" />, label: 'Nível' },
    { id: 'options', icon: <Rows3 className="h-4 w-4" />, label: 'Opções' },
    { id: 'price', icon: <CircleDollarSign className="h-4 w-4" />, label: 'Preço' },
    { id: 'script', icon: <Code className="h-4 w-4" />, label: 'Script' },
    { id: 'terms', icon: <Scale className="h-4 w-4" />, label: 'Termos' },
    { id: 'text', icon: <Text className="h-4 w-4" />, label: 'Texto' },
    { id: 'title', icon: <Heading1 className="h-4 w-4" />, label: 'Título' },
    { id: 'video', icon: <Video className="h-4 w-4" />, label: 'Video' }
  ];

  return (
    <>
      {/* Desktop Version */}
      <div className="relative overflow-hidden hidden md:block w-full max-h-full md:max-w-[9.5rem] pr-2">
        <div className="h-full w-full rounded-[inherit]" style={{ overflow: 'hidden scroll' }}>
          <div className="overflow-hidden relative z-[1] flex flex-col gap-1 p-2 pb-6">
            {toolbarItems.map((item) => (
              <ToolbarButton
                key={item.id}
                icon={item.icon}
                label={item.label}
                isNew={item.isNew}
                onClick={() => onAddComponent(item.id)}
              />
            ))}
          </div>
          <div className="py-8"></div>
        </div>
      </div>

      {/* Mobile Version */}
      <div className="relative overflow-hidden block md:hidden w-full max-h-[60px] pr-2">
        <div className="h-full w-full rounded-[inherit]" style={{ overflow: 'scroll hidden' }}>
          <div className="min-w-fit">
            <div className="relative z-[1] flex gap-1 p-2 pb-6">
              {toolbarItems.map((item) => (
                <ToolbarButton
                  key={item.id}
                  icon={item.icon}
                  label={item.label}
                  isNew={item.isNew}
                  onClick={() => onAddComponent(item.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ToolbarSidebar;
