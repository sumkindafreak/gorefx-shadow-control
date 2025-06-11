
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

export const BottomControls: React.FC = () => {
  const [audioFeedback, setAudioFeedback] = useState(true);

  const handleEmergencyStop = () => {
    // Trigger vibration if available
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }
    
    console.log('🚨 EMERGENCY STOP ACTIVATED');
    // Send emergency stop command to Showduino
  };

  const handleSystemReset = () => {
    if (navigator.vibrate) {
      navigator.vibrate(200);
    }
    
    console.log('🔄 SYSTEM RESET INITIATED');
    // Send reset command to Showduino
  };

  const toggleAudioFeedback = () => {
    setAudioFeedback(!audioFeedback);
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
  };

  return (
    <div className="bg-gore-steel border-t border-gore-accent/30 p-4">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        {/* Emergency Controls */}
        <div className="flex items-center space-x-4">
          <Button
            onClick={handleEmergencyStop}
            className="emergency-button"
          >
            🔴 EMERGENCY STOP
          </Button>
          
          <Button
            onClick={handleSystemReset}
            className="horror-button hover:bg-gore-warning hover:text-black"
          >
            🔁 SYSTEM RESET
          </Button>
        </div>

        {/* Audio Toggle */}
        <Button
          onClick={toggleAudioFeedback}
          variant="outline"
          className={`border-gore-accent/50 ${
            audioFeedback 
              ? 'bg-gore-accent/20 text-gore-text' 
              : 'text-gore-accent hover:bg-gore-accent/10'
          }`}
        >
          🎧 Audio {audioFeedback ? 'ON' : 'OFF'}
        </Button>
      </div>
    </div>
  );
};
