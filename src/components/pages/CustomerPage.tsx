import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Customer, CustomerActivity, CustomerDocument } from "../../types/customer";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { formatCurrency, formatDate, formatDateTime } from "../../utils";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  FileText,
  MessageSquare,
  Users,
  ArrowLeft,
  Plus,
  MoreHorizontal,
} from "lucide-react";
import { customerService } from "../../services/customerService";
import { useToast } from "../ui/use-toast";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table";

export function CustomerPage() {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [activities, setActivities] = useState<CustomerActivity[]>([]);
  const [documents, setDocuments] = useState<CustomerDocument[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (customerId) {
      loadCustomer();
    }
  }, [customerId]);

  const loadCustomer = async () => {
    if (!customerId) return;
    
    try {
      const data = await customerService.getCustomer(customerId);
      setCustomer(data);
      loadActivities();
      loadDocuments();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load customer details",
        variant: "destructive",
      });
      navigate("/customers");
    }
  };

  const loadActivities = async () => {
    if (!customerId) return;

    try {
      const data = await customerService.getActivities(customerId);
      setActivities(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load activities",
        variant: "destructive",
      });
    }
  };

  const loadDocuments = async () => {
    if (!customerId) return;

    try {
      const data = await customerService.getDocuments(customerId);
      setDocuments(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load documents",
        variant: "destructive",
      });
    }
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800";
    if (score >= 60) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  if (!customer) {
    return null;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/customers")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{customer.name}</h2>
          <div className="flex items-center gap-2 mt-1">
            <Badge variant="outline">{customer.type}</Badge>
            <Badge className="bg-purple-100 text-purple-800">
              {customer.segment}
            </Badge>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-8">
        {/* Overview Section */}
        <div className="grid grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Email:</span>
                <span>{customer.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Phone:</span>
                <span>{customer.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Address:</span>
                <span>{customer.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Type:</span>
                <span>{customer.type}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-semibold mb-4">Key Metrics</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Health Score</div>
                <Badge className={getHealthScoreColor(customer.healthScore)}>
                  {customer.healthScore}%
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Total Revenue</div>
                <div className="font-medium">{formatCurrency(customer.totalRevenue)}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Active Deals</div>
                <div className="font-medium">{customer.activeDeals}</div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground">Last Contact</div>
                <div className="font-medium">{formatDate(customer.lastContact)}</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="clients">
          <TabsList className="w-full border-b rounded-none p-0 h-auto">
            <TabsTrigger 
              value="clients" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Clients
            </TabsTrigger>
            <TabsTrigger 
              value="deals" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Deals
            </TabsTrigger>
            <TabsTrigger 
              value="activities" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Activities
            </TabsTrigger>
            <TabsTrigger 
              value="documents" 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
            >
              Documents
            </TabsTrigger>
          </TabsList>

          <TabsContent value="clients" className="mt-6">
            <Card>
              <div className="p-6 flex justify-between items-center border-b">
                <h3 className="font-semibold">Client Contacts</h3>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Contact
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Last Contact</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* TODO: Replace with actual client data */}
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Dr. Rajesh Kumar</div>
                      <div className="text-sm text-muted-foreground">Primary Contact</div>
                    </TableCell>
                    <TableCell>Head of Cardiology</TableCell>
                    <TableCell>rajesh.kumar@maxhealthcare.com</TableCell>
                    <TableCell>+91 98765 43210</TableCell>
                    <TableCell>{formatDate(new Date().toISOString())}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="deals" className="mt-6">
            <Card>
              <div className="p-6 flex justify-between items-center border-b">
                <h3 className="font-semibold">Active Deals</h3>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Deal
                </Button>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Deal</TableHead>
                    <TableHead>Stage</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Probability</TableHead>
                    <TableHead>Expected Close</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {/* TODO: Replace with actual deal data */}
                  <TableRow>
                    <TableCell>
                      <div className="font-medium">Diagnostic Lab Setup</div>
                      <div className="text-sm text-muted-foreground">Equipment Bundle</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">Negotiation</Badge>
                    </TableCell>
                    <TableCell>{formatCurrency(2800000)}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">40%</Badge>
                    </TableCell>
                    <TableCell>{formatDate("2024-02-28")}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          <TabsContent value="activities" className="space-y-4 mt-6">
            {activities.length === 0 ? (
              <Card className="p-6">
                <p className="text-center text-muted-foreground">
                  No activities recorded yet
                </p>
              </Card>
            ) : (
              activities.map((activity) => (
                <Card key={activity.id} className="p-4">
                  <div className="flex items-start gap-4">
                    {activity.type === "Call" && (
                      <Phone className="h-4 w-4 text-muted-foreground" />
                    )}
                    {activity.type === "Email" && (
                      <Mail className="h-4 w-4 text-muted-foreground" />
                    )}
                    {activity.type === "Meeting" && (
                      <Users className="h-4 w-4 text-muted-foreground" />
                    )}
                    {activity.type === "Note" && (
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                    )}
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{activity.title}</h4>
                        <span className="text-sm text-muted-foreground">
                          {formatDateTime(activity.date)}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {activity.description}
                      </p>
                      <div className="text-xs text-muted-foreground mt-2">
                        By {activity.createdBy}
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="documents" className="space-y-4 mt-6">
            {documents.length === 0 ? (
              <Card className="p-6">
                <p className="text-center text-muted-foreground">
                  No documents uploaded yet
                </p>
              </Card>
            ) : (
              documents.map((document) => (
                <Card key={document.id} className="p-4">
                  <div className="flex items-start gap-4">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{document.name}</h4>
                        <Badge variant="outline">{document.category}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <span>{document.size} bytes</span>
                        <span>•</span>
                        <span>
                          Uploaded by {document.uploadedBy} on{" "}
                          {formatDate(document.uploadedAt)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
