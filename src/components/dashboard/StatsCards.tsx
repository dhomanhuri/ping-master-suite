import { Card, CardContent } from "@/components/ui/card";
import { Activity, Server, Wifi, AlertCircle } from "lucide-react";

export const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium">Total Devices</p>
              <p className="text-3xl font-bold mt-2">24</p>
              <p className="text-xs text-success mt-2">+2 from last week</p>
            </div>
            <div className="bg-primary/10 p-3 rounded-lg">
              <Server className="h-6 w-6 text-primary" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium">Online Devices</p>
              <p className="text-3xl font-bold mt-2">22</p>
              <p className="text-xs text-success mt-2">91.7% uptime</p>
            </div>
            <div className="bg-success/10 p-3 rounded-lg">
              <Activity className="h-6 w-6 text-success" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium">Total Bandwidth</p>
              <p className="text-3xl font-bold mt-2">845</p>
              <p className="text-xs text-muted-foreground mt-2">Mbps average</p>
            </div>
            <div className="bg-accent/10 p-3 rounded-lg">
              <Wifi className="h-6 w-6 text-accent" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium">Active Alerts</p>
              <p className="text-3xl font-bold mt-2">3</p>
              <p className="text-xs text-warning mt-2">2 require attention</p>
            </div>
            <div className="bg-warning/10 p-3 rounded-lg">
              <AlertCircle className="h-6 w-6 text-warning" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
