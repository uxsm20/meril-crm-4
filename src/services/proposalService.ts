import { Proposal, ProposalHistory, ProposalStatus, ProposalTemplate } from "../types/proposal";
import { customerService } from "./customerService";
import { productService } from "./productService";

// Base mock data without resolved references
const mockProposalsBase = [
  {
    id: "1",
    number: "PRO-2024-001",
    customerId: "1", // Apollo Hospitals
    status: "Sent",
    items: [
      {
        id: "1",
        productId: "3", // Guardian TAVR System
        quantity: 2,
        unitPrice: 800000,
        discount: 50000,
        total: 1500000,
        notes: "Includes training and implementation support"
      },
      {
        id: "2",
        productId: "11", // UltraVision Echo
        quantity: 1,
        unitPrice: 3500000,
        discount: 200000,
        total: 3300000,
        notes: "Extended warranty package included"
      }
    ],
    subtotal: 4800000,
    tax: 864000, // 18% GST
    discount: 250000,
    total: 5414000,
    terms: {
      paymentTerms: "50% advance, 50% on delivery",
      deliveryTerms: "8-10 weeks from order confirmation",
      validity: 30,
      warranty: "2 years comprehensive warranty with extended support options",
      additionalTerms: "Installation and initial training included"
    },
    notes: "Proposal for Cardiology Department expansion",
    createdBy: "John Smith",
    createdAt: "2024-01-15T09:00:00Z",
    updatedAt: "2024-01-15T09:00:00Z",
    validUntil: "2024-02-14T09:00:00Z",
    sentAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "2",
    number: "PRO-2024-002",
    customerId: "2", // Fortis Healthcare
    status: "Under Negotiation",
    items: [
      {
        id: "1",
        productId: "1", // Mozec DES
        quantity: 50,
        unitPrice: 25000,
        discount: 2000,
        total: 1150000,
        notes: "Bulk order discount applied"
      },
      {
        id: "2",
        productId: "6", // Mozec NC Balloon
        quantity: 30,
        unitPrice: 8000,
        discount: 500,
        total: 225000,
        notes: "Compatible with Mozec DES"
      }
    ],
    subtotal: 1375000,
    tax: 247500, // 18% GST
    discount: 75000,
    total: 1547500,
    terms: {
      paymentTerms: "Net 30 days",
      deliveryTerms: "4-5 weeks from order confirmation",
      validity: 45,
      warranty: "1 year standard warranty",
      additionalTerms: "Quarterly supply schedule"
    },
    notes: "Annual supply contract for Cath Lab",
    createdBy: "Sarah Johnson",
    createdAt: "2024-01-16T11:00:00Z",
    updatedAt: "2024-01-17T14:30:00Z",
    validUntil: "2024-03-02T11:00:00Z",
    sentAt: "2024-01-16T12:00:00Z"
  },
  {
    id: "3",
    number: "PRO-2024-003",
    customerId: "3", // Narayana Health
    status: "Draft",
    items: [
      {
        id: "1",
        productId: "10", // MeriVision CT Scanner
        quantity: 1,
        unitPrice: 15000000,
        discount: 1000000,
        total: 14000000,
        notes: "Includes 5-year service contract"
      }
    ],
    subtotal: 14000000,
    tax: 2520000, // 18% GST
    discount: 1000000,
    total: 15520000,
    terms: {
      paymentTerms: "30% advance, 40% on delivery, 30% after installation",
      deliveryTerms: "12-14 weeks from order confirmation",
      validity: 60,
      warranty: "5 years comprehensive warranty",
      additionalTerms: "Installation, training, and 5-year service contract included"
    },
    notes: "Radiology department upgrade proposal",
    createdBy: "Michael Chen",
    createdAt: "2024-01-17T15:00:00Z",
    updatedAt: "2024-01-17T15:00:00Z",
    validUntil: "2024-03-17T15:00:00Z"
  }
];

const mockHistory: ProposalHistory[] = [
  {
    id: "1",
    proposalId: "1",
    action: "Created",
    description: "Proposal created",
    performedBy: "John Smith",
    performedAt: "2024-01-15T09:00:00Z"
  },
  {
    id: "2",
    proposalId: "1",
    action: "Sent",
    description: "Proposal sent to customer",
    performedBy: "John Smith",
    performedAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "3",
    proposalId: "1",
    action: "Viewed",
    description: "Proposal viewed by customer",
    performedBy: "Dr. Priya Sharma",
    performedAt: "2024-01-16T11:45:00Z"
  }
];

const mockTemplates: ProposalTemplate[] = [
  {
    id: "1",
    name: "Standard Medical Equipment",
    description: "Standard terms for medical equipment sales",
    terms: {
      paymentTerms: "50% advance, 50% on delivery",
      deliveryTerms: "8-10 weeks from order confirmation",
      validity: 30,
      warranty: "2 years comprehensive warranty",
      additionalTerms: "Installation and basic training included"
    },
    createdBy: "John Smith",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "2",
    name: "Consumables Supply Contract",
    description: "Terms for recurring consumables supply",
    terms: {
      paymentTerms: "Net 30 days",
      deliveryTerms: "4-5 weeks from order confirmation",
      validity: 45,
      warranty: "1 year standard warranty",
      additionalTerms: "Quarterly supply schedule available"
    },
    createdBy: "Sarah Johnson",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  }
];

class ProposalService {
  private proposals = mockProposalsBase;
  private history: ProposalHistory[] = mockHistory;
  private templates: ProposalTemplate[] = mockTemplates;

  async getProposals(): Promise<Proposal[]> {
    // Resolve customer and product references
    const resolvedProposals = await Promise.all(
      this.proposals.map(async (proposal) => {
        const customer = await customerService.getCustomer(proposal.customerId);
        const items = await Promise.all(
          proposal.items.map(async (item) => {
            const product = await productService.getProduct(item.productId);
            return { ...item, product };
          })
        );
        return { ...proposal, customer, items };
      })
    );
    return resolvedProposals;
  }

  async getProposal(id: string): Promise<Proposal | null> {
    const proposal = this.proposals.find((p) => p.id === id);
    if (!proposal) return null;

    const customer = await customerService.getCustomer(proposal.customerId);
    const items = await Promise.all(
      proposal.items.map(async (item) => {
        const product = await productService.getProduct(item.productId);
        return { ...item, product };
      })
    );
    return { ...proposal, customer, items };
  }

  async getProposalsByCustomer(customerId: string): Promise<Proposal[]> {
    const proposals = await this.getProposals();
    return proposals.filter((p) => p.customerId === customerId);
  }

  async getProposalsByStatus(status: ProposalStatus): Promise<Proposal[]> {
    const proposals = await this.getProposals();
    return proposals.filter((p) => p.status === status);
  }

  async createProposal(proposal: Omit<Proposal, "id" | "number">): Promise<Proposal> {
    const newProposal: Proposal = {
      ...proposal,
      id: (this.proposals.length + 1).toString(),
      number: `PRO-2024-${(this.proposals.length + 1).toString().padStart(3, "0")}`,
    };

    this.proposals.push(newProposal);

    this.addHistory(newProposal.id, {
      action: "Created",
      description: "Proposal created",
      performedBy: proposal.createdBy,
    });

    return newProposal;
  }

  async updateProposal(id: string, proposal: Partial<Proposal>): Promise<Proposal | null> {
    const index = this.proposals.findIndex((p) => p.id === id);
    if (index === -1) return null;

    this.proposals[index] = {
      ...this.proposals[index],
      ...proposal,
      updatedAt: new Date().toISOString(),
    };

    this.addHistory(id, {
      action: "Updated",
      description: "Proposal updated",
      performedBy: proposal.createdBy || "System",
    });

    return this.proposals[index];
  }

  async getProposalHistory(proposalId: string): Promise<ProposalHistory[]> {
    return this.history.filter((h) => h.proposalId === proposalId);
  }

  private addHistory(proposalId: string, history: Omit<ProposalHistory, "id" | "proposalId" | "performedAt">) {
    const newHistory: ProposalHistory = {
      id: (this.history.length + 1).toString(),
      proposalId,
      ...history,
      performedAt: new Date().toISOString(),
    };

    this.history.push(newHistory);
  }

  async getTemplates(): Promise<ProposalTemplate[]> {
    return this.templates;
  }

  async getTemplate(id: string): Promise<ProposalTemplate | null> {
    return this.templates.find((t) => t.id === id) || null;
  }
}

export const proposalService = new ProposalService();
