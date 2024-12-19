import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";
import { BadgeDollarSign, ArrowUpRight, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const mockPipelineData = [
  {
    stage: "Qualification",
    value: 12000000,
    deals: 15,
    conversion: 85,
  },
  {
    stage: "Proposal",
    value: 8500000,
    deals: 12,
    conversion: 70,
  },
  {
    stage: "Negotiation",
    value: 6000000,
    deals: 8,
    conversion: 55,
  },
  {
    stage: "Closing",
    value: 3500000,
    deals: 5,
    conversion: 40,
  },
];

const mockPerformanceData = {
  totalValue: "₹3.0Cr",
  winRate: "68%",
  avgCycleTime: "45 days",
  trend: "+15%",
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const data = mockPipelineData.find(item => item.stage === label);
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border">
        <h6 className="font-semibold mb-2">{label}</h6>
        <div className="space-y-2">
          <p className="text-sm flex items-center justify-between gap-3">
            <span className="text-muted-foreground">Pipeline Value:</span>
            <span className="font-medium">
              {new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                maximumFractionDigits: 0,
              }).format(payload[0].value)}
            </span>
          </p>
          <p className="text-sm flex items-center justify-between gap-3">
            <span className="text-muted-foreground">Active Deals:</span>
            <span className="font-medium">{data?.deals}</span>
          </p>
          <p className="text-sm flex items-center justify-between gap-3">
            <span className="text-muted-foreground">Conversion Rate:</span>
            <span className="font-medium text-green-600">{data?.conversion}%</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export function DealPipelineAnalytics() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <Target className="h-5 w-5 text-blue-500" />
            Deal Pipeline
          </CardTitle>
          <Badge variant="outline" className="font-normal">
            40 Active Deals
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Pipeline Value
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {mockPerformanceData.totalValue}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="h-3 w-3 text-green-500" />
                  <p className="text-xs text-green-600 font-medium">
                    {mockPerformanceData.trend} vs last month
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-50 to-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Win Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {mockPerformanceData.winRate}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Last 30 days
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-50 to-white col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Average Deal Cycle
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">
                  {mockPerformanceData.avgCycleTime}
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full mt-2">
                  <div 
                    className="h-full bg-purple-500 rounded-full" 
                    style={{ width: '65%' }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={mockPipelineData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="pipelineGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="stage"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `₹${value/1000000}M`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fill="url(#pipelineGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
