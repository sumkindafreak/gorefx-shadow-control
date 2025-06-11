
import React from 'react';
import { Card } from '@/components/ui/card';

export const TimelineEditor: React.FC = () => {
  return (
    <div className="p-6">
      <Card className="horror-panel p-8 text-center">
        <h2 className="text-xl font-bold mb-4">🎬 Timeline Editor</h2>
        <p className="text-gore-accent mb-4">
          Drag-and-drop timeline for sequencing FX and audio cues
        </p>
        <div className="text-sm text-gore-accent/60">
          Coming in next update: 5-track timeline with .shdo export
        </div>
      </Card>
    </div>
  );
};
