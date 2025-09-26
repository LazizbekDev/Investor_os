import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { FileText, Link2, Quote, Download, Plus, Edit3 } from "lucide-react";
import { toast } from "sonner";

const mockEvidence = [
    {
        id: "1",
        title: "Market Size Analysis",
        type: "document",
        content: "TAM estimated at $2.4B globally with 15% CAGR through 2028...",
        source: "PwC Industry Report 2024",
        citation: "PwC. (2024). Global Market Analysis Report. Retrieved from pwc.com",
        tags: ["market-size", "tam", "growth"],
        createdAt: "2024-01-15"
    },
    {
        id: "2",
        title: "Competitive Landscape",
        type: "link",
        content: "Key competitors identified: CompanyA (40% market share), CompanyB (25%)...",
        source: "https://techcrunch.com/competitive-analysis",
        citation: "TechCrunch. (2024). Competitive Analysis in SaaS. TechCrunch Media.",
        tags: ["competition", "market-share"],
        createdAt: "2024-01-16"
    },
    {
        id: "3",
        title: "Management Interview Notes",
        type: "note",
        content: "CEO has 15 years experience, strong technical background. CFO previously at unicorn startup...",
        citation: "Personal interview conducted on Jan 18, 2024",
        tags: ["management", "team", "experience"],
        createdAt: "2024-01-18"
    }
];

export default function Diligence() {
    const [evidence, setEvidence] = useState(mockEvidence);
    const [selectedEvidence, setSelectedEvidence] = useState(null);
    const [memoContent, setMemoContent] = useState("");
    const [newEvidence, setNewEvidence] = useState({ title: "", content: "", source: "", tags: "" });

    const handleAddEvidence = () => {
        if (!newEvidence.title || !newEvidence.content) return;

        const evidence = {
            id: Date.now().toString(),
            title: newEvidence.title,
            type: newEvidence.source.startsWith('http') ? 'link' : 'note',
            content: newEvidence.content,
            source: newEvidence.source || undefined,
            citation: newEvidence.source || `Internal note created on ${new Date().toLocaleDateString()}`,
            tags: newEvidence.tags.split(',').map(t => t.trim()).filter(Boolean),
            createdAt: new Date().toISOString().split('T')[0]
        };

        setEvidence(prev => [evidence, ...prev]);
        setNewEvidence({ title: "", content: "", source: "", tags: "" });
        toast.success("Evidence added successfully");
    };

    const handleExportMemo = () => {
        const memo = `
# Investment Memo

Generated on: ${new Date().toLocaleDateString()}

## Executive Summary
${memoContent || "Add your executive summary here..."}

## Supporting Evidence

${evidence.map(item => `
### ${item.title}
**Type:** ${item.type.charAt(0).toUpperCase() + item.type.slice(1)}  
**Source:** ${item.citation}  
**Tags:** ${item.tags.join(', ')}

${item.content}

---
`).join('')}

## Conclusion
[Add your investment decision and rationale here]
`;

        const blob = new Blob([memo], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `investment-memo-${new Date().toISOString().split('T')[0]}.md`;
        a.click();
        URL.revokeObjectURL(url);

        toast.success("Memo exported successfully");
    };

    const getTypeIcon = (type) => {
        switch (type) {
            case 'link': return <Link2 className="w-4 h-4" />;
            case 'document': return <FileText className="w-4 h-4" />;
            default: return <Edit3 className="w-4 h-4" />;
        }
    };

    const getTypeColor = (type) => {
        switch (type) {
            case 'link': return 'bg-primary/10 text-primary';
            case 'document': return 'bg-success/10 text-success';
            default: return 'bg-warning/10 text-warning';
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-semibold text-foreground">
                        Due Diligence
                    </h1>
                    <p className="text-sm sm:text-base text-muted-foreground mt-1">
                        Evidence → Memo
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="sm">
                                <Plus className="w-4 h-4 mr-2" />
                                Add Evidence
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="glass-card border-border/50">
                            <SheetHeader>
                                <SheetTitle>Add New Evidence</SheetTitle>
                            </SheetHeader>
                            <div className="space-y-4 mt-6">
                                <div>
                                    <label className="text-sm font-medium text-foreground">Title</label>
                                    <Input
                                        value={newEvidence.title}
                                        onChange={(e) => setNewEvidence(prev => ({ ...prev, title: e.target.value }))}
                                        placeholder="Evidence title"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-foreground">Content</label>
                                    <Textarea
                                        value={newEvidence.content}
                                        onChange={(e) => setNewEvidence(prev => ({ ...prev, content: e.target.value }))}
                                        placeholder="Evidence content or summary"
                                        className="mt-1"
                                        rows={4}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-foreground">Source (optional)</label>
                                    <Input
                                        value={newEvidence.source}
                                        onChange={(e) => setNewEvidence(prev => ({ ...prev, source: e.target.value }))}
                                        placeholder="URL or source reference"
                                        className="mt-1"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-foreground">Tags</label>
                                    <Input
                                        value={newEvidence.tags}
                                        onChange={(e) => setNewEvidence(prev => ({ ...prev, tags: e.target.value }))}
                                        placeholder="tag1, tag2, tag3"
                                        className="mt-1"
                                    />
                                </div>
                                <Button onClick={handleAddEvidence} className="w-full">
                                    Add Evidence
                                </Button>
                            </div>
                        </SheetContent>
                    </Sheet>
                    <Button onClick={handleExportMemo} size="sm" className="justify-center">
                        <Download className="w-4 h-4 mr-2" />
                        Export Memo
                    </Button>
                </div>
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Evidence List */}
                <div className="lg:col-span-2 space-y-4">
                    <Card className="glass-card border-border/50">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Quote className="w-5 h-5" />
                                Evidence Collection
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {evidence.map((item) => (
                                <div
                                    key={item.id}
                                    className="p-4 rounded-lg border border-border/30 hover:border-border/60 transition-all cursor-pointer interactive-hover"
                                    onClick={() => setSelectedEvidence(item)}
                                >
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-2">
                                            <Badge variant="secondary" className={getTypeColor(item.type)}>
                                                {getTypeIcon(item.type)}
                                                <span className="ml-1">{item.type}</span>
                                            </Badge>
                                            <span className="text-sm text-muted-foreground">{item.createdAt}</span>
                                        </div>
                                    </div>
                                    <h4 className="font-medium text-foreground mb-2">{item.title}</h4>
                                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.content}</p>
                                    <div className="flex flex-wrap gap-1">
                                        {item.tags.map((tag) => (
                                            <Badge key={tag} variant="outline" className="text-xs">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Memo Draft */}
                <div className="space-y-4">
                    <Card className="glass-card border-border/50">
                        <CardHeader>
                            <CardTitle>Memo Draft</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Textarea
                                value={memoContent}
                                onChange={(e) => setMemoContent(e.target.value)}
                                placeholder="Start writing your investment memo summary..."
                                className="min-h-[300px] resize-none"
                            />
                        </CardContent>
                    </Card>

                    {/* Evidence Detail Sheet */}
                    {selectedEvidence && (
                        <Sheet open={!!selectedEvidence} onOpenChange={() => setSelectedEvidence(null)}>
                            <SheetContent className="glass-card border-border/50">
                                <SheetHeader>
                                    <SheetTitle>{selectedEvidence.title}</SheetTitle>
                                </SheetHeader>
                                <div className="space-y-4 mt-6">
                                    <div className="flex items-center gap-2">
                                        <Badge variant="secondary" className={getTypeColor(selectedEvidence.type)}>
                                            {getTypeIcon(selectedEvidence.type)}
                                            <span className="ml-1">{selectedEvidence.type}</span>
                                        </Badge>
                                        <span className="text-sm text-muted-foreground">{selectedEvidence.createdAt}</span>
                                    </div>

                                    <Separator />

                                    <div>
                                        <h4 className="font-medium text-foreground mb-2">Content</h4>
                                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">{selectedEvidence.content}</p>
                                    </div>

                                    <Separator />

                                    <div>
                                        <h4 className="font-medium text-foreground mb-2">Citation</h4>
                                        <p className="text-sm text-muted-foreground italic bg-muted/30 p-3 rounded border border-border/30">
                                            {selectedEvidence.citation}
                                        </p>
                                    </div>

                                    {selectedEvidence.source && (
                                        <>
                                            <Separator />
                                            <div>
                                                <h4 className="font-medium text-foreground mb-2">Source</h4>
                                                <p className="text-sm text-primary break-all">
                                                    <a href={selectedEvidence.source} target="_blank">{selectedEvidence.source}</a>
                                                </p>
                                            </div>
                                        </>
                                    )}

                                    <Separator />

                                    <div>
                                        <h4 className="font-medium text-foreground mb-2">Tags</h4>
                                        <div className="flex flex-wrap gap-1">
                                            {selectedEvidence.tags.map((tag) => (
                                                <Badge key={tag} variant="outline" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    )}
                </div>
            </div>
        </div>
    );
}