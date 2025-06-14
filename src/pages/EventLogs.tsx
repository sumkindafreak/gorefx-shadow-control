
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Download, Search, Filter, AlertTriangle, Info, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const EventLogs = () => {
  const logs = [
    { time: "2024-01-15 19:32:15", level: "Info", source: "ShowController", message: "Halloween Night Terror show started successfully", details: "Show ID: HNT-001, Duration: 5:30" },
    { time: "2024-01-15 19:25:03", level: "Warning", source: "ESP32-CAM", message: "Low battery warning - 45% remaining", details: "Device: YardCam, IP: 192.168.1.106" },
    { time: "2024-01-15 19:18:45", level: "Info", source: "DMXController", message: "Scene change: Full Lights", details: "Universe 1, Channels 1-24 updated" },
    { time: "2024-01-15 19:15:22", level: "Error", source: "FogMachine", message: "Temperature threshold exceeded", details: "Current: 85°C, Max: 80°C, Auto-shutdown triggered" },
    { time: "2024-01-15 19:12:10", level: "Info", source: "MotionSensor", message: "Motion detected in Zone A", details: "Sensor: PIR-001, Trigger: Guest approach" },
    { time: "2024-01-15 19:08:33", level: "Info", source: "AudioSync", message: "Audio file loaded successfully", details: "File: spooky_ambience.mp3, Duration: 5:30" },
    { time: "2024-01-15 19:05:17", level: "Warning", source: "NetworkMonitor", message: "High latency detected", details: "Ping: 250ms, Expected: <100ms" },
    { time: "2024-01-15 19:00:01", level: "Info", source: "Scheduler", message: "Scheduled show triggered", details: "Show: Halloween Night Terror, Trigger: Time-based" },
  ];

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "Error": return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case "Warning": return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case "Info": return <Info className="w-4 h-4 text-blue-500" />;
      default: return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
  };

  const getLevelBadge = (level: string) => {
    switch (level) {
      case "Error": return "destructive";
      case "Warning": return "default";
      case "Info": return "secondary";
      default: return "outline";
    }
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
                <h1 className="text-3xl font-bold font-spectral">Event Logs</h1>
                <Button>
                  <Download className="w-4 h-4 mr-2" />
                  Export Logs
                </Button>
              </div>

              {/* Filters */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Filters
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input placeholder="Search logs..." className="pl-10" />
                    </div>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Log Level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        <SelectItem value="error">Error</SelectItem>
                        <SelectItem value="warning">Warning</SelectItem>
                        <SelectItem value="info">Info</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Source" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Sources</SelectItem>
                        <SelectItem value="showcontroller">Show Controller</SelectItem>
                        <SelectItem value="dmx">DMX Controller</SelectItem>
                        <SelectItem value="esp32">ESP32 Devices</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Time Range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1h">Last Hour</SelectItem>
                        <SelectItem value="24h">Last 24 Hours</SelectItem>
                        <SelectItem value="7d">Last 7 Days</SelectItem>
                        <SelectItem value="30d">Last 30 Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Log Statistics */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                      <div>
                        <p className="text-2xl font-bold">1</p>
                        <p className="text-sm text-muted-foreground">Errors</p>
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
                        <p className="text-sm text-muted-foreground">Warnings</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Info className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="text-2xl font-bold">5</p>
                        <p className="text-sm text-muted-foreground">Info</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="text-2xl font-bold">8</p>
                        <p className="text-sm text-muted-foreground">Total Events</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Log Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {logs.map((log, idx) => (
                      <div key={idx} className="border rounded p-3 hover:bg-muted/50 transition-colors">
                        <div className="flex items-start gap-3">
                          {getLevelIcon(log.level)}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant={getLevelBadge(log.level) as any}>
                                {log.level}
                              </Badge>
                              <span className="text-sm font-medium">{log.source}</span>
                              <span className="text-xs text-muted-foreground font-mono">{log.time}</span>
                            </div>
                            <p className="text-sm mb-1">{log.message}</p>
                            <p className="text-xs text-muted-foreground">{log.details}</p>
                          </div>
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

export default EventLogs;
