import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Package, ArrowDownRight, Timer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const mockInventoryAlerts = [
  {
    id: "1",
    product: "Mozec DES",
    currentStock: 25,
    reorderPoint: 100,
    category: "Critical",
    stockPercentage: 25,
  },
  {
    id: "2",
    product: "Guardian TAVR System",
    currentStock: 5,
    reorderPoint: 10,
    category: "Warning",
    stockPercentage: 50,
  },
  {
    id: "3",
    product: "UltraVision Echo",
    expiryDate: "2024-03-15",
    currentStock: 3,
    category: "Expiring Soon",
    stockPercentage: 75,
    daysUntilExpiry: 30,
  },
];

export function InventoryIntelligence() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2 text-lg font-semibold">
            <Package className="h-5 w-5 text-blue-500" />
            Inventory Alerts
          </CardTitle>
          <Badge variant="outline" className="font-normal">
            3 Critical Items
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {mockInventoryAlerts.map((alert) => (
          <div
            key={alert.id}
            className="group relative bg-white rounded-lg border p-4 hover:shadow-md transition-all space-y-3"
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-semibold flex items-center gap-2">
                  {alert.product}
                  <Badge variant={
                    alert.category === "Critical" ? "destructive" : 
                    alert.category === "Warning" ? "warning" : 
                    "default"
                  } className="ml-2">
                    {alert.category}
                  </Badge>
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {alert.category === "Expiring Soon" ? (
                    <span className="flex items-center gap-1">
                      <Timer className="h-4 w-4" />
                      Expires in {alert.daysUntilExpiry} days
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <ArrowDownRight className="h-4 w-4 text-red-500" />
                      {alert.currentStock} units remaining
                    </span>
                  )}
                </p>
              </div>
              {alert.category !== "Expiring Soon" && (
                <div className="text-right">
                  <div className="text-sm font-medium">
                    Reorder Point: {alert.reorderPoint}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Current: {alert.currentStock}
                  </div>
                </div>
              )}
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Stock Level</span>
                <span>{alert.stockPercentage}%</span>
              </div>
              <Progress 
                value={alert.stockPercentage} 
                className={
                  alert.stockPercentage <= 25 ? "text-red-500" :
                  alert.stockPercentage <= 50 ? "text-yellow-500" :
                  "text-green-500"
                }
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
