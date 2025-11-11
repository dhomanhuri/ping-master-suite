import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Server, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const Devices = () => {
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Device Management</h1>
            <p className="text-muted-foreground">Monitor and manage all network devices</p>
          </div>
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Device
          </Button>
        </div>

        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search devices by name, IP, or location..." 
                  className="pl-10"
                />
              </div>
              <Button variant="outline">SNMP Scan</Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Server-01</CardTitle>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                  <div className="h-1.5 w-1.5 rounded-full bg-success" />
                  Online
                </span>
              </div>
              <CardDescription>192.168.1.100</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-medium">Linux Server</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Location</span>
                  <span className="font-medium">Rack A-01</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Uptime</span>
                  <span className="font-medium">99.9%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Bandwidth</span>
                  <span className="font-medium">45 Mbps</span>
                </div>
                <div className="pt-3 border-t">
                  <Button variant="outline" size="sm" className="w-full">View Details</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Router-01</CardTitle>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                  <div className="h-1.5 w-1.5 rounded-full bg-success" />
                  Online
                </span>
              </div>
              <CardDescription>192.168.1.1</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-medium">Cisco Router</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Location</span>
                  <span className="font-medium">Network Closet</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Uptime</span>
                  <span className="font-medium">100%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Bandwidth</span>
                  <span className="font-medium">120 Mbps</span>
                </div>
                <div className="pt-3 border-t">
                  <Button variant="outline" size="sm" className="w-full">View Details</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Server-03</CardTitle>
                <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-warning/10 text-warning">
                  <div className="h-1.5 w-1.5 rounded-full bg-warning" />
                  Warning
                </span>
              </div>
              <CardDescription>192.168.1.102</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-medium">Database Server</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Location</span>
                  <span className="font-medium">Rack B-03</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Uptime</span>
                  <span className="font-medium">95.2%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Bandwidth</span>
                  <span className="font-medium text-warning">89 Mbps</span>
                </div>
                <div className="pt-3 border-t">
                  <Button variant="outline" size="sm" className="w-full">View Details</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Devices;
