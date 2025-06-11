
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { 
  Flame, 
  Cloud, 
  Zap, 
  DoorOpen, 
  Wind,
  Lightbulb,
  Volume2,
  Skull
} from 'lucide-react';

interface FXButton {
  id: string;
  name: string;
  icon: React.ElementType;
  category: 'fire' | 'fog' | 'lighting' | 'mechanical' | 'sound' | 'pyro';
  active: boolean;
  dangerous: boolean;
}

export const LiveFXPanel: React.FC = () => {
  const { toast } = useToast();
  const [fxButtons, setFxButtons] = useState<FXButton[]>([
    { id: 'fire-1', name: 'Fire Jet 1', icon: Flame, category: 'fire', active: false, dangerous: true },
    { id: 'fire-2', name: 'Fire Jet 2', icon: Flame, category: 'fire', active: false, dangerous: true },
    { id: 'fog-1', name: 'Low Fog', icon: Cloud, category: 'fog', active: false, dangerous: false },
    { id: 'fog-2', name: 'Haze Machine', icon: Cloud, category: 'fog', active: false, dangerous: false },
    { id: 'strobe-1', name: 'Strobe Light', icon: Zap, category: 'lighting', active: false, dangerous: false },
    { id: 'strobe-2', name: 'Flash Pod', icon: Lightbulb, category: 'lighting', active: false, dangerous: false },
    { id: 'door-1', name: 'Coffin Door', icon: DoorOpen, category: 'mechanical', active: false, dangerous: false },
    { id: 'air-1', name: 'Air Blast', icon: Wind, category: 'mechanical', active: false, dangerous: false },
    { id: 'sound-1', name: 'Scream FX', icon: Volume2, category: 'sound', active: false, dangerous: false },
    { id: 'pyro-1', name: 'Flash Powder', icon: Skull, category: 'pyro', active: false, dangerous: true },
  ]);
  
  const [triggerLog, setTriggerLog] = useState<string[]>([]);

  const sendCommand = (command: string) => {
    const timestamp = new Date().toLocaleTimeString();
    const logEntry = `${timestamp} - ${command}`;
    setTriggerLog(prev => [logEntry, ...prev.slice(0, 9)]);
    
    // Send WebSocket command to ESP32
    console.log(`Sending command: ${command}`);
    
    // In a real implementation, this would send to ws://192.168.4.1/ws
    // const ws = new WebSocket('ws://192.168.4.1/ws');
    // ws.send(JSON.stringify({ type: 'command', command, timestamp: new Date().toISOString() }));
  };

  const handleFXToggle = (fxId: string) => {
    const fx = fxButtons.find(f => f.id === fxId);
    if (!fx) return;

    if (fx.dangerous) {
      const confirmed = window.confirm(`⚠️ DANGER: Are you sure you want to trigger ${fx.name}? This controls live pyrotechnics!`);
      if (!confirmed) return;
    }

    setFxButtons(prev => prev.map(f => 
      f.id === fxId ? { ...f, active: !f.active } : f
    ));

    const command = fx.active ? `${fxId.toUpperCase()}_OFF` : `${fxId.toUpperCase()}_ON`;
    sendCommand(command);

    toast({
      title: fx.active ? "FX Deactivated" : "FX Activated",
      description: fx.name,
      duration: 2000
    });

    // Vibration feedback for mobile
    if (navigator.vibrate) {
      navigator.vibrate(100);
    }
  };

  const categorizeButtons = () => {
    const categories = {
      fire: fxButtons.filter(f => f.category === 'fire'),
      fog: fxButtons.filter(f => f.category === 'fog'),
      lighting: fxButtons.filter(f => f.category === 'lighting'),
      mechanical: fxButtons.filter(f => f.category === 'mechanical'),
      sound: fxButtons.filter(f => f.category === 'sound'),
      pyro: fxButtons.filter(f => f.category === 'pyro'),
    };
    return categories;
  };

  const categories = categorizeButtons();

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gore-red mb-2">🔥 Live FX Control</h2>
        <p className="text-gore-accent">Real-time control of horror effects</p>
      </div>

      {/* FX Categories */}
      <div className="grid gap-6">
        {Object.entries(categories).map(([categoryName, buttons]) => (
          buttons.length > 0 && (
            <Card key={categoryName} className="horror-panel p-6">
              <h3 className="text-lg font-semibold text-gore-text mb-4 capitalize">
                {categoryName === 'fire' && '🔥'} 
                {categoryName === 'fog' && '🌫️'} 
                {categoryName === 'lighting' && '⚡'} 
                {categoryName === 'mechanical' && '🔧'} 
                {categoryName === 'sound' && '🔊'} 
                {categoryName === 'pyro' && '💀'} 
                {categoryName} Effects
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {buttons.map((fx) => {
                  const Icon = fx.icon;
                  return (
                    <Button
                      key={fx.id}
                      onClick={() => handleFXToggle(fx.id)}
                      className={`
                        fx-button h-16 flex flex-col items-center justify-center gap-1 p-2
                        ${fx.active ? 'active bg-gore-red hover:bg-gore-red/80' : ''}
                        ${fx.dangerous ? 'border-gore-warning' : ''}
                      `}
                    >
                      <Icon size={20} />
                      <span className="text-xs text-center leading-tight">{fx.name}</span>
                      {fx.dangerous && <span className="text-xs text-gore-warning">⚠️</span>}
                    </Button>
                  );
                })}
              </div>
            </Card>
          )
        ))}
      </div>

      {/* Quick Trigger Log */}
      <Card className="horror-panel p-6">
        <h3 className="text-lg font-semibold text-gore-text mb-4">📋 Trigger Log</h3>
        <div className="bg-gore-black rounded-sm p-4 h-48 overflow-y-auto">
          {triggerLog.length === 0 ? (
            <p className="text-gore-accent text-sm">No recent triggers...</p>
          ) : (
            <div className="space-y-1">
              {triggerLog.map((entry, index) => (
                <div key={index} className="text-sm text-gore-text font-mono">
                  {entry}
                </div>
              ))}
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
