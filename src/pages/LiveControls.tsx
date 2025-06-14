
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Power, Volume2, Lightbulb, Zap, Music } from "lucide-react";
import { Link } from "react-router-dom";
import { useWebSocket } from "@/hooks/useWebSocket";
import WebSocketConnection from "@/components/WebSocketConnection";
import { useState } from "react";

const LiveControls = () => {
  const { isConnected, sendCommand } = useWebSocket();
  const [masterVolume, setMasterVolume] = useState([75]);
  const [lightingBrightness, setLightingBrightness] = useState([80]);
  const [audioLevel, setAudioLevel] = useState([65]);

  const handleMasterPower = (enabled: boolean) => {
    sendCommand({
      type: 'system',
      action: 'master_power',
      value: enabled
    });
  };

  const handleEmergencyStop = () => {
    sendCommand({
      type: 'system',
      action: 'emergency_stop'
    });
  };

  const handleVolumeChange = (value: number[]) => {
    setMasterVolume(value);
    sendCommand({
      type: 'audio',
      action: 'volume',
      value: value[0]
    });
  };

  const handleLightingToggle = (zone: string, enabled: boolean) => {
    sendCommand({
      type: 'lighting',
      action: 'zone_toggle',
      value: enabled,
      channel: zone === 'front_yard' ? 1 : zone === 'porch' ? 2 : 3
    });
  };

  const handleBrightnessChange = (value: number[]) => {
    setLightingBrightness(value);
    sendCommand({
      type: 'lighting',
      action: 'brightness',
      value: value[0]
    });
  };

  const handleAudioToggle = (zone: string, enabled: boolean) => {
    sendCommand({
      type: 'audio',
      action: 'zone_toggle',
      value: enabled,
      channel: zone === 'main' ? 1 : 2
    });
  };

  const handleAudioLevelChange = (value: number[]) => {
    setAudioLevel(value);
    sendCommand({
      type: 'audio',
      action: 'level',
      value: value[0]
    });
  };

  const handleSpecialEffect = (effect: string) => {
    sendCommand({
      type: 'effects',
      action: effect
    });
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex bg-background font-orbitron">
        <AppSidebar />
        <div className="flex flex-col w-full">
          <Header />
          <SidebarInset className="p-4 lg:p-8 flex-grow">
            <div className="flex items-center gap-4 mb-6">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Dashboard
                </Link>
              </Button>
            </div>
            
            <main className="flex-1 space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold font-spectral">Live Controls</h1>
                <Badge variant="outline" className={isConnected ? "bg-green-500/10 text-green-700" : "bg-red-500/10 text-red-700"}>
                  {isConnected ? "LIVE" : "OFFLINE"}
                </Badge>
              </div>

              {/* WebSocket Connection */}
              <WebSocketConnection />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Master Controls */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Power className="w-5 h-5" />
                      Master Controls
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>System Power</span>
                      <Switch 
                        defaultChecked 
                        onCheckedChange={handleMasterPower}
                        disabled={!isConnected}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Emergency Stop</span>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={handleEmergencyStop}
                        disabled={!isConnected}
                      >
                        STOP
                      </Button>
                    </div>
                    <div className="space-y-2">
                      <span>Master Volume</span>
                      <Slider 
                        value={masterVolume}
                        onValueChange={handleVolumeChange}
                        max={100} 
                        step={1}
                        disabled={!isConnected}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Lighting Controls */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="w-5 h-5" />
                      Lighting Zones
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Front Yard</span>
                      <Switch 
                        defaultChecked 
                        onCheckedChange={(checked) => handleLightingToggle('front_yard', checked)}
                        disabled={!isConnected}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Porch Lights</span>
                      <Switch 
                        onCheckedChange={(checked) => handleLightingToggle('porch', checked)}
                        disabled={!isConnected}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Strobe Effects</span>
                      <Switch 
                        defaultChecked 
                        onCheckedChange={(checked) => handleLightingToggle('strobe', checked)}
                        disabled={!isConnected}
                      />
                    </div>
                    <div className="space-y-2">
                      <span>Brightness</span>
                      <Slider 
                        value={lightingBrightness}
                        onValueChange={handleBrightnessChange}
                        max={100} 
                        step={1}
                        disabled={!isConnected}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Audio Controls */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Volume2 className="w-5 h-5" />
                      Audio Zones
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Main Speakers</span>
                      <Switch 
                        defaultChecked 
                        onCheckedChange={(checked) => handleAudioToggle('main', checked)}
                        disabled={!isConnected}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Ambient Sounds</span>
                      <Switch 
                        defaultChecked 
                        onCheckedChange={(checked) => handleAudioToggle('ambient', checked)}
                        disabled={!isConnected}
                      />
                    </div>
                    <div className="space-y-2">
                      <span>Sound Level</span>
                      <Slider 
                        value={audioLevel}
                        onValueChange={handleAudioLevelChange}
                        max={100} 
                        step={1}
                        disabled={!isConnected}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Effects Controls */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap className="w-5 h-5" />
                      Special Effects
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={() => handleSpecialEffect('jump_scare')}
                      disabled={!isConnected}
                    >
                      <Music className="w-4 h-4 mr-2" />
                      Trigger Jump Scare
                    </Button>
                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={() => handleSpecialEffect('fog_machine')}
                      disabled={!isConnected}
                    >
                      Fog Machine
                    </Button>
                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={() => handleSpecialEffect('thunder')}
                      disabled={!isConnected}
                    >
                      Thunder Effect
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </main>
          </SidebarInset>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default LiveControls;
