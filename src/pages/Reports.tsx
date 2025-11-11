import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Reports = () => {
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Reports</h1>
          <p className="text-muted-foreground">Generate and download network performance reports</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                Daily Summary
              </CardTitle>
              <CardDescription>Last 24 hours overview</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Avg. Uptime</span>
                  <span className="font-medium">99.8%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Alerts</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Peak Traffic</span>
                  <span className="font-medium">145 Mbps</span>
                </div>
              </div>
              <Button variant="outline" className="w-full gap-2">
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-accent" />
                Weekly Report
              </CardTitle>
              <CardDescription>Last 7 days analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Avg. Uptime</span>
                  <span className="font-medium">99.5%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Alerts</span>
                  <span className="font-medium">47</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Peak Traffic</span>
                  <span className="font-medium">187 Mbps</span>
                </div>
              </div>
              <Button variant="outline" className="w-full gap-2">
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5 text-success" />
                Monthly Report
              </CardTitle>
              <CardDescription>Last 30 days insights</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Avg. Uptime</span>
                  <span className="font-medium">99.2%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Alerts</span>
                  <span className="font-medium">203</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Peak Traffic</span>
                  <span className="font-medium">210 Mbps</span>
                </div>
              </div>
              <Button variant="outline" className="w-full gap-2">
                <Download className="h-4 w-4" />
                Download PDF
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Historical Reports
            </CardTitle>
            <CardDescription>Previously generated reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded">
                    <FileText className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Network Performance - January 2025</p>
                    <p className="text-xs text-muted-foreground">Generated on Jan 31, 2025</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="bg-accent/10 p-2 rounded">
                    <FileText className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Uptime Analysis - December 2024</p>
                    <p className="text-xs text-muted-foreground">Generated on Dec 31, 2024</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="bg-success/10 p-2 rounded">
                    <FileText className="h-4 w-4 text-success" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Bandwidth Report - November 2024</p>
                    <p className="text-xs text-muted-foreground">Generated on Nov 30, 2024</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Reports;
