import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { Badge } from "@/components/ui/badge";
import { HeadphonesIcon, Clock, CheckCircle2, AlertTriangle, Timer } from "lucide-react";

const mockTicketData = [
  { day: "Mon", tickets: 12, resolved: 10, responseTime: 45 },
  { day: "Tue", tickets: 15, resolved: 13, responseTime: 35 },
  { day: "Wed", tickets: 18, resolved: 15, responseTime: 40 },
  { day: "Thu", tickets: 14, resolved: 12, responseTime: 30 },
  { day: "Fri", tickets: 16, resolved: 14, responseTime: 38 },
];

const mockMetrics = {
  activeTickets: "8",
  avgResponseTime: "35 mins",
  resolutionRate: "92%",
  criticalIssues: "2",
};

const mockActiveTickets = [
  {
    id: "1",
    title: "Calibration Issue - UltraVision Echo",
    priority: "Critical",
    customer: "City Hospital",
    status: "In Progress",
    timeElapsed: "45m",
  },
  {
    id: "2",
    title: "Software Update Required - Guardian TAVR",
    priority: "High",
    customer: "Heart Institute",
    status: "Assigned",
    timeElapsed: "2h",
  },
  {
    id: "3",
    title: "Training Request - New Features",
    priority: "Medium",
    customer: "Medicare Center",
    status: "Pending",
    timeElapsed: "1h",
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border">
        <h6 className="font-semibold mb-2">{label}</h6>
        <div className="space-y-2">
          <p className="text-sm flex items-center justify-between gap-3">
            <span className="text-muted-foreground">New Tickets:</span>
            <span className="font-medium">{payload[0].value}</span>
          </p>
          <p className="text-sm flex items-center justify-between gap-3">
            <span className="text-muted-foreground">Resolved:</span>
            <span className="font-medium text-green-600">{payload[1].value}</span>
          </p>
          <p className="text-sm flex items-center justify-between gap-3">
            <span className="text-muted-foreground">Avg Response:</span>
            <span className="font-medium">{payload[2].value} mins</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};

function getPriorityColor(priority: string) {
  switch (priority.toLowerCase()) {
    case 'critical':
      return 'text-red-500 bg-red-50';
    case 'high':
      return 'text-orange-500 bg-orange-50';
    case 'medium':
      return 'text-yellow-500 bg-yellow-50';
    default:
      return 'text-blue-500 bg-blue-50';
  }
}

function getStatusIcon(status: string) {
  switch (status.toLowerCase()) {
    case 'in progress':
      return <Timer className="h-4 w-4 text-blue-500" />;
    case 'assigned':
      return <Clock className="h-4 w-4 text-yellow-500" />;
    case 'resolved':
      return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    default:
      return <AlertTriangle className="h-4 w-4 text-orange-500" />;
  }
}

export function ServiceSupport() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <HeadphonesIcon className="h-5 w-5 text-blue-500" />
            Service & Support
          </CardTitle>
          <Badge variant="outline" className="font-normal">
            {mockMetrics.activeTickets} Active Tickets
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Response Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {mockMetrics.avgResponseTime}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Average first response
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-50 to-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Resolution Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {mockMetrics.resolutionRate}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Last 7 days
                </p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-red-50 to-white col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Critical Issues
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {mockMetrics.criticalIssues}
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full mt-2">
                  <div 
                    className="h-full bg-red-500 rounded-full" 
                    style={{ width: '20%' }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockTicketData}>
                <XAxis 
                  dataKey="day" 
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
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="tickets"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ fill: "#3b82f6" }}
                />
                <Line
                  type="monotone"
                  dataKey="resolved"
                  stroke="#22c55e"
                  strokeWidth={2}
                  dot={{ fill: "#22c55e" }}
                />
                <Line
                  type="monotone"
                  dataKey="responseTime"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={{ fill: "#f59e0b" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-4">
            {mockActiveTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="group relative bg-white rounded-lg border p-4 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(ticket.status)}
                      <h4 className="font-semibold">{ticket.title}</h4>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{ticket.customer}</span>
                      <span>•</span>
                      <Badge
                        className={`${getPriorityColor(ticket.priority)} border-0`}
                      >
                        {ticket.priority}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {ticket.status}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {ticket.timeElapsed} ago
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
