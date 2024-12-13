import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, DollarSign, FileText, User } from "lucide-react";

interface DealDetailsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  deal: {
    id: string;
    title: string;
    amount: number;
    status: string;
    date: string;
    assignedTo: string;
    products: string[];
    notes?: string;
  } | null;
}

export function DealDetailsDialog({ isOpen, onClose, deal }: DealDetailsDialogProps) {
  if (!deal) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Deal Details</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          {/* Deal Title and Status */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">{deal.title}</h3>
            <Badge 
              variant={
                deal.status === "Won" ? "success" : 
                deal.status === "Lost" ? "destructive" : 
                "default"
              }
            >
              {deal.status}
            </Badge>
          </div>

          {/* Deal Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Amount</p>
                <p className="font-medium">₹{deal.amount.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Date</p>
                <p className="font-medium">{deal.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Assigned To</p>
                <p className="font-medium">{deal.assignedTo}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Products</p>
                <p className="font-medium">{deal.products.join(", ")}</p>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          {deal.notes && (
            <div>
              <h4 className="font-medium mb-2">Notes</h4>
              <p className="text-sm text-muted-foreground">{deal.notes}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
