
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Wifi,
  History,
  WifiOff,
  Clock,
  Gauge,
  Radio,
  Battery,
} from "lucide-react";
import { useWebSocket } from "@/hooks/useWebSocket";
import WebSocketConnection from "@/components/WebSocketConnection";

const Dashboard = () => {
  const { isConnected, deviceStatus, lastMessage } = useWebSocket();

  const statCards = [
    {
      label: "ESP Connection",
      value: isConnected ? "Connected" : "Offline",
      icon: isConnected ? Wifi : WifiOff,
      badge: "WebSocket",
      color: isConnected ? "bg-green-600/10 text-green-700" : "bg-red-600/10 text-red-700",
    },
    {
      label: "Device Uptime",
      value: isConnected && deviceStatus.uptime ? `${Math.floor(deviceStatus.uptime / 1000)}s` : "N/A",
      icon: Clock,
      badge: "Seconds",
      color: "bg-blue-600/10 text-blue-700",
    },
    {
      label: "Free Heap",
      value: isConnected && deviceStatus.freeHeap ? `${deviceStatus.freeHeap} B` : "N/A",
      icon: Gauge,
      badge: "Memory",
      color: "bg-orange-600/10 text-orange-700",
    },
    {
      label: "WiFi Strength",
      value: isConnected && deviceStatus.wifiStrength ? `${deviceStatus.wifiStrength} dBm` : "N/A",
      icon: Radio,
      badge: "Signal",
      color: "bg-rose-600/10 text-rose-700",
    },
  ];

  const systemStatus = {
    online: isConnected,
    ip: deviceStatus.ip || "Unknown",
    uptime: deviceStatus.uptime ? `${Math.floor(deviceStatus.uptime / 1000)}s` : "Unknown",
    freeHeap: deviceStatus.freeHeap ? `${deviceStatus.freeHeap} bytes` : "Unknown",
    wifiStrength: deviceStatus.wifiStrength ? `${deviceStatus.wifiStrength} dBm` : "Unknown",
    battery: deviceStatus.battery ? `${deviceStatus.battery}%` : "Unknown",
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
                      <span className="text-sm text-muted-foreground">IP Address</span>
                      <span className="text-foreground">{systemStatus.ip}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Device Uptime</span>
                      <span className="text-foreground">{systemStatus.uptime}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Free Heap</span>
                      <span className="text-foreground">{systemStatus.freeHeap}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">WiFi Strength</span>
                      <span className="text-foreground">{systemStatus.wifiStrength}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Battery</span>
                      <span className="text-foreground">{systemStatus.battery}</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Events */}
                <Card className="bg-card/60 border-border/50 lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="font-spectral text-xl flex gap-2 items-center">
                      <History className="text-accent" size={20} />
                      Last Message Received
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {lastMessage ? (
                      <pre className="text-xs bg-muted p-4 rounded overflow-auto max-h-60 font-mono">
                        {JSON.stringify(lastMessage, null, 2)}
                      </pre>
                    ) : (
                       <div className="text-center text-muted-foreground py-8">
                        No messages received from device yet.
                      </div>
                    )}
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
