
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, Book, MessageCircle, Video, ExternalLink, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Help = () => {
  const quickGuides = [
    { title: "Setting Up Your First Show", category: "Getting Started", readTime: "5 min" },
    { title: "Connecting ESP32 Devices", category: "Hardware", readTime: "10 min" },
    { title: "DMX Configuration Guide", category: "Lighting", readTime: "15 min" },
    { title: "Audio Sync Setup", category: "Audio", readTime: "8 min" },
    { title: "Weather Integration", category: "Advanced", readTime: "12 min" },
    { title: "Troubleshooting Common Issues", category: "Support", readTime: "20 min" },
  ];

  const faqs = [
    {
      question: "How do I connect a new ESP32 device?",
      answer: "Go to Devices > Add Device, select ESP32, and follow the setup wizard. Make sure your device is in pairing mode."
    },
    {
      question: "Why is my show not starting automatically?",
      answer: "Check the Schedule settings and ensure the show is enabled. Also verify that all required devices are online."
    },
    {
      question: "How do I backup my configuration?",
      answer: "Navigate to Settings > Backup & Restore. Click 'Create Backup' to save all your settings and shows."
    },
    {
      question: "Can I control the system remotely?",
      answer: "Yes! Enable Remote Access in settings and use the mobile app or web interface from anywhere."
    },
  ];

  const supportChannels = [
    { name: "Live Chat", description: "Get instant help from our support team", icon: MessageCircle, status: "Online" },
    { name: "Video Tutorials", description: "Step-by-step video guides", icon: Video, status: "Available" },
    { name: "Community Forum", description: "Connect with other users", icon: ExternalLink, status: "Active" },
    { name: "Phone Support", description: "Call us for urgent issues", icon: Phone, status: "9AM-5PM EST" },
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
                <h1 className="text-3xl font-bold font-spectral">Help & Support</h1>
                <Button>
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contact Support
                </Button>
              </div>

              {/* Search Help */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input placeholder="Search for help articles, guides, and FAQs..." className="pl-10" />
                    </div>
                    <Button>Search</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Start Guides */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Book className="w-5 h-5" />
                    Quick Start Guides
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {quickGuides.map((guide, idx) => (
                      <div key={idx} className="border rounded p-4 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold">{guide.title}</h4>
                          <Badge variant="outline" className="text-xs">{guide.readTime}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{guide.category}</p>
                        <Button size="sm" variant="outline" className="w-full">
                          <Book className="w-3 h-3 mr-1" />
                          Read Guide
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Frequently Asked Questions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {faqs.map((faq, idx) => (
                        <div key={idx} className="border rounded p-4">
                          <h4 className="font-semibold mb-2">{faq.question}</h4>
                          <p className="text-sm text-muted-foreground">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                    <Button className="w-full mt-4" variant="outline">
                      View All FAQs
                    </Button>
                  </CardContent>
                </Card>

                {/* Support Channels */}
                <Card>
                  <CardHeader>
                    <CardTitle>Get Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {supportChannels.map((channel, idx) => (
                        <div key={idx} className="flex items-center justify-between p-3 border rounded">
                          <div className="flex items-center gap-3">
                            <channel.icon className="w-5 h-5 text-primary" />
                            <div>
                              <p className="font-medium">{channel.name}</p>
                              <p className="text-sm text-muted-foreground">{channel.description}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge variant="outline">{channel.status}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <Phone className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <h4 className="font-semibold">Phone Support</h4>
                      <p className="text-sm text-muted-foreground">1-800-GORE-FX1</p>
                      <p className="text-xs text-muted-foreground">Monday - Friday, 9AM - 5PM EST</p>
                    </div>
                    <div className="text-center">
                      <Mail className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <h4 className="font-semibold">Email Support</h4>
                      <p className="text-sm text-muted-foreground">support@gorefx.com</p>
                      <p className="text-xs text-muted-foreground">Response within 24 hours</p>
                    </div>
                    <div className="text-center">
                      <ExternalLink className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <h4 className="font-semibold">Online Resources</h4>
                      <p className="text-sm text-muted-foreground">docs.gorefx.com</p>
                      <p className="text-xs text-muted-foreground">Comprehensive documentation</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* System Diagnostics */}
              <Card>
                <CardHeader>
                  <CardTitle>System Diagnostics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-3">Quick Health Check</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>System Status</span>
                          <Badge variant="default">Healthy</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Network Connection</span>
                          <Badge variant="default">Connected</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Device Connectivity</span>
                          <Badge variant="default">6/6 Online</Badge>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Storage Space</span>
                          <Badge variant="default">Available</Badge>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-3">Diagnostic Tools</h4>
                      <div className="space-y-2">
                        <Button className="w-full" variant="outline" size="sm">
                          Run System Test
                        </Button>
                        <Button className="w-full" variant="outline" size="sm">
                          Check Device Connections
                        </Button>
                        <Button className="w-full" variant="outline" size="sm">
                          Export Debug Logs
                        </Button>
                        <Button className="w-full" variant="outline" size="sm">
                          Network Diagnostics
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

export default Help;
