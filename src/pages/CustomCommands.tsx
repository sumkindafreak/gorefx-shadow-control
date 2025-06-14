
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Code, Play, Edit, Trash2, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const CustomCommands = () => {
  const commands: {name: string, code: string, status: string}[] = [];

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
                <h1 className="text-3xl font-bold font-spectral">Custom Commands</h1>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Command
                </Button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Command List */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="w-5 h-5" />
                      Saved Commands
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {commands.length > 0 ? commands.map((cmd, idx) => (
                      <div key={idx} className="border rounded p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">{cmd.name}</h4>
                          <Badge variant={cmd.status === "Active" ? "default" : "secondary"}>
                            {cmd.status}
                          </Badge>
                        </div>
                        <code className="text-sm bg-muted p-2 rounded block overflow-x-auto">
                          {cmd.code}
                        </code>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Play className="w-3 h-3 mr-1" />
                            Test
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </Button>
                          <Button size="sm" variant="outline">
                            <Trash2 className="w-3 h-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    )) : (
                      <div className="text-center text-muted-foreground py-16 border-dashed border-2 rounded-lg">
                        <p className="font-semibold">No commands saved yet.</p>
                        <p className="text-sm mt-1">Use the editor on the right to create your first command.</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Command Editor */}
                <Card>
                  <CardHeader>
                    <CardTitle>Command Editor</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Command Name</label>
                      <Input placeholder="Enter command name..." />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Command Code</label>
                      <Textarea 
                        placeholder="lights.on(); audio.play('file.mp3');" 
                        className="min-h-32 font-mono"
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button className="flex-1">Save Command</Button>
                      <Button variant="outline">Test Run</Button>
                    </div>
                    
                    <div className="mt-6 p-4 bg-muted rounded">
                      <h4 className="font-semibold mb-2">Available Functions:</h4>
                      <div className="text-sm space-y-1">
                        <div><code>lights.on() / lights.off()</code> - Control lighting</div>
                        <div><code>audio.play('file.mp3')</code> - Play audio</div>
                        <div><code>fog.activate(seconds)</code> - Trigger fog machine</div>
                        <div><code>pneumatic.trigger()</code> - Activate pneumatics</div>
                      </div>
                    </div>
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

export default CustomCommands;
