import { useState } from "react";
import { User, Bell, Shield, Palette, Database, LogOut, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "../context/AuthContext";

export default function Settings() {
  const [notifications, setNotifications] = useState({
    deals: true,
    portfolio: true,
    alerts: false,
    weekly: true
  });

  const {logout} = useAuth();

  const settingsSections = [
    {
      id: "profile",
      title: "Profile",
      description: "Manage your account and personal information",
      icon: User,
    },
    {
      id: "notifications", 
      title: "Notifications",
      description: "Configure alerts and communication preferences",
      icon: Bell,
    },
    {
      id: "security",
      title: "Security",
      description: "Password, 2FA, and access management",
      icon: Shield,
    },
    {
      id: "appearance",
      title: "Appearance", 
      description: "Theme and display preferences",
      icon: Palette,
    },
    {
      id: "data",
      title: "Data & Export",
      description: "Backup and data management",
      icon: Database,
    }
  ];

  const [activeSection, setActiveSection] = useState("profile");

  const renderContent = () => {
    switch(activeSection) {
      case "profile":
        return (
          <div className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-foreground">Personal Information</CardTitle>
                <CardDescription>Update your profile details and organization settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="Sarah" className="bg-input border-border" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Chen" className="bg-input border-border" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="sarah.chen@venture.co" className="bg-input border-border" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organization">Organization</Label>
                  <Input id="organization" defaultValue="Venture Capital Partners" className="bg-input border-border" />
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case "notifications":
        return (
          <div className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-foreground">Notification Preferences</CardTitle>
                <CardDescription>Choose what updates you'd like to receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Deal Updates</Label>
                    <p className="text-sm text-muted-foreground">New deals and status changes</p>
                  </div>
                  <Switch 
                    checked={notifications.deals}
                    onCheckedChange={(checked) => setNotifications({...notifications, deals: checked})}
                  />
                </div>
                <Separator className="bg-border/50" />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Portfolio Alerts</Label>
                    <p className="text-sm text-muted-foreground">Important portfolio company updates</p>
                  </div>
                  <Switch 
                    checked={notifications.portfolio}
                    onCheckedChange={(checked) => setNotifications({...notifications, portfolio: checked})}
                  />
                </div>
                <Separator className="bg-border/50" />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Risk Alerts</Label>
                    <p className="text-sm text-muted-foreground">Runway and performance warnings</p>
                  </div>
                  <Switch 
                    checked={notifications.alerts}
                    onCheckedChange={(checked) => setNotifications({...notifications, alerts: checked})}
                  />
                </div>
                <Separator className="bg-border/50" />
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Weekly Summary</Label>
                    <p className="text-sm text-muted-foreground">Weekly portfolio performance report</p>
                  </div>
                  <Switch 
                    checked={notifications.weekly}
                    onCheckedChange={(checked) => setNotifications({...notifications, weekly: checked})}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "security":
        return (
          <div className="space-y-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-foreground">Security Settings</CardTitle>
                <CardDescription>Manage your account security and access</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current">Current Password</Label>
                  <Input id="current" type="password" className="bg-input border-border" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new">New Password</Label>
                  <Input id="new" type="password" className="bg-input border-border" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm">Confirm Password</Label>
                  <Input id="confirm" type="password" className="bg-input border-border" />
                </div>
                <Button className="mt-4">Update Password</Button>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return (
          <Card className="glass-card">
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground">Coming soon...</p>
            </CardContent>
          </Card>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background animate-in">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account and organization preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Settings Navigation */}
          <div className="lg:col-span-1">
            <Card className="glass-card sticky top-4">
              <CardContent className="p-0">
                <nav className="space-y-1 p-4">
                  {settingsSections.map((section) => {
                    const Icon = section.icon;
                    const isActive = activeSection === section.id;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-left transition-colors ${
                          isActive 
                            ? 'bg-primary/10 text-primary border border-primary/20' 
                            : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{section.title}</p>
                        </div>
                        <ChevronRight className={`h-4 w-4 transition-transform ${isActive ? 'rotate-90' : ''}`} />
                      </button>
                    );
                  })}
                </nav>
                
                <Separator className="bg-border/50" />
                
                <div className="p-4">
                  <Button variant="outline" size="sm" onClick={() => logout()} className="w-full justify-start gap-2 text-destructive border-destructive/20 hover:bg-destructive/10">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Settings Content */}
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};