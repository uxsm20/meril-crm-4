import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PRODUCT_CATEGORIES } from "@/lib/constants";
import { Plus, Minus } from "lucide-react";

interface ProductSelectorProps {
  category: string;
  selectedProducts: any[];
  onProductsChange: (products: any[]) => void;
}

export function ProductSelector({
  category,
  selectedProducts,
  onProductsChange,
}: ProductSelectorProps) {
  const categoryData = PRODUCT_CATEGORIES[category as keyof typeof PRODUCT_CATEGORIES];

  const handleAddProduct = (subcategory: string) => {
    onProductsChange([
      ...selectedProducts,
      { subcategory, quantity: 1, price: 0 },
    ]);
  };

  const handleUpdateProduct = (index: number, updates: any) => {
    const newProducts = [...selectedProducts];
    newProducts[index] = { ...newProducts[index], ...updates };
    onProductsChange(newProducts);
  };

  const handleRemoveProduct = (index: number) => {
    onProductsChange(selectedProducts.filter((_, i) => i !== index));
  };

  if (!categoryData) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground">Please select a category first</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">{categoryData.title}</h3>
          <p className="text-sm text-muted-foreground">{categoryData.description}</p>
        </div>

        <div className="space-y-4">
          {selectedProducts.map((product, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded-lg border bg-card"
            >
              <div className="flex-1 space-y-4">
                <div className="grid gap-2">
                  <Label>Product</Label>
                  <div className="text-sm font-medium">
                    {product.subcategory}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor={`quantity-${index}`}>Quantity</Label>
                    <Input
                      id={`quantity-${index}`}
                      type="number"
                      min="1"
                      value={product.quantity}
                      onChange={(e) =>
                        handleUpdateProduct(index, {
                          quantity: parseInt(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor={`price-${index}`}>Price (₹)</Label>
                    <Input
                      id={`price-${index}`}
                      type="number"
                      min="0"
                      value={product.price}
                      onChange={(e) =>
                        handleUpdateProduct(index, {
                          price: parseFloat(e.target.value),
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="text-destructive"
                onClick={() => handleRemoveProduct(index)}
              >
                <Minus className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categoryData.subcategories.map((subcategory) => (
            <Button
              key={subcategory.name}
              variant="outline"
              className="justify-start gap-2"
              onClick={() => handleAddProduct(subcategory.name)}
            >
              <Plus className="h-4 w-4" />
              {subcategory.name}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}