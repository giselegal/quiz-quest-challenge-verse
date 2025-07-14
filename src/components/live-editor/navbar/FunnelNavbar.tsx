import React from 'react';
import {
  X,
  Undo,
  Redo,
  Clipboard,
  MonitorSmartphone,
  Waypoints,
  Play,
  Save,
  Cloud,
  PencilRuler,
  Workflow,
  Palette,
  UserRoundSearch,
  Cog
} from 'lucide-react';

interface FunnelNavbarProps {
  onSave?: () => void;
  onPublish?: () => void;
  onPreview?: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onClose?: () => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

const FunnelNavbar: React.FC<FunnelNavbarProps> = ({
  onSave,
  onPublish,
  onPreview,
  onUndo,
  onRedo,
  onClose,
  activeTab = 'builder',
  onTabChange
}) => {
  const Button: React.FC<{
    children: React.ReactNode;
    variant?: 'default' | 'outline' | 'ghost';
    size?: 'default' | 'sm';
    className?: string;
    onClick?: () => void;
    disabled?: boolean;
  }> = ({ children, variant = 'default', size = 'default', className = '', onClick, disabled }) => {
    const baseClasses = 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
    
    const variantClasses = {
      default: 'bg-primary text-primary-foreground hover:bg-primary/90',
      outline: 'outlined border border-input bg-background hover:bg-primary hover:text-foreground',
      ghost: 'ghost hover:bg-primary hover:text-foreground'
    };

    const sizeClasses = {
      default: 'h-10 px-4 py-2',
      sm: 'h-10 w-10'
    };

    return (
      <button
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  };

  const tabs = [
    { id: 'builder', label: 'Construtor', icon: <PencilRuler className="md:mr-2 md:mx-0 mx-4 h-4 w-4" /> },
    { id: 'flow', label: 'Fluxo', icon: <Workflow className="md:mr-2 md:mx-0 mx-4 h-4 w-4" /> },
    { id: 'design', label: 'Design', icon: <Palette className="md:mr-2 md:mx-0 mx-4 h-4 w-4" /> },
    { id: 'leads', label: 'Leads', icon: <UserRoundSearch className="md:mr-2 md:mx-0 mx-4 h-4 w-4" /> },
    { id: 'settings', label: 'Configurações', icon: <Cog className="md:mr-2 md:mx-0 mx-4 h-4 w-4" /> }
  ];

  return (
    <div className="h-fit border-b relative z-[20] bg-zinc-950/50 backdrop-blur-lg">
      <div className="w-full flex flex-wrap md:flex-nowrap justify-between">
        {/* Left Section */}
        <div className="order-0 md:order-0 flex w-full max-w-[5.75rem] lg:max-w-[18rem]">
          <div className="border-r">
            <button 
              className="inline-block relative font-bold px-4 py-[1rem] text-zinc-100 border border-transparent hover:-100 rounded-none h-full md:px-5"
              onClick={onClose}
            >
              <span className="h-full flex items-center w-full justify-center gap-2">
                <X className="h-6 w-6" />
              </span>
            </button>
          </div>
          
          <div className="flex flex-row justify-between">
            <div className="flex p-3 gap-1 md:gap-2">
              <Button variant="outline" size="sm" onClick={onUndo}>
                <Undo className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={onRedo} disabled>
                <Redo className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Clipboard className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="md:hidden order-1 md:order-3 w-full flex gap-1 md:gap-2 p-3">
              <Button variant="outline" size="sm" className="hidden md:flex">
                <MonitorSmartphone className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm">
                <Waypoints className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={onPreview}>
                <Play className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="md:inline hidden" onClick={onSave}>
                <span className="md:inline hidden">Salvar</span>
                <Save className="w-4 h-4 md:hidden block" />
              </Button>
              <Button onClick={onPublish}>
                <span className="md:inline hidden">Publicar</span>
                <Cloud className="w-4 h-4 md:hidden block" />
              </Button>
            </div>
          </div>
        </div>

        {/* Center Section - Navigation Tabs */}
        <div className="border-t md:border-t-0 md:order-1 w-full">
          <div className="md:mx-auto md:max-w-[32rem] flex h-full items-center justify-center p-1 md:p-0 gap-1 md:gap-2">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? 'default' : 'ghost'}
                className={activeTab === tab.id ? 'bg-primary text-foreground' : ''}
                onClick={() => onTabChange?.(tab.id)}
              >
                {tab.icon}
                <span className="hidden md:inline">{tab.label}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="md:flex hidden order-1 md:order-3 w-fit gap-1 md:gap-2 p-3">
          <Button variant="outline" size="sm" className="md:flex hidden">
            <MonitorSmartphone className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm">
            <Waypoints className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={onPreview}>
            <Play className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={onSave}>
            <span className="md:inline hidden">Salvar</span>
            <Save className="w-4 h-4 md:hidden block" />
          </Button>
          <Button onClick={onPublish}>
            <span className="md:inline hidden">Publicar</span>
            <Cloud className="w-4 h-4 md:hidden block" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FunnelNavbar;
