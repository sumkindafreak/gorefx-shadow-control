
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
          <img src="/gorefx_logo.png" alt="GoreFX Logo" className="w-80 mx-auto mb-4 animate-pulse" />
          <p className="text-lg text-accent-foreground/80 tracking-widest">A Showduino Control Interface</p>
        </div>
        <div className="absolute bottom-8 text-center">
          <p className="text-sm text-muted-foreground">Powered by</p>
          <img src="/showduino_logo.png" alt="Showduino Logo" className="w-40 mx-auto mt-1" />
        </div>
      </div>
    );
  }

  return <Dashboard />;
};

export default Index;
