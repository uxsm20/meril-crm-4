import { Heart, Stethoscope, Syringe, TestTube } from "lucide-react";
import { ProductCard } from "./ProductCard";
import { PRODUCT_CATEGORIES } from "@/lib/constants";

const CATEGORY_ICONS = {
  CARDIOVASCULAR: <Heart className="h-6 w-6 text-blue-500" />,
  ORTHOPEDIC: <Stethoscope className="h-6 w-6 text-blue-500" />,
  ENDOSURGERY: <Syringe className="h-6 w-6 text-blue-500" />,
  DIAGNOSTICS: <TestTube className="h-6 w-6 text-blue-500" />
};

export function ProductsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {Object.entries(PRODUCT_CATEGORIES).map(([key, category]) => (
        <ProductCard
          key={key}
          title={category.title}
          description={category.description}
          subcategories={category.subcategories}
          icon={CATEGORY_ICONS[key as keyof typeof CATEGORY_ICONS]}
        />
      ))}
    </div>
  );
}