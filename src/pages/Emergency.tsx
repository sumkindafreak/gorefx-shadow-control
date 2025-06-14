
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, AlertTriangle, Power, Phone, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const Emergency = () => {
  const emergencyActions = [
    { name: "All Stop", description: "Immediately stop all shows and effects", icon: Power, status: "Ready" },
    { name: "Safe Mode", description: "Switch to minimal lighting only", icon: Shield, status: "Ready" },
    { name: "Call Emergency", description: "Auto-dial emergency contacts", icon: Phone, status: "Ready" },
    { name: "Power Cutoff", description: "Cut power to all non-essential systems", icon: Zap, status: "Ready" },
  ];

  const recentAlerts = [
    { time: "2 hours ago", message: "Low voltage warning on ESP32-CAM", severity: "Warning" },
    { time: "1 day ago", message: "Fog machine overheating", severity: "Critical" },
    { time: "3 days ago", message: "Motion sensor offline", severity: "Info" },
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
                <h1 className="text-3xl font-bold font-spectral">Emergency Controls</h1>
                <Badge variant="outline" className="bg-green-500/10 text-green-700">
                  <Shield className="w-3 h-3 mr-1" />
                  System Secure
                </Badge>
              </div>

              {/* Emergency Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {emergencyActions.map((action, idx) => (
                  <Card key={idx} className="border-red-200 hover:border-red-300 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <action.icon className="w-6 h-6 text-red-500" />
                        <h3 className="font-semibold text-lg">{action.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{action.description}</p>
                      <Button 
                        variant="destructive" 
                        className="w-full"
                        size="lg"
                      >
                        Execute {action.name}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* System Status */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Safety Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Auto Emergency Stop</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Motion Safety Override</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Voltage Monitoring</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Temperature Alerts</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Emergency Notifications</span>
                      <Switch />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Alerts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentAlerts.map((alert, idx) => (
                        <div key={idx} className="border-l-4 border-yellow-500 pl-3 py-2">
                          <div className="flex items-center justify-between mb-1">
                            <Badge variant={
                              alert.severity === "Critical" ? "destructive" : 
                              alert.severity === "Warning" ? "default" : "secondary"
                            }>
                              {alert.severity}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{alert.time}</span>
                          </div>
                          <p className="text-sm">{alert.message}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Emergency Contacts */}
              <Card>
                <CardHeader>
                  <CardTitle>Emergency Contacts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="border rounded p-3">
                      <h4 className="font-semibold">Fire Department</h4>
                      <p className="text-sm text-muted-foreground">911</p>
                      <Button size="sm" className="mt-2 w-full">
                        <Phone className="w-3 h-3 mr-1" />
                        Call
                      </Button>
                    </div>
                    <div className="border rounded p-3">
                      <h4 className="font-semibold">System Admin</h4>
                      <p className="text-sm text-muted-foreground">(555) 123-4567</p>
                      <Button size="sm" className="mt-2 w-full">
                        <Phone className="w-3 h-3 mr-1" />
                        Call
                      </Button>
                    </div>
                    <div className="border rounded p-3">
                      <h4 className="font-semibold">Technical Support</h4>
                      <p className="text-sm text-muted-foreground">(555) 987-6543</p>
                      <Button size="sm" className="mt-2 w-full">
                        <Phone className="w-3 h-3 mr-1" />
                        Call
                      </Button>
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

export default Emergency;
