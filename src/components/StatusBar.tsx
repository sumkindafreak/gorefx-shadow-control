
import React, { useState, useEffect } from 'react';

interface StatusBarProps {
  connected: boolean;
}

export const StatusBar: React.FC<StatusBarProps> = ({ connected }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [batteryLevel] = useState(87); // Mock battery level

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gore-steel border-b border-gore-accent/30 px-6 py-3 flex items-center justify-between">
      {/* Left: System Status */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <div className={`status-indicator ${connected ? 'online' : 'offline'}`} />
          <span className="text-sm font-medium">
            Showduino {connected ? 'Connected' : 'Offline'}
          </span>
        </div>
        
        {connected && (
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full" />
            <span className="text-xs text-gore-accent">192.168.4.1</span>
          </div>
        )}
      </div>

      {/* Right: System Info */}
      <div className="flex items-center space-x-6">
        {connected && (
          <div className="flex items-center space-x-2">
            <span className="text-xs text-gore-accent">Battery:</span>
            <div className="w-8 h-3 border border-gore-accent/50 rounded-sm overflow-hidden">
              <div 
                className={`h-full transition-all duration-300 ${
                  batteryLevel > 50 ? 'bg-green-500' : 
                  batteryLevel > 20 ? 'bg-yellow-500' : 'bg-gore-red'
                }`}
                style={{ width: `${batteryLevel}%` }}
              />
            </div>
            <span className="text-xs text-gore-text">{batteryLevel}%</span>
          </div>
        )}
        
        <div className="text-sm font-mono text-gore-text">
          {currentTime.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};
