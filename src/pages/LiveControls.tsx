
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

const LiveControls = () => {
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
                <Badge variant="outline" className="bg-green-500/10 text-green-700">LIVE</Badge>
              </div>

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
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Emergency Stop</span>
                      <Button variant="destructive" size="sm">STOP</Button>
                    </div>
                    <div className="space-y-2">
                      <span>Master Volume</span>
                      <Slider defaultValue={[75]} max={100} step={1} />
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
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Porch Lights</span>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Strobe Effects</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <span>Brightness</span>
                      <Slider defaultValue={[80]} max={100} step={1} />
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
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Ambient Sounds</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="space-y-2">
                      <span>Sound Level</span>
                      <Slider defaultValue={[65]} max={100} step={1} />
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
                    <Button className="w-full" variant="outline">
                      <Music className="w-4 h-4 mr-2" />
                      Trigger Jump Scare
                    </Button>
                    <Button className="w-full" variant="outline">
                      Fog Machine
                    </Button>
                    <Button className="w-full" variant="outline">
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
