
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

const DMX = () => {
  const channels = [
    { id: 1, name: "Front Wash", type: "RGB", value: 75 },
    { id: 2, name: "Strobe Left", type: "Strobe", value: 0 },
    { id: 3, name: "Strobe Right", type: "Strobe", value: 0 },
    { id: 4, name: "Fog Machine", type: "Effect", value: 45 },
    { id: 5, name: "UV Blacklights", type: "UV", value: 100 },
    { id: 6, name: "Red Spots", type: "Spot", value: 60 },
  ];

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
                  <Badge variant="outline" className="bg-green-500/10 text-green-700">
                    <Radio className="w-3 h-3 mr-1" />
                    Connected
                  </Badge>
                  <Button variant="outline">Blackout All</Button>
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
                        <p className="text-2xl font-bold">6</p>
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
                        <p className="text-2xl font-bold">24</p>
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
                          defaultValue={[channel.value]}
                          max={100}
                          step={1}
                          className="w-full"
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
                    <Button className="w-full justify-start" variant="outline">
                      <Lightbulb className="w-4 h-4 mr-2" />
                      Full Lights
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Zap className="w-4 h-4 mr-2" />
                      Strobe Mode
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      Spooky Ambience
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      Red Alert
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      UV Party
                    </Button>
                    <Button className="w-full justify-start" variant="destructive">
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
