export type CustomerType = "Hospital" | "Clinic" | "Laboratory";
export type CustomerSegment = "Enterprise" | "Mid-Market" | "Small Business";

export interface Customer {
  id: string;
  name: string;
  type: CustomerType;
  email: string;
  phone: string;
  address: string;
  segment: CustomerSegment;
  healthScore: number;
  totalRevenue: number;
  activeDeals: number;
  lastContact: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerActivity {
  id: string;
  customerId: string;
  type: "Call" | "Email" | "Meeting" | "Note";
  title: string;
  description: string;
  date: string;
  createdBy: string;
  createdAt: string;
}

export interface CustomerDocument {
  id: string;
  customerId: string;
  name: string;
  type: string;
  size: number;
  url: string;
  category: "Contract" | "Proposal" | "Invoice" | "Other";
  uploadedBy: string;
  uploadedAt: string;
}

export interface CustomerMetrics {
  totalPurchases: number;
  averageOrderValue: number;
  lifetimeValue: number;
  openDealsValue: number;
  lastPurchaseDate: string;
  purchaseFrequency: number;
  paymentHistory: {
    onTime: number;
    late: number;
    total: number;
  };
}
