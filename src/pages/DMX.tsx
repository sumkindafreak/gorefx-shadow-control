
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Lightbulb, Radio, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useState } from "react";

const DMX = () => {
  const { isConnected, sendCommand } = useWebSocket();
  const [channels, setChannels] = useState([
    { id: 1, name: "Front Wash", type: "RGB", value: 75 },
    { id: 2, name: "Strobe Left", type: "Strobe", value: 0 },
    { id: 3, name: "Strobe Right", type: "Strobe", value: 0 },
    { id: 4, name: "Fog Machine", type: "Effect", value: 45 },
    { id: 5, name: "UV Blacklights", type: "UV", value: 100 },
    { id: 6, name: "Red Spots", type: "Spot", value: 60 },
  ]);

  const handleChannelChange = (channelId: number, value: number[]) => {
    setChannels(prev => prev.map(ch => 
      ch.id === channelId ? { ...ch, value: value[0] } : ch
    ));
    
    sendCommand({
      type: 'dmx',
      action: 'channel_set',
      channel: channelId,
      value: value[0]
    });
  };

  const handleScenePreset = (scene: string) => {
    sendCommand({
      type: 'dmx',
      action: 'scene',
      value: scene
    });
  };

  const handleBlackoutAll = () => {
    sendCommand({
      type: 'dmx',
      action: 'blackout'
    });
    setChannels(prev => prev.map(ch => ({ ...ch, value: 0 })));
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
                <h1 className="text-3xl font-bold font-spectral">DMX Control</h1>
                <div className="flex gap-2">
                  <Badge variant="outline" className={isConnected ? "bg-green-500/10 text-green-700" : "bg-red-500/10 text-red-700"}>
                    <Radio className="w-3 h-3 mr-1" />
                    {isConnected ? "Connected" : "Offline"}
                  </Badge>
                  <Button 
                    variant="outline"
                    onClick={handleBlackoutAll}
                    disabled={!isConnected}
                  >
                    Blackout All
                  </Button>
                </div>
              </div>

              {/* DMX Status */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Radio className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="text-2xl font-bold">512</p>
                        <p className="text-sm text-muted-foreground">Universe Size</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-yellow-500" />
                      <div>
                        <p className="text-2xl font-bold">{channels.length}</p>
                        <p className="text-sm text-muted-foreground">Active Fixtures</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="text-2xl font-bold">{channels.length * 4}</p>
                        <p className="text-sm text-muted-foreground">Channels Used</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Channel Controls */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Channel Faders</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {channels.map((channel) => (
                      <div key={channel.id} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="font-medium">{channel.name}</span>
                            <Badge variant="secondary" className="ml-2 text-xs">
                              {channel.type}
                            </Badge>
                          </div>
                          <span className="text-sm font-mono">{channel.value}%</span>
                        </div>
                        <Slider
                          value={[channel.value]}
                          onValueChange={(value) => handleChannelChange(channel.id, value)}
                          max={100}
                          step={1}
                          className="w-full"
                          disabled={!isConnected}
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Scene Presets</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => handleScenePreset('full_lights')}
                      disabled={!isConnected}
                    >
                      <Lightbulb className="w-4 h-4 mr-2" />
                      Full Lights
                    </Button>
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => handleScenePreset('strobe_mode')}
                      disabled={!isConnected}
                    >
                      <Zap className="w-4 h-4 mr-2" />
                      Strobe Mode
                    </Button>
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => handleScenePreset('spooky_ambience')}
                      disabled={!isConnected}
                    >
                      Spooky Ambience
                    </Button>
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => handleScenePreset('red_alert')}
                      disabled={!isConnected}
                    >
                      Red Alert
                    </Button>
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => handleScenePreset('uv_party')}
                      disabled={!isConnected}
                    >
                      UV Party
                    </Button>
                    <Button 
                      className="w-full justify-start" 
                      variant="destructive"
                      onClick={() => handleScenePreset('emergency_off')}
                      disabled={!isConnected}
                    >
                      Emergency Off
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* DMX Address Map */}
              <Card>
                <CardHeader>
                  <CardTitle>Address Mapping</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {channels.map((channel) => (
                      <div key={channel.id} className="border rounded p-3">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{channel.name}</span>
                          <Badge variant="outline">Ch {channel.id}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Type: {channel.type} • Value: {channel.value}%
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </main>
          </SidebarInset>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DMX;
