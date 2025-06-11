
import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { StatusBar } from './StatusBar';
import { BottomControls } from './BottomControls';
import { LiveFXPanel } from './LiveFXPanel';
import { TimelineEditor } from './TimelineEditor';
import { AudioManager } from './AudioManager';
import { DiagnosticsPanel } from './DiagnosticsPanel';
import { ForumPanel } from './ForumPanel';
import { SettingsPanel } from './SettingsPanel';
import { HelpPanel } from './HelpPanel';

type DashboardTab = 'live-fx' | 'timeline' | 'audio' | 'diagnostics' | 'forum' | 'settings' | 'help';

export const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DashboardTab>('live-fx');
  const [showduinoConnected, setShowduinoConnected] = useState(true);

  const renderContent = () => {
    switch (activeTab) {
      case 'live-fx':
        return <LiveFXPanel />;
      case 'timeline':
        return <TimelineEditor />;
      case 'audio':
        return <AudioManager />;
      case 'diagnostics':
        return <DiagnosticsPanel />;
      case 'forum':
        return <ForumPanel />;
      case 'settings':
        return <SettingsPanel />;
      case 'help':
        return <HelpPanel />;
      default:
        return <LiveFXPanel />;
    }
  };

  return (
    <div className="min-h-screen bg-gore-black flex w-full relative overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-gore-red/5 via-transparent to-gore-accent/5" />
      </div>
      
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative z-10">
        {/* Top Status Bar */}
        <StatusBar connected={showduinoConnected} />
        
        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          {renderContent()}
        </main>
        
        {/* Bottom Emergency Controls */}
        <BottomControls />
      </div>
    </div>
  );
};
