import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DealsListProps {
  customerId?: string;
}

export function DealsList({ customerId }: DealsListProps) {
  const navigate = useNavigate();
  
  // TODO: Replace with actual data fetching
  const deals = [
    {
      id: "1",
      title: "Cardiovascular Equipment Bundle",
      stage: "Proposal",
      amount: 4500000,
      probability: 70,
      expectedCloseDate: "2024-03-15",
      lastUpdated: "2023-12-10",
    },
    {
      id: "2",
      title: "Diagnostic Lab Setup",
      stage: "Qualification",
      amount: 2800000,
      probability: 30,
      expectedCloseDate: "2024-02-28",
      lastUpdated: "2023-12-08",
    },
  ];

  const handleViewDeal = (dealId: string) => {
    navigate(`/customers/${customerId}/deals/${dealId}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Deals</h3>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Deal
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Deal</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Probability</TableHead>
              <TableHead>Expected Close</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deals.map((deal) => (
              <TableRow 
                key={deal.id} 
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleViewDeal(deal.id)}
              >
                <TableCell className="font-medium">{deal.title}</TableCell>
                <TableCell>
                  <Badge variant="outline">{deal.stage}</Badge>
                </TableCell>
                <TableCell>₹{deal.amount.toLocaleString()}</TableCell>
                <TableCell>
                  <Badge variant={deal.probability >= 70 ? "default" : "secondary"}>
                    {deal.probability}%
                  </Badge>
                </TableCell>
                <TableCell>{deal.expectedCloseDate}</TableCell>
                <TableCell>{deal.lastUpdated}</TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewDeal(deal.id)}>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>Edit Deal</DropdownMenuItem>
                      <DropdownMenuItem>Create Proposal</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Delete Deal
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
