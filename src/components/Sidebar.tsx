
import React from 'react';
import { 
  Zap, 
  Flame, 
  Cloud 
} from 'lucide-react';

type DashboardTab = 'live-fx' | 'timeline' | 'audio' | 'diagnostics' | 'forum' | 'settings' | 'help';

interface SidebarProps {
  activeTab: DashboardTab;
  onTabChange: (tab: DashboardTab) => void;
}

const navigationItems = [
  { id: 'live-fx' as DashboardTab, label: 'Live FX', icon: Flame, description: 'Real-time control' },
  { id: 'timeline' as DashboardTab, label: 'Timeline', icon: Zap, description: 'Scene editor' },
  { id: 'audio' as DashboardTab, label: 'Audio', icon: Cloud, description: 'Sound manager' },
  { id: 'diagnostics' as DashboardTab, label: 'Diagnostics', icon: Zap, description: 'System status' },
  { id: 'forum' as DashboardTab, label: 'HauntSync', icon: Cloud, description: 'Community' },
  { id: 'settings' as DashboardTab, label: 'Settings', icon: Zap, description: 'Configuration' },
  { id: 'help' as DashboardTab, label: 'Help', icon: Cloud, description: 'Support' },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="w-64 bg-gore-steel border-r border-gore-accent/30 flex flex-col relative">
      {/* Header */}
      <div className="p-6 border-b border-gore-accent/30">
        <h2 className="font-display text-xl font-bold text-gore-red">GOREFX</h2>
        <p className="text-xs text-gore-accent mt-1">CONTROL SYSTEM</p>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`
                w-full p-3 rounded-sm text-left transition-all duration-200
                flex items-center space-x-3 group
                ${isActive 
                  ? 'bg-gore-red/20 border border-gore-red/50 text-gore-red' 
                  : 'hover:bg-gore-accent/10 border border-transparent text-gore-text hover:text-gore-red'
                }
              `}
            >
              <Icon size={18} className={isActive ? 'text-gore-red' : 'text-gore-accent group-hover:text-gore-red'} />
              <div className="flex-1 min-w-0">
                <div className="font-medium">{item.label}</div>
                <div className="text-xs text-gore-accent/70">{item.description}</div>
              </div>
            </button>
          );
        })}
      </nav>
      
      {/* Footer */}
      <div className="p-4 border-t border-gore-accent/30">
        <div className="text-xs text-gore-accent/60 text-center">
          Showduino v2.1
          <br />
          Build 2025.01
        </div>
      </div>
    </div>
  );
};
