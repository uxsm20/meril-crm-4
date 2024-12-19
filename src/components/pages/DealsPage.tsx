import { useState, useEffect } from "react";
import { DealPipeline } from "../deals/DealPipeline";
import { dealService } from "../../services/dealService";
import { Deal, DealStage } from "../../types/deal";
import { Button } from "../ui/button";
import { Plus } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { DealForm } from "../deals/DealForm";

export function DealsPage() {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showDealForm, setShowDealForm] = useState(false);
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

  const handleDealCreate = async (dealData: Omit<Deal, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      await dealService.createDeal(dealData);
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Deals Pipeline</h1>
          <p className="text-muted-foreground">
            Manage and track your deals through different stages
          </p>
        </div>
        <Button onClick={() => setShowDealForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          New Deal
        </Button>
      </div>

      <DealPipeline deals={deals} onDealMove={handleDealMove} />

      {showDealForm && (
        <DealForm
          onSubmit={handleDealCreate}
          onCancel={() => setShowDealForm(false)}
        />
      )}
    </div>
  );
}
