
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Cloud, CloudRain, Wind, Thermometer, Eye, Droplets, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const Weather = () => {
  const currentWeather = {
    temperature: 68,
    humidity: 75,
    windSpeed: 12,
    visibility: 8.5,
    condition: "Partly Cloudy",
    precipitation: 0
  };

  const forecast = [
    { day: "Today", high: 72, low: 65, condition: "Partly Cloudy", icon: Cloud, precipitation: 10 },
    { day: "Tomorrow", high: 69, low: 58, condition: "Light Rain", icon: CloudRain, precipitation: 80 },
    { day: "Saturday", high: 74, low: 62, condition: "Sunny", icon: Cloud, precipitation: 0 },
    { day: "Sunday", high: 71, low: 60, condition: "Cloudy", icon: Cloud, precipitation: 30 },
  ];

  const weatherAlerts = [
    { type: "Wind Advisory", severity: "Warning", message: "Sustained winds 20-30 mph expected tonight", expires: "11:00 PM" },
    { type: "Rain Alert", severity: "Watch", message: "Light rain possible tomorrow evening", expires: "Tomorrow 8:00 PM" },
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
                <h1 className="text-3xl font-bold font-spectral">Weather Monitoring</h1>
                <Badge variant="outline" className="bg-blue-500/10 text-blue-700">
                  <Cloud className="w-3 h-3 mr-1" />
                  Auto-Update
                </Badge>
              </div>

              {/* Current Weather */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Thermometer className="w-5 h-5" />
                    Current Conditions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center">
                      <Cloud className="w-12 h-12 mx-auto mb-2 text-blue-500" />
                      <p className="text-3xl font-bold">{currentWeather.temperature}°F</p>
                      <p className="text-muted-foreground">{currentWeather.condition}</p>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Droplets className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">Humidity: {currentWeather.humidity}%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Wind className="w-4 h-4 text-gray-500" />
                        <span className="text-sm">Wind: {currentWeather.windSpeed} mph</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Eye className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Visibility: {currentWeather.visibility} mi</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CloudRain className="w-4 h-4 text-blue-600" />
                        <span className="text-sm">Precipitation: {currentWeather.precipitation}%</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Show Status</p>
                      <Badge variant="default" className="bg-green-500/10 text-green-700">
                        Weather Safe
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        All systems operational
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Weather Alerts */}
              {weatherAlerts.length > 0 && (
                <Card className="border-yellow-200">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-500" />
                      Weather Alerts
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {weatherAlerts.map((alert, idx) => (
                        <div key={idx} className="border-l-4 border-yellow-500 pl-3 py-2">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold">{alert.type}</h4>
                            <Badge variant={alert.severity === "Warning" ? "destructive" : "default"}>
                              {alert.severity}
                            </Badge>
                          </div>
                          <p className="text-sm mb-1">{alert.message}</p>
                          <p className="text-xs text-muted-foreground">Expires: {alert.expires}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* 4-Day Forecast */}
                <Card>
                  <CardHeader>
                    <CardTitle>4-Day Forecast</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {forecast.map((day, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 border rounded">
                          <div className="flex items-center gap-3">
                            <day.icon className="w-6 h-6 text-blue-500" />
                            <div>
                              <p className="font-medium">{day.day}</p>
                              <p className="text-sm text-muted-foreground">{day.condition}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold">{day.high}°/{day.low}°</p>
                            <p className="text-xs text-muted-foreground">{day.precipitation}% rain</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Weather Automation */}
                <Card>
                  <CardHeader>
                    <CardTitle>Weather Automation</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">Auto-Cancel in Rain</span>
                        <p className="text-sm text-muted-foreground">Stop shows when precipitation {">"} 50%</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">Wind Safety Mode</span>
                        <p className="text-sm text-muted-foreground">Reduce effects when winds {">"} 25 mph</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">Temperature Adjustments</span>
                        <p className="text-sm text-muted-foreground">Modify fog output based on humidity</p>
                      </div>
                      <Switch />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">Weather Notifications</span>
                        <p className="text-sm text-muted-foreground">Alert on severe weather warnings</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Weather Impact Assessment */}
              <Card>
                <CardHeader>
                  <CardTitle>Weather Impact Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 border rounded bg-green-50">
                      <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center mx-auto mb-2">
                        ✓
                      </div>
                      <h4 className="font-semibold text-green-700">Safe to Operate</h4>
                      <p className="text-sm text-green-600">All weather conditions within safe parameters</p>
                    </div>
                    <div className="text-center p-4 border rounded">
                      <Wind className="w-12 h-12 mx-auto mb-2 text-yellow-500" />
                      <h4 className="font-semibold">Monitor Wind</h4>
                      <p className="text-sm text-muted-foreground">Current: 12 mph (Safe limit: 25 mph)</p>
                    </div>
                    <div className="text-center p-4 border rounded">
                      <CloudRain className="w-12 h-12 mx-auto mb-2 text-blue-500" />
                      <h4 className="font-semibold">Rain Tomorrow</h4>
                      <p className="text-sm text-muted-foreground">80% chance - Consider indoor backup</p>
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

export default Weather;
