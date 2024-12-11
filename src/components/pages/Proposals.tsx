import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Building2, IndianRupee } from "lucide-react";
import { ProposalBuilder } from "./ProposalBuilder";
import { ProposalTemplateSelector } from "@/components/proposals/ProposalTemplateSelector";

const PROPOSALS = [
  {
    id: "PROP-001",
    title: "Cardiovascular Equipment Bundle",
    hospital: "Apollo Hospitals, Mumbai",
    contact: "Dr. Rajesh Mehta",
    amount: 4500000,
    status: "Pending",
    lastUpdated: "2024-01-15",
    description: "Comprehensive cardiovascular equipment package including monitors, ECG machines, and specialized surgical tools.",
    products: [
      {
        id: "1",
        name: "Cardiovascular Monitor",
        subcategory: "Monitoring",
        quantity: 2,
        price: 1500000
      },
      {
        id: "2",
        name: "ECG Machine",
        subcategory: "Diagnostics",
        quantity: 3,
        price: 500000
      }
    ]
  },
  {
    id: "PROP-002",
    title: "Orthopedic Surgical Tools",
    hospital: "Fortis Hospital, Bangalore",
    contact: "Dr. Anjali Desai",
    amount: 2800000,
    status: "Approved",
    lastUpdated: "2024-01-12",
    description: "Complete set of orthopedic surgical instruments and implants for the orthopedic department.",
    products: [
      {
        id: "3",
        name: "Surgical Tool Set",
        subcategory: "Surgery",
        quantity: 1,
        price: 1800000
      },
      {
        id: "4",
        name: "Implant Kit",
        subcategory: "Orthopedics",
        quantity: 2,
        price: 500000
      }
    ]
  },
  {
    id: "PROP-003",
    title: "Diagnostic Equipment Suite",
    hospital: "Lilavati Hospital, Mumbai",
    contact: "Dr. Suresh Kumar",
    amount: 3200000,
    status: "Draft",
    lastUpdated: "2024-01-10",
    description: "Modern diagnostic equipment suite including imaging systems and laboratory equipment.",
    products: [
      {
        id: "5",
        name: "X-Ray System",
        subcategory: "Imaging",
        quantity: 1,
        price: 2000000
      },
      {
        id: "6",
        name: "Lab Analyzer",
        subcategory: "Laboratory",
        quantity: 2,
        price: 600000
      }
    ]
  },
] as const;

const STATUS_STYLES = {
  Pending: "bg-yellow-500/10 text-yellow-500",
  Approved: "bg-green-500/10 text-green-500",
  Draft: "bg-blue-500/10 text-blue-500",
} as const;

export function Proposals() {
  const [isTemplateSelectorOpen, setIsTemplateSelectorOpen] = useState(false);
  const [showBuilder, setShowBuilder] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
  const [selectedProposal, setSelectedProposal] = useState<typeof PROPOSALS[0] | null>(null);

  const handleCreateNewProposal = () => {
    setIsTemplateSelectorOpen(true);
  };

  const handleCreateBlankProposal = () => {
    setIsTemplateSelectorOpen(false);
    setSelectedTemplate(null);
    setShowBuilder(true);
  };

  const handleTemplateSelect = (template: any) => {
    setIsTemplateSelectorOpen(false);
    setSelectedTemplate(template);
    setShowBuilder(true);
  };

  const handleRowClick = (proposal: typeof PROPOSALS[0]) => {
    setSelectedProposal(proposal);
    setShowBuilder(true);
  };

  if (showBuilder) {
    return (
      <ProposalBuilder
        preselectedTemplate={selectedTemplate}
        preselectedProposal={selectedProposal}
        onBack={() => {
          setShowBuilder(false);
          setSelectedTemplate(null);
          setSelectedProposal(null);
        }}
      />
    );
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Proposals</h2>
        <Button onClick={handleCreateNewProposal}>
          Create New Proposal
        </Button>
      </div>

      <ProposalTemplateSelector 
        isOpen={isTemplateSelectorOpen}
        onClose={() => setIsTemplateSelectorOpen(false)}
        onSelectTemplate={handleTemplateSelect}
        onCreateNew={handleCreateBlankProposal}
      />
      
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-muted-foreground">
            Manage your sales proposals and quotations
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search proposals..."
            className="pl-9"
          />
        </div>
      </div>

      <div className="rounded-lg border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Details</TableHead>
              <TableHead>Hospital</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {PROPOSALS.map((proposal) => (
              <TableRow 
                key={proposal.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleRowClick(proposal)}
              >
                <TableCell>
                  <div className="space-y-1">
                    <p className="font-medium">{proposal.title}</p>
                    <p className="text-sm text-muted-foreground">{proposal.id}</p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <div className="space-y-1">
                      <p className="text-sm">{proposal.hospital}</p>
                      <p className="text-xs text-muted-foreground">{proposal.contact}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <IndianRupee className="h-3 w-3" />
                    <span>{(proposal.amount / 100000).toFixed(2)}L</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className={STATUS_STYLES[proposal.status]}>
                    {proposal.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <time className="text-sm text-muted-foreground">
                    {new Date(proposal.lastUpdated).toLocaleDateString()}
                  </time>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}