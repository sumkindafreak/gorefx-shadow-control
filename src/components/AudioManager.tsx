
import React from 'react';
import { Card } from '@/components/ui/card';

export const AudioManager: React.FC = () => {
  return (
    <div className="p-6">
      <Card className="horror-panel p-8 text-center">
        <h2 className="text-xl font-bold mb-4">🔊 Audio Manager</h2>
        <p className="text-gore-accent mb-4">
          Control YX5300/DFPlayer Pro MP3 modules
        </p>
        <div className="text-sm text-gore-accent/60">
          Coming soon: File browser, waveform display, upload from mobile
        </div>
      </Card>
    </div>
  );
};
