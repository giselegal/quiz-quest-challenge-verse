import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const FacebookPixelCard: React.FC = () => {
  const [config, setConfig] = useState({
    pixelId: '',
    advancedMatching: false,
    testEventCode: '',
    customEvents: [],
  });

  useEffect(() => {
    const storedConfig = localStorage.getItem('facebookPixelConfig');
    if (storedConfig) {
      setConfig(JSON.parse(storedConfig));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('facebookPixelConfig', JSON.stringify(config));
  }, [config]);

  const updateConfig = (updates: any) => {
    setConfig((prev: any) => ({
      ...prev,
      ...updates
    }));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Facebook Pixel Integration</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex items-center space-x-2">
          <Label htmlFor="pixelId">Pixel ID</Label>
          <Input
            id="pixelId"
            value={config.pixelId}
            onChange={(e) => updateConfig({ pixelId: e.target.value })}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="advancedMatching">Advanced Matching</Label>
          <Switch
            id="advancedMatching"
            checked={config.advancedMatching}
            onCheckedChange={(checked) => updateConfig({ advancedMatching: checked })}
          />
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="testEventCode">Test Event Code</Label>
          <Input
            id="testEventCode"
            value={config.testEventCode}
            onChange={(e) => updateConfig({ testEventCode: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="customEvents">Custom Events (JSON)</Label>
          <Textarea
            id="customEvents"
            value={JSON.stringify(config.customEvents)}
            onChange={(e) => {
              try {
                const events = JSON.parse(e.target.value);
                updateConfig({ customEvents: events });
              } catch (error) {
                console.error('Invalid JSON', error);
              }
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default FacebookPixelCard;
