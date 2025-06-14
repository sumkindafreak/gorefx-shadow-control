
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, TrendingUp, Users, Clock, Zap, BarChart3, Activity } from "lucide-react";
import { Link } from "react-router-dom";

const Analysis = () => {
  const performanceMetrics = [
    { name: "System Uptime", value: "99.8%", trend: "+0.2%", icon: Activity },
    { name: "Average Response Time", value: "45ms", trend: "-12ms", icon: Clock },
    { name: "Power Consumption", value: "2.4kW", trend: "+0.1kW", icon: Zap },
    { name: "Show Completion Rate", value: "98.5%", trend: "+1.2%", icon: BarChart3 },
  ];

  const showStats = [
    { show: "Halloween Night Terror", runs: 45, avgDuration: "5:28", rating: 4.8 },
    { show: "Twilight Parade", runs: 32, avgDuration: "3:42", rating: 4.6 },
    { show: "Midnight Special", runs: 18, avgDuration: "2:12", rating: 4.9 },
  ];

  const deviceHealth = [
    { device: "Front Porch Controller", uptime: "99.9%", errors: 2, lastMaintenance: "2 days ago" },
    { device: "Fog Machine Hub", uptime: "97.8%", errors: 8, lastMaintenance: "1 week ago" },
    { device: "Motion Sensor Array", uptime: "100%", errors: 0, lastMaintenance: "3 days ago" },
    { device: "Audio Controller", uptime: "99.5%", errors: 3, lastMaintenance: "5 days ago" },
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
                <h1 className="text-3xl font-bold font-spectral">System Analysis</h1>
                <Button>
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Generate Report
                </Button>
              </div>

              {/* Performance Metrics */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {performanceMetrics.map((metric, idx) => (
                  <Card key={idx}>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <metric.icon className="w-5 h-5 text-primary" />
                        <span className="text-sm font-medium">{metric.name}</span>
                      </div>
                      <div className="flex items-end justify-between">
                        <p className="text-2xl font-bold">{metric.value}</p>
                        <Badge variant={metric.trend.startsWith('+') ? "default" : "secondary"}>
                          {metric.trend}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Show Performance */}
                <Card>
                  <CardHeader>
                    <CardTitle>Show Performance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {showStats.map((show, idx) => (
                        <div key={idx} className="border rounded p-3">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{show.show}</h4>
                            <Badge variant="outline">{show.rating} ★</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">Runs:</span>
                              <span className="ml-2 font-medium">{show.runs}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Avg Duration:</span>
                              <span className="ml-2 font-medium">{show.avgDuration}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Device Health */}
                <Card>
                  <CardHeader>
                    <CardTitle>Device Health</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {deviceHealth.map((device, idx) => (
                        <div key={idx} className="border rounded p-3">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold">{device.device}</h4>
                            <Badge variant={parseFloat(device.uptime) > 99 ? "default" : "destructive"}>
                              {device.uptime}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">Errors:</span>
                              <span className="ml-2 font-medium">{device.errors}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Last Service:</span>
                              <span className="ml-2 font-medium">{device.lastMaintenance}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Usage Patterns */}
              <Card>
                <CardHeader>
                  <CardTitle>Usage Patterns</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded">
                      <Users className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                      <p className="text-2xl font-bold">1,247</p>
                      <p className="text-sm text-muted-foreground">Total Visitors</p>
                    </div>
                    <div className="text-center p-4 border rounded">
                      <Clock className="w-8 h-8 mx-auto mb-2 text-green-500" />
                      <p className="text-2xl font-bold">4.2 min</p>
                      <p className="text-sm text-muted-foreground">Avg Visit Duration</p>
                    </div>
                    <div className="text-center p-4 border rounded">
                      <TrendingUp className="w-8 h-8 mx-auto mb-2 text-orange-500" />
                      <p className="text-2xl font-bold">86%</p>
                      <p className="text-sm text-muted-foreground">Engagement Rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Peak Hours Chart Placeholder */}
              <Card>
                <CardHeader>
                  <CardTitle>Peak Activity Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-muted rounded flex items-center justify-center">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-muted-foreground">Chart visualization would appear here</p>
                      <p className="text-sm text-muted-foreground">Peak hours: 7:00 PM - 10:00 PM</p>
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

export default Analysis;
