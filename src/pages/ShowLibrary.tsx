
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Play, Download, Star, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";

const ShowLibrary = () => {
  const shows = [
    { 
      name: "Halloween Night Terror", 
      duration: "5:30", 
      rating: 4.8, 
      downloads: 1250,
      description: "A spine-chilling experience with coordinated lights, sound, and fog effects."
    },
    { 
      name: "Spooky Graveyard", 
      duration: "3:45", 
      rating: 4.6, 
      downloads: 980,
      description: "Eerie graveyard ambience with ghostly sounds and flickering lights."
    },
    { 
      name: "Witch's Brew", 
      duration: "4:15", 
      rating: 4.9, 
      downloads: 2100,
      description: "Mystical brewing sounds with color-changing cauldron effects."
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
                <h1 className="text-3xl font-bold font-spectral">Show Library</h1>
                <Button>Upload Show</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {shows.map((show, idx) => (
                  <Card key={idx} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg">{show.name}</CardTitle>
                        <Badge variant="secondary">New</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">{show.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {show.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          {show.rating}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {show.downloads}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          <Play className="w-3 h-3 mr-1" />
                          Preview
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="w-3 h-3 mr-1" />
                          Download
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* My Shows Section */}
              <Card>
                <CardHeader>
                  <CardTitle>My Shows</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <h4 className="font-semibold">Custom Halloween 2024</h4>
                        <p className="text-sm text-muted-foreground">Last modified: 2 days ago</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm">
                          <Play className="w-3 h-3 mr-1" />
                          Run
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded">
                      <div>
                        <h4 className="font-semibold">Twilight Parade</h4>
                        <p className="text-sm text-muted-foreground">Last modified: 1 week ago</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Edit</Button>
                        <Button size="sm">
                          <Play className="w-3 h-3 mr-1" />
                          Run
                        </Button>
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

export default ShowLibrary;
