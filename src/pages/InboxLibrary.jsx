import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Bell, 
  CheckSquare, 
  Tag, 
  Search, 
  Filter, 
  Clock, 
  User, 
  Building, 
  TrendingUp, 
  FileText, 
  ExternalLink,
  Archive,
  Star,
  Eye
} from "lucide-react";



const mockFeedItems = [
  {
    id: '1',
    type: 'task',
    title: 'Review TechFlow AI Series A Term Sheet',
    description: 'Due diligence documents received, requires immediate review before partner meeting.',
    timestamp: '2h ago',
    priority: 'high',
    tags: ['Due Diligence', 'Term Sheet', 'AI/ML'],
    isRead: false,
    previewData: {
      summary: 'Series A round for $15M with strong revenue growth and technical moat.',
      metrics: { 'Valuation': '$60M', 'Revenue': '$3.2M ARR', 'Growth': '180% YoY' }
    }
  },
  {
    id: '2',
    type: 'notification',
    title: 'IC Meeting Scheduled',
    description: 'Investment Committee meeting for EcoStart scheduled for tomorrow 2 PM.',
    timestamp: '4h ago',
    priority: 'medium',
    tags: ['IC Meeting', 'CleanTech'],
    isRead: false,
    source: 'Calendar'
  },
  {
    id: '3',
    type: 'news',
    title: 'AI Startup Funding Surges 40% in Q4',
    description: 'Industry report shows significant increase in AI startup investments.',
    timestamp: '6h ago',
    priority: 'low',
    tags: ['Market Intelligence', 'AI/ML', 'Industry'],
    isRead: true,
    source: 'TechCrunch',
    previewData: {
      image: 'https://via.placeholder.com/400x200/7F5AF0/ffffff?text=AI+Funding+Report',
      summary: 'Q4 2024 sees record $12.5B invested in AI startups, with particular strength in enterprise AI solutions.'
    }
  },
  {
    id: '4',
    type: 'asset',
    title: 'HealthLink Competitive Analysis Updated',
    description: 'Market analysis document with new competitor data and positioning insights.',
    timestamp: '1d ago',
    priority: 'medium',
    tags: ['Competitive Analysis', 'HealthTech', 'Market Research'],
    isRead: false,
    previewData: {
      summary: 'Updated competitive landscape shows 3 new direct competitors with $50M+ funding.',
      metrics: { 'Market Size': '$15.6B', 'Competitors': '12', 'Market Share': '8.5%' }
    }
  },
  {
    id: '5',
    type: 'task',
    title: 'Portfolio Company Check-in',
    description: 'Monthly review call with DevTools Pro leadership team.',
    timestamp: '2d ago',
    priority: 'medium',
    tags: ['Portfolio', 'DevTools', 'Check-in'],
    isRead: true
  }
];

export default function InboxLibrary() {
  const [feedItems, setFeedItems] = useState(mockFeedItems);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [activeTab, setActiveTab] = useState("all");

  const allTags = Array.from(new Set(feedItems.flatMap(item => item.tags)));

  const filteredItems = feedItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => item.tags.includes(tag));
    const matchesTab = activeTab === 'all' || item.type === activeTab;
    return matchesSearch && matchesTags && matchesTab;
  });

  const markAsRead = (id) => {
    setFeedItems(prev => prev.map(item => 
      item.id === id ? { ...item, isRead: true } : item
    ));
  };

  const toggleTag = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-destructive bg-destructive/5';
      case 'medium': return 'border-l-warning bg-warning/5';
      case 'low': return 'border-l-success bg-success/5';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'task': return CheckSquare;
      case 'notification': return Bell;
      case 'news': return FileText;
      case 'asset': return Building;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Inbox & Library</h1>
          <p className="text-muted-foreground">
            {feedItems.filter(item => !item.isRead).length} unread items • {feedItems.length} total
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Archive className="h-4 w-4 mr-2" />
            Archive All Read
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      {/* Search and Tags */}
      <Card className="glass-card">
        <CardContent className="p-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tasks, notifications, news..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <Button
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleTag(tag)}
                className="h-7 text-xs"
              >
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Feed Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-5 glass-card">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="task">Tasks</TabsTrigger>
          <TabsTrigger value="notification">Alerts</TabsTrigger>
          <TabsTrigger value="news">News</TabsTrigger>
          <TabsTrigger value="asset">Assets</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4 mt-6">
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-3">
              {filteredItems.map((item) => {
                const TypeIcon = getTypeIcon(item.type);
                return (
                  <Card 
                    key={item.id} 
                    className={`glass-card border-l-4 cursor-pointer hover:border-primary/30 transition-all duration-200 ${getPriorityColor(item.priority)} ${!item.isRead ? 'bg-primary/5' : ''}`}
                    onClick={() => {
                      setSelectedItem(item);
                      markAsRead(item.id);
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          <TypeIcon className="h-4 w-4 text-muted-foreground" />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className={`font-semibold text-sm ${!item.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {item.title}
                            </h3>
                            <div className="flex items-center gap-2 flex-shrink-0">
                              {!item.isRead && (
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                              )}
                              <span className="text-xs text-muted-foreground">
                                {item.timestamp}
                              </span>
                            </div>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {item.description}
                          </p>
                          
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex flex-wrap gap-1">
                              {item.tags.slice(0, 3).map(tag => (
                                <Badge key={tag} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              {item.tags.length > 3 && (
                                <Badge variant="outline" className="text-xs">
                                  +{item.tags.length - 3}
                                </Badge>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-1">
                              {item.source && (
                                <Badge variant="secondary" className="text-xs">
                                  {item.source}
                                </Badge>
                              )}
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <Eye className="h-3 w-3" />
                              </Button>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <Star className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>

      {/* Preview Modal */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="glass-card max-w-2xl max-h-[80vh] overflow-hidden">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {(() => {
                    const TypeIcon = getTypeIcon(selectedItem.type);
                    return <TypeIcon className="h-5 w-5" />;
                  })()}
                  {selectedItem.title}
                </DialogTitle>
              </DialogHeader>
              
              <ScrollArea className="max-h-[60vh] pr-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {selectedItem.timestamp}
                    {selectedItem.source && (
                      <>
                        <span>•</span>
                        <span>from {selectedItem.source}</span>
                      </>
                    )}
                  </div>
                  
                  <p className="text-foreground/90">{selectedItem.description}</p>
                  
                  {selectedItem.previewData?.image && (
                    <img 
                      src={selectedItem.previewData.image} 
                      alt="Preview" 
                      className="w-full rounded-lg"
                    />
                  )}
                  
                  {selectedItem.previewData?.summary && (
                    <Card className="glass-card">
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">Summary</h4>
                        <p className="text-sm text-muted-foreground">
                          {selectedItem.previewData.summary}
                        </p>
                      </CardContent>
                    </Card>
                  )}
                  
                  {selectedItem.previewData?.metrics && (
                    <Card className="glass-card">
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-3">Key Metrics</h4>
                        <div className="grid grid-cols-2 gap-4">
                          {Object.entries(selectedItem.previewData.metrics).map(([key, value]) => (
                            <div key={key} className="text-center">
                              <p className="text-2xl font-bold text-primary">{value}</p>
                              <p className="text-xs text-muted-foreground">{key}</p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                  
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.tags.map(tag => (
                      <Badge key={tag} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </ScrollArea>
              
              <div className="flex items-center gap-2 pt-4 border-t">
                <Button className="flex-1">
                  Take Action
                </Button>
                <Button variant="outline">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open
                </Button>
                <Button variant="outline">
                  <Star className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}