
import React from 'react';
import { Card } from '@/components/ui/card';

export const DiagnosticsPanel: React.FC = () => {
  return (
    <div className="p-6">
      <Card className="horror-panel p-8 text-center">
        <h2 className="text-xl font-bold mb-4">🔧 System Diagnostics</h2>
        <p className="text-gore-accent mb-4">
          Real-time system monitoring and debug console
        </p>
        <div className="text-sm text-gore-accent/60">
          Command logs, ESP32 status, voltage monitoring
        </div>
      </Card>
    </div>
  );
};
