import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Server, Wifi, AlertCircle, TrendingUp, Menu } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { StatsCards } from "@/components/dashboard/StatsCards";
import { NetworkChart } from "@/components/dashboard/NetworkChart";

const Dashboard = () => {
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Network Overview</h1>
          <p className="text-muted-foreground">Real-time monitoring and analytics</p>
        </div>

        <StatsCards />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <NetworkChart />
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-warning" />
                Recent Alerts
              </CardTitle>
              <CardDescription>Latest network notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-lg border border-warning/20 bg-warning/5">
                  <AlertCircle className="h-5 w-5 text-warning mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">High bandwidth usage</p>
                    <p className="text-xs text-muted-foreground">Server-03 exceeding 90% threshold</p>
                    <p className="text-xs text-muted-foreground mt-1">2 minutes ago</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 p-3 rounded-lg border border-success/20 bg-success/5">
                  <Activity className="h-5 w-5 text-success mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">Device back online</p>
                    <p className="text-xs text-muted-foreground">Router-01 reconnected to network</p>
                    <p className="text-xs text-muted-foreground mt-1">15 minutes ago</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg border border-muted">
                  <Server className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">Maintenance scheduled</p>
                    <p className="text-xs text-muted-foreground">Network upgrade on Server-01</p>
                    <p className="text-xs text-muted-foreground mt-1">1 hour ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Server className="h-5 w-5" />
              Active Devices
            </CardTitle>
            <CardDescription>Currently monitored devices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-sm">Device</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">IP Address</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Uptime</th>
                    <th className="text-left py-3 px-4 font-medium text-sm">Bandwidth</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 text-sm">Server-01</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">192.168.1.100</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                        <div className="h-1.5 w-1.5 rounded-full bg-success" />
                        Online
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">99.9%</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">45 Mbps</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 text-sm">Router-01</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">192.168.1.1</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                        <div className="h-1.5 w-1.5 rounded-full bg-success" />
                        Online
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">100%</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">120 Mbps</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 text-sm">Server-03</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">192.168.1.102</td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-warning/10 text-warning">
                        <div className="h-1.5 w-1.5 rounded-full bg-warning" />
                        Warning
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">95.2%</td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">89 Mbps</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Dashboard;
