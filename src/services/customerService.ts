import { 
  Customer, 
  CustomerActivity, 
  CustomerDocument, 
  CustomerMetrics 
} from '../types/customer';

// Mock data
const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "City General Hospital",
    type: "Hospital",
    email: "contact@citygeneral.com",
    phone: "+91 98765 43210",
    address: "123 Healthcare Avenue, Mumbai, Maharashtra",
    segment: "Enterprise",
    healthScore: 85,
    totalRevenue: 5000000,
    activeDeals: 3,
    lastContact: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "LifeCare Clinic",
    type: "Clinic",
    email: "info@lifecare.com",
    phone: "+91 98765 43211",
    address: "456 Wellness Street, Delhi, Delhi",
    segment: "Mid-Market",
    healthScore: 75,
    totalRevenue: 2000000,
    activeDeals: 2,
    lastContact: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const mockActivities: CustomerActivity[] = [
  {
    id: "1",
    customerId: "1",
    type: "Meeting",
    title: "Quarterly Review",
    description: "Discussed upcoming equipment needs and maintenance schedule",
    date: new Date().toISOString(),
    createdBy: "John Doe",
    createdAt: new Date().toISOString(),
  },
];

const mockDocuments: CustomerDocument[] = [
  {
    id: "1",
    customerId: "1",
    name: "Service Agreement 2024",
    type: "application/pdf",
    size: 1024576,
    url: "https://example.com/docs/agreement.pdf",
    category: "Contract",
    uploadedBy: "John Doe",
    uploadedAt: new Date().toISOString(),
  },
];

const mockMetrics: Record<string, CustomerMetrics> = {
  "1": {
    totalPurchases: 12,
    averageOrderValue: 420000,
    lifetimeValue: 5000000,
    openDealsValue: 1500000,
    lastPurchaseDate: new Date().toISOString(),
    purchaseFrequency: 4,
    paymentHistory: {
      onTime: 10,
      late: 2,
      total: 12,
    },
  },
};

export const customerService = {
  // Customer CRUD operations
  getCustomers: async (): Promise<Customer[]> => {
    return Promise.resolve(mockCustomers);
  },

  getCustomer: async (customerId: string): Promise<Customer> => {
    const customer = mockCustomers.find(c => c.id === customerId);
    if (!customer) throw new Error('Customer not found');
    return Promise.resolve(customer);
  },

  createCustomer: async (data: Omit<Customer, 'id' | 'createdAt' | 'updatedAt'>): Promise<Customer> => {
    const newCustomer: Customer = {
      ...data,
      id: (mockCustomers.length + 1).toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockCustomers.push(newCustomer);
    return Promise.resolve(newCustomer);
  },

  updateCustomer: async (customerId: string, data: Partial<Customer>): Promise<Customer> => {
    const index = mockCustomers.findIndex(c => c.id === customerId);
    if (index === -1) throw new Error('Customer not found');
    
    mockCustomers[index] = {
      ...mockCustomers[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return Promise.resolve(mockCustomers[index]);
  },

  // Activities
  getActivities: async (customerId: string): Promise<CustomerActivity[]> => {
    return Promise.resolve(mockActivities.filter(a => a.customerId === customerId));
  },

  addActivity: async (customerId: string, data: Omit<CustomerActivity, 'id' | 'customerId' | 'createdAt'>): Promise<CustomerActivity> => {
    const newActivity: CustomerActivity = {
      ...data,
      id: (mockActivities.length + 1).toString(),
      customerId,
      createdAt: new Date().toISOString(),
    };
    mockActivities.push(newActivity);
    return Promise.resolve(newActivity);
  },

  // Documents
  getDocuments: async (customerId: string): Promise<CustomerDocument[]> => {
    return Promise.resolve(mockDocuments.filter(d => d.customerId === customerId));
  },

  uploadDocument: async (customerId: string, file: File, category: CustomerDocument['category']): Promise<CustomerDocument> => {
    const newDocument: CustomerDocument = {
      id: (mockDocuments.length + 1).toString(),
      customerId,
      name: file.name,
      type: file.type,
      size: file.size,
      url: URL.createObjectURL(file),
      category,
      uploadedBy: "John Doe", // TODO: Get from auth context
      uploadedAt: new Date().toISOString(),
    };
    mockDocuments.push(newDocument);
    return Promise.resolve(newDocument);
  },

  deleteDocument: async (documentId: string): Promise<void> => {
    const index = mockDocuments.findIndex(d => d.id === documentId);
    if (index !== -1) {
      mockDocuments.splice(index, 1);
    }
    return Promise.resolve();
  },

  // Metrics
  getMetrics: async (customerId: string): Promise<CustomerMetrics> => {
    const metrics = mockMetrics[customerId];
    if (!metrics) throw new Error('Metrics not found');
    return Promise.resolve(metrics);
  },
};
