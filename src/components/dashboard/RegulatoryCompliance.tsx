import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Shield, AlertCircle, CheckCircle2, Clock, ArrowUpRight } from "lucide-react";

const mockComplianceData = [
  {
    id: "1",
    title: "ISO 13485 Certification",
    status: "Valid",
    expiryDate: "2025-06-15",
    progress: 100,
    daysRemaining: 180,
    authority: "TÜV SÜD",
  },
  {
    id: "2",
    title: "CE Mark Registration",
    status: "Renewal Required",
    expiryDate: "2024-03-30",
    progress: 85,
    daysRemaining: 45,
    authority: "EU Notified Body",
  },
  {
    id: "3",
    title: "FDA 510(k) Clearance",
    status: "Pending Review",
    progress: 65,
    daysRemaining: null,
    authority: "US FDA",
  },
];

const mockMetrics = {
  complianceRate: "94%",
  pendingApprovals: "3",
  activeRegistrations: "12",
  trend: "+5%",
};

function getStatusColor(status: string) {
  switch (status) {
    case "Valid":
      return "text-green-500";
    case "Renewal Required":
      return "text-yellow-500";
    case "Pending Review":
      return "text-blue-500";
    default:
      return "text-gray-500";
  }
}

function getProgressColor(progress: number) {
  if (progress >= 90) return "text-green-500";
  if (progress >= 70) return "text-yellow-500";
  return "text-blue-500";
}

export function RegulatoryCompliance() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <Shield className="h-5 w-5 text-blue-500" />
            Regulatory & Compliance
          </CardTitle>
          <Badge variant="outline" className="font-normal">
            {mockMetrics.activeRegistrations} Active Registrations
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-green-50 to-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Compliance Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {mockMetrics.complianceRate}
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="h-3 w-3 text-green-500" />
                  <p className="text-xs text-green-600 font-medium">
                    {mockMetrics.trend} vs last quarter
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-blue-50 to-white col-span-3">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Pending Approvals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {mockMetrics.pendingApprovals}
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full mt-2">
                  <div 
                    className="h-full bg-blue-500 rounded-full" 
                    style={{ width: '25%' }}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-4">
            {mockComplianceData.map((item) => (
              <div
                key={item.id}
                className="group relative bg-white rounded-lg border p-4 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      {item.status === "Valid" ? (
                        <CheckCircle2 className="h-4 w-4 text-green-500" />
                      ) : item.status === "Renewal Required" ? (
                        <AlertCircle className="h-4 w-4 text-yellow-500" />
                      ) : (
                        <Clock className="h-4 w-4 text-blue-500" />
                      )}
                      <h4 className="font-semibold">{item.title}</h4>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{item.authority}</span>
                      <span>•</span>
                      <Badge
                        variant={
                          item.status === "Valid"
                            ? "success"
                            : item.status === "Renewal Required"
                            ? "warning"
                            : "default"
                        }
                        className="font-normal"
                      >
                        {item.status}
                      </Badge>
                    </div>
                  </div>
                  {item.daysRemaining !== null && (
                    <div className="text-right">
                      <div className="text-sm font-medium">
                        Expires in {item.daysRemaining} days
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {item.expiryDate}
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-4 space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Completion Status</span>
                    <span>{item.progress}%</span>
                  </div>
                  <Progress 
                    value={item.progress} 
                    className={getProgressColor(item.progress)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
