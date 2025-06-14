
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Download, Upload, RefreshCw, CheckCircle, AlertTriangle, Cpu } from "lucide-react";
import { Link } from "react-router-dom";

const Firmware = () => {
  const devices = [
    { 
      name: "Front Porch Controller", 
      type: "ESP32", 
      currentVersion: "v2.1.3", 
      latestVersion: "v2.1.4", 
      status: "Update Available",
      lastUpdate: "2 weeks ago"
    },
    { 
      name: "Fog Machine Hub", 
      type: "Arduino Uno", 
      currentVersion: "v1.8.2", 
      latestVersion: "v1.8.2", 
      status: "Up to Date",
      lastUpdate: "1 week ago"
    },
    { 
      name: "Motion Sensor Array", 
      type: "ESP8266", 
      currentVersion: "v3.0.1", 
      latestVersion: "v3.0.2", 
      status: "Update Available",
      lastUpdate: "3 days ago"
    },
    { 
      name: "Audio Controller", 
      type: "ESP32", 
      currentVersion: "v2.2.0", 
      latestVersion: "v2.2.0", 
      status: "Up to Date",
      lastUpdate: "5 days ago"
    },
  ];

  const updateHistory = [
    { device: "Audio Controller", version: "v2.2.0", date: "2024-01-10", status: "Success" },
    { device: "Motion Sensor Array", version: "v3.0.1", date: "2024-01-08", status: "Success" },
    { device: "Fog Machine Hub", version: "v1.8.2", date: "2024-01-05", status: "Success" },
    { device: "Front Porch Controller", version: "v2.1.3", date: "2024-01-01", status: "Failed" },
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
                <h1 className="text-3xl font-bold font-spectral">Firmware Management</h1>
                <div className="flex gap-2">
                  <Button variant="outline">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Check for Updates
                  </Button>
                  <Button>
                    <Download className="w-4 h-4 mr-2" />
                    Backup All
                  </Button>
                </div>
              </div>

              {/* Update Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="text-2xl font-bold">2</p>
                        <p className="text-sm text-muted-foreground">Up to Date</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-500" />
                      <div>
                        <p className="text-2xl font-bold">2</p>
                        <p className="text-sm text-muted-foreground">Updates Available</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Cpu className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="text-2xl font-bold">4</p>
                        <p className="text-sm text-muted-foreground">Total Devices</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Device Firmware Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Device Firmware Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {devices.map((device, idx) => (
                      <div key={idx} className="border rounded p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Cpu className="w-6 h-6 text-primary" />
                            <div>
                              <h4 className="font-semibold">{device.name}</h4>
                              <p className="text-sm text-muted-foreground">{device.type}</p>
                            </div>
                          </div>
                          <Badge variant={device.status === "Up to Date" ? "default" : "destructive"}>
                            {device.status}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                          <div>
                            <p className="text-sm text-muted-foreground">Current Version</p>
                            <p className="font-medium">{device.currentVersion}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Latest Version</p>
                            <p className="font-medium">{device.latestVersion}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Last Updated</p>
                            <p className="font-medium">{device.lastUpdate}</p>
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          {device.status === "Update Available" ? (
                            <>
                              <Button size="sm">
                                <Download className="w-3 h-3 mr-1" />
                                Update Firmware
                              </Button>
                              <Button size="sm" variant="outline">
                                <Upload className="w-3 h-3 mr-1" />
                                Manual Upload
                              </Button>
                            </>
                          ) : (
                            <Button size="sm" variant="outline">
                              <RefreshCw className="w-3 h-3 mr-1" />
                              Check Update
                            </Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Update Progress */}
                <Card>
                  <CardHeader>
                    <CardTitle>Update Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium">No updates in progress</span>
                          <span className="text-sm text-muted-foreground">Ready</span>
                        </div>
                        <Progress value={0} className="h-2" />
                      </div>
                      
                      <div className="p-3 bg-muted rounded">
                        <p className="text-sm text-muted-foreground">
                          Click "Update Firmware" on any device to begin the update process. 
                          Updates typically take 2-5 minutes per device.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Backup & Restore */}
                <Card>
                  <CardHeader>
                    <CardTitle>Backup & Restore</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-3">
                        Create backups before updating firmware to ensure quick recovery if needed.
                      </p>
                      <div className="space-y-2">
                        <Button className="w-full" variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Create Full Backup
                        </Button>
                        <Button className="w-full" variant="outline">
                          <Upload className="w-4 h-4 mr-2" />
                          Restore from Backup
                        </Button>
                      </div>
                    </div>
                    
                    <div className="p-3 border rounded">
                      <p className="text-sm font-medium mb-1">Last Backup</p>
                      <p className="text-sm text-muted-foreground">2024-01-14 18:30 (All devices)</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Update History */}
              <Card>
                <CardHeader>
                  <CardTitle>Update History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {updateHistory.map((update, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 border rounded">
                        <div className="flex items-center gap-3">
                          {update.status === "Success" ? (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          ) : (
                            <AlertTriangle className="w-5 h-5 text-red-500" />
                          )}
                          <div>
                            <p className="font-medium">{update.device}</p>
                            <p className="text-sm text-muted-foreground">Updated to {update.version}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge variant={update.status === "Success" ? "default" : "destructive"}>
                            {update.status}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">{update.date}</p>
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

export default Firmware;
