import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Proposal, ProposalStatus } from "@/types/proposal";
import { proposalService } from "@/services/proposalService";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "@/utils/formatters";

const statusColorMap: Record<ProposalStatus, string> = {
  "Draft": "bg-gray-500",
  "Pending Review": "bg-yellow-500",
  "Sent": "bg-blue-500",
  "Under Negotiation": "bg-purple-500",
  "Accepted": "bg-green-500",
  "Rejected": "bg-red-500",
  "Expired": "bg-gray-700",
};

export function ProposalList() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadProposals();
  }, []);

  const loadProposals = async () => {
    const data = await proposalService.getProposals();
    setProposals(data);
  };

  const handleRowClick = (id: string) => {
    navigate(`/proposals/${id}`);
  };

  const handleCreateProposal = () => {
    navigate("/proposals/new");
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Proposals</h1>
        <Button onClick={handleCreateProposal}>Create Proposal</Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Number</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total Value</TableHead>
              <TableHead>Created Date</TableHead>
              <TableHead>Valid Until</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {proposals.map((proposal) => (
              <TableRow
                key={proposal.id}
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => handleRowClick(proposal.id)}
              >
                <TableCell>{proposal.number}</TableCell>
                <TableCell>{proposal.customer.name}</TableCell>
                <TableCell>
                  <Badge className={statusColorMap[proposal.status]}>
                    {proposal.status}
                  </Badge>
                </TableCell>
                <TableCell>{formatCurrency(proposal.total)}</TableCell>
                <TableCell>
                  {new Date(proposal.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(proposal.validUntil).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
