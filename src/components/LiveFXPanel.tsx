
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface FXItem {
  id: string;
  name: string;
  category: 'fire' | 'fog' | 'lighting' | 'pneumatic' | 'audio';
  active: boolean;
  dangerous: boolean;
  relay: number;
}

const fxItems: FXItem[] = [
  { id: 'fx-1', name: 'Main Fire Burst', category: 'fire', active: false, dangerous: true, relay: 1 },
  { id: 'fx-2', name: 'Fog Machine 1', category: 'fog', active: false, dangerous: false, relay: 2 },
  { id: 'fx-3', name: 'Strobe Array', category: 'lighting', active: false, dangerous: false, relay: 3 },
  { id: 'fx-4', name: 'Pneumatic Jump', category: 'pneumatic', active: false, dangerous: false, relay: 4 },
  { id: 'fx-5', name: 'Pyro Flash', category: 'fire', active: false, dangerous: true, relay: 5 },
  { id: 'fx-6', name: 'Haze Machine', category: 'fog', active: false, dangerous: false, relay: 6 },
  { id: 'fx-7', name: 'UV Black Lights', category: 'lighting', active: false, dangerous: false, relay: 7 },
  { id: 'fx-8', name: 'Air Cannon', category: 'pneumatic', active: false, dangerous: false, relay: 8 },
];

const categoryIcons = {
  fire: '🔥',
  fog: '🌫️',
  lighting: '⚡',
  pneumatic: '💨',
  audio: '🔊'
};

const categoryColors = {
  fire: 'border-gore-red bg-gore-red/10',
  fog: 'border-gray-400 bg-gray-400/10',
  lighting: 'border-yellow-400 bg-yellow-400/10',
  pneumatic: 'border-blue-400 bg-blue-400/10',
  audio: 'border-purple-400 bg-purple-400/10'
};

export const LiveFXPanel: React.FC = () => {
  const [fxStates, setFxStates] = useState<Record<string, boolean>>({});
  const [triggerLog, setTriggerLog] = useState<string[]>([]);

  const toggleFX = (fx: FXItem) => {
    // Safety confirmation for dangerous FX
    if (fx.dangerous && !fxStates[fx.id]) {
      const confirmed = window.confirm(`⚠️ DANGER: ${fx.name} involves fire/pyrotechnics. Continue?`);
      if (!confirmed) return;
    }

    const newState = !fxStates[fx.id];
    setFxStates(prev => ({ ...prev, [fx.id]: newState }));

    // Add to trigger log
    const timestamp = new Date().toLocaleTimeString();
    const action = newState ? 'ACTIVATED' : 'DEACTIVATED';
    setTriggerLog(prev => [`${timestamp}: ${fx.name} ${action}`, ...prev.slice(0, 9)]);

    // Vibration feedback
    if (navigator.vibrate) {
      navigator.vibrate(newState ? 100 : 50);
    }

    // Send command to Showduino
    console.log(`Command: RELAY_${fx.relay}_${newState ? 'ON' : 'OFF'}`);
  };

  const groupedFX = fxItems.reduce((acc, fx) => {
    if (!acc[fx.category]) acc[fx.category] = [];
    acc[fx.category].push(fx);
    return acc;
  }, {} as Record<string, FXItem[]>);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gore-text">Live FX Control</h1>
        <div className="text-sm text-gore-accent">
          {Object.values(fxStates).filter(Boolean).length} / {fxItems.length} Active
        </div>
      </div>

      {/* FX Controls by Category */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Object.entries(groupedFX).map(([category, items]) => (
          <Card key={category} className={`horror-panel p-4 ${categoryColors[category as keyof typeof categoryColors]}`}>
            <h3 className="font-semibold text-lg mb-4 flex items-center space-x-2">
              <span className="text-2xl">{categoryIcons[category as keyof typeof categoryIcons]}</span>
              <span className="capitalize">{category} Effects</span>
            </h3>
            
            <div className="grid grid-cols-2 gap-3">
              {items.map((fx) => (
                <Button
                  key={fx.id}
                  onClick={() => toggleFX(fx)}
                  className={`fx-button h-auto p-3 flex flex-col items-center space-y-1 ${
                    fxStates[fx.id] ? 'active' : ''
                  }`}
                >
                  <div className="text-lg">
                    {categoryIcons[fx.category]}
                    {fx.dangerous && '⚠️'}
                  </div>
                  <div className="text-xs text-center leading-tight">
                    {fx.name}
                  </div>
                  <div className="text-xs opacity-60">
                    Relay {fx.relay}
                  </div>
                </Button>
              ))}
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Trigger Log */}
      <Card className="horror-panel p-4">
        <h3 className="font-semibold mb-3">Recent Activity</h3>
        <div className="max-h-32 overflow-y-auto space-y-1">
          {triggerLog.length === 0 ? (
            <p className="text-gore-accent text-sm">No recent activity</p>
          ) : (
            triggerLog.map((entry, index) => (
              <div key={index} className="text-sm font-mono text-gore-text/80">
                {entry}
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};
