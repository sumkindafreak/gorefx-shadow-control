
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Cpu,
  Layers,
  Wifi,
  RefreshCcw,
  AlertTriangle,
  Users,
  Calendar,
  Radio,
  Play,
  History,
  WifiOff,
} from "lucide-react";
import { useWebSocket } from "@/hooks/useWebSocket";
import WebSocketConnection from "@/components/WebSocketConnection";

const Dashboard = () => {
  const { isConnected, deviceStatus } = useWebSocket();

  const statCards = [
    {
      label: "ESP Connection",
      value: isConnected ? "Connected" : "Offline",
      icon: isConnected ? Wifi : WifiOff,
      badge: "WebSocket",
      color: isConnected ? "bg-green-600/10 text-green-700" : "bg-red-600/10 text-red-700",
    },
    {
      label: "Active Shows",
      value: 2,
      icon: Play,
      badge: "Running",
      color: "bg-blue-600/10 text-blue-700",
    },
    {
      label: "Total Users",
      value: 3,
      icon: Users,
      badge: "Admins",
      color: "bg-orange-600/10 text-orange-700",
    },
    {
      label: "Next Scheduled",
      value: "7:30pm",
      icon: Calendar,
      badge: "Show Time",
      color: "bg-rose-600/10 text-rose-700",
    },
  ];

  const recentEvents = [
    {
      icon: isConnected ? Wifi : WifiOff,
      title: isConnected ? "ESP32 Connected" : "ESP32 Disconnected",
      desc: isConnected ? `Connected to ${deviceStatus.ip || 'ESP32'}` : "WebSocket connection lost",
      time: "now",
    },
    {
      icon: RefreshCcw,
      title: "System Restarted",
      desc: "Scheduled restart at 2:30 PM",
      time: "2m ago",
    },
    {
      icon: Layers,
      title: "Show 'Twilight Parade' Started",
      desc: "Show triggered by schedule",
      time: "18m ago",
    },
    {
      icon: Cpu,
      title: "Device Connected",
      desc: "Arduino Mega2560 - 'Haunt FrontLight'",
      time: "35m ago",
    },
    {
      icon: Radio,
      title: "DMX Broadcast Sent",
      desc: "Scene set to 'Full Lights'",
      time: "1h ago",
    },
  ];

  const systemStatus = {
    online: isConnected,
    uptime: deviceStatus.uptime ? `${Math.floor(deviceStatus.uptime / 1000)}s` : "Unknown",
    dmxStatus: isConnected ? "Active" : "Offline",
    audio: isConnected ? "Synced" : "Offline",
    firmware: "Up to date",
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex bg-background font-orbitron">
        <AppSidebar />
        <div className="flex flex-col w-full">
          <Header />
          <SidebarInset className="p-4 lg:p-8 flex-grow">
            <main className="flex-1 space-y-6">
              {/* WebSocket Connection */}
              <WebSocketConnection />

              {/* Top Stat Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((stat) => (
                  <Card key={stat.label} className="bg-card/70 border-border/50 hover:shadow-lg transition-shadow animate-fade-in">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <div className="flex items-center gap-2">
                        <stat.icon className={`w-6 h-6 ${stat.color} shrink-0`} />
                        <CardTitle className="text-lg font-semibold font-spectral">{stat.label}</CardTitle>
                      </div>
                      <Badge variant="outline" className={`rounded-full ${stat.color} font-semibold tracking-wide`}>{stat.badge}</Badge>
                    </CardHeader>
                    <CardContent>
                      <div className="text-3xl font-bold font-orbitron">{stat.value}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* System Status */}
                <Card className="bg-card/60 border-border/50 col-span-1">
                  <CardHeader>
                    <CardTitle className="font-spectral text-xl flex gap-2 items-center">
                      <Wifi className={systemStatus.online ? "text-green-500" : "text-destructive"} size={20} />
                      System Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">ESP Connection</span>
                      <span className={systemStatus.online ? "text-green-500" : "text-destructive font-semibold"}>
                        {systemStatus.online ? "ONLINE" : "OFFLINE"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Device Uptime</span>
                      <span className="text-foreground">{systemStatus.uptime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">DMX</span>
                      <span className="text-foreground">{systemStatus.dmxStatus}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Audio Sync</span>
                      <span className="text-foreground">{systemStatus.audio}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Firmware</span>
                      <span className="text-foreground">{systemStatus.firmware}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Events */}
                <Card className="bg-card/60 border-border/50 lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="font-spectral text-xl flex gap-2 items-center">
                      <History className="text-accent" size={20} />
                      Recent Events
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="divide-y divide-border">
                      {recentEvents.map((evt, idx) => (
                        <li key={evt.title + idx} className="flex items-center py-3 gap-3 animate-fade-in">
                          <evt.icon className="w-7 h-7 text-primary/80 shrink-0" />
                          <div className="flex-1">
                            <div className="font-semibold">{evt.title}</div>
                            <div className="text-xs text-muted-foreground">{evt.desc}</div>
                          </div>
                          <div className="text-xs text-primary/70 font-mono">{evt.time}</div>
                        </li>
                      ))}
                    </ul>
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

export default Dashboard;
