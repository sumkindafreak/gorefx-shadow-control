
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface SplashScreenProps {
  onConnect: () => void;
  onBuilderMode: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onConnect, onBuilderMode }) => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'detecting' | 'found' | 'failed'>('idle');

  const detectShowduino = async () => {
    setIsDetecting(true);
    setConnectionStatus('detecting');
    
    try {
      // Simulate ESP32 detection at ws://192.168.4.1/ws
      const response = await fetch('http://192.168.4.1', { 
        mode: 'no-cors',
        signal: AbortSignal.timeout(3000) 
      });
      setConnectionStatus('found');
      setTimeout(onConnect, 1500);
    } catch (error) {
      setConnectionStatus('failed');
      setIsDetecting(false);
    }
  };

  useEffect(() => {
    // Auto-detect on load
    detectShowduino();
  }, []);

  return (
    <div className="min-h-screen bg-gore-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Flicker overlay */}
      <div className="flicker-overlay opacity-30" />
      
      {/* Background texture */}
      <div className="absolute inset-0 bg-gradient-radial from-gore-red/5 via-transparent to-transparent" />
      
      <Card className="horror-panel p-8 max-w-md w-full text-center relative z-10">
        {/* Logo Section */}
        <div className="mb-8">
          <h1 className="font-display text-4xl font-black text-gore-red mb-2 glitch-text" data-text="GOREFX">
            GOREFX
          </h1>
          <p className="text-gore-accent text-sm font-medium tracking-wider">
            POWERED BY SHOWDUINO
          </p>
          <div className="w-16 h-0.5 bg-gore-red mx-auto mt-4 opacity-80" />
        </div>

        {/* Status Display */}
        <div className="mb-8">
          {connectionStatus === 'detecting' && (
            <div className="flex items-center justify-center space-x-3">
              <div className="status-indicator offline animate-pulse" />
              <span className="text-gore-text">Detecting Showduino...</span>
            </div>
          )}
          
          {connectionStatus === 'found' && (
            <div className="flex items-center justify-center space-x-3">
              <div className="status-indicator online" />
              <span className="text-green-400">Showduino Connected!</span>
            </div>
          )}
          
          {connectionStatus === 'failed' && (
            <div className="flex items-center justify-center space-x-3">
              <div className="status-indicator offline" />
              <span className="text-gore-warning">No Showduino Detected</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          {connectionStatus === 'found' ? (
            <Button 
              onClick={onConnect}
              className="w-full horror-button text-gore-text hover:text-white"
            >
              🎃 Enter Dashboard
            </Button>
          ) : (
            <>
              <Button 
                onClick={detectShowduino}
                disabled={isDetecting}
                className="w-full horror-button"
              >
                {isDetecting ? '🔍 Scanning...' : '🔌 Connect to Showduino'}
              </Button>
              
              <Button 
                onClick={onBuilderMode}
                variant="outline"
                className="w-full border-gore-accent/50 text-gore-accent hover:bg-gore-accent/10"
              >
                🛠️ Open Builder Panel
              </Button>
            </>
          )}
        </div>

        {/* Warning Text */}
        <div className="mt-6 text-xs text-gore-accent/60 leading-relaxed">
          ⚠️ This system controls live pyrotechnics and mechanical devices.
          <br />
          Use with extreme caution.
        </div>
      </Card>
    </div>
  );
};
