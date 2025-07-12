
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, Save } from 'lucide-react';

interface GlobalStylesEditorProps {
  globalStyles: {
    primaryColor?: string;
    secondaryColor?: string;
    textColor?: string;
    backgroundColor?: string;
    fontFamily?: string;
  };
  onSave: (styles: any) => void;
  onCancel: () => void;
}

export const GlobalStylesEditor: React.FC<GlobalStylesEditorProps> = ({
  globalStyles,
  onSave,
  onCancel
}) => {
  const [styles, setStyles] = useState(globalStyles);

  const handleChange = (key: string, value: string) => {
    setStyles(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    onSave(styles);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Estilos Globais</CardTitle>
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="primaryColor">Cor Primária</Label>
            <Input
              id="primaryColor"
              type="color"
              value={styles.primaryColor || '#B89B7A'}
              onChange={(e) => handleChange('primaryColor', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="secondaryColor">Cor Secundária</Label>
            <Input
              id="secondaryColor"
              type="color"
              value={styles.secondaryColor || '#432818'}
              onChange={(e) => handleChange('secondaryColor', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="textColor">Cor do Texto</Label>
            <Input
              id="textColor"
              type="color"
              value={styles.textColor || '#432818'}
              onChange={(e) => handleChange('textColor', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="backgroundColor">Cor de Fundo</Label>
            <Input
              id="backgroundColor"
              type="color"
              value={styles.backgroundColor || '#FAF9F7'}
              onChange={(e) => handleChange('backgroundColor', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fontFamily">Família da Fonte</Label>
            <Input
              id="fontFamily"
              value={styles.fontFamily || 'Playfair Display, serif'}
              onChange={(e) => handleChange('fontFamily', e.target.value)}
              placeholder="Arial, sans-serif"
            />
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button onClick={handleSave} className="flex-1">
              <Save className="w-4 h-4 mr-2" />
              Salvar
            </Button>
            <Button variant="outline" onClick={onCancel} className="flex-1">
              Cancelar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
