import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { Building2, Users, TrendingUp, Activity } from "lucide-react";

const mockSegmentData = [
  {
    name: "Private Hospitals",
    customers: 45,
    revenue: 7500000,
    growth: "+12%",
  },
  {
    name: "Government Hospitals",
    customers: 15,
    revenue: 3500000,
    growth: "+8%",
  },
  {
    name: "Specialty Clinics",
    customers: 30,
    revenue: 2500000,
    growth: "+15%",
  },
];

const mockRetentionData = {
  rate: "85%",
  trend: "+5%",
  averageLTV: "₹2.5Cr",
  totalCustomers: "90",
  activeEngagements: "28",
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border">
        <h6 className="font-semibold mb-2">{label}</h6>
        <div className="space-y-1">
          <p className="text-sm flex items-center justify-between gap-3">
            <span className="text-muted-foreground">Customers:</span>
            <span className="font-medium">{payload[0].value}</span>
          </p>
          <p className="text-sm flex items-center justify-between gap-3">
            <span className="text-muted-foreground">Revenue:</span>
            <span className="font-medium">
              {new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                maximumFractionDigits: 0,
              }).format(payload[1].value)}
            </span>
          </p>
          <p className="text-sm flex items-center justify-between gap-3">
            <span className="text-muted-foreground">Growth:</span>
            <span className="text-green-600 font-medium">
              {mockSegmentData.find(item => item.name === label)?.growth}
            </span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

export function CustomerInsights() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <Users className="h-5 w-5 text-blue-500" />
            Customer Segments & Retention
          </CardTitle>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Activity className="h-4 w-4" />
            {mockRetentionData.activeEngagements} Active Engagements
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Customer Retention
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{mockRetentionData.rate}</div>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-500" />
                  <p className="text-xs text-green-600 font-medium">
                    {mockRetentionData.trend}
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-50 to-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Avg. Lifetime Value
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{mockRetentionData.averageLTV}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Per customer
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-purple-50 to-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Customers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{mockRetentionData.totalCustomers}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Across segments
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-orange-50 to-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Active Engagements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{mockRetentionData.activeEngagements}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Current month
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="h-[300px] mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={mockSegmentData} barGap={0}>
                <XAxis 
                  dataKey="name" 
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  yAxisId="left"
                  orientation="left" 
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${value}`}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `₹${value/1000000}M`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar 
                  yAxisId="left" 
                  dataKey="customers" 
                  fill="#93c5fd" 
                  radius={[4, 4, 0, 0]}
                  name="Customers"
                />
                <Bar 
                  yAxisId="right" 
                  dataKey="revenue" 
                  fill="#2563eb" 
                  radius={[4, 4, 0, 0]}
                  name="Revenue"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
