import { CalendarClock, FileCheck, FileEdit, Phone, Users, Building, BrainCircuit, Building2, Package, Video, FileText } from "lucide-react";

export const MOCK_USER = {
  name: "Priya Sharma",
  role: "Senior Sales Representative",
  avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&h=256&auto=format&fit=crop",
  notifications: 3
};

export const PERFORMANCE_METRICS = {
  LEADS_CONTACTED: "Leads Contacted",
  MEETINGS_SCHEDULED: "Meetings Scheduled",
  PROPOSALS_SENT: "Proposals Sent",
  DEALS_CLOSED: "Deals Closed"
};

export const TODAY_ACTIVITIES = [
  {
    id: "1",
    title: "Meeting with Dr. Rajesh Mehta",
    time: "10:00 AM",
    type: "Video Call",
    status: "upcoming",
    icon: Video,
    details: {
      contact: {
        name: "Dr. Rajesh Mehta",
        role: "Chief Cardiologist",
        hospital: "Apollo Hospitals, Mumbai",
        zohoId: "CONT001"
      },
      aiInsights: {
        signalScore: 85,
        reasons: [
          "Recent inquiry about Myval™ THV System",
          "Department budget approved last week",
          "Positive history with previous purchases"
        ],
        suggestedTopics: [
          "New clinical data for Myval™ THV System",
          "Post-implementation support services",
          "Training program for staff"
        ],
        lastInteraction: "2 weeks ago"
      }
    }
  },
  {
    id: "2",
    title: "Follow-up: Orthopedic Proposal",
    time: "2:30 PM",
    type: "Task",
    status: "pending",
    icon: FileText,
    details: {
      contact: {
        name: "Dr. Anjali Desai",
        role: "Head of Orthopedics",
        hospital: "Fortis Hospital, Bangalore",
        zohoId: "CONT002"
      },
      aiInsights: {
        signalScore: 72,
        reasons: [
          "Competitive evaluation in progress",
          "Budget constraints mentioned",
          "Technical requirements match our offering"
        ],
        suggestedTopics: [
          "Cost-benefit analysis presentation",
          "Financing options",
          "Implementation timeline"
        ],
        lastInteraction: "5 days ago"
      }
    }
  }
];

export const PRODUCT_CATEGORIES = {
  CARDIOVASCULAR: {
    title: "Cardiovascular Devices",
    description: "Advanced solutions for cardiac care and intervention",
    subcategories: [
      { name: "Coronary Stents", color: "red" },
      { name: "Heart Valves", color: "pink" },
      { name: "Balloon Catheters", color: "rose" }
    ]
  },
  ORTHOPEDIC: {
    title: "Orthopedic Implants",
    description: "Comprehensive range of joint reconstruction solutions",
    subcategories: [
      { name: "Knee Systems", color: "blue" },
      { name: "Hip Systems", color: "sky" },
      { name: "Trauma Implants", color: "indigo" }
    ]
  },
  ENDOSURGERY: {
    title: "Endo-Surgery Instruments",
    description: "Minimally invasive surgical tools and equipment",
    subcategories: [
      { name: "Laparoscopic", color: "green" },
      { name: "Endoscopic", color: "emerald" },
      { name: "Surgical Staplers", color: "teal" }
    ]
  },
  DIAGNOSTICS: {
    title: "In-Vitro Diagnostics",
    description: "Advanced diagnostic solutions and testing kits",
    subcategories: [
      { name: "Clinical Chemistry", color: "purple" },
      { name: "Immunoassay", color: "violet" },
      { name: "Molecular Diagnostics", color: "fuchsia" }
    ]
  }
};

export const COMPANIES = [
  {
    id: "HOSP001",
    name: "Apollo Hospitals",
    location: "Mumbai",
    type: "Multi-Specialty Hospital",
    size: "Large",
    departments: ["Cardiology", "Orthopedics", "Neurology"],
    contacts: [
      {
        name: "Dr. Rajesh Mehta",
        role: "Chief Cardiologist",
        email: "rajesh.mehta@apollo.com",
        phone: "+91 98765 43210"
      },
      {
        name: "Dr. Priya Sharma",
        role: "Head of Orthopedics",
        email: "priya.sharma@apollo.com",
        phone: "+91 98765 43211"
      }
    ],
    recentDeals: [
      {
        id: "PROP-001",
        title: "Cardiovascular Equipment Bundle",
        amount: 4500000,
        date: "2024-01-15"
      }
    ]
  },
  {
    id: "HOSP002",
    name: "Fortis Hospital",
    location: "Bangalore",
    type: "Multi-Specialty Hospital",
    size: "Large",
    departments: ["Orthopedics", "Cardiology", "Oncology"],
    contacts: [
      {
        name: "Dr. Anjali Desai",
        role: "Head of Orthopedics",
        email: "anjali.desai@fortis.com",
        phone: "+91 98765 43212"
      }
    ],
    recentDeals: []
  }
];

export const PRODUCTS = {
  CARDIOVASCULAR: [
    {
      id: "CVD001",
      name: "Myval™ THV System",
      category: "Transcatheter Heart Valves",
      description: "Next-generation transcatheter heart valve system",
      features: [
        "Unique hybrid honeycomb cell design",
        "Navigator™ delivery system",
        "Optimal radial strength"
      ],
      price: 250000
    },
    {
      id: "CVD002",
      name: "Nexgen™ Coronary Stent",
      category: "Coronary Stents",
      description: "Advanced drug-eluting coronary stent system",
      features: [
        "Biodegradable polymer",
        "Thin strut design",
        "Rapid endothelialization"
      ],
      price: 35000
    }
  ],
  ORTHOPEDIC: [
    {
      id: "ORT001",
      name: "Freedom™ Total Knee System",
      category: "Joint Reconstruction",
      description: "Comprehensive total knee replacement system",
      features: [
        "Anatomically optimized design",
        "Advanced bearing materials",
        "Precision instrumentation"
      ],
      price: 120000
    }
  ]
};

export const NAVIGATION_ITEMS = [
  {
    title: "Dashboard",
    icon: CalendarClock,
    href: "/dashboard"
  },
  {
    title: "Companies",
    icon: Building2,
    href: "/companies"
  },
  {
    title: "Products",
    icon: Package,
    href: "/products"
  },
  {
    title: "Proposals",
    icon: FileEdit,
    href: "/proposals"
  },
  {
    title: "Contacts",
    icon: Users,
    href: "/contacts"
  }
] as const;