import { useState } from "react";
import { Eye, EyeOff, ArrowRight, Shield, Zap, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../hooks/use-auth";

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isLogin, setIsLogin] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const email = formData.get("email");
        const password = formData.get("password");

        if (!email || !password) {
            toast.error("Please enter email and password");
            return;
        }
        login();
        navigate("/");
    };

    const features = [
        { icon: Shield, title: "Secure by Design", description: "Bank-grade encryption and SOC 2 compliance" },
        { icon: Zap, title: "Lightning Fast", description: "Real-time data sync and instant updates" },
        { icon: Users, title: "Team Collaboration", description: "Built for investment teams and stakeholders" }
    ];

    return (
        <div className="min-h-screen bg-background flex flex-col lg:flex-row">
            {/* Login Section */}
            <div className="flex-1 flex items-center justify-center p-6 sm:p-8">
                <div className="w-full max-w-md space-y-8">
                    {/* Logo & Header */}
                    <div className="text-center">
                        <div className="mx-auto w-12 h-12 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center mb-4">
                            <div className="w-6 h-6 bg-primary rounded-md"></div>
                        </div>
                        <h1 className="text-2xl font-semibold text-foreground">Welcome to InvestorOS</h1>
                        <p className="text-muted-foreground mt-2">
                            {isLogin ? "Sign in to your account" : "Create your account"}
                        </p>
                    </div>

                    {/* Login Form */}
                    <Card className="glass-card shadow-lg">
                        <CardContent className="p-6 sm:p-8">
                            <form className="space-y-4" onSubmit={handleSubmit}>
                                {!isLogin && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">First Name</Label>
                                            <Input id="firstName" placeholder="Sarah" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Last Name</Label>
                                            <Input id="lastName" placeholder="Chen" />
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input id="email" type="email" name="email" placeholder="sarah@venture.co" />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password">Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            placeholder="••••••••"
                                            className="pr-10"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                        >
                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </button>
                                    </div>
                                </div>

                                {!isLogin && (
                                    <div className="space-y-2">
                                        <Label htmlFor="organization">Organization</Label>
                                        <Input id="organization" placeholder="Venture Capital Partners" />
                                    </div>
                                )}

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="remember" />
                                        <Label htmlFor="remember" className="text-sm">Remember me</Label>
                                    </div>
                                    {isLogin && (
                                        <button type="button" className="text-sm text-primary hover:text-primary/80">
                                            Forgot password?
                                        </button>
                                    )}
                                </div>

                                <Button className="w-full group" size="lg" type="submit">
                                    {isLogin ? "Sign In" : "Create Account"}
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </form>

                            <div className="mt-6 pt-6 border-t border-border/50 text-center">
                                <p className="text-sm text-muted-foreground">
                                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                                    <button
                                        onClick={() => setIsLogin(!isLogin)}
                                        className="text-primary hover:text-primary/80 font-medium"
                                    >
                                        {isLogin ? "Sign up" : "Sign in"}
                                    </button>
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Feature Section */}
            <div className="flex-1 bg-card/30 backdrop-blur-xl border-t lg:border-t-0 lg:border-l border-border/50">
                <div className="flex items-center justify-center p-6 sm:p-12">
                    <div className="max-w-lg space-y-8 text-center lg:text-left">
                        <div>
                            <h2 className="text-2xl sm:text-3xl font-semibold mb-4">The Modern Investment Platform</h2>
                            <p className="text-base sm:text-lg text-muted-foreground">
                                Streamline your investment workflow with our comprehensive workspace designed for VCs, PE firms, and investment teams.
                            </p>
                        </div>

                        <div className="space-y-6">
                            {features.map((feature, index) => {
                                const Icon = feature.icon;
                                return (
                                    <div key={index} className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
                                        <div className="flex-shrink-0 w-12 h-12 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center">
                                            <Icon className="h-5 w-5 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-foreground mb-1">{feature.title}</h3>
                                            <p className="text-sm text-muted-foreground">{feature.description}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="pt-6 border-t border-border/50">
                            <div className="flex justify-center lg:justify-start items-center gap-2 text-sm text-muted-foreground">
                                <div className="flex -space-x-2">
                                    <div className="w-8 h-8 bg-primary/20 border border-primary/30 rounded-full"></div>
                                    <div className="w-8 h-8 bg-success/20 border border-success/30 rounded-full"></div>
                                    <div className="w-8 h-8 bg-warning/20 border border-warning/30 rounded-full"></div>
                                </div>
                                <span>Trusted by 200+ investment teams</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
