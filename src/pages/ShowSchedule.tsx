
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Calendar, Clock, Play, Plus, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

const ShowSchedule = () => {
  const schedules = [
    { 
      name: "Halloween Night Terror", 
      time: "19:30", 
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      status: "Active",
      duration: "5:30"
    },
    { 
      name: "Twilight Parade", 
      time: "18:00", 
      days: ["Sat", "Sun"],
      status: "Active",
      duration: "3:45"
    },
    { 
      name: "Midnight Special", 
      time: "00:00", 
      days: ["Fri", "Sat"],
      status: "Inactive",
      duration: "2:15"
    },
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
                <h1 className="text-3xl font-bold font-spectral">Show Schedule</h1>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Schedule
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="text-2xl font-bold">3</p>
                        <p className="text-sm text-muted-foreground">Scheduled Shows</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-green-500" />
                      <div>
                        <p className="text-2xl font-bold">2</p>
                        <p className="text-sm text-muted-foreground">Active Today</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <Play className="w-5 h-5 text-orange-500" />
                      <div>
                        <p className="text-2xl font-bold">19:30</p>
                        <p className="text-sm text-muted-foreground">Next Show</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Schedule List */}
              <Card>
                <CardHeader>
                  <CardTitle>Scheduled Shows</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {schedules.map((schedule, idx) => (
                      <div key={idx} className="border rounded p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-lg">{schedule.name}</h3>
                            <p className="text-sm text-muted-foreground">Duration: {schedule.duration}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={schedule.status === "Active" ? "default" : "secondary"}>
                              {schedule.status}
                            </Badge>
                            <Switch defaultChecked={schedule.status === "Active"} />
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span className="font-mono text-lg">{schedule.time}</span>
                          </div>
                          <div className="flex gap-1">
                            {schedule.days.map((day) => (
                              <Badge key={day} variant="outline" className="text-xs">
                                {day}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline">
                            <Play className="w-3 h-3 mr-1" />
                            Test Run
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="w-3 h-3 mr-1" />
                            Delete
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

export default ShowSchedule;
