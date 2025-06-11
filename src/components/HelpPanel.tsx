
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const HelpPanel: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gore-red mb-2">❓ Help & About</h2>
        <p className="text-gore-accent">System information and support</p>
      </div>

      <div className="grid gap-6">
        {/* System Info */}
        <Card className="horror-panel p-6">
          <h3 className="text-lg font-semibold text-gore-text mb-4">📋 System Information</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gore-accent">Version:</span>
              <span className="text-gore-text">Showduino v2.1</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gore-accent">Build:</span>
              <span className="text-gore-text">2025.01</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gore-accent">Platform:</span>
              <span className="text-gore-text">ESP32-WROOM-32</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gore-accent">Firmware:</span>
              <span className="text-gore-text">GoreFX v1.0</span>
            </div>
          </div>
        </Card>

        {/* Safety Warning */}
        <Card className="horror-panel p-6 border-gore-warning/50">
          <h3 className="text-lg font-semibold text-gore-warning mb-4">⚠️ Safety Warning</h3>
          <div className="text-sm text-gore-text space-y-2">
            <p>This system controls live pyrotechnics and mechanical devices.</p>
            <p>Always ensure proper safety protocols are followed:</p>
            <ul className="list-disc list-inside space-y-1 text-gore-accent ml-4">
              <li>Fire suppression systems active</li>
              <li>Emergency stops accessible</li>
              <li>Proper ventilation for fog/smoke effects</li>
              <li>Electrical safety protocols followed</li>
              <li>Personnel trained on emergency procedures</li>
            </ul>
          </div>
        </Card>

        {/* Contact & Support */}
        <Card className="horror-panel p-6">
          <h3 className="text-lg font-semibold text-gore-text mb-4">📧 Contact & Support</h3>
          <div className="space-y-4">
            <div className="text-sm">
              <p className="text-gore-accent mb-2">Technical Support:</p>
              <p className="text-gore-text">showduino38@gmail.com</p>
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={() => window.open('mailto:showduino38@gmail.com', '_blank')}
                className="horror-button"
              >
                📧 Contact Support
              </Button>
              <Button 
                onClick={() => window.open('https://buymeacoffee.com/showduino', '_blank')}
                variant="outline"
                className="border-gore-accent/50 text-gore-accent hover:bg-gore-accent/10"
              >
                ☕ Buy Me a Coffee
              </Button>
            </div>
          </div>
        </Card>

        {/* QR Code & Community */}
        <Card className="horror-panel p-6">
          <h3 className="text-lg font-semibold text-gore-text mb-4">🎃 ScareSync™ Community</h3>
          <div className="text-center space-y-4">
            <div className="w-32 h-32 bg-gore-accent/20 mx-auto rounded-sm flex items-center justify-center">
              <span className="text-4xl">📱</span>
            </div>
            <p className="text-sm text-gore-accent">
              Scan QR code to join ScareSync™ mobile community
            </p>
            <Button className="horror-button">
              🔗 Join Community
            </Button>
          </div>
        </Card>

        {/* Roadmap */}
        <Card className="horror-panel p-6">
          <h3 className="text-lg font-semibold text-gore-text mb-4">🛣️ Development Roadmap</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-gore-text">Live FX Control</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-gore-text">Firebase Forum Integration</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-gore-warning rounded-full"></span>
              <span className="text-gore-text">Timeline Scene Editor</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-gore-accent rounded-full"></span>
              <span className="text-gore-text">Mobile App Companion</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-gore-accent rounded-full"></span>
              <span className="text-gore-text">Cloud Scene Sync</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
