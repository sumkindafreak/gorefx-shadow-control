
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Cpu, Wifi, ServerCrash } from "lucide-react";
import { Link } from "react-router-dom";
import { useWebSocket } from "@/hooks/useWebSocket";

const Devices = () => {
  const { isConnected, deviceStatus } = useWebSocket();

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
                <h1 className="text-3xl font-bold font-spectral">Connected Device</h1>
              </div>

              {isConnected ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-4">
                      <Cpu className="w-8 h-8 text-primary" />
                      <div>
                        <h4 className="font-semibold">ESP32 Controller</h4>
                        <p className="text-sm text-muted-foreground">{deviceStatus.ip || 'IP not available'}</p>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center justify-between p-2 border rounded">
                            <span>Status</span>
                            <Badge variant="default"><Wifi className="w-3 h-3 mr-1" /> Online</Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 border rounded">
                            <span>Uptime</span>
                            <span className="font-mono">{Math.floor((deviceStatus.uptime || 0) / 1000)}s</span>
                        </div>
                        <div className="flex items-center justify-between p-2 border rounded">
                            <span>Free Heap</span>
                            <span className="font-mono">{deviceStatus.freeHeap || 0} bytes</span>
                        </div>
                        <div className="flex items-center justify-between p-2 border rounded">
                            <span>WiFi Strength</span>
                             <span className="font-mono">{deviceStatus.wifiStrength ? `${deviceStatus.wifiStrength} dBm` : 'N/A'}</span>
                        </div>
                        <div className="flex items-center justify-between p-2 border rounded">
                            <span>Battery</span>
                             <span className="font-mono">{deviceStatus.battery ? `${deviceStatus.battery}%` : 'N/A'}</span>
                        </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card className="flex flex-col items-center justify-center p-8 text-center border-dashed">
                    <ServerCrash className="w-16 h-16 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-semibold">No Device Connected</h3>
                    <p className="text-muted-foreground mt-2">
                        Connect to an ESP device from the dashboard to see its details here.
                    </p>
                    <Button asChild className="mt-4">
                        <Link to="/">Go to Dashboard</Link>
                    </Button>
                </Card>
              )}
            </main>
          </SidebarInset>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Devices;
