import { Product } from "./product";
import { Customer } from "./customer";

export type ProposalStatus = 
  | "Draft"
  | "Pending Review"
  | "Sent"
  | "Under Negotiation"
  | "Accepted"
  | "Rejected"
  | "Expired";

export interface ProposalItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  unitPrice: number;
  discount: number;
  total: number;
  notes?: string;
}

export interface ProposalTerms {
  paymentTerms: string;
  deliveryTerms: string;
  validity: number; // days
  warranty: string;
  additionalTerms?: string;
}

export interface Proposal {
  id: string;
  number: string; // PRO-2024-001
  customerId: string;
  customer: Customer;
  status: ProposalStatus;
  items: ProposalItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  terms: ProposalTerms;
  notes?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  validUntil: string;
  sentAt?: string;
  acceptedAt?: string;
  rejectedAt?: string;
}

export interface ProposalHistory {
  id: string;
  proposalId: string;
  action: "Created" | "Updated" | "Sent" | "Viewed" | "Accepted" | "Rejected" | "Revised";
  description: string;
  performedBy: string;
  performedAt: string;
}

export interface ProposalTemplate {
  id: string;
  name: string;
  description: string;
  terms: ProposalTerms;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}
