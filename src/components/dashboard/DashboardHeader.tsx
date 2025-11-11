import { Button } from "@/components/ui/button";
import { Activity, LogOut, Menu, Settings } from "lucide-react";
import { Link } from "react-router-dom";

interface DashboardHeaderProps {
  user: any;
  onSignOut: () => void;
}

export const DashboardHeader = ({ user, onSignOut }: DashboardHeaderProps) => {
  return (
    <header className="border-b bg-card shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <Activity className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-bold">Network Monitor Pro</h1>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/dashboard" className="text-sm font-medium hover:text-primary transition-colors">
              Dashboard
            </Link>
            <Link to="/devices" className="text-sm font-medium hover:text-primary transition-colors">
              Devices
            </Link>
            <Link to="/topology" className="text-sm font-medium hover:text-primary transition-colors">
              Topology
            </Link>
            <Link to="/reports" className="text-sm font-medium hover:text-primary transition-colors">
              Reports
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onSignOut}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
