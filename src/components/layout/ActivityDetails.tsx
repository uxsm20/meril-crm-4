import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, Phone, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActivityDetailsProps {
  isOpen: boolean;
  onClose: () => void;
  activity: any;
}

interface Contact {
  name: string;
  role: string;
  zohoId: string;
  hospital: string;
}

interface AIInsights {
  signalScore: number;
  reasons: string[];
  suggestedTopics: string[];
  lastInteraction: string;
}

interface ActivityDetails {
  title: string;
  details: {
    contact: Contact;
    aiInsights: AIInsights;
  };
}

export function ActivityDetails({ isOpen, onClose, activity }: ActivityDetailsProps) {
  if (!activity?.details) return null;

  const { contact, aiInsights } = activity.details;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">{activity.title}</DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 mt-4">
          {/* Contact Information */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h3 className="font-medium">{contact.name}</h3>
                  <p className="text-sm text-muted-foreground">{contact.role}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  Zoho ID: {contact.zohoId}
                </Badge>
              </div>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Building className="h-4 w-4" />
                  {contact.hospital}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Insights */}
          <Card>
            <CardContent className="pt-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">AI Signal Score</h3>
                <div className="flex items-center gap-2">
                  <span className={cn(
                    "text-lg font-semibold",
                    aiInsights.signalScore >= 80 ? "text-green-500" : 
                    aiInsights.signalScore >= 60 ? "text-yellow-500" : "text-red-500"
                  )}>
                    {aiInsights.signalScore}%
                  </span>
                  {aiInsights.signalScore >= 80 ? (
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Why this score?</h4>
                  <ul className="space-y-2">
                    {aiInsights.reasons.map((reason: string, index: number) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary">•</span>
                        {reason}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Suggested Topics</h4>
                  <ul className="space-y-2">
                    {aiInsights.suggestedTopics.map((topic: string, index: number) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                        <span className="text-primary">•</span>
                        {topic}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2 border-t">
                  <p className="text-sm text-muted-foreground">
                    Last interaction: {aiInsights.lastInteraction}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}