import { useState, useMemo } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { Deal, DealStage } from "../../types/deal";
import { formatCurrency, formatDate } from "../../utils";
import { Button } from "../ui/button";
import { ChevronRight, ArrowRight, MoreHorizontal, Calendar, IndianRupee, Users } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { ScrollArea } from "../ui/scroll-area";
import { DealDetails } from "./DealDetails";

const STAGE_CONFIG: Record<DealStage, { label: string; color: string }> = {
  'Lead': { label: 'Lead', color: 'bg-slate-100' },
  'Qualified': { label: 'Qualified', color: 'bg-blue-100' },
  'Proposal': { label: 'Proposal', color: 'bg-purple-100' },
  'Negotiation': { label: 'Negotiation', color: 'bg-amber-100' },
  'Closed Won': { label: 'Closed Won', color: 'bg-green-100' },
  'Closed Lost': { label: 'Closed Lost', color: 'bg-red-100' }
};

interface DealCardProps {
  deal: Deal;
  onStageChange: (dealId: string, newStage: DealStage) => void;
  onEdit?: (deal: Deal) => void;
  onDelete?: (dealId: string) => void;
  onClick?: (deal: Deal) => void;
}

function DealCard({ deal, onStageChange, onEdit, onDelete, onClick }: DealCardProps) {
  const handleClick = (e: React.MouseEvent) => {
    // Only trigger click when not clicking on dropdown or its children
    if ((e.target as HTMLElement).closest('[data-prevent-click="true"]')) {
      return;
    }
    onClick?.(deal);
  };

  return (
    <Card 
      className="p-4 mb-3 hover:shadow-md transition-shadow cursor-pointer" 
      onClick={handleClick}
    >
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold">{deal.title}</h4>
        <div className="flex gap-2" data-prevent-click="true">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {Object.keys(STAGE_CONFIG).map((stage) => (
                stage !== deal.stage && (
                  <DropdownMenuItem
                    key={stage}
                    onClick={() => onStageChange(deal.id, stage as DealStage)}
                  >
                    Move to {STAGE_CONFIG[stage as DealStage].label}
                  </DropdownMenuItem>
                )
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{deal.customerName}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <IndianRupee className="h-4 w-4" />
          <span>{formatCurrency(deal.value)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span>Close: {formatDate(deal.expectedCloseDate)}</span>
        </div>
        <Badge variant="secondary">{deal.probability}% Probability</Badge>
      </div>
    </Card>
  );
}

interface DealPipelineProps {
  deals: Deal[];
  onDealMove: (dealId: string, newStage: DealStage) => void;
  onEditDeal?: (deal: Deal) => void;
  onDeleteDeal?: (dealId: string) => void;
}

type SortOption = 'value' | 'probability' | 'date';

export function DealPipeline({ deals, onDealMove, onEditDeal, onDeleteDeal }: DealPipelineProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>('value');
  const [selectedDeal, setSelectedDeal] = useState<Deal | undefined>();

  const filteredAndSortedDeals = useMemo(() => {
    let result = deals;

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        deal =>
          deal.title.toLowerCase().includes(query) ||
          deal.customerName.toLowerCase().includes(query)
      );
    }

    // Sort deals
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'value':
          return b.value - a.value;
        case 'probability':
          return b.probability - a.probability;
        case 'date':
          return new Date(a.expectedCloseDate).getTime() - new Date(b.expectedCloseDate).getTime();
        default:
          return 0;
      }
    });

    return result;
  }, [deals, searchQuery, sortBy]);

  const stageStats = useMemo(() => {
    const stats = Object.keys(STAGE_CONFIG).reduce((acc, stage) => {
      const stageDeals = filteredAndSortedDeals.filter(d => d.stage === stage);
      acc[stage as DealStage] = {
        count: stageDeals.length,
        value: stageDeals.reduce((sum, deal) => sum + deal.value, 0),
      };
      return acc;
    }, {} as Record<DealStage, { count: number; value: number }>);
    return stats;
  }, [filteredAndSortedDeals]);

  return (
    <div className="space-y-4">
      <div className="flex gap-4 items-center">
        <div className="flex-1">
          <Input
            placeholder="Search deals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="value">Sort by Value</SelectItem>
            <SelectItem value="probability">Sort by Probability</SelectItem>
            <SelectItem value="date">Sort by Close Date</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-6 gap-4">
        {(Object.keys(STAGE_CONFIG) as DealStage[]).map((stage) => (
          <div key={stage} className={cn("rounded-lg p-4", STAGE_CONFIG[stage].color)}>
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-semibold">{STAGE_CONFIG[stage].label}</h3>
                <p className="text-sm text-muted-foreground">
                  {stageStats[stage].count} deals · {formatCurrency(stageStats[stage].value)}
                </p>
              </div>
            </div>
            <ScrollArea className="h-[calc(100vh-300px)]">
              {filteredAndSortedDeals
                .filter((deal) => deal.stage === stage)
                .map((deal) => (
                  <DealCard
                    key={deal.id}
                    deal={deal}
                    onStageChange={onDealMove}
                    onEdit={onEditDeal}
                    onDelete={onDeleteDeal}
                    onClick={setSelectedDeal}
                  />
                ))}
            </ScrollArea>
          </div>
        ))}
      </div>

      {selectedDeal && (
        <DealDetails
          deal={selectedDeal}
          onClose={() => setSelectedDeal(undefined)}
          onEdit={onEditDeal || (() => {})}
          onDelete={onDeleteDeal || (() => {})}
        />
      )}
    </div>
  );
}
