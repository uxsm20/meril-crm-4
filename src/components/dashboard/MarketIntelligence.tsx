import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar, Legend } from "recharts";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, LineChart, ArrowUpRight, ArrowDownRight, Globe } from "lucide-react";

const mockCompetitiveData = [
  {
    category: "Product Range",
    our: 85,
    competitor1: 75,
    competitor2: 65,
  },
  {
    category: "Innovation",
    our: 90,
    competitor1: 80,
    competitor2: 70,
  },
  {
    category: "Price Point",
    our: 75,
    competitor1: 85,
    competitor2: 80,
  },
  {
    category: "Service Quality",
    our: 95,
    competitor1: 70,
    competitor2: 75,
  },
  {
    category: "Market Share",
    our: 80,
    competitor1: 85,
    competitor2: 60,
  },
];

const mockMarketTrends = [
  {
    trend: "AI Integration",
    impact: "High",
    change: "+15%",
    direction: "up",
    description: "Growing demand for AI-powered medical devices",
  },
  {
    trend: "Remote Monitoring",
    impact: "High",
    change: "+25%",
    direction: "up",
    description: "Increased adoption of telemedicine solutions",
  },
  {
    trend: "Traditional Equipment",
    impact: "Medium",
    change: "-8%",
    direction: "down",
    description: "Declining demand for non-connected devices",
  },
];

const mockMetrics = {
  marketShare: "28%",
  growth: "+5.2%",
  competitiveIndex: "8.5",
  potentialMarket: "₹450Cr",
};

export function MarketIntelligence() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <Globe className="h-5 w-5 text-blue-500" />
            Market Intelligence
          </CardTitle>
          <Badge variant="outline" className="font-normal">
            Q4 2024
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Market Share
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {mockMetrics.marketShare}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="h-3 w-3 text-green-500" />
                  <p className="text-xs text-green-600 font-medium">
                    {mockMetrics.growth}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-50 to-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Competitive Index
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  {mockMetrics.competitiveIndex}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Out of 10
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-50 to-white col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Potential Market
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {mockMetrics.potentialMarket}
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full mt-2">
                  <div 
                    className="h-full bg-green-500 rounded-full" 
                    style={{ width: '75%' }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={mockCompetitiveData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis 
                    dataKey="category" 
                    stroke="#888888"
                    fontSize={12}
                  />
                  <Radar
                    name="Our Company"
                    dataKey="our"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.3}
                  />
                  <Radar
                    name="Competitor 1"
                    dataKey="competitor1"
                    stroke="#22c55e"
                    fill="#22c55e"
                    fillOpacity={0.3}
                  />
                  <Radar
                    name="Competitor 2"
                    dataKey="competitor2"
                    stroke="#f59e0b"
                    fill="#f59e0b"
                    fillOpacity={0.3}
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-4">
              {mockMarketTrends.map((trend, index) => (
                <div
                  key={index}
                  className="group relative bg-white rounded-lg border p-4 hover:shadow-md transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <LineChart className="h-4 w-4 text-blue-500" />
                        <h4 className="font-semibold">{trend.trend}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {trend.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge
                        variant={trend.impact === "High" ? "default" : "secondary"}
                        className="font-normal"
                      >
                        {trend.impact} Impact
                      </Badge>
                      <div className="flex items-center gap-1 mt-2 justify-end">
                        {trend.direction === "up" ? (
                          <ArrowUpRight className="h-3 w-3 text-green-500" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 text-red-500" />
                        )}
                        <span className={`text-sm font-medium ${
                          trend.direction === "up" ? "text-green-600" : "text-red-600"
                        }`}>
                          {trend.change}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
