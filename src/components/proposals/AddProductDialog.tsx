import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Package } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  price: number;
  categoryKey: string;
}

interface AddProductDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: Product, quantity: number) => void;
  products: Product[];
}

export function AddProductDialog({ isOpen, onClose, onAddProduct, products }: AddProductDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);

  const filteredProducts = products.filter(
    product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddProduct = () => {
    if (selectedProduct) {
      onAddProduct(selectedProduct, quantity);
      setSelectedProduct(null);
      setQuantity(1);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto pr-2">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className={`cursor-pointer transition-colors ${
                  selectedProduct?.id === product.id
                    ? "border-primary"
                    : "hover:bg-accent/50"
                }`}
                onClick={() => setSelectedProduct(product)}
              >
                <CardContent className="p-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <h3 className="font-medium">{product.name}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">{product.category}</p>
                  </div>

                  <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>

                  <div className="mt-2 flex flex-wrap gap-1">
                    {product.features.slice(0, 2).map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                    {product.features.length > 2 && (
                      <Badge variant="secondary" className="text-xs">
                        +{product.features.length - 2} more
                      </Badge>
                    )}
                  </div>

                  <div className="mt-2 font-medium text-sm">
                    ₹{product.price.toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {selectedProduct && (
            <div className="mt-4 border-t pt-4">
              <div className="flex items-end gap-4">
                <div className="space-y-2">
                  <Label>Quantity</Label>
                  <Input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-24"
                  />
                </div>
                <div className="space-y-2 flex-1">
                  <Label>Total Amount</Label>
                  <div className="text-lg font-medium">
                    ₹{(selectedProduct.price * quantity).toLocaleString()}
                  </div>
                </div>
                <Button onClick={handleAddProduct}>Add to Proposal</Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
