import { Deal, Activity, Proposal, DealFile } from '../types/deal';

// Mock data for development
const mockDeals: Deal[] = [
  {
    id: "1",
    title: "Cardiovascular Equipment Bundle",
    customerId: "1",
    customerName: "Apollo Hospitals, Mumbai",
    value: 4500000,
    stage: "Lead",
    probability: 20,
    expectedCloseDate: "2024-03-15",
    owner: "John Doe",
    description: "Complete cardiovascular equipment bundle including ECG machines and monitors",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "2",
    title: "Diagnostic Lab Setup",
    customerId: "2",
    customerName: "Max Healthcare, Delhi",
    value: 2800000,
    stage: "Qualified",
    probability: 40,
    expectedCloseDate: "2024-02-28",
    owner: "John Doe",
    description: "Full diagnostic lab setup with latest equipment",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "3",
    title: "ICU Modernization Project",
    customerId: "3",
    customerName: "Fortis Hospital, Bangalore",
    value: 7500000,
    stage: "Proposal",
    probability: 60,
    expectedCloseDate: "2024-01-30",
    owner: "John Doe",
    description: "Complete ICU modernization with latest equipment",
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  }
];

// For development, we'll use mock data
// TODO: Replace with actual API calls when backend is ready
export const dealService = {
  // Deals
  getDeals(): Promise<Deal[]> {
    return Promise.resolve(mockDeals);
  },

  getDeal(dealId: string): Promise<Deal> {
    const deal = mockDeals.find(d => d.id === dealId);
    return deal ? Promise.resolve(deal) : Promise.reject(new Error('Deal not found'));
  },

  createDeal(data: Omit<Deal, 'id' | 'createdAt' | 'updatedAt'>): Promise<Deal> {
    const newDeal: Deal = {
      ...data,
      id: (mockDeals.length + 1).toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockDeals.push(newDeal);
    return Promise.resolve(newDeal);
  },

  updateDeal(dealId: string, data: Partial<Deal>): Promise<Deal> {
    const index = mockDeals.findIndex(d => d.id === dealId);
    if (index === -1) {
      return Promise.reject(new Error('Deal not found'));
    }
    const updatedDeal = {
      ...mockDeals[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    mockDeals[index] = updatedDeal;
    return Promise.resolve(updatedDeal);
  },

  deleteDeal(dealId: string): Promise<void> {
    const index = mockDeals.findIndex(d => d.id === dealId);
    if (index === -1) {
      return Promise.reject(new Error('Deal not found'));
    }
    mockDeals.splice(index, 1);
    return Promise.resolve();
  },

  // Activities
  getActivities(dealId: string): Promise<Activity[]> {
    return Promise.resolve([]);
  },

  createActivity(dealId: string, data: Omit<Activity, 'id' | 'createdAt' | 'updatedAt'>): Promise<Activity> {
    const newActivity: Activity = {
      ...data,
      id: Math.random().toString(36).substring(7),
      dealId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return Promise.resolve(newActivity);
  },

  // Proposals
  getProposals(dealId: string): Promise<Proposal[]> {
    return Promise.resolve([]);
  },

  createProposal(dealId: string, data: Omit<Proposal, 'id' | 'createdAt' | 'lastModified'>): Promise<Proposal> {
    const newProposal: Proposal = {
      ...data,
      id: Math.random().toString(36).substring(7),
      dealId,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
    };
    return Promise.resolve(newProposal);
  },

  // Files
  getFiles(dealId: string): Promise<DealFile[]> {
    return Promise.resolve([]);
  },

  uploadFile(dealId: string, file: File): Promise<DealFile> {
    const newFile: DealFile = {
      id: Math.random().toString(36).substring(7),
      dealId,
      name: file.name,
      type: file.type,
      size: file.size,
      url: URL.createObjectURL(file),
      uploadedBy: "John Doe", // TODO: Get from auth context
      uploadedAt: new Date().toISOString(),
    };
    return Promise.resolve(newFile);
  },

  deleteFile(dealId: string, fileId: string): Promise<void> {
    return Promise.resolve();
  },
};
