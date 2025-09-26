import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ZoomIn, ZoomOut, RotateCcw, Search, Users, Building, MessageSquare } from "lucide-react";
import { toast } from "sonner";

const mockNetwork = [
  {
    id: "1",
    name: "Sarah Chen",
    type: "person", 
    title: "Partner",
    company: "Acme Ventures",
    connections: ["2", "3", "5"],
    x: 400,
    y: 300,
    info: {
      email: "s.chen@acmevc.com",
      linkedin: "linkedin.com/in/sarahchen",
      notes: "Strong relationship, co-invested in 3 deals",
      lastContact: "2024-01-15",
      strength: "strong"
    }
  },
  {
    id: "2", 
    name: "TechFlow AI",
    type: "company",
    connections: ["1", "4", "6"],
    x: 600,
    y: 200,
    info: {
      notes: "Portfolio company, Series A",
      lastContact: "2024-01-10", 
      strength: "strong"
    }
  },
  {
    id: "3",
    name: "Michael Rodriguez",
    type: "advisor",
    title: "Former CTO",
    company: "Google",
    connections: ["1", "7", "8"],
    x: 200,
    y: 200,
    info: {
      email: "m.rodriguez@gmail.com",
      notes: "Technical advisor, AI/ML expertise",
      lastContact: "2023-12-20",
      strength: "medium"
    }
  },
  {
    id: "4",
    name: "Lisa Park", 
    type: "person",
    title: "CEO",
    company: "TechFlow AI",
    connections: ["2", "5"],
    x: 700,
    y: 100,
    info: {
      email: "lisa@techflow.ai",
      notes: "Portfolio CEO, monthly check-ins",
      lastContact: "2024-01-18",
      strength: "strong"
    }
  },
  {
    id: "5",
    name: "David Kim",
    type: "investor", 
    title: "GP",
    company: "Growth Capital",
    connections: ["1", "4", "6"],
    x: 500,
    y: 400,
    info: {
      email: "d.kim@growthcap.com",
      notes: "Co-investor, potential syndication partner",
      lastContact: "2024-01-05",
      strength: "medium"
    }
  },
  {
    id: "6",
    name: "Jennifer Wu",
    type: "person",
    title: "Head of BD", 
    company: "Microsoft",
    connections: ["2", "5", "7"],
    x: 650,
    y: 350,
    info: {
      email: "j.wu@microsoft.com",
      notes: "Partnership opportunities, enterprise sales",
      lastContact: "2023-11-30",
      strength: "weak"
    }
  },
  {
    id: "7",
    name: "Robert Johnson",
    type: "advisor",
    title: "Partner",
    company: "McKinsey & Company",
    connections: ["3", "6", "8"],
    x: 300,
    y: 450,
    info: {
      email: "r.johnson@mckinsey.com", 
      notes: "Strategy advisor, board observer",
      lastContact: "2024-01-12",
      strength: "strong"
    }
  },
  {
    id: "8", 
    name: "Innovation Labs",
    type: "company",
    connections: ["3", "7"],
    x: 150,
    y: 350,
    info: {
      notes: "Corporate venture arm, potential LP",
      lastContact: "2023-12-15",
      strength: "weak"
    }
  }
];

export default function Network() {
  const svgRef = useRef(null);
  const [nodes] = useState(mockNetwork);
  const [selectedNode, setSelectedNode] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const filteredNodes = nodes.filter(node => {
    const matchesSearch = node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (node.title && node.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (node.company && node.company.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = filterType === "all" || node.type === filterType;
    return matchesSearch && matchesType;
  });

  const getNodeColor = (type, strength) => {
    const typeColors = {
      person: "hsl(var(--primary))",
      company: "hsl(var(--success))", 
      investor: "hsl(var(--warning))",
      advisor: "hsl(var(--accent-foreground))"
    };

    const strengthMap = {
      strong: 1,
      medium: 0.7,
      weak: 0.4
    };

    const opacity = strength ? strengthMap[strength] : 1;
    return typeColors[type] || "hsl(var(--muted-foreground))";
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'person': return <Users className="w-4 h-4" />;
      case 'company': return <Building className="w-4 h-4" />;
      case 'investor': return <ZoomIn className="w-4 h-4" />;
      case 'advisor': return <MessageSquare className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => setZoom(prev => Math.min(prev * 1.2, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev / 1.2, 0.3));
  const handleResetView = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleNodeClick = (node) => {
    setSelectedNode(node);
    toast.info(`Selected ${node.name}`);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedNode(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">Network</h1>
          <p className="text-muted-foreground mt-1">People & Connections Graph</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Network Visualization */}
        <div className="lg:col-span-3">
          <Card className="glass-card border-border/50 h-[600px]">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle>Network Graph</CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={handleZoomOut}>
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleZoomIn}>
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleResetView}>
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0 h-[500px] overflow-hidden">
              <svg
                ref={svgRef}
                width="100%"
                height="100%"
                className="cursor-grab active:cursor-grabbing"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
                  {/* Render connections */}
                  {filteredNodes.map(node => 
                    node.connections.map(connId => {
                      const connectedNode = nodes.find(n => n.id === connId);
                      if (!connectedNode || !filteredNodes.find(n => n.id === connId)) return null;
                      
                      return (
                        <line
                          key={`${node.id}-${connId}`}
                          x1={node.x}
                          y1={node.y}
                          x2={connectedNode.x}
                          y2={connectedNode.y}
                          stroke="hsl(var(--border))"
                          strokeWidth="1"
                          opacity="0.6"
                        />
                      );
                    })
                  )}

                  {/* Render nodes */}
                  {filteredNodes.map(node => (
                    <g key={node.id}>
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r="20"
                        fill={getNodeColor(node.type, node.info.strength)}
                        stroke="hsl(var(--border))"
                        strokeWidth="2"
                        className="cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => handleNodeClick(node)}
                      />
                      <text
                        x={node.x}
                        y={node.y + 35}
                        textAnchor="middle"
                        className="fill-foreground text-xs font-medium pointer-events-none"
                      >
                        {node.name.length > 12 ? `${node.name.slice(0, 12)}...` : node.name}
                      </text>
                    </g>
                  ))}
                </g>
              </svg>
            </CardContent>
          </Card>
        </div>

        {/* Controls & Details */}
        <div className="space-y-4">
          {/* Search & Filter */}
          <Card className="glass-card border-border/50">
            <CardHeader>
              <CardTitle className="text-base">Search & Filter</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search network..."
                  className="pl-10"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="person">People</SelectItem>
                  <SelectItem value="company">Companies</SelectItem>
                  <SelectItem value="investor">Investors</SelectItem>
                  <SelectItem value="advisor">Advisors</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Network Stats */}
          <Card className="glass-card border-border/50">
            <CardHeader>
              <CardTitle className="text-base">Network Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Nodes:</span>
                <span className="font-medium text-foreground">{nodes.length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">People:</span>
                <span className="font-medium text-foreground">{nodes.filter(n => n.type === 'person').length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Companies:</span>
                <span className="font-medium text-foreground">{nodes.filter(n => n.type === 'company').length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Investors:</span>
                <span className="font-medium text-foreground">{nodes.filter(n => n.type === 'investor').length}</span>
              </div>
            </CardContent>
          </Card>

          {/* Selected Node Details */}
          {selectedNode && (
            <Card className="glass-card border-border/50">
              <CardHeader>
                <div className="flex items-center gap-2">
                  {getTypeIcon(selectedNode.type)}
                  <CardTitle className="text-base">{selectedNode.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className={`${getNodeColor(selectedNode.type)} text-white`}>
                    {selectedNode.type}
                  </Badge>
                  <Badge variant="outline" className={
                    selectedNode.info.strength === 'strong' ? 'text-success' :
                    selectedNode.info.strength === 'medium' ? 'text-warning' : 'text-muted-foreground'
                  }>
                    {selectedNode.info.strength}
                  </Badge>
                </div>
                
                {selectedNode.title && (
                  <div>
                    <span className="text-sm font-medium text-foreground">{selectedNode.title}</span>
                    {selectedNode.company && (
                      <p className="text-sm text-muted-foreground">at {selectedNode.company}</p>
                    )}
                  </div>
                )}

                {selectedNode.info.email && (
                  <div>
                    <span className="text-xs text-muted-foreground">Email:</span>
                    <p className="text-sm text-foreground break-all">{selectedNode.info.email}</p>
                  </div>
                )}

                {selectedNode.info.notes && (
                  <div>
                    <span className="text-xs text-muted-foreground">Notes:</span>
                    <p className="text-sm text-foreground">{selectedNode.info.notes}</p>
                  </div>
                )}

                {selectedNode.info.lastContact && (
                  <div>
                    <span className="text-xs text-muted-foreground">Last Contact:</span>
                    <p className="text-sm text-foreground">{selectedNode.info.lastContact}</p>
                  </div>
                )}

                <div>
                  <span className="text-xs text-muted-foreground">Connections:</span>
                  <p className="text-sm text-foreground">{selectedNode.connections.length} people</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}