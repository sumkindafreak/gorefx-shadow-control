
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Cpu, Wifi, WifiOff, Settings, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const Devices = () => {
  const devices = [
    { name: "Front Porch Controller", type: "ESP32", ip: "192.168.1.101", status: "Online", battery: "98%" },
    { name: "Fog Machine Hub", type: "Arduino Uno", ip: "192.168.1.102", status: "Online", battery: "N/A" },
    { name: "Motion Sensor Array", type: "ESP8266", ip: "192.168.1.103", status: "Online", battery: "85%" },
    { name: "Audio Controller", type: "ESP32", ip: "192.168.1.104", status: "Online", battery: "92%" },
    { name: "Lighting Controller", type: "Arduino Mega", ip: "192.168.1.105", status: "Offline", battery: "45%" },
    { name: "Camera Module", type: "ESP32-CAM", ip: "192.168.1.106", status: "Online", battery: "67%" },
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
                <h1 className="text-3xl font-bold font-spectral">ESP/Arduino Devices</h1>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Device
                </Button>
              </div>

              {/* Device Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="text-2xl font-bold">6</p>
                        <p className="text-sm text-muted-foreground">Total Devices</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Wifi className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="text-2xl font-bold">5</p>
                        <p className="text-sm text-muted-foreground">Online</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <WifiOff className="w-5 h-5 text-red-500" />
                      <div>
                        <p className="text-2xl font-bold">1</p>
                        <p className="text-sm text-muted-foreground">Offline</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Device List */}
              <Card>
                <CardHeader>
                  <CardTitle>Connected Devices</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {devices.map((device, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 border rounded">
                        <div className="flex items-center gap-4">
                          <Cpu className="w-8 h-8 text-primary" />
                          <div>
                            <h4 className="font-semibold">{device.name}</h4>
                            <p className="text-sm text-muted-foreground">{device.type} • {device.ip}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <Badge variant={device.status === "Online" ? "default" : "destructive"}>
                              {device.status === "Online" ? (
                                <Wifi className="w-3 h-3 mr-1" />
                              ) : (
                                <WifiOff className="w-3 h-3 mr-1" />
                              )}
                              {device.status}
                            </Badge>
                            {device.battery !== "N/A" && (
                              <p className="text-sm text-muted-foreground mt-1">
                                Battery: {device.battery}
                              </p>
                            )}
                          </div>
                          
                          <Button variant="outline" size="sm">
                            <Settings className="w-4 h-4" />
                          </Button>
                        </div>
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

export default Devices;
