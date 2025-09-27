import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { MessageSquare, Check, X, Pause, Plus } from "lucide-react";
import { toast } from "sonner";
import { getDeals, createDeal, deleteDeal, addNote, getNotes, transitionDeal } from "@/api/dealsApi";

const stages = ["New", "Screening", "Diligence", "IC Ready", "Decided"];
const apiStages = ["NEW", "SCREENING", "DILIGENCE", "IC_READY", "DECIDED"];

export default function Pipeline() {
  const queryClient = useQueryClient();
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [sortPanelOpen, setSortPanelOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [addDealOpen, setAddDealOpen] = useState(false);
  const [newDeal, setNewDeal] = useState({
    title: "",
    companyName: "",
    amount: "",
    sector: "",
    description: "",
    stage: "New"
  });

  // Fetch deals
  const { data: dealsData = [], isLoading, error } = useQuery({
    queryKey: ["deals"],
    queryFn: async () => {
      const deals = await getDeals();
      const dealsWithNotes = await Promise.all(
        deals.map(async (deal) => {
          const notes = await getNotes(deal.id);
          return {
            ...deal,
            comments: notes.map((note) => ({
              id: note.id,
              text: note.content,
              author: note.author,
              timestamp: new Date(note.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit"
              })
            }))
          };
        })
      );
      return dealsWithNotes;
    },
    select: (data) =>
      data.map((deal) => ({
        id: deal.id,
        name: deal.title,
        company: deal.company.name,
        stage: stages[apiStages.indexOf(deal.stage)] || "New",
        score: deal.score || 5.0,
        amount: deal.company.investedAmount
          ? `$${deal.company.investedAmount}M`
          : "$0",
        sector: deal.company.sector || "Other",
        lastUpdate: deal.updatedAt
          ? new Date(deal.updatedAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          })
          : "Just now",
        description: deal.description || "No description available",
        comments: deal.comments || []
      }))
  });

  // Create deal mutation
  const createDealMutation = useMutation({
    mutationFn: async (dealData) => {
      const { title, companyName, stage } = dealData;
      const newDeal = await createDeal({ title, companyName, owner: "You" });
      if (stage !== "New") {
        const apiStage = apiStages[stages.indexOf(stage)];
        await transitionDeal(newDeal.id, apiStage);
      }
      return newDeal;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["deals"]);
      setAddDealOpen(false);
      setNewDeal({
        title: "",
        companyName: "",
        amount: "",
        sector: "",
        description: "",
        stage: "New"
      });
      toast.success("Deal added successfully");
    },
    onError: (error) => {
      toast.error(`Failed to add deal: ${error.message}`);
    }
  });

  // Delete deal mutation
  const deleteDealMutation = useMutation({
    mutationFn: deleteDeal,
    onSuccess: () => {
      queryClient.invalidateQueries(["deals"]);
      toast.success("Deal deleted successfully");
    },
    onError: (error) => {
      toast.error(`Failed to delete deal: ${error.message}`);
    }
  });

  // Transition deal mutation
  const transitionDealMutation = useMutation({
    mutationFn: ({ id, to }) => transitionDeal(id, to),
    onSuccess: () => {
      queryClient.invalidateQueries(["deals"]);
      toast.success("Deal stage updated");
    },
    onError: (error) => {
      toast.error(`Failed to update stage: ${error.message}`);
    }
  });

  // Add note mutation
  const addNoteMutation = useMutation({
    mutationFn: addNote,
    onSuccess: () => {
      queryClient.invalidateQueries(["deals"]);
      toast.success("Comment added successfully");
    },
    onError: (error) => {
      toast.error(`Failed to add comment: ${error.message}`);
    }
  });

  const getScoreColor = (score) => {
    if (score >= 8) return "text-success";
    if (score >= 6) return "text-warning";
    return "text-destructive";
  };

  const getSectorColor = (sector) => {
    const colors = {
      "AI/ML": "bg-primary/10 text-primary border-primary/20",
      CleanTech: "bg-success/10 text-success border-success/20",
      HealthTech: "bg-warning/10 text-warning border-warning/20",
      DevTools: "bg-accent/10 text-accent-foreground border-accent/20",
      Other: "bg-muted text-muted-foreground"
    };
    return colors[sector] || "bg-muted text-muted-foreground";
  };

  const dealsByStage = stages.reduce((acc, stage) => {
    acc[stage] = dealsData.filter((deal) => deal.stage === stage);
    return acc;
  }, {});

  const handleDealAction = (dealId, action) => {
    const newStage =
      action === "accept"
        ? "Screening"
        : action === "reject"
          ? "Decided"
          : "Diligence";
    const apiStage = apiStages[stages.indexOf(newStage)];
    console.log(action, newStage, apiStage);
    transitionDealMutation.mutate({ id: dealId, to: apiStage });
  };

  const addComment = (dealId) => {
    if (!newComment.trim()) return;
    addNoteMutation.mutate({
      dealId,
      content: newComment,
      author: "You"
    });
    setNewComment("");
  };

  const handleAddDeal = () => {
    if (!newDeal.title || !newDeal.companyName) {
      toast.error("Title and company name are required");
      return;
    }
    createDealMutation.mutate({
      title: newDeal.title,
      companyName: newDeal.companyName,
      amount: newDeal.amount,
      sector: newDeal.sector,
      description: newDeal.description,
      stage: newDeal.stage
    });
  };

  if (isLoading) return <div className="text-center text-foreground">Loading deals...</div>;
  if (error) return <div className="text-center text-destructive">Error: {error.message}</div>;

  return (
    <div className="space-y-6 relative">
      {/* Sticky Header */}
      <div className="sticky top-0 z-20 bg-background/95 backdrop-blur-md border-b border-border/50 shadow-sm md:shadow-none md:static">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between px-4 py-3 md:p-0 space-y-3 md:space-y-0 gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Deal Pipeline</h1>
            <p className="text-sm md:text-base text-muted-foreground">
              {dealsData.length} active opportunities • $
              {dealsData
                .reduce(
                  (sum, deal) =>
                    sum +
                    (deal.company.investedAmount
                      ? parseFloat(deal.company.investedAmount)
                      : 0),
                  0
                )
                .toFixed(1)}
              M total deal value
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Sheet open={sortPanelOpen} onOpenChange={setSortPanelOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="lg"
                  className="min-h-[44px] text-base transition-transform hover:scale-105"
                >
                  Sort Panel
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="glass-card border-border/50 w-full sm:w-96"
              >
                <SheetHeader>
                  <SheetTitle className="text-lg">Quick Sort</SheetTitle>
                </SheetHeader>
                <div className="space-y-4 mt-6 px-4 pb-6">
                  {dealsData
                    .filter(
                      (deal) =>
                        deal.stage === "Screening" || deal.stage === "Diligence"
                    )
                    .map((deal) => (
                      <Card key={deal.id} className="glass-card">
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div>
                              <h4 className="font-semibold">{deal.company}</h4>
                              <p className="text-sm text-muted-foreground">
                                {deal.name} • {deal.amount}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              <Progress
                                value={deal.score * 10}
                                className="flex-1 h-2"
                              />
                              <span
                                className={`text-sm font-medium ${getScoreColor(
                                  deal.score
                                )}`}
                              >
                                {deal.score}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                onClick={() => handleDealAction(deal.id, "accept")}
                                className="flex-1 bg-success hover:bg-success/90 text-white min-h-[44px]"
                              >
                                <Check className="h-4 w-4 mr-1" />
                                Accept
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDealAction(deal.id, "hold")}
                                className="flex-1 border-warning text-warning hover:bg-warning/10 min-h-[44px]"
                              >
                                <Pause className="h-4 w-4 mr-1" />
                                Hold
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDealAction(deal.id, "reject")}
                                className="flex-1 border-destructive text-destructive hover:bg-destructive/10 min-h-[44px]"
                              >
                                <X className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </SheetContent>
            </Sheet>
            <Sheet open={addDealOpen} onOpenChange={setAddDealOpen}>
              <SheetTrigger asChild>
                <Button
                  size="lg"
                  className="min-h-[44px] text-base transition-transform hover:scale-105"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  <span className="md:block hidden">Add Deal</span>
                  <span className="md:hidden">Add</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="glass-card border-border/50 w-full sm:w-96"
              >
                <SheetHeader>
                  <SheetTitle className="text-lg">Add New Deal</SheetTitle>
                </SheetHeader>
                <div className="space-y-4 mt-6 px-4 pb-6">
                  <div>
                    <label className="text-sm font-medium text-foreground">
                      Title
                    </label>
                    <Input
                      value={newDeal.title}
                      onChange={(e) =>
                        setNewDeal((prev) => ({
                          ...prev,
                          title: e.target.value
                        }))
                      }
                      placeholder="e.g., Series A"
                      className="mt-1 min-h-[44px] text-base"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">
                      Company Name
                    </label>
                    <Input
                      value={newDeal.companyName}
                      onChange={(e) =>
                        setNewDeal((prev) => ({
                          ...prev,
                          companyName: e.target.value
                        }))
                      }
                      placeholder="e.g., TechFlow AI"
                      className="mt-1 min-h-[44px] text-base"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">
                      Amount
                    </label>
                    <Input
                      value={newDeal.amount}
                      onChange={(e) =>
                        setNewDeal((prev) => ({
                          ...prev,
                          amount: e.target.value
                        }))
                      }
                      placeholder="e.g., $15M"
                      className="mt-1 min-h-[44px] text-base"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">
                      Sector
                    </label>
                    <Select
                      value={newDeal.sector}
                      onValueChange={(value) =>
                        setNewDeal((prev) => ({ ...prev, sector: value }))
                      }
                    >
                      <SelectTrigger className="mt-1 min-h-[44px] text-base">
                        <SelectValue placeholder="Select sector" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AI/ML">AI/ML</SelectItem>
                        <SelectItem value="CleanTech">CleanTech</SelectItem>
                        <SelectItem value="HealthTech">HealthTech</SelectItem>
                        <SelectItem value="DevTools">DevTools</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">
                      Stage
                    </label>
                    <Select
                      value={newDeal.stage}
                      onValueChange={(value) =>
                        setNewDeal((prev) => ({ ...prev, stage: value }))
                      }
                    >
                      <SelectTrigger className="mt-1 min-h-[44px] text-base">
                        <SelectValue placeholder="Select stage" />
                      </SelectTrigger>
                      <SelectContent>
                        {stages.map((stage) => (
                          <SelectItem key={stage} value={stage}>
                            {stage}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">
                      Description
                    </label>
                    <Textarea
                      value={newDeal.description}
                      onChange={(e) =>
                        setNewDeal((prev) => ({
                          ...prev,
                          description: e.target.value
                        }))
                      }
                      placeholder="Describe the deal..."
                      className="mt-1 min-h-[100px] text-base"
                      rows={4}
                    />
                  </div>
                  <Button
                    onClick={handleAddDeal}
                    className="w-full min-h-[44px] text-base transition-transform hover:scale-105"
                    disabled={createDealMutation.isLoading}
                  >
                    {createDealMutation.isLoading ? "Adding..." : "Add Deal"}
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-4 lg:gap-6 overflow-x-auto pb-6">
        {stages.map((stage) => (
          <div key={stage} className="min-w-[280px] sm:min-w-[320px] flex-shrink-0">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-semibold text-foreground">{stage}</h3>
              <Badge variant="secondary" className="text-xs">
                {dealsByStage[stage]?.length || 0}
              </Badge>
            </div>
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
                        <CardTitle className="text-sm font-semibold">
                          {deal.company}
                        </CardTitle>
                        <p className="text-xs text-muted-foreground">
                          {deal.name} • {deal.amount}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteDealMutation.mutate(deal.id);
                        }}
                      >
                        <X className="h-3 w-3 text-destructive" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-xs text-foreground/80 line-clamp-2">
                      {deal.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={getSectorColor(deal.sector)}
                        variant="outline"
                      >
                        {deal.sector}
                      </Badge>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          Score
                        </span>
                        <span
                          className={`text-xs font-medium ${getScoreColor(
                            deal.score
                          )}`}
                        >
                          {deal.score}/10
                        </span>
                      </div>
                      <Progress value={deal.score * 10} className="h-1" />
                    </div>
                    {deal.comments.length > 0 && (
                      <div className="pt-2 border-t border-border/30">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <MessageSquare className="h-3 w-3" />
                          <span>
                            {deal.comments.length} comment
                            {deal.comments.length > 1 ? "s" : ""}
                          </span>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-xs text-muted-foreground">
                        {deal.lastUpdate}
                      </span>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-success hover:bg-success/10"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDealAction(deal.id, "accept");
                          }}
                        >
                          <Check className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-warning hover:bg-warning/10"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDealAction(deal.id, "hold");
                          }}
                        >
                          <Pause className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 w-6 p-0 text-destructive hover:bg-destructive/10"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDealAction(deal.id, "reject");
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {dealsByStage[stage]?.length === 0 && (
                <div className="border-2 border-dashed border-border/50 rounded-lg p-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    No deals in {stage}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Deal Details Panel */}
      {selectedDeal && (
        <Sheet
          open={!!selectedDeal}
          onOpenChange={() => setSelectedDeal(null)}
        >
          <SheetContent
            side="right"
            className="glass-card border-border/50 w-full sm:w-96"
          >
            <SheetHeader>
              <SheetTitle className="text-lg">{selectedDeal.company}</SheetTitle>
            </SheetHeader>
            <div className="space-y-6 mt-6 px-4 pb-6">
              <div>
                <p className="text-sm text-muted-foreground">
                  {selectedDeal.name} • {selectedDeal.amount}
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2">Description</h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedDeal.description}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium mb-1">Score</h3>
                    <div className="space-y-2">
                      <Progress
                        value={selectedDeal.score * 10}
                        className="h-2"
                      />
                      <p
                        className={`text-lg font-bold ${getScoreColor(
                          selectedDeal.score
                        )}`}
                      >
                        {selectedDeal.score}/10
                      </p>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium mb-1">Stage</h3>
                    <Badge variant="outline">{selectedDeal.stage}</Badge>
                  </div>
                </div>
                <div className="space-y-3">
                  <h3 className="text-sm font-medium">Quick Comments</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {selectedDeal.comments.map((comment) => (
                      <div key={comment.id} className="glass-card p-3 text-sm">
                        <p className="text-foreground/90">{comment.text}</p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <span>{comment.author}</span>
                          <span>•</span>
                          <span>{comment.timestamp}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Textarea
                      placeholder="Add a quick comment..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="flex-1 resize-none h-20 text-sm min-h-[44px]"
                    />
                    <Button
                      size="sm"
                      onClick={() => addComment(selectedDeal.id)}
                      disabled={!newComment.trim() || addNoteMutation.isLoading}
                      className="min-h-[44px]"
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-3 gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleDealAction(selectedDeal.id, "accept")}
                      className="bg-success hover:bg-success/90 text-white min-h-[44px]"
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDealAction(selectedDeal.id, "hold")}
                      className="border-warning text-warning hover:bg-warning/10 min-h-[44px]"
                    >
                      <Pause className="h-4 w-4 mr-1" />
                      Hold
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDealAction(selectedDeal.id, "reject")}
                      className="border-destructive text-destructive hover:bg-destructive/10 min-h-[44px]"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      )}
    </div>
  );
}