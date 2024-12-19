export type ProductCategory = 
  | "Diagnostic Equipment"
  | "Laboratory Supplies"
  | "Medical Devices"
  | "Consumables"
  | "Software Solutions"
  | "Services";

export type ProductStatus = "Active" | "Discontinued" | "Coming Soon";

export interface ProductSpecification {
  key: string;
  value: string;
  unit?: string;
}

export interface ProductPricing {
  basePrice: number;
  discountedPrice?: number;
  bulkPricing?: {
    quantity: number;
    price: number;
  }[];
  currency: string;
}

export interface ProductInventory {
  inStock: number;
  reorderPoint: number;
  leadTime: number; // in days
  supplierInfo?: {
    name: string;
    contactInfo: string;
  };
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: ProductCategory;
  status: ProductStatus;
  description: string;
  features: string[];
  specifications: ProductSpecification[];
  pricing: ProductPricing;
  inventory: ProductInventory;
  images: string[];
  documents: {
    type: "manual" | "datasheet" | "certification" | "warranty";
    url: string;
    name: string;
  }[];
  relatedProducts?: string[]; // IDs of related products
  createdAt: string;
  updatedAt: string;
}
