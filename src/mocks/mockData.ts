import { Deal, Activity, Proposal, DealFile } from '../types/deal';

export const mockDeal: Deal = {
  id: '1',
  customerId: '1',
  title: 'Sample Deal',
  value: 50000,
  status: 'In Progress',
  probability: 75,
  expectedClosingDate: new Date().toISOString(),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  description: 'This is a sample deal for development purposes',
};

export const mockActivities: Activity[] = [
  {
    id: '1',
    dealId: '1',
    type: 'CALL',
    title: 'Initial Call',
    description: 'First contact with the customer',
    date: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const mockProposals: Proposal[] = [
  {
    id: '1',
    dealId: '1',
    title: 'Initial Proposal',
    content: 'Sample proposal content',
    status: 'DRAFT',
    createdAt: new Date().toISOString(),
    lastModified: new Date().toISOString(),
  },
];

export const mockFiles: DealFile[] = [
  {
    id: '1',
    dealId: '1',
    name: 'sample.pdf',
    size: 1024,
    type: 'application/pdf',
    url: 'https://example.com/sample.pdf',
    uploadedAt: new Date().toISOString(),
  },
];
