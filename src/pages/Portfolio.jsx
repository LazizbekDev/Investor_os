import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Download, TrendingUp, TrendingDown, DollarSign, Target, Calendar } from "lucide-react";
import { toast } from "sonner";

const mockAssets = [
    {
        id: "1",
        company: "TechFlow AI",
        sector: "AI/ML",
        stage: "Series A",
        investmentDate: "2022-03-15",
        initialInvestment: 2500000,
        currentValue: 4200000,
        ownership: 8.5,
        status: "active",
        lastValuation: "2024-01-15",
        irr: 35.2,
        multiple: 1.68
    },
    {
        id: "2",
        company: "GreenEnergy Solutions",
        sector: "CleanTech",
        stage: "Series B",
        investmentDate: "2021-08-20",
        initialInvestment: 5000000,
        currentValue: 12000000,
        ownership: 12.3,
        status: "active",
        lastValuation: "2023-12-30",
        irr: 42.1,
        multiple: 2.4
    },
    {
        id: "3",
        company: "HealthTech Pro",
        sector: "HealthTech",
        stage: "Seed",
        investmentDate: "2023-01-10",
        initialInvestment: 1000000,
        currentValue: 1350000,
        ownership: 15.2,
        status: "active",
        lastValuation: "2024-01-01",
        irr: 28.7,
        multiple: 1.35
    },
    {
        id: "4",
        company: "DataViz Corp",
        sector: "SaaS",
        stage: "Series A",
        investmentDate: "2020-06-12",
        initialInvestment: 3000000,
        currentValue: 8500000,
        ownership: 10.1,
        status: "exited",
        lastValuation: "2023-09-15",
        irr: 48.5,
        multiple: 2.83
    },
    {
        id: "5",
        company: "RetailBot",
        sector: "E-commerce",
        stage: "Seed",
        investmentDate: "2022-11-05",
        initialInvestment: 800000,
        currentValue: 200000,
        ownership: 18.5,
        status: "written-off",
        lastValuation: "2023-11-20",
        irr: -65.2,
        multiple: 0.25
    }
];

export default function Portfolio() {
    const [assets] = useState(mockAssets);

    const totalInvestment = assets.reduce((sum, asset) => sum + asset.initialInvestment, 0);
    const totalCurrentValue = assets.reduce((sum, asset) => sum + asset.currentValue, 0);
    const totalReturn = totalCurrentValue - totalInvestment;
    const overallMultiple = totalCurrentValue / totalInvestment;
    const activeAssets = assets.filter(a => a.status === 'active').length;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active': return 'bg-success/10 text-success';
            case 'exited': return 'bg-primary/10 text-primary';
            case 'written-off': return 'bg-destructive/10 text-destructive';
            default: return 'bg-muted/10 text-muted-foreground';
        }
    };

    const getSectorColor = (sector) => {
        const colors = {
            'AI/ML': 'bg-primary/10 text-primary',
            'CleanTech': 'bg-success/10 text-success',
            'HealthTech': 'bg-warning/10 text-warning',
            'SaaS': 'bg-accent/50 text-accent-foreground',
            'E-commerce': 'bg-secondary/50 text-secondary-foreground'
        };
        return colors[sector] || 'bg-muted/10 text-muted-foreground';
    };

    const handleExportReport = () => {
        const report = `
# LP Portfolio Report

Generated on: ${new Date().toLocaleDateString()}

## Portfolio Overview

**Total Investment:** ${formatCurrency(totalInvestment)}
**Current Portfolio Value:** ${formatCurrency(totalCurrentValue)}
**Total Return:** ${formatCurrency(totalReturn)} (${((overallMultiple - 1) * 100).toFixed(1)}%)
**Portfolio Multiple:** ${overallMultiple.toFixed(2)}x
**Active Investments:** ${activeAssets}
**Total Companies:** ${assets.length}

## Portfolio Composition

### By Status:
- Active: ${assets.filter(a => a.status === 'active').length} companies (${((assets.filter(a => a.status === 'active').length / assets.length) * 100).toFixed(1)}%)
- Exited: ${assets.filter(a => a.status === 'exited').length} companies (${((assets.filter(a => a.status === 'exited').length / assets.length) * 100).toFixed(1)}%)  
- Written-off: ${assets.filter(a => a.status === 'written-off').length} companies (${((assets.filter(a => a.status === 'written-off').length / assets.length) * 100).toFixed(1)}%)

### By Sector:
${Object.entries(
            assets.reduce((acc, asset) => {
                acc[asset.sector] = (acc[asset.sector] || 0) + 1;
                return acc;
            }, {})
        ).map(([sector, count]) => `- ${sector}: ${count} companies (${((count / assets.length) * 100).toFixed(1)}%)`).join('\n')}

## Individual Holdings

${assets.map(asset => `
### ${asset.company}
- **Sector:** ${asset.sector}
- **Stage:** ${asset.stage}  
- **Investment Date:** ${asset.investmentDate}
- **Initial Investment:** ${formatCurrency(asset.initialInvestment)}
- **Current Value:** ${formatCurrency(asset.currentValue)}
- **Ownership:** ${asset.ownership}%
- **Status:** ${asset.status.charAt(0).toUpperCase() + asset.status.slice(1)}
- **IRR:** ${asset.irr.toFixed(1)}%
- **Multiple:** ${asset.multiple.toFixed(2)}x
- **Last Valuation:** ${asset.lastValuation}
`).join('\n')}

---
*This report is generated automatically and reflects the current portfolio status as of the date above.*
`;

        const blob = new Blob([report], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `lp-report-${new Date().toISOString().split('T')[0]}.md`;
        a.click();
        URL.revokeObjectURL(url);

        toast.success("LP report exported successfully");
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-2">
                <div>
                    <h1 className="text-3xl font-semibold text-foreground">Portfolio</h1>
                    <p className="text-muted-foreground mt-1">Investment Performance & Holdings</p>
                </div>
                <Button
                    onClick={handleExportReport}
                    className="w-full xs:w-auto"
                >
                    <Download className="w-4 h-4 mr-2 xs:flex-1" />
                    Export LP Report
                </Button>
            </div>

            {/* Portfolio Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="glass-card border-border/50">
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total Investment</CardTitle>
                            <DollarSign className="w-4 h-4 text-muted-foreground" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold text-foreground">{formatCurrency(totalInvestment)}</div>
                    </CardContent>
                </Card>

                <Card className="glass-card border-border/50">
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Current Value</CardTitle>
                            <TrendingUp className="w-4 h-4 text-success" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold text-foreground">{formatCurrency(totalCurrentValue)}</div>
                        <p className="text-sm text-success">+{formatCurrency(totalReturn)}</p>
                    </CardContent>
                </Card>

                <Card className="glass-card border-border/50">
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Portfolio Multiple</CardTitle>
                            <Target className="w-4 h-4 text-primary" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold text-foreground">{overallMultiple.toFixed(2)}x</div>
                        <p className="text-sm text-muted-foreground">{((overallMultiple - 1) * 100).toFixed(1)}% return</p>
                    </CardContent>
                </Card>

                <Card className="glass-card border-border/50">
                    <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Active Investments</CardTitle>
                            <Calendar className="w-4 h-4 text-warning" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-semibold text-foreground">{activeAssets}</div>
                        <p className="text-sm text-muted-foreground">of {assets.length} total</p>
                    </CardContent>
                </Card>
            </div>

            {/* Portfolio Table */}
            <Card className="glass-card border-border/50">
                <CardHeader>
                    <CardTitle>Portfolio Holdings</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Company</TableHead>
                                    <TableHead>Sector</TableHead>
                                    <TableHead>Stage</TableHead>
                                    <TableHead>Investment</TableHead>
                                    <TableHead>Current Value</TableHead>
                                    <TableHead>Ownership</TableHead>
                                    <TableHead>IRR</TableHead>
                                    <TableHead>Multiple</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {assets.map((asset) => (
                                    <TableRow key={asset.id} className="hover:bg-accent/20">
                                        <TableCell>
                                            <div>
                                                <div className="font-medium text-foreground">{asset.company}</div>
                                                <div className="text-sm text-muted-foreground">{asset.investmentDate}</div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className={getSectorColor(asset.sector)}>
                                                {asset.sector}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <span className="text-sm text-muted-foreground">{asset.stage}</span>
                                        </TableCell>
                                        <TableCell>
                                            <div className="font-medium text-foreground">{formatCurrency(asset.initialInvestment)}</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="font-medium text-foreground">{formatCurrency(asset.currentValue)}</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-medium">{asset.ownership}%</span>
                                                <Progress value={Math.min(asset.ownership, 20)} className="w-16 h-2" />
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className={`flex items-center gap-1 ${asset.irr >= 0 ? 'text-success' : 'text-destructive'}`}>
                                                {asset.irr >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                                <span className="font-medium">{asset.irr.toFixed(1)}%</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <span className={`font-medium ${asset.multiple >= 1 ? 'text-success' : 'text-destructive'}`}>
                                                {asset.multiple.toFixed(2)}x
                                            </span>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary" className={getStatusColor(asset.status)}>
                                                {asset.status.charAt(0).toUpperCase() + asset.status.slice(1)}
                                            </Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}