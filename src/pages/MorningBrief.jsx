import { TrendingUp, AlertTriangle, CheckCircle, Calendar, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function MorningBrief() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const priorities = [
    {
      id: 1,
      title: "TechFlow AI Series A Decision",
      type: "Deal Review",
      score: 8.5,
      status: "urgent",
      dueBy: "2:00 PM Today",
      description: "Final IC meeting for $15M Series A. Strong metrics, 3x YoY growth."
    },
    {
      id: 2,
      title: "Portfolio Review: DataSync",
      type: "Portfolio",
      score: 6.2,
      status: "attention",
      dueBy: "End of Week",
      description: "Monthly check-in. Revenue growth slowing, discussing runway."
    },
    {
      id: 3,
      title: "LP Report Q4 2024",
      type: "Fund Operations",
      score: 7.8,
      status: "normal",
      dueBy: "Next Monday",
      description: "Quarterly report preparation. Strong portfolio performance to highlight."
    }
  ];

  const runwayAlerts = [
    { company: "StartupX", months: 8, trend: "stable" },
    { company: "InnovCorp", months: 4, trend: "declining" },
    { company: "TechFlow", months: 18, trend: "improving" }
  ];

  const topTasks = [
    { id: 1, task: "Review TechFlow AI financials", completed: false },
    { id: 2, task: "Schedule call with DataSync CEO", completed: false },
    { id: 3, task: "Prepare LP presentation slides", completed: true }
  ];

  const getScoreColor = (score) => {
    if (score >= 8) return "text-success";
    if (score >= 6) return "text-warning";
    return "text-destructive";
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "urgent":
        return <Badge variant="destructive">Urgent</Badge>;
      case "attention":
        return <Badge className="bg-warning/10 text-warning border-warning/20">Needs Attention</Badge>;
      default:
        return <Badge variant="secondary">Normal</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Good morning, Alex</h1>
          <p className="text-muted-foreground">{today}</p>
        </div>
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">3 meetings today</span>
        </div>
      </div>

      {/* Priority Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {priorities.map((item) => (
          <Card key={item.id} className="glass-card border-l-4 border-l-primary">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-semibold">{item.title}</CardTitle>
                {getStatusBadge(item.status)}
              </div>
              <p className="text-xs text-muted-foreground">{item.type}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-foreground/80">{item.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  <span className={`text-sm font-medium ${getScoreColor(item.score)}`}>
                    {item.score}/10
                  </span>
                </div>
                <span className="text-xs text-muted-foreground">{item.dueBy}</span>
              </div>

              <Button 
                size="sm" 
                className="w-full mt-3"
                variant={item.status === 'urgent' ? 'default' : 'outline'}
              >
                {item.status === 'urgent' ? 'Review Now' : 'View Details'}
                <ArrowRight className="h-3 w-3 ml-2" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dashboard Grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Runway Alerts */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-warning" />
              Portfolio Runway Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {runwayAlerts.map((alert, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-accent/20">
                  <div>
                    <p className="font-medium text-sm">{alert.company}</p>
                    <p className="text-xs text-muted-foreground">
                      {alert.months} months remaining
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full ${
                      alert.months <= 6 ? 'bg-destructive' : 
                      alert.months <= 12 ? 'bg-warning' : 'bg-success'
                    }`} />
                    <span className="text-xs text-muted-foreground capitalize">
                      {alert.trend}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Tasks */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              Top 3 Tasks
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topTasks.map((task) => (
                <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg bg-accent/20">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    className="h-4 w-4 rounded border-border"
                    readOnly
                  />
                  <span className={`text-sm ${
                    task.completed ? 'text-muted-foreground line-through' : 'text-foreground'
                  }`}>
                    {task.task}
                  </span>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4">
              View All Tasks
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}