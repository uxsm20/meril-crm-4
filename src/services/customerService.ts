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
    name: "Apollo Hospitals",
    type: "Hospital",
    email: "procurement@apollohospitals.com",
    phone: "+91-44-2829-3333",
    address: "21 Greams Lane, Chennai, Tamil Nadu 600006",
    segment: "Enterprise",
    healthScore: 95,
    totalRevenue: 25000000,
    activeDeals: 3,
    lastContact: "2024-01-18T10:30:00Z",
    createdAt: "2023-01-01T00:00:00Z",
    updatedAt: "2024-01-18T10:30:00Z"
  },
  {
    id: "2",
    name: "Fortis Healthcare",
    type: "Hospital",
    email: "supplies@fortishealthcare.com",
    phone: "+91-11-4277-6222",
    address: "Sector B, Pocket 1, Aruna Asaf Ali Marg, New Delhi 110070",
    segment: "Enterprise",
    healthScore: 90,
    totalRevenue: 18000000,
    activeDeals: 2,
    lastContact: "2024-01-17T14:15:00Z",
    createdAt: "2023-02-15T00:00:00Z",
    updatedAt: "2024-01-17T14:15:00Z"
  },
  {
    id: "3",
    name: "Narayana Health",
    type: "Hospital",
    email: "procurement@narayanahealth.org",
    phone: "+91-80-7122-2222",
    address: "258/A, Bommasandra Industrial Area, Bangalore 560099",
    segment: "Enterprise",
    healthScore: 88,
    totalRevenue: 15000000,
    activeDeals: 2,
    lastContact: "2024-01-16T09:45:00Z",
    createdAt: "2023-03-10T00:00:00Z",
    updatedAt: "2024-01-16T09:45:00Z"
  },
  {
    id: "4",
    name: "Max Super Speciality Hospital",
    type: "Hospital",
    email: "inventory@maxhealthcare.com",
    phone: "+91-11-2651-5050",
    address: "1, Press Enclave Road, Saket, New Delhi 110017",
    segment: "Enterprise",
    healthScore: 92,
    totalRevenue: 20000000,
    activeDeals: 1,
    lastContact: "2024-01-15T16:20:00Z",
    createdAt: "2023-04-01T00:00:00Z",
    updatedAt: "2024-01-15T16:20:00Z"
  },
  {
    id: "5",
    name: "Medanta - The Medicity",
    type: "Hospital",
    email: "supplies@medanta.org",
    phone: "+91-124-4141-414",
    address: "CH Baktawar Singh Road, Sector 38, Gurugram 122001",
    segment: "Enterprise",
    healthScore: 94,
    totalRevenue: 22000000,
    activeDeals: 2,
    lastContact: "2024-01-14T11:30:00Z",
    createdAt: "2023-05-15T00:00:00Z",
    updatedAt: "2024-01-14T11:30:00Z"
  },
  {
    id: "6",
    name: "City Care Diagnostics",
    type: "Laboratory",
    email: "info@citycarelab.com",
    phone: "+91-22-2847-1111",
    address: "15, MG Road, Fort, Mumbai 400001",
    segment: "Mid-Market",
    healthScore: 82,
    totalRevenue: 5000000,
    activeDeals: 1,
    lastContact: "2024-01-13T13:45:00Z",
    createdAt: "2023-06-01T00:00:00Z",
    updatedAt: "2024-01-13T13:45:00Z"
  },
  {
    id: "7",
    name: "LifeCare Diagnostics",
    type: "Laboratory",
    email: "contact@lifecarediag.com",
    phone: "+91-80-4155-6666",
    address: "442, 80 Feet Road, Koramangala, Bangalore 560034",
    segment: "Mid-Market",
    healthScore: 85,
    totalRevenue: 4500000,
    activeDeals: 1,
    lastContact: "2024-01-12T15:10:00Z",
    createdAt: "2023-07-15T00:00:00Z",
    updatedAt: "2024-01-12T15:10:00Z"
  },
  {
    id: "8",
    name: "Prime Heart Clinic",
    type: "Clinic",
    email: "admin@primeheartclinic.com",
    phone: "+91-44-4433-2211",
    address: "28, Anna Nagar, Chennai 600040",
    segment: "Small Business",
    healthScore: 78,
    totalRevenue: 2000000,
    activeDeals: 1,
    lastContact: "2024-01-11T10:20:00Z",
    createdAt: "2023-08-01T00:00:00Z",
    updatedAt: "2024-01-11T10:20:00Z"
  },
  {
    id: "9",
    name: "Metro Hospitals",
    type: "Hospital",
    email: "procurement@metrohospitals.com",
    phone: "+91-120-4528-8888",
    address: "Sector 12, Noida 201301",
    segment: "Mid-Market",
    healthScore: 86,
    totalRevenue: 8000000,
    activeDeals: 2,
    lastContact: "2024-01-10T14:30:00Z",
    createdAt: "2023-09-15T00:00:00Z",
    updatedAt: "2024-01-10T14:30:00Z"
  },
  {
    id: "10",
    name: "Care & Cure Clinic",
    type: "Clinic",
    email: "info@carecureclinic.com",
    phone: "+91-11-4166-7777",
    address: "A-12, Lajpat Nagar, New Delhi 110024",
    segment: "Small Business",
    healthScore: 75,
    totalRevenue: 1500000,
    activeDeals: 1,
    lastContact: "2024-01-09T11:45:00Z",
    createdAt: "2023-10-01T00:00:00Z",
    updatedAt: "2024-01-09T11:45:00Z"
  }
];

const mockActivities: CustomerActivity[] = [
  {
    id: "1",
    customerId: "1",
    type: "Meeting",
    title: "Quarterly Review Meeting",
    description: "Discussed new product requirements and upcoming deals",
    date: "2024-01-18T10:30:00Z",
    createdBy: "John Smith",
    createdAt: "2024-01-18T10:30:00Z"
  },
  {
    id: "2",
    customerId: "1",
    type: "Call",
    title: "Follow-up on TAVR System",
    description: "Discussed implementation timeline and training requirements",
    date: "2024-01-15T14:30:00Z",
    createdBy: "Sarah Johnson",
    createdAt: "2024-01-15T14:30:00Z"
  },
  {
    id: "3",
    customerId: "2",
    type: "Email",
    title: "Proposal Submission",
    description: "Sent updated proposal for cardiac monitoring systems",
    date: "2024-01-17T09:15:00Z",
    createdBy: "Mike Wilson",
    createdAt: "2024-01-17T09:15:00Z"
  }
];

const mockDocuments: CustomerDocument[] = [
  {
    id: "1",
    customerId: "1",
    name: "Annual Contract 2024",
    type: "pdf",
    size: 2500000,
    url: "/documents/contract-2024.pdf",
    category: "Contract",
    uploadedBy: "John Smith",
    uploadedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "2",
    customerId: "1",
    name: "Q1 2024 Proposal",
    type: "pdf",
    size: 1800000,
    url: "/documents/q1-proposal.pdf",
    category: "Proposal",
    uploadedBy: "Sarah Johnson",
    uploadedAt: "2024-01-15T00:00:00Z"
  },
  {
    id: "3",
    customerId: "2",
    name: "Service Agreement",
    type: "pdf",
    size: 3000000,
    url: "/documents/service-agreement.pdf",
    category: "Contract",
    uploadedBy: "Mike Wilson",
    uploadedAt: "2024-01-10T00:00:00Z"
  }
];

const mockMetrics: Record<string, CustomerMetrics> = {
  "1": {
    totalPurchases: 45,
    averageOrderValue: 550000,
    lifetimeValue: 25000000,
    openDealsValue: 4500000,
    lastPurchaseDate: "2024-01-10T00:00:00Z",
    purchaseFrequency: 3.5,
    paymentHistory: {
      onTime: 42,
      late: 3,
      average: 95
    }
  },
  "2": {
    totalPurchases: 38,
    averageOrderValue: 475000,
    lifetimeValue: 18000000,
    openDealsValue: 3200000,
    lastPurchaseDate: "2024-01-05T00:00:00Z",
    purchaseFrequency: 3.2,
    paymentHistory: {
      onTime: 36,
      late: 2,
      average: 97
    }
  }
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
