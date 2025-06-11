
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

export const SettingsPanel: React.FC = () => {
  const [mp3VolumeA, setMp3VolumeA] = useState([75]);
  const [mp3VolumeB, setMp3VolumeB] = useState([75]);
  const [neoPixelBrightness, setNeoPixelBrightness] = useState([80]);
  const [diagnosticsFeedback, setDiagnosticsFeedback] = useState(true);
  const [buttonSoundFX, setButtonSoundFX] = useState(true);
  const [debugConsole, setDebugConsole] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const { toast } = useToast();

  const handleSaveSettings = () => {
    // Save settings to localStorage or ESP32
    const settings = {
      mp3VolumeA: mp3VolumeA[0],
      mp3VolumeB: mp3VolumeB[0],
      neoPixelBrightness: neoPixelBrightness[0],
      diagnosticsFeedback,
      buttonSoundFX,
      debugConsole,
      darkMode
    };

    localStorage.setItem('gorefx-settings', JSON.stringify(settings));
    toast({ title: "Settings saved successfully" });
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gore-red mb-2">⚙️ System Settings</h2>
        <p className="text-gore-accent">Configure GoreFX system parameters</p>
      </div>

      <div className="grid gap-6">
        {/* Audio Settings */}
        <Card className="horror-panel p-6">
          <h3 className="text-lg font-semibold text-gore-text mb-4">🔊 Audio Settings</h3>
          
          <div className="space-y-6">
            <div>
              <Label className="text-gore-text mb-2 block">MP3 Player A Volume</Label>
              <Slider
                value={mp3VolumeA}
                onValueChange={setMp3VolumeA}
                max={100}
                step={1}
                className="w-full"
              />
              <span className="text-sm text-gore-accent">{mp3VolumeA[0]}%</span>
            </div>

            <div>
              <Label className="text-gore-text mb-2 block">MP3 Player B Volume</Label>
              <Slider
                value={mp3VolumeB}
                onValueChange={setMp3VolumeB}
                max={100}
                step={1}
                className="w-full"
              />
              <span className="text-sm text-gore-accent">{mp3VolumeB[0]}%</span>
            </div>
          </div>
        </Card>

        {/* Lighting Settings */}
        <Card className="horror-panel p-6">
          <h3 className="text-lg font-semibold text-gore-text mb-4">💡 Lighting Settings</h3>
          
          <div>
            <Label className="text-gore-text mb-2 block">NeoPixel Global Brightness</Label>
            <Slider
              value={neoPixelBrightness}
              onValueChange={setNeoPixelBrightness}
              max={100}
              step={1}
              className="w-full"
            />
            <span className="text-sm text-gore-accent">{neoPixelBrightness[0]}%</span>
          </div>
        </Card>

        {/* System Settings */}
        <Card className="horror-panel p-6">
          <h3 className="text-lg font-semibold text-gore-text mb-4">🔧 System Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-gore-text">Diagnostics Feedback</Label>
              <Switch
                checked={diagnosticsFeedback}
                onCheckedChange={setDiagnosticsFeedback}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-gore-text">Button Sound FX</Label>
              <Switch
                checked={buttonSoundFX}
                onCheckedChange={setButtonSoundFX}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-gore-text">Debug Console</Label>
              <Switch
                checked={debugConsole}
                onCheckedChange={setDebugConsole}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label className="text-gore-text">Dark Horror Mode</Label>
              <Switch
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
          </div>
        </Card>

        {/* Save Button */}
        <Button onClick={handleSaveSettings} className="w-full horror-button">
          💾 Save Settings
        </Button>
      </div>
    </div>
  );
};
