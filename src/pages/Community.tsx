
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

const Community = () => {
  const { profile, subscription } = useAuth();

  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex bg-background font-orbitron">
        <AppSidebar />
        <div className="flex flex-col w-full">
          <Header />
          <SidebarInset className="p-4 lg:p-8 flex-grow">
            <main className="flex-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Community Hub</CardTitle>
                  <CardDescription>
                    Connect with other creators, share your shows, and get help.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-border rounded-lg">
                    <MessageSquare className="w-16 h-16 text-muted-foreground mb-4" />
                    <h2 className="text-2xl font-bold mb-2 font-spectral">
                      Welcome to the Forum!
                    </h2>
                    <p className="text-muted-foreground mb-6 max-w-md">
                      This is the place to discuss everything about HauntSync and
                      Showduino, from technical questions to showing off your latest
                      creation.
                    </p>
                    <Button asChild size="lg">
                      <Link to="/forum">Enter the Forum</Link>
                    </Button>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4 font-spectral">
                      Your Subscription
                    </h3>
                    {profile ? (
                      <p>
                        Welcome, {profile.full_name}! Your current tier is:{" "}
                        <span className="font-bold text-primary capitalize">
                          {subscription?.tier.replace("_", " ") || "Standard"}
                        </span>
                      </p>
                    ) : (
                      <p>
                        <Link to="/auth" className="text-primary underline">
                          Log in
                        </Link>{" "}
                        to see your subscription status.
                      </p>
                    )}
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

export default Community;
