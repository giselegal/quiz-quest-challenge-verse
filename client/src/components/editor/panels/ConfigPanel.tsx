import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  Settings, Globe, Eye, Palette, Code, 
  Database, Shield, BarChart3, Zap, Bell
} from 'lucide-react';
import { QuizConfig } from '@/interfaces/quiz';
import styles from '@/styles/editor.module.css';

interface ConfigPanelProps {
  config: QuizConfig;
  onConfigUpdate: (config: QuizConfig) => void;
}

const ConfigPanel: React.FC<ConfigPanelProps> = ({
  config,
  onConfigUpdate,
}) => {
  const [activeSection, setActiveSection] = useState('general');

  const configSections = [
    {
      id: 'general',
      title: 'Geral',
      icon: Settings,
      color: 'blue',
    },
    {
      id: 'seo',
      title: 'SEO',
      icon: Globe,
      color: 'green',
    },
    {
      id: 'appearance',
      title: 'Aparência',
      icon: Palette,
      color: 'purple',
    },
    {
      id: 'analytics',
      title: 'Analytics',
      icon: BarChart3,
      color: 'orange',
    },
    {
      id: 'behavior',
      title: 'Comportamento',
      icon: Zap,
      color: 'yellow',
    },
    {
      id: 'integrations',
      title: 'Integrações',
      icon: Database,
      color: 'indigo',
    },
    {
      id: 'security',
      title: 'Segurança',
      icon: Shield,
      color: 'red',
    },
  ];

  const handleInputChange = (section: string, field: string, value: any) => {
    const updatedConfig = {
      ...config,
      [section]: {
        ...config[section as keyof QuizConfig],
        [field]: value,
      },
    };
    onConfigUpdate(updatedConfig);
  };

  const renderGeneralSection = () => (
    <div className={styles.configSection}>
      <h3 className={styles.sectionTitle}>Configurações Gerais</h3>
      
      <div className={styles.configField}>
        <label className={styles.fieldLabel}>
          Domínio do Quiz
        </label>
        <input
          type="text"
          value={config.domain || ''}
          onChange={(e) => handleInputChange('domain', '', e.target.value)}
          className={styles.fieldInput}
          placeholder="exemplo.com"
        />
        <p className={styles.fieldHint}>
          Domínio onde o quiz será hospedado
        </p>
      </div>

      <div className={styles.configField}>
        <label className={styles.fieldLabel}>
          Timeout de Sessão (minutos)
        </label>
        <input
          type="number"
          value={30}
          className={styles.fieldInput}
          min="5"
          max="120"
        />
      </div>

      <div className={styles.configField}>
        <label className={styles.fieldLabel}>
          Idioma Padrão
        </label>
        <select className={styles.fieldSelect}>
          <option value="pt-BR">Português (Brasil)</option>
          <option value="en-US">English (US)</option>
          <option value="es-ES">Español</option>
        </select>
      </div>
    </div>
  );

  const renderSEOSection = () => (
    <div className={styles.configSection}>
      <h3 className={styles.sectionTitle}>SEO & Meta Tags</h3>
      
      <div className={styles.configField}>
        <label className={styles.fieldLabel}>
          Título da Página
        </label>
        <input
          type="text"
          value={config.seo?.title || ''}
          onChange={(e) => handleInputChange('seo', 'title', e.target.value)}
          className={styles.fieldInput}
          placeholder="Título que aparece na aba do navegador"
        />
      </div>

      <div className={styles.configField}>
        <label className={styles.fieldLabel}>
          Descrição
        </label>
        <textarea
          value={config.seo?.description || ''}
          onChange={(e) => handleInputChange('seo', 'description', e.target.value)}
          className={styles.fieldTextarea}
          placeholder="Descrição que aparece nos resultados de busca"
          rows={3}
        />
      </div>

      <div className={styles.configField}>
        <label className={styles.fieldLabel}>
          Palavras-chave
        </label>
        <input
          type="text"
          value={config.seo?.keywords || ''}
          onChange={(e) => handleInputChange('seo', 'keywords', e.target.value)}
          className={styles.fieldInput}
          placeholder="palavra1, palavra2, palavra3"
        />
      </div>

      <div className={styles.configField}>
        <label className={styles.fieldLabel}>
          Open Graph Image
        </label>
        <input
          type="url"
          className={styles.fieldInput}
          placeholder="https://exemplo.com/imagem.jpg"
        />
        <p className={styles.fieldHint}>
          Imagem que aparece quando o quiz é compartilhado nas redes sociais
        </p>
      </div>
    </div>
  );

  const renderAnalyticsSection = () => (
    <div className={styles.configSection}>
      <h3 className={styles.sectionTitle}>Analytics & Tracking</h3>
      
      <div className={styles.configField}>
        <label className={styles.fieldLabel}>
          Facebook Pixel ID
        </label>
        <input
          type="text"
          value={config.pixel?.facebookPixelId || ''}
          onChange={(e) => handleInputChange('pixel', 'facebookPixelId', e.target.value)}
          className={styles.fieldInput}
          placeholder="123456789012345"
        />
      </div>

      <div className={styles.configField}>
        <label className={styles.fieldLabel}>
          Google Analytics ID
        </label>
        <input
          type="text"
          value={config.pixel?.googleAnalyticsId || ''}
          onChange={(e) => handleInputChange('pixel', 'googleAnalyticsId', e.target.value)}
          className={styles.fieldInput}
          placeholder="G-XXXXXXXXXX"
        />
      </div>

      <div className={styles.configField}>
        <label className={styles.fieldLabel}>
          Google Tag Manager ID
        </label>
        <input
          type="text"
          className={styles.fieldInput}
          placeholder="GTM-XXXXXXX"
        />
      </div>

      <div className={styles.configField}>
        <label className={styles.fieldLabel}>
          Hotjar Site ID
        </label>
        <input
          type="text"
          className={styles.fieldInput}
          placeholder="1234567"
        />
      </div>
    </div>
  );

  const renderBehaviorSection = () => (
    <div className={styles.configSection}>
      <h3 className={styles.sectionTitle}>Comportamento do Quiz</h3>
      
      <div className={styles.configGrid}>
        <div className={styles.configField}>
          <label className={styles.fieldLabel}>
            Pontos - Perguntas Normais
          </label>
          <input
            type="number"
            value={config.scoring?.normalQuestionPoints || 1}
            onChange={(e) => handleInputChange('scoring', 'normalQuestionPoints', parseInt(e.target.value))}
            className={styles.fieldInput}
            min="1"
            max="10"
          />
        </div>

        <div className={styles.configField}>
          <label className={styles.fieldLabel}>
            Pontos - Perguntas Estratégicas
          </label>
          <input
            type="number"
            value={config.scoring?.strategicQuestionPoints || 2}
            onChange={(e) => handleInputChange('scoring', 'strategicQuestionPoints', parseInt(e.target.value))}
            className={styles.fieldInput}
            min="1"
            max="10"
          />
        </div>
      </div>

      <div className={styles.configField}>
        <label className={styles.toggleField}>
          <input
            type="checkbox"
            checked={config.scoring?.autoAdvanceNormal || false}
            onChange={(e) => handleInputChange('scoring', 'autoAdvanceNormal', e.target.checked)}
          />
          <span>Avançar automaticamente em perguntas normais</span>
        </label>
      </div>

      <div className={styles.configField}>
        <label className={styles.toggleField}>
          <input
            type="checkbox"
            checked={config.scoring?.autoAdvanceStrategic || false}
            onChange={(e) => handleInputChange('scoring', 'autoAdvanceStrategic', e.target.checked)}
          />
          <span>Avançar automaticamente em perguntas estratégicas</span>
        </label>
      </div>
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'general':
        return renderGeneralSection();
      case 'seo':
        return renderSEOSection();
      case 'analytics':
        return renderAnalyticsSection();
      case 'behavior':
        return renderBehaviorSection();
      default:
        return (
          <div className={styles.comingSoon}>
            <Bell className="h-12 w-12 opacity-50" />
            <h3>Em breve</h3>
            <p>Esta seção está sendo desenvolvida.</p>
          </div>
        );
    }
  };

  return (
    <div className={styles.configPanel}>
      <div className={styles.configSidebar}>
        <h2 className={styles.panelTitle}>
          <Settings className="h-5 w-5" />
          Configurações
        </h2>
        
        <div className={styles.configNavigation}>
          {configSections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            
            return (
              <button
                key={section.id}
                className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                onClick={() => setActiveSection(section.id)}
              >
                <Icon className="h-4 w-4" />
                <span>{section.title}</span>
                {section.id === 'analytics' && (
                  <Badge variant="secondary" className="ml-auto">
                    2
                  </Badge>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <ScrollArea className={styles.configContent}>
        {renderSection()}
      </ScrollArea>

      <div className={styles.configActions}>
        <Button variant="outline" size="sm">
          Restaurar Padrões
        </Button>
        <Button size="sm">
          Salvar Configurações
        </Button>
      </div>
    </div>
  );
};

export default ConfigPanel;
