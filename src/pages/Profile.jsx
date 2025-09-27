import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useIsMobile } from "@/hooks/use-mobile";

export default function Profile() {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background text-foreground font-inter animate-in">
      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center sm:items-end sm:justify-between gap-4 sm:gap-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-lg bg-gradient-to-br from-success to-warning flex items-center justify-center text-background font-semibold text-lg sm:text-xl shadow-lg">
              AM
            </div>
            <div className="text-center sm:text-left">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-primary">Alex Morgan</h1>
              <p className="text-muted-foreground text-sm sm:text-base">Product Manager • Acme Ventures</p>
              <p className="text-xs sm:text-sm text-muted-foreground/70 mt-1">Joined Jan 2023</p>
            </div>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto">
            Edit Profile
          </Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className={`grid ${isMobile ? 'grid-cols-2' : 'grid-cols-4'} w-full sm:w-auto sm:inline-flex glass-card`}>
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="settings" 
              className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm"
            >
              Settings
            </TabsTrigger>
            {!isMobile && (
              <>
                <TabsTrigger 
                  value="security" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm"
                >
                  Security
                </TabsTrigger>
                <TabsTrigger 
                  value="activity" 
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs sm:text-sm"
                >
                  Activity
                </TabsTrigger>
              </>
            )}
          </TabsList>

          {/* Mobile Additional Tabs */}
          {isMobile && (
            <TabsList className="grid grid-cols-2 w-full mt-2 glass-card">
              <TabsTrigger 
                value="security" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs"
              >
                Security
              </TabsTrigger>
              <TabsTrigger 
                value="activity" 
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground text-xs"
              >
                Activity
              </TabsTrigger>
            </TabsList>
          )}

          {/* Overview */}
          <TabsContent value="overview" className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
            <Card className="glass-card border border-success/30">
              <CardContent className="p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-warning">About</h2>
                <p className="text-sm sm:text-base text-card-foreground/90">
                  Passionate product manager with 5+ years in venture-backed startups.
                  Focused on building modern investment tools and improving workflows.
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border border-primary/30">
              <CardContent className="p-4 sm:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base">
                  <div className="space-y-1">
                    <span className="text-muted-foreground text-xs sm:text-sm">Email</span>
                    <p className="text-foreground break-all">alex.morgan@acme.com</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-muted-foreground text-xs sm:text-sm">Role</span>
                    <p className="text-foreground">Admin</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-muted-foreground text-xs sm:text-sm">Teams</span>
                    <p className="text-foreground">Investors, Research</p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-muted-foreground text-xs sm:text-sm">Last Active</span>
                    <p className="text-foreground">2 hours ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings" className="mt-4 sm:mt-6">
            <Card className="glass-card border border-success/30">
              <CardContent className="p-4 sm:p-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-warning text-xs sm:text-sm">Full Name</Label>
                    <Input 
                      id="name" 
                      defaultValue="Alex Morgan" 
                      className="bg-input border-primary/50 text-foreground text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-warning text-xs sm:text-sm">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      defaultValue="alex.morgan@acme.com" 
                      className="bg-input border-primary/50 text-foreground text-sm"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="organization" className="text-warning text-xs sm:text-sm">Organization</Label>
                  <Input 
                    id="organization" 
                    defaultValue="Acme Ventures" 
                    className="bg-input border-primary/50 text-foreground text-sm"
                  />
                </div>
                <Button className="bg-success hover:bg-success/90 text-success-foreground w-full sm:w-auto">
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security */}
          <TabsContent value="security" className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
            <Card className="glass-card border border-warning/30">
              <CardContent className="p-4 sm:p-6 space-y-4">
                <h2 className="text-base sm:text-lg font-semibold text-primary">Change Password</h2>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password" className="text-warning text-xs sm:text-sm">Current Password</Label>
                    <Input 
                      id="current-password" 
                      type="password" 
                      placeholder="••••••••" 
                      className="bg-input border-primary/50 text-foreground text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password" className="text-warning text-xs sm:text-sm">New Password</Label>
                    <Input 
                      id="new-password" 
                      type="password" 
                      placeholder="••••••••" 
                      className="bg-input border-primary/50 text-foreground text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password" className="text-warning text-xs sm:text-sm">Confirm Password</Label>
                    <Input 
                      id="confirm-password" 
                      type="password" 
                      placeholder="••••••••" 
                      className="bg-input border-primary/50 text-foreground text-sm"
                    />
                  </div>
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto">
                  Update Password
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity */}
          <TabsContent value="activity" className="mt-4 sm:mt-6">
            <Card className="glass-card border border-primary/30">
              <CardContent className="p-4 sm:p-6 space-y-4">
                <h2 className="text-base sm:text-lg font-semibold text-success">Recent Activity</h2>
                <ul className="text-xs sm:text-sm space-y-3 text-card-foreground/90">
                  <li className="flex items-start gap-3">
                    <span className="text-base">🔑</span>
                    <div>
                      <p>Logged in from Chrome</p>
                      <span className="text-muted-foreground text-xs">2h ago</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-base">📄</span>
                    <div>
                      <p>Uploaded report</p>
                      <span className="text-muted-foreground text-xs">1d ago</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-base">👥</span>
                    <div>
                      <p>Added new team member</p>
                      <span className="text-muted-foreground text-xs">3d ago</span>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}