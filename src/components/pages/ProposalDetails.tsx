import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Proposal, ProposalHistory } from "@/types/proposal";
import { proposalService } from "@/services/proposalService";
import { formatCurrency } from "@/utils/formatters";

export function ProposalDetails() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [history, setHistory] = useState<ProposalHistory[]>([]);

  useEffect(() => {
    if (id) {
      loadProposal(id);
      loadHistory(id);
    }
  }, [id]);

  const loadProposal = async (proposalId: string) => {
    const data = await proposalService.getProposal(proposalId);
    setProposal(data);
  };

  const loadHistory = async (proposalId: string) => {
    const data = await proposalService.getProposalHistory(proposalId);
    setHistory(data);
  };

  if (!proposal) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">
            {proposal.number} - {proposal.customer.name}
          </h1>
          <Badge className="mr-2">{proposal.status}</Badge>
          <span className="text-gray-500">
            Created on {new Date(proposal.createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="space-x-2">
          <Button variant="outline" onClick={() => navigate("/proposals")}>
            Back
          </Button>
          <Button onClick={() => navigate(`/proposals/${id}/edit`)}>
            Edit Proposal
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Customer Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 cursor-pointer hover:bg-gray-50 p-3 rounded-md transition-colors" 
                 onClick={() => navigate(`/customers/${proposal.customerId}`)}>
              <p className="font-medium text-blue-600 hover:text-blue-800">{proposal.customer.name}</p>
              <p className="text-gray-600">{proposal.customer.email}</p>
              <p className="text-gray-600">{proposal.customer.phone}</p>
              <p className="text-sm text-gray-500">{proposal.customer.address}</p>
              <p className="text-sm text-blue-600 mt-2">View Customer Details →</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Proposal Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{formatCurrency(proposal.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>{formatCurrency(proposal.tax)}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount:</span>
                <span>-{formatCurrency(proposal.discount)}</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>{formatCurrency(proposal.total)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Terms & Conditions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div>
                <p className="font-medium">Payment Terms</p>
                <p className="text-sm">{proposal.terms.paymentTerms}</p>
              </div>
              <div>
                <p className="font-medium">Delivery Terms</p>
                <p className="text-sm">{proposal.terms.deliveryTerms}</p>
              </div>
              <div>
                <p className="font-medium">Validity</p>
                <p className="text-sm">{proposal.terms.validity} days</p>
              </div>
              <div>
                <p className="font-medium">Warranty</p>
                <p className="text-sm">{proposal.terms.warranty}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Products</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Unit Price</TableHead>
                <TableHead>Discount</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {proposal.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.product.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{formatCurrency(item.unitPrice)}</TableCell>
                  <TableCell>{formatCurrency(item.discount)}</TableCell>
                  <TableCell>{formatCurrency(item.total)}</TableCell>
                  <TableCell>{item.notes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>History</CardTitle>
          <CardDescription>Track all activities related to this proposal</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {history.map((entry) => (
              <div key={entry.id} className="flex items-start space-x-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500" />
                <div>
                  <p className="font-medium">
                    {entry.action} by {entry.performedBy}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(entry.performedAt).toLocaleString()}
                  </p>
                  <p className="text-sm">{entry.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
