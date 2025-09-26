import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Profile() {
    return (
        <div className="max-w-5xl mx-auto p-6 space-y-8 bg-[#0D0D0D] text-white min-h-screen">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end sm:justify-between gap-4">
                <div className="flex items-center gap-4">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-br from-[#2CB67D] to-[#FFCD58] flex items-center justify-center text-white font-semibold text-xl shadow-lg">
                        AM
                    </div>
                    <div>
                        <h1 className="text-2xl font-semibold text-[#7F5AF0]">Alex Morgan</h1>
                        <p className="text-gray-400">Product Manager • Acme Ventures</p>
                        <p className="text-sm text-gray-500 mt-1">Joined Jan 2023</p>
                    </div>
                </div>
                <Button className="bg-[#7F5AF0] hover:bg-[#6b47d6] text-white">Edit Profile</Button>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid grid-cols-2 sm:w-auto sm:inline-flex bg-[#1a1a1a] rounded-lg">
                    <TabsTrigger value="overview" className="data-[state=active]:bg-[#7F5AF0] data-[state=active]:text-white">Overview</TabsTrigger>
                    <TabsTrigger value="settings" className="data-[state=active]:bg-[#7F5AF0] data-[state=active]:text-white">Settings</TabsTrigger>
                    <TabsTrigger value="security" className="data-[state=active]:bg-[#7F5AF0] data-[state=active]:text-white">Security</TabsTrigger>
                    <TabsTrigger value="activity" className="data-[state=active]:bg-[#7F5AF0] data-[state=active]:text-white">Activity</TabsTrigger>
                </TabsList>

                {/* Overview */}
                <TabsContent value="overview" className="mt-6 space-y-6">
                    <Card className="bg-[#1a1a1a]/70 backdrop-blur-lg border border-[#2CB67D]/30">
                        <CardContent className="p-6">
                            <h2 className="text-lg font-semibold mb-4 text-[#FFCD58]">About</h2>
                            <p className="text-gray-300">
                                Passionate product manager with 5+ years in venture-backed startups.
                                Focused on building modern investment tools and improving workflows.
                            </p>
                        </CardContent>
                    </Card>

                    <Card className="bg-[#1a1a1a]/70 backdrop-blur-lg border border-[#7F5AF0]/30">
                        <CardContent className="p-6 grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-gray-400">Email</span>
                                <p>alex.morgan@acme.com</p>
                            </div>
                            <div>
                                <span className="text-gray-400">Role</span>
                                <p>Admin</p>
                            </div>
                            <div>
                                <span className="text-gray-400">Teams</span>
                                <p>Investors, Research</p>
                            </div>
                            <div>
                                <span className="text-gray-400">Last Active</span>
                                <p>2 hours ago</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Settings */}
                <TabsContent value="settings" className="mt-6">
                    <Card className="bg-[#1a1a1a]/70 backdrop-blur-lg border border-[#2CB67D]/30">
                        <CardContent className="p-6 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-[#FFCD58]">Full Name</Label>
                                <Input id="name" defaultValue="Alex Morgan" className="bg-[#0D0D0D] border-[#7F5AF0] text-white" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email" className="text-[#FFCD58]">Email</Label>
                                <Input id="email" type="email" defaultValue="alex.morgan@acme.com" className="bg-[#0D0D0D] border-[#7F5AF0] text-white" />
                            </div>
                            <Button className="bg-[#2CB67D] hover:bg-[#259a67] text-white">Save Changes</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Security */}
                <TabsContent value="security" className="mt-6 space-y-6">
                    <Card className="bg-[#1a1a1a]/70 backdrop-blur-lg border border-[#FFCD58]/30">
                        <CardContent className="p-6 space-y-4">
                            <h2 className="text-lg font-semibold text-[#7F5AF0]">Change Password</h2>
                            <div className="space-y-2">
                                <Label htmlFor="password" className="text-[#FFCD58]">New Password</Label>
                                <Input id="password" type="password" placeholder="••••••••" className="bg-[#0D0D0D] border-[#7F5AF0] text-white" />
                            </div>
                            <Button className="bg-[#7F5AF0] hover:bg-[#6b47d6] text-white">Update Password</Button>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Activity */}
                <TabsContent value="activity" className="mt-6">
                    <Card className="bg-[#1a1a1a]/70 backdrop-blur-lg border border-[#7F5AF0]/30">
                        <CardContent className="p-6 space-y-4">
                            <h2 className="text-lg font-semibold text-[#2CB67D]">Recent Activity</h2>
                            <ul className="text-sm space-y-2 text-gray-300">
                                <li>🔑 Logged in from Chrome — 2h ago</li>
                                <li>📄 Uploaded report — 1d ago</li>
                                <li>👥 Added new team member — 3d ago</li>
                            </ul>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
