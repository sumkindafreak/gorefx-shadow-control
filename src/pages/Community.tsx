
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ArrowLeft, MessageCircle, ThumbsUp, Download, Star } from "lucide-react";
import { Link } from "react-router-dom";

const Community = () => {
  const posts = [
    {
      user: "SpookyMaster", 
      title: "New Fog Machine Integration Tutorial",
      content: "Just finished setting up my new fog machine with GoreFX. Here's a step-by-step guide...",
      likes: 24,
      comments: 8,
      time: "2 hours ago"
    },
    {
      user: "HauntedHouse2024", 
      title: "Amazing Results with Synchronized Audio!",
      content: "The audio sync feature is incredible! My visitors were completely immersed...",
      likes: 42,
      comments: 15,
      time: "1 day ago"
    },
    {
      user: "TechWizard", 
      title: "Custom Arduino Code for Motion Sensors",
      content: "Sharing my custom code for integrating PIR motion sensors with the platform...",
      likes: 67,
      comments: 23,
      time: "3 days ago"
    }
  ];

  const featuredShows = [
    { name: "Zombie Apocalypse", author: "UndeadFX", rating: 4.9, downloads: 5200 },
    { name: "Ghostly Manor", author: "SpiritMaster", rating: 4.7, downloads: 3800 },
    { name: "Vampire's Lair", author: "BloodMoon", rating: 4.8, downloads: 4100 }
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
                <h1 className="text-3xl font-bold font-spectral">HauntSync Community</h1>
                <Button>Share Your Setup</Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Community Posts */}
                <div className="lg:col-span-2 space-y-4">
                  <h2 className="text-xl font-semibold">Recent Posts</h2>
                  {posts.map((post, idx) => (
                    <Card key={idx}>
                      <CardHeader>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{post.user[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">{post.title}</h3>
                            <p className="text-sm text-muted-foreground">by {post.user} • {post.time}</p>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm mb-4">{post.content}</p>
                        <div className="flex items-center gap-4">
                          <Button variant="ghost" size="sm">
                            <ThumbsUp className="w-4 h-4 mr-1" />
                            {post.likes}
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageCircle className="w-4 h-4 mr-1" />
                            {post.comments}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Featured Shows */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Featured Community Shows</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {featuredShows.map((show, idx) => (
                        <div key={idx} className="border rounded p-3">
                          <h4 className="font-semibold">{show.name}</h4>
                          <p className="text-sm text-muted-foreground">by {show.author}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm">{show.rating}</span>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              <Download className="w-3 h-3 mr-1" />
                              {show.downloads}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Community Stats */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Community Stats</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span>Active Members</span>
                        <span className="font-semibold">12,450</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shows Shared</span>
                        <span className="font-semibold">3,280</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Downloads</span>
                        <span className="font-semibold">89,500</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </main>
          </SidebarInset>
          <Footer />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Community;
