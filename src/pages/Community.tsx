
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import AppSidebar from "@/components/layout/AppSidebar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PayPalButton from "@/components/PayPalButton";
import { useAuth } from "@/contexts/AuthContext";

const Community = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const tiers = [
    {
      name: "Standard Access",
      price: "£2.50",
      period: "/ month",
      planId: "P-7KL264841W2552459NBF443Q",
      features: [
        "Access to HauntSync Community",
        "Comment on posts",
        "Basic support",
      ],
      cta: "Subscribe",
    },
    {
      name: "Creator Access",
      price: "£20",
      period: "/ month",
      planId: "P-0SA67033PS444644SNBF45XY",
      features: [
        "Everything in Standard",
        "Download community shows",
        "Upload your own shows",
        "Priority support",
      ],
      cta: "Subscribe",
    },
    {
      name: "Full Access",
      price: "£50",
      period: "/ month",
      planId: "P-9WS58098DC2037313NBF46FY",
      features: [
        "Everything in Creator",
        "Full access to entire HauntSync library",
        "Early access to new features",
        "Direct line to developers",
      ],
      cta: "Subscribe",
    },
  ];

  useEffect(() => {
    const scriptId = 'paypal-sdk';
    if (document.getElementById(scriptId) || window.paypal) {
        setScriptLoaded(true);
        return;
    }

    const script = document.createElement('script');
    script.id = scriptId;
    script.src = "https://www.paypal.com/sdk/js?client-id=AVJL9UUFTk4WuZ_sx7LaIZ8CWyo-3LNdl-r_Xq4IWrvayg262E2BisO2vm3GnraHRtm9u-Ybh2B0CwMe&vault=true&intent=subscription";
    script.setAttribute('data-sdk-integration-source', 'button-factory');
    
    script.onload = () => {
      setScriptLoaded(true);
    };
    script.onerror = () => {
        console.error("PayPal SDK could not be loaded.");
    };
    document.body.appendChild(script);

  }, []);

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
              <div className="text-center">
                <h1 className="text-4xl font-bold font-spectral">Join the HauntSync Community</h1>
                <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                  Unlock powerful features by subscribing. Share your creations, get inspired by others, and take your haunt to the next level.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-8 max-w-5xl mx-auto">
                {tiers.map((tier) => (
                    <Card key={tier.name} className="flex flex-col hover:border-primary transition-all">
                        <CardHeader>
                            <CardTitle className="font-spectral text-2xl">{tier.name}</CardTitle>
                            <div className="text-4xl font-bold">
                                {tier.price}
                                <span className="text-base font-normal text-muted-foreground">{tier.period}</span>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow flex flex-col justify-between">
                            <ul className="space-y-3 text-sm mb-8">
                                {tier.features.map(feature => (
                                    <li key={feature} className="flex items-start gap-3">
                                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-auto">
                               {authLoading ? (
                                  <Button className="w-full" disabled>Loading...</Button>
                               ) : scriptLoaded ? (
                                user ? (
                                  <PayPalButton planId={tier.planId} />
                                ) : (
                                  <Button className="w-full" onClick={() => navigate('/auth')}>
                                    Subscribe
                                  </Button>
                                )
                              ) : (
                                <Button className="w-full" disabled>Loading Payment Options...</Button>
                              )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
              </div>
              
              <div className="text-center text-sm text-muted-foreground pt-4">
                You can manage or cancel your subscription at any time.
                <br />
                A HauntSync account is required to subscribe.
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
