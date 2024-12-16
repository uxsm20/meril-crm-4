import { Deal, Activity, Proposal, DealFile } from '../types/deal';
import { mockDeal, mockActivities, mockProposals, mockFiles } from '../mocks/mockData';

// For development, we'll use mock data
// TODO: Replace with actual API calls when backend is ready
export const dealService = {
  // Deal CRUD operations
  getDeal: async (customerId: string, dealId: string): Promise<Deal> => {
    return Promise.resolve(mockDeal);
  },

  updateDeal: async (customerId: string, dealId: string, data: Partial<Deal>): Promise<Deal> => {
    return Promise.resolve({ ...mockDeal, ...data });
  },

  // Activities
  getActivities: async (dealId: string): Promise<Activity[]> => {
    return Promise.resolve(mockActivities);
  },

  createActivity: async (dealId: string, data: Omit<Activity, 'id' | 'createdAt' | 'updatedAt'>): Promise<Activity> => {
    const newActivity: Activity = {
      id: Date.now().toString(),
      dealId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...data,
    };
    return Promise.resolve(newActivity);
  },

  updateActivity: async (dealId: string, activityId: string, data: Partial<Activity>): Promise<Activity> => {
    const activity = mockActivities.find(a => a.id === activityId) || mockActivities[0];
    return Promise.resolve({ ...activity, ...data });
  },

  // Proposals
  getProposals: async (dealId: string): Promise<Proposal[]> => {
    return Promise.resolve(mockProposals);
  },

  createProposal: async (dealId: string, data: Omit<Proposal, 'id' | 'createdAt' | 'lastModified'>): Promise<Proposal> => {
    const newProposal: Proposal = {
      id: Date.now().toString(),
      dealId,
      createdAt: new Date().toISOString(),
      lastModified: new Date().toISOString(),
      ...data,
    };
    return Promise.resolve(newProposal);
  },

  updateProposal: async (dealId: string, proposalId: string, data: Partial<Proposal>): Promise<Proposal> => {
    const proposal = mockProposals.find(p => p.id === proposalId) || mockProposals[0];
    return Promise.resolve({ ...proposal, ...data });
  },

  // Files
  getFiles: async (dealId: string): Promise<DealFile[]> => {
    return Promise.resolve(mockFiles);
  },

  uploadFile: async (dealId: string, file: File): Promise<DealFile> => {
    const newFile: DealFile = {
      id: Date.now().toString(),
      dealId,
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
      uploadedAt: new Date().toISOString(),
    };
    return Promise.resolve(newFile);
  },

  deleteFile: async (dealId: string, fileId: string): Promise<void> => {
    return Promise.resolve();
  },
};
