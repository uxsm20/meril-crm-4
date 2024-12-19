import { useState } from "react";
import { Deal, Activity, Proposal } from "../../types/deal";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import { formatCurrency, formatDate, formatDateTime } from "../../utils";
import {
  Calendar,
  IndianRupee,
  Users,
  Mail,
  Phone,
  FileText,
  MessageSquare,
  BarChart,
  X,
} from "lucide-react";
import { dealService } from "../../services/dealService";
import { useToast } from "../ui/use-toast";

interface DealDetailsProps {
  deal: Deal;
  onClose: () => void;
  onEdit: (deal: Deal) => void;
  onDelete: (dealId: string) => void;
}

export function DealDetails({ deal, onClose, onEdit, onDelete }: DealDetailsProps) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const { toast } = useToast();

  const loadActivities = async () => {
    try {
      const data = await dealService.getActivities(deal.id);
      setActivities(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load activities",
        variant: "destructive",
      });
    }
  };

  const loadProposals = async () => {
    try {
      const data = await dealService.getProposals(deal.id);
      setProposals(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load proposals",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50">
      <div className="fixed inset-y-0 right-0 w-[600px] bg-background shadow-lg border-l animate-in slide-in-from-right">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div>
              <h2 className="text-2xl font-semibold">{deal.title}</h2>
              <p className="text-muted-foreground">{deal.customerName}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <ScrollArea className="flex-1">
            <div className="p-6">
              <Tabs defaultValue="details">
                <TabsList className="w-full">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="activities" onClick={loadActivities}>
                    Activities
                  </TabsTrigger>
                  <TabsTrigger value="proposals" onClick={loadProposals}>
                    Proposals
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-6 mt-6">
                  <Card className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Customer:</span>
                        <span>{deal.customerName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <IndianRupee className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Value:</span>
                        <span>{formatCurrency(deal.value)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BarChart className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Probability:</span>
                        <Badge variant="secondary">{deal.probability}%</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">Expected Close:</span>
                        <span>{formatDate(deal.expectedCloseDate)}</span>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground">{deal.description}</p>
                  </Card>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => onEdit(deal)}
                    >
                      Edit Deal
                    </Button>
                    <Button
                      variant="destructive"
                      className="flex-1"
                      onClick={() => onDelete(deal.id)}
                    >
                      Delete Deal
                    </Button>
                  </div>
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
                              {activity.notes}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))
                  )}
                </TabsContent>

                <TabsContent value="proposals" className="space-y-4 mt-6">
                  {proposals.length === 0 ? (
                    <Card className="p-6">
                      <p className="text-center text-muted-foreground">
                        No proposals created yet
                      </p>
                    </Card>
                  ) : (
                    proposals.map((proposal) => (
                      <Card key={proposal.id} className="p-4">
                        <div className="flex items-start gap-4">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium">Version {proposal.version}</h4>
                              <Badge>{proposal.status}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              Last modified: {formatDateTime(proposal.lastModified)}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}
