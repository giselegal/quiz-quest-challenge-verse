
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FileCode, X, Save } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface JsonConfigEditorProps {
  config: any;
  onUpdate: (config: any) => void;
}

export const JsonConfigEditor: React.FC<JsonConfigEditorProps> = ({
  config,
  onUpdate
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [jsonText, setJsonText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleOpen = () => {
    setJsonText(JSON.stringify(config, null, 2));
    setError(null);
    setIsOpen(true);
  };

  const handleSave = () => {
    try {
      const parsedConfig = JSON.parse(jsonText);
      onUpdate(parsedConfig);
      setIsOpen(false);
      toast({
        title: "Configuração atualizada",
        description: "A configuração JSON foi aplicada com sucesso"
      });
    } catch (err) {
      setError('JSON inválido. Verifique a sintaxe.');
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setError(null);
  };

  if (!isOpen) {
    return (
      <Button variant="outline" size="sm" onClick={handleOpen}>
        <FileCode className="w-4 h-4 mr-2" />
        Editar JSON
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="w-full max-w-4xl mx-4 h-[80vh]">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Editor de Configuração JSON</CardTitle>
          <Button variant="ghost" size="sm" onClick={handleClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        <CardContent className="flex flex-col h-full">
          <div className="flex-1 mb-4">
            <Textarea
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              className="h-full font-mono text-sm"
              placeholder="Cole sua configuração JSON aqui..."
            />
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} disabled={!!error}>
              <Save className="w-4 h-4 mr-2" />
              Aplicar Configuração
            </Button>
            <Button variant="outline" onClick={handleClose}>
              Cancelar
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
