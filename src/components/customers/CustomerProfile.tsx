import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { 
  Building2, 
  Mail, 
  Phone, 
  MapPin, 
  Users, 
  Activity,
  FileText,
  BarChart3
} from "lucide-react";

interface CustomerDetails {
  id: string;
  name: string;
  type: "Hospital" | "Clinic" | "Laboratory";
  email: string;
  phone: string;
  address: string;
  segment: "Enterprise" | "Mid-Market" | "Small Business";
  healthScore: number;
  totalRevenue: number;
  activeDeals: number;
  lastContact: string;
}

interface CustomerProfileProps {
  customer: CustomerDetails;
}

function HealthScoreIndicator({ score }: { score: number }) {
  const getColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <div className="flex items-center gap-2">
      <div className={cn("text-2xl font-bold", getColor(score))}>
        {score}
      </div>
      <div className="text-sm text-muted-foreground">Health Score</div>
    </div>
  );
}

function CustomerInfo({ customer }: { customer: CustomerDetails }) {
  return (
    <div className="grid gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <span>{customer.type}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{customer.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{customer.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span>{customer.address}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Segment</span>
            <Badge>{customer.segment}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Total Revenue</span>
            <span className="font-medium">{formatCurrency(customer.totalRevenue)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Active Deals</span>
            <span className="font-medium">{customer.activeDeals}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground">Last Contact</span>
            <span className="font-medium">{new Date(customer.lastContact).toLocaleDateString()}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function CustomerProfile({ customer }: CustomerProfileProps) {
  const [activeTab, setActiveTab] = useState("info");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{customer.name}</h2>
          <p className="text-muted-foreground">
            Customer ID: {customer.id}
          </p>
        </div>
        <HealthScoreIndicator score={customer.healthScore} />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="info" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Information
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Activity
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="space-y-4">
          <CustomerInfo customer={customer} />
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          {/* TODO: Add activity timeline component */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              Activity timeline will be implemented here
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-4">
          {/* TODO: Add documents management component */}
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent>
              Documents management will be implemented here
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          {/* TODO: Add analytics component */}
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              Customer analytics will be implemented here
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
