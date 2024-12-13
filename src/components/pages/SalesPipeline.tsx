import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, MoreHorizontal, ChevronRight, Pencil, FileText, ArrowRight, Trash2 } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Deal {
  id: string;
  title: string;
  hospital: string;
  amount: number;
  probability: number;
  expectedCloseDate: string;
  tags: string[];
}

interface Stage {
  id: string;
  name: string;
  deals: Deal[];
}

const INITIAL_STAGES: Stage[] = [
  {
    id: "lead",
    name: "Lead",
    deals: [
      {
        id: "deal1",
        title: "Cardiovascular Equipment Bundle",
        hospital: "Apollo Hospitals, Mumbai",
        amount: 4500000,
        probability: 20,
        expectedCloseDate: "2024-03-15",
        tags: ["Equipment", "High Value"]
      },
      {
        id: "deal2",
        title: "Diagnostic Lab Setup",
        hospital: "Max Healthcare, Delhi",
        amount: 2800000,
        probability: 30,
        expectedCloseDate: "2024-02-28",
        tags: ["Lab", "New Setup"]
      }
    ]
  },
  {
    id: "qualification",
    name: "Qualification",
    deals: [
      {
        id: "deal3",
        title: "Surgical Tools Package",
        hospital: "Fortis Hospital, Bangalore",
        amount: 1500000,
        probability: 50,
        expectedCloseDate: "2024-02-10",
        tags: ["Surgery", "Tools"]
      }
    ]
  },
  {
    id: "proposal",
    name: "Proposal",
    deals: [
      {
        id: "deal4",
        title: "ICU Modernization Project",
        hospital: "Medanta Hospital, Gurugram",
        amount: 7500000,
        probability: 70,
        expectedCloseDate: "2024-01-30",
        tags: ["ICU", "High Value"]
      }
    ]
  },
  {
    id: "negotiation",
    name: "Negotiation",
    deals: [
      {
        id: "deal5",
        title: "Radiology Department Upgrade",
        hospital: "Narayana Health, Bangalore",
        amount: 5200000,
        probability: 85,
        expectedCloseDate: "2024-01-15",
        tags: ["Radiology", "Upgrade"]
      }
    ]
  },
  {
    id: "closed",
    name: "Closed Won",
    deals: [
      {
        id: "deal6",
        title: "Emergency Room Equipment",
        hospital: "AIIMS Delhi",
        amount: 3800000,
        probability: 100,
        expectedCloseDate: "2024-01-05",
        tags: ["Emergency", "Equipment"]
      }
    ]
  }
];

export function SalesPipeline() {
  const [stages, setStages] = useState<Stage[]>(INITIAL_STAGES);

  const handleDragStart = (e: React.DragEvent, dealId: string, sourceStageId: string) => {
    e.dataTransfer.setData("dealId", dealId);
    e.dataTransfer.setData("sourceStageId", sourceStageId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetStageId: string) => {
    e.preventDefault();
    const dealId = e.dataTransfer.getData("dealId");
    const sourceStageId = e.dataTransfer.getData("sourceStageId");

    if (sourceStageId === targetStageId) return;
    moveDealToStage(dealId, sourceStageId, targetStageId);
  };

  const getTotalValue = (deals: Deal[]) => {
    return deals.reduce((sum, deal) => sum + deal.amount, 0);
  };

  const moveDealToStage = (dealId: string, sourceStageId: string, targetStageId: string) => {
    setStages(prevStages => {
      const newStages = [...prevStages];
      
      // Find source and target stages
      const sourceStage = newStages.find(s => s.id === sourceStageId)!;
      const targetStage = newStages.find(s => s.id === targetStageId)!;
      
      // Find the deal and remove it from source
      const dealIndex = sourceStage.deals.findIndex(d => d.id === dealId);
      const [deal] = sourceStage.deals.splice(dealIndex, 1);
      
      // Add deal to target
      targetStage.deals.push(deal);
      
      return newStages;
    });
  };

  const handleEditDeal = (deal: Deal) => {
    // TODO: Implement edit deal functionality
    console.log("Edit deal:", deal);
  };

  const handleCreateProposal = (deal: Deal) => {
    // TODO: Implement create proposal functionality
    console.log("Create proposal for deal:", deal);
  };

  const handleDeleteDeal = (dealId: string, stageId: string) => {
    setStages(prevStages => {
      return prevStages.map(stage => {
        if (stage.id === stageId) {
          return {
            ...stage,
            deals: stage.deals.filter(d => d.id !== dealId)
          };
        }
        return stage;
      });
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)]">
      <div className="flex justify-between items-center p-4 md:p-8 pb-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Sales Pipeline</h1>
          <p className="text-muted-foreground">
            Track and manage your deals through the sales process
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Deal
        </Button>
      </div>

      <div className="flex-1 overflow-hidden p-4 md:p-8">
        <ScrollArea className="h-full rounded-lg border bg-card">
          <div className="flex gap-4 p-4">
            {stages.map(stage => (
              <div
                key={stage.id}
                className="flex-shrink-0 w-[300px] md:w-[320px]"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, stage.id)}
              >
                <div className="flex justify-between items-center mb-3 sticky top-0 bg-card p-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{stage.name}</h3>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      ₹{getTotalValue(stage.deals).toLocaleString()} • {stage.deals.length} deals
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {stage.deals.map(deal => (
                    <Card
                      key={deal.id}
                      className={cn(
                        "p-3 cursor-move transition-colors duration-200",
                        "hover:border-primary/50 active:border-primary"
                      )}
                      draggable
                      onDragStart={(e) => handleDragStart(e, deal.id, stage.id)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium line-clamp-2">{deal.title}</h4>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8 -mt-1.5 -mr-1.5">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem onClick={() => handleEditDeal(deal)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit Deal
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleCreateProposal(deal)}>
                              <FileText className="mr-2 h-4 w-4" />
                              Create Proposal
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuSub>
                              <DropdownMenuSubTrigger>
                                <ArrowRight className="mr-2 h-4 w-4" />
                                Move to Stage
                              </DropdownMenuSubTrigger>
                              <DropdownMenuSubContent>
                                {stages
                                  .filter(s => s.id !== stage.id)
                                  .map(targetStage => (
                                    <DropdownMenuItem
                                      key={targetStage.id}
                                      onClick={() => moveDealToStage(deal.id, stage.id, targetStage.id)}
                                    >
                                      {targetStage.name}
                                    </DropdownMenuItem>
                                  ))}
                              </DropdownMenuSubContent>
                            </DropdownMenuSub>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => handleDeleteDeal(deal.id, stage.id)}
                              className="text-red-600 focus:text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Deal
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2 line-clamp-1">{deal.hospital}</p>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">
                          ₹{deal.amount.toLocaleString()}
                        </span>
                        <Badge variant={deal.probability >= 70 ? "default" : "secondary"}>
                          {deal.probability}%
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {deal.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </div>
  );
}
