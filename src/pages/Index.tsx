
import React, { useState } from 'react';
import { SplashScreen } from '@/components/SplashScreen';
import { Dashboard } from '@/components/Dashboard';

type AppMode = 'splash' | 'dashboard' | 'builder';

const Index = () => {
  const [appMode, setAppMode] = useState<AppMode>('splash');

  const handleConnect = () => {
    setAppMode('dashboard');
  };

  const handleBuilderMode = () => {
    setAppMode('builder');
  };

  switch (appMode) {
    case 'splash':
      return <SplashScreen onConnect={handleConnect} onBuilderMode={handleBuilderMode} />;
    case 'dashboard':
      return <Dashboard />;
    case 'builder':
      return (
        <div className="min-h-screen bg-gore-black flex items-center justify-center">
          <div className="text-center text-gore-text">
            <h1 className="text-2xl font-bold mb-4">🛠️ Builder Mode</h1>
            <p className="text-gore-accent">Scene builder and HauntSync integration coming soon</p>
          </div>
        </div>
      );
    default:
      return <SplashScreen onConnect={handleConnect} onBuilderMode={handleBuilderMode} />;
  }
};

export default Index;
