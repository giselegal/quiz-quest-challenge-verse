
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Zap, ExternalLink, Copy, Check } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ZapierCardProps {
  className?: string;
}

const ZapierCard: React.FC<ZapierCardProps> = ({ className }) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleTest = async () => {
    if (!webhookUrl) {
      toast({
        title: "Erro",
        description: "Por favor, insira a URL do webhook do Zapier",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors',
        body: JSON.stringify({
          test: true,
          timestamp: new Date().toISOString(),
          source: 'quiz-analytics'
        })
      });

      toast({
        title: "Teste enviado",
        description: "Verifique o histórico do seu Zap para confirmar se foi acionado",
      });
    } catch (error) {
      toast({
        title: "Erro no teste",
        description: "Falha ao testar o webhook. Verifique a URL e tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(webhookUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "URL copiada",
      description: "A URL do webhook foi copiada para a área de transferência",
    });
  };

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-orange-500" />
            <CardTitle>Zapier Integration</CardTitle>
          </div>
          <Badge variant={isEnabled ? "default" : "secondary"}>
            {isEnabled ? "Ativo" : "Inativo"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Habilitar integração</span>
          <Switch
            checked={isEnabled}
            onCheckedChange={setIsEnabled}
          />
        </div>

        {isEnabled && (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium">Webhook URL</label>
              <div className="flex gap-2">
                <Input
                  placeholder="https://hooks.zapier.com/hooks/catch/..."
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                />
                {webhookUrl && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={copyUrl}
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </Button>
                )}
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={handleTest}
                disabled={!webhookUrl || isLoading}
                size="sm"
              >
                {isLoading ? "Testando..." : "Testar Webhook"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open('https://zapier.com/apps/webhook', '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Criar Zap
              </Button>
            </div>

            <div className="text-xs text-muted-foreground space-y-1">
              <p>• Os dados do quiz serão enviados automaticamente para o Zapier</p>
              <p>• Configure triggers baseados em respostas específicas</p>
              <p>• Conecte com mais de 5000 aplicações</p>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ZapierCard;
