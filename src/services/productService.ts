import { Product, ProductCategory, ProductStatus } from "../types/product";

// Temporary mock data
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Mozec DES - Drug Eluting Stent",
    sku: "MOZEC-DES-001",
    category: "Medical Devices",
    status: "Active",
    description: "Next generation Drug Eluting Stent with advanced coating technology. Features ultra-thin struts and biocompatible polymers for enhanced deliverability and safety.",
    features: [
      "Ultra-thin cobalt chromium platform",
      "Biodegradable polymer coating",
      "Sirolimus drug coating",
      "Excellent deliverability",
      "Low crossing profile"
    ],
    specifications: [
      { key: "Stent Platform", value: "Cobalt Chromium L605", unit: "" },
      { key: "Strut Thickness", value: "60", unit: "μm" },
      { key: "Crossing Profile", value: "0.9", unit: "mm" },
      { key: "Sizes Available", value: "2.25-4.50", unit: "mm" }
    ],
    pricing: {
      basePrice: 25000,
      currency: "INR",
      bulkPricing: [
        { quantity: 10, price: 24000 },
        { quantity: 25, price: 23000 }
      ]
    },
    inventory: {
      inStock: 500,
      reorderPoint: 100,
      leadTime: 30,
      supplierInfo: {
        name: "Meril Life Sciences",
        contactInfo: "sales@merillife.com"
      }
    },
    images: [
      "/images/products/mozec-des-main.jpg",
      "/images/products/mozec-des-detail.jpg"
    ],
    documents: [
      {
        type: "certification",
        url: "/docs/mozec-des-ce.pdf",
        name: "CE Certification"
      },
      {
        type: "datasheet",
        url: "/docs/mozec-des-specs.pdf",
        name: "Technical Specifications"
      }
    ],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "2",
    name: "Biomime Morph - Tapered Stent",
    sku: "BIOMIME-MORPH-001",
    category: "Medical Devices",
    status: "Active",
    description: "Innovative tapered drug-eluting stent designed specifically for treating long, tapered coronary lesions. Features unique design to match natural vessel tapering.",
    features: [
      "Tapered design for vessel compatibility",
      "Hybrid cell design",
      "Thin strut technology",
      "Enhanced flexibility",
      "Optimized radial strength"
    ],
    specifications: [
      { key: "Stent Material", value: "Cobalt Chromium", unit: "" },
      { key: "Available Lengths", value: "30-60", unit: "mm" },
      { key: "Taper Ratio", value: "0.5-1.0", unit: "mm" },
      { key: "Drug Coating", value: "Sirolimus", unit: "" }
    ],
    pricing: {
      basePrice: 35000,
      currency: "INR",
      bulkPricing: [
        { quantity: 5, price: 33000 },
        { quantity: 10, price: 31000 }
      ]
    },
    inventory: {
      inStock: 200,
      reorderPoint: 50,
      leadTime: 45,
      supplierInfo: {
        name: "Meril Life Sciences",
        contactInfo: "sales@merillife.com"
      }
    },
    images: [
      "/images/products/biomime-morph-main.jpg"
    ],
    documents: [
      {
        type: "manual",
        url: "/docs/biomime-morph-ifu.pdf",
        name: "Instructions for Use"
      }
    ],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "3",
    name: "Guardian TAVR System",
    sku: "GUARDIAN-TAVR-001",
    category: "Medical Devices",
    status: "Active",
    description: "Advanced Transcatheter Aortic Valve Replacement (TAVR) system designed for treating severe aortic stenosis. Features innovative valve design and delivery system.",
    features: [
      "Self-expanding nitinol frame",
      "Bovine pericardial tissue valve",
      "Minimally invasive procedure",
      "Precise positioning control",
      "Enhanced durability"
    ],
    specifications: [
      { key: "Valve Sizes", value: "23, 26, 29", unit: "mm" },
      { key: "Frame Material", value: "Nitinol", unit: "" },
      { key: "Delivery System", value: "14-16", unit: "Fr" },
      { key: "Tissue Type", value: "Bovine Pericardium", unit: "" }
    ],
    pricing: {
      basePrice: 800000,
      currency: "INR",
      bulkPricing: [
        { quantity: 2, price: 750000 }
      ]
    },
    inventory: {
      inStock: 50,
      reorderPoint: 10,
      leadTime: 60,
      supplierInfo: {
        name: "Meril Life Sciences",
        contactInfo: "sales@merillife.com"
      }
    },
    images: [
      "/images/products/guardian-tavr-main.jpg",
      "/images/products/guardian-tavr-valve.jpg"
    ],
    documents: [
      {
        type: "certification",
        url: "/docs/guardian-tavr-ce.pdf",
        name: "CE Certification"
      },
      {
        type: "manual",
        url: "/docs/guardian-tavr-manual.pdf",
        name: "Procedure Manual"
      }
    ],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "4",
    name: "FlexiRay Digital X-Ray",
    sku: "FLEXIRAY-DR-001",
    category: "Diagnostic Equipment",
    status: "Active",
    description: "Advanced digital radiography system with high-resolution imaging and AI-enhanced processing. Provides exceptional image quality with reduced radiation exposure.",
    features: [
      "High-resolution digital detector",
      "AI image enhancement",
      "Low dose technology",
      "Wireless connectivity",
      "Quick image processing",
      "User-friendly interface"
    ],
    specifications: [
      { key: "Detector Size", value: "43 x 43", unit: "cm" },
      { key: "Resolution", value: "3.8", unit: "lp/mm" },
      { key: "Image Depth", value: "16", unit: "bit" },
      { key: "Preview Time", value: "2", unit: "seconds" }
    ],
    pricing: {
      basePrice: 2500000,
      currency: "INR",
      bulkPricing: [
        { quantity: 2, price: 2300000 }
      ]
    },
    inventory: {
      inStock: 15,
      reorderPoint: 3,
      leadTime: 45,
      supplierInfo: {
        name: "Meril Life Sciences",
        contactInfo: "sales@merillife.com"
      }
    },
    images: [
      "/images/products/flexiray-main.jpg",
      "/images/products/flexiray-console.jpg"
    ],
    documents: [
      {
        type: "manual",
        url: "/docs/flexiray-manual.pdf",
        name: "User Manual"
      },
      {
        type: "certification",
        url: "/docs/flexiray-cert.pdf",
        name: "Safety Certification"
      }
    ],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "5",
    name: "Abott Blood Glucose Monitor",
    sku: "ABOTT-BGM-001",
    category: "Medical Devices",
    status: "Active",
    description: "Advanced blood glucose monitoring system with continuous monitoring capabilities. Features smartphone connectivity and trend analysis.",
    features: [
      "Continuous glucose monitoring",
      "Smartphone connectivity",
      "14-day sensor life",
      "Real-time alerts",
      "Trend analysis",
      "No finger pricks needed"
    ],
    specifications: [
      { key: "Sensor Life", value: "14", unit: "days" },
      { key: "Reading Range", value: "40-500", unit: "mg/dL" },
      { key: "Warm-up Time", value: "1", unit: "hour" },
      { key: "Data Storage", value: "90", unit: "days" }
    ],
    pricing: {
      basePrice: 5000,
      currency: "INR",
      bulkPricing: [
        { quantity: 10, price: 4500 },
        { quantity: 50, price: 4000 }
      ]
    },
    inventory: {
      inStock: 1000,
      reorderPoint: 200,
      leadTime: 15,
      supplierInfo: {
        name: "Meril Life Sciences",
        contactInfo: "sales@merillife.com"
      }
    },
    images: [
      "/images/products/abott-bgm-main.jpg",
      "/images/products/abott-bgm-app.jpg"
    ],
    documents: [
      {
        type: "manual",
        url: "/docs/abott-bgm-manual.pdf",
        name: "User Guide"
      },
      {
        type: "datasheet",
        url: "/docs/abott-bgm-specs.pdf",
        name: "Technical Specifications"
      }
    ],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "6",
    name: "Mozec NC Balloon",
    sku: "MOZEC-NCB-001",
    category: "Medical Devices",
    status: "Active",
    description: "High-pressure non-compliant balloon for optimal stent deployment and lesion preparation. Features excellent trackability and crossing profile.",
    features: [
      "High pressure rating",
      "Low compliance",
      "Excellent trackability",
      "Hydrophilic coating",
      "Multiple size options"
    ],
    specifications: [
      { key: "Pressure Rating", value: "up to 20", unit: "atm" },
      { key: "Sizes", value: "2.0-4.0", unit: "mm" },
      { key: "Lengths", value: "8-20", unit: "mm" },
      { key: "Crossing Profile", value: "0.7", unit: "mm" }
    ],
    pricing: {
      basePrice: 8000,
      currency: "INR",
      bulkPricing: [
        { quantity: 10, price: 7500 },
        { quantity: 25, price: 7000 }
      ]
    },
    inventory: {
      inStock: 300,
      reorderPoint: 50,
      leadTime: 20,
      supplierInfo: {
        name: "Meril Life Sciences",
        contactInfo: "sales@merillife.com"
      }
    },
    images: ["/images/products/mozec-nc-main.jpg"],
    documents: [
      {
        type: "manual",
        url: "/docs/mozec-nc-manual.pdf",
        name: "Instructions for Use"
      }
    ],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "7",
    name: "Mozec RX Balloon",
    sku: "MOZEC-RXB-001",
    category: "Medical Devices",
    status: "Active",
    description: "Semi-compliant rapid exchange balloon catheter for pre-dilatation and lesion preparation. Offers excellent flexibility and crossability.",
    features: [
      "Semi-compliant material",
      "Rapid exchange design",
      "Low crossing profile",
      "Balanced compliance",
      "Optimized shaft design"
    ],
    specifications: [
      { key: "Nominal Pressure", value: "8", unit: "atm" },
      { key: "Sizes", value: "1.5-4.0", unit: "mm" },
      { key: "Lengths", value: "10-30", unit: "mm" },
      { key: "Shaft Length", value: "142", unit: "cm" }
    ],
    pricing: {
      basePrice: 7000,
      currency: "INR",
      bulkPricing: [
        { quantity: 10, price: 6500 },
        { quantity: 25, price: 6000 }
      ]
    },
    inventory: {
      inStock: 400,
      reorderPoint: 75,
      leadTime: 20,
      supplierInfo: {
        name: "Meril Life Sciences",
        contactInfo: "sales@merillife.com"
      }
    },
    images: ["/images/products/mozec-rx-main.jpg"],
    documents: [
      {
        type: "manual",
        url: "/docs/mozec-rx-manual.pdf",
        name: "Instructions for Use"
      }
    ],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "8",
    name: "MyVal TMVR System",
    sku: "MYVAL-TMVR-001",
    category: "Medical Devices",
    status: "Active",
    description: "Transcatheter Mitral Valve Replacement system for treating severe mitral regurgitation. Features innovative valve design for optimal hemodynamics.",
    features: [
      "Self-expanding frame",
      "Bovine pericardial leaflets",
      "Anti-calcification treatment",
      "Minimally invasive delivery",
      "Anatomical anchoring"
    ],
    specifications: [
      { key: "Valve Sizes", value: "23, 26, 29", unit: "mm" },
      { key: "Frame Material", value: "Nitinol", unit: "" },
      { key: "Delivery System", value: "18-20", unit: "Fr" },
      { key: "Tissue Type", value: "Bovine Pericardium", unit: "" }
    ],
    pricing: {
      basePrice: 900000,
      currency: "INR",
      bulkPricing: [
        { quantity: 2, price: 850000 }
      ]
    },
    inventory: {
      inStock: 30,
      reorderPoint: 5,
      leadTime: 60,
      supplierInfo: {
        name: "Meril Life Sciences",
        contactInfo: "sales@merillife.com"
      }
    },
    images: ["/images/products/myval-tmvr-main.jpg"],
    documents: [
      {
        type: "certification",
        url: "/docs/myval-tmvr-ce.pdf",
        name: "CE Certification"
      }
    ],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "9",
    name: "Hydra Valve",
    sku: "HYDRA-VALVE-001",
    category: "Medical Devices",
    status: "Coming Soon",
    description: "Next-generation transcatheter heart valve with unique sealing technology. Designed for reduced paravalvular leakage and improved durability.",
    features: [
      "Adaptive sealing technology",
      "Enhanced durability",
      "Optimal hemodynamics",
      "Reduced frame height",
      "Improved repositionability"
    ],
    specifications: [
      { key: "Valve Sizes", value: "21, 23, 25, 27", unit: "mm" },
      { key: "Frame Height", value: "45", unit: "mm" },
      { key: "Delivery Profile", value: "14", unit: "Fr" },
      { key: "Tissue", value: "Treated Pericardium", unit: "" }
    ],
    pricing: {
      basePrice: 950000,
      currency: "INR",
      bulkPricing: [
        { quantity: 2, price: 900000 }
      ]
    },
    inventory: {
      inStock: 0,
      reorderPoint: 10,
      leadTime: 90,
      supplierInfo: {
        name: "Meril Life Sciences",
        contactInfo: "sales@merillife.com"
      }
    },
    images: ["/images/products/hydra-valve-main.jpg"],
    documents: [
      {
        type: "brochure",
        url: "/docs/hydra-valve-brochure.pdf",
        name: "Product Brochure"
      }
    ],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "10",
    name: "MeriVision CT Scanner",
    sku: "MERIVISION-CT-001",
    category: "Diagnostic Equipment",
    status: "Active",
    description: "Advanced CT imaging system with AI-powered image reconstruction and dose optimization. Features high-speed scanning and exceptional image quality.",
    features: [
      "AI image reconstruction",
      "Low dose technology",
      "Rapid scanning",
      "4D imaging capability",
      "Advanced visualization"
    ],
    specifications: [
      { key: "Slice Configuration", value: "128", unit: "slice" },
      { key: "Rotation Speed", value: "0.3", unit: "sec" },
      { key: "Scan Coverage", value: "80", unit: "mm" },
      { key: "Spatial Resolution", value: "0.23", unit: "mm" }
    ],
    pricing: {
      basePrice: 15000000,
      currency: "INR",
      bulkPricing: [
        { quantity: 1, price: 14000000 }
      ]
    },
    inventory: {
      inStock: 2,
      reorderPoint: 1,
      leadTime: 120,
      supplierInfo: {
        name: "Meril Life Sciences",
        contactInfo: "sales@merillife.com"
      }
    },
    images: ["/images/products/merivision-ct-main.jpg"],
    documents: [
      {
        type: "specification",
        url: "/docs/merivision-ct-specs.pdf",
        name: "Technical Specifications"
      }
    ],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "11",
    name: "UltraVision Echo",
    sku: "ULTRAVISION-ECHO-001",
    category: "Diagnostic Equipment",
    status: "Active",
    description: "Premium cardiovascular ultrasound system with advanced 4D imaging capabilities. Features AI-powered automation and workflow optimization.",
    features: [
      "4D imaging",
      "AI-powered automation",
      "Advanced quantification",
      "Ergonomic design",
      "Wireless connectivity"
    ],
    specifications: [
      { key: "Display Size", value: "21.5", unit: "inch" },
      { key: "Frame Rate", value: "up to 1200", unit: "fps" },
      { key: "Probe Ports", value: "4", unit: "" },
      { key: "Storage", value: "1", unit: "TB" }
    ],
    pricing: {
      basePrice: 3500000,
      currency: "INR",
      bulkPricing: [
        { quantity: 1, price: 3300000 }
      ]
    },
    inventory: {
      inStock: 5,
      reorderPoint: 2,
      leadTime: 60,
      supplierInfo: {
        name: "Meril Life Sciences",
        contactInfo: "sales@merillife.com"
      }
    },
    images: ["/images/products/ultravision-echo-main.jpg"],
    documents: [
      {
        type: "manual",
        url: "/docs/ultravision-echo-manual.pdf",
        name: "User Manual"
      }
    ],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "12",
    name: "MeriCare Pulse Oximeter",
    sku: "MERICARE-PO-001",
    category: "Medical Devices",
    status: "Active",
    description: "Professional-grade pulse oximeter with continuous monitoring capabilities. Features wireless connectivity and trend analysis.",
    features: [
      "Continuous monitoring",
      "Wireless connectivity",
      "Long battery life",
      "Trend analysis",
      "Alarm system"
    ],
    specifications: [
      { key: "SpO2 Range", value: "0-100", unit: "%" },
      { key: "Pulse Rate", value: "25-250", unit: "bpm" },
      { key: "Battery Life", value: "24", unit: "hours" },
      { key: "Display", value: "2.4", unit: "inch" }
    ],
    pricing: {
      basePrice: 15000,
      currency: "INR",
      bulkPricing: [
        { quantity: 5, price: 14000 },
        { quantity: 10, price: 13000 }
      ]
    },
    inventory: {
      inStock: 200,
      reorderPoint: 50,
      leadTime: 15,
      supplierInfo: {
        name: "Meril Life Sciences",
        contactInfo: "sales@merillife.com"
      }
    },
    images: ["/images/products/mericare-po-main.jpg"],
    documents: [
      {
        type: "manual",
        url: "/docs/mericare-po-manual.pdf",
        name: "User Manual"
      }
    ],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  },
  {
    id: "13",
    name: "MeriCare Patient Monitor",
    sku: "MERICARE-PM-001",
    category: "Medical Devices",
    status: "Active",
    description: "Advanced patient monitoring system with multi-parameter capabilities. Features touchscreen interface and comprehensive data management.",
    features: [
      "Multi-parameter monitoring",
      "Touchscreen interface",
      "Network connectivity",
      "Data management",
      "Customizable displays"
    ],
    specifications: [
      { key: "Screen Size", value: "15", unit: "inch" },
      { key: "Parameters", value: "ECG, SpO2, NIBP, Temp, Resp", unit: "" },
      { key: "Battery Backup", value: "4", unit: "hours" },
      { key: "Storage", value: "72", unit: "hours" }
    ],
    pricing: {
      basePrice: 150000,
      currency: "INR",
      bulkPricing: [
        { quantity: 2, price: 140000 },
        { quantity: 5, price: 130000 }
      ]
    },
    inventory: {
      inStock: 50,
      reorderPoint: 10,
      leadTime: 30,
      supplierInfo: {
        name: "Meril Life Sciences",
        contactInfo: "sales@merillife.com"
      }
    },
    images: ["/images/products/mericare-pm-main.jpg"],
    documents: [
      {
        type: "manual",
        url: "/docs/mericare-pm-manual.pdf",
        name: "User Manual"
      }
    ],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-01T00:00:00Z"
  }
];

// Related products mapping
const relatedProductsMap: Record<string, string[]> = {
  // Stents and Cardiovascular
  "1": ["2", "6", "7"], // Mozec DES -> Biomime Morph, Mozec NC Balloon, Mozec RX Balloon
  "2": ["1", "6", "7"], // Biomime Morph -> Mozec DES, Mozec NC Balloon, Mozec RX Balloon
  "6": ["1", "2", "7"], // Mozec NC Balloon -> Mozec DES, Biomime Morph, Mozec RX Balloon
  "7": ["1", "2", "6"], // Mozec RX Balloon -> Mozec DES, Biomime Morph, Mozec NC Balloon

  // TAVR and Structural Heart
  "3": ["8", "9"], // Guardian TAVR -> MyVal TMVR, Hydra Valve
  "8": ["3", "9"], // MyVal TMVR -> Guardian TAVR, Hydra Valve
  "9": ["3", "8"], // Hydra Valve -> Guardian TAVR, MyVal TMVR

  // Diagnostic Equipment
  "4": ["10", "11"], // FlexiRay -> MeriVision CT, UltraVision Echo
  "10": ["4", "11"], // MeriVision CT -> FlexiRay, UltraVision Echo
  "11": ["4", "10"], // UltraVision Echo -> FlexiRay, MeriVision CT

  // Monitoring Devices
  "5": ["12", "13"], // Abott BGM -> Pulse Oximeter, Patient Monitor
  "12": ["5", "13"], // Pulse Oximeter -> Abott BGM, Patient Monitor
  "13": ["5", "12"], // Patient Monitor -> Abott BGM, Pulse Oximeter
};

class ProductService {
  private products: Product[] = mockProducts;

  async getProducts(): Promise<Product[]> {
    return this.products;
  }

  async getProduct(id: string): Promise<Product | null> {
    const product = this.products.find(p => p.id === id);
    return product || null;
  }

  async getProductsByCategory(category: ProductCategory): Promise<Product[]> {
    return this.products.filter(p => p.category === category);
  }

  async searchProducts(query: string): Promise<Product[]> {
    const searchTerm = query.toLowerCase();
    return this.products.filter(p => 
      p.name.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm) ||
      p.sku.toLowerCase().includes(searchTerm)
    );
  }

  async createProduct(product: Omit<Product, "id" | "createdAt" | "updatedAt">): Promise<Product> {
    const newProduct: Product = {
      ...product,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return null;

    const updatedProduct: Product = {
      ...this.products[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.products[index] = updatedProduct;
    return updatedProduct;
  }

  async updateInventory(id: string, quantity: number): Promise<boolean> {
    const product = this.products.find(p => p.id === id);
    if (!product) return false;

    product.inventory.inStock += quantity;
    product.updatedAt = new Date().toISOString();
    return true;
  }

  async getRelatedProducts(productId: string): Promise<Product[]> {
    const relatedIds = relatedProductsMap[productId] || [];
    return this.products.filter(p => relatedIds.includes(p.id));
  }

  async getProductsByStatus(status: ProductStatus): Promise<Product[]> {
    return this.products.filter(p => p.status === status);
  }
}

export const productService = new ProductService();
