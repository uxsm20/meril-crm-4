import { COMPANIES, PRODUCTS, PRODUCT_CATEGORIES } from "./constants";

interface Suggestion {
  hospital?: string;
  contact?: string;
  category?: string;
  requirements?: string;
  products?: Array<{
    subcategory: string;
    quantity: number;
    price: number;
  }>;
}

export function generateSuggestions(title: string): Suggestion {
  const titleLower = title.toLowerCase();
  let suggestions: Suggestion = {};

  // Match company/hospital
  const matchedCompany = COMPANIES.find(company => 
    title.toLowerCase().includes(company.name.toLowerCase())
  );

  if (matchedCompany) {
    suggestions.hospital = matchedCompany.name;
    suggestions.contact = matchedCompany.contacts[0]?.name;
  }

  // Match product category
  for (const [key, category] of Object.entries(PRODUCT_CATEGORIES)) {
    if (titleLower.includes(category.title.toLowerCase())) {
      suggestions.category = key;
      
      // Generate requirements based on category
      suggestions.requirements = `Requirements for ${category.title}:\n\n` +
        `1. Compliance with international medical device standards\n` +
        `2. Integration with existing hospital infrastructure\n` +
        `3. Comprehensive staff training program\n` +
        `4. 24/7 technical support and maintenance\n` +
        `5. Warranty and service level agreement details`;

      // Suggest products from this category
      const categoryProducts = PRODUCTS[key as keyof typeof PRODUCTS] || [];
      suggestions.products = categoryProducts.map(product => ({
        subcategory: product.category,
        quantity: 1,
        price: product.price
      }));
    }
  }

  return suggestions;
}

export function generateRequirements(category: string): string {
  const categoryData = PRODUCT_CATEGORIES[category as keyof typeof PRODUCT_CATEGORIES];
  if (!categoryData) return "";

  return `Requirements for ${categoryData.title}:\n\n` +
    `1. Compliance with international medical device standards\n` +
    `2. Integration with existing hospital infrastructure\n` +
    `3. Comprehensive staff training program\n` +
    `4. 24/7 technical support and maintenance\n` +
    `5. Warranty and service level agreement details`;
}