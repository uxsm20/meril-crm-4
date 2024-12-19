import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Activity, 
  UserPlus, 
  Package, 
  FileText, 
  AlertCircle, 
  CheckCircle2, 
  Calendar,
  DollarSign,
  MessageSquare,
  Settings,
} from "lucide-react";

const mockActivities = [
  {
    id: "1",
    type: "deal",
    title: "New Deal Created",
    description: "Guardian TAVR System - City Hospital",
    timestamp: "10 minutes ago",
    amount: "₹45L",
    status: "New",
    icon: DollarSign,
    category: "sales",
  },
  {
    id: "2",
    type: "customer",
    title: "Customer Onboarded",
    description: "Medicare Specialty Center added as new customer",
    timestamp: "45 minutes ago",
    icon: UserPlus,
    category: "customer",
  },
  {
    id: "3",
    type: "inventory",
    title: "Stock Alert",
    description: "Low stock warning for Mozec DES",
    timestamp: "1 hour ago",
    status: "Critical",
    icon: AlertCircle,
    category: "inventory",
  },
  {
    id: "4",
    type: "support",
    title: "Support Ticket Resolved",
    description: "Calibration issue fixed for UltraVision Echo",
    timestamp: "2 hours ago",
    icon: CheckCircle2,
    category: "support",
  },
  {
    id: "5",
    type: "meeting",
    title: "Meeting Scheduled",
    description: "Product demo with Heart Institute",
    timestamp: "3 hours ago",
    icon: Calendar,
    category: "sales",
  },
  {
    id: "6",
    type: "document",
    title: "Document Updated",
    description: "Updated compliance documentation for ISO 13485",
    timestamp: "4 hours ago",
    icon: FileText,
    category: "compliance",
  },
  {
    id: "7",
    type: "product",
    title: "Product Update",
    description: "New version release for Guardian TAVR System",
    timestamp: "5 hours ago",
    icon: Package,
    category: "product",
  },
  {
    id: "8",
    type: "feedback",
    title: "Customer Feedback",
    description: "Positive feedback received from City Hospital",
    timestamp: "6 hours ago",
    icon: MessageSquare,
    category: "customer",
  },
];

function getCategoryStyles(category: string) {
  switch (category) {
    case 'sales':
      return 'text-blue-500 bg-blue-50 border-blue-200';
    case 'customer':
      return 'text-purple-500 bg-purple-50 border-purple-200';
    case 'inventory':
      return 'text-red-500 bg-red-50 border-red-200';
    case 'support':
      return 'text-green-500 bg-green-50 border-green-200';
    case 'compliance':
      return 'text-yellow-500 bg-yellow-50 border-yellow-200';
    case 'product':
      return 'text-indigo-500 bg-indigo-50 border-indigo-200';
    default:
      return 'text-gray-500 bg-gray-50 border-gray-200';
  }
}

export function ActivityCenter() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <Activity className="h-5 w-5 text-blue-500" />
            Activity Center
          </CardTitle>
          <div className="flex gap-2">
            <Badge variant="outline" className="font-normal">
              Last 24 Hours
            </Badge>
            <button className="p-1 hover:bg-gray-100 rounded-md transition-colors">
              <Settings className="h-4 w-4 text-gray-500" />
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {mockActivities.map((activity) => {
            const IconComponent = activity.icon;
            return (
              <div
                key={activity.id}
                className="group relative bg-white rounded-lg border p-4 hover:shadow-md transition-all space-y-3"
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${getCategoryStyles(activity.category)}`}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="flex items-start justify-between">
                      <h4 className="font-semibold text-sm">{activity.title}</h4>
                      {activity.status && (
                        <Badge
                          variant={activity.status === "Critical" ? "destructive" : "default"}
                          className="ml-2"
                        >
                          {activity.status}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-muted-foreground">
                        {activity.timestamp}
                      </span>
                      {activity.amount && (
                        <span className="text-sm font-medium text-green-600">
                          {activity.amount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
