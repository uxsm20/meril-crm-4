export type DealStage = 'Lead' | 'Qualified' | 'Proposal' | 'Negotiation' | 'Closed Won' | 'Closed Lost';

export interface Deal {
  id: string;
  title: string;
  customerId: string;
  customerName: string;
  value: number;
  stage: DealStage;
  probability: number;
  expectedCloseDate: string;
  owner: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Activity {
  id: string;
  dealId: string;
  type: 'Call' | 'Meeting' | 'Email' | 'Task' | 'Note';
  title: string;
  date: string;
  notes: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Proposal {
  id: string;
  dealId: string;
  version: string;
  status: 'Draft' | 'Sent' | 'Accepted' | 'Rejected';
  content: string;
  createdBy: string;
  createdAt: string;
  lastModified: string;
}

export interface DealFile {
  id: string;
  dealId: string;
  name: string;
  type: string;
  size: number;
  url: string;
  uploadedBy: string;
  uploadedAt: string;
}
