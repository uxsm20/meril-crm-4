import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  MapPin,
  Users,
  Phone,
  Mail,
  FileText,
  IndianRupee,
} from "lucide-react";

interface CompanyDetailsProps {
  company: any;
  onClose: () => void;
  onCreateProposal: () => void;
}

export function CompanyDetails({
  company,
  onClose,
  onCreateProposal,
}: CompanyDetailsProps) {
  if (!company) return null;

  return (
    <Dialog open={!!company} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            {company.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {company.location}
              </Badge>
              <Badge variant="outline">{company.size}</Badge>
              <Badge variant="outline">{company.type}</Badge>
            </div>
            <Button onClick={onCreateProposal}>Create Proposal</Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium flex items-center gap-2 mb-4">
                  <Users className="h-4 w-4" />
                  Key Contacts
                </h3>
                <div className="space-y-4">
                  {company.contacts.map((contact: any) => (
                    <div
                      key={contact.email}
                      className="p-3 rounded-lg border bg-card"
                    >
                      <p className="font-medium">{contact.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {contact.role}
                      </p>
                      <div className="mt-2 space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-3 w-3" />
                          {contact.phone}
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-3 w-3" />
                          {contact.email}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium flex items-center gap-2 mb-4">
                  <FileText className="h-4 w-4" />
                  Recent Deals
                </h3>
                {company.recentDeals.length > 0 ? (
                  <div className="space-y-4">
                    {company.recentDeals.map((deal: any) => (
                      <div
                        key={deal.id}
                        className="p-3 rounded-lg border bg-card"
                      >
                        <p className="font-medium">{deal.title}</p>
                        <div className="mt-2 flex items-center justify-between">
                          <div className="flex items-center gap-1 text-sm">
                            <IndianRupee className="h-3 w-3" />
                            {(deal.amount / 100000).toFixed(2)}L
                          </div>
                          <time className="text-sm text-muted-foreground">
                            {new Date(deal.date).toLocaleDateString()}
                          </time>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No recent deals found
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}