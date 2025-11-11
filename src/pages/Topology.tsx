import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Server, Wifi } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Topology = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out",
      description: "You have been signed out successfully.",
    });
    navigate("/auth");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={user} onSignOut={handleSignOut} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Network Topology</h1>
          <p className="text-muted-foreground">Visual representation of your network infrastructure</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Network Map</CardTitle>
            <CardDescription>Real-time visualization of connected devices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative bg-muted/30 rounded-lg p-8 min-h-[600px] flex items-center justify-center">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-full h-full" viewBox="0 0 800 600">
                  {/* Router - Center */}
                  <g transform="translate(400, 300)">
                    <circle cx="0" cy="0" r="40" fill="hsl(var(--primary))" opacity="0.2" />
                    <circle cx="0" cy="0" r="30" fill="hsl(var(--primary))" />
                    <text x="0" y="5" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Router</text>
                    <text x="0" y="60" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="11">192.168.1.1</text>
                  </g>

                  {/* Server 1 - Top Left */}
                  <line x1="400" y1="300" x2="250" y2="150" stroke="hsl(var(--success))" strokeWidth="2" strokeDasharray="5,5" />
                  <g transform="translate(250, 150)">
                    <rect x="-25" y="-25" width="50" height="50" rx="8" fill="hsl(var(--success))" opacity="0.2" />
                    <rect x="-20" y="-20" width="40" height="40" rx="6" fill="hsl(var(--success))" />
                    <text x="0" y="5" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Server-01</text>
                    <text x="0" y="-40" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="10">192.168.1.100</text>
                    <circle cx="30" cy="-30" r="4" fill="hsl(var(--success))" />
                  </g>

                  {/* Server 2 - Top Right */}
                  <line x1="400" y1="300" x2="550" y2="150" stroke="hsl(var(--success))" strokeWidth="2" strokeDasharray="5,5" />
                  <g transform="translate(550, 150)">
                    <rect x="-25" y="-25" width="50" height="50" rx="8" fill="hsl(var(--success))" opacity="0.2" />
                    <rect x="-20" y="-20" width="40" height="40" rx="6" fill="hsl(var(--success))" />
                    <text x="0" y="5" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Server-02</text>
                    <text x="0" y="-40" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="10">192.168.1.101</text>
                    <circle cx="30" cy="-30" r="4" fill="hsl(var(--success))" />
                  </g>

                  {/* Server 3 - Bottom Left - Warning */}
                  <line x1="400" y1="300" x2="250" y2="450" stroke="hsl(var(--warning))" strokeWidth="2" strokeDasharray="5,5" />
                  <g transform="translate(250, 450)">
                    <rect x="-25" y="-25" width="50" height="50" rx="8" fill="hsl(var(--warning))" opacity="0.2" />
                    <rect x="-20" y="-20" width="40" height="40" rx="6" fill="hsl(var(--warning))" />
                    <text x="0" y="5" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Server-03</text>
                    <text x="0" y="40" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="10">192.168.1.102</text>
                    <circle cx="30" cy="30" r="4" fill="hsl(var(--warning))" />
                  </g>

                  {/* Server 4 - Bottom Right */}
                  <line x1="400" y1="300" x2="550" y2="450" stroke="hsl(var(--success))" strokeWidth="2" strokeDasharray="5,5" />
                  <g transform="translate(550, 450)">
                    <rect x="-25" y="-25" width="50" height="50" rx="8" fill="hsl(var(--success))" opacity="0.2" />
                    <rect x="-20" y="-20" width="40" height="40" rx="6" fill="hsl(var(--success))" />
                    <text x="0" y="5" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">Server-04</text>
                    <text x="0" y="40" textAnchor="middle" fill="hsl(var(--foreground))" fontSize="10">192.168.1.103</text>
                    <circle cx="30" cy="30" r="4" fill="hsl(var(--success))" />
                  </g>
                </svg>
              </div>
              
              <div className="absolute bottom-4 left-4 right-4 flex gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-3 w-3 rounded-full bg-success" />
                  <span className="text-muted-foreground">Online</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-3 w-3 rounded-full bg-warning" />
                  <span className="text-muted-foreground">Warning</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-3 w-3 rounded-full bg-destructive" />
                  <span className="text-muted-foreground">Offline</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Topology;
