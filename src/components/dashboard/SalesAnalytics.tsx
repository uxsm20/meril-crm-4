import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Tooltip } from "recharts";
import { ArrowUpRight, TrendingUp } from "lucide-react";

const COLORS = ["#2563eb", "#3b82f6", "#60a5fa", "#93c5fd"];
const RADIAN = Math.PI / 180;

const mockCategoryData = [
  { name: "Medical Devices", value: 4000000, growth: "+12%" },
  { name: "Diagnostic Equipment", value: 3000000, growth: "+8%" },
  { name: "Surgical Instruments", value: 2000000, growth: "+15%" },
  { name: "Monitoring Systems", value: 2500000, growth: "+10%" },
];

const CustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  name,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
      className="text-xs font-medium"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export function SalesAnalytics() {
  const totalValue = mockCategoryData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="col-span-2">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            Sales Distribution
          </CardTitle>
          <span className="text-sm text-muted-foreground">
            Total: {new Intl.NumberFormat('en-IN', {
              style: 'currency',
              currency: 'INR',
              maximumFractionDigits: 0,
              minimumFractionDigits: 0
            }).format(totalValue)}
          </span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockCategoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={CustomLabel}
                    outerRadius={100}
                    innerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    strokeWidth={2}
                    stroke="#ffffff"
                  >
                    {mockCategoryData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]}
                        className="hover:opacity-80 transition-opacity"
                      />
                    ))}
                  </Pie>
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="bg-white p-3 rounded-lg shadow-lg border">
                            <p className="font-semibold text-sm">{data.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {new Intl.NumberFormat('en-IN', {
                                style: 'currency',
                                currency: 'INR',
                                maximumFractionDigits: 0,
                                minimumFractionDigits: 0
                              }).format(data.value)}
                            </p>
                            <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                              <ArrowUpRight className="h-3 w-3" />
                              {data.growth}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="space-y-4">
            {mockCategoryData.map((item, index) => (
              <div key={item.name} className="space-y-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm font-medium">{item.name}</span>
                  </div>
                  <span className="text-xs text-green-600 flex items-center gap-1">
                    <ArrowUpRight className="h-3 w-3" />
                    {item.growth}
                  </span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                    maximumFractionDigits: 0,
                    minimumFractionDigits: 0
                  }).format(item.value)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
