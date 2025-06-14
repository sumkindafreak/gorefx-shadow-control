
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, User, Bell, Shield, Palette, Wifi, Save } from "lucide-react";
import { Link } from "react-router-dom";

const Settings = () => {
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
                <h1 className="text-3xl font-bold font-spectral">Settings</h1>
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* User Profile */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      User Profile
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Display Name</label>
                      <Input defaultValue="Halloween Master" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <Input defaultValue="admin@gorefx.local" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Time Zone</label>
                      <Select defaultValue="eastern">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="eastern">Eastern Time</SelectItem>
                          <SelectItem value="central">Central Time</SelectItem>
                          <SelectItem value="mountain">Mountain Time</SelectItem>
                          <SelectItem value="pacific">Pacific Time</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* System Preferences */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="w-5 h-5" />
                      System Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Theme</label>
                      <Select defaultValue="dark">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="dark">Dark Theme</SelectItem>
                          <SelectItem value="light">Light Theme</SelectItem>
                          <SelectItem value="auto">Auto (System)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Language</label>
                      <Select defaultValue="en">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Enable Sound Effects</span>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>

                {/* Notifications */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="w-5 h-5" />
                      Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">System Alerts</span>
                        <p className="text-sm text-muted-foreground">Device errors and warnings</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">Show Updates</span>
                        <p className="text-sm text-muted-foreground">When shows start/stop</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">Weather Alerts</span>
                        <p className="text-sm text-muted-foreground">Severe weather warnings</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">Motion Detection</span>
                        <p className="text-sm text-muted-foreground">When motion is detected</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>

                {/* Security */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Security
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Change Password</label>
                      <div className="space-y-2">
                        <Input type="password" placeholder="Current password" />
                        <Input type="password" placeholder="New password" />
                        <Input type="password" placeholder="Confirm new password" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Two-Factor Authentication</span>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Auto-lock Session</span>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>

                {/* Network Settings */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wifi className="w-5 h-5" />
                      Network Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Local IP Address</label>
                      <Input defaultValue="192.168.1.100" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Port</label>
                      <Input defaultValue="8080" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">WiFi Network</label>
                      <Select defaultValue="haunt-network">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="haunt-network">HauntNetwork_5G</SelectItem>
                          <SelectItem value="home-wifi">HomeWiFi</SelectItem>
                          <SelectItem value="guest">Guest Network</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* System Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>System Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Software Version</span>
                      <span>GoreFX v3.2.1</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Build Date</span>
                      <span>2024-01-15</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">System Uptime</span>
                      <span>4 days, 2 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Storage Used</span>
                      <span>156 GB / 500 GB</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Connected Devices</span>
                      <span>6 devices</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Danger Zone */}
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="text-red-700">Danger Zone</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Factory Reset</span>
                      <p className="text-sm text-muted-foreground">Reset all settings to default values</p>
                    </div>
                    <Button variant="destructive">Reset System</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">Clear All Data</span>
                      <p className="text-sm text-muted-foreground">Delete all shows, recordings, and configurations</p>
                    </div>
                    <Button variant="destructive">Clear Data</Button>
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

export default Settings;
