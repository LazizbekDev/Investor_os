import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { MoreHorizontal, ThumbsUp, ThumbsDown, Clock, Building, TrendingUp } from "lucide-react";

const stages = ["New", "Screening", "Diligence", "IC Ready", "Decided"];

const deals = [
  {
    id: "1",
    name: "Series A",
    company: "TechFlow AI",
    stage: "IC Ready",
    score: 8.5,
    amount: "$15M",
    sector: "AI/ML",
    lastUpdate: "2h ago",
    description: "AI-powered workflow automation platform with strong product-market fit"
  },
  {
    id: "2", 
    name: "Seed",
    company: "EcoStart",
    stage: "Diligence",
    score: 7.2,
    amount: "$3M",
    sector: "CleanTech",
    lastUpdate: "1d ago",
    description: "Sustainable packaging solutions for e-commerce companies"
  },
  {
    id: "3",
    name: "Series B",
    company: "HealthLink",
    stage: "Screening",
    score: 6.8,
    amount: "$25M",
    sector: "HealthTech",
    lastUpdate: "3d ago", 
    description: "Telemedicine platform connecting patients with specialized care"
  },
  {
    id: "4",
    name: "Pre-Seed",
    company: "DevTools Pro",
    stage: "New",
    score: 5.5,
    amount: "$1.5M",
    sector: "DevTools",
    lastUpdate: "1w ago",
    description: "Developer productivity tools for remote teams"
  }
];

export default function Pipeline() {
  const [selectedDeal, setSelectedDeal] = useState(null);

  const getScoreColor = (score) => {
    if (score >= 8) return "text-success";
    if (score >= 6) return "text-warning";  
    return "text-destructive";
  };

  const getSectorColor = (sector) => {
    const colors = {
      "AI/ML": "bg-primary/10 text-primary border-primary/20",
      "CleanTech": "bg-success/10 text-success border-success/20",
      "HealthTech": "bg-warning/10 text-warning border-warning/20",
      "DevTools": "bg-accent/10 text-accent-foreground border-accent/20"
    };
    return colors[sector] || "bg-muted text-muted-foreground";
  };

  const dealsByStage = stages.reduce((acc, stage) => {
    acc[stage] = deals.filter(deal => deal.stage === stage);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Deal Pipeline</h1>
          <p className="text-muted-foreground">
            {deals.length} active opportunities • $44.5M total deal value
          </p>
        </div>
        <Button>
          <span className="mr-2">+</span>
          Add Deal
        </Button>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-6 overflow-x-auto pb-6">
        {stages.map((stage) => (
          <div key={stage} className="min-w-[300px] flex-shrink-0">
            {/* Stage Header */}
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-foreground">{stage}</h3>
              <Badge variant="secondary" className="text-xs">
                {dealsByStage[stage]?.length || 0}
              </Badge>
            </div>

            {/* Deals in Stage */}
            <div className="space-y-3">
              {dealsByStage[stage]?.map((deal) => (
                <Card 
                  key={deal.id} 
                  className="glass-card cursor-pointer hover:border-primary/30 transition-all duration-200"
                  onClick={() => setSelectedDeal(deal)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-sm font-semibold">{deal.company}</CardTitle>
                        <p className="text-xs text-muted-foreground">{deal.name} • {deal.amount}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-3">
                    <p className="text-xs text-foreground/80 line-clamp-2">
                      {deal.description}
                    </p>

                    <div className="flex items-center gap-2">
                      <Badge className={getSectorColor(deal.sector)} variant="outline">
                        {deal.sector}
                      </Badge>
                    </div>

                    {/* Score Progress */}
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">Score</span>
                        <span className={`text-xs font-medium ${getScoreColor(deal.score)}`}>
                          {deal.score}/10
                        </span>
                      </div>
                      <Progress value={deal.score * 10} className="h-1" />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-muted-foreground">{deal.lastUpdate}</span>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-success hover:bg-success/10">
                          <ThumbsUp className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-warning hover:bg-warning/10">
                          <Clock className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-destructive hover:bg-destructive/10">
                          <ThumbsDown className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Add Deal Button */}
              {dealsByStage[stage]?.length === 0 && (
                <div className="border-2 border-dashed border-border/50 rounded-lg p-6 text-center">
                  <p className="text-sm text-muted-foreground">No deals in {stage}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Deal Details Panel (if selected) */}
      {selectedDeal && (
        <div className="fixed inset-y-0 right-0 w-96 glass-sidebar border-l border-border/50 p-6 overflow-y-auto">
          <div className="space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold">{selectedDeal.company}</h2>
                <p className="text-sm text-muted-foreground">{selectedDeal.name} • {selectedDeal.amount}</p>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSelectedDeal(null)}
              >
                ✕
              </Button>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Description</h3>
                <p className="text-sm text-muted-foreground">{selectedDeal.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">Score</h3>
                  <p className={`text-lg font-bold ${getScoreColor(selectedDeal.score)}`}>
                    {selectedDeal.score}/10
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Stage</h3>
                  <Badge variant="outline">{selectedDeal.stage}</Badge>
                </div>
              </div>

              <div className="space-y-2">
                <Button className="w-full">Schedule Meeting</Button>
                <Button variant="outline" className="w-full">Add to IC</Button>
                <Button variant="outline" className="w-full">
                  <Building className="h-4 w-4 mr-2" />
                  Company Profile
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}