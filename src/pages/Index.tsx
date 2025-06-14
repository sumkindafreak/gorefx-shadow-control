
import { useState, useEffect } from 'react';
import Dashboard from './Dashboard';

const Index = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading/initial connection attempt
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground animate-static-flicker font-spectral">
        <div className="text-center">
          <img src="/lovable-uploads/7b515ee1-bcf7-41c6-bc79-85cb6df5d491.png" alt="GoreFX Logo" className="w-80 mx-auto mb-4 animate-pulse" />
          <p className="text-lg text-accent-foreground/80 tracking-widest">A Showduino Control Interface</p>
        </div>
        <div className="absolute bottom-8 text-center">
          <p className="text-sm text-muted-foreground">Powered by</p>
          <img src="/lovable-uploads/a288355a-3dba-486d-b70f-3f6bef042a86.png" alt="Showduino Logo" className="w-40 mx-auto mt-1" />
        </div>
      </div>
    );
  }

  return <Dashboard />;
};

export default Index;
