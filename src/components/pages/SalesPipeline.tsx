import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { DealPipeline } from "../deals/DealPipeline";
import { dealService } from "../../services/dealService";
import { Deal, DealStage } from "../../types/deal";
import { useToast } from "../ui/use-toast";
import { Dialog, DialogContent } from "../ui/dialog";
import { DealForm } from "../deals/DealForm";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

export function SalesPipeline() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDealForm, setShowDealForm] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<Deal | undefined>();
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [dealToDelete, setDealToDelete] = useState<string | undefined>();
  const { toast } = useToast();

  useEffect(() => {
    loadDeals();
  }, []);

  const loadDeals = async () => {
    try {
      const dealsData = await dealService.getDeals();
      setDeals(dealsData);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load deals. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDealMove = async (dealId: string, newStage: DealStage) => {
    try {
      await dealService.updateDeal(dealId, { stage: newStage });
      loadDeals(); // Reload deals to get the updated state
      toast({
        title: "Success",
        description: "Deal stage updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update deal stage. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDealCreate = async (dealData: Partial<Deal>) => {
    try {
      await dealService.createDeal({
        ...dealData,
        customerId: "1", // TODO: Get from selected customer
        customerName: "Sample Customer", // TODO: Get from selected customer
        owner: "John Doe", // TODO: Get from auth context
      } as Omit<Deal, 'id' | 'createdAt' | 'updatedAt'>);
      loadDeals();
      setShowDealForm(false);
      toast({
        title: "Success",
        description: "Deal created successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create deal. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDealEdit = async (dealData: Partial<Deal>) => {
    if (!selectedDeal) return;
    
    try {
      await dealService.updateDeal(selectedDeal.id, dealData);
      loadDeals();
      setShowDealForm(false);
      setSelectedDeal(undefined);
      toast({
        title: "Success",
        description: "Deal updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update deal. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDealDelete = async () => {
    if (!dealToDelete) return;

    try {
      // Assuming dealService has a deleteDeal method
      await dealService.deleteDeal(dealToDelete);
      loadDeals();
      setShowDeleteAlert(false);
      setDealToDelete(undefined);
      toast({
        title: "Success",
        description: "Deal deleted successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete deal. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleEditClick = (deal: Deal) => {
    setSelectedDeal(deal);
    setShowDealForm(true);
  };

  const handleDeleteClick = (dealId: string) => {
    setDealToDelete(dealId);
    setShowDeleteAlert(true);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Sales Pipeline</h1>
          <p className="text-muted-foreground">
            Manage and track your deals through different stages
          </p>
        </div>
        <Button onClick={() => setShowDealForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Deal
        </Button>
      </div>

      <DealPipeline
        deals={deals}
        onDealMove={handleDealMove}
        onEditDeal={handleEditClick}
        onDeleteDeal={handleDeleteClick}
      />

      <Dialog open={showDealForm} onOpenChange={setShowDealForm}>
        <DialogContent>
          <DealForm
            deal={selectedDeal}
            isOpen={showDealForm}
            onClose={() => {
              setShowDealForm(false);
              setSelectedDeal(undefined);
            }}
            onSubmit={selectedDeal ? handleDealEdit : handleDealCreate}
          />
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the deal
              and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDealToDelete(undefined)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleDealDelete}>
              Delete Deal
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
