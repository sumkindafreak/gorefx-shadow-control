
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Smartphone, Wifi, Shield, Key, Globe, Lock } from "lucide-react";
import { Link } from "react-router-dom";

const RemoteAccess = () => {
  const connectedDevices = [
    { device: "John's iPhone", ip: "192.168.1.200", lastAccess: "2 minutes ago", status: "Active" },
    { device: "Admin Tablet", ip: "192.168.1.201", lastAccess: "15 minutes ago", status: "Active" },
    { device: "Mobile Control App", ip: "10.0.0.45", lastAccess: "1 hour ago", status: "Idle" },
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
                <h1 className="text-3xl font-bold font-spectral">Remote Access</h1>
                <div className="flex gap-2">
                  <Badge variant="outline" className="bg-green-500/10 text-green-700">
                    <Wifi className="w-3 h-3 mr-1" />
                    Online
                  </Badge>
                  <Button>
                    <Key className="w-4 h-4 mr-2" />
                    Generate QR Code
                  </Button>
                </div>
              </div>

              {/* Connection Settings */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      Connection Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Local IP Address</label>
                      <Input value="192.168.1.100:8080" readOnly />
                    </div>
                    <div>
                      <label className="text-sm font-medium">External URL</label>
                      <Input value="https://myhaunt.gorefx.app" readOnly />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Enable Remote Access</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Require Authentication</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>SSL/TLS Encryption</span>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Security Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Access Code</label>
                      <div className="flex gap-2">
                        <Input value="HNT-2024-SPKY" readOnly />
                        <Button variant="outline">Regenerate</Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Two-Factor Authentication</span>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>IP Whitelisting</span>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Session Timeout (30 min)</span>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Connected Devices */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="w-5 h-5" />
                    Connected Devices
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {connectedDevices.map((device, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 border rounded">
                        <div className="flex items-center gap-3">
                          <Smartphone className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-medium">{device.device}</p>
                            <p className="text-sm text-muted-foreground">{device.ip}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <Badge variant={device.status === "Active" ? "default" : "secondary"}>
                              {device.status}
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-1">{device.lastAccess}</p>
                          </div>
                          <Button variant="outline" size="sm">
                            <Lock className="w-3 h-3 mr-1" />
                            Disconnect
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Mobile App */}
              <Card>
                <CardHeader>
                  <CardTitle>Mobile Application</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-3">GoreFX Mobile Control</h4>
                      <p className="text-sm text-muted-foreground mb-4">
                        Control your haunted display from anywhere with our mobile app. 
                        Available for iOS and Android devices.
                      </p>
                      <div className="space-y-2">
                        <Button className="w-full">
                          <Smartphone className="w-4 h-4 mr-2" />
                          Download for iOS
                        </Button>
                        <Button variant="outline" className="w-full">
                          <Smartphone className="w-4 h-4 mr-2" />
                          Download for Android
                        </Button>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Quick Setup</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">1</div>
                          <span className="text-sm">Download the mobile app</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">2</div>
                          <span className="text-sm">Scan QR code or enter access code</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">3</div>
                          <span className="text-sm">Start controlling your display</span>
                        </div>
                      </div>
                    </div>
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

export default RemoteAccess;
